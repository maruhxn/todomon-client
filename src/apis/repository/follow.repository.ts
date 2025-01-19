"use server";

import TAGS from "@/lib/tags";
import { PageItem } from "@/types/globals";
import { FollowerItem, FollowingItem, FollowRequestItem } from "@/types/social";
import { revalidateTag } from "next/cache";
import {
  deleteReqWithAuth,
  getReqWithAuth,
  mutationJsonReqWithAuth,
} from "./http.repository";

const FOLLOW_BASE_URL = "/api/social/follows";

export const sendFollowOrMatFollowRequest = async (memberId: number) => {
  const err = await mutationJsonReqWithAuth(
    FOLLOW_BASE_URL + `/${memberId}`,
    null
  );
  revalidateTag(TAGS.PROFILE);
  return err;
};

export const getFollowerRequest = async (memberId: number, page: number) => {
  return await getReqWithAuth<PageItem<FollowerItem>>(
    FOLLOW_BASE_URL + `/${memberId}/followers?pageNumber=${page}`,
    { cache: "no-store" }
  );
};

export const getFollowingRequest = async (memberId: number, page: number) => {
  return await getReqWithAuth<PageItem<FollowingItem>>(
    FOLLOW_BASE_URL + `/${memberId}/followings?pageNumber=${page}`,
    { cache: "no-store" }
  );
};

export const getPendingFollowRequest = async (page: number) => {
  return await getReqWithAuth<PageItem<FollowRequestItem>>(
    FOLLOW_BASE_URL + `/requests/pending?pageNumber=${page}`
  );
};

export const removeFollowerRequest = async (followerId: number) => {
  const err = await deleteReqWithAuth(
    FOLLOW_BASE_URL + `/${followerId}/remove`
  );

  revalidateTag(TAGS.PROFILE);
  return err;
};

export const unfollowRequest = async (followeeId: number) => {
  const err = await deleteReqWithAuth(
    FOLLOW_BASE_URL + `/${followeeId}/unfollow`
  );
  revalidateTag(TAGS.PROFILE);
  return err;
};

export const respondFollowRequest = async (
  followId: number,
  isAccepted: boolean
) => {
  const queryString = new URLSearchParams({
    isAccepted: isAccepted.toString(),
  }).toString();

  const url = `${FOLLOW_BASE_URL}/requests/${followId}/respond?${queryString}`;

  const err = await mutationJsonReqWithAuth(url, null, { method: "PATCH" });
  revalidateTag(TAGS.PROFILE);
  return err;
};
