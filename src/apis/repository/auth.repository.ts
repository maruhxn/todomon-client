"use server";

import { ErrorData, getReq } from "@/apis/repository/http.repository";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/lib/constants";
import { TokenDto, UserInfo } from "@/types/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ResponseDto } from "../../types/response.dto";

const AUTH_BASE_URL = `/api/auth`;

const LOGOUT_URL = `${AUTH_BASE_URL}/logout`;
const REFRESH_URL = `${AUTH_BASE_URL}/refresh`;

interface GetAuthResponseDto extends ResponseDto {
  data: UserInfo;
}

interface RefreshResponse {
  code: string;
  message: string;
  data: TokenDto;
}

export const getAuthRequest = async () => {
  try {
    const accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;
    if (!accessToken) return null;
    const { data } = (await (
      await getReq(AUTH_BASE_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Refresh: `Bearer ${cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value}`,
        },
      })
    ).json()) as GetAuthResponseDto;
    return data;
  } catch (error) {
    return null;
  }
};

export async function logout() {
  await getReq(LOGOUT_URL, {
    headers: {
      Authorization: `Bearer ${cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value}`,
      Refresh: `Bearer ${cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value}`,
    },
  });

  cookies().delete(ACCESS_TOKEN_COOKIE_NAME);
  cookies().delete(REFRESH_TOKEN_COOKIE_NAME);
  return redirect("/");
}

export async function refresh() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${REFRESH_URL}`, {
    method: "GET",
    headers: {
      Refresh: `Bearer ${cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value}`,
    },
    cache: "no-cache",
  });

  if (!res.ok) {
    const errData = (await res.json()) as ErrorData;
    throw new Error(errData.message);
  }

  const { data } = (await res.json()) as RefreshResponse;
  return data;
}
