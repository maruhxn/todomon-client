import { logout } from "@/apis/repository/auth.repository";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserInfo } from "@/types/auth";
import Link from "next/link";
import ProfileIcon from "./ProfileIcon";

export default function UserAccountNav({ userInfo }: { userInfo: UserInfo }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ProfileIcon
          username={userInfo.username}
          profileImage={userInfo.profileImage}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {userInfo.username && (
              <p className="font-medium">{userInfo.username}</p>
            )}
            {userInfo.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {userInfo.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href={`/members/profile/${userInfo.id}`}>프로필</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href={`/members/pets/${userInfo.id}`}>나의 펫</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <form action={logout}>
            <button>로그아웃</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
