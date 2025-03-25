'use client';

import { Suspense } from 'react';
import { Sidebar, Header } from "@/components/dashboard";
import { ProfileContent } from "@/components/dashboard/content";

export default function ProfilePage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Profile" />
        <main className="flex-1 overflow-auto bg-[#F9FAFB] p-6">
          <Suspense fallback={<div>Loading...</div>}>
            <ProfileContent />
          </Suspense>
        </main>
      </div>
    </div>
  );
} 