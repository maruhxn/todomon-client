"use client";

import { respondFollowRequest } from "@/apis/repository/follow.repository";
import { XIcon } from "lucide-react";

export default function RejectFollowBtn({ followId }: { followId: number }) {
  async function rejectRequest() {
    await respondFollowRequest(followId, false);
  }

  return (
    <XIcon
      onClick={rejectRequest}
      className="size-8 rounded-lg hover:bg-muted p-1 cursor-pointer text-muted-foreground"
    />
  );
}
