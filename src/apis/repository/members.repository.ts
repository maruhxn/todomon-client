"use server";

import TAGS from "@/lib/tags";
import { ProfileDto, SearchDto } from "@/types/profile";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import {
  deleteReqWithAuth,
  getReqWithAuth,
  mutationFormReqWithAuth,
} from "./http.repository";

const MEMBERS_BASE_URL = "/api/members";
const TITLENAME_BASE_URL = "/api/members/titleNames/my";

// TODO: 캐싱 추가
export const getProfileRequest = async (memberId: number) => {
  return await getReqWithAuth<ProfileDto>(MEMBERS_BASE_URL + `/${memberId}`, {
    cache: "force-cache",
    next: {
      tags: [TAGS.PROFILE, TAGS.FOLLOW_INFO],
    },
  });
};

// TODO: 재검증 추가
export const updateProfileRequest = async (
  memberId: number,
  formData: FormData
) => {
  const error = mutationFormReqWithAuth(
    MEMBERS_BASE_URL + `/${memberId}`,
    formData,
    {
      method: "PATCH",
    }
  );
  revalidateTag(TAGS.LOGIN_USER_INFO);
  revalidateTag(TAGS.PROFILE);
  return error;
};

// TODO: 캐시 삭제
export const withdrawRequest = async (memberId: number) => {
  const error = await deleteReqWithAuth(MEMBERS_BASE_URL + `/${memberId}`);
  revalidateTag(TAGS.LOGIN_USER_INFO);
  revalidateTag(TAGS.PROFILE);
  if (error) return error;
  else redirect("/");
};

export const searchMemberByKey = async (key: string) => {
  return await getReqWithAuth<SearchDto[]>(
    MEMBERS_BASE_URL + `/search?memberNameKey=${key}`
  );
};

export const removeTitleNameRequest = async () => {
  const error = await deleteReqWithAuth(TITLENAME_BASE_URL);
  revalidateTag(TAGS.LOGIN_USER_INFO);
  revalidateTag(TAGS.PROFILE);
  return error;
};
