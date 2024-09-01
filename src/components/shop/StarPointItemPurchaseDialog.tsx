"use client";

import { getAuthRequest } from "@/apis/repository/auth.repository";
import {
  preparePaymentRequest,
  PreparePaymentRequest,
  purchaseStarPointItemRequest,
  validatePaymentRequest,
} from "@/apis/repository/item.repository";
import { useToast } from "@/hooks/use-toast";
import { ShopItem } from "@/types/shop";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";

interface StarPointItemPurchaseDialogProps {
  item: ShopItem;
}

export default function StarPointItemPurchaseDialog({
  item,
}: StarPointItemPurchaseDialogProps) {
  const { toast } = useToast();
  const initialValue = {
    merchant_uid: Date.now().toString(),
    amount: item.price,
    quantity: 1,
    itemId: item.id,
  };

  async function purchase() {
    try {
      const userInfo = await getAuthRequest();

      if (!userInfo) throw new Error("유저 정보가 없습니다.");

      await preparePaymentRequest(payload);

      try {
        await purchaseStarPointItemRequest(payload); // 구매 요청

        await validatePaymentRequest({ merchant_uid: payload.merchant_uid });

        return toast({
          title: "결제 성공",
        });
      } catch (error: any) {
        return toast({
          title: "결제 실패",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      return toast({
        title: "실패",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  const [payload, setPayload] = useState<PreparePaymentRequest>(initialValue);
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>아이템 구매</DialogTitle>
      </DialogHeader>
      <Input
        type="number"
        min={1}
        value={payload.quantity}
        onChange={(e) =>
          setPayload({
            ...payload,
            quantity: +e.target.value,
            amount: item.price * +e.target.value,
          })
        }
      />
      <DialogFooter>
        <DialogClose asChild>
          <Button onClick={purchase}>구매하기</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            닫기
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
