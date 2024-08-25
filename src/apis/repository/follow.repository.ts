"use server";

import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/lib/constants";
import { TAG_PROFILE } from "@/lib/tags";
import { PageItem } from "@/types/globals";
import { ResponseDto } from "@/types/response.dto";
import { FollowerItem, FollowingItem, FollowRequestItem } from "@/types/social";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { deleteReq, getReq, patchReq, postReq } from "./http.repository";

const FOLLOW_BASE_URL = "/api/social/follows";

interface GetFollowerResponseDto extends ResponseDto {
  data: PageItem<FollowerItem>;
}

interface GetFollowingResponseDto extends ResponseDto {
  data: PageItem<FollowingItem>;
}

interface GetPendingFollowRequestsResponseDto extends ResponseDto {
  data: PageItem<FollowRequestItem>;
}

const getMemberId = (): string | null =>
  cookies().get("memberId")?.value || null;

const getAccessToken = (): string | null =>
  cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value || null;

const getRefreshToken = (): string | null =>
  cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value || null;

export const sendFollowOrMatFollowRequest = async (memberId: number) => {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  if (!accessToken) return null;

  await postReq(FOLLOW_BASE_URL + `/${memberId}`, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value}`,
    },
  });
};

export const getFollowerRequest = async (memberId: number, page: number) => {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  if (!accessToken) return null;

  const { data } = (await (
    await getReq(
      FOLLOW_BASE_URL + `/${memberId}/followers?pageNumber=${page}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Refresh: `Bearer ${cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value}`,
        },
      }
    )
  ).json()) as GetFollowerResponseDto;

  return data;
};

export const getFollowingRequest = async (memberId: number, page: number) => {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) return null;

  const { data } = (await (
    await getReq(
      FOLLOW_BASE_URL + `/${memberId}/followings?pageNumber=${page}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Refresh: `Bearer ${cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value}`,
        },
      }
    )
  ).json()) as GetFollowingResponseDto;

  return data;
};

export const getPendingFollowRequest = async (page: number) => {
  const accessToken = getAccessToken();
  if (!accessToken) return null;

  const { data } = (await (
    await getReq(FOLLOW_BASE_URL + `/requests/pending?pageNumber=${page}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Refresh: `Bearer ${getRefreshToken()}`,
      },
    })
  ).json()) as GetPendingFollowRequestsResponseDto;

  return data;
};

export const removeFollowerRequest = async (followerId: number) => {
  const accessToken = getAccessToken();
  if (!accessToken) return null;

  await deleteReq(FOLLOW_BASE_URL + `/${followerId}/remove`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${getRefreshToken()}`,
    },
  });

  revalidateTag(TAG_PROFILE(followerId));
};

export const unfollowRequest = async (followeeId: number) => {
  const accessToken = getAccessToken();
  if (!accessToken) return null;

  await deleteReq(FOLLOW_BASE_URL + `/${followeeId}/unfollow`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${getRefreshToken()}`,
    },
  });

  revalidateTag(TAG_PROFILE(followeeId));
};

export const respondFollowRequest = async (
  followId: number,
  isAccepted: boolean
) => {
  const accessToken = getAccessToken();
  const memberId = getMemberId();
  if (!accessToken || !memberId) return null;

  const queryString = new URLSearchParams({
    isAccepted: isAccepted.toString(),
  }).toString();

  const url = `${FOLLOW_BASE_URL}/requests/${followId}/respond?${queryString}`;

  await patchReq(url, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${getRefreshToken()}`,
    },
  });

  revalidateTag(TAG_PROFILE(+memberId));
};

export const matFollowRequest = async (followerId: number) => {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  const memberId = getMemberId();
  if (!accessToken || !memberId) return null;

  await postReq(FOLLOW_BASE_URL + `/${followerId}/mutual`, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value}`,
    },
  });

  revalidateTag(TAG_PROFILE(+memberId));
};
