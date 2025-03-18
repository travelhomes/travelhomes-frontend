"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import VendorBar from "./vendorbar"
import { ArrowRightIcon } from "@/public/assets/CustomIcon";
import StepProgress from "../StepProgress";

interface Step11Props {
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function Step11({ onBack, currentStep, totalSteps }: Step11Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="hidden md:block">
        <VendorBar />
      </div>

      {/* Mobile: Top navigation with back button and progress bar */}
      <div className="flex md:hidden items-center justify-between px-4 sm:px-6 mt-10 mb-6">
        <Link href="" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
          <span className="mr-2">
            <ArrowRightIcon />
          </span>
        </Link>
        
        <div className="flex-grow flex justify-center">
          <StepProgress 
            currentStep={currentStep} 
            totalSteps={totalSteps} 
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow px-4 sm:px-6 md:px-8 lg:px-[8em] pb-24 md:pb-32">
        <div className="py-4 sm:py-6 md:py-8 px-0 sm:px-4 md:px-6 lg:px-[7rem]">
          <div className="flex flex-col items-center justify-center">
            <div className="w-[890px] mx-auto">
              {/* Party popper icon */}
              <div className="flex justify-center mb-6">
                <div className="relative flex items-center justify-center">
                  <span className=" text-[100px]">🎉</span>
                </div>
              </div>
              
              {/* Congratulations text */}
              <h1 className="text-2xl md:text-[32px] font-semibold text-center mb-[15px] text-[#131313] ">
                Congratulations!
              </h1>
              
              <p className="text-center text-[#334054] text-[18px] mb-[50px]">
                Thank you for submitting your camper van listing! Our team is reviewing the details to ensure it meets our
                quality standards. We&apos;ll notify you via email as soon as your listing goes live.
              </p>
              
              {/* What happens next section */}
              <div className="mb-16">
                <h2 className="font-medium text-[24px] text-[#131313] mb-3">What happens next?</h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-black mr-2">•</span>
                    <span className="text-[#334054]">Our team will review your listing within 24-48 hours. In some cases it may take up to seven working days.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-black mr-2">•</span>
                    <span className="text-[#334054]">Once approved, your camper van will be live and ready for bookings.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile: Full width Home button - fixed at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white px-4 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <Link href="/" className="block w-full">
          <Button
            className="w-full bg-black text-white hover:bg-black/90 rounded-[60px] py-[14px] px-[32px]"
          >
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Desktop: Bottom navigation - fixed at bottom */}
      <div className="hidden md:flex fixed bottom-0 left-0 right-0 bg-white justify-end items-center border-t border-[#E7E8E9] pt-6 pb-6 px-4 sm:px-6 md:px-8 lg:px-[7rem] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
       
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="rounded-[60px] border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-[25px]"
          >
            Edit
          </Button>
          
          <Link href="/">
            <Button
              className="bg-black text-white hover:bg-black/90 rounded-[60px] px-6 py-[25px]"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}