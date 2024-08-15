import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex h-screen w-full">
        <aside className="hidden lg:flex flex-col items-start bg-background px-12 py-6 border-r">
          <div className="flex items-center justify-between w-full mb-6">
            <h2 className="text-2xl font-bold">Calendar</h2>
          </div>
          <nav className="flex flex-col items-start gap-4 w-full">
            {["day", "week", "month"].map((d) => (
              <Link
                key={d}
                href={`/calendar/${d}`}
                className={cn(
                  "flex items-center gap-4 text-muted-foreground hover:text-foreground"
                )}
                prefetch={false}
              >
                <CalendarIcon className="w-5 h-5" />
                <span>{d.toUpperCase()}</span>
              </Link>
            ))}
          </nav>
        </aside>
        {children}
      </div>
    </div>
  );
}
