"use client";

import { Sidebar, Header } from "@/components/dashboard";
import { 
  DashboardContent,
  BookingsCalendarContent,
  BookingsDetailsContent,
  NewBookingContent
} from "@/components/dashboard/content";
import { useState } from "react";

export default function Dashboard() {
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [pageTitle, setPageTitle] = useState("Dashboard");

  // Render content based on current section
  const renderContent = () => {
    switch (currentSection) {
      case "bookings-calendar":
        return <BookingsCalendarContent />;
      case "bookings-details":
        return <BookingsDetailsContent />;
      case "bookings-new":
        return <NewBookingContent />;
      case "dashboard":
      default:
        return <DashboardContent />;
    }
  };

  const handleNavigation = (section: string, title: string) => {
    setCurrentSection(section);
    setPageTitle(title);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <Sidebar 
            currentSection={currentSection}
            onNavigate={handleNavigation}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header title={pageTitle} />
          
          <main className="flex-1 overflow-y-auto">
            {/* Render the appropriate content for current section */}
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}