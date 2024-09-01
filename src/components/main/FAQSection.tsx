import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "TODOMON이 뭔가요?",
    answer:
      "Todomon is a game to help you improve real-life habits. It gamifies your life by giving you virtual pets as rewards for your real-life tasks. The more you stay accountable, the more your Todomon grows and evolves!",
  },
  {
    question: "유료 플랜을 결제하면 어떤 혜택이 있나요?",
    answer:
      "After your free trial ends, you'll have the option to subscribe to continue using all features of Todomon. We offer flexible plans to suit your needs.",
  },
  {
    question: "iOS/Android 모바일 앱이 있나요?",
    answer:
      "Yes! Todomon is available on both iOS and Android platforms. You can download it from the App Store or Google Play Store.",
  },
  {
    question: "제가 원하는 기능이 추가되었으면 좋겠어요...",
    answer:
      "We're always looking to improve Todomon. If you have a feature request, please use the feedback option in the app or contact our support team. We value user input in shaping the future of Todomon!",
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
        외에 다른 질문이 있으시다면? 인스타그램을 통해 문의 부탁드립니다.
      </p>
    </div>
  );
}
