"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../../ui/button";
import AddTodoDialog from "../AddTodoDialog";

interface DayCalendarAddDialogBtnProps {
  date: Date;
}

export default function DayCalendarAddDialogBtn({
  date,
}: DayCalendarAddDialogBtnProps) {
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);

  return (
    <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
      <DialogTrigger asChild>
        <Button>일정 생성</Button>
      </DialogTrigger>
      <AddTodoDialog date={date} openControlFn={setAddDialogOpen} />
    </Dialog>
  );
}
