"use server";

import TAGS from "@/lib/tags";
import { revalidateTag } from "next/cache";
import { PurchaseStarPointItemRequest } from "../validators/shop.validator";
import { mutationJsonReqWithAuth } from "./http.repository";

const PAYMENT_BASE_URL = "/api/payment";

export interface PreparePaymentRequest {
  merchant_uid: string;
  amount: number;
  quantity: number;
  itemId: number;
}

export const preparePaymentRequest = async (payload: PreparePaymentRequest) => {
  const err = await mutationJsonReqWithAuth(
    PAYMENT_BASE_URL + "/prepare",
    payload
  );
  revalidateTag(TAGS.LOGIN_USER_INFO);
  return err;
};

export interface PaymentRequest {
  merchant_uid: string;
  imp_uid: string;
}

export const validatePaymentRequest = async (payload: PaymentRequest) => {
  const err = await mutationJsonReqWithAuth(
    PAYMENT_BASE_URL + "/complete",
    payload
  );
  revalidateTag(TAGS.LOGIN_USER_INFO);
  return err;
};

export const purchasePremiumItemRequest = async (merchantUid: string) => {
  const err = await mutationJsonReqWithAuth(
    PAYMENT_BASE_URL + `/purchase-item/${merchantUid}`,
    null
  );
  revalidateTag(TAGS.LOGIN_USER_INFO);
  return err;
};

export const purchaseStarPointItemRequest = async (
  payload: PurchaseStarPointItemRequest
) => {
  const err = await mutationJsonReqWithAuth("/api/purchase", payload);
  return err;
};

export const refundRequest = async (merchantUid: string) => {
  return await mutationJsonReqWithAuth(
    PAYMENT_BASE_URL + `/cancel/${merchantUid}`,
    null
  );
};
