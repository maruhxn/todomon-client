import { UserInfo } from "@/types/auth";
import { CarrotIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import LoginModal from "./LoginModal";
import UserAccountNav from "./UserAccountNav";

export default function Header({ userInfo }: { userInfo?: UserInfo | null }) {
  return (
    <header className="fixed top-0 flex items-center justify-between bg-background px-6 border-b h-16 w-full z-40">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <span className="text-xl font-bold">TODOMON</span>
      </Link>
      {userInfo ? (
        <div className="flex justify-end items-center space-x-6">
          <div className="flex items-center gap-2">
            <StarIcon className="size-4 fill-yellow-400 stroke-yellow-400" />
            <span className="font-bold">{userInfo.starPoint}</span>
          </div>
          <div className="flex items-center gap-2">
            <CarrotIcon className="size-4 fill-orange-400 stroke-orange-400" />
            <span className="font-bold">{userInfo.foodCnt}</span>
          </div>
          <UserAccountNav userInfo={userInfo} />
        </div>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-500">Login</Button>
          </DialogTrigger>
          <LoginModal />
        </Dialog>
      )}
    </header>
  );
}
