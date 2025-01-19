"use client";

import { getSession } from "@/apis/repository/global-action";
import { validatePaymentRequest } from "@/apis/repository/item.repository";
import { useToast } from "@/hooks/use-toast";
import * as PortOne from "@portone/browser-sdk/v2";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

interface PaymentProps {
  orderName: string;
  totalAmount: number;
}

export default function KakaoPay({ orderName, totalAmount }: PaymentProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function purchase() {
    setIsLoading(true);
    const userInfo = await getSession();

    if (!userInfo) redirect("/");

    // const err1 = await preparePaymentRequest({});

    // if (err1?.error) {
    // setIsLoading(false)
    //   return toast({
    //     title: "결제 정보 등록 실패",
    //     description: err1.error.message,
    //     variant: "destructive",
    //   });
    // }

    const paymentId = `payment-${crypto.randomUUID()}`;

    const res = await PortOne.requestPayment({
      storeId: process.env.NEXT_PUBLIC_STORE_ID as string,
      channelKey: process.env.NEXT_PUBLIC_CHANNEL_KEY as string,
      paymentId,
      orderName,
      totalAmount,
      currency: "CURRENCY_KRW",
      payMethod: "EASY_PAY",
      easyPay: {
        easyPayProvider: "EASY_PAY_PROVIDER_KAKAOPAY",
      },
      customer: {
        fullName: userInfo.username,
      },
      noticeUrls: [
        "https://5366-125-246-74-238.ngrok-free.app/api/orders/valid",
      ],
    });

    // 결제 과정에서 오류가 발생
    if (res?.code !== undefined) {
      setIsLoading(false);
      return toast({
        title: "결제 실패",
        description: res.message,
        variant: "destructive",
      });
    }

    const validationPayload = {
      paymentId,
    };

    const notified = await validatePaymentRequest({} as any);
  }

  return (
    <Button onClick={purchase} disabled={isLoading}>
      구매하기
    </Button>
  );
}
