import { getSession } from "@/apis/repository/global-action";
import FAQSection from "@/components/main/FAQSection";
import GoalSteps from "@/components/main/GoalSteps";
import MainParagraph from "@/components/main/MainParagraph";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();
  if (session) redirect("/calendar/month");

  return (
    <main className="font-body flex flex-col gap-8">
      <MainParagraph />
      <section className="max-w-5xl mx-auto">
        <div className=" mx-auto text-center space-y-4">
          <h2 className="text-4xl font-bold">
            지속 가능한 습관을 만드는 것은 쉽지 않습니다
          </h2>
          <h3 className="text-2xl">
            새해 결심의 80%가 2개월 만에 실패합니다...
          </h3>
        </div>
        <GoalSteps />
      </section>
      <section className="max-w-5xl mx-auto">
        <div className=" mx-auto text-center space-y-4">
          <h2 className="text-4xl font-bold">미루는 버릇을 극복하세요</h2>
          <h4 className="text-xl whitespace-pre leading-8">
            {
              "원하는 습관은 완수하고 싶은 퀘스트가 될 것입니다.\n귀여운 펫들을 키우고 친구들과의 경쟁에서 승리하려면 꾸준히 노력해야 합니다.\n재미있게 놀 때는 동기 부여가 필요 없습니다!"
            }
          </h4>
        </div>
      </section>
      <FAQSection />
    </main>
  );
}
