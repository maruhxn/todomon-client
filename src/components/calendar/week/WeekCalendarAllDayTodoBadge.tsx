"use client";

import { cn } from "@/lib/utils";
import { TodoItem } from "@/types/todo";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";
import { Badge } from "../../ui/badge";
import { Dialog } from "../../ui/dialog";
import TodoUpdateDialog from "../TodoUpdateDialog";

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
          className={cn(
            "w-full cursor-pointer hover:scale-y-105 border-zinc-300",
            allDayTodo.done && "opacity-30",
            allDayTodo.color === "#000000" ? "text-white" : "text-black"
          )}
          style={{
            backgroundColor: allDayTodo.color,
          }}
        >
          {allDayTodo.content}
        </Badge>
      </DialogTrigger>
      <TodoUpdateDialog todo={allDayTodo} openControlFn={setUpdateDialogOpen} />
    </Dialog>
  );
}
