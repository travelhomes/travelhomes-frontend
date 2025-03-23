'use client';

import { Sidebar, Header } from "@/components/dashboard";
import { RevenueContent } from "@/components/dashboard/content";

export default function RevenuePage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Revenue" />
        <main className="flex-1 overflow-auto bg-[#F9FAFB] p-6">
          <RevenueContent />
        </main>
      </div>
    </div>
  );
} 