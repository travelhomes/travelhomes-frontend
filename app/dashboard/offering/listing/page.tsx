'use client';

import { Sidebar, Header } from "@/components/dashboard";
import { OfferingContent } from "@/components/dashboard/content";

export default function OfferingListingPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Offerings" />
        <main className="flex-1 overflow-auto bg-[#F9FAFB] p-6">
          <OfferingContent />
        </main>
      </div>
    </div>
  );
} 