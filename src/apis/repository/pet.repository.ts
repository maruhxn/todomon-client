"use server";

import TAGS from "@/lib/tags";
import { ErrorState } from "@/types/globals";
import { PetDexItem, PetInfo } from "@/types/pet";
import { revalidateTag } from "next/cache";
import { FeedValidator } from "../validators/pets.validator";
import {
  getReq,
  getReqWithAuth,
  mutationJsonReqWithAuth,
} from "./http.repository";

const PET_BASE_URL = "/api/pets";
const MY_PET_BASE_URL = "/api/pets/my";
const MEMBER_PET_BASE_URL = (memberId: number) =>
  `/api/members/${memberId}/pets`;

// === FOR ALL ===
export const getAllPetsRequest = async () => {
  return await getReq<PetDexItem[]>(PET_BASE_URL, {
    cache: "force-cache",
    next: { tags: [TAGS.PET_DEX] },
  });
};

// === MY PET ===
export const createPetRequest = async () => {
  const res = await mutationJsonReqWithAuth(MY_PET_BASE_URL, null);
  revalidateTag(TAGS.USER_PET);
  return res;
};

export const feedToPetRequest = async (petId: number, foodCnt: number) => {
  const result = FeedValidator.safeParse(foodCnt);
  if (!result.success)
    return {
      error: {
        statusCode: 400,
        message: result.error.flatten().formErrors[0],
      },
    } as ErrorState;

  const res = await mutationJsonReqWithAuth(
    MY_PET_BASE_URL + `/${petId}/feed?foodCnt=${foodCnt}`,
    null,
    { method: "PATCH" }
  );

  revalidateTag(TAGS.USER_PET);

  return res;
};

export const setRepresentPetRequest = async (petId: number | null) => {
  let url = MY_PET_BASE_URL + `/represent-pet`;

  if (petId) {
    const queryString = new URLSearchParams({
      petId: petId.toString(),
    }).toString();
    url += `?${queryString}`;
  }

  const res = await mutationJsonReqWithAuth(url, null, { method: "PATCH" });
  revalidateTag(TAGS.USER_PET);
  return res;
};

// === MEMBER PET ===
export const getOwnPetInfoRequest = async (memberId: number) => {
  return await getReqWithAuth<PetInfo>(MEMBER_PET_BASE_URL(memberId), {
    cache: "force-cache",
    next: { tags: [TAGS.USER_PET] },
  });
};

export const getPetCollectionRequest = async (memberId: number) => {
  return await getReqWithAuth<PetDexItem[]>(
    MEMBER_PET_BASE_URL(memberId) + "/collections",
    {
      cache: "force-cache",
      next: {
        tags: [TAGS.USER_PET],
      },
    }
  );
};
