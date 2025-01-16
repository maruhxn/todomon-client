"use client";

import { getFollowingRequest } from "@/apis/repository/follow.repository";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { PageItem } from "@/types/globals";
import { FollowingItem } from "@/types/social";

import { useEffect, useState } from "react";
import FollowingListDialog from "./FollowingListDialog";

interface ViewFollowingsBtnProps {
  memberId: number;
  followingCnt: number;
}

export default function ViewFollowingsBtn({
  memberId,
  followingCnt,
}: ViewFollowingsBtnProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [followingsPagingData, setFollowingsPagingData] =
    useState<PageItem<FollowingItem> | null>(null);
  const { toast } = useToast();

  async function getFollowingList() {
    const result = await getFollowingRequest(memberId, 0);
    if ("error" in result) {
      return toast({
        title: "실패",
        description: result.error.message,
        variant: "destructive",
      });
    }
    setFollowingsPagingData(result);
  }

  useEffect(() => {
    getFollowingList();
  }, [page]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className="cursor-pointer rounded-md hover:ring-offset-4 hover:ring-black hover:ring-2"
          onClick={getFollowingList}
        >
          <span className="font-medium">{followingCnt}</span> 팔로잉
        </div>
      </DialogTrigger>
      {followingsPagingData && (
        <FollowingListDialog
          followingsPagingData={followingsPagingData}
          setPage={setPage}
        />
      )}
    </Dialog>
  );
}
