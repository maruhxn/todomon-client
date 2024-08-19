import { z } from "zod";

export const FeedValidator = z
  .number({ required_error: "1개 이상의 먹이 수를 입력해주세요" })
  .min(1, "1개 이상의 먹이 수를 입력해주세요");
