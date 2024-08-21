import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FollowingItem } from "@/types/social";
import ProfileIcon from "../globals/ProfileIcon";
import FollowingBtnGroup from "./FollowingBtnGroup";

interface FollowingListCardProps {
  followings: FollowingItem[];
}

export default function FollowingListCard({
  followings,
}: FollowingListCardProps) {
  return (
    <Card className="rounded-2xl overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground py-4 px-6">
        <h2 className="text-xl font-bold">팔로잉</h2>
      </CardHeader>
      <CardContent className="py-6 px-6">
        <ul className="space-y-4">
          {followings?.map((following) => (
            <li
              key={following.followeeId}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <ProfileIcon
                  username={following.username}
                  profileImage={following.profileImageUrl}
                />
                <h3 className="font-semibold">{following.username}</h3>
              </div>
              <FollowingBtnGroup memberId={following.followeeId} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
