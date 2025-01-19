"use server";

import TAGS from "@/lib/tags";
import { PageItem } from "@/types/globals";
import { ReceivedStarItem } from "@/types/social";
import { revalidateTag } from "next/cache";
import { getReqWithAuth, mutationJsonReqWithAuth } from "./http.repository";

const STAR_TRANSACTION_BASE_URL = "/api/social/stars";

export const getReceivedStarsRequest = async (page: number) => {
  return await getReqWithAuth<PageItem<ReceivedStarItem>>(
    STAR_TRANSACTION_BASE_URL + `?pageNumber=${page}`
  );
};

export const sendStarRequest = async (memberId: number) => {
  return await mutationJsonReqWithAuth(
    STAR_TRANSACTION_BASE_URL + `/send/${memberId}`,
    null
  );
};

export const receiveStarRequest = async (transactionId: number) => {
  const err = await mutationJsonReqWithAuth(
    STAR_TRANSACTION_BASE_URL + `/receive/${transactionId}`,
    null,
    {
      method: "PATCH",
    }
  );

  revalidateTag(TAGS.LOGIN_USER_INFO);
  return err;
};

export const receiveAllStarsRequest = async () => {
  const err = await mutationJsonReqWithAuth(
    STAR_TRANSACTION_BASE_URL + `/receiveAll`,
    null,
    { method: "PATCH`" }
  );

  revalidateTag(TAGS.LOGIN_USER_INFO);
  return err;
};
