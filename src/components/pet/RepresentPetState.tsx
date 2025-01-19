import { PetItem } from "@/types/pet";
import { Progress } from "../ui/progress";

interface RepresentPetStateProps {
  representPet: PetItem;
}

export default function RepresentPetState({
  representPet,
}: RepresentPetStateProps) {
  return (
    <div className="flex flex-1 flex-col justify-center items-center font-bold p-6">
      <span
        style={{ color: representPet.color }}
      >{`[${representPet.rarity}] ${representPet.name}`}</span>
      <span className="text-3xl mt-3">{representPet.appearance}</span>
      <div className="w-[80%] absolute bottom-6 space-y-2">
        <span>{`Lv. ${representPet.level}`}</span>
        <Progress
          value={representPet.gauge}
          max={100}
          className="h-2 rounded-full ring-1 ring-black"
        />
      </div>
    </div>
  );
}
