"use client";

import {
  getOverallRankingOfAchievement,
  getOverallRankingOfCollection,
  getOverallRankingOfDiligence,
} from "@/apis/repository/social.repository";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CollectedPetRankItem,
  DiligenceRankItem,
  TodoAchievementRankItem,
} from "@/types/social";
import { useEffect, useState } from "react";
import ProfileIcon from "../globals/ProfileIcon";

export type RANK_TYPE =
  | "daily-achievement"
  | "weekly-achievement"
  | "diligence"
  | "collection";

export default function RankingSection() {
  const [rankType, setRankType] = useState<RANK_TYPE | null>(null);
  const [overallRanking, setOverallRanking] = useState<
    | TodoAchievementRankItem[]
    | DiligenceRankItem[]
    | CollectedPetRankItem[]
    | null
  >([]);

  useEffect(() => {
    async function fetchData() {
      let data = null;
      switch (rankType) {
        case "daily-achievement":
          data = await getOverallRankingOfAchievement("DAILY");
          setOverallRanking(data);
          return;
        case "weekly-achievement":
          data = await getOverallRankingOfAchievement("WEEKLY");
          setOverallRanking(data);
          return;
        case "diligence":
          data = await getOverallRankingOfDiligence();
          setOverallRanking(data);
          return;
        case "collection":
          data = await getOverallRankingOfCollection();
          setOverallRanking(data);
          return;
      }
    }

    fetchData();
  }, [rankType]);

  function renderRankInfo(
    rank: TodoAchievementRankItem | DiligenceRankItem | CollectedPetRankItem
  ) {
    switch (rankType) {
      case "daily-achievement":
      case "weekly-achievement":
        return (
          <p className="text-muted-foreground text-sm">{`${
            (rank as TodoAchievementRankItem).cnt
          } 개`}</p>
        );
      case "diligence":
        return (
          <p className="text-muted-foreground text-sm">{`레벨 ${
            (rank as DiligenceRankItem).level
          }`}</p>
        );
      case "collection":
        return (
          <p className="text-muted-foreground text-sm">{`${
            (rank as CollectedPetRankItem).petCnt
          } 마리`}</p>
        );
      default:
        return null;
    }
  }

  return (
    <section className="space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">랭킹</h2>
        <Select onValueChange={(value) => setRankType(value as RANK_TYPE)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="daily-achievement">
                일간 투두 달성 랭킹
              </SelectItem>
              <SelectItem value="weekly-achievement">
                주간 투두 달성 랭킹
              </SelectItem>
              <SelectItem value="diligence">일관성 레벨 랭킹</SelectItem>
              <SelectItem value="collection">도감 랭킹</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="rounded-2xl overflow-hidden">
          <CardHeader className="bg-primary text-primary-foreground py-4 px-6">
            <h2 className="text-xl font-bold">전체 랭킹</h2>
          </CardHeader>
          <CardContent className="py-6 px-6">
            <ul className="space-y-4 flex flex-col justify-center items-center">
              {overallRanking && overallRanking.length > 0 ? (
                overallRanking.map((rank, index) => (
                  <li
                    key={rank.memberId}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <ProfileIcon
                        username={rank.username}
                        profileImage={rank.profileImageUrl}
                      />
                      <div>
                        <h3 className="font-semibold">{rank.username}</h3>
                        <p className="text-muted-foreground text-sm">
                          {renderRankInfo(rank)}
                        </p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{index + 1}</div>
                  </li>
                ))
              ) : (
                <span className="flex-1 font-bold">랭킹 정보가 없습니다</span>
              )}
            </ul>
          </CardContent>
        </Card>
        <Card className="rounded-2xl overflow-hidden">
          <CardHeader className="bg-secondary text-secondary-foreground py-4 px-6">
            <h2 className="text-xl font-bold">친구 랭킹</h2>
          </CardHeader>
          <CardContent className="py-6 px-6">
            <ul className="space-y-4 flex flex-col justify-center items-center">
              {overallRanking && overallRanking.length > 0 ? (
                overallRanking.map((rank, index) => (
                  <li
                    key={rank.memberId}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <ProfileIcon
                        username={rank.username}
                        profileImage={rank.profileImageUrl}
                      />
                      <div>
                        <h3 className="font-semibold">{rank.username}</h3>
                        <p className="text-muted-foreground text-sm">
                          {renderRankInfo(rank)}
                        </p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{index + 1}</div>
                  </li>
                ))
              ) : (
                <span className="flex-1 font-bold">랭킹 정보가 없습니다</span>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
