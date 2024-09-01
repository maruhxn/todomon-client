"use server";

import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/lib/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const setAuthCookieFromQueryParameters = (
  memberId: string,
  accessToken: string,
  refreshToken: string
) => {
  cookies().set("memberId", memberId);
  cookies().set(ACCESS_TOKEN_COOKIE_NAME, accessToken);
  cookies().set(REFRESH_TOKEN_COOKIE_NAME, refreshToken);
  redirect("/calendar/month");
};
