'use client';

import { Sidebar, Header } from "@/components/dashboard";
import { AnalyticsContent } from "@/components/dashboard/content/AnalyticsContent";

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Analytics" />
        <main className="flex-1 overflow-auto bg-[#F9FAFB] p-6">
          <AnalyticsContent />
        </main>
      </div>
    </div>
  );
} 