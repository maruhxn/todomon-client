import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "./Icons";
import { buttonVariants } from "./ui/button";

/* OAUTH2 */
export const GOOGLE_LOGIN_URL = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`;
export const NAVER_LOGIN_URL = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/naver`;
export const KAKAO_LOGIN_URL = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`;

const socialLoginBtnCss =
  "flex justify-center items-center size-[44px] border-none cursor-pointer rounded-sm";

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
      {/* <Separator className="my-1 bg-black/60" /> */}
      {/* <div className="w-fit mx-auto flex space-x-2">
        <GoogleLoginIcon />
        <KakaoLoginIcon />
        <NaverLoginIcon />
      </div> */}
      <div className="mt-2 grid grid-cols-1 gap-3">
        <Link
          className={cn(buttonVariants(), "w-full text-white")}
          href={GOOGLE_LOGIN_URL}
        >
          <Icons.google className="h-4 w-4 mr-2" />
          Google Login
        </Link>

        <Link
          className={cn(buttonVariants(), "w-full text-white")}
          href={KAKAO_LOGIN_URL}
        >
          <Icons.kakao className="h-4 w-4 mr-2" />
          Kakao Login
        </Link>

        <Link
          className={cn(buttonVariants(), "w-full text-white")}
          href={NAVER_LOGIN_URL}
        >
          <Icons.naver className="h-4 w-4 mr-2" />
          Naver Login
        </Link>
      </div>
    </DialogContent>
  );
}

function GoogleLoginIcon() {
  return (
    <Link href="http://localhost:8080/oauth2/authorization/google">
      <button
        id="Google-로그인-버튼"
        className={cn("bg-[#f8f8f8]", socialLoginBtnCss)}
        data-provider="Google"
        aria-label="구글로 로그인"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            fill="#4285F4"
            d="M17.785 9.169c0-.738-.06-1.276-.189-1.834h-8.42v3.328h4.942c-.1.828-.638 2.073-1.834 2.91l-.016.112 2.662 2.063.185.018c1.694-1.565 2.67-3.867 2.67-6.597z"
          ></path>
          <path
            fill="#34A853"
            d="M9.175 17.938c2.422 0 4.455-.797 5.94-2.172l-2.83-2.193c-.758.528-1.774.897-3.11.897-2.372 0-4.385-1.564-5.102-3.727l-.105.01-2.769 2.142-.036.1c1.475 2.93 4.504 4.943 8.012 4.943z"
          ></path>
          <path
            fill="#FBBC05"
            d="M4.073 10.743c-.19-.558-.3-1.156-.3-1.774 0-.618.11-1.216.29-1.774l-.005-.119L1.254 4.9l-.091.044C.555 6.159.206 7.524.206 8.969c0 1.445.349 2.81.957 4.026l2.91-2.252z"
          ></path>
          <path
            fill="#EB4335"
            d="M9.175 3.468c1.684 0 2.82.728 3.468 1.335l2.531-2.471C13.62.887 11.598 0 9.175 0 5.667 0 2.638 2.013 1.163 4.943l2.9 2.252c.727-2.162 2.74-3.727 5.112-3.727z"
          ></path>
        </svg>
      </button>
    </Link>
  );
}

function KakaoLoginIcon() {
  return (
    <Link href="http://localhost:8080/oauth2/authorization/kakao">
      <button
        className={cn("bg-[#fae500]", socialLoginBtnCss)}
        data-provider="Kakao"
        data-link="https://kauth.kakao.com/oauth/authorize?response_type=code&amp;client_id=0de1184063abadc9cef9dbf417c567a5&amp;redirect_uri=https%3A%2F%2Fwww.inflearn.com%2Fauth%2Fkakao&amp;scope=profile%20account_email%20birthday%20birthyear%20phone_number%20age_range%20gender&amp;state=%7B%22prev_url%22%3A%22https%3A%2F%2Fwww.inflearn.com%2Fsignin%3FreferUrl%3Dhttps%253A%252F%252Fwww.inflearn.com%252F%22%7D"
        aria-label="카카오로 로그인"
      >
        <svg
          width="18px"
          xmlns="http://www.w3.org/2000/svg"
          height="17"
          viewBox="0 0 18 17"
        >
          <g
            transform="translate(0.000000,17.000000) scale(0.100000,-0.100000)"
            stroke="none"
          >
            <path
              fill="#212529"
              d="M38 154 c-15 -8 -30 -25 -34 -38 -6 -26 10 -66 27 -66 7 0 9 -10 5 -26 -7 -25 -6 -25 16 -10 12 9 31 16 41 16 29 0 75 28 82 50 10 31 -3 59 -35 75 -36 19 -67 18 -102 -1z"
            ></path>
          </g>
        </svg>
      </button>
    </Link>
  );
}

function NaverLoginIcon() {
  return (
    <Link
      className="size-[44px] cursor-pointer border-none rounded-sm"
      href="http://localhost:8080/oauth2/authorization/naver"
    >
      <img src="/naver-login-btn.png" alt="네이버 로그인 버튼" />
    </Link>
  );
}
