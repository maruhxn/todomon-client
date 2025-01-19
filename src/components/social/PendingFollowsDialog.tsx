"use client";

import { getPendingFollowRequest } from "@/apis/repository/follow.repository";
import { useToast } from "@/hooks/use-toast";
import { getProfileImage } from "@/lib/utils";
import { PageItem } from "@/types/globals";
import { FollowRequestItem } from "@/types/social";
import { useEffect, useState } from "react";
import { Paginations } from "../globals/Paginations";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import AcceptFollowBtn from "./AcceptFollowBtn";

interface PendingFollowsDialogProps {
  initialData: PageItem<FollowRequestItem>;
}

export default function PendingFollowsDialog({
  initialData,
}: PendingFollowsDialogProps) {
  const [page, setPage] = useState<number>(0);
  const [pendingFollowRequestPagingData, setPendingFollowRequestPagingData] =
    useState<PageItem<FollowRequestItem> | null>(initialData);
  const { toast } = useToast();

  async function getReceivedStars() {
    const data = await getPendingFollowRequest(page);
    if ("error" in data) {
      return toast({
        title: "실패",
        description: data.error.message,
        variant: "destructive",
      });
    }
    setPendingFollowRequestPagingData(data);
  }

  useEffect(() => {
    getReceivedStars();
  }, [page]);

  if (!pendingFollowRequestPagingData) return;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>대기중인 팔로우 요청</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-1 gap-4">
          {pendingFollowRequestPagingData.results.length > 0 &&
            pendingFollowRequestPagingData.results.map((request) => (
              <div
                key={request.id}
                className="flex justify-between items-center"
              >
                <div key={request.id} className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={getProfileImage(request.profileImageUrl)}
                      alt={request.username}
                    />
                    <AvatarFallback>{`@${request.username}`}</AvatarFallback>
                  </Avatar>
                  <h4 className="font-medium">{request.username}</h4>
                </div>
                <AcceptFollowBtn followId={request.id} />
              </div>
            ))}
          {pendingFollowRequestPagingData.results.length <= 0 && (
            <span className="text-sm text-center font-semibold">
              대기 중인 팔로우 요청이 없습니다.
            </span>
          )}
        </div>
      </div>
      <Paginations
        setPage={setPage}
        pagingData={pendingFollowRequestPagingData}
      />
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            닫기
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
