import { areDatesEqual, cn } from "@/lib/utils";

import { WeekDay } from "@/types/time";
import { TodoItem } from "@/types/todo";
import { format } from "date-fns";
import AddTodoButton from "../AddTodoBtn";
import MonthCalendarTodoBadge from "./MonthCalendarTodoBadge";

interface MonthCalendarDayBoxProps {
  day: WeekDay;
  todos?: TodoItem[];
}

export default function MonthCalendarDayBox({
  day,
  todos,
}: MonthCalendarDayBoxProps) {
  return (
    <div className="bg-background relative text-sm font-medium w-full h-32 cursor-pointer group overflow-y-scroll scrollbar-hide">
      {/* 날짜 표시 */}
      <span
        className={cn(
          "absolute top-2 left-2",
          day.isCurrentMonth
            ? "text-secondary-foreground font-semibold"
            : "text-muted-foreground",
          areDatesEqual(day.date, new Date()) &&
            "bg-primary text-primary-foreground rounded-full size-6 flex flex-col items-center justify-center"
        )}
      >
        <span>{format(day.date, "d")}</span>
      </span>

      <div className="absolute top-2 right-2 hidden group-hover:block">
        <AddTodoButton date={day.date} />
      </div>

      <div className="pt-10 flex flex-col gap-1">
        {todos?.map((todo) => (
          <MonthCalendarTodoBadge key={todo.todoId} todo={todo} />
        ))}
      </div>
    </div>
  );
}
