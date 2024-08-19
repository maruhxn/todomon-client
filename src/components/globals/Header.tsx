import { UserInfo } from "@/types/auth";
import Link from "next/link";
import LoginModal from "../LoginModal";
import UserAccountNav from "../UserAccountNav";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";

export default function Header({ userInfo }: { userInfo?: UserInfo | null }) {
  return (
    <header className="flex items-center justify-between bg-background px-6 py-2 border-b">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <span className="text-xl font-bold">TODOMON</span>
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
