import {
  CalendarIcon,
  PawPrintIcon,
  ShoppingBasketIcon,
  UserRoundIcon,
  UsersRoundIcon,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed z-40 bg-white w-screen bottom-0 h-20 border-t-2 py-2 grid grid-cols-5 px-4">
      <FooterComponent
        link="/calendar/month"
        icon={<CalendarIcon className="size-5" />}
        name="CALENDAR"
      />
      <FooterComponent
        link="/shop"
        icon={<ShoppingBasketIcon className="size-5" />}
        name="SHOP"
      />
      <FooterComponent
        link="/members/pets/my"
        icon={<PawPrintIcon className="size-5" />}
        name="PET"
      />
      <FooterComponent
        link="/social"
        icon={<UsersRoundIcon className="size-5" />}
        name="SOCIAL"
      />
      <FooterComponent
        link="/members/profile/my"
        icon={<UserRoundIcon className="size-5" />}
        name="PROFILE"
      />
    </footer>
  );
}

function FooterComponent({
  link,
  icon,
  name,
}: {
  link: string;
  icon: any;
  name: string;
}) {
  return (
    <Link
      href={link}
      className="flex-col sm:flex-row flex justify-center items-center gap-2 sm:py-2 hover:bg-slate-400 rounded-lg cursor-pointer"
    >
      {icon}
      <span className="text-sm font-bold">{name}</span>
    </Link>
  );
}
