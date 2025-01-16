"use client";

import { getProfileImage } from "@/lib/utils";
import { PageItem } from "@/types/globals";
import { FollowerItem } from "@/types/social";
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

export default function FollowerList({
  followersPagingData,
  setPage,
}: {
  followersPagingData: PageItem<FollowerItem>;
  setPage: any;
}) {
  return (
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
  );
}
