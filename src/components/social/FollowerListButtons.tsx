"use client";

import {
  removeFollowerRequest,
  sendFollowOrMatFollowRequest,
} from "@/apis/repository/follow.repository";
import { FollowerItem } from "@/types/social";
import { Button } from "../ui/button";

interface FollowerListButtonsProps {
  follower: FollowerItem;
}

export default function FollowerListButtons({
  follower,
}: FollowerListButtonsProps) {
  async function matFollow() {
    await sendFollowOrMatFollowRequest(follower.followerId);
  }

  async function removeFollower() {
    await removeFollowerRequest(follower.followerId);
  }

  return (
    <div className="flex gap-2">
      {follower?.matFollow === false && (
        <form action={matFollow}>
          <Button variant="default" className="text-xs">
            맞팔
          </Button>
        </form>
      )}
      <form action={removeFollower}>
        <Button variant="outline" className="text-xs">
          삭제
        </Button>
      </form>
    </div>
  );
}
