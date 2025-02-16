"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ArrowRightIcon, BusIcon, StayIcon, ActiveIcon } from "@/public/assets/CustomIcon"

export default function ServiceSelection() {    
  const [selectedService, setSelectedService] = useState<string>("")
  const router = useRouter()

  const handleNext = () => {
    if (selectedService) {
      router.push(`/vendor/${selectedService}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-[80px] py-8 flex-1">
        <Link href="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowRightIcon />
          <span className="ml-2">Back to login</span>
        </Link>

        <div className="space-y-2 mb-8">
          <h1 className="text-2xl font-semibold text-[#112211]">Which service you are offering</h1>
          <p className="text-sm text-[#112211] opacity-75">Let&apos;s get you all set up so you can access your personal account</p>
        </div>

        <RadioGroup value={selectedService} onValueChange={setSelectedService} className="grid gap-6 md:grid-cols-3">
          {[
            { id: "caravan", label: "Caravan Rental", icon: BusIcon },
            { id: "stays", label: "Stays", icon: StayIcon },
            { id: "activity", label: "Activity", icon: ActiveIcon },
          ].map(({ id, label, icon: Icon }) => (
            <div key={id} className="relative">
              <RadioGroupItem value={id} id={id} className="peer sr-only" />
              <Label
                htmlFor={id}
                className={cn(
                  "flex flex-col gap-4 rounded-lg border-2 p-6 cursor-pointer relative transition-all h-[180px]",
                  selectedService === id 
                    ? "border-black bg-[#FDFDFD]" 
                    : "border-[#E7E8E9] bg-[#FDFDFD] hover:border-gray-300"
                )}
              >
                <div
                  className={cn(
                    "absolute right-4 top-4 h-5 w-5 rounded-full border-2",
                    selectedService === id 
                      ? "border-black after:absolute after:inset-0 after:m-auto after:h-2.5 after:w-2.5 after:rounded-full after:bg-black"
                      : "border-[#717171]"
                  )}
                />
                <Icon />
                <div>
                  <div className="font-medium text-[20px] mt-[10px] text-[#112211] mb-2">{label}</div>
                  <p className="text-sm text-[#112211] opacity-75">Lorem ipsum text for better user experience</p>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="border-t border-[#E7E8E9] p-6 flex justify-end">
        <Button 
          onClick={handleNext}
          disabled={!selectedService}
          className="bg-black text-white hover:bg-black/90 px-8 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

