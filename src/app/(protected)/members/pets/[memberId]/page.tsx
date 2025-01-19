import { getSession } from "@/apis/repository/global-action";
import {
  getAllPetsRequest,
  getOwnPetInfoRequest,
  getPetCollectionRequest,
} from "@/apis/repository/pet.repository";
import DexPetCard from "@/components/pet/DexPetCard";
import PetItemCard from "@/components/pet/MyPetCard";
import RepresentPetState from "@/components/pet/RepresentPetState";
import { Separator } from "@/components/ui/separator";
import { handleErrorForServerComponent } from "@/lib/error-handler";
import { getMemberId } from "@/lib/utils";
import { PetDexItem } from "@/types/pet";
import { CirclePlusIcon } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function PetPage({
  params,
}: {
  params: { memberId: string };
}) {
  const userInfo = await getSession();
  if (!userInfo) redirect("/");
  const memberId = getMemberId(params.memberId, userInfo.id);
  if (isNaN(memberId)) {
    return notFound();
  }

  const allPetsResult = await getAllPetsRequest();
  if ("error" in allPetsResult) {
    return handleErrorForServerComponent(allPetsResult);
  }

  const petCollectionsResult = await getPetCollectionRequest(memberId);
  if ("error" in petCollectionsResult) {
    return handleErrorForServerComponent(petCollectionsResult);
  }

  // 타입 좁히기: 별도의 변수에 재할당
  const petCollections = petCollectionsResult as PetDexItem[];

  function isCollected(item: PetDexItem) {
    return petCollections.some(
      (myCollectedPet) =>
        myCollectedPet.rarity === item.rarity &&
        myCollectedPet.appearance === item.appearance
    );
  }

  const ownPetInfoResult = await getOwnPetInfoRequest(memberId);
  if ("error" in ownPetInfoResult) {
    return handleErrorForServerComponent(ownPetInfoResult);
  }

  const remainingCapacity =
    ownPetInfoResult.petHouseSize - ownPetInfoResult.myPets.length;

  const representPet = ownPetInfoResult.myPets.find(
    (myPet) => myPet.id === ownPetInfoResult.representPetId
  );

  return (
    <div className="w-full min-h-screen py-8 flex flex-col items-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <h1 className="text-2xl font-bold">My Pets</h1>

        {/* REPRESENT PET */}
        <div className="space-y-4 bg-transparent">
          <span className="font-bold">대표 펫 설정</span>
          <div className="w-[80%] bg-zinc-300 mx-auto aspect-square rounded-lg ring-2 ring-zinc-300  flex justify-center items-center relative">
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
              <span className="font-bold">{`나의 펫: ${ownPetInfoResult.myPets.length} / ${ownPetInfoResult.petHouseSize}`}</span>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              {ownPetInfoResult.myPets.length > 0 &&
                ownPetInfoResult.myPets.map((myPetItem) => (
                  <PetItemCard
                    key={myPetItem.id}
                    petItem={myPetItem}
                    isRepresentPet={
                      myPetItem.id === ownPetInfoResult.representPetId
                    }
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
              <span className="font-bold">{`펫 도감: ${petCollectionsResult?.length} / ${allPetsResult?.length}`}</span>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              {allPetsResult.map((pet, index) => (
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
