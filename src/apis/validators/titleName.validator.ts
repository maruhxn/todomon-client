import { z } from "zod";

export const CreateTitleNameValidator = z.object({
  name: z
    .string({
      required_error: "칭호 이름은 비어있을 수 없습니다.",
    })
    .min(2, "칭호명은 2 ~ 5 글자입니다.")
    .max(5, "칭호명은 2 ~ 5 글자입니다."),
  color: z.string({
    required_error: "칭호 색은 비어있을 수 없습니다.",
  }),
});

export type CreateTitleNameRequest = z.infer<typeof CreateTitleNameValidator>;
