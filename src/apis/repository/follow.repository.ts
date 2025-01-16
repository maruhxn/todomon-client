"use server";

import { PageItem } from "@/types/globals";
import { ResponseDto } from "@/types/response.dto";
import { FollowerItem, FollowingItem, FollowRequestItem } from "@/types/social";
import {
  deleteReqWithAuth,
  getReqWithAuth,
  mutationJsonReqWithAuth,
  patchReqWithAuth,
} from "./http.repository";

const FOLLOW_BASE_URL = "/api/social/follows";

interface GetPendingFollowRequestsResponseDto extends ResponseDto {
  data: PageItem<FollowRequestItem>;
}

export const sendFollowOrMatFollowRequest = async (memberId: number) => {
  await mutationJsonReqWithAuth(FOLLOW_BASE_URL + `/${memberId}`, null);
};

export const getFollowerRequest = async (memberId: number, page: number) => {
  return await getReqWithAuth<PageItem<FollowerItem>>(
    FOLLOW_BASE_URL + `/${memberId}/followers?pageNumber=${page}`
  );
};

export const getFollowingRequest = async (memberId: number, page: number) => {
  return await getReqWithAuth<PageItem<FollowingItem>>(
    FOLLOW_BASE_URL + `/${memberId}/followings?pageNumber=${page}`
  );
};

export const getPendingFollowRequest = async (page: number) => {
  return await getReqWithAuth<PageItem<FollowRequestItem>>(
    FOLLOW_BASE_URL + `/requests/pending?pageNumber=${page}`
  );
};

export const removeFollowerRequest = async (followerId: number) => {
  await deleteReqWithAuth(FOLLOW_BASE_URL + `/${followerId}/remove`);
};

export const unfollowRequest = async (followeeId: number) => {
  await deleteReqWithAuth(FOLLOW_BASE_URL + `/${followeeId}/unfollow`);
};

export const respondFollowRequest = async (
  followId: number,
  isAccepted: boolean
) => {
  const queryString = new URLSearchParams({
    isAccepted: isAccepted.toString(),
  }).toString();

  const url = `${FOLLOW_BASE_URL}/requests/${followId}/respond?${queryString}`;

  await patchReqWithAuth(url, null);
};

export const matFollowRequest = async (followerId: number) => {
  await mutationJsonReqWithAuth(
    FOLLOW_BASE_URL + `/${followerId}/mutual`,
    null
  );
};
