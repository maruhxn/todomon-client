import { getPendingFollowRequest } from "@/apis/repository/follow.repository";
import { handleErrorForServerComponent } from "@/lib/error-handler";
import { PageItem } from "@/types/globals";
import { FollowRequestItem } from "@/types/social";
import { UsersIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import PendingFollowsDialog from "./PendingFollowsDialog";

export default async function PendingFollowsBtn() {
  const result = await getPendingFollowRequest(0);
  if ("error" in result) {
    handleErrorForServerComponent(result);
  }

  const pendingFollows = result as PageItem<FollowRequestItem>;

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
      <PendingFollowsDialog initialData={pendingFollows} />
    </Dialog>
  );
}
