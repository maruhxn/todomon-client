"use server";

import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/lib/constants";
import { PageItem } from "@/types/globals";
import { ResponseDto } from "@/types/response.dto";
import { ReceivedStarItem } from "@/types/social";
import { cookies } from "next/headers";
import { getReq, patchReq, postReq } from "./http.repository";

const STAR_TRANSACTION_BASE_URL = "/api/social/stars";

interface GetReceivedStarsResponseDto extends ResponseDto {
  data: PageItem<ReceivedStarItem>;
}

const getAccessToken = (): string | null =>
  cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value || null;

const getRefreshToken = (): string | null =>
  cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value || null;

export const getReceivedStarsRequest = async () => {
  const accessToken = getAccessToken();

  if (!accessToken) return null;

  const { data } = (await (
    await getReq(STAR_TRANSACTION_BASE_URL, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Refresh: `Bearer ${getRefreshToken()}`,
      },
    })
  ).json()) as GetReceivedStarsResponseDto;

  return data;
};

export const sendStarRequest = async (memberId: number) => {
  const accessToken = getAccessToken();
  if (!accessToken) return null;

  await postReq(STAR_TRANSACTION_BASE_URL + `/send/${memberId}`, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${getRefreshToken()}`,
    },
  });
};

export const receiveStarRequest = async (transactionId: number) => {
  const accessToken = getAccessToken();
  if (!accessToken) return null;

  await patchReq(
    STAR_TRANSACTION_BASE_URL + `/receive/${transactionId}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Refresh: `Bearer ${getRefreshToken()}`,
      },
    }
  );
};

export const receiveAllStarsRequest = async () => {
  const accessToken = getAccessToken();
  if (!accessToken) return null;

  await patchReq(STAR_TRANSACTION_BASE_URL + `/receiveAll`, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${getRefreshToken()}`,
    },
  });
};
