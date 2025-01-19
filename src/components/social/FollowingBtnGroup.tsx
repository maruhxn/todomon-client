"use client";

import { unfollowRequest } from "@/apis/repository/follow.repository";
import { sendStarRequest } from "@/apis/repository/star-trasactions.repository";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Button } from "../ui/button";

interface FollowingBtnGroupProps {
  memberId: number;
}

export default function FollowingBtnGroup({
  memberId,
}: FollowingBtnGroupProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  async function sendStar() {
    setIsLoading(true);
    const err = await sendStarRequest(memberId);
    setIsLoading(false);
    if (err?.error) {
      return toast({
        title: "실패",
        description: err.error.message,
        variant: "destructive",
      });
    }
    window.location.reload();
  }

  async function unfollow() {
    setIsLoading(true);
    const err = await unfollowRequest(memberId);
    setIsLoading(false);
    if (err?.error) {
      return toast({
        title: "실패",
        description: err.error.message,
        variant: "destructive",
      });
    }
    window.location.reload();
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="default"
        onClick={sendStar}
        className="text-xs"
        disabled={isLoading}
      >
        ⭐️
      </Button>
      <Button
        variant="outline"
        onClick={unfollow}
        className="text-xs"
        disabled={isLoading}
      >
        삭제
      </Button>
    </div>
  );
}
