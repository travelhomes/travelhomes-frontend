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
import Treehouse from "@/public/Tree_House.png"
import Activity from "@/public/activity.png"


export default function ServiceSelection() {    
  const [selectedService, setSelectedService] = useState<string>("")
  const router = useRouter()

  const handleNext = () => {
    if (selectedService) {
      router.push(`/vendor/${selectedService}`)
    }
  }

  const getServiceImage = () => {
    switch (selectedService) {
      case 'caravan':
        return VendorServiceIllustration
      case 'stays':
        return Treehouse
      case 'activity':
        return Activity
      default:
        return VendorServiceIllustration
    }
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden ">
      <div className="flex-1 px-6 md:p-[80px] overflow-hidden">
        <Link href="/auth/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-[40px]">
          <span className="mr-2">
            <ArrowRightIcon />
          </span>
          <span className="hidden md:block text-[14px] text-[#131313]">Back</span>
        </Link>

        <div className="flex flex-col md:flex-row h-[calc(100%-40px)] gap-8 md:gap-16">
          <div className="w-full md:w-1/2 flex flex-col h-full">
            <div className="mb-[32px]">
              <h2 className="text-[32px] mb-[10px] font-semibold text-[#112211]">Which service you are offering</h2>
              <p className="text-[18px] text-[#112211]">Let&apos;s get you all set up so you can start listing your services</p>
            </div>

            <div className="flex-1">
              <RadioGroup value={selectedService} onValueChange={setSelectedService} className="space-y-3">
                <div className="relative">
                  <RadioGroupItem value="caravan" id="caravan" className="peer sr-only" />
                  <Label
                    htmlFor="caravan"
                    className={cn(
                      "flex items-center rounded-lg border p-3 cursor-pointer relative transition-all h-[110px] mb-[4px]",
                      selectedService === "caravan" 
                        ? "border-black bg-[#FDFDFD]" 
                        : "border-[#E7E8E9] bg-[#FDFDFD] hover:border-gray-300"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-3 right-3 h-5 w-5 rounded-full border",
                        selectedService === "caravan" 
                          ? "border-black flex items-center justify-center"
                          : "border-[#717171]"
                      )}
                    >
                      {selectedService === "caravan" && (
                        <div className="h-3 w-3 rounded-full bg-black"></div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex-shrink-0 mr-[20px]">
                        <BusIcon />
                      </div>
                      <div>
                        <div className="font-medium mb-[8px] text-[20px] text-[#112211]">Caravan Rental</div>
                        <p className="text-[16px] text-[#112211] opacity-75 mt-1">Lorem Ipsum text for better user experience</p>
                      </div>
                    </div>
                  </Label>
                </div>

                <div className="relative">
                  <RadioGroupItem value="stays" id="stays" className="peer sr-only" />
                  <Label
                    htmlFor="stays"
                    className={cn(
                      "flex items-center gap-4 rounded-lg border p-3 cursor-pointer relative transition-all h-[110px] mb-[4px]",
                      selectedService === "stays" 
                        ? "border-black bg-[#FDFDFD]" 
                        : "border-[#E7E8E9] bg-[#FDFDFD] hover:border-gray-300"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-3 right-3 h-5 w-5 rounded-full border",
                        selectedService === "stays" 
                          ? "border-black flex items-center justify-center"
                          : "border-[#717171]"
                      )}
                    >
                      {selectedService === "stays" && (
                        <div className="h-3 w-3 rounded-full bg-black"></div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex-shrink-0 mr-[20px]">
                        <StayIcon />
                      </div>
                      <div>
                        <div className="font-medium mb-[8px] text-[20px] text-[#112211]">Stays</div>
                        <p className="text-[16px] text-[#112211] opacity-75 mt-1">Lorem Ipsum text for better user experience</p>
                      </div>
                    </div>
                  </Label>
                </div>

                <div className="relative">
                  <RadioGroupItem value="activity" id="activity" className="peer sr-only" />
                  <Label
                    htmlFor="activity"
                    className={cn(
                      "flex items-center gap-4 rounded-lg border p-3 cursor-pointer relative transition-all h-[110px]",
                      selectedService === "activity" 
                        ? "border-black bg-[#FDFDFD]" 
                        : "border-[#E7E8E9] bg-[#FDFDFD] hover:border-gray-300"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-3 right-3 h-5 w-5 rounded-full border",
                        selectedService === "activity" 
                          ? "border-black flex items-center justify-center"
                          : "border-[#717171]"
                      )}
                    >
                      {selectedService === "activity" && (
                        <div className="h-3 w-3 rounded-full bg-black"></div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex-shrink-0 mr-[20px]">
                        <ActiveIcon />
                      </div>
                      <div>
                        <div className="font-medium text-[20px] mb-[8px] text-[#112211]">Activity</div>
                        <p className="text-[16px] text-[#112211] opacity-75 mt-1">Lorem Ipsum text for better user experience</p>
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>


            <div className="mb-[4rem] w-full">
              <Button 
                onClick={handleNext}
                disabled={!selectedService}
                className="bg-black text-white hover:bg-black/90 rounded-full py-[14px] px-[32px] disabled:opacity-50 disabled:cursor-not-allowed h-[50px] mt-4 w-full md:w-auto"
              >
                <span className="md:hidden">Next</span>
                <span className="hidden md:inline">Click Here to continue</span>
              </Button>
            </div>
          </div>


          <div className="hidden md:flex md:w-1/2 items-center justify-center">
            <div className="relative w-full h-[500px]">
              <Image 
                src={getServiceImage()} 
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
