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
    <div className="fixed inset-0 flex flex-col">
      {/* Space for app bar */}
      <div className="h-16"></div>

      <div className="flex-1 px-4 md:px-20 lg:px-40 overflow-hidden h-full">
        <div className="h-full flex flex-col">
            <div className="mt-6 mb-8">
              <h2 className="text-xl md:text-2xl text-center font-semibold text-[#112211]">
                Types of Discount
              </h2>
            </div>

            <div className="w-full max-w-3xl mx-auto bg-white rounded-lg  overflow-hidden">
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
                <div className="grid grid-cols-3 gap-4 p-4 bg-white">
                  <div>
                    <label className="text-sm text-gray-600 block mb-2">
                      Discount Type
                    </label>
                    <Select
                      value={discountType}
                      onValueChange={setDiscountType}
                    >
                      <SelectTrigger className=" h-10">
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

      {/* Navigation */}
      <div className="border-t border-[#E7E8E9] pt-3 pb-3 px-4">
        <div className="flex justify-between items-center">
          <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
          <StepNavigation
            onNext={onNext}
            onBack={onBack}
            isFirstStep={false}
            isNextDisabled={false}
          />
        </div>
      </div>
    </div>
  );
}
