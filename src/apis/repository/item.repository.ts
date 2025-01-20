"use server";

import TAGS from "@/lib/tags";
import { InventoryItemDto } from "@/types/item";
import { ShopItem } from "@/types/shop";
import { revalidateTag } from "next/cache";
import { getReqWithAuth, mutationJsonReqWithAuth } from "./http.repository";

const ITEM_BASE_URL = "/api/items";

export const getAllShopItemsRequest = async () => {
  return await getReqWithAuth<ShopItem[]>(ITEM_BASE_URL, {
    cache: "force-cache",
    next: {
      tags: [TAGS.SHOP_ITEMS],
    },
  });
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
  const err = await mutationJsonReqWithAuth(
    ITEM_BASE_URL + `/use?itemName=${itemName}`,
    payload
  );
  revalidateTag(TAGS.LOGIN_USER_INFO);
  revalidateTag(TAGS.PROFILE);
  revalidateTag(TAGS.USER_PET);
  return err;
};
