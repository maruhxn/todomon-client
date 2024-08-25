"use server";

import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/lib/constants";
import { PetDexItem, PetInfo } from "@/types/pet";
import { ResponseDto } from "@/types/response.dto";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FeedValidator } from "../validators/pets.validator";
import { getReq, patchReq, postReq } from "./http.repository";

const PET_BASE_URL = "/api/pets";
const MY_PET_BASE_URL = "/api/pets/my";
const MEMBER_PET_BASE_URL = (memberId: number) =>
  `/api/members/${memberId}/pets`;

interface GetPetDexItemResponseDto extends ResponseDto {
  data: PetDexItem[];
}

interface GetPetInfoResponseDto extends ResponseDto {
  data: PetInfo;
}

const getAccessToken = (): string | null =>
  cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value || null;

const getRefreshToken = (): string | null =>
  cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value || null;

const getMemberId = (): string | null =>
  cookies().get("memberId")?.value || null;

export const createPetRequest = async () => {
  const accessToken = getAccessToken();
  const memberId = getMemberId();

  if (!accessToken || !memberId) return null;

  await postReq(MY_PET_BASE_URL, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${getRefreshToken()}`,
      "Content-Type": "application/json",
    },
  });

  revalidateTag(`member-${memberId}-pets`);
};

export const feedToPetRequest = async (petId: number, foodCnt: number) => {
  const accessToken = getAccessToken();
  const memberId = getMemberId();

  if (!accessToken || !memberId) return null;

  const result = FeedValidator.safeParse(foodCnt);
  if (!result.success) throw new Error(result.error.flatten().formErrors[0]);

  await patchReq(MY_PET_BASE_URL + `/${petId}/feed?foodCnt=${foodCnt}`, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${getRefreshToken()}`,
      "Content-Type": "application/json",
    },
  });

  revalidateTag(`member-${memberId}-pets`);
};

export const setRepresentPetRequest = async (petId: number | null) => {
  const accessToken = getAccessToken();
  const memberId = getMemberId();

  if (!accessToken || !memberId) return null;

  let url = MY_PET_BASE_URL + `/represent-pet`;

  if (petId) {
    const queryString = new URLSearchParams({
      petId: petId.toString(),
    }).toString();
    url += `?${queryString}`;
  }

  await patchReq(url, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${getRefreshToken()}`,
      "Content-Type": "application/json",
    },
  });

  revalidateTag(`member-${memberId}-pets`);
};

export const getAllPetsRequest = async () => {
  const accessToken = getAccessToken();

  if (!accessToken) return null;

  const { data } = (await (
    await getReq(PET_BASE_URL, {
      next: {
        revalidate: 3600,
        tags: [`all-pets`],
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Refresh: `Bearer ${getRefreshToken()}`,
      },
    })
  ).json()) as GetPetDexItemResponseDto;

  return data;
};

export const getPetCollectionRequest = async (memberId: number) => {
  const accessToken = getAccessToken();
  if (!accessToken) return null;

  const { data } = (await (
    await getReq(MEMBER_PET_BASE_URL(memberId) + "/collections", {
      next: {
        revalidate: 3600,
        tags: [`members-${memberId}-collection`, `member-${memberId}-pets`],
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Refresh: `Bearer ${getRefreshToken()}`,
      },
    })
  ).json()) as GetPetDexItemResponseDto;

  return data;
};

export const getPetInfoRequest = async (memberId: number) => {
  const accessToken = getAccessToken();

  if (!accessToken) return null;

  const { data } = (await (
    await getReq(MEMBER_PET_BASE_URL(memberId), {
      next: {
        revalidate: 3600,
        tags: [`member-${memberId}-pets`],
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Refresh: `Bearer ${getRefreshToken()}`,
      },
    })
  ).json()) as GetPetInfoResponseDto;

  return data;
};
