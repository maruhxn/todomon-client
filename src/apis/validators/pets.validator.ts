import { z } from "zod";

export const FeedValidator = z
  .number({ required_error: "1개 이상의 먹이 수를 입력해주세요" })
  .min(1, "1개 이상의 먹이 수를 입력해주세요");

export const ChangePetNameValidator = z.object({
  petId: z.number({
    required_error: "펫 아이디는 비어있을 수 없습니다.",
  }),
  name: z.string({
    required_error: "이름은 비어있을 수 없습니다.",
  }),
  color: z.string().nullable(),
});

export type ChangePetNameRequest = z.infer<typeof ChangePetNameValidator>;
