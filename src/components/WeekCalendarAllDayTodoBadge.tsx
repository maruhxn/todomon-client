"use client";

import { getRandomColor } from "@/lib/utils";
import { TodoItem } from "@/types/todo";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import TodoUpdateDialog from "./TodoUpdateDialog";
import { Badge } from "./ui/badge";
import { Dialog } from "./ui/dialog";

interface WeekCalendarAllDayTodoBadgeProps {
  allDayTodo: TodoItem;
}

export default function WeekCalendarAllDayTodoBadge({
  allDayTodo,
}: WeekCalendarAllDayTodoBadgeProps) {
  const [updateDialogOpen, setUpdateDialogOpen] = useState<boolean>(false);

  return (
    <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
      <DialogTrigger asChild>
        <Badge
          className="w-full cursor-pointer hover:scale-y-105"
          style={{
            backgroundColor: allDayTodo.done
              ? "rgba(0,0,0,0.1)"
              : getRandomColor(),
          }}
        >
          {allDayTodo.content}
        </Badge>
      </DialogTrigger>
      <TodoUpdateDialog todo={allDayTodo} openControlFn={setUpdateDialogOpen} />
    </Dialog>
  );
}
