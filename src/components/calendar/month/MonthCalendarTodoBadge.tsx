"use client";

import { cn } from "@/lib/utils";
import { TodoItem } from "@/types/todo";
import { useState } from "react";
import { Badge } from "../../ui/badge";
import { Dialog, DialogTrigger } from "../../ui/dialog";
import TodoUpdateDialog from "../TodoUpdateDialog";

interface MonthCalendarTodoBadgeProps {
  todo: TodoItem;
}

export default function MonthCalendarTodoBadge({
  todo,
}: MonthCalendarTodoBadgeProps) {
  const [updateDialogOpen, setUpdateDialogOpen] = useState<boolean>(false);

  return (
    <Dialog
      key={todo.todoId}
      open={updateDialogOpen}
      onOpenChange={setUpdateDialogOpen}
    >
      <DialogTrigger>
        <Badge
          className={cn(
            "z-10 w-full border-zinc-300",
            todo.done && "opacity-30",
            todo.color === "#000000" ? "text-white" : "text-black"
          )}
          style={{
            backgroundColor: todo.color,
          }}
        >
          {todo.content}
        </Badge>
      </DialogTrigger>
      <TodoUpdateDialog todo={todo} openControlFn={setUpdateDialogOpen} />
    </Dialog>
  );
}
