import { UserInfo } from "@/types/auth";
import { UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function ProfileIcon({ userInfo }: { userInfo: UserInfo }) {
  return (
    <Avatar>
      <AvatarImage src={userInfo.profileImage} />
      <AvatarFallback>
        <span className="sr-only">{userInfo?.username}</span>
        <UserIcon className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
  );
}
