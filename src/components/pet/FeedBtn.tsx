"use client";
import { feedToPetRequest } from "@/apis/repository/pet.repository";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

export default function FeedBtn({ petId }: { petId: number }) {
  const [feedCnt, setFeedCnt] = useState<number>(0);
  const { toast } = useToast();

  async function withdraw() {
    const err = await feedToPetRequest(petId, feedCnt);

    if (err?.error) {
      return toast({
        title: "실패",
        description: err.error.message,
        variant: "destructive",
      });
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full h-8">먹이 주기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>먹이 주기</DialogTitle>
        </DialogHeader>
        <Input
          type="number"
          value={feedCnt}
          min={1}
          required
          onChange={(e) => setFeedCnt(parseInt(e.currentTarget.value))}
        />
        <DialogFooter>
          <DialogClose>
            <Button onClick={withdraw} type="button" variant="destructive">
              확인
            </Button>
          </DialogClose>
          <DialogClose>
            <Button type="button" variant="secondary">
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
