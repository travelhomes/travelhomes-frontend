'use client';

import { Sidebar, Header } from "@/components/dashboard";
import { AddOfferingContent } from "@/components/dashboard/content";

export default function AddOfferingPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Add Offering" />
        <main className="flex-1 overflow-auto bg-[#F9FAFB] px-6">
          <AddOfferingContent />
        </main>
      </div>
    </div>
  );
} 