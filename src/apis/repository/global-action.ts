"use server";

import {
  ACCESS_TOKEN_COOKIE_NAME,
  MEMBER_ID_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/lib/constants";
import { cookies } from "next/headers";

export const getAccessToken = async () =>
  (await cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value) || null;

export const getRefreshToken = async () =>
  (await cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value) || null;

export const getMemberId = async () =>
  (await cookies().get(MEMBER_ID_COOKIE_NAME)?.value) || null;
