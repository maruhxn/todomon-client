interface UserItem {
  username: string;
  profileImageUrl: string;
  title: TitleNameItme;
}

interface TitleNameItme {
  name: string;
  color: string;
}

export interface FollowingItem extends UserItem {
  followeeId: number;
}

export interface FollowerItem extends UserItem {
  followerId: number;
  matFollow?: boolean;
}

export interface FollowRequestItem extends UserItem {
  id: number;
  senderId: number;
}

export interface ReceivedStarItem extends UserItem {
  id: number;
  senderId: number;
}

export interface RankItem extends UserItem {
  memberId: number;
}

export interface TodoAchievementRankItem extends RankItem {
  cnt: number;
}

export interface DiligenceRankItem extends RankItem {
  level: number;
}

export interface CollectedPetRankItem extends RankItem {
  petCnt: number;
  lastCollectedAt: string;
}
