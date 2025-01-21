import Link from "next/link";

export default function SuccessPaymentPage() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center space-y-2">
      <h2 className="text-3xl font-bold">구매에 성공했습니다!</h2>
      <Link href={`/members/profile/my`} className="">
        프로필 페이지로 가기
      </Link>
    </div>
  );
}
