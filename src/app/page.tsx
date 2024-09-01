import FAQSection from "@/components/main/FAQSection";
import GoalSteps from "@/components/main/GoalSteps";

export default function Home() {
  return (
    <div className="font-body">
      <main className="mx-auto text-center flex-grow flex flex-col items-center justify-center px-4 md:px-20 py-12 md:py-24 space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 font-heading flex flex-col -space-y-12">
          <span>매일의 작은 목표로,</span>
          <br />
          <span className="text-green-500">당신과 펫이 함께 성장합니다.</span>
        </h1>
        <p className="text-xl font-body">
          목표 달성의 재미와 친구들과의 경쟁, 그리고 펫을 돌보는 즐거움을 한
          번에!
        </p>
      </main>

      <section className="py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-4xl font-bold">
            지속 가능한 습관을 만드는 것은 쉽지 않습니다
          </h2>
          <h3 className="text-2xl">
            새해 결심의 80%가 2개월 만에 실패합니다...
          </h3>
        </div>
        <GoalSteps />
      </section>

      <section className="py-12 px-4 md:px-6">
        <div className="mx-auto flex space-x-10 max-w-5xl">
          <div className="aspect-square rounded-lg bg-gray-600 w-full" />
          <div className="space-y-4">
            <h3 className="text-3xl font-bold">미루는 버릇을 극복하세요</h3>
            <h4 className="text-xl">
              원하는 습관은 완수하고 싶은 퀘스트가 될 것입니다. 귀여운 펫들을
              키우고 친구들과의 경쟁에서 승리하려면 꾸준히 노력해야 합니다.
              재미있게 놀 때는 동기 부여가 필요 없습니다!
            </h4>
          </div>
        </div>
      </section>

      <FAQSection />
    </div>
  );
}
