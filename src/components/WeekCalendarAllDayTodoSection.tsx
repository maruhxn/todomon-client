"use client";

import { getRandomColor } from "@/lib/utils";
import { TodoItem } from "@/types/todo";
import { useState } from "react";
import TodoUpdateDialog from "./TodoUpdateDialog";
import { Dialog, DialogTrigger } from "./ui/dialog";

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
          className="w-full text-white pl-10 py-1 rounded-md cursor-pointer hover:scale-y-105"
          style={{ backgroundColor: getRandomColor() }}
        >
          {allDayTodo.content}
        </div>
      </DialogTrigger>
      <TodoUpdateDialog todo={allDayTodo} openControlFn={setUpdateDialogOpen} />
    </Dialog>
  );
}
