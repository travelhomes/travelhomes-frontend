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
                {[
                  { id: "caravan", label: "Caravan Rental", description: "Lorem ipsum text for better user experience" },
                  { id: "stays", label: "Stays", description: "Lorem ipsum text for better user experience" },
                  { id: "activity", label: "Activity", description: "Lorem ipsum text for better user experience" },
                ].map(({ id, label, description }) => (
                  <div key={id} className="relative">
                    <RadioGroupItem value={id} id={id} className="peer sr-only" />
                    <Label
                      htmlFor={id}
                      className={cn(
                        "flex items-start gap-4 rounded-lg border p-4 cursor-pointer relative transition-all",
                        selectedService === id 
                          ? "border-black bg-[#FDFDFD]" 
                          : "border-[#E7E8E9] bg-[#FDFDFD] hover:border-gray-300"
                      )}
                    >
                      <div className="flex-shrink-0 mt-1">
                        {id === "caravan" && <BusIcon />}
                        {id === "stays" && <StayIcon />}
                        {id === "activity" && <ActiveIcon />}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-base text-[#112211] mb-1">{label}</div>
                        <p className="text-sm text-[#112211] opacity-75">{description}</p>
                      </div>
                      <div
                        className={cn(
                          "flex-shrink-0 h-5 w-5 rounded-full border",
                          selectedService === id 
                            ? "border-black flex items-center justify-center"
                            : "border-[#717171]"
                        )}
                      >
                        {selectedService === id && (
                          <div className="h-3 w-3 rounded-full bg-black"></div>
                        )}
                      </div>
                    </Label>
                  </div>
                ))}
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

