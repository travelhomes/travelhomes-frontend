'use client';

import { Sidebar, Header } from "@/components/dashboard";
import { SettingsContent } from "@/components/dashboard/content";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SettingsPageContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") as "general" | "issue" | null;

  return (
    <SettingsContent initialTab={tab || "general"} />
  );
}

export default function SettingsPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Settings" />
        <main className="flex-1 overflow-auto bg-[#F9FAFB] p-6">
          <Suspense fallback={<div>Loading...</div>}>
            <SettingsPageContent />
          </Suspense>
        </main>
      </div>
    </div>
  );
} 