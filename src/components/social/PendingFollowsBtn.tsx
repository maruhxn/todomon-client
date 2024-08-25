import { getPendingFollowRequest } from "@/apis/repository/follow.repository";
import { UsersIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import PendingFollowsDialog from "./PendingFollowsDialog";

export default async function PendingFollowsBtn() {
  const pendingFollows = await getPendingFollowRequest(0);
  if (!pendingFollows) notFound();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative hover:scale-105">
          <UsersIcon className="mr-2 size-5" />
          요청
          {pendingFollows.totalElements > 0 && (
            <div className="absolute -top-1 -left-1 text-xs bg-red-500 rounded-full size-5 text-white flex items-center justify-center">
              {pendingFollows.totalElements}
            </div>
          )}
        </Button>
      </DialogTrigger>
      <PendingFollowsDialog pendingFollows={pendingFollows.results} />
    </Dialog>
  );
}
