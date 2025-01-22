"use client";

import { cn } from "@/lib/utils";
import { TodoItem } from "@/types/todo";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import { Dialog } from "../../ui/dialog";
import TodoUpdateDialog from "../TodoUpdateDialog";

interface DayCalendarTodoBoxProps {
  todo: TodoItem;
  position: {
    top: number;
    height: number;
    width: number;
    left: number;
  };
}

export default function DayCalendarTodoBox({
  todo,
  position,
}: DayCalendarTodoBoxProps) {
  const [updateDialogOpen, setUpdateDialogOpen] = useState<boolean>(false);

  return (
    <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
      <DialogTrigger asChild>
        <div
          key={todo.todoId}
          className={cn(
            "absolute bg-primary rounded-md p-2 flex justify-center items-center cursor-pointer hover:scale-y-105 border-zinc-300",
            todo.done && "opacity-30",
            todo.color === "#000000" ? "text-white" : "text-black"
          )}
          style={{
            top: `${position.top}%`,
            height: todo.allDay ? "100%" : `${position.height}%`,
            width: `${position.width}px`, // 고정된 너비
            left: `${150 + position.left}px`, // 계산된 left 값
            backgroundColor: todo.color,
          }}
        >
          <span>{todo.content}</span>
        </div>
      </DialogTrigger>
      <TodoUpdateDialog todo={todo} openControlFn={setUpdateDialogOpen} />
    </Dialog>
  );
}
