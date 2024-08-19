import { addDays, format, subDays } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";

interface WeekCalendarTimControlSectionProps {
  startOfWeek: Date;
  sevenDays: Date[];
}

function getMonthAndWeekOfYear(dates: Date[]) {
  const firstDate = new Date(Math.min(...dates.map((date) => date.getTime())));

  const month = firstDate.getMonth() + 1; // 월은 0부터 시작하므로 +1
  const year = firstDate.getFullYear();

  // 첫날이 포함된 주의 첫 날
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();

  // 해당 주의 첫날과 마지막 날의 주 번호를 계산
  const weekNumber =
    Math.floor((firstDate.getDate() + firstDayOfWeek - 1) / 7) + 1;

  return `${month}월, ${weekNumber}째 주`;
}

export default function WeekCalendarTimeControlsSection({
  startOfWeek,
  sevenDays,
}: WeekCalendarTimControlSectionProps) {
  return (
    <div className="flex justify-between items-center">
      <Link
        href={`/calendar/week?day=${format(
          subDays(startOfWeek, 7),
          "yyyy-MM-dd"
        )}`}
      >
        <Button variant="ghost" size="icon">
          <ChevronLeftIcon className="w-5 h-5" />
        </Button>
      </Link>
      <h2 className="text-secondary-foreground font-semibold text-xl">
        {getMonthAndWeekOfYear(sevenDays)}
      </h2>
      <Link
        href={`/calendar/week?day=${format(
          addDays(startOfWeek, 7),
          "yyyy-MM-dd"
        )}`}
      >
        <Button variant="ghost" size="icon">
          <ChevronRightIcon className="w-5 h-5" />
        </Button>
      </Link>
    </div>
  );
}
