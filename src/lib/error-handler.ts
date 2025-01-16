import { ErrorState } from "@/types/globals";
import { notFound, redirect } from "next/navigation";

export function handleErrorForServerComponent(result: ErrorState) {
  if (result.error.statusCode === 404) {
    notFound();
  } else if (result.error.statusCode === 401) {
    redirect("/");
  } else {
    throw new Error(result.error.message);
  }
}
