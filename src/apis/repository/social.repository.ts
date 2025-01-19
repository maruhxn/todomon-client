"use server";

import {
  CollectedPetRankItem,
  DiligenceRankItem,
  TodoAchievementRankItem,
} from "@/types/social";
import { getReqWithAuth } from "./http.repository";

const OVERALL_RANK_BASE_URL = "/api/overall/rank";

export const getOverallRankingOfAchievement = async (
  type: "DAILY" | "WEEKLY"
) => {
  return await getReqWithAuth<TodoAchievementRankItem[]>(
    OVERALL_RANK_BASE_URL + `/achievement/${type.toLowerCase()}`
  );
};

export const getOverallRankingOfDiligence = async () => {
  return await getReqWithAuth<DiligenceRankItem[]>(
    OVERALL_RANK_BASE_URL + `/diligence`
  );
};

export const getOverallRankingOfCollection = async () => {
  return await getReqWithAuth<CollectedPetRankItem[]>(
    OVERALL_RANK_BASE_URL + `/collection`
  );
};
