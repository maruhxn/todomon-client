"use server";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/lib/constants";
import { OrderItem } from "@/types/order";
import { ResponseDto } from "@/types/response.dto";
import { cookies } from "next/headers";
import { getReq } from "./http.repository";

const ORDER_BASE_URL = "/api/orders";

const getAccessToken = (): string | null =>
  cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value || null;

const getRefreshToken = (): string | null =>
  cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value || null;

const getMemberId = (): string | null =>
  cookies().get("memberId")?.value || null;

interface GetAllMyOrdersResponseDto extends ResponseDto {
  data: OrderItem[];
}

export const getMyOrdersRequest = async () => {
  const accessToken = getAccessToken();
  const memberId = getMemberId();

  if (!accessToken || !memberId) return null;

  const { data } = (await (
    await getReq(ORDER_BASE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Refresh: `Bearer ${getRefreshToken()}`,
      },
    })
  ).json()) as GetAllMyOrdersResponseDto;

  return data;
};
