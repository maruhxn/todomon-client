import { getProfileImage } from "@/lib/utils";
import { FollowRequestItem } from "@/types/social";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import AcceptFollowBtn from "./AcceptFollowBtn";

interface PendingFollowsDialogProps {
  pendingFollows: FollowRequestItem[];
}

export default function PendingFollowsDialog({
  pendingFollows,
}: PendingFollowsDialogProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>대기중인 팔로우 요청</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-1 gap-4">
          {pendingFollows.length > 0 &&
            pendingFollows.map((request) => (
              <div className="flex justify-between items-center">
                <div key={request.id} className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={getProfileImage(request.profileImageUrl)}
                      alt={request.username}
                    />
                    <AvatarFallback>{`@${request.username}`}</AvatarFallback>
                  </Avatar>
                  <h4 className="font-medium">{request.username}</h4>
                </div>
                <AcceptFollowBtn followId={request.id} />
              </div>
            ))}
          {pendingFollows.length <= 0 && (
            <span className="text-sm text-center font-semibold">
              팔로우한 유저가 없습니다.
            </span>
          )}
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            닫기
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
