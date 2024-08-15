import { areDatesEqual, cn } from "@/lib/utils";
import { addDays, format, subDays } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface DayCalendarTimControlSectionProps {
  date: Date;
}

export default function DayCalendarTimeControlSection({
  date,
}: DayCalendarTimControlSectionProps) {
  return (
    <div className="flex justify-between items-center">
      <Link
        href={`/calendar/day?day=${format(subDays(date, 1), "yyyy-MM-dd")}`}
      >
        <Button variant="ghost" size="icon">
          <ChevronLeftIcon className="w-5 h-5" />
        </Button>
      </Link>
      <h2
        className={cn(
          "text-secondary-foreground font-semibold text-lg rounded-full size-14 flex flex-col items-center justify-center ring-2 ring-black",
          areDatesEqual(date, new Date()) &&
            "bg-primary text-primary-foreground ring-2"
        )}
      >
        {`${date.getDate()}일`}
      </h2>
      <Link
        href={`/calendar/day?day=${format(addDays(date, 1), "yyyy-MM-dd")}`}
      >
        <Button variant="ghost" size="icon">
          <ChevronRightIcon className="w-5 h-5" />
        </Button>
      </Link>
    </div>
  );
}
