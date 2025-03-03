"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import TermsIllustration from "@/public/terms&conditions.png"

interface Step9Props {
  onNext: () => void;
}

export default function Step9({ onNext }: Step9Props) {

  const handleStartVerification = () => {
    onNext()
  }

  return (
    <div className="fixed inset-0 flex flex-col">
      {/* Space for app bar */}
      <div className="h-16"></div>

      <div className="flex-1 overflow-auto">
        <div className="h-full flex flex-col justify-center items-center py-8 px-4 md:px-8">
          <div className="w-full max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
              {/* Left side - Terms text */}
              <div className="w-full md:w-1/2 flex flex-col items-center text-center md:text-left md:items-start max-w-xl mx-auto">
                <h2 className="text-xl md:text-2xl font-semibold text-[#112211] mb-4">
                  Terms & Conditions for Verification
                </h2>
                
                <p className="text-sm text-gray-600 mb-8">
                  By proceeding with the verification process on <span className="font-medium">Travel Homes</span>, you agree to 
                  the following terms and conditions:
                </p>

                <div className="space-y-6 w-full">
                  <div>
                    <p className="text-sm font-medium"> 1. Accurate Information - <span className="text-gray-600"> Provide truthful details false information may lead to account suspension.</span>  </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium"> 2. Data Usage & Security - <span className="text-gray-600"> Your data is securely stored and used only for verification; third-party services may assist in the process.</span>  </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium"> 3. Verification Rights - <span className="text-gray-600"> We may deny verification if information is invalid, and terms are subject to updates.</span>  </p>
                  </div>
                </div>

                <div className="mt-10">
                  <Button
                    onClick={handleStartVerification}
                    className="bg-black text-white hover:bg-black/90 rounded-full py-3 px-6"
                  >
                    Start Verification
                  </Button>
                </div>
              </div>

              {/* Right side - Illustration */}
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-square">
                  <Image 
                    src={TermsIllustration} 
                    alt="Terms illustration" 
                    fill 
                    className="object-contain"
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNGMEYxRjMiLz48cGF0aCBkPSJNMjAwIDIwMEMyMzEuMzcxIDIwMCAyNTcgMTc0LjM3MSAyNTcgMTQzQzI1NyAxMTEuNjI5IDIzMS4zNzEgODYgMjAwIDg2QzE2OC42MjkgODYgMTQzIDExMS42MjkgMTQzIDE0M0MxNDMgMTc0LjM3MSAxNjguNjI5IDIwMCAyMDAgMjAwWiIgZmlsbD0iI0Q5RDlEOSIvPjxwYXRoIGQ9Ik0zMDAgMzE0QzMwMCAyNzEuNDYyIDI2NS43ODUgMjM3IDIyMyAyMzdIMTc3QzEzNC4yMTUgMjM3IDEwMCAyNzEuNDYyIDEwMCAzMTRWMzE0SDMwMFYzMTRaIiBmaWxsPSIjRDlEOUQ5Ii8+PC9zdmc+";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

