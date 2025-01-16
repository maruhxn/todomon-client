"use client";

import { getFollowerRequest } from "@/apis/repository/follow.repository";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { FollowerItem } from "@/types/social";

import { PageItem } from "@/types/globals";
import { useEffect, useState } from "react";
import FollowerList from "./FollowerListDialog";

interface ViewFollowersBtnProps {
  memberId: number;
  followerCnt: number;
}

export default function ViewFollowersBtn({
  memberId,
  followerCnt,
}: ViewFollowersBtnProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [followersPagingData, setFollowersPagingData] =
    useState<PageItem<FollowerItem> | null>(null);
  const { toast } = useToast();

  async function getFollowerList() {
    const result = await getFollowerRequest(memberId, page);
    if ("error" in result) {
      toast({
        title: "실패",
        description: result.error.message,
      });
    } else {
      setFollowersPagingData(result);
    }
  }

  useEffect(() => {
    getFollowerList();
  }, [page]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className="cursor-pointer rounded-md hover:ring-offset-4 hover:ring-black hover:ring-2"
          onClick={getFollowerList}
        >
          <span className="font-medium">{followerCnt}</span> 팔로워
        </div>
      </DialogTrigger>
      {followersPagingData && (
        <FollowerList
          followersPagingData={followersPagingData}
          setPage={setPage}
        />
      )}
    </Dialog>
  );
}
