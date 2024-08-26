"use client";

import { getFollowingRequest } from "@/apis/repository/follow.repository";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { getProfileImage } from "@/lib/utils";
import { PageItem } from "@/types/globals";
import { FollowingItem } from "@/types/social";

import { useEffect, useState } from "react";
import { Paginations } from "../globals/Paginations";

interface ViewFollowingsBtnProps {
  memberId: number;
  followingCnt: number;
}

export default function ViewFollowingsBtn({
  memberId,
  followingCnt,
}: ViewFollowingsBtnProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [followingsPagingData, setFollowingsPagingData] =
    useState<PageItem<FollowingItem> | null>(null);

  const { toast } = useToast();

  async function getFollowingList() {
    try {
      const data = await getFollowingRequest(memberId, 0);
      setFollowingsPagingData(data);
    } catch (error: any) {
      return toast({
        title: "실패",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    getFollowingList();
  }, [page]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className="cursor-pointer rounded-md hover:ring-offset-4 hover:ring-black hover:ring-2"
          onClick={getFollowingList}
        >
          <span className="font-medium">{followingCnt}</span> 팔로잉
        </div>
      </DialogTrigger>
      {followingsPagingData && (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Following</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              {followingsPagingData.results.length > 0 &&
                followingsPagingData.results.map((following) => (
                  <div
                    key={following.followeeId}
                    className="flex items-center gap-4"
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={getProfileImage(following.profileImageUrl)}
                        alt={`@${following.username}`}
                      />
                      <AvatarFallback>{`@${following.username}`}</AvatarFallback>
                    </Avatar>
                    <h4 className="font-medium">{following.username}</h4>
                  </div>
                ))}
              {followingsPagingData.results.length <= 0 && (
                <span className="text-sm text-center">
                  팔로잉한 유저가 없습니다.
                </span>
              )}
            </div>
          </div>
          <Paginations setPage={setPage} pagingData={followingsPagingData} />
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">닫기</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
