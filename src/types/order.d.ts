import { MoneyType } from "./shop";

export type OrderStatus = "REQUEST_PAYMENT" | "CANCELED" | "FAILED" | "OK";

export interface OrderItem {
  orderId: number;
  totalPrice: number;
  quantity: number;
  merchantUid: string;
  moneyType: MoneyType;
  orderStatus: OrderStatus;
  updatedAt: string;
}
