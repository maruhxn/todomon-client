"use server";

import {
  CreateTodoRequest,
  UpdateAndDeleteTodoQueryParams,
  UpdateAndDeleteTodoQueryParamsValidator,
  UpdateTodoRequest,
  UpdateTodoStatusRequest,
} from "@/apis/validators/todo.validator";
import TAGS from "@/lib/tags";
import { TodoItem } from "@/types/todo";
import { revalidateTag } from "next/cache";
import {
  deleteReqWithAuth,
  getReqWithAuth,
  mutationJsonReqWithAuth,
} from "./http.repository";

const TODO_BASE_URL = "/api/todo";

export const getTodoByDay = async (date: string) => {
  return await getReqWithAuth<TodoItem[]>(TODO_BASE_URL + `/day?date=${date}`, {
    cache: "force-cache",
    next: { tags: [TAGS.TODO] },
  });
};

export const getTodoByWeek = async (startOfWeek: string) => {
  return await getReqWithAuth<TodoItem[]>(
    TODO_BASE_URL + `/week?startOfWeek=${startOfWeek}`,
    { cache: "force-cache", next: { tags: [TAGS.TODO] } }
  );
};

export const getTodoByMonth = async (yearMonth: string) => {
  return await getReqWithAuth<TodoItem[]>(
    TODO_BASE_URL + `/month?yearMonth=${yearMonth}`,
    { cache: "force-cache", next: { tags: [TAGS.TODO] } }
  );
};

export const createTodoRequest = async (payload: CreateTodoRequest) => {
  const err = await mutationJsonReqWithAuth(TODO_BASE_URL, payload);
  revalidateTag(TAGS.TODO);
  return err;
};

export const updateTodoRequest = async (
  objectId: number,
  payload: UpdateTodoRequest,
  queryParameter: UpdateAndDeleteTodoQueryParams
) => {
  const result =
    UpdateAndDeleteTodoQueryParamsValidator.safeParse(queryParameter);
  if (!result.success) throw new Error(result.error.flatten().formErrors[0]);

  const queryParams = new URLSearchParams({
    isInstance: queryParameter.isInstance.toString(),
    targetType: queryParameter.targetType ?? "THIS_TASK",
  }).toString();

  const url = `${TODO_BASE_URL}/${objectId}?${queryParams}`;

  const err = await mutationJsonReqWithAuth(url, payload, { method: "PATCH" });
  revalidateTag(TAGS.TODO);
  return err;
};

export const updateTodoStatusRequest = async (
  objectId: number,
  payload: UpdateTodoStatusRequest,
  isInstance: boolean
) => {
  const url = `${TODO_BASE_URL}/${objectId}/status?isInstance=${isInstance}`;

  const err = await mutationJsonReqWithAuth(url, payload, { method: "PATCH" });
  revalidateTag(TAGS.TODO);
  return err;
};

export const deleteTodoRequest = async (
  objectId: number,
  queryParameter: UpdateAndDeleteTodoQueryParams
) => {
  const result =
    UpdateAndDeleteTodoQueryParamsValidator.safeParse(queryParameter);
  if (!result.success) throw new Error(result.error.message);

  const queryParams = new URLSearchParams({
    isInstance: queryParameter.isInstance.toString(),
    targetType: queryParameter.targetType ?? "THIS_TASK",
  }).toString();

  const url = `${TODO_BASE_URL}/${objectId}?${queryParams}`;

  const err = await deleteReqWithAuth(url);
  revalidateTag(TAGS.TODO);
  return err;
};
