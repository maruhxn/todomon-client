"use client";

import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import AddTodoDialog from "./AddTodoDialog";

export default function AddTodoButton({ date }: { date: Date }) {
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);

  return (
    <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
      <DialogTrigger>
        <PlusCircleIcon className="rounded-full size-4 text-muted-foreground hover:text-black" />
      </DialogTrigger>
      <AddTodoDialog date={date} openControlFn={setAddDialogOpen} />
    </Dialog>
  );
}
