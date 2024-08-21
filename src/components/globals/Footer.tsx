import {
  CalendarIcon,
  PawPrintIcon,
  ShoppingBasketIcon,
  UsersRoundIcon,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <nav className="fixed z-40 bg-white w-screen bottom-0 h-20 border-t-2 py-2 flex justify-around items-center">
      <Link
        href="/calendar/month"
        className="flex justify-center items-center space-x-2 px-8 py-4 hover:bg-slate-400 rounded-lg cursor-pointer"
      >
        <CalendarIcon className="size-6" />
        <span className="text-sm font-bold">CALENDAR</span>
      </Link>
      <Link
        href="/shop"
        className="flex justify-center items-center space-x-2 px-8 py-4 hover:bg-slate-400 rounded-lg cursor-pointer"
      >
        <ShoppingBasketIcon className="size-6" />
        <span className="text-sm font-bold">SHOP</span>
      </Link>
      <Link
        href="/members/pets/my"
        className="flex justify-center items-center space-x-2 px-8 py-4 hover:bg-slate-400 rounded-lg cursor-pointer"
      >
        <PawPrintIcon className="size-6" />
        <span className="text-sm font-bold">PET</span>
      </Link>
      <Link
        href="/social"
        className="flex justify-center items-center space-x-2 px-8 py-4 hover:bg-slate-400 rounded-lg cursor-pointer"
      >
        <UsersRoundIcon className="size-6" />
        <span className="text-sm font-bold">SOCIAL</span>
      </Link>
    </nav>
  );
}
