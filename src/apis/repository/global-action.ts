"use server";

import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/lib/constants";
import { handleErrorForServerComponent } from "@/lib/error-handler";
import TAGS from "@/lib/tags";
import { UserInfo } from "@/types/auth";
import { cookies } from "next/headers";
import { getReqWithAuth } from "./http.repository";

const secretKey = process.env.JWT_SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export const getAccessToken = async () =>
  (await cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value) || null;

export const getRefreshToken = async () =>
  (await cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value) || null;

export async function getSession() {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  const result = await getReqWithAuth<UserInfo>("/api/auth", {
    cache: "force-cache",
    next: {
      tags: [TAGS.LOGIN_USER_INFO],
    },
  });

  if ("error" in result) {
    handleErrorForServerComponent(result);
  }

  return result as UserInfo;
}
