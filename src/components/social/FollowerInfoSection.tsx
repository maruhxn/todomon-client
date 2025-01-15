"use client";

import { getFollowerRequest } from "@/apis/repository/follow.repository";
import { toast } from "@/hooks/use-toast";
import { PageItem } from "@/types/globals";
import { FollowerItem } from "@/types/social";
import { useEffect, useState } from "react";
import { Paginations } from "../globals/Paginations";
import FollowerListCard from "./FollowerListCard";

export default function FollowerInfoSection({
  memberId,
}: {
  memberId: number;
}) {
  const [page, setPage] = useState<number>(0);
  const [followersPagingData, setFollowersPagingData] =
    useState<PageItem<FollowerItem> | null>(null);

  async function getFollowers() {
    try {
      const data = await getFollowerRequest(memberId, page);
      setFollowersPagingData(data);
    } catch (error: any) {
      return toast({
        title: "실패",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    getFollowers();
  }, [page]);

  if (!followersPagingData) return;

  return (
    <section className="space-y-2">
      <h2 className="text-xl font-bold mt-4">팔로워</h2>
      <div className="grid grid-cols-1 space-y-2">
        <FollowerListCard followers={followersPagingData.results} />
        <Paginations setPage={setPage} pagingData={followersPagingData} />
      </div>
    </section>
  );
}
