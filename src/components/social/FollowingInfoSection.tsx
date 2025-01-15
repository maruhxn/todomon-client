"use client";

import { getFollowingRequest } from "@/apis/repository/follow.repository";
import { toast } from "@/hooks/use-toast";
import { PageItem } from "@/types/globals";
import { FollowingItem } from "@/types/social";
import { useEffect, useState } from "react";
import { Paginations } from "../globals/Paginations";
import FollowingListCard from "./FollowingListCard";

export default function FollowingInfoSection({
  memberId,
}: {
  memberId: number;
}) {
  const [page, setPage] = useState<number>(0);
  const [followingsPagingData, setFollowingsPagingData] =
    useState<PageItem<FollowingItem> | null>(null);

  async function getFollowings() {
    try {
      const data = await getFollowingRequest(memberId, page);
      setFollowingsPagingData(data);
    } catch (error: any) {
      return toast({
        title: "실패",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    getFollowings();
  }, [page]);

  if (!followingsPagingData) return;

  return (
    <section className="space-y-2">
      <h2 className="text-xl font-bold mt-4">팔로잉</h2>
      <div className="grid grid-cols-1 space-y-2">
        <FollowingListCard followings={followingsPagingData.results} />
        <Paginations setPage={setPage} pagingData={followingsPagingData} />
      </div>
    </section>
  );
}
