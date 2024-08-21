import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FollowerItem } from "@/types/social";
import ProfileIcon from "../globals/ProfileIcon";
import { Button } from "../ui/button";

interface FollowerListCardProps {
  followers: FollowerItem[];
}

export default function FollowerListCard({ followers }: FollowerListCardProps) {
  return (
    <Card className="rounded-2xl overflow-hidden">
      <CardHeader className="bg-secondary text-secondary-foreground py-4 px-6">
        <h2 className="text-xl font-bold">팔로워</h2>
      </CardHeader>
      <CardContent className="py-6 px-6">
        <ul className="space-y-4">
          {followers?.map((follower) => (
            <li
              key={follower.followerId}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <ProfileIcon
                  username={follower.username}
                  profileImage={follower.profileImageUrl}
                />
                <h3 className="font-semibold">{follower.username}</h3>
              </div>
              <div className="flex gap-2">
                <Button variant="default" className="text-xs">
                  맞팔로우
                </Button>
                <Button variant="outline" className="text-xs">
                  삭제
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
