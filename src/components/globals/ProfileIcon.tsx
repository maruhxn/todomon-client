import { getProfileImage } from "@/lib/utils";
import { UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ProfileIconProps {
  username: string;
  profileImage: string;
}

export default function ProfileIcon({
  username,
  profileImage,
}: ProfileIconProps) {
  return (
    <Avatar>
      <AvatarImage
        className="object-cover"
        src={getProfileImage(profileImage)}
      />
      <AvatarFallback>
        <span className="sr-only">{username}</span>
        <UserIcon className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
  );
}
