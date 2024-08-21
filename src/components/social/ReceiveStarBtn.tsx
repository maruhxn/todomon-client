"use client";

import { receiveStarRequest } from "@/apis/repository/star-trasactions.repository";
import { useToast } from "@/hooks/use-toast";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

interface ReceiveStarBtnProps {
  transactionId: number;
}

export default function ReceiveStarBtn({ transactionId }: ReceiveStarBtnProps) {
  const { toast } = useToast();
  const [isReceived, setIsReceived] = useState<boolean>(false);

  async function receiveOneStar() {
    try {
      await receiveStarRequest(transactionId);
      setIsReceived(true);
      toast({
        title: "성공",
        description: "⭐️을 받았습니다",
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
    <>
      {isReceived ? (
        <p className="text-sm font-semibold rounded-lg flex items-center gap-2 px-2 py-1 bg-muted text-muted-foreground">
          OK
        </p>
      ) : (
        <CheckIcon onClick={receiveOneStar} className="size-4 cursor-pointer" />
      )}
    </>
  );
}
