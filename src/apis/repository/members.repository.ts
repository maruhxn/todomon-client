"use server";

import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/lib/constants";
import { TAG_PROFILE } from "@/lib/tags";
import { ProfileDto } from "@/types/profile";
import { ResponseDto } from "@/types/response.dto";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { deleteReq, formPatchReq, getReq } from "./http.repository";

const MEMBERS_BASE_URL = "/api/members";

interface GetProfileResponseDto extends ResponseDto {
  data: ProfileDto;
}

export const getProfileRequest = async (memberId: number) => {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) return null;

  const { data } = (await (
    await getReq(MEMBERS_BASE_URL + `/${memberId}`, {
      next: {
        revalidate: 3600,
        tags: [TAG_PROFILE(memberId)],
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Refresh: `Bearer ${cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value}`,
      },
    })
  ).json()) as GetProfileResponseDto;

  return data;
};

export const updateProfileRequest = async (
  memberId: number,
  formData: FormData
) => {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) return null;

  await formPatchReq(MEMBERS_BASE_URL + `/${memberId}`, formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value}`,
    },
  });

  revalidateTag(TAG_PROFILE(memberId));
};

export const withdrawRequest = async (memberId: number) => {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) return null;

  await deleteReq(MEMBERS_BASE_URL + `/${memberId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value}`,
    },
  });

  redirect("/");
};
