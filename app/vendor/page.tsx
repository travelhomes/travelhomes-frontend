"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ArrowRightIcon, BusIcon, StayIcon, ActiveIcon } from "@/public/assets/CustomIcon"
import Image from "next/image"
import VendorServiceIllustration from "@/public/Vendor.png"


export default function ServiceSelection() {    
  const [selectedService, setSelectedService] = useState<string>("")
  const router = useRouter()

  const handleNext = () => {
    if (selectedService) {
      router.push(`/vendor/${selectedService}`)
    }
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-1 px-6 md:p-[80px] overflow-hidden">
        <Link href="/auth/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
          <span className="mr-2">
            <ArrowRightIcon />
          </span>
          <span>Back</span>
        </Link>

        <div className="flex flex-col md:flex-row h-[calc(100%-40px)] gap-8 md:gap-16 overflow-hidden">
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-[#112211]">Which service you are offering</h2>
              <p className="text-sm text-[#112211] opacity-75">Let&apos;s get you all set up so you can access your personal account</p>
            </div>

            <div className="flex-1 overflow-auto pr-2">
              <RadioGroup value={selectedService} onValueChange={setSelectedService} className="space-y-4">
                <div className="relative">
                  <RadioGroupItem value="caravan" id="caravan" className="peer sr-only" />
                  <Label
                    htmlFor="caravan"
                    className={cn(
                      "flex items-center gap-4 rounded-lg border p-4 cursor-pointer relative transition-all",
                      selectedService === "caravan" 
                        ? "border-black bg-[#FDFDFD]" 
                        : "border-[#E7E8E9] bg-[#FDFDFD] hover:border-gray-300"
                    )}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex-shrink-0">
                        <BusIcon />
                      </div>
                      <div className="font-medium text-base text-[#112211]">Outdoor Games</div>
                    </div>
                    <div
                      className={cn(
                        "flex-shrink-0 h-5 w-5 rounded-full border",
                        selectedService === "caravan" 
                          ? "border-black flex items-center justify-center"
                          : "border-[#717171]"
                      )}
                    >
                      {selectedService === "caravan" && (
                        <div className="h-3 w-3 rounded-full bg-black"></div>
                      )}
                    </div>
                  </Label>
                </div>

                <div className="relative">
                  <RadioGroupItem value="stays" id="stays" className="peer sr-only" />
                  <Label
                    htmlFor="stays"
                    className={cn(
                      "flex items-center gap-4 rounded-lg border p-4 cursor-pointer relative transition-all",
                      selectedService === "stays" 
                        ? "border-black bg-[#FDFDFD]" 
                        : "border-[#E7E8E9] bg-[#FDFDFD] hover:border-gray-300"
                    )}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex-shrink-0">
                        <StayIcon />
                      </div>
                      <div className="font-medium text-base text-[#112211]">Stays</div>
                    </div>
                    <div
                      className={cn(
                        "flex-shrink-0 h-5 w-5 rounded-full border",
                        selectedService === "stays" 
                          ? "border-black flex items-center justify-center"
                          : "border-[#717171]"
                      )}
                    >
                      {selectedService === "stays" && (
                        <div className="h-3 w-3 rounded-full bg-black"></div>
                      )}
                    </div>
                  </Label>
                </div>

                <div className="relative">
                  <RadioGroupItem value="activity" id="activity" className="peer sr-only" />
                  <Label
                    htmlFor="activity"
                    className={cn(
                      "flex items-center gap-4 rounded-lg border p-4 cursor-pointer relative transition-all",
                      selectedService === "activity" 
                        ? "border-black bg-[#FDFDFD]" 
                        : "border-[#E7E8E9] bg-[#FDFDFD] hover:border-gray-300"
                    )}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex-shrink-0">
                        <ActiveIcon />
                      </div>
                      <div className="font-medium text-base text-[#112211]">Activity</div>
                    </div>
                    <div
                      className={cn(
                        "flex-shrink-0 h-5 w-5 rounded-full border",
                        selectedService === "activity" 
                          ? "border-black flex items-center justify-center"
                          : "border-[#717171]"
                      )}
                    >
                      {selectedService === "activity" && (
                        <div className="h-3 w-3 rounded-full bg-black"></div>
                      )}
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mt-6">
              <Button 
                onClick={handleNext}
                disabled={!selectedService}
                className="bg-black text-white hover:bg-black/90 rounded-full py-3 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Click Here to continue
              </Button>
            </div>
          </div>

          <div className="hidden md:flex md:w-1/2 items-center justify-center">
            <div className="relative w-full aspect-square">
              <Image 
                src={VendorServiceIllustration} 
                alt="Service illustration" 
                fill 
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

