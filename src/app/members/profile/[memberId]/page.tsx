import { getProfileRequest } from "@/apis/repository/members.repository";
import AddTitleNameBtn from "@/components/profile/AddTitleNameBtn";
import FollowInfoBtn from "@/components/profile/FollowInfoBtn";
import UpdateProfileBtn from "@/components/profile/UpdateProfileBtn";
import ViewFollowersBtn from "@/components/profile/ViewFollowersBtn";
import ViewFollowingsBtn from "@/components/profile/ViewFollowingsBtn";
import ViewInventoryBtn from "@/components/profile/ViewInventoryBtn";
import WithdrawBtn from "@/components/profile/WithdrawBtn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn, getProfileImage } from "@/lib/utils";
import { BadgeCheckIcon, ScrollTextIcon, StarIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: { memberId: string };
}) {
  let isMyProfile = false;
  let memberId: number;

  const loginMemberId = cookies().get("memberId")?.value ?? null;

  if (
    loginMemberId &&
    (params.memberId === "my" || params.memberId === loginMemberId)
  ) {
    isMyProfile = true;
    memberId = +loginMemberId;
  } else {
    memberId = Number(params.memberId);
  }

  if (isNaN(memberId)) {
    return notFound();
  }

  const profile = await getProfileRequest(memberId);
  if (!profile) return notFound();

  return (
    <div className="bg-muted w-full min-h-screen flex justify-center items-center">
      <Card>
        <CardContent className="flex flex-col items-center p-6 md:flex-row md:items-start md:gap-6">
          <div className="relative">
            <Avatar className="size-20 md:w-24 md:h-24 relative">
              <AvatarImage
                className="object-cover"
                src={getProfileImage(profile.profileImageUrl)}
                alt={`@${profile.username}`}
              />
              <AvatarFallback>{profile.username}</AvatarFallback>
            </Avatar>
            {profile.subscribed && (
              <Badge className="absolute top-0 -left-1 bg-green-500">
                멤버쉽
              </Badge>
            )}
          </div>
          <div className="mt-4 md:mt-0 text-center md:text-left">
            <div className="flex justify-between items-center gap-2">
              <p className="text-2xl font-bold">
                {profile.title && (
                  <span
                    style={{ color: profile.title.color }}
                  >{`[${profile.title.name}] `}</span>
                )}
                {profile.username}
              </p>
              {isMyProfile ? (
                <AddTitleNameBtn />
              ) : (
                <FollowInfoBtn
                  memberId={memberId}
                  followInfo={profile.followInfo}
                />
              )}

              {}
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <ViewFollowersBtn
                memberId={memberId}
                followerCnt={profile.followInfo.followerCnt}
              />
              <ViewFollowingsBtn
                memberId={memberId}
                followingCnt={profile.followInfo.followingCnt}
              />
            </div>
            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <StarIcon className="w-4 h-4 fill-yellow-500 stroke-yellow-500" />
                <span className="font-medium">{`Lv. ${profile.level}`}</span>
              </div>
              <div className="flex items-center gap-2">
                <Progress
                  value={profile.gauge}
                  max={100}
                  className="w-56 h-2 rounded-full ring-1 ring-black"
                />
                <span className="font-medium">{`${profile.gauge}%`}</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BadgeCheckIcon className="size-4 text-black fill-yellow-500" />
              {profile.representPetItem ? (
                <div
                  className={cn("flex gap-2 font-medium items-center")}
                  style={{ color: profile.representPetItem.color }}
                >
                  <span className="font-bold">
                    {`[${profile.representPetItem.rarity}] ${profile.representPetItem.name}`}
                  </span>
                  <span className="text-lg">
                    {profile.representPetItem.appearance}
                  </span>
                </div>
              ) : (
                <span className="font-medium">대표 펫이 없습니다</span>
              )}
            </div>
            {isMyProfile && (
              <>
                <Separator className="my-4" />
                <ViewInventoryBtn memberId={memberId} />
                <Separator className="my-4" />
                <Link href="/members/orders">
                  <Button variant="outline" className="w-full space-x-4">
                    <ScrollTextIcon className="size-4" />
                    <span>구매 내역 확인</span>
                  </Button>
                </Link>
                <Separator className="my-4" />
                <div className="flex items-center gap-4">
                  <UpdateProfileBtn profile={profile} />
                  <WithdrawBtn memberId={memberId} />
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
