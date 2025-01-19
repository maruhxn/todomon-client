import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

import { PetItem } from "@/types/pet";
import { BadgeCheckIcon } from "lucide-react";
import ChangePetNameBtn from "./ChangePetNameBtn";
import FeedBtn from "./FeedBtn";
import SetRepresentPetBtn from "./SetRepresentPetBtn";

interface PetInfoCardProps {
  petItem: PetItem;
  isRepresentPet: boolean;
}

export default function PetItemCard({
  petItem,
  isRepresentPet,
}: PetInfoCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          className={cn(
            "w-[10%] aspect-square flex justify-center items-center rounded-lg cursor-pointer",
            isRepresentPet && "ring-2 ring-yellow-500 relative"
          )}
          style={{ backgroundColor: petItem.color }}
        >
          {isRepresentPet && (
            <BadgeCheckIcon className="size-4 absolute -top-1 -left-2 fill-yellow-500 animate-pulse" />
          )}
          {petItem.appearance}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-52 text-xs">
        <SetRepresentPetBtn
          petId={petItem.id}
          isRepresentPet={isRepresentPet}
        />
        <div className="flex flex-col gap-2 mt-3 mb-6">
          <div className="flex space-x-4">
            <span>이름 :</span>
            <span>{petItem.name}</span>
          </div>
          <div className="flex space-x-4">
            <span>등급 :</span>
            <span>{petItem.rarity}</span>
          </div>
          <div className="flex space-x-4">
            <span>레벨 :</span>
            <span>{petItem.level}</span>
          </div>
          <div className="flex space-x-4">
            <span>게이지 :</span>
            <span>{`${petItem.gauge}%`}</span>
          </div>
          <div className="flex space-x-4">
            <span>종류 :</span>
            <span>{petItem.petType}</span>
          </div>
        </div>
        <FeedBtn petId={petItem.id} />
        <ChangePetNameBtn pet={petItem} />
      </HoverCardContent>
    </HoverCard>
  );
}
