import { getTodoByDay } from "@/apis/repository/todo.repository";
import DayCalendarAddDialogBtn from "@/components/DayCalendarAddDialogBtn";
import DayCalendarAllDayTodoBox from "@/components/DayCalendarAllDayTodoSection";
import DayCalendarTimeControlSection from "@/components/DayCalendarTimeControlSection";
import DayCalendarTodoBox from "@/components/DayCalendarTodoBox";
import { times } from "@/lib/constants";
import { TodoItem } from "@/types/todo";
import { format } from "date-fns";

interface DayCalendarSearchParams {
  day?: string;
}

const HOURS_PER_DAY = 24;
const MINUTES_PER_HOUR = 60;
const TOTAL_MINUTES = HOURS_PER_DAY * MINUTES_PER_HOUR;
const TODO_WIDTH = 100;

function calculatePositionAndHeight(startAt: string, endAt: string) {
  const start = new Date(startAt);
  const end = new Date(endAt);

  const startMinutes = start.getHours() * MINUTES_PER_HOUR + start.getMinutes();
  const endMinutes = end.getHours() * MINUTES_PER_HOUR + end.getMinutes();

  const top = (startMinutes / TOTAL_MINUTES) * 100;
  const height = ((endMinutes - startMinutes) / TOTAL_MINUTES) * 100;

  return { top, height };
}

// 겹치는 todo들을 그룹화
function groupOverlappingTodos(todos: any[]) {
  const groups: TodoItem[][] = [];

  todos.forEach((todo) => {
    let added = false;

    for (const group of groups) {
      const lastInGroup = group[group.length - 1];
      const lastEndAt = new Date(lastInGroup.endAt);
      const todoStartAt = new Date(todo.startAt);

      if (todoStartAt < lastEndAt) {
        group.push(todo);
        added = true;
        break;
      }
    }

    if (!added) {
      groups.push([todo]);
    }
  });

  return groups;
}

export default async function DayCalendarPage({
  searchParams,
}: {
  searchParams: DayCalendarSearchParams;
}) {
  const date = searchParams.day ? new Date(searchParams.day) : new Date();
  const todos = await getTodoByDay(format(date, "yyyy-MM-dd"));

  const allDayTodos = todos?.filter((todo) => todo.allDay);
  const regularTodos = todos?.filter((todo) => !todo.allDay);

  const groupedTodos = regularTodos && groupOverlappingTodos(regularTodos);
  const allDayTodosCnt =
    groupedTodos && groupedTodos[0]?.length > 0 && groupedTodos[0][0].allDay
      ? groupedTodos[0].length
      : 0;

  return (
    <main className="flex-1 w-full bg-background p-6 space-y-8">
      <DayCalendarTimeControlSection date={date} />
      <div className="flex justify-end">
        <DayCalendarAddDialogBtn date={date} />
      </div>
      <div className="grid grid-cols-1 gap-1">
        {allDayTodos?.map((allDayTodo) => (
          <DayCalendarAllDayTodoBox
            key={allDayTodo.todoId}
            allDayTodo={allDayTodo}
          />
        ))}
      </div>
      <div className="relative grid gap-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="grid relative">
            {times.map((time, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-b py-4"
              >
                <div className="text-muted-foreground w-20 text-right">
                  {time}
                </div>
              </div>
            ))}

            {groupedTodos?.map((group) => {
              return group.map((todo, todoIndex) => {
                const { top, height } = calculatePositionAndHeight(
                  todo.startAt,
                  todo.endAt
                );
                const left = todo.allDay
                  ? TODO_WIDTH * todoIndex
                  : 10 + TODO_WIDTH * (allDayTodosCnt + todoIndex); // 일정의 left 위치 계산

                return (
                  <DayCalendarTodoBox
                    key={todo.todoId}
                    todo={todo}
                    position={{ top, height, width: TODO_WIDTH, left }}
                  />
                );
              });
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
