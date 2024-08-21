import { RepresentPetItem } from "./pet";

export interface ProfileDto {
  id: number;
  username: string;
  email: string;
  profileImageUrl: string;
  level: number;
  gauge: number;
  titleName: string;
  titleColor: string;
  representPetItem: RepresentPetItem;
  followerCnt: number;
  followingCnt: number;
}

export interface SearchDto {
  memberId: number;
  username: string;
}
