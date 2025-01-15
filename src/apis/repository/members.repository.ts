"use server";

import { ProfileDto, SearchDto } from "@/types/profile";
import { ResponseDto } from "@/types/response.dto";
import { redirect } from "next/navigation";
import {
  deleteReqWithAuth,
  formPatchReqWithAuth,
  getReqWithAuth,
} from "./http.repository";

const MEMBERS_BASE_URL = "/api/members";
const TITLENAME_BASE_URL = "/api/members/titleNames/my";

interface GetProfileResponseDto extends ResponseDto {
  data: ProfileDto;
}

interface GetSearchResultResponseDto extends ResponseDto {
  data: SearchDto[];
}

// TODO: 캐싱 추가
export const getProfileRequest = async (memberId: number) => {
  const { data } = (await (
    await getReqWithAuth(MEMBERS_BASE_URL + `/${memberId}`)
  )?.json()) as GetProfileResponseDto;

  return data;
};

// TODO: 재검증 추가
export const updateProfileRequest = async (
  memberId: number,
  formData: FormData
) => {
  await formPatchReqWithAuth(MEMBERS_BASE_URL + `/${memberId}`, formData);
};

// TODO: 캐시 삭제
export const withdrawRequest = async (memberId: number) => {
  await deleteReqWithAuth(MEMBERS_BASE_URL + `/${memberId}`);
  redirect("/");
};

export const searchMemberByKey = async (key: string) => {
  const { data } = (await (
    await getReqWithAuth(MEMBERS_BASE_URL + `/search?memberNameKey=${key}`)
  )?.json()) as GetSearchResultResponseDto;

  return data;
};

export const removeTitleNameRequest = async () => {
  await deleteReqWithAuth(TITLENAME_BASE_URL);
};
