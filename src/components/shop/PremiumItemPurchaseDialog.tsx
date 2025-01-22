"use client";

import { getSession } from "@/apis/repository/global-action";
import { preparePaymentRequest } from "@/apis/repository/payment.repository";
import { useToast } from "@/hooks/use-toast";
import { ShopItem } from "@/types/shop";
import { redirect, useRouter } from "next/navigation";
import Script from "next/script";
import { useState } from "react";
import { Button } from "../ui/button";

declare const window: typeof globalThis & {
  IMP: any;
};

interface RealMoneyItemPurchaseDialogProps {
  item: ShopItem;
}

export default function RealMoneyItemPurchaseDialog({
  item,
}: RealMoneyItemPurchaseDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();

  async function purchase() {
    setIsLoading(true);
    const userInfo = await getSession();

    if (!userInfo) redirect("/");

    const payload = {
      merchant_uid: Date.now().toString(),
      amount: item.price,
      quantity: 1,
      itemId: item.id,
    };

    const err = await preparePaymentRequest(payload);

    if (err?.error) {
      setIsLoading(false);
      return toast({
        title: "결제 정보 등록 실패",
        description: err.error.message,
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
          setIsLoading(false);
        }
      }
    );
  }

  return (
    <>
      <Button
        className="w-full text-lg py-6"
        onClick={purchase}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "구매"}
      </Button>
      <Script src="https://cdn.iamport.kr/v1/iamport.js" />
    </>
  );
}
