"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import StepProgress from "../StepProgress";
import StepNavigation from "../StepNavigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import VendorBar from "./vendorbar";
import Link from "next/link";
import { ArrowRightIcon } from "@/public/assets/CustomIcon";
import { Button } from "@/components/ui/button";

interface Step6Props {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function Step6({
  onNext,
  onBack,
  currentStep,
  totalSteps,
}: Step6Props) {
  const [firstUserDiscount, setFirstUserDiscount] = useState(true);
  const [festivalOffers, setFestivalOffers] = useState(false);
  const [weeklyMonthlyOffers, setWeeklyMonthlyOffers] = useState(false);
  const [specialOffers, setSpecialOffers] = useState(false);
  const [discountType, setDiscountType] = useState("Percentage");
  const [discountPercentage, setDiscountPercentage] = useState("2000");
  const [finalPrice, setFinalPrice] = useState("2000");

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
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="text-2xl md:text-[32px] text-center font-semibold text-[#112211]">
                Types of Discount
              </h2>
            </div>

            <div className="w-full max-w-3xl mx-auto bg-white rounded-lg overflow-hidden">
              <div className="border border-[#E7E8E9] rounded-[12px] mt-4">
                {/* First 5 User Discount */}
                <div className="flex justify-between items-center p-4 ">
                  <div>
                    <p className="text-sm font-medium">First 5 User Discount</p>
                  </div>
                  <Switch
                    checked={firstUserDiscount}
                    onCheckedChange={setFirstUserDiscount}
                  />
                </div>

                {/* Discount Configuration Row - Only visible if firstUserDiscount is true */}
                {firstUserDiscount && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white">
                    <div>
                      <label className="text-sm text-gray-600 block mb-2">
                        Discount Type
                      </label>
                      <Select
                        value={discountType}
                        onValueChange={setDiscountType}
                      >
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Percentage">Percentage</SelectItem>
                          <SelectItem value="Fixed">Fixed Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-2">
                        Discount Percentage
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          ₹
                        </span>
                        <Input
                          value={discountPercentage}
                          onChange={(e) =>
                            setDiscountPercentage(
                              e.target.value.replace(/[^0-9]/g, "")
                            )
                          }
                          className="pl-8 h-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-2">
                        Final Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          ₹
                        </span>
                        <Input
                          value={finalPrice}
                          onChange={(e) =>
                            setFinalPrice(e.target.value.replace(/[^0-9]/g, ""))
                          }
                          className="pl-8 h-10"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Festival Offers */}
              <div className="flex justify-between items-center p-4 border border-[#E7E8E9] rounded-[12px] mt-4">
                <div>
                  <p className="text-sm font-medium">Festival Offers</p>
                </div>
                <Switch
                  checked={festivalOffers}
                  onCheckedChange={setFestivalOffers}
                />
              </div>

              {/* Weekly or Monthly Offers */}
              <div className="flex justify-between items-center p-4 border border-[#E7E8E9] rounded-[12px] mt-4">
                <div>
                  <p className="text-sm font-medium">Weekly or Monthly Offers</p>
                </div>
                <Switch
                  checked={weeklyMonthlyOffers}
                  onCheckedChange={setWeeklyMonthlyOffers}
                />
              </div>

              {/* Special Offers */}
              <div className="flex justify-between items-center p-4 border border-[#E7E8E9] rounded-[12px] mt-4">
                <div>
                  <p className="text-sm font-medium">Special Offers</p>
                </div>
                <Switch
                  checked={specialOffers}
                  onCheckedChange={setSpecialOffers}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Full width Next button - fixed at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white px-4 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <Button
          onClick={onNext}
          className="w-full bg-black text-white hover:bg-black/90 rounded-[60px] py-[14px] px-[32px]"
        >
          Next
        </Button>
      </div>

      {/* Desktop: Original navigation with progress and next/back buttons - fixed at bottom */}
      <div className="hidden md:flex fixed bottom-0 left-0 right-0 bg-white justify-between items-center border-t border-[#E7E8E9] pt-6 pb-6 px-4 sm:px-6 md:px-8 lg:px-[7rem] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <StepProgress 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
        />
        <StepNavigation 
          onNext={onNext}
          onBack={onBack}
          isFirstStep={false}
          isNextDisabled={false}
        />
      </div>
    </div>
  );
}
