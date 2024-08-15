import { z } from "zod";

const frequencyEnumValues = ["DAILY", "WEEKLY", "MONTHLY"] as const;

/* CREATE TODO */

export const CreateTodoValidator = z.object({
  content: z
    .string({
      required_error: "내용을 입력해주세요.",
    })
    .min(1, "내용을 입력해주세요.")
    .max(50, "내용은 최대 50글자입니다."),
  startAt: z
    .string({
      required_error: "시작 시간을 입력해주세요.",
    })
    .min(1, "시작 시간을 입력해주세요."),
  endAt: z
    .string({
      required_error: "종료 시간을 입력해주세요.",
    })
    .min(1, "종료 시간을 입력해주세요."),
  isAllDay: z.boolean(),
  repeatInfoReqItem: z
    .object({
      frequency: z.enum(frequencyEnumValues, {
        required_error: "반복 단위를 입력해주세요.",
      }),
      interval: z.coerce.number().positive(),
      byDay: z.array(z.string()).min(1).nullable(),
      byMonthDay: z.date().nullable(),
      until: z.date().nullable(),
      count: z.coerce.number().min(2, "최소 반복 횟수는 2번입니다.").optional(),
    })
    .nullable(),
});

export type CreateTodoRequest = z.infer<typeof CreateTodoValidator>;

/* UPDATE TODO */

export const UpdateTodoValidator = z.object({
  content: z
    .string()
    .min(1, "내용을 입력해주세요.")
    .max(50, "내용은 최대 50글자입니다.")
    .nullable(),
  startAt: z.string().min(1, "시작 시간을 입력해주세요.").nullable(),
  endAt: z.string().min(1, "종료 시간을 입력해주세요.").nullable(),
  isAllDay: z.boolean().nullable(),
  repeatInfoReqItem: z
    .object({
      frequency: z.enum(frequencyEnumValues).nullable(),
      interval: z.coerce.number().positive().nullable(),
      byDay: z.array(z.string()).min(1).nullable(),
      byMonthDay: z.date().nullable(),
      until: z.date().nullable(),
      count: z.coerce.number().min(2, "최소 반복 횟수는 2번입니다.").nullable(),
    })
    .nullable(),
});

export type UpdateTodoRequest = z.infer<typeof UpdateTodoValidator>;

export const UpdateAndDeleteTodoQueryParamsValidator = z.object({
  isInstance: z.boolean({ required_error: "인스턴스 여부를 입력해주세요." }),
  targetType: z.enum(["THIS_TASK", "ALL_TASKS"]).nullable(),
});

export type UpdateAndDeleteTodoQueryParams = z.infer<
  typeof UpdateAndDeleteTodoQueryParamsValidator
>;

export const UpdateTodoStatusValidator = z.object({
  isDone: z.boolean({
    required_error: "완료 여부는 비어있을 수 없습니다.",
  }),
});

export type UpdateTodoStatusRequest = z.infer<typeof UpdateTodoStatusValidator>;
