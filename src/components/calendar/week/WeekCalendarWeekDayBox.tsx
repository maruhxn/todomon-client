import { getISOString } from "@/lib/utils";
import { TodoItem } from "@/types/todo";
import AddTodoButton from "../AddTodoBtn";
import WeekCalendarAllDayTodoBadge from "./WeekCalendarAllDayTodoBadge";
import WeekCalendarNonAllDayTodoBox from "./WeekCalendarNonAllDayTodoBox";

function formatDateToDayAndDate(date: Date): string {
  const daysOfWeek: string[] = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const dayOfWeek: string = daysOfWeek[date.getDay()]; // 일요일(0)부터 시작
  const dayOfMonth: number = date.getDate();

  return `${dayOfWeek}, ${dayOfMonth}일`;
}

interface WeekCalendarWeekDayBoxProps {
  day: Date;
  allDayTodoMap: Map<string, TodoItem[]>;
  nonAllDayTodoMap: Map<string, TodoItem[]>;
}

export default function WeekCalendarWeekDayBox({
  day,
  allDayTodoMap,
  nonAllDayTodoMap,
}: WeekCalendarWeekDayBoxProps) {
  return (
    <div className="rounded-md bg-muted/20 p-4 h-full group">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-center">
          {formatDateToDayAndDate(day)}
        </span>
        <div className="invisible group-hover:visible">
          <AddTodoButton date={day} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex flex-col space-y-[2px]">
          {allDayTodoMap.get(getISOString(day).split("T")[0])?.map((todo) => (
            <WeekCalendarAllDayTodoBadge key={todo.todoId} allDayTodo={todo} />
          ))}
        </div>

        <div className="space-y-2">
          {nonAllDayTodoMap
            .get(getISOString(day).split("T")[0])
            ?.map((todo) => (
              <WeekCalendarNonAllDayTodoBox key={todo.todoId} todo={todo} />
            ))}
        </div>
      </div>
    </div>
  );
}
