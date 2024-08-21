import FollowInfoSection from "@/components/social/FollowInfoSection";
import PendingFollowsBtn from "@/components/social/PendingFollowsBtn";
import RankingSection from "@/components/social/RankingSection";
import ReceivedStarsBtn from "@/components/social/ReceivedStarsBtn";
import SearchBar from "@/components/social/SearchBar";

export default async function SocialPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">소셜</h1>
        <div className="flex items-center space-x-4">
          <ReceivedStarsBtn />
          <PendingFollowsBtn />
        </div>
      </div>
      {/* <div className="my-4">
        <div className="w-full rounded-lg relative">
          <Input
            placeholder="Search for a user.."
            className="flex-1 bg-transparent"
          />
          <Button variant="ghost" className="absolute top-0 right-0 border-l">
            <SearchIcon className="h-6 w-6" />
          </Button>
        </div>
      </div> */}
      <SearchBar />
      <RankingSection />
      <FollowInfoSection />
    </div>
  );
}
