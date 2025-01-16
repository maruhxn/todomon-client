"use server";

import {
  CreateTodoRequest,
  UpdateAndDeleteTodoQueryParams,
  UpdateAndDeleteTodoQueryParamsValidator,
  UpdateTodoRequest,
  UpdateTodoStatusRequest,
} from "@/apis/validators/todo.validator";
import { TodoItem } from "@/types/todo";
import {
  deleteReqWithAuth,
  getReqWithAuth,
  mutationJsonReqWithAuth,
} from "./http.repository";

const TODO_BASE_URL = "/api/todo";

export const getTodoByDay = async (date: string) => {
  return await getReqWithAuth<TodoItem[]>(TODO_BASE_URL + `/day?date=${date}`);
};

export const getTodoByWeek = async (startOfWeek: string) => {
  return await getReqWithAuth<TodoItem[]>(
    TODO_BASE_URL + `/week?startOfWeek=${startOfWeek}`
  );
};

export const getTodoByMonth = async (yearMonth: string) => {
  return await getReqWithAuth<TodoItem[]>(
    TODO_BASE_URL + `/month?yearMonth=${yearMonth}`
  );
};

export const createTodoRequest = async (payload: CreateTodoRequest) => {
  return await mutationJsonReqWithAuth(TODO_BASE_URL, payload);
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

  return await mutationJsonReqWithAuth(url, payload);
};

export const updateTodoStatusRequest = async (
  objectId: number,
  payload: UpdateTodoStatusRequest,
  isInstance: boolean
) => {
  const url = `${TODO_BASE_URL}/${objectId}/status?isInstance=${isInstance}`;

  return await mutationJsonReqWithAuth(url, payload);
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

  return await deleteReqWithAuth(url);
};
