"use server";

import { PetDexItem, PetInfo } from "@/types/pet";
import { FeedValidator } from "../validators/pets.validator";
import { getReqWithAuth, mutationJsonReqWithAuth } from "./http.repository";

const PET_BASE_URL = "/api/pets";
const MY_PET_BASE_URL = "/api/pets/my";
const MEMBER_PET_BASE_URL = (memberId: number) =>
  `/api/members/${memberId}/pets`;

export const createPetRequest = async () => {
  return await mutationJsonReqWithAuth(MY_PET_BASE_URL, null);
};

export const feedToPetRequest = async (petId: number, foodCnt: number) => {
  const result = FeedValidator.safeParse(foodCnt);
  if (!result.success) return { error: result.error.flatten().formErrors[0] };

  return await mutationJsonReqWithAuth(
    MY_PET_BASE_URL + `/${petId}/feed?foodCnt=${foodCnt}`,
    null
  );
};

export const setRepresentPetRequest = async (petId: number | null) => {
  let url = MY_PET_BASE_URL + `/represent-pet`;

  if (petId) {
    const queryString = new URLSearchParams({
      petId: petId.toString(),
    }).toString();
    url += `?${queryString}`;
  }

  return await mutationJsonReqWithAuth(url, null);
};

export const getAllPetsRequest = async () => {
  return await getReqWithAuth<PetDexItem[]>(PET_BASE_URL);
};

export const getPetCollectionRequest = async (memberId: number) => {
  return await getReqWithAuth<PetDexItem[]>(
    MEMBER_PET_BASE_URL(memberId) + "/collections"
  );
};

export const getPetInfoRequest = async (memberId: number) => {
  return await getReqWithAuth<PetInfo>(MEMBER_PET_BASE_URL(memberId));
};
