'use client';

import { Sidebar, Header } from "@/components/dashboard";
import { NewBookingContent } from "@/components/dashboard/content";

export default function NewBookingPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Add New Booking" />
        <main className="flex-1 overflow-auto bg-[#F9FAFB] p-6">
          <NewBookingContent />
        </main>
      </div>
    </div>
  );
} 