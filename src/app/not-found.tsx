import { ArrowLeftFromLineIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <p className="text-center font-bold text-gray-600 flex flex-col items-center gap-2">
        <h2 className="text-3xl">Not Found</h2>
        <p className="text-sm">해당 자원을 찾을 수 없습니다</p>
      </p>
      <Link href="/" className="flex gap-2 items-center">
        <ArrowLeftFromLineIcon /> 홈으로 돌아가기
      </Link>
    </div>
  );
}
