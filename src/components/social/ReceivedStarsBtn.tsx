import { getReceivedStarsRequest } from "@/apis/repository/star-trasactions.repository";
import { StarsIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import ReceivedStarsDialog from "./ReceivedStarsDialog";

export default async function ReceivedStarsBtn() {
  const receivedStars = await getReceivedStarsRequest();
  if (!receivedStars) notFound();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative hover:scale-105">
          <StarsIcon className="mr-2 size-5" />별 수신함
          {receivedStars.totalElements > 0 && (
            <div className="absolute -top-1 -left-1 text-xs bg-red-500 rounded-full size-5 text-white flex items-center justify-center">
              {receivedStars.totalElements}
            </div>
          )}
        </Button>
      </DialogTrigger>
      <ReceivedStarsDialog receivedStars={receivedStars.results} />
    </Dialog>
  );
}
