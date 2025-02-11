import CalendarNavTab from "@/components/calendar/CalendarNavTab";

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex flex-col min-h-screen w-full">
        <CalendarNavTab />
        {children}
      </div>
    </div>
  );
}
