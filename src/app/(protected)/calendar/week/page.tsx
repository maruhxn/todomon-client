import { getTodoByWeek } from "@/apis/repository/todo.repository";
import WeekCalendarTimeControlsSection from "@/components/calendar/week/WeekCalendarTimeControlSection";
import WeekCalendarWeekDayBox from "@/components/calendar/week/WeekCalendarWeekDayBox";
import { handleErrorForServerComponent } from "@/lib/error-handler";
import { getStartOfWeek } from "@/lib/utils";
import { TodoItem } from "@/types/todo";
import { format } from "date-fns";

interface WeekCalendarSearchParams {
  day?: string;
}

const allDayTodoMap = new Map<string, TodoItem[]>();
const nonAllDayTodoMap = new Map<string, TodoItem[]>();

function groupAllDayTodosByDate(todos: TodoItem[]) {
  todos.forEach((todo) => {
    const date = todo.startAt.split("T")[0]; // 날짜만 추출
    if (!allDayTodoMap.has(date)) {
      allDayTodoMap.set(date, []);
    }
    allDayTodoMap.get(date)?.push(todo);
  });
}

function groupNonAllDayTodosByDate(todos: TodoItem[]) {
  todos.forEach((todo) => {
    const date = todo.startAt.split("T")[0]; // 날짜만 추출
    if (!nonAllDayTodoMap.has(date)) {
      nonAllDayTodoMap.set(date, []);
    }
    nonAllDayTodoMap.get(date)?.push(todo);
  });
}

function getDatesForNextSevenDays(startOfWeek: Date) {
  const dates = [];
  // 기준 날짜로부터 7일간의 날짜를 계산합니다.
  for (let i = 0; i < 7; i++) {
    // 기준 날짜에 i일을 더하여 새로운 날짜를 생성합니다.
    const newDate = new Date(startOfWeek);
    newDate.setDate(startOfWeek.getDate() + i);
    // 배열에 추가합니다.
    dates.push(newDate);
  }
  return dates;
}

export default async function WeekCalendarPage({
  searchParams,
}: {
  searchParams: WeekCalendarSearchParams;
}) {
  allDayTodoMap.clear();
  nonAllDayTodoMap.clear();

  const date = searchParams.day ? new Date(searchParams.day) : new Date();
  const startOfWeek = getStartOfWeek(date);
  const sevenDays = getDatesForNextSevenDays(startOfWeek);
  let todos = await getTodoByWeek(format(startOfWeek, "yyyy-MM-dd"));
  if ("error" in todos) {
    return handleErrorForServerComponent(todos);
  }

  const allDayTodos = todos
    ?.filter((todo) => todo.allDay)
    .sort(
      (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
    );
  const nonAllDayTodos = todos
    ?.filter((todo) => !todo.allDay)
    .sort(
      (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
    );

  if (allDayTodos) groupAllDayTodosByDate(allDayTodos);
  if (nonAllDayTodos) groupNonAllDayTodosByDate(nonAllDayTodos);

  return (
    <div className="flex-1 w-full bg-background p-6 space-y-8">
      <WeekCalendarTimeControlsSection
        startOfWeek={startOfWeek}
        sevenDays={sevenDays}
      />
      <div className="flex flex-1">
        <div className="flex-1 p-4">
          <div className="grid grid-cols-7 gap-4">
            {sevenDays.map((day, index) => (
              <WeekCalendarWeekDayBox
                key={index}
                day={day}
                allDayTodoMap={allDayTodoMap}
                nonAllDayTodoMap={nonAllDayTodoMap}
              />
            ))}
          </div>
        </div>

        {/* <div className="border-l bg-muted/20 p-4">
          <div className="mb-4 text-lg font-medium">Today Schedule</div>
          <div className="space-y-4">
            <div className="rounded-md bg-accent p-4 text-accent-foreground">
              <div className="text-sm font-medium">Team Meeting</div>
              <div className="text-sm">9:00 AM - 10:00 AM</div>
            </div>
            <div className="rounded-md bg-primary p-4 text-primary-foreground">
              <div className="text-sm font-medium">Design Review</div>
              <div className="text-sm">2:00 PM - 3:00 PM</div>
            </div>
            <div className="rounded-md bg-secondary p-4 text-secondary-foreground">
              <div className="text-sm font-medium">Standup</div>
              <div className="text-sm">4:30 PM - 5:30 PM</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
