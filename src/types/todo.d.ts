export interface TodoItem {
  todoId: number;
  parentId: number;
  content: string;
  allDay: boolean;
  done: boolean;
  color: string;
  startAt: string;
  endAt: string;
  repeatInfoItem: RepeatInfoItem;
}

export interface RepeatInfoItem {
  frequency: "DAILY" | "WEEKLY" | "MONTHLY";
  interval: number;
  byDay: string;
  byMonthDay: number;
  count: number;
  until: string;
}

export type UpdateAndDeleteTodoTargetType = "THIS_TASK" | "ALL_TASKS";
