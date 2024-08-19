"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";

export default function CalendarNavTab() {
  const pathname = usePathname();
  const router = useRouter();
  const type = pathname.substring(pathname.lastIndexOf("/") + 1);

  return (
    <Tabs defaultValue={type} className="w-full">
      <TabsList className="w-full px-8">
        <TabsTrigger
          onClick={() => router.push("/calendar/day")}
          className="flex-1"
          value="day"
        >
          DAYLY
        </TabsTrigger>
        <TabsTrigger
          onClick={() => router.push("/calendar/week")}
          className="flex-1"
          value="week"
        >
          WEEKLY
        </TabsTrigger>
        <TabsTrigger
          onClick={() => router.push("/calendar/month")}
          className="flex-1"
          value="month"
        >
          MONTHLY
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
