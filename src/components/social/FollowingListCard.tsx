"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FollowingItem } from "@/types/social";
import Link from "next/link";
import ProfileIcon from "../globals/ProfileIcon";
import FollowingBtnGroup from "./FollowingBtnGroup";

interface FollowingListCardProps {
  followings: FollowingItem[];
}

export default function FollowingListCard({
  followings,
}: FollowingListCardProps) {
  return (
    <Card className="rounded-2xl overflow-hidden min-h-[300px]">
      <CardContent className="py-6 px-6">
        <ul className="divide-y-[1px]">
          {followings?.map((following) => (
            <li
              key={following.followeeId}
              className="flex items-center justify-between"
            >
              <Link
                className="flex items-center space-x-4 py-2"
                href={`/members/profile/${following.followeeId}`}
              >
                <ProfileIcon
                  username={following.username}
                  profileImage={following.profileImageUrl}
                />
                <p className="flex space-x-1 text-sm">
                  {following.title && (
                    <span style={{ color: following.title.color }}>
                      {`[${following.title.name}] `}
                    </span>
                  )}
                  <span className="font-semibold">{following.username}</span>
                </p>
              </Link>
              <FollowingBtnGroup memberId={following.followeeId} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
