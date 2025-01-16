"use client"; // Error boundaries must be Client Components

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <p className="text-center text-3xl font-bold text-gray-600">
        {error.message}
      </p>
      <div className="flex gap-3">
        <button onClick={reset}>다시 시도</button>
        <Link href="/">홈으로 돌아가기</Link>
      </div>
    </div>
  );
}
