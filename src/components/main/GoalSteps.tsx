import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightIcon } from "lucide-react";

export default function GoalSteps() {
  return (
    <div className="w-full bg-white p-6 md:p-20">
      <div className="flex items-center space-x-4 mx-auto">
        <Card className="bg-green-500 flex-1">
          <CardHeader>
            <div className="text-6xl mb-4">🎯</div>
            <CardTitle className="text-xl font-bold text-white">
              목표 설정
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            <p>&quot;올해는 꼭 살 빼야지!&quot;</p>
            <p>&quot;올해는 매달 1권씩 읽을거야!&quot;</p>
          </CardContent>
        </Card>

        <ArrowRightIcon className="size-6 text-green-500 stroke-2" />

        <Card className="bg-green-500 flex-1">
          <CardHeader>
            <div className="text-6xl mb-4">🏃‍➡️</div>
            <CardTitle className="text-xl font-bold text-white">
              최선을 다하는 중..!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            <p>&quot;자기 개발서도 읽고..&quot;</p>
            <p>&quot;동기 부여 영상도 보고..&quot;</p>
          </CardContent>
        </Card>

        <ArrowRightIcon className="size-6 text-green-500 stroke-2" />

        <Card className="bg-green-500 flex-1">
          <CardHeader>
            <div className="text-6xl mb-4">🤦‍♂️</div>
            <CardTitle className="text-xl font-bold text-white">
              하지만 사람은 쉽게 바뀌지 않는다..
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white">
            <p>&quot;누가 동기부여 좀 해줘 ㅠㅠ&quot;</p>
            <p>&quot;아 맞다.. 까먹었다..&quot;</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
