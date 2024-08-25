"use server";

import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/lib/constants";
import { ResponseDto } from "@/types/response.dto";
import {
  CollectedPetRankItem,
  DiligenceRankItem,
  TodoAchievementRankItem,
} from "@/types/social";
import { cookies } from "next/headers";
import { getReq } from "./http.repository";

const OVERALL_RANK_BASE_URL = "/api/overall/rank";

interface GetTodoAchievementRankResponseDto extends ResponseDto {
  data: TodoAchievementRankItem[];
}

interface GetDiligenceRankResponseDto extends ResponseDto {
  data: DiligenceRankItem[];
}

interface GetCollectedPetRankResponseDto extends ResponseDto {
  data: CollectedPetRankItem[];
}

const getAccessToken = (): string | null =>
  cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value || null;

const getRefreshToken = (): string | null =>
  cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value || null;

export const getOverallRankingOfAchievement = async (
  type: "DAILY" | "WEEKLY"
) => {
  const accessToken = getAccessToken();

  if (!accessToken) return null;

  const { data } = (await (
    await getReq(OVERALL_RANK_BASE_URL + `/achievement/${type.toLowerCase()}`, {
      next: {
        revalidate: 3600,
        tags: [`overall-todo-achievement-${type.toLowerCase()}-rank`],
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Refresh: `Bearer ${getRefreshToken()}`,
      },
    })
  ).json()) as GetTodoAchievementRankResponseDto;

  return data;
};

export const getOverallRankingOfDiligence = async () => {
  const accessToken = getAccessToken();

  if (!accessToken) return null;

  const { data } = (await (
    await getReq(OVERALL_RANK_BASE_URL + `/diligence`, {
      next: {
        revalidate: 3600,
        tags: [`overall-todo-diligence-rank`],
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Refresh: `Bearer ${getRefreshToken()}`,
      },
    })
  ).json()) as GetDiligenceRankResponseDto;

  return data;
};

export const getOverallRankingOfCollection = async () => {
  const accessToken = getAccessToken();

  if (!accessToken) return null;

  const { data } = (await (
    await getReq(OVERALL_RANK_BASE_URL + `/collection`, {
      next: {
        revalidate: 3600,
        tags: [`overall-todo-collection-rank`],
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Refresh: `Bearer ${getRefreshToken()}`,
      },
    })
  ).json()) as GetCollectedPetRankResponseDto;

  return data;
};
