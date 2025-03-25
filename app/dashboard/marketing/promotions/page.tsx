'use client';

import { Sidebar, Header } from "@/components/dashboard";
import { OffersContent } from "@/components/dashboard/content/OffersContent";

export default function MarketingPromotionsPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Marketing Offers" />
        <main className="flex-1 overflow-auto bg-[#F9FAFB] px-6">
          <OffersContent />
        </main>
      </div>
    </div>
  );
} 