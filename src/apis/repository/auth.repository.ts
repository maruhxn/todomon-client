"use server";

import {
  ErrorData,
  getReq,
  getReqWithAuth,
} from "@/apis/repository/http.repository";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/lib/constants";
import { UserInfo } from "@/types/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAccessToken, getRefreshToken } from "./global-action";

const AUTH_BASE_URL = `/api/auth`;

export async function getAuthRequest() {
  const res = (await getReqWithAuth(`/api/auth`)) as Response;
  if (typeof res === "string") {
    return { error: res };
  }
  const { data } = await res?.json();
  return data as UserInfo;
}

export async function logout() {
  const accessToken = (await getAccessToken()) ?? "";
  const refreshToken = (await getRefreshToken()) ?? "";

  await getReq(`${AUTH_BASE_URL}/logout`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${refreshToken}`,
    },
  });

  cookies().delete(ACCESS_TOKEN_COOKIE_NAME);
  cookies().delete(REFRESH_TOKEN_COOKIE_NAME);

  return redirect("/");
}

export async function refresh(): Promise<string> {
  const refreshToken = (await getRefreshToken()) ?? "";

  const res = await getReq(`${AUTH_BASE_URL}/refresh`, {
    headers: {
      Refresh: `Bearer ${refreshToken}`,
    },
  });

  if (!res.ok) {
    const errData = (await res.json()) as ErrorData;
    return errData.message;
  }

  return "OK";
}
