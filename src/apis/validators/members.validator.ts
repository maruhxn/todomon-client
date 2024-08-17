import { z } from "zod";

export const UpdateProfileValidator = z.object({
  username: z
    .string()
    .min(2, "유저명은 2 ~ 20글자입니다.")
    .max(20, "유저명은 2 ~ 20글자입니다."),
  profileImage: z.any().nullable(),
});

export type UpdateProfileRequest = z.infer<typeof UpdateProfileValidator>;
