import {
  getFollowerRequest,
  getFollowingRequest,
} from "@/apis/repository/follow.repository";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import FollowerListCard from "./FollowerListCard";
import FollowingListCard from "./FollowingListCard";

export default async function FollowInfoSection() {
  const memberIdStr = cookies().get("memberId")?.value ?? "";
  const memberId = parseInt(memberIdStr);

  if (isNaN(memberId)) {
    redirect("/");
  }

  const followers = await getFollowerRequest(memberId);
  const followings = await getFollowingRequest(memberId);

  if (!followers || !followings) redirect("/");

  return (
    <section className="space-y-2">
      <h2 className="text-xl font-bold mt-4">팔로우 정보</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FollowerListCard followers={followers} />
        <FollowingListCard followings={followings} />
      </div>
    </section>
  );
}
