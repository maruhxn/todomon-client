"use client";

import { getProfileImage } from "@/lib/utils";
import { PageItem } from "@/types/globals";
import { FollowingItem } from "@/types/social";
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

export default function FollowingListDialog({
  followingsPagingData,
  setPage,
}: {
  followingsPagingData: PageItem<FollowingItem>;
  setPage: any;
}) {
  return (
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
  );
}
