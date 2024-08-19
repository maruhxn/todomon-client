"use client";

import { cn } from "@/lib/utils";
import { TodoItem } from "@/types/todo";
import { useState } from "react";
import { Dialog, DialogTrigger } from "../../ui/dialog";
import TodoUpdateDialog from "../TodoUpdateDialog";

interface WeekCalendarAllDayTodoBoxProps {
  allDayTodo: TodoItem;
}

export default function WeekCalendarAllDayTodoBox({
  allDayTodo,
}: WeekCalendarAllDayTodoBoxProps) {
  const [updateDialogOpen, setUpdateDialogOpen] = useState<boolean>(false);

  return (
    <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
      <DialogTrigger asChild>
        <div
          key={allDayTodo.todoId}
          className={cn(
            "w-full text-white pl-10 py-1 rounded-md cursor-pointer hover:scale-y-105",
            allDayTodo.done && "opacity-30"
          )}
          style={{ backgroundColor: allDayTodo.color }}
        >
          {allDayTodo.content}
        </div>
      </DialogTrigger>
      <TodoUpdateDialog todo={allDayTodo} openControlFn={setUpdateDialogOpen} />
    </Dialog>
  );
}
