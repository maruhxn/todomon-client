"use client";

import {
  respondFollowRequest,
  sendFollowOrMatFollowRequest,
  unfollowRequest,
} from "@/apis/repository/follow.repository";
import { useToast } from "@/hooks/use-toast";
import { FollowInfoItem } from "@/types/profile";
import { Button } from "../ui/button";

/*
    팔로우 요청 보냈음
        + 대기 중 -> 팔로우 요청 취소 버튼
        + 수락됨 -> 언팔로우 버튼
        + 거절됨 -> 팔로우 버튼
    팔로우 요청 보낸 적 없음
        + 상대도 보낸 적 없거나 보냈는데 거절되었음 -> 팔로우 버튼
        + 상대는 보냈음
        대기 중 -> 팔로우 수락 버튼
        수락됨 -> 맞팔로우 버튼
*/

interface FollowInfoBtnProps {
  memberId: number;
  followInfo: FollowInfoItem;
}

export default function FollowInfoBtn({
  followInfo,
  memberId,
}: FollowInfoBtnProps) {
  const { toast } = useToast();

  async function sendFollowOrMatFollow() {
    try {
      await sendFollowOrMatFollowRequest(memberId);
      toast({
        title: "성공",
        description: "팔로우 요청을 보냈습니다",
      });
    } catch (error: any) {
      return toast({
        title: "실패",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  async function unFollow() {
    try {
      await unfollowRequest(memberId);
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

  async function matFollow() {
    try {
      await sendFollowOrMatFollowRequest(memberId);
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

  async function acceptFollowRequest() {
    try {
      await respondFollowRequest(followInfo.receivedRequestId, true);
      toast({
        title: "성공",
        description: "팔로우 요청을 수락했습니다",
      });
    } catch (error: any) {
      return toast({
        title: "실패",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return followInfo.isFollowing &&
    followInfo.sentFollowStatus !== "REJECTED" ? ( // 팔로우 요청 보냈을 경우
    followInfo.sentFollowStatus === "PENDING" ? ( // 팔로우 수락 대기 중
      <Button onClick={unFollow} variant="destructive">
        팔로우 요청 취소
      </Button>
    ) : (
      // 팔로우 수락됨
      <Button onClick={unFollow} variant="destructive">
        언팔로우
      </Button>
    )
  ) : // 팔로우 요청 보낸 적 없음
  followInfo.receivedRequestId &&
    followInfo.receivedFollowStatus !== "REJECTED" ? ( // 상대는 보냈음
    followInfo.receivedFollowStatus === "PENDING" ? ( // 받은 요청이 대기 중
      <Button
        onClick={acceptFollowRequest}
        className="bg-blue-500 hover:bg-blue-600"
      >
        팔로우 수락
      </Button>
    ) : (
      // 받은 요청이 수락되었음

      <Button onClick={matFollow} className="bg-blue-500 hover:bg-blue-600">
        맞팔로우
      </Button>
    )
  ) : (
    // 상대도 보낸 적 없음

    <Button
      onClick={sendFollowOrMatFollow}
      className="bg-blue-500 hover:bg-blue-600"
    >
      팔로우
    </Button>
  );
}
