import { RepresentPetItem } from "./pet";

export type FOLLOW_STATUS = "ACCEPTED" | "PENDING" | "REJECTED" | null;

export interface ProfileDto {
  id: number;
  username: string;
  email: string;
  profileImageUrl: string;
  level: number;
  gauge: number;
  title: TitleNameItem;
  representPetItem: RepresentPetItem;
  followInfo: FollowInfoItem;
}

export interface FollowInfoItem {
  followerCnt: number;
  followingCnt: number;
  isFollowing: boolean;
  receivedRequestId: number;
  receivedFollowStatus: FOLLOW_STATUS;
  sentFollowStatus: FOLLOW_STATUS;
}

export interface TitleNameItem {
  id: number;
  name: string;
  color: string;
}

export interface SearchDto {
  memberId: number;
  username: string;
}
