"use client";

import { withdrawRequest } from "@/apis/repository/members.repository";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function WithdrawBtn({ memberId }: { memberId: number }) {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  async function withdraw() {
    const result = await withdrawRequest(memberId);
    setOpen(false);
    if (result) {
      return toast({
        title: "실패",
        description: result.error.message,
        variant: "destructive",
      });
    } else {
      return toast({
        title: "성공",
        description: "투두 생성에 성공했습니다",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          회원 탈퇴
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>회원 탈퇴</DialogTitle>
          <DialogDescription>정말로 회원을 탈퇴하시겠습니까?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={withdraw} type="button" variant="destructive">
              네
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              아니요
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
