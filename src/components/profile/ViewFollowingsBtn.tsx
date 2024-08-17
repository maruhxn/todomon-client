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
import { FollowItem } from "@/types/social";
import { useState } from "react";

interface ViewFollowingsBtnProps {
  memberId: number;
  followingCnt: number;
}

export default function ViewFollowingsBtn({
  memberId,
  followingCnt,
}: ViewFollowingsBtnProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [followings, setFollowings] = useState<FollowItem[]>([]);
  const { toast } = useToast();

  async function getFollowingList() {
    try {
      const data = await getFollowingRequest(memberId);
      setFollowings(data!);
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
          onClick={getFollowingList}
        >
          <span className="font-medium">{followingCnt}</span> following
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Following</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            {followings.length > 0 &&
              followings.map((following) => (
                <div className="flex items-center gap-4">
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
            {followings.length <= 0 && (
              <span className="text-sm text-center">
                팔로잉한 유저가 없습니다.
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
