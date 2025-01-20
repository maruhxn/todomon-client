"use client";

import { refundRequest } from "@/apis/repository/payment.repository";
import { useToast } from "@/hooks/use-toast";
import { OrderItem } from "@/types/order";
import { useState } from "react";
import { Button } from "../ui/button";

interface RefundBtnProps {
  order: OrderItem;
}

export default function RefundBtn({ order }: RefundBtnProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  async function handleRefund() {
    setIsLoading(true);
    const err = await refundRequest(order.merchantUid);
    setIsLoading(false);
    if (err?.error) {
      return toast({
        title: "환불 실패",
        description: err.error.message,
        variant: "destructive",
      });
    }
    return toast({
      title: "환불 처리 완료",
      description: `주문 번호 ${order.merchantUid}가 환불 처리되었습니다.`,
    });
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleRefund}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : "환불"}
    </Button>
  );
}
