import { setRepresentPetRequest } from "@/apis/repository/pet.repository";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

import { PetItem } from "@/types/pet";
import { BadgeCheckIcon, BadgeMinusIcon } from "lucide-react";
import ChangePetNameBtn from "./ChangePetNameBtn";
import FeedBtn from "./FeedBtn";

interface PetInfoCardProps {
  petItem: PetItem;
  isRepresentPet: boolean;
}

export default function PetItemCard({
  petItem,
  isRepresentPet,
}: PetInfoCardProps) {
  async function setRepresentPet() {
    "use server";
    try {
      await setRepresentPetRequest(isRepresentPet ? null : petItem.id);
    } catch (error) {
      console.error(error);
    }
  }

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
        <form className="flex justify-end" action={setRepresentPet}>
          <button>
            {isRepresentPet ? (
              <BadgeMinusIcon className="size-5 cursor-pointer stroke-red-500 hover:stroke-white hover:fill-red-500 " />
            ) : (
              <BadgeCheckIcon className="size-5 cursor-pointer stroke-zinc-500 hover:stroke-zinc-700" />
            )}
          </button>
        </form>
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
