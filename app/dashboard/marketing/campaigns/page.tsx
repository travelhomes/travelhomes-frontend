'use client';

import { Sidebar, Header } from "@/components/dashboard";
import { MarketingContent } from "@/components/dashboard/content/MarketingContent";

export default function MarketingCampaignsPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Marketing Content" />
        <main className="flex-1 overflow-auto bg-[#F9FAFB] p-6">
          <MarketingContent />
        </main>
      </div>
    </div>
  );
} 