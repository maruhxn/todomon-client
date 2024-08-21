import { getAuthRequest } from "@/apis/repository/auth.repository";
import {
  createPetRequest,
  getAllPetsRequest,
  getMyPetRequest,
  getPetCollectionRequest,
} from "@/apis/repository/pet.repository";
import DexPetCard from "@/components/pet/DexPetCard";
import MyPetCard from "@/components/pet/MyPetCard";
import RepresentPetState from "@/components/pet/RepresentPetState";
import { Separator } from "@/components/ui/separator";
import { PetDexItem } from "@/types/pet";
import { CarrotIcon, PlusSquareIcon, StarIcon } from "lucide-react";
import { notFound } from "next/navigation";

export default async function PetPage({
  params,
}: {
  params: { memberId: string };
}) {
  let isMyProfile = false;
  let memberId;

  const loginUserInfo = await getAuthRequest();
  if (params.memberId === "my" && loginUserInfo) {
    isMyProfile = true;
    memberId = loginUserInfo?.id;
  } else {
    memberId = Number(params.memberId);
  }

  if (isNaN(memberId)) {
    return notFound();
  }

  const allPets = await getAllPetsRequest();
  if (!allPets) return notFound();

  const myCollections = await getPetCollectionRequest();
  if (!myCollections) return notFound();

  const myPetInfo = await getMyPetRequest();
  if (!myPetInfo) return notFound();

  const remainingCapacity = myPetInfo.petHouseSize - myPetInfo.myPets.length;

  const representPet = myPetInfo.myPets.find(
    (myPet) => myPet.id === myPetInfo.representPetId
  );

  function isCollected(item: PetDexItem) {
    return myCollections!.some(
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
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Pets</h1>
          <div className="flex justify-end items-center space-x-2">
            <StarIcon className="size-4 fill-yellow-400 stroke-yellow-400" />
            <span className="font-bold">{myPetInfo.starPoint}</span>
            <CarrotIcon className="size-4 fill-orange-400 stroke-orange-400" />
            <span className="font-bold">{myPetInfo.foodCnt}</span>
          </div>
        </div>
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
              <span className="font-bold">{`나의 펫: ${myPetInfo?.myPets.length} / ${myPetInfo.petHouseSize}`}</span>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              {myPetInfo &&
                myPetInfo.myPets.length > 0 &&
                myPetInfo.myPets.map((myPet) => (
                  <MyPetCard
                    key={myPet.id}
                    myPet={myPet}
                    isRepresentPet={myPet.id === myPetInfo.representPetId}
                  />
                ))}
              {Array.from(
                { length: remainingCapacity },
                (_, index) => index
              ).map((index) => (
                <form
                  action={createPetRequest}
                  key={index}
                  className="w-[10%] aspect-square flex justify-center items-center rounded-lg"
                >
                  <button>
                    <PlusSquareIcon className="w-full stroke-2 stroke-zinc-500 hover:stroke-zinc-700 cursor-pointer" />
                  </button>
                </form>
              ))}
            </div>
          </div>
          {/* DEX */}
          <Separator />
          <div className="flex flex-col space-y-4">
            <div>
              <span className="font-bold">{`펫 도감: ${myCollections?.length} / ${allPets?.length}`}</span>
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
