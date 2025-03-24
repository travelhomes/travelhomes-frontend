"use client";

import { MarketingContent } from "@/components/dashboard/content";
import { Header, Sidebar } from "@/components/dashboard";

export default function MarketingUploadContentPage() {
  return (
    <div className="flex h-screen bg-[#FAFAFA]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title="Marketing" />
        <div className="flex-1 p-6">
          <MarketingContent />
        </div>
      </div>
    </div>
  );
} 