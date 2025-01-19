"use client";

import { getSession } from "@/apis/repository/global-action";
import {
  preparePaymentRequest,
  PreparePaymentRequest,
  purchaseStarPointItemRequest,
  validatePaymentRequest,
} from "@/apis/repository/item.repository";
import { useToast } from "@/hooks/use-toast";
import { ShopItem } from "@/types/shop";
import { redirect } from "next/navigation";
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
  const initialValue = {
    merchant_uid: Date.now().toString(),
    amount: item.price,
    quantity: 1,
    itemId: item.id,
  };

  const { toast } = useToast();
  const [payload, setPayload] = useState<PreparePaymentRequest>(initialValue);

  async function purchase() {
    const userInfo = await getSession();

    if (!userInfo) redirect("/");

    const err1 = await preparePaymentRequest(payload);

    if (err1?.error) {
      return toast({
        title: "결제 정보 등록 실패",
        description: err1.error.message,
        variant: "destructive",
      });
    }

    const err2 = await purchaseStarPointItemRequest(payload); // 구매 요청

    if (err2?.error) {
      return toast({
        title: "구매 실패",
        description: err2.error.message,
        variant: "destructive",
      });
    }

    const err3 = await validatePaymentRequest({
      merchant_uid: payload.merchant_uid,
    });

    if (err3?.error) {
      return toast({
        title: "결제 검증 실패",
        description: err3.error.message,
        variant: "destructive",
      });
    }
    return toast({
      title: "구매 성공",
    });
  }

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
