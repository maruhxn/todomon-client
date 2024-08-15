"use server";

import {
  CreateTodoRequest,
  UpdateAndDeleteTodoQueryParams,
  UpdateAndDeleteTodoQueryParamsValidator,
  UpdateTodoRequest,
  UpdateTodoStatusRequest,
} from "@/apis/validators/todo.validator";
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/lib/constants";
import { ResponseDto } from "@/types/response.dto";
import { TodoItem } from "@/types/todo";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { deleteReq, getReq, patchReq, postReq } from "./http.repository";

const TODO_BASE_URL = "/api/todo";

interface GetTodosResponseDto extends ResponseDto {
  data: TodoItem[];
}

export const getTodoByDay = async (date: string) => {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) return null;

  const { data } = (await (
    await getReq(TODO_BASE_URL + `/day?date=${date}`, {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Refresh: `Bearer ${cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value}`,
      },
    })
  ).json()) as GetTodosResponseDto;

  return data;
};

export const getTodoByWeek = async (startOfWeek: string) => {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) return null;

  const { data } = (await (
    await getReq(TODO_BASE_URL + `/week?startOfWeek=${startOfWeek}`, {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Refresh: `Bearer ${cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value}`,
      },
    })
  ).json()) as GetTodosResponseDto;

  return data;
};

export const getTodoByMonth = async (yearMonth: string) => {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) return null;

  const { data } = (await (
    await getReq(TODO_BASE_URL + `/month?yearMonth=${yearMonth}`, {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Refresh: `Bearer ${cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value}`,
      },
    })
  ).json()) as GetTodosResponseDto;

  return data;
};

export const createTodoRequest = async (payload: CreateTodoRequest) => {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) return null;

  await postReq(TODO_BASE_URL, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value}`,
      "Content-Type": "application/json",
    },
  });

  revalidatePath("/month");
  // revalidateTag("")
};

export const updateTodoRequest = async (
  objectId: number,
  payload: UpdateTodoRequest,
  queryParameter: UpdateAndDeleteTodoQueryParams
) => {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) return null;

  const result =
    UpdateAndDeleteTodoQueryParamsValidator.safeParse(queryParameter);
  if (!result.success) throw new Error(result.error.message);

  const queryParams = new URLSearchParams({
    isInstance: queryParameter.isInstance.toString(),
    targetType: queryParameter.targetType ?? "THIS_TASK",
  }).toString();

  const url = `${TODO_BASE_URL}/${objectId}?${queryParams}`;

  await patchReq(url, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value}`,
      "Content-Type": "application/json",
    },
  });

  revalidatePath("/month");
  // revalidateTag("")
};

export const updateTodoStatusRequest = async (
  objectId: number,
  payload: UpdateTodoStatusRequest,
  isInstance: boolean
) => {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) return null;

  const url = `${TODO_BASE_URL}/${objectId}/status?isInstance=${isInstance}`;

  await patchReq(url, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value}`,
      "Content-Type": "application/json",
    },
  });

  revalidatePath("/month");
  // revalidateTag("")
};

export const deleteTodoRequest = async (
  objectId: number,
  queryParameter: UpdateAndDeleteTodoQueryParams
) => {
  const accessToken = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) return null;

  const result =
    UpdateAndDeleteTodoQueryParamsValidator.safeParse(queryParameter);
  if (!result.success) throw new Error(result.error.message);

  const queryParams = new URLSearchParams({
    isInstance: queryParameter.isInstance.toString(),
    targetType: queryParameter.targetType ?? "THIS_TASK",
  }).toString();

  const url = `${TODO_BASE_URL}/${objectId}?${queryParams}`;

  await deleteReq(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Refresh: `Bearer ${cookies().get(REFRESH_TOKEN_COOKIE_NAME)?.value}`,
    },
  });

  revalidatePath("/month");
};
