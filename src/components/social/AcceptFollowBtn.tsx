"use client";

import { respondFollowRequest } from "@/apis/repository/follow.repository";
import { useToast } from "@/hooks/use-toast";
import { CheckIcon, XIcon } from "lucide-react";
import { useState } from "react";

export default function AcceptFollowBtn({ followId }: { followId: number }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAccepted, setIsAccepted] = useState<boolean | null>(null);

  async function acceptRequest() {
    setIsLoading(true);
    const err = await respondFollowRequest(followId, true);
    if (err?.error) {
      return toast({
        title: "실패",
        description: err.error.message,
        variant: "destructive",
      });
    }
    setIsAccepted(true);
    setIsLoading(false);
    window.location.reload();
  }

  async function rejectRequest() {
    setIsLoading(true);
    const err = await respondFollowRequest(followId, false);
    if (err?.error) {
      return toast({
        title: "실패",
        description: err.error.message,
        variant: "destructive",
      });
    }
    setIsAccepted(false);
    setIsLoading(false);
    window.location.reload();
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
        !isLoading && (
          <p className="text-sm font-semibold rounded-lg flex items-center gap-2 px-2 py-1 bg-muted text-muted-foreground">
            {isAccepted === true ? "수락됨" : "거절됨"}
          </p>
        )
      )}
    </div>
  );
}
