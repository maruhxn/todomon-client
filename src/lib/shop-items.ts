import { Carrot, Crown, Edit, Home, LucideIcon, Utensils } from "lucide-react";

export type Item = {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: LucideIcon;
  isPremium?: boolean;
};

export const starPointItems: Item[] = [
  {
    id: "pet-egg",
    name: "펫 부화권",
    description: "새로운 펫을 부화시키거나 기존 펫을 레벨업 시킵니다.",
    price: 50,
    icon: Home,
  },
  {
    id: "house-expansion",
    name: "펫하우스 확장권",
    description: "펫하우스를 1칸 확장합니다. (최대 10칸)",
    price: 100,
    icon: Home,
  },
  {
    id: "pet-food",
    name: "펫 먹이",
    description: "펫의 체력을 회복시킵니다.",
    price: 20,
    icon: Utensils,
  },
  {
    id: "carrot",
    name: "당근",
    description: "펫에게 줄 수 있는 특별한 먹이입니다.",
    price: 15,
    icon: Carrot,
  },
  {
    id: "name-change",
    name: "펫 이름 변경권",
    description: "펫의 이름을 변경할 수 있습니다.",
    price: 40,
    icon: Edit,
  },
];

export const premiumItems: Item[] = [
  {
    id: "premium-plan",
    name: "유료 플랜 (패스권)",
    description: "칭호 설정 및 광고 제거가 가능합니다.",
    price: 4900,
    icon: Crown,
    isPremium: true,
  },
];
