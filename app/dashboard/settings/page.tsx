'use client';

import { Sidebar, Header } from "@/components/dashboard";
import { SettingsContent } from "@/components/dashboard/content";
import { useSearchParams } from "next/navigation";

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") as "general" | "issue" | null;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Settings" />
        <main className="flex-1 overflow-auto bg-[#F9FAFB] p-6">
          <SettingsContent initialTab={tab || "general"} />
        </main>
      </div>
    </div>
  );
} 