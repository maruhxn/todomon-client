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
        description: "요청을 수락했습니다",
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
        description: "요청을 수락했습니다",
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
      <Button variant="default" onClick={sendStar} className="text-xs px-2">
        ⭐️ 보내기
      </Button>
      <Button variant="outline" onClick={unfollow} className="text-xs px-2">
        언팔로우
      </Button>
    </div>
  );
}
