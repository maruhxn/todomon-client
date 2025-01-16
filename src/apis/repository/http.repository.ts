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
      case 403:
        return {
          error: {
            statusCode: 403,
            message: "권한이 없습니다.",
          },
        };
      case 404:
        const { message: notFoundErrorMessage } =
          (await res.json()) as ErrorData;
        return {
          error: {
            statusCode: 404,
            message: notFoundErrorMessage,
          },
        };
      default:
        const { message: unExpectedErrorMessage } =
          (await res.json()) as ErrorData;
        return {
          error: { statusCode: res.status, message: unExpectedErrorMessage },
        };
    }
  } else {
    return res;
  }
}

export async function getReq(url: string, options?: RequestInit) {
  return await request(url, {
    ...options,
    method: "GET",
  });
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

export async function postReq<T>(
  url: string,
  payload: T,
  options?: RequestInit
) {
  return await request(url, {
    ...options,
    method: "POST",
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function mutationJsonReqWithAuth<T>(
  url: string,
  payload: T,
  options?: RequestInit
): Promise<ErrorState | undefined> {
  const res = await requestWithAuth(url, {
    ...options,
    method: "POST",
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

export async function formPostReq(
  url: string,
  payload: FormData,
  options?: RequestInit
) {
  return await request(url, {
    ...options,
    method: "POST",
    body: payload,
  });
}

export async function formPostReqWithAuth(
  url: string,
  payload: FormData,
  options?: RequestInit
) {
  return await requestWithAuth(url, {
    ...options,
    method: "POST",
    body: payload,
  });
}

export async function patchReq<T>(
  url: string,
  payload: T,
  options?: RequestInit
) {
  return await request(url, {
    ...options,
    method: "PATCH",
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function patchReqWithAuth<T>(
  url: string,
  payload: T,
  options?: RequestInit
) {
  return await requestWithAuth(url, {
    ...options,
    method: "PATCH",
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function formPatchReq(
  url: string,
  payload: FormData,
  options?: RequestInit
) {
  return await request(url, {
    ...options,
    method: "PATCH",
    body: payload,
  });
}

export async function formPatchReqWithAuth(
  url: string,
  payload: FormData,
  options?: RequestInit
) {
  return await requestWithAuth(url, {
    ...options,
    method: "PATCH",
    body: payload,
  });
}

export async function deleteReq(url: string, options?: RequestInit) {
  return await request(url, {
    ...options,
    method: "DELETE",
  });
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
