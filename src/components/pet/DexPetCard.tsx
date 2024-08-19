import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { PetDexItem } from "@/types/pet";

interface DexPetCardProps {
  pet: PetDexItem;
  isCollected: boolean;
}

export default function DexPetCard({ pet, isCollected }: DexPetCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          className={cn(
            `w-[10%] aspect-square flex justify-center items-center rounded-lg`,
            isCollected ? "bg-blue-300" : "bg-zinc-300"
          )}
        >
          {pet.appearance}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-40 text-xs">
        <div className="flex flex-col gap-2">
          <div className="flex space-x-4">
            <span>이름 :</span>
            <span>{pet.name}</span>
          </div>
          <div className="flex space-x-4">
            <span>등급 :</span>
            <span>{pet.rarity}</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
