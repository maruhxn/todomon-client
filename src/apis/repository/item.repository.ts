"use server";

import { InventoryItemDto } from "@/types/item";
import { ShopItem } from "@/types/shop";
import { PurchaseStarPointItemRequest } from "../validators/shop.validator";
import { getReqWithAuth, mutationJsonReqWithAuth } from "./http.repository";

const ITEM_BASE_URL = "/api/items";
const PURCHASE_BASE_URL = "/api/purchase";

export const getAllShopItemsRequest = async () => {
  return await getReqWithAuth<ShopItem[]>(ITEM_BASE_URL);
};

export interface PreparePaymentRequest {
  merchant_uid: string;
  amount: number;
  quantity: number;
  itemId: number;
}

export const preparePaymentRequest = async (payload: PreparePaymentRequest) => {
  return await mutationJsonReqWithAuth(
    PURCHASE_BASE_URL + "/payment/prepare",
    payload
  );
};

export interface PaymentRequest {
  merchant_uid: string;
  imp_uid?: string;
}

export const validatePaymentRequest = async (payload: PaymentRequest) => {
  return await mutationJsonReqWithAuth(
    PURCHASE_BASE_URL + "/payment/validate",
    payload
  );
};

export const purchaseStarPointItemRequest = async (
  payload: PurchaseStarPointItemRequest
) => {
  return await mutationJsonReqWithAuth(
    PURCHASE_BASE_URL + "/starPoint-item",
    payload
  );
};

export const refundRequest = async (orderId: number) => {
  return await mutationJsonReqWithAuth(
    PURCHASE_BASE_URL + `/payment/cancel/${orderId}`,
    null
  );
};

export const getInventoryItemsRequest = async () => {
  return await getReqWithAuth<InventoryItemDto[]>(ITEM_BASE_URL + `/inventory`);
};

interface ItemEffectRequest {
  type: string;
}

export const applyItemRequest = async (
  itemName: string,
  payload: ItemEffectRequest
) => {
  return await mutationJsonReqWithAuth(
    ITEM_BASE_URL + `/use?itemName=${itemName}`,
    payload
  );
};
