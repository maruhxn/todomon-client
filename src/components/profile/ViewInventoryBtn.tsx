"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

import { getInventoryItemsRequest } from "@/apis/repository/item.repository";
import { InventoryItemDto } from "@/types/item";
import { ShoppingBagIcon } from "lucide-react";
import { useState } from "react";
import InventoryItemList from "./InventoryItemList";

export default function ViewInventoryBtn() {
  const [open, setOpen] = useState<boolean>(false);
  const [inventoryItems, setInventoryItems] = useState<InventoryItemDto[]>([]);
  const { toast } = useToast();

  async function getInventoryItems() {
    const result = await getInventoryItemsRequest();

    if ("error" in result) {
      return toast({
        title: "실패",
        description: result.error.message,
        variant: "destructive",
      });
    }

    setInventoryItems(result);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full space-x-4"
          onClick={getInventoryItems}
        >
          <ShoppingBagIcon className="size-4" />
          <span>인벤토리 확인</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>인벤토리</DialogTitle>
        </DialogHeader>
        <InventoryItemList data={inventoryItems} />
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">닫기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
