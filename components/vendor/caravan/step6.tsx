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
import { AlertCircle } from "lucide-react";

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
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [finalPrice, setFinalPrice] = useState("");

  const [discountPercentageError, setDiscountPercentageError] = useState("");
  const [finalPriceError, setFinalPriceError] = useState("");

  const validateFields = () => {
    let valid = true;

    if (firstUserDiscount) {
      if (!discountPercentage.trim()) {
        setDiscountPercentageError("Discount Percentage is required.");
        valid = false;
      } else {
        setDiscountPercentageError("");
      }

      if (!finalPrice.trim()) {
        setFinalPriceError("Final Price is required.");
        valid = false;
      } else {
        setFinalPriceError("");
      }
    }

    return valid;
  };

  const handleNext = () => {
    if (validateFields()) {
      onNext();
    } else {
      // Optional (for safety)
      alert("Please fix the errors before proceeding.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="hidden md:block">
        <VendorBar />
      </div>

      <div className="flex md:hidden items-center justify-between px-4 sm:px-6 mt-10 mb-6">
        <Link
          href=""
          className="inline-flex items-center text-muted-foreground hover:text-primary"
        >
          <span className="mr-2">
            <ArrowRightIcon />
          </span>
        </Link>
        <div className="flex-grow flex justify-center">
          <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
        </div>
      </div>

      <div className="flex-grow px-4 sm:px-6 md:px-8 lg:px-[8em] pb-24 md:pb-32">
        <div className="py-4 sm:py-6 md:py-8 px-0 sm:px-4 md:px-6 lg:px-[7rem]">
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="text-2xl md:text-[32px] text-center font-semibold text-[#112211]">
                Types of Discount
              </h2>
            </div>

            <div className="w-full mx-auto bg-white rounded-lg overflow-hidden">
              <div className="border border-[#E7E8E9] rounded-[12px] mt-4">
                <div className="flex justify-between items-center p-4">
                  <p className="font-medium">First 5 User Discount</p>
                  <Switch
                    checked={firstUserDiscount}
                    onCheckedChange={setFirstUserDiscount}
                  />
                </div>

                {firstUserDiscount && (
                  <div className="border-t border-dashed grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white">
                    <div>
                      <label className="text-[#334054] block mb-2">
                        Discount Type
                      </label>
                      <Select
                        value={discountType}
                        onValueChange={setDiscountType}
                      >
                        <SelectTrigger className="h-[50px]">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Percentage">Percentage</SelectItem>
                          <SelectItem value="Fixed">Fixed Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-[#334054] block mb-2">
                        Discount Percentage{" "}
                        <span className="text-red-500">*</span>
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
                          className={`pl-8 h-[50px] ${
                            discountPercentageError
                              ? "border-red-500 focus:border-red-500"
                              : ""
                          }`}
                        />
                      </div>
                      {discountPercentageError && (
                        <div className="flex items-center mt-1 text-red-500 text-sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {discountPercentageError}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-[#334054] block mb-2">
                        Final Price <span className="text-red-500">*</span>
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
                          className={`pl-8 h-[50px] ${
                            finalPriceError
                              ? "border-red-500 focus:border-red-500"
                              : ""
                          }`}
                        />
                      </div>
                      {finalPriceError && (
                        <div className="flex items-center mt-1 text-red-500 text-sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {finalPriceError}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Other Offers */}
              <div className="flex justify-between items-center p-4 border border-[#E7E8E9] rounded-[12px] mt-4">
                <p className="font-medium">Festival Offers</p>
                <Switch
                  checked={festivalOffers}
                  onCheckedChange={setFestivalOffers}
                />
              </div>

              <div className="flex justify-between items-center p-4 border border-[#E7E8E9] rounded-[12px] mt-4">
                <p className="font-medium">Weekly or Monthly Offers</p>
                <Switch
                  checked={weeklyMonthlyOffers}
                  onCheckedChange={setWeeklyMonthlyOffers}
                />
              </div>

              <div className="flex justify-between items-center p-4 border border-[#E7E8E9] rounded-[12px] mt-4">
                <p className="font-medium">Special Offers</p>
                <Switch
                  checked={specialOffers}
                  onCheckedChange={setSpecialOffers}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Next Button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white px-4 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <Button
          onClick={handleNext}
          disabled={firstUserDiscount && (!discountPercentage || !finalPrice)}
          className="w-full bg-black text-white hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-[60px] py-[14px] px-[32px]"
        >
          Next
        </Button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex fixed bottom-0 left-0 right-0 bg-white justify-between items-center border-t border-[#E7E8E9] pt-6 pb-6 px-4 sm:px-6 md:px-8 lg:px-[7rem] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
        <StepNavigation
          onNext={handleNext}
          onBack={onBack}
          isFirstStep={false}
          isNextDisabled={
            firstUserDiscount && (!discountPercentage || !finalPrice)
          }
        />
      </div>
    </div>
  );
}
