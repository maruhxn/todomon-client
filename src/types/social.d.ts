interface UserItem {
  memberId: number;
  username: string;
  profileImageUrl: string;
  title: TitleNameItme;
}

interface TitleNameItme {
  name: string;
  color: string;
}

export interface FollowingItem {
  followeeId: number;
  username: string;
  profileImageUrl: string;
  title: TitleNameItme;
}

export interface FollowerItem {
  followerId: number;
  username: string;
  profileImageUrl: string;
  title: TitleNameItme;
}

export interface FollowRequestItem extends UserItem {}

export interface ReceivedStarItem {
  id: number;
  username: string;
  profileImageUrl: string;
  title: TitleNameItme;
}

export interface TodoAchievementRankItem extends UserItem {
  cnt: number;
}

export interface DiligenceRankItem extends UserItem {
  level: number;
}

export interface CollectedPetRankItem extends UserItem {
  petCnt: number;
  lastCollectedAt: string;
}
