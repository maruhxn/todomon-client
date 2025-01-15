"use server";

import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/lib/constants";
import { TAG_ORDERS, TAG_PROFILE } from "@/lib/tags";
import { InventoryItemDto } from "@/types/item";
import { ResponseDto } from "@/types/response.dto";
import { ShopItem } from "@/types/shop";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { PurchaseStarPointItemRequest } from "../validators/shop.validator";
import {
  getReq,
  getReqWithAuth,
  postReq,
  postReqWithAuth,
} from "./http.repository";

const ITEM_BASE_URL = "/api/items";
const PURCHASE_BASE_URL = "/api/purchase";

const getAccessToken = (): string | null =>
  cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value || null;

const getRefreshToken = (): string | null =>
  cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value || null;

const getMemberId = (): string | null =>
  cookies().get("memberId")?.value || null;

interface GetAllItemsResponseDto extends ResponseDto {
  data: ShopItem[];
}

interface GetInventoryItemsResponseDto extends ResponseDto {
  data: InventoryItemDto[];
}

export const getAllShopItemsRequest = async () => {
  const accessToken = getAccessToken();

  if (!accessToken) return null;

  const { data } = (await (
    await getReq(ITEM_BASE_URL, {
      next: {
        tags: [`items`],
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Refresh: `Bearer ${getRefreshToken()}`,
      },
    })
  ).json()) as GetAllItemsResponseDto;

  return data;
};

export interface PreparePaymentRequest {
  merchant_uid: string;
  amount: number;
  quantity: number;
  itemId: number;
}

export const preparePaymentRequest = async (payload: PreparePaymentRequest) => {
  const accessToken = getAccessToken();

  if (!accessToken) return null;

  await postReq(PURCHASE_BASE_URL + "/payment/prepare", payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${getRefreshToken()}`,
      "Content-Type": "application/json",
    },
  });
};

export interface PaymentRequest {
  merchant_uid: string;
  imp_uid?: string;
}

export const validatePaymentRequest = async (payload: PaymentRequest) => {
  const accessToken = getAccessToken();
  const memberId = getMemberId();
  if (!accessToken || !memberId) return null;

  await postReq(PURCHASE_BASE_URL + "/payment/validate", payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${getRefreshToken()}`,
      "Content-Type": "application/json",
    },
  });

  revalidateTag(TAG_PROFILE(+memberId));
};

export const purchaseStarPointItemRequest = async (
  payload: PurchaseStarPointItemRequest
) => {
  const accessToken = getAccessToken();

  if (!accessToken) return null;

  await postReq(PURCHASE_BASE_URL + "/starPoint-item", payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${getRefreshToken()}`,
      "Content-Type": "application/json",
    },
  });
};

export const refundRequest = async (orderId: number) => {
  const accessToken = getAccessToken();
  const memberId = getMemberId();
  if (!accessToken || !memberId) return null;

  await postReq(PURCHASE_BASE_URL + `/payment/cancel/${orderId}`, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${getRefreshToken()}`,
    },
  });

  revalidateTag(TAG_PROFILE(+memberId));
  revalidateTag(TAG_ORDERS(+memberId));
};

export const getInventoryItemsRequest = async () => {
  const { data } = (await (
    await getReqWithAuth(ITEM_BASE_URL + `/inventory`)
  )?.json()) as GetInventoryItemsResponseDto;

  return data;
};

interface ItemEffectRequest {
  type: string;
}

export const applyItemRequest = async (
  itemName: string,
  payload: ItemEffectRequest
) => {
  await postReqWithAuth(ITEM_BASE_URL + `/use?itemName=${itemName}`, payload);
};
