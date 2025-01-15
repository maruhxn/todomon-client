"use client";

import { unfollowRequest } from "@/apis/repository/follow.repository";
import { sendStarRequest } from "@/apis/repository/star-trasactions.repository";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";

interface FollowingBtnGroupProps {
  memberId: number;
}

export default function FollowingBtnGroup({
  memberId,
}: FollowingBtnGroupProps) {
  const { toast } = useToast();
  async function sendStar() {
    try {
      await sendStarRequest(memberId);
      toast({
        title: "성공",
      });
    } catch (error: any) {
      return toast({
        title: "실패",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  async function unfollow() {
    try {
      await unfollowRequest(memberId);
      toast({
        title: "성공",
      });
    } catch (error: any) {
      console.error(error);
      return toast({
        title: "실패",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex gap-2">
      <Button variant="default" onClick={sendStar} className="text-xs">
        ⭐️
      </Button>
      <Button variant="outline" onClick={unfollow} className="text-xs">
        삭제
      </Button>
    </div>
  );
}
