export interface RepresentPetItem {
  id: number;
  name: string;
  rarity: "COMMON" | "RARE" | "UNIQUE" | "EPIC" | "LEGEND" | "MYTH";
  appearance: string;
  color: string;
  level: number;
}
