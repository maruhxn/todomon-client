"use client";

import { cn } from "@/lib/utils";
import { TodoItem } from "@/types/todo";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import { Dialog } from "../../ui/dialog";
import TodoUpdateDialog from "../TodoUpdateDialog";

interface WeekCalendarNonAllDayTodoBoxProps {
  todo: TodoItem;
}

function formatTimeRange(startAt: string, endAt: string): string {
  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${hours}:${formattedMinutes} ${period}`;
  };

  const formattedStart = formatTime(startAt);
  const formattedEnd = formatTime(endAt);

  return `${formattedStart} ~ ${formattedEnd}`;
}

export default function WeekCalendarNonAllDayTodoBox({
  todo,
}: WeekCalendarNonAllDayTodoBoxProps) {
  const [updateDialogOpen, setUpdateDialogOpen] = useState<boolean>(false);

  return (
    <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(
            "flex flex-col rounded-md bg-accent p-2 text-sm text-accent-foreground space-y-1 text-white cursor-pointer hover:scale-y-105",
            todo.done && "opacity-30"
          )}
          style={{
            backgroundColor: todo.color,
          }}
        >
          <span>{formatTimeRange(todo.startAt, todo.endAt)}</span>
          <span className="font-bold">{todo.content}</span>
        </div>
      </DialogTrigger>
      <TodoUpdateDialog todo={todo} openControlFn={setUpdateDialogOpen} />
    </Dialog>
  );
}
