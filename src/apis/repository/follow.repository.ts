"use server";

import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/lib/constants";
import { TAG_FOLLOWER } from "@/lib/tags";
import { ResponseDto } from "@/types/response.dto";
import { FollowerItem, FollowingItem, FollowRequestItem } from "@/types/social";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { deleteReq, getReq } from "./http.repository";

const FOLLOW_BASE_URL = "/api/social/follow";

interface GetFollowerResponseDto extends ResponseDto {
  data: FollowerItem[];
}

interface GetFollowingResponseDto extends ResponseDto {
  data: FollowingItem[];
}

interface GetPendingFollowRequestsResponseDto extends ResponseDto {
  data: FollowRequestItem[];
}

const getAccessToken = (): string | null =>
  cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value || null;

const getRefreshToken = (): string | null =>
  cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value || null;

export const getFollowerRequest = async (memberId: number) => {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) return null;

  const { data } = (await (
    await getReq(FOLLOW_BASE_URL + `/${memberId}/followers`, {
      next: {
        revalidate: 3600,
        tags: [TAG_FOLLOWER(memberId)],
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Refresh: `Bearer ${cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value}`,
      },
    })
  ).json()) as GetFollowerResponseDto;

  return data;
};

export const getFollowingRequest = async (memberId: number) => {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) return null;

  const { data } = (await (
    await getReq(FOLLOW_BASE_URL + `/${memberId}/followings`, {
      next: {
        revalidate: 3600,
        tags: [TAG_FOLLOWER(memberId)],
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Refresh: `Bearer ${cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value}`,
      },
    })
  ).json()) as GetFollowingResponseDto;

  return data;
};

export const getPendingFollowRequest = async () => {
  const accessToken = getAccessToken();
  if (!accessToken) return null;

  const { data } = (await (
    await getReq(FOLLOW_BASE_URL + "/me/pending", {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Refresh: `Bearer ${getRefreshToken()}`,
      },
    })
  ).json()) as GetPendingFollowRequestsResponseDto;

  return data;
};

export const unfollowRequest = async (memberId: number) => {
  const accessToken = getAccessToken();
  if (!accessToken) return null;

  await deleteReq(FOLLOW_BASE_URL + `/${memberId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${getRefreshToken()}`,
    },
  });

  revalidateTag(TAG_FOLLOWER(memberId));
};
