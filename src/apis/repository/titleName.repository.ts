"use server";

import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/lib/constants";
import { TAG_PROFILE } from "@/lib/tags";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { CreateTitleNameRequest } from "../validators/titleName.validator";
import { postReq } from "./http.repository";

const TITLENAME_BASE_URL = "/api/members/titleNames";

export const createTitleNameRequest = async (
  memberId: number,
  payload: CreateTitleNameRequest
) => {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) return null;

  await postReq(TITLENAME_BASE_URL, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value}`,
      "Content-Type": "application/json",
    },
  });

  revalidateTag(TAG_PROFILE(memberId));
};
