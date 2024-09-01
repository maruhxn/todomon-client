"use client";

import { refundRequest } from "@/apis/repository/item.repository";
import { useToast } from "@/hooks/use-toast";
import { OrderItem } from "@/types/order";
import { Button } from "../ui/button";

interface RefundBtnProps {
  order: OrderItem;
}

export default function RefundBtn({ order }: RefundBtnProps) {
  const { toast } = useToast();

  async function handleRefund() {
    try {
      await refundRequest(order.orderId);

      toast({
        title: "환불 처리 완료",
        description: `주문 번호 ${order.merchantUid}가 환불 처리되었습니다.`,
      });
    } catch (error: any) {
      console.error("환불 실패:", error);
      return toast({
        title: "환불 실패",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleRefund}>
      환불
    </Button>
  );
}
