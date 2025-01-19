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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isReceived, setIsReceived] = useState<boolean>(false);

  async function receiveOneStar() {
    setIsLoading(true);
    const err = await receiveStarRequest(transactionId);
    if (err?.error) {
      return toast({
        title: "실패",
        description: err.error.message,
        variant: "destructive",
      });
    }
    setIsReceived(true);
    setIsLoading(false);
  }
  return (
    <>
      {isReceived ? (
        <p className="text-sm font-semibold rounded-lg flex items-center gap-2 px-2 py-1 bg-muted text-muted-foreground">
          OK
        </p>
      ) : (
        !isLoading && (
          <CheckIcon
            onClick={receiveOneStar}
            className="size-4 cursor-pointer"
          />
        )
      )}
    </>
  );
}
