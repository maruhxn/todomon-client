import { getAuthRequest } from "@/apis/repository/auth.repository";
import { getProfileRequest } from "@/apis/repository/members.repository";
import UpdateProfileBtn from "@/components/profile/UpdateProfileBtn";
import ViewFollowersBtn from "@/components/profile/ViewFollowersBtn";
import ViewFollowingsBtn from "@/components/profile/ViewFollowingsBtn";
import WithdrawBtn from "@/components/profile/WithdrawBtn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn, getProfileImage } from "@/lib/utils";
import { BadgeCheckIcon, StarIcon } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: { memberId: string };
}) {
  let isMyProfile = false;
  let memberId;

  const loginUserInfo = await getAuthRequest();
  if (params.memberId === "my" && loginUserInfo) {
    isMyProfile = true;
    memberId = loginUserInfo?.id;
  } else {
    memberId = Number(params.memberId);
  }

  if (isNaN(memberId)) {
    return notFound();
  }

  console.log(isMyProfile);

  const profile = await getProfileRequest(memberId);

  if (!profile) return notFound();

  return (
    <div className="bg-muted w-full min-h-screen flex justify-center items-center">
      <Card>
        <CardContent className="flex flex-col items-center p-6 md:flex-row md:items-start md:gap-6">
          <Avatar className="w-20 h-20 md:w-24 md:h-24">
            <AvatarImage
              className="object-cover"
              src={getProfileImage(profile.profileImageUrl)}
              alt={`@${profile.username}`}
            />
            <AvatarFallback>{profile.username}</AvatarFallback>
          </Avatar>
          <div className="mt-4 md:mt-0 text-center md:text-left">
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">
                {profile.titleName && (
                  <span
                    className={`text-[${profile.titleColor}]`}
                  >{`[${profile.titleName}] `}</span>
                )}
                {profile.username}
              </p>
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <ViewFollowersBtn
                memberId={memberId}
                followerCnt={profile.followerCnt}
              />
              <ViewFollowingsBtn
                memberId={memberId}
                followingCnt={profile.followingCnt}
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
