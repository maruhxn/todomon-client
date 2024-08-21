"use client";

import { respondFollowRequest } from "@/apis/repository/social.repository";
import { useToast } from "@/hooks/use-toast";
import { CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";

export default function AcceptFollowBtn({ followId }: { followId: number }) {
  const { toast } = useToast();
  const [isAccepted, setIsAccepted] = useState<boolean | null>(null);

  async function acceptRequest() {
    try {
      await respondFollowRequest(followId, true);
      setIsAccepted(true);
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

  async function rejectRequest() {
    try {
      await respondFollowRequest(followId, false);
      setIsAccepted(false);
      toast({
        title: "성공",
        description: "요청을 거절했습니다",
      });
    } catch (error: any) {
      return toast({
        title: "실패",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex gap-4">
      {isAccepted === null ? (
        <>
          <CheckIcon
            onClick={acceptRequest}
            className="size-8 rounded-lg hover:bg-muted p-1 cursor-pointer text-muted-foreground"
          />
          <XIcon
            onClick={rejectRequest}
            className="size-8 rounded-lg hover:bg-muted p-1 cursor-pointer text-muted-foreground"
          />
        </>
      ) : (
        <p className="text-sm font-semibold rounded-lg flex items-center gap-2 px-2 py-1 bg-muted text-muted-foreground">
          {isAccepted === true ? "수락됨" : "거절됨"}
        </p>
      )}
    </div>
  );
}
