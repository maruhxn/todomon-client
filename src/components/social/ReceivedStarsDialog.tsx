import { receiveAllStarsRequest } from "@/apis/repository/star-trasactions.repository";
import { ReceivedStarItem } from "@/types/social";
import ProfileIcon from "../globals/ProfileIcon";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import ReceiveStarBtn from "./ReceiveStarBtn";

interface ReceivedStarsDialogProps {
  receivedStars: ReceivedStarItem[];
}

export default function ReceivedStarsDialog({
  receivedStars,
}: ReceivedStarsDialogProps) {
  async function receiveAllStars() {
    "use server";
    await receiveAllStarsRequest();
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>별 수신함</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-1 gap-4">
          {receivedStars.length > 0 &&
            receivedStars.map((request) => (
              <div
                key={request.id}
                className="flex justify-between items-center"
              >
                <div key={request.id} className="flex items-center gap-4">
                  <ProfileIcon
                    username={request.username}
                    profileImage={request.profileImageUrl}
                  />
                  <h4 className="font-medium">{request.username}</h4>
                </div>
                <ReceiveStarBtn transactionId={request.id} />
              </div>
            ))}
          {receivedStars.length <= 0 && (
            <span className="text-sm text-center font-semibold">
              수신된 ⭐️이 없습니다
            </span>
          )}
        </div>
      </div>
      <DialogFooter>
        {receivedStars.length > 0 && (
          <form action={receiveAllStars}>
            <Button type="button" variant="default">
              모두 받기
            </Button>
          </form>
        )}
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            닫기
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
