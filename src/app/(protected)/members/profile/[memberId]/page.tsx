import { getMemberId } from "@/apis/repository/global-action";
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
import { RepresentPetItem } from "@/types/pet";
import { ProfileDto } from "@/types/profile";
import { BadgeCheckIcon, ScrollTextIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

async function checkIsMyProfile(memberId: string) {
  const loginMemberId = await getMemberId();

  if (!loginMemberId) redirect("/");

  if (memberId === "my" || memberId === loginMemberId) {
    return true;
  } else {
    return false;
  }
}

export default async function ProfilePage({
  params,
}: {
  params: { memberId: string };
}) {
  const isMyProfile = await checkIsMyProfile(params.memberId);
  let memberId: number;

  if (isMyProfile) {
    memberId = Number(await getMemberId());
  } else {
    memberId = Number(params.memberId);
  }

  const profile = await getProfileRequest(memberId);
  if (!profile) return notFound();

  return (
    <div className="bg-muted w-full min-h-screen flex justify-center items-center">
      <Card>
        <CardContent className="flex flex-col items-center p-6 md:flex-row md:items-start md:gap-6">
          <UserAvatarSection profile={profile} />
          <div className="mt-4 md:mt-0 text-center md:text-left">
            <div className="flex justify-between items-center gap-2">
              <UsernameSection profile={profile} />
              {isMyProfile ? (
                <AddTitleNameBtn />
              ) : (
                <FollowInfoBtn
                  memberId={memberId}
                  followInfo={profile.followInfo}
                />
              )}
            </div>
            <FollowInfoBtns profile={profile} />
            <UserDiligenceSection profile={profile} />
            <Separator className="my-4" />
            <RepresentPetSection representPet={profile.representPetItem} />
            {isMyProfile && (
              <>
                <Separator className="my-4" />
                <ViewInventoryBtn />
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

function UserAvatarSection({ profile }: { profile: ProfileDto }) {
  return (
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
        <Badge className="absolute top-0 -left-1 bg-green-500">멤버쉽</Badge>
      )}
    </div>
  );
}

function UsernameSection({ profile }: { profile: ProfileDto }) {
  return (
    <p className="text-2xl font-bold">
      {profile.title && (
        <span
          style={{ color: profile.title.color }}
        >{`[${profile.title.name}] `}</span>
      )}
      {profile.username}
    </p>
  );
}

function FollowInfoBtns({ profile }: { profile: ProfileDto }) {
  return (
    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
      <ViewFollowersBtn
        memberId={profile.id}
        followerCnt={profile.followInfo.followerCnt}
      />
      <ViewFollowingsBtn
        memberId={profile.id}
        followingCnt={profile.followInfo.followingCnt}
      />
    </div>
  );
}

function UserDiligenceSection({ profile }: { profile: ProfileDto }) {
  return (
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
  );
}

function RepresentPetSection({
  representPet,
}: {
  representPet: RepresentPetItem;
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <BadgeCheckIcon className="size-4 text-black fill-yellow-500" />
      {representPet ? (
        <div
          className={cn("flex gap-2 font-medium items-center")}
          style={{ color: representPet.color }}
        >
          <span className="font-bold">
            {`[${representPet.rarity}] ${representPet.name}`}
          </span>
          <span className="text-lg">{representPet.appearance}</span>
        </div>
      ) : (
        <span className="font-medium">대표 펫이 없습니다</span>
      )}
    </div>
  );
}
