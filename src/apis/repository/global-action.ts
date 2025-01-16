"use server";

import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/lib/constants";
import { UserInfo } from "@/types/auth";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export const getAccessToken = async () =>
  (await cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value) || null;

export const getRefreshToken = async () =>
  (await cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value) || null;

export async function getSession() {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;
  const { payload } = await jwtVerify(accessToken, encodedKey, {
    algorithms: ["HS256"],
  });
  return payload as UserInfo;
}
