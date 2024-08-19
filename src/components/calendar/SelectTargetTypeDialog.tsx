"use client";

import { UpdateAndDeleteTodoTargetType } from "@/types/todo";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface SelectTargetTypeRadioGroupProps {
  targetType: UpdateAndDeleteTodoTargetType;
  setTargetType: (value: UpdateAndDeleteTodoTargetType) => void;
}

export default function SelectTargetTypeRadioGroup({
  targetType,
  setTargetType,
}: SelectTargetTypeRadioGroupProps) {
  return (
    <div className="flex flex-col space-y-4">
      <p className="text-muted-foreground text-sm">수정 혹은 삭제 범위</p>
      <RadioGroup
        value={targetType}
        onValueChange={(value: UpdateAndDeleteTodoTargetType) =>
          setTargetType(value)
        }
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="THIS_TASK" id="THIS_TASK" />
          <Label htmlFor="THIS_TASK">이 할 일</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="ALL_TASKS" id="ALL_TASKS" />
          <Label htmlFor="ALL_TASKS">모든 할 일</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
