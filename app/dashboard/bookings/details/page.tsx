'use client';

import { Sidebar, Header } from "@/components/dashboard";
import { BookingsContent } from "@/components/dashboard/content";

export default function BookingsDetailsPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Bookings Details" />
        <main className="flex-1 overflow-auto bg-[#F9FAFB] px-6">
          <BookingsContent />
        </main>
      </div>
    </div>
  );
} 