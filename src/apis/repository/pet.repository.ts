"use server";

import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/lib/constants";
import { MyPetInfo, PetDexItem } from "@/types/pet";
import { ResponseDto } from "@/types/response.dto";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FeedValidator } from "../validators/pets.validator";
import { getReq, patchReq, postReq } from "./http.repository";

const PET_BASE_URL = "/api/pets";

interface GetPetDexItemResponseDto extends ResponseDto {
  data: PetDexItem[];
}

interface GetMyPetResponseDto extends ResponseDto {
  data: MyPetInfo;
}

const getAccessToken = (): string | null =>
  cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value || null;

const getRefreshToken = (): string | null =>
  cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value || null;

export const createPetRequest = async () => {
  const accessToken = getAccessToken();

  if (!accessToken) return null;

  await postReq(PET_BASE_URL, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${getRefreshToken()}`,
      "Content-Type": "application/json",
    },
  });

  revalidateTag("my-pet");
};

export const feedToPetRequest = async (petId: number, foodCnt: number) => {
  const accessToken = getAccessToken();

  if (!accessToken) return null;

  const result = FeedValidator.safeParse(foodCnt);
  if (!result.success) throw new Error(result.error.flatten().formErrors[0]);

  await patchReq(PET_BASE_URL + `/${petId}/feed?foodCnt=${foodCnt}`, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${getRefreshToken()}`,
      "Content-Type": "application/json",
    },
  });

  revalidateTag("my-pet");
};

export const setRepresentPetRequest = async (petId: number | null) => {
  const accessToken = getAccessToken();

  if (!accessToken) return null;

  let url = PET_BASE_URL + `/represent-pet`;

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

  revalidateTag("my-pet");
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

export const getPetCollectionRequest = async () => {
  const accessToken = getAccessToken();

  if (!accessToken) return null;

  const { data } = (await (
    await getReq(PET_BASE_URL + "/collections", {
      next: {
        revalidate: 3600,
        tags: [`pet-collection`, `my-pet`],
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Refresh: `Bearer ${getRefreshToken()}`,
      },
    })
  ).json()) as GetPetDexItemResponseDto;

  return data;
};

export const getMyPetRequest = async () => {
  const accessToken = getAccessToken();

  if (!accessToken) return null;

  const { data } = (await (
    await getReq(PET_BASE_URL + `/my`, {
      next: {
        revalidate: 3600,
        tags: [`my-pet`],
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Refresh: `Bearer ${getRefreshToken()}`,
      },
    })
  ).json()) as GetMyPetResponseDto;

  return data;
};
