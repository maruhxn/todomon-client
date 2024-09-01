"use client";

import { applyItemRequest } from "@/apis/repository/item.repository";
import {
  CreateTitleNameRequest,
  CreateTitleNameValidator,
} from "@/apis/validators/titleName.validator";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrophyIcon } from "lucide-react";
import { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useForm } from "react-hook-form";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export default function AddTitleNameBtn() {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<CreateTitleNameRequest>({
    resolver: zodResolver(CreateTitleNameValidator),
  });

  async function createTitleName(payload: CreateTitleNameRequest) {
    try {
      await applyItemRequest("칭호 변경권", {
        type: "upsertTitleName",
        ...payload,
      });

      form.reset();

      setOpen(false);

      toast({
        title: "성공",
        description: "칭호 생성에 성공했습니다",
      });
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
        <Button variant="outline" className="gap-2">
          <TrophyIcon className="w-4 h-4" />
          칭호
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>칭호 추가</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(createTitleName)}
            className="flex flex-col space-y-4 px-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-col">
                  <div className="flex items-center space-x-4">
                    <FormLabel>칭호명</FormLabel>
                    <FormControl>
                      <Input className="flex-1" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className="flex justify-end" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="flex-col">
                  <div className="flex items-center space-x-4">
                    <FormLabel>칭호색</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-2">
                        <HexColorPicker
                          color={field.value ?? ""}
                          onChange={field.onChange}
                        />
                        <HexColorInput
                          className="font-bold text-sm text-center"
                          color={field.value ?? ""}
                          onChange={field.onChange}
                          placeholder="6자리 HEX 코드를 입력하세요."
                          prefixed
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage className="flex justify-end" />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">저장</Button>
              <DialogClose>
                <Button type="button" variant="outline">
                  닫기
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
