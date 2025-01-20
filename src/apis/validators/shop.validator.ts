import { z } from "zod";

export const PurchaseStarPointItemValidator = z.object({
  itemId: z.number(),
  quantity: z.number(),
  amount: z.number(),
});

export type PurchaseStarPointItemRequest = z.infer<
  typeof PurchaseStarPointItemValidator
>;
