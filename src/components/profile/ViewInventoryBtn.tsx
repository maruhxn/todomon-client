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

export default function ViewInventoryBtn() {
  const [open, setOpen] = useState<boolean>(false);
  const [inventoryItems, setInventoryItems] = useState<InventoryItemDto[]>([]);
  const { toast } = useToast();

  async function getInventoryItems() {
    try {
      const data = await getInventoryItemsRequest();
      setInventoryItems(data);
    } catch (error: any) {
      return toast({
        title: "실패",
        description: error.message,
        variant: "destructive",
      });
    }
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

function InventoryItemList({ data }: { data: InventoryItemDto[] }) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-1 gap-4">
        {data.length > 0 &&
          data.map((inventoryItem) => (
            <div
              key={inventoryItem.id}
              className="flex items-center justify-between bg-background hover:bg-accent hover:text-accent-foreground hover:cursor-pointer px-4 py-2 rounded-lg"
            >
              <h4 className="font-medium">{inventoryItem.name}</h4>
              <h4 className="font-medium">{inventoryItem.quantity}개</h4>
            </div>
          ))}
        {data.length <= 0 && (
          <span className="text-sm text-center">
            인벤토리에 아이템이 없습니다.
          </span>
        )}
      </div>
    </div>
  );
}
