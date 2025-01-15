import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Icons } from "./Icons";

/* OAUTH2 */
export const GOOGLE_LOGIN_URL = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`;
export const NAVER_LOGIN_URL = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/naver`;
export const KAKAO_LOGIN_URL = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`;

export default function LoginModal() {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-3xl text-center font-bold">
          Todomon
        </DialogTitle>
        <DialogDescription className="text-center">
          소셜 로그인을 통해 투두몬에 로그인/회원가입 하세요!
        </DialogDescription>
      </DialogHeader>
      <div className="mt-2 grid grid-cols-1 gap-3">
        <Link
          className={cn(buttonVariants(), "w-full text-white h-12")}
          href={GOOGLE_LOGIN_URL}
        >
          <Icons.google className="h-4 w-4 mr-2" />
          Google Login
        </Link>

        <Link
          className={cn(buttonVariants(), "w-full text-white h-12")}
          href={KAKAO_LOGIN_URL}
        >
          <Icons.kakao className="h-4 w-4 mr-2" />
          Kakao Login
        </Link>

        <Link
          className={cn(buttonVariants(), "w-full text-white h-12")}
          href={NAVER_LOGIN_URL}
        >
          <Icons.naver className="h-4 w-4 mr-2" />
          Naver Login
        </Link>
      </div>
    </DialogContent>
  );
}
