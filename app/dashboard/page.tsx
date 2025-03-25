"use client";

import { Sidebar, Header } from "@/components/dashboard";
import { 
  DashboardContent
} from "@/components/dashboard/content";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Dashboard" />
        <main className="flex-1 overflow-auto bg-[#F9FAFB] px-6">
          <DashboardContent />
        </main>
      </div>
    </div>
  );
}