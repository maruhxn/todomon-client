"use client";

import { getRandomColor } from "@/lib/utils";

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
          style={{
            backgroundColor: todo.done ? "rgba(0,0,0,0.1)" : getRandomColor(),
          }}
          className="z-10 w-full"
        >
          {todo.content}
        </Badge>
      </DialogTrigger>
      <TodoUpdateDialog todo={todo} openControlFn={setUpdateDialogOpen} />
    </Dialog>
  );
}
