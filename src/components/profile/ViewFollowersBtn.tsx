"use client";

import { getFollowerRequest } from "@/apis/repository/follow.repository";
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
import { FollowerItem } from "@/types/social";

import { PageItem } from "@/types/globals";
import { useEffect, useState } from "react";
import { Paginations } from "../globals/Paginations";

interface ViewFollowersBtnProps {
  memberId: number;
  followerCnt: number;
}

export default function ViewFollowersBtn({
  memberId,
  followerCnt,
}: ViewFollowersBtnProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [followersPagingData, setFollowersPagingData] =
    useState<PageItem<FollowerItem> | null>(null);
  const { toast } = useToast();

  async function getFollowerList() {
    try {
      const data = await getFollowerRequest(memberId, page);
      setFollowersPagingData(data);
      console.log(data);
    } catch (error: any) {
      return toast({
        title: "실패",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    getFollowerList();
  }, [page]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className="cursor-pointer rounded-md hover:ring-offset-4 hover:ring-black hover:ring-2"
          onClick={getFollowerList}
        >
          <span className="font-medium">{followerCnt}</span> 팔로워
        </div>
      </DialogTrigger>
      {followersPagingData && (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Followers</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              {followersPagingData!.results.length > 0 &&
                followersPagingData!.results.map((follower) => (
                  <div
                    key={follower.followerId}
                    className="flex items-center gap-4"
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={getProfileImage(follower.profileImageUrl)}
                        alt={`@${follower.username}`}
                      />
                      <AvatarFallback>{`@${follower.username}`}</AvatarFallback>
                    </Avatar>
                    <h4 className="font-medium">{follower.username}</h4>
                  </div>
                ))}
              {followersPagingData!.results.length <= 0 && (
                <span className="text-sm text-center">
                  팔로우한 유저가 없습니다.
                </span>
              )}
            </div>
          </div>
          <Paginations setPage={setPage} pagingData={followersPagingData} />
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
