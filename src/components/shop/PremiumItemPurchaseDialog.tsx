"use client";

import { getAuthRequest } from "@/apis/repository/auth.repository";
import {
  PaymentRequest,
  preparePaymentRequest,
  PreparePaymentRequest,
  validatePaymentRequest,
} from "@/apis/repository/item.repository";
import { useToast } from "@/hooks/use-toast";
import { ShopItem } from "@/types/shop";
import Script from "next/script";
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

declare const window: typeof globalThis & {
  IMP: any;
};

interface PremiumItemPurchaseDialogProps {
  item: ShopItem;
}

export default function PremiumItemPurchaseDialog({
  item,
}: PremiumItemPurchaseDialogProps) {
  const { toast } = useToast();
  const initialValue = {
    merchant_uid: Date.now().toString(),
    amount: item.price,
    quantity: 1,
    itemId: item.id,
  };

  const [payload, setPayload] = useState<PreparePaymentRequest>(initialValue);

  async function purchase() {
    try {
      const userInfo = await getAuthRequest();

      if (!userInfo) throw new Error("유저 정보가 없습니다.");

      await preparePaymentRequest(payload);

      const { merchant_uid, amount, quantity, itemId } = payload;

      const { IMP } = window;

      IMP.init(process.env.NEXT_PUBLIC_MERCHANT_ID);

      IMP.request_pay(
        {
          pg: "html5_inicis.INIpayTest",
          pay_method: "card",
          name: item.name,
          merchant_uid,
          amount,
          buyer_name: userInfo.username,
        },
        async (res: any) => {
          try {
            if (!res.success) throw new Error(res.error_msg);

            const validationPayload: PaymentRequest = {
              merchant_uid,
              imp_uid: res.imp_uid,
            };

            await validatePaymentRequest(validationPayload);

            return toast({
              title: "결제 성공",
            });
          } catch (error: any) {
            console.error("결제 실패:", error);
            return toast({
              title: "결제 실패",
              description: error.message,
              variant: "destructive",
            });
          }
        }
      );
    } catch (error: any) {
      console.error("결제 정보 사전 등록 실패:", error);
      return toast({
        title: "결제 정보 사전 등록 실패",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <>
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
      <Script src="https://cdn.iamport.kr/v1/iamport.js" />
    </>
  );
}
