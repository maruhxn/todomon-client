"use client";

import {
  UpdateAndDeleteTodoQueryParams,
  UpdateTodoRequest,
  UpdateTodoStatusRequest,
  UpdateTodoValidator,
} from "@/apis/validators/todo.validator";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  deleteTodoRequest,
  updateTodoRequest,
  updateTodoStatusRequest,
} from "@/apis/repository/todo.repository";
import { useToast } from "@/hooks/use-toast";
import {
  cn,
  getDateFromTimeString,
  getISOString,
  getRepeatInfoText,
} from "@/lib/utils";
import { TodoItem, UpdateAndDeleteTodoTargetType } from "@/types/todo";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import {
  AlignJustifyIcon,
  CalendarIcon,
  ClockIcon,
  RepeatIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useForm } from "react-hook-form";
import { Calendar } from "../ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import SelectTargetTypeRadioGroup from "./SelectTargetTypeDialog";

interface TodoUpdateDialogProps {
  todo: TodoItem;
  openControlFn: any;
}

export default function TodoUpdateDialog({
  todo,
  openControlFn,
}: TodoUpdateDialogProps) {
  const date = new Date(todo.startAt);
  const isInstance = todo.parentId ? true : false;

  const { toast } = useToast();
  const [frequency, setFrequency] = useState<string | null>("DAILY");
  const [repeatExitType, setRepeatExitType] = useState<string>("one");
  const [isRepeatInfoUpdating, setIsRepeatInfoUpdating] =
    useState<boolean>(false);
  const [isTimeModifiable, setIsTimeModifiable] = useState(true);
  const [targetType, setTargetType] =
    useState<UpdateAndDeleteTodoTargetType>("THIS_TASK");

  const form = useForm<UpdateTodoRequest>({
    resolver: zodResolver(UpdateTodoValidator),
    defaultValues: {
      content: todo.content,
      startAt: format(date, "HH:mm"),
      endAt: format(new Date(todo.endAt), "HH:mm"),
      isAllDay: todo.allDay,
      color: todo.color,
      repeatInfoReqItem: {
        interval: 1,
        frequency: "DAILY",
        byDay: null,
        byMonthDay: null,
        count: undefined,
        until: date,
      },
    },
  });

  useEffect(() => {
    if (frequency === "WEEKLY") {
      form.setValue("repeatInfoReqItem.byDay", []);
      form.setValue("repeatInfoReqItem.byMonthDay", null);
    } else if (frequency === "MONTHLY") {
      form.setValue("repeatInfoReqItem.byDay", null);
      form.setValue("repeatInfoReqItem.byMonthDay", date);
    } else {
      form.setValue("repeatInfoReqItem.byDay", null);
      form.setValue("repeatInfoReqItem.byMonthDay", null);
    }
  }, [frequency]);

  useEffect(() => {
    if (repeatExitType === "one") {
      form.setValue("repeatInfoReqItem.until", date);
      form.setValue("repeatInfoReqItem.count", undefined);
    } else {
      form.setValue("repeatInfoReqItem.until", null);
      form.setValue("repeatInfoReqItem.count", 1);
    }
  }, [repeatExitType]);

  useEffect(() => {
    if (targetType === "THIS_TASK") {
      form.setValue("startAt", format(date, "HH:mm"));
      form.setValue("endAt", format(new Date(todo.endAt), "HH:mm"));
      setIsTimeModifiable(true);
    } else {
      form.setValue("startAt", null);
      form.setValue("endAt", null);
      setIsTimeModifiable(false);
    }
  }, [targetType]);

  useEffect(() => {
    if (Object.keys(form.formState.errors).length !== 0) {
      console.log(form.formState.errors);
    }
  }, [form.formState.errors]);

  async function updateTodo({
    content,
    startAt,
    endAt,
    isAllDay,
    color,
    repeatInfoReqItem,
  }: UpdateTodoRequest) {
    try {
      const payload = {
        content,
        startAt: startAt && getDateFromTimeString(date, startAt),
        endAt: endAt && getDateFromTimeString(date, endAt),
        isAllDay,
        color,
        repeatInfoReqItem: isRepeatInfoUpdating
          ? repeatInfoReqItem
            ? {
                frequency: repeatInfoReqItem.frequency,
                interval: repeatInfoReqItem.interval,
                byMonthDay: repeatInfoReqItem?.byMonthDay
                  ? repeatInfoReqItem.byMonthDay.getDate()
                  : null,
                byDay: repeatInfoReqItem?.byDay
                  ? repeatInfoReqItem.byDay.join(",")
                  : null,
                until: repeatInfoReqItem.until
                  ? getISOString(repeatInfoReqItem.until)
                  : null,
                count: repeatInfoReqItem.count ?? null,
              }
            : null
          : null,
      };

      const queryParameter = {
        isInstance,
        targetType,
      } as UpdateAndDeleteTodoQueryParams;

      await updateTodoRequest(
        todo.todoId,
        payload as UpdateTodoRequest,
        queryParameter
      );

      openControlFn(false);

      form.reset();

      toast({
        title: "성공",
        description: "투두 수정에 성공했습니다",
      });
    } catch (error: any) {
      return toast({
        title: "실패",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  async function updateStatus() {
    try {
      const payload: UpdateTodoStatusRequest = {
        isDone: !todo.done,
      };

      await updateTodoStatusRequest(todo.todoId, payload, isInstance);

      openControlFn(false);

      form.reset();

      toast({
        title: "성공",
        description: "투두 상태 업데이트에 성공했습니다",
      });
    } catch (error: any) {
      return toast({
        title: "실패",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  async function deleteTodo() {
    try {
      const queryParameter = {
        isInstance,
        targetType,
      } as UpdateAndDeleteTodoQueryParams;

      await deleteTodoRequest(todo.todoId, queryParameter);

      openControlFn(false);

      form.reset();

      toast({
        title: "성공",
        description: "투두 삭제에 성공했습니다",
      });
    } catch (error: any) {
      return toast({
        title: "실패",
        description: error.message,
        variant: "destructive",
      });
    }
  }
  useEffect(() => {
    if (isRepeatInfoUpdating && todo.repeatInfoItem) {
      setTargetType("ALL_TASKS");
    }
  }, [isRepeatInfoUpdating]);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>투두 수정</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(updateTodo)}
          className="flex flex-col space-y-4"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex-col">
                <div className="flex items-center space-x-4">
                  <FormLabel>
                    <AlignJustifyIcon className="size-5 text-muted-foreground" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center space-x-4">
            <ClockIcon className="size-5 text-muted-foreground" />
            <div className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="startAt"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormControl>
                      <Input
                        disabled={!isTimeModifiable}
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <span>~</span>
              <FormField
                control={form.control}
                name="endAt"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormControl>
                      <Input
                        disabled={!isTimeModifiable}
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="isAllDay"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value ?? false}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="w-8">종일</FormLabel>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormLabel>색깔</FormLabel>
                <div className="flex flex-1 justify-center items-center">
                  <FormControl>
                    <div className="flex flex-col space-y-2">
                      <HexColorPicker
                        color={field.value ?? todo.color}
                        onChange={field.onChange}
                      />
                      <HexColorInput
                        className="font-bold text-sm text-center"
                        color={field.value ?? todo.color}
                        onChange={field.onChange}
                        placeholder="6자리 HEX 코드를 입력하세요."
                        prefixed
                      />
                    </div>
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          {todo.repeatInfoItem ? (
            <div
              onClick={() => setIsRepeatInfoUpdating((prev) => !prev)}
              className="flex items-center space-x-4 cursor-pointer rounded-sm hover:ring-2 hover:ring-offset-4 hover:ring-black/60"
            >
              <RepeatIcon className="size-4 text-muted-foreground"></RepeatIcon>
              <span className="text-muted-foreground text-sm font-bold">
                {getRepeatInfoText(todo.repeatInfoItem)}
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Label>반복 설정</Label>
              <Checkbox
                checked={isRepeatInfoUpdating}
                onCheckedChange={(checked) =>
                  setIsRepeatInfoUpdating(checked ? true : false)
                }
              />
            </div>
          )}

          {isRepeatInfoUpdating && (
            <>
              <Separator />
              <h3 className="font-bold">반복 정보 수정</h3>
              <div className="flex items-center space-x-2">
                <Label className="text-muted-foreground break-keep">주기</Label>
                <FormField
                  control={form.control}
                  name="repeatInfoReqItem.interval"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          min={1}
                          type="number"
                          className="w-24 text-center bg-zinc-100"
                          {...field}
                          value={field.value ?? 1}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="repeatInfoReqItem.frequency"
                  render={({ field }) => (
                    <Select
                      value={field.value || "DAILY"}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setFrequency(value);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="w-24 text-center bg-zinc-100"
                          id="repeatInfo"
                        >
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="DAILY">일</SelectItem>
                        <SelectItem value="WEEKLY">주</SelectItem>
                        <SelectItem value="MONTHLY">개월</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {frequency && (
                <div>
                  {frequency === "WEEKLY" && (
                    <FormField
                      control={form.control}
                      name="repeatInfoReqItem.byDay"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            반복 요일
                          </FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-7 gap-2">
                              {[
                                "MON",
                                "TUE",
                                "WED",
                                "THU",
                                "FRI",
                                "SAT",
                                "SUN",
                              ].map((day, idx) => (
                                <Button
                                  key={idx}
                                  type="button"
                                  className={`px-2 py-1 ${
                                    field.value && field.value.includes(day)
                                      ? "bg-black text-white"
                                      : "bg-zinc-100 text-black"
                                  }`}
                                  onClick={() => {
                                    if (!field.value) return;
                                    const newValue = field.value.includes(day)
                                      ? field.value.filter(
                                          (item) => item !== day
                                        ) // 이미 선택된 요일은 제거
                                      : [...field.value, day]; // 새 요일을 추가
                                    field.onChange(newValue); // 새로운 배열로 상태 업데이트
                                  }}
                                >
                                  {day}
                                </Button>
                              ))}
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                  {frequency === "MONTHLY" && (
                    <FormField
                      control={form.control}
                      name="repeatInfoReqItem.byMonthDay"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col justify-center items-center">
                            {field.value && (
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(d) => d < date}
                                fromMonth={date}
                                toMonth={date}
                                initialFocus
                              />
                            )}
                            <span className="text-muted-foreground text-xs text-center">
                              반복할 날짜를 선택해주세요.
                            </span>
                          </div>
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}

              <Label className="text-muted-foreground">종료</Label>
              <RadioGroup
                defaultValue="one"
                onValueChange={(value) => setRepeatExitType(value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="one" id="one" />
                  <Label htmlFor="one">날짜</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="two" id="two" />
                  <Label htmlFor="two">다음</Label>
                </div>
              </RadioGroup>

              {repeatExitType === "one" && (
                <FormField
                  control={form.control}
                  name="repeatInfoReqItem.until"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value &&
                                format(field.value, "yyyy년 MM월 dd일", {
                                  locale: ko,
                                })}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          {field.value && (
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(d) => d < date}
                              initialFocus
                            />
                          )}
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {repeatExitType === "two" && (
                <FormField
                  control={form.control}
                  name="repeatInfoReqItem.count"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-4 text-sm">
                        <span>다음 </span>
                        <FormControl>
                          <Input
                            min={1}
                            type="number"
                            className="w-24 text-center bg-zinc-100"
                            {...field}
                            value={field.value ?? 1}
                          />
                        </FormControl>
                        <span>회 반복</span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </>
          )}

          {todo.repeatInfoItem && (
            <>
              <Separator />
              <SelectTargetTypeRadioGroup
                targetType={targetType}
                setTargetType={setTargetType}
              />
            </>
          )}

          <DialogFooter>
            <div className="w-full flex justify-between items-center">
              <div className="space-x-2">
                <Button
                  onClick={updateStatus}
                  type="button"
                  variant="secondary"
                >
                  {todo.done ? "완료 취소" : "완료"}
                </Button>
                <Button
                  onClick={deleteTodo}
                  type="button"
                  variant="destructive"
                >
                  삭제
                </Button>
              </div>
              <div className="space-x-2">
                <Button type="submit">저장</Button>
                <DialogClose asChild>
                  <Button
                    onClick={() => form.reset()}
                    type="button"
                    variant="secondary"
                  >
                    닫기
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
