import { UserInfo } from "@/types/auth";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import LoginModal from "./LoginModal";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import UserAccountNav from "./UserAccountNav";

export default function Header({ userInfo }: { userInfo?: UserInfo | null }) {
  return (
    <header className="flex items-center justify-between bg-background px-6 py-4 border-b">
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
        <CalendarIcon className="h-6 w-6" />
        <span className="text-xl font-bold">Todomon</span>
      </Link>
      {userInfo ? (
        <UserAccountNav userInfo={userInfo} />
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Login</Button>
          </DialogTrigger>
          <LoginModal />
        </Dialog>
      )}
    </header>
  );
}
