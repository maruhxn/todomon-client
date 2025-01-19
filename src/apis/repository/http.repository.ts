import { ResponseDto } from "@//types/response.dto";
import { ErrorState } from "@/types/globals";
import { refresh } from "./auth.repository";
import { getAccessToken } from "./global-action";

export interface ErrorData extends ResponseDto {
  errors: [];
}

async function request(url: string, option: RequestInit) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: option.method,
    cache: option.cache,
    next: option.next,
    body: option.body,
    headers: option.headers,
  });

  return res;
}

export async function requestWithAuth(
  url: string,
  options?: RequestInit
): Promise<Response | ErrorState> {
  const accessToken = (await getAccessToken()) ?? null;
  if (!accessToken)
    return {
      error: {
        statusCode: 401,
        message: "로그인이 필요합니다.",
      },
    };

  const res = await request(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    switch (res.status) {
      case 401:
        const resultMessage = await refresh();
        if (resultMessage === "OK") {
          return requestWithAuth(url, options);
        } else {
          return {
            error: {
              statusCode: 401,
              message: "로그인이 필요합니다.",
            },
          };
        }
      default:
        const { message } = (await res.json()) as ErrorData;
        return {
          error: { statusCode: res.status, message },
        };
    }
  } else {
    return res;
  }
}

export async function getReq<T>(
  url: string,
  options?: RequestInit
): Promise<T | ErrorState> {
  const res = await request(url, {
    ...options,
    method: "GET",
  });

  if (!res.ok) {
    const { message } = (await res.json()) as ErrorData;
    return {
      error: { statusCode: res.status, message },
    };
  }

  const { data } = await res.json();
  return data;
}

export async function getReqWithAuth<T>(
  url: string,
  options?: RequestInit
): Promise<T | ErrorState> {
  const res = await requestWithAuth(url, {
    ...options,
    method: "GET",
  });

  if ("error" in res) {
    return res;
  }

  const { data } = await res.json();
  return data as T;
}

export async function mutationJsonReqWithAuth<T>(
  url: string,
  payload: T,
  options?: RequestInit
): Promise<ErrorState | undefined> {
  const res = await requestWithAuth(url, {
    ...options,
    method: options?.method ?? "POST",
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if ("error" in res) {
    return res;
  }
}

export async function mutationFormReqWithAuth(
  url: string,
  payload: FormData,
  options?: RequestInit
): Promise<ErrorState | undefined> {
  const res = await requestWithAuth(url, {
    ...options,
    body: payload,
  });

  if ("error" in res) {
    return res;
  }
}

export async function deleteReqWithAuth(
  url: string,
  options?: RequestInit
): Promise<ErrorState | undefined> {
  const res = await requestWithAuth(url, {
    ...options,
    method: "DELETE",
  });

  if ("error" in res) {
    return res;
  }
}

/**
 * 클라이언트 <-> 클라이언트 서버 <-> 백엔드
 *
 * 1. 백엔드에서 에러 발생
 * 2. 클라이언트 서버에서 에러 발생
 * 클라이언트는 발생한 에러를 정제해서 클라이언트에게 전달하기만 하면 됨
 */
