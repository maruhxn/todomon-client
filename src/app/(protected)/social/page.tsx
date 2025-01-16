import { getSession } from "@/apis/repository/global-action";
import FollowerInfoSection from "@/components/social/FollowerInfoSection";
import FollowingInfoSection from "@/components/social/FollowingInfoSection";
import PendingFollowsBtn from "@/components/social/PendingFollowsBtn";
import RankingSection from "@/components/social/RankingSection";
import ReceivedStarsBtn from "@/components/social/ReceivedStarsBtn";
import SearchBar from "@/components/social/SearchBar";
import { redirect } from "next/navigation";

export default async function SocialPage() {
  const userInfo = await getSession();

  if (!userInfo) {
    return redirect("/");
  }

  const memberId = userInfo.id;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">소셜</h1>
        <div className="flex items-center space-x-4">
          <ReceivedStarsBtn />
          <PendingFollowsBtn />
        </div>
      </div>
      <SearchBar />
      <RankingSection />
      <FollowerInfoSection memberId={memberId} />
      <FollowingInfoSection memberId={memberId} />
    </div>
  );
}
