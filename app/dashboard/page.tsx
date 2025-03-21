"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Header title="Dashboard" />
          
          <main className="flex-1 overflow-y-auto p-8">
            {/* Dashboard content will go here */}
            <div className="space-y-8">
              {/* Overview Section */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Placeholder cards for metrics */}
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-sm text-gray-600">Impression</h3>
                    <p className="text-2xl font-semibold mt-2">1246</p>
                  </div>
                  {/* Add more metric cards here */}
                </div>
              </section>

              {/* Trip Section */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Trip Starting</h2>
                  <button className="text-sm text-gray-600">View All</button>
                </div>
                {/* Add trip table here */}
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}