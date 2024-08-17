"use server";

import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/lib/constants";
import { TAG_FOLLOWER } from "@/lib/tags";
import { ResponseDto } from "@/types/response.dto";
import { FollowItem } from "@/types/social";
import { cookies } from "next/headers";
import { getReq } from "./http.repository";

const FOLLOW_BASE_URL = "/api/social/follow";

interface GetFollowInfoResponseDto extends ResponseDto {
  data: FollowItem[];
}

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
  ).json()) as GetFollowInfoResponseDto;

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
  ).json()) as GetFollowInfoResponseDto;

  return data;
};
