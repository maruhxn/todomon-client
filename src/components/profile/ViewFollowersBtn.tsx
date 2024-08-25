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

import { useState } from "react";

interface ViewFollowersBtnProps {
  memberId: number;
  followerCnt: number;
}

export default function ViewFollowersBtn({
  memberId,
  followerCnt,
}: ViewFollowersBtnProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [followers, setFollowers] = useState<FollowerItem[]>([]);
  const { toast } = useToast();

  async function getFollowerList() {
    try {
      const data = await getFollowerRequest(memberId, 0);
      setFollowers(data!.results);
    } catch (error: any) {
      return toast({
        title: "실패",
        description: error.message,
        variant: "destructive",
      });
    }
  }

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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Followers</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            {followers.length > 0 &&
              followers.map((follower) => (
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
            {followers.length <= 0 && (
              <span className="text-sm text-center">
                팔로우한 유저가 없습니다.
              </span>
            )}
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
