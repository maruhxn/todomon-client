import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex h-screen w-full">
        <aside className="hidden lg:flex flex-col items-start bg-background p-6 border-r">
          <div className="flex items-center justify-between w-full mb-6">
            <h2 className="text-2xl font-bold">Calendar</h2>
            <Button size="sm">+ New Event</Button>
          </div>
          <nav className="flex flex-col items-start gap-2 w-full">
            <Link
              href="#"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <CalendarIcon className="w-5 h-5" />
              <span>Today</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <CalendarIcon className="w-5 h-5" />
              <span>Tomorrow</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <CalendarIcon className="w-5 h-5" />
              <span>This Week</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <CalendarIcon className="w-5 h-5" />
              <span>This Month</span>
            </Link>
          </nav>
        </aside>
      </div>
    </div>
  );
}
