export type Rarity = "COMMON" | "RARE" | "UNIQUE" | "EPIC" | "LEGEND" | "MYTH";

export interface RepresentPetItem {
  id: number;
  name: string;
  rarity: Rarity;
  appearance: string;
  color: string;
  level: number;
}

export interface PetInfo {
  representPetId?: number;
  petHouseSize: number;
  myPets: PetItem[];
}

export interface PetItem {
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
