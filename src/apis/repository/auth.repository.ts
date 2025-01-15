"use server";

import { ErrorData, getReq } from "@/apis/repository/http.repository";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/lib/constants";
import { UserInfo } from "@/types/auth";
import { ResponseDto } from "@/types/response.dto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAccessToken, getRefreshToken } from "./global-action";

const AUTH_BASE_URL = `/api/auth`;

interface GetAuthResponseDto extends ResponseDto {
  data: UserInfo;
}

// 애초에 token이 없는 경우 -> 로그인 X -> redirect
// token이 있는데, 유효하지 않은 경우 -> refresh -> refresh token이 만료된 경우 -> redirect
// token이 있는데, 유효한 경우 -> user 정보를 가져옴
export async function getAuthRequest() {
  const accessToken = (await getAccessToken()) ?? null;

  if (!accessToken) redirect("/");

  const res = await getReq(`/api/auth`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      const resultMessage = await refresh();
      if (resultMessage !== "OK") {
      } else {
        return redirect("/");
      }
    } else {
      throw new Error("Failed to get user info");
    }
  } else {
    const { data } = (await res.json()) as GetAuthResponseDto;
    return data;
  }
}

export async function logout() {
  const accessToken = (await getAccessToken()) ?? "";

  await getReq(`${AUTH_BASE_URL}/logout`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  cookies().delete(ACCESS_TOKEN_COOKIE_NAME);
  cookies().delete(REFRESH_TOKEN_COOKIE_NAME);
  return redirect("/");
}

export async function refresh() {
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
