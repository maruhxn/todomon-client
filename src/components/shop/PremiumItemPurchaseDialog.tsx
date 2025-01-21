"use client";

import { getSession } from "@/apis/repository/global-action";
import {
  preparePaymentRequest,
  PreparePaymentRequest,
} from "@/apis/repository/payment.repository";
import { useToast } from "@/hooks/use-toast";
import { ShopItem } from "@/types/shop";
import { redirect, useRouter } from "next/navigation";
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

interface RealMoneyItemPurchaseDialogProps {
  item: ShopItem;
  setOpen: any;
}

export default function RealMoneyItemPurchaseDialog({
  item,
  setOpen,
}: RealMoneyItemPurchaseDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialValue = {
    merchant_uid: Date.now().toString(),
    amount: item.price,
    quantity: 1,
    itemId: item.id,
  };
  const { toast } = useToast();
  const router = useRouter();
  const [payload, setPayload] = useState<PreparePaymentRequest>(initialValue);

  async function purchase() {
    setIsLoading(true);
    const userInfo = await getSession();

    if (!userInfo) redirect("/");

    const err1 = await preparePaymentRequest(payload);

    if (err1?.error) {
      setOpen(false);
      setIsLoading(false);
      return toast({
        title: "결제 정보 등록 실패",
        description: err1.error.message,
        variant: "destructive",
      });
    }

    const { merchant_uid, amount } = payload;

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

          // const validationPayload: PaymentRequest = {
          //   merchant_uid,
          //   imp_uid: res.imp_uid,
          // };

          // const err2 = await validatePaymentRequest(validationPayload);

          // if (err2?.error) {
          //   throw new Error(err2.error.message);
          // }

          // const err3 = await purchasePremiumItemRequest(merchant_uid);

          // if (err3?.error) {
          //   throw new Error(err3.error.message);
          // }
          toast({
            title: "결제 성공",
          });
          router.push("/payment/success");
        } catch (error: any) {
          toast({
            title: "결제 실패",
            description: error.message,
            variant: "destructive",
          });
        } finally {
          setOpen(false);
          setIsLoading(false);
        }
      }
    );
  }

  return (
    <>
      <DialogContent
      // onEscapeKeyDown={(e) => e.preventDefault()}
      // onPointerDown={(e) => e.preventDefault()}
      // onInteractOutside={(e) => e.preventDefault()}
      >
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
          <Button onClick={purchase} disabled={isLoading}>
            {isLoading ? "Loading..." : "구매하기"}
          </Button>
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
