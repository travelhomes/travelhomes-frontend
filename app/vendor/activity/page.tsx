"use client"

import Link from "next/link"
import { ArrowRightIcon } from "@/public/assets/CustomIcon"

export default function ActivityRegistration() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-[80px] py-8 flex-1">
        <Link href="/vendor" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowRightIcon />
          <span className="ml-2">Back to service selection</span>
        </Link>

        <div className="space-y-2 mb-8">
          <h1 className="text-2xl font-semibold text-[#112211]">Register your Activity</h1>
          <p className="text-sm text-[#112211] opacity-75">Let&apos;s get your activity listed on our platform</p>
        </div>

        {/* Add activity registration form here */}
      </div>
    </div>
  )
} 