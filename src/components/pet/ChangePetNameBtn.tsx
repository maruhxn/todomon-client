"use client";

import { applyItemRequest } from "@/apis/repository/item.repository";
import {
  ChangePetNameRequest,
  ChangePetNameValidator,
} from "@/apis/validators/pets.validator";
import { useToast } from "@/hooks/use-toast";
import { PetItem } from "@/types/pet";
import { zodResolver } from "@hookform/resolvers/zod";
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

export default function ChangePetNameBtn({ pet }: { pet: PetItem }) {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<ChangePetNameRequest>({
    resolver: zodResolver(ChangePetNameValidator),
    defaultValues: {
      petId: pet.id,
      name: pet.name,
      color: pet.color,
    },
  });

  async function changePetName(payload: ChangePetNameRequest) {
    const err = await applyItemRequest("펫 이름 변경권", {
      type: "changePetName",
      ...payload,
    });

    form.reset();

    setOpen(false);

    if (err?.error) {
      return toast({
        title: "실패",
        description: err.error.message,
        variant: "destructive",
      });
    }

    return toast({
      title: "성공",
      description: "이름 변경에 성공했습니다",
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full h-8 mt-2">이름 변경</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>펫 이름 변경</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(changePetName)}
            className="flex flex-col space-y-4 px-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-col">
                  <div className="flex items-center space-x-4">
                    <FormLabel>이름</FormLabel>
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
              <Button type="submit" disabled={form.formState.isSubmitting}>
                저장
              </Button>
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
