export type Rarity = "COMMON" | "RARE" | "UNIQUE" | "EPIC" | "LEGEND" | "MYTH";

export interface RepresentPetItem {
  id: number;
  name: string;
  rarity: Rarity;
  appearance: string;
  color: string;
  level: number;
}

export interface MyPetInfo {
  representPetId?: number;
  id: number;
  starPoint: number;
  foodCnt: number;
  petHouseSize: number;
  myPets: MyPetItem[];
}

export interface MyPetItem {
  id: number;
  name: string;
  rarity: Rarity;
  appearance: string;
  color: string;
  level: number;
  gauge: number;
  petType: string;
}

export interface PetDexItem {
  name: string;
  rarity: Rarity;
  appearance: string;
  color: string;
}
