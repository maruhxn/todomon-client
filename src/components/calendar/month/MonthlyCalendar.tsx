import { getWeeksByMonth, isDateMatching } from "@/lib/utils";
import { TodoItem } from "@/types/todo";
import MonthCalendarDayBox from "./MonthCalendarDayBox";

const dayHeaders: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default async function MonthlyCalendar({
  date,
  todos,
}: {
  date: Date;
  todos: TodoItem[] | null;
}) {
  const weeks = getWeeksByMonth(date);

  return (
    <div className="grid grid-cols-7 gap-1 bg-zinc-100">
      {dayHeaders.map((day) => (
        <div
          key={day}
          className="bg-background flex flex-col items-center justify-center text-sm font-bold text-muted-foreground"
        >
          {day}
        </div>
      ))}
      {weeks.map((week, weekIndex) =>
        week.map((day, dayIndex) => {
          const matchingTodos = todos?.filter((todo) =>
            isDateMatching(day.date, todo.startAt)
          );
          return (
            <MonthCalendarDayBox
              key={`${weekIndex}-${dayIndex}`}
              day={day}
              todos={matchingTodos}
            />
          );
        })
      )}
    </div>
  );
}
