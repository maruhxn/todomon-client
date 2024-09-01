export type ItemType = "CONSUMABLE" | "STATE_MODIFIER";

export type MoneyType = "STARPOINT" | "REAL_MONEY";

interface ShopItem {
  id: number;
  name: string;
  description: string;
  isPremium: boolean;
  itemType: ItemType;
  moneyType: MoneyType;
  price: number;
  isAvailable: boolean;
}
