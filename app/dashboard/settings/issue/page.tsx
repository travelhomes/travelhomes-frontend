'use client';

import { Sidebar, Header } from "@/components/dashboard";
import { SettingsContent } from "@/components/dashboard/content";

export default function RaiseIssueTicketPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Raise Issue Ticket" />
        <main className="flex-1 overflow-auto bg-[#F9FAFB] px-6">
          <SettingsContent initialTab="issue" />
        </main>
      </div>
    </div>
  );
} 