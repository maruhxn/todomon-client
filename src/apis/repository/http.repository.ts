import { ResponseDto } from "@//types/response.dto";
import { redirect } from "next/navigation";
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

export async function requestWithAuth(url: string, options?: RequestInit) {
  const accessToken = (await getAccessToken()) ?? null;
  if (!accessToken) redirect("/");

  const res = await request(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      const resultMessage = await refresh();
      if (resultMessage !== "OK") {
      } else {
        return redirect("/");
      }
    } else {
      const { message } = (await res.json()) as ErrorData;
      throw new Error(message);
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

export async function getReqWithAuth(url: string, options?: RequestInit) {
  return await requestWithAuth(url, {
    ...options,
    method: "GET",
  });
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

export async function postReqWithAuth<T>(
  url: string,
  payload: T,
  options?: RequestInit
) {
  return await requestWithAuth(url, {
    ...options,
    method: "POST",
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
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

export async function deleteReqWithAuth(url: string, options?: RequestInit) {
  return await requestWithAuth(url, {
    ...options,
    method: "DELETE",
  });
}
