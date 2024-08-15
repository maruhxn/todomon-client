"use client";

import {
  CreateTodoRequest,
  CreateTodoValidator,
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

import { createTodoRequest } from "@/apis/repository/todo.repository";
import { useToast } from "@/hooks/use-toast";
import { cn, getDateFromTimeString, getISOString } from "@/lib/utils";
import { FREQUENCY } from "@/types/time";
import { zodResolver } from "@hookform/resolvers/zod";
import { addHours, format } from "date-fns";
import { ko } from "date-fns/locale";
import { AlignJustifyIcon, CalendarIcon, ClockIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Calendar } from "./ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";

interface AddTodoDialogProps {
  date: Date;
  openControlFn: any;
}

export default function AddTodoDialog({
  date,
  openControlFn,
}: AddTodoDialogProps) {
  const current = new Date();
  const { toast } = useToast();
  const [frequency, setFrequency] = useState<FREQUENCY>("DAILY");
  const [repeatExitType, setRepeatExitType] = useState<string>("one");
  const [isRepeated, setIsRepeated] = useState(false);

  const form = useForm<CreateTodoRequest>({
    resolver: zodResolver(CreateTodoValidator),
    defaultValues: {
      content: "",
      startAt: format(current, "HH:mm"),
      endAt: format(addHours(current, 1), "HH:mm"),
      isAllDay: false,
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
    if (Object.keys(form.formState.errors).length !== 0) {
      console.log(form.formState.errors);
    }
  }, [form.formState.errors]);

  async function createTodo({
    content,
    startAt,
    endAt,
    isAllDay,
    repeatInfoReqItem,
  }: CreateTodoRequest) {
    try {
      const payload = {
        content,
        startAt: getDateFromTimeString(date, startAt),
        endAt: getDateFromTimeString(date, endAt),
        isAllDay,
        repeatInfoReqItem: isRepeated
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

      await createTodoRequest(payload as CreateTodoRequest);

      openControlFn(false);

      form.reset();

      setFrequency("DAILY");
      setIsRepeated(false);
      setRepeatExitType("one");

      toast({
        title: "성공",
        description: "투두 생성에 성공했습니다",
      });
    } catch (error: any) {
      return toast({
        title: "실패",
        description: error.message,
        variant: "destructive",
      });
    } finally {
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>투두 생성</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(createTodo)}
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
                    <Input className="w-full" placeholder="내용" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex space-x-4">
            <ClockIcon className="size-5 text-muted-foreground" />
            <div className="flex flex-col justify-center space-y-3">
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="startAt"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <span>~</span>
                <FormField
                  control={form.control}
                  name="endAt"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isAllDay"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormLabel>종일</FormLabel>
                    <div className="flex items-center">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Label>반복 설정</Label>
            <Checkbox
              checked={isRepeated}
              onCheckedChange={(checked) =>
                setIsRepeated(checked ? true : false)
              }
            />
          </div>

          {isRepeated && (
            <>
              <Separator />
              <h3 className="font-bold">반복 설정</h3>
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
                        setFrequency(value as FREQUENCY);
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

          <DialogFooter>
            <Button type="submit">저장</Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                닫기
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
