"use client";

import { cn } from "@/lib/utils";
import { TodoItem } from "@/types/todo";
import { useState } from "react";
import { Dialog, DialogTrigger } from "../../ui/dialog";
import TodoUpdateDialog from "../TodoUpdateDialog";

interface DayCalendarAllDayTodoBoxProps {
  allDayTodo: TodoItem;
}

export default function DayCalendarAllDayTodoBox({
  allDayTodo,
}: DayCalendarAllDayTodoBoxProps) {
  const [updateDialogOpen, setUpdateDialogOpen] = useState<boolean>(false);
  return (
    <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
      <DialogTrigger asChild>
        <div
          key={allDayTodo.todoId}
          className={cn(
            "w-full pl-10 py-1 rounded-md cursor-pointer hover:scale-y-105 border-zinc-300",
            allDayTodo.done && "opacity-30",
            allDayTodo.color === "#000000" ? "text-white" : "text-black"
          )}
          style={{
            backgroundColor: allDayTodo.color,
          }}
        >
          {allDayTodo.content}
        </div>
      </DialogTrigger>
      <TodoUpdateDialog todo={allDayTodo} openControlFn={setUpdateDialogOpen} />
    </Dialog>
  );
}
