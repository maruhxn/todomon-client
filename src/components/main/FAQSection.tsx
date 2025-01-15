import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const faqData = [
  {
    question: "TODOMON이 뭔가요?",
    answer:
      "Todomon은 단순한 일정 관리 도구를 넘어, 현실과 게임의 경계를 허무는 혁신적인 라이프 스타일 게임입니다. 이 서비스는 일정 관리와 펫 육성 시스템을 결합하여 당신의 삶을 게임처럼 즐겁고 성취감 넘치게 만들어줍니다.",
  },
  {
    question: "유료 플랜을 결제하면 어떤 혜택이 있나요?",
    answer:
      "칭호권 구매 가능, 펫 이름 변경권 구매 가능, 광고 제거 등의 혜택이 있습니다. 또한 유료 플랜을 구매하면 Todomon 서비스를 운영하는 데 도움이 됩니다.",
  },
  {
    question: "iOS/Android 모바일 앱이 있나요?",
    answer:
      "아쉽지만 현재는 웹 버전만 지원하고 있습니다. 하지만 모바일 브라우저에서도 모든 기능을 사용할 수 있습니다.",
  },
  {
    question: "제가 원하는 기능이 추가되었으면 좋겠어요...",
    answer:
      "저희는 항상 Todomon을 개선하기 위해 노력하고 있습니다. 새로운 기능 요청이 있다면 인스타그램을 통해 문의해 주세요. 사용자의 의견은 더 나은 서비스 제공하는 데 매우 중요합니다!",
  },
];

export default function FAQSection() {
  return (
    <div className="w-full p-6 md:p-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        자주 하는 질문들
      </h2>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {faqData.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-lg font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <p className="text-center mt-8 text-sm">
        외에 다른 질문이 있으시다면?{" "}
        <Link
          className="underline text-green-500"
          href="https://www.instagram.com/maruhxn"
          target="_blank"
        >
          인스타그램
        </Link>
        을 통해 문의 부탁드립니다.
      </p>
    </div>
  );
}
