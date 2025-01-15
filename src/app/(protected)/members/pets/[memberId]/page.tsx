import {
  getAllPetsRequest,
  getPetCollectionRequest,
  getPetInfoRequest,
} from "@/apis/repository/pet.repository";
import DexPetCard from "@/components/pet/DexPetCard";
import PetItemCard from "@/components/pet/MyPetCard";
import RepresentPetState from "@/components/pet/RepresentPetState";
import { Separator } from "@/components/ui/separator";
import { PetDexItem } from "@/types/pet";
import { CirclePlusIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PetPage({
  params,
}: {
  params: { memberId: string };
}) {
  let isMyProfile = false;
  let memberId;

  const loginMemberId = cookies().get("memberId")?.value ?? null;

  if (
    loginMemberId &&
    (params.memberId === "my" || params.memberId === loginMemberId)
  ) {
    isMyProfile = true;
    memberId = +loginMemberId;
  } else {
    memberId = Number(params.memberId);
  }

  if (isNaN(memberId)) {
    return notFound();
  }

  const allPets = await getAllPetsRequest();
  if (!allPets) return notFound();

  const petCollections = await getPetCollectionRequest(memberId);
  if (!petCollections) return notFound();

  const petInfo = await getPetInfoRequest(memberId);
  if (!petInfo) return notFound();

  const remainingCapacity = petInfo.petHouseSize - petInfo.myPets.length;

  const representPet = petInfo.myPets.find(
    (myPet) => myPet.id === petInfo.representPetId
  );

  function isCollected(item: PetDexItem) {
    return petCollections!.some(
      (myCollectedPet) =>
        myCollectedPet.name === item.name &&
        myCollectedPet.rarity === item.rarity &&
        myCollectedPet.appearance === item.appearance &&
        myCollectedPet.color === item.color
    );
  }

  return (
    <div className="w-full min-h-screen py-8 flex flex-col items-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <h1 className="text-2xl font-bold">My Pets</h1>

        {/* REPRESENT PET */}
        <div className="space-y-4 bg-transparent">
          <span className="font-bold">대표 펫 설정</span>
          <div className="w-[80%] bg-zinc-300 mx-auto aspect-square rounded-lg ring-2 ring-blue-300  flex justify-center items-center relative">
            {representPet ? (
              <RepresentPetState representPet={representPet} />
            ) : (
              <span className="whitespace-pre-wrap text-center">
                {"대표 펫이 없습니다.\n대표 펫을 설정해주세요."}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* MY PET */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">{`나의 펫: ${petInfo?.myPets.length} / ${petInfo.petHouseSize}`}</span>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              {petInfo &&
                petInfo.myPets.length > 0 &&
                petInfo.myPets.map((myPetItem) => (
                  <PetItemCard
                    key={myPetItem.id}
                    petItem={myPetItem}
                    isRepresentPet={myPetItem.id === petInfo.representPetId}
                  />
                ))}
              {Array.from(
                { length: remainingCapacity },
                (_, index) => index
              ).map((index) => (
                <div
                  key={index}
                  className="bg-zinc-100 w-[10%] aspect-square flex justify-center items-center rounded-lg"
                >
                  <Link href="/shop">
                    <CirclePlusIcon className="w-full stroke-2 stroke-zinc-500 hover:stroke-zinc-700" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {/* DEX */}
          <Separator />
          <div className="flex flex-col space-y-4">
            <div>
              <span className="font-bold">{`펫 도감: ${petCollections?.length} / ${allPets?.length}`}</span>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              {allPets?.map((pet, index) => (
                <DexPetCard
                  key={index}
                  pet={pet}
                  isCollected={isCollected(pet)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
