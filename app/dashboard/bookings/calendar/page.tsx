'use client';

import { Sidebar, Header } from "@/components/dashboard";
import { BookingsCalendarContent } from "@/components/dashboard/content";

export default function BookingsCalendarPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Bookings Calendar" />
        <main className="flex-1 overflow-auto bg-[#F9FAFB] px-6">
          <BookingsCalendarContent />
        </main>
      </div>
    </div>
  );
} 