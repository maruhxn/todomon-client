"use client";

import {
  removeFollowerRequest,
  sendFollowOrMatFollowRequest,
} from "@/apis/repository/follow.repository";
import { useToast } from "@/hooks/use-toast";
import { FollowerItem } from "@/types/social";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

interface FollowerListButtonsProps {
  follower: FollowerItem;
}

export default function FollowerListButtons({
  follower,
}: FollowerListButtonsProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function matFollow() {
    setIsLoading(true);
    const err = await sendFollowOrMatFollowRequest(follower.followerId);
    setIsLoading(false);
    if (err?.error) {
      return toast({
        title: "실패",
        description: err?.error.message,
        variant: "destructive",
      });
    }
    window.location.reload();
  }

  async function removeFollower() {
    setIsLoading(true);
    const err = await removeFollowerRequest(follower.followerId);
    setIsLoading(false);
    if (err?.error) {
      return toast({
        title: "실패",
        description: err?.error.message,
        variant: "destructive",
      });
    }
    window.location.reload();
  }

  return (
    <div className="flex gap-2">
      {follower?.matFollow === false && (
        <Button
          onClick={matFollow}
          variant="default"
          className="text-xs"
          disabled={isLoading}
        >
          맞팔
        </Button>
      )}

      <Button
        onClick={removeFollower}
        variant="outline"
        className="text-xs"
        disabled={isLoading}
      >
        삭제
      </Button>
    </div>
  );
}
