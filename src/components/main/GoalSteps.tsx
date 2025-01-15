import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightIcon } from "lucide-react";

export default function GoalSteps() {
  return (
    <div className="w-full bg-white p-6 md:py-12">
      <div className="flex items-stretch gap-4 mx-auto h-full">
        <CardComponent
          emoji="🎯"
          title="목표 설정"
          contents={["올해는 꼭 살 빼야지!", "올해는 매달 1권씩 읽을거야!"]}
        />
        <ArrowRightIcon className="size-6 text-green-500 stroke-2 self-center" />
        <CardComponent
          emoji="🏃‍➡️"
          title="최선을 다하는 중..!"
          contents={["자기 개발서도 읽고..", "동기 부여 영상도 보고.."]}
        />
        <ArrowRightIcon className="size-6 text-green-500 stroke-2 self-center" />
        <CardComponent
          emoji="🤦‍♂️"
          title="하지만 사람은 쉽게 바뀌지 않는다.."
          contents={['"누가 동기부여 좀 해줘 ㅠㅠ"', '"아 맞다.. 까먹었다.."']}
        />
      </div>
    </div>
  );
}

function CardComponent({
  emoji,
  title,
  contents,
}: {
  emoji: string;
  title: string;
  contents: string[];
}) {
  return (
    <Card className="bg-green-500 flex-1">
      <CardHeader>
        <div className="text-6xl mb-4">{emoji}</div>
        <CardTitle className="text-xl font-bold text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-white">
        <p>{contents[0]}</p>
        <p>{contents[1]}</p>
      </CardContent>
    </Card>
  );
}
