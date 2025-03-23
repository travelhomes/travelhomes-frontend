'use client';

import { Sidebar, Header } from "@/components/dashboard";

export default function MarketingCampaignsPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Marketing Campaigns" />
        <main className="flex-1 overflow-auto bg-[#F9FAFB] p-6">
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-semibold mb-2">Marketing Campaigns</h2>
            <p className="text-gray-500">This feature is coming soon.</p>
          </div>
        </main>
      </div>
    </div>
  );
} 