import { ResponseDto } from "@//types/response.dto";

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

  if (!res.ok) {
    const errData = (await res.json()) as ErrorData;
    throw new Error(errData.message);
  }

  return res;
}

export async function getReq(url: string, options?: RequestInit) {
  return await request(url, {
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

export async function patchReq<T>(
  url: string,
  payload: T,
  options?: RequestInit
) {
  return await request(url, {
    ...options,
    method: "PATCH",
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

export async function deleteReq(url: string, options?: RequestInit) {
  return await request(url, {
    ...options,
    method: "DELETE",
  });
}
