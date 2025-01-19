"use server";
import { PageItem } from "@/types/globals";
import { OrderItem } from "@/types/order";
import { getReqWithAuth } from "./http.repository";

const ORDER_BASE_URL = "/api/orders";

export const getMyOrdersRequest = async (page: number) => {
  return await getReqWithAuth<PageItem<OrderItem>>(
    ORDER_BASE_URL + `?pageNumber=${page}`,
    {
      cache: "force-cache",
      next: {
        tags: ["orders"],
      },
    }
  );
};
