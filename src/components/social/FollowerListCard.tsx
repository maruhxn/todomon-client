import { Card, CardContent } from "@/components/ui/card";
import { FollowerItem } from "@/types/social";
import ProfileIcon from "../globals/ProfileIcon";
import FollowerListButtons from "./FollowerListButtons";

interface FollowerListCardProps {
  followers: FollowerItem[];
}

export default function FollowerListCard({ followers }: FollowerListCardProps) {
  return (
    <Card className="rounded-2xl overflow-hidden min-h-[300px]">
      <CardContent className="py-6 px-6">
        <ul className="divide-y-[1px]">
          {followers?.map((follower) => (
            <li
              key={follower.followerId}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-4 py-2">
                <ProfileIcon
                  username={follower.username}
                  profileImage={follower.profileImageUrl}
                />
                <p className="flex space-x-1 text-sm">
                  {follower.title && (
                    <span style={{ color: follower.title.color }}>
                      {`[${follower.title.name}] `}
                    </span>
                  )}
                  <span className="font-semibold">{follower.username}</span>
                </p>
              </div>
              <FollowerListButtons follower={follower} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
