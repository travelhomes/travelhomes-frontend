"use client";

import { Sidebar, Header } from "@/components/dashboard";
import { 
  DashboardContent,
  BookingsCalendarContent,
  NewBookingContent,
  BookingsContent,
  OfferingContent,
  AddOfferingContent
} from "@/components/dashboard/content";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Dashboard() {
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const searchParams = useSearchParams();
  const router = useRouter();

  // Handle navigation from URL params
  useEffect(() => {
    const section = searchParams.get('section');
    if (section) {
      handleNavigationChange(section);
    }
  }, [searchParams]);

  // Handle navigation changes
  const handleNavigationChange = (section: string) => {
    let title = "Dashboard";
    
    if (section.startsWith('bookings')) {
      title = "Bookings";
    } else if (section.startsWith('offering')) {
      title = "Offering";
    } else if (section.startsWith('marketing')) {
      title = "Marketing";
    } else if (section === 'revenue') {
      title = "Revenue";
    } else if (section === 'analytics') {
      title = "Analytics";
    } else if (section === 'chat') {
      title = "Chat";
    } else if (section === 'settings') {
      title = "Settings";
    }
    
    setCurrentSection(section);
    setPageTitle(title);
  };

  const handleNavigation = (section: string, title: string) => {
    router.push(`/dashboard?section=${section}`);
    setCurrentSection(section);
    setPageTitle(title);
  };

  // Render content based on current section
  const renderContent = () => {
    switch (currentSection) {
      case "bookings-calendar":
        return <BookingsCalendarContent />;
      case "bookings-details":
        return <BookingsContent />;
      case "bookings-new":
        return <NewBookingContent />;
      case "offering-listing":
        return <OfferingContent />;
      case "offering-add":
        return <AddOfferingContent />;
      case "dashboard":
      default:
        return <DashboardContent />;
    }
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