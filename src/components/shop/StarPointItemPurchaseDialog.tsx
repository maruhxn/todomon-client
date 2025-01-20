"use client";

import { getSession } from "@/apis/repository/global-action";
import {
  PreparePaymentRequest,
  purchaseStarPointItemRequest,
} from "@/apis/repository/payment.repository";
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
  setOpen: any;
}

export default function StarPointItemPurchaseDialog({
  item,
  setOpen,
}: StarPointItemPurchaseDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialValue = {
    merchant_uid: Date.now().toString(),
    amount: item.price,
    quantity: 1,
    itemId: item.id,
  };

  const { toast } = useToast();
  const [payload, setPayload] = useState<PreparePaymentRequest>(initialValue);

  async function purchase() {
    setIsLoading(true);
    const userInfo = await getSession();

    if (!userInfo) redirect("/");

    const err = await purchaseStarPointItemRequest(payload); // 구매 요청

    if (err?.error) {
      setOpen(false);
      setIsLoading(false);
      return toast({
        title: "구매 실패",
        description: err.error.message,
        variant: "destructive",
      });
    }

    setOpen(false);
    setIsLoading(false);
    return toast({
      title: "구매 성공",
    });
  }

  return (
    <DialogContent
      onEscapeKeyDown={(e) => e.preventDefault()}
      onPointerDown={(e) => e.preventDefault()}
      onInteractOutside={(e) => e.preventDefault()}
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
  );
}
