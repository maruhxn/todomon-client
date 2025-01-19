"use client";

import { setRepresentPetRequest } from "@/apis/repository/pet.repository";
import { useToast } from "@/hooks/use-toast";
import { BadgeCheckIcon, BadgeMinusIcon } from "lucide-react";

export default function SetRepresentPetBtn({
  isRepresentPet,
  petId,
}: {
  isRepresentPet: boolean;
  petId: number;
}) {
  const { toast } = useToast();

  async function setRepresentPet() {
    const err = await setRepresentPetRequest(isRepresentPet ? null : petId);
    if (err?.error) {
      return toast({
        title: "실패",
        description: err.error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex justify-end">
      <button onClick={setRepresentPet}>
        {isRepresentPet ? (
          <BadgeMinusIcon className="size-5 cursor-pointer stroke-red-500 hover:stroke-white hover:fill-red-500 " />
        ) : (
          <BadgeCheckIcon className="size-5 cursor-pointer stroke-zinc-500 hover:stroke-zinc-700" />
        )}
      </button>
    </div>
  );
}
