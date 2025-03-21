"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { useState } from "react";

export default function Dashboard() {
  const [currentSection, setCurrentSection] = useState("dashboard");

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header title="Dashboard" />
          
          <main className="flex-1 overflow-y-auto">
            {/* Dashboard content */}
            <DashboardContent />
          </main>
        </div>
      </div>
    </div>
  );
}