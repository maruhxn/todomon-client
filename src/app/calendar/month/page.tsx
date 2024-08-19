import MonthlyCalendar from "@/components/calendar/month/MonthlyCalendar";
import { Button } from "@/components/ui/button";
import { addMonths, format, startOfMonth, subMonths } from "date-fns";
import Link from "next/link";

import { getTodoByMonth } from "@/apis/repository/todo.repository";
import { formatKoreanDate, parseYearMonth } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface MonthCalendarSearchParams {
  yearMonth?: string;
}

export default async function MonthCalendarPage({
  searchParams,
}: {
  searchParams: MonthCalendarSearchParams;
}) {
  const date = searchParams.yearMonth
    ? startOfMonth(parseYearMonth(searchParams.yearMonth))
    : new Date();

  const data = await getTodoByMonth(
    searchParams.yearMonth || format(date, "yyyy-MM")
  );

  return (
    <main className="flex-1 bg-background">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              href={`/calendar/month?yearMonth=${format(
                subMonths(date, 1),
                "yyyy-MM"
              )}`}
            >
              <Button variant="ghost" size="icon">
                <ChevronLeftIcon className="w-5 h-5" />
              </Button>
            </Link>
            <h2 className="text-2xl font-bold">{formatKoreanDate(date)}</h2>
            <Link
              href={`/calendar/month?yearMonth=${format(
                addMonths(date, 1),
                "yyyy-MM"
              )}`}
            >
              <Button variant="ghost" size="icon">
                <ChevronRightIcon className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
        <MonthlyCalendar date={date} todos={data} />
      </div>
    </main>
  );
}
