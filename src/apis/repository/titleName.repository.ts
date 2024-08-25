"use server";

import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/lib/constants";
import { TAG_PROFILE } from "@/lib/tags";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import {
  CreateTitleNameRequest,
  UpdateTitleNameRequest,
} from "../validators/titleName.validator";
import { deleteReq, patchReq, postReq } from "./http.repository";

const TITLENAME_BASE_URL = "/api/members/titleNames/my";

const getMemberId = (): string | null =>
  cookies().get("memberId")?.value || null;

const getAccessToken = (): string | null =>
  cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value || null;

const getRefreshToken = (): string | null =>
  cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value || null;
export const createTitleNameRequest = async (
  payload: CreateTitleNameRequest
) => {
  const accessToken = getAccessToken();
  const memberId = getMemberId();
  if (!accessToken || !memberId) return null;

  await postReq(TITLENAME_BASE_URL, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${getRefreshToken()}`,
      "Content-Type": "application/json",
    },
  });

  revalidateTag(TAG_PROFILE(+memberId));
};

export const updateTitleNameRequest = async (
  payload: UpdateTitleNameRequest
) => {
  const accessToken = getAccessToken();
  const memberId = getMemberId();
  if (!accessToken || !memberId) return null;

  await patchReq(TITLENAME_BASE_URL, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${getRefreshToken()}`,
      "Content-Type": "application/json",
    },
  });

  revalidateTag(TAG_PROFILE(+memberId));
};

export const removeTitleNameRequest = async (
  payload: UpdateTitleNameRequest
) => {
  const accessToken = getAccessToken();
  const memberId = getMemberId();
  if (!accessToken || !memberId) return null;

  await deleteReq(TITLENAME_BASE_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${getRefreshToken()}`,
      "Content-Type": "application/json",
    },
  });

  revalidateTag(TAG_PROFILE(+memberId));
};
