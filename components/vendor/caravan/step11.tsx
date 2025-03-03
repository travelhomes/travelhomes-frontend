"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import VendorBar from "./vendorbar"
interface Step11Props {
  onBack: () => void;
}

export default function Step11({ onBack }: Step11Props) {
  return (
    <div className="fixed inset-0 flex flex-col bg-white">
        <VendorBar />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-md w-full mx-auto">
          {/* Party popper icon */}
          <div className="flex justify-center mb-6">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <span className="text-4xl">🎉</span>
            </div>
          </div>
          
          {/* Congratulations text */}
          <h1 className="text-2xl font-semibold text-center mb-3">
            Congratulations!
          </h1>
          
          <p className="text-center text-gray-700 mb-8 text-sm">
            Thank you for submitting your camper van listing! Our team is reviewing the details to ensure it meets our
            quality standards. We&apos;ll notify you via email as soon as your listing goes live.
          </p>
          
          {/* What happens next section */}
          <div className="mb-16">
            <h2 className="font-medium mb-3">What happen next?</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-black mr-2">•</span>
                <span className="text-gray-700">Our team will review your listing within 24-48 hours. In some cases it may take up to seven working days.</span>
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">•</span>
                <span className="text-gray-700">Once approved, your camper van will be live and ready for bookings.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom navigation */}
      <div className="border-t py-4 px-6 flex justify-between items-center">
        <Button
          onClick={onBack}
          variant="ghost"
          className="flex items-center text-gray-600 hover:bg-transparent hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 px-6"
          >
            Edit
          </Button>
          
          <Link href="/">
            <Button
              className="bg-black text-white hover:bg-black/90 rounded-full px-6"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}