"use client";

import {
  getReceivedStarsRequest,
  receiveAllStarsRequest,
} from "@/apis/repository/star-trasactions.repository";
import { useToast } from "@/hooks/use-toast";
import { PageItem } from "@/types/globals";
import { ReceivedStarItem } from "@/types/social";
import { useEffect, useState } from "react";
import { Paginations } from "../globals/Paginations";
import ProfileIcon from "../globals/ProfileIcon";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import ReceiveStarBtn from "./ReceiveStarBtn";

export default function ReceivedStarsDialog({
  initialData,
}: {
  initialData: PageItem<ReceivedStarItem>;
}) {
  const [page, setPage] = useState<number>(0);
  const [receivedStarsPagingData, setReceivedStarsPagingData] =
    useState<PageItem<ReceivedStarItem> | null>(initialData);
  const { toast } = useToast();

  async function getReceivedStars() {
    const data = await getReceivedStarsRequest(page);
    if ("error" in data) {
      return toast({
        title: "실패",
        description: data.error.message,
        variant: "destructive",
      });
    }
    setReceivedStarsPagingData(data as PageItem<ReceivedStarItem>);
  }

  useEffect(() => {
    getReceivedStars();
  }, [page]);

  async function receiveAllStars() {
    const err = await receiveAllStarsRequest();
    if (err?.error) {
      return toast({
        title: "실패",
        description: err.error.message,
        variant: "destructive",
      });
    }
  }

  if (!receivedStarsPagingData) return;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>별 수신함</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-1 gap-4">
          {receivedStarsPagingData.results.length > 0 &&
            receivedStarsPagingData.results.map((request) => (
              <div
                key={request.id}
                className="flex justify-between items-center"
              >
                <div key={request.id} className="flex items-center gap-4">
                  <ProfileIcon
                    username={request.username}
                    profileImage={request.profileImageUrl}
                  />
                  <h4 className="font-medium">{request.username}</h4>
                </div>
                <ReceiveStarBtn transactionId={request.id} />
              </div>
            ))}
          {receivedStarsPagingData.results.length <= 0 && (
            <span className="text-sm text-center font-semibold">
              수신된 ⭐️이 없습니다
            </span>
          )}
        </div>
      </div>
      <Paginations setPage={setPage} pagingData={receivedStarsPagingData} />
      <DialogFooter>
        {receivedStarsPagingData.results.length > 0 && (
          <form action={receiveAllStars}>
            <Button type="button" variant="default">
              모두 받기
            </Button>
          </form>
        )}
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            닫기
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
