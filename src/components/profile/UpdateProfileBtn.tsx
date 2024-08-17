"use client";

import { updateProfileRequest } from "@/apis/repository/members.repository";
import {
  UpdateProfileRequest,
  UpdateProfileValidator,
} from "@/apis/validators/members.validator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ProfileDto } from "@/types/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export default function UpdateProfileBtn({ profile }: { profile: ProfileDto }) {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<UpdateProfileRequest>({
    resolver: zodResolver(UpdateProfileValidator),
    defaultValues: {
      username: profile.username,
    },
  });

  async function updateProfile({
    username,
    profileImage,
  }: UpdateProfileRequest) {
    try {
      const formData = new FormData();
      formData.append("username", username);
      if (profileImage) formData.append("profileImage", profileImage[0]);

      await updateProfileRequest(profile.id, formData);

      form.reset();

      setOpen(false);

      toast({
        title: "성공",
        description: "프로필 수정에 성공했습니다",
      });
    } catch (error: any) {
      console.error(error);
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
        <Button variant="outline" className="w-full">
          Update Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>회원정보 수정</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(updateProfile)}
            className="flex flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex-col">
                  <div className="flex items-center space-x-4">
                    <FormLabel className="w-32 text-right">유저명</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profileImage"
              render={({ field: { onChange }, ...field }) => (
                <FormItem className="flex-col">
                  <div className="flex items-center space-x-4">
                    <FormLabel className="w-32 text-right">
                      프로필 이미지
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        disabled={form.formState.isSubmitting}
                        className="w-full"
                        {...field}
                        onChange={(event) => {
                          onChange(event.target.files);
                        }}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">저장</Button>
              <div>
                <Button type="button" variant="outline">
                  닫기
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
