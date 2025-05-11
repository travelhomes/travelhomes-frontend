"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X, AlertCircle } from "lucide-react";
import StepProgress from "../StepProgress";
import StepNavigation from "../StepNavigation";
import VendorBar from "./vendorbar";
import Link from "next/link";
import { ArrowRightIcon } from "@/public/assets/CustomIcon";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Step5Props {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function Step5({
  onNext,
  onBack,
  currentStep,
  totalSteps,
}: Step5Props) {
  const [price, setPrice] = useState("5,934");
  const [priceError, setPriceError] = useState("");
  const [includes, setIncludes] = useState<string[]>([]);
  const [excludes, setExcludes] = useState<string[]>([]);
  const [includeInputs, setIncludeInputs] = useState<string[]>([""]);
  const [excludeInputs, setExcludeInputs] = useState<string[]>([""]);
  const [includeErrors, setIncludeErrors] = useState<string[]>([""]);
  const [excludeErrors, setExcludeErrors] = useState<string[]>([""]);
  const [formValid, setFormValid] = useState(true);

  // Validate price on every change
  useEffect(() => {
    validatePrice(price);
    checkFormValidity();
  }, [price, includes, excludes]);

  const validatePrice = (value: string) => {
    if (!value.trim()) {
      setPriceError("Price is required");
      return false;
    }

    // Check if price has valid format (only digits and commas)
    if (!/^[0-9,]+$/.test(value)) {
      setPriceError("Price should only contain digits and commas");
      return false;
    }

    setPriceError("");
    return true;
  };

  const checkFormValidity = () => {
    const isPriceValid = price.trim() !== "" && !priceError;
    setFormValid(isPriceValid);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9,]/g, "");
    setPrice(value);
  };

  const handleIncludeChange = (value: string, index: number) => {
    const newInputs = [...includeInputs];
    newInputs[index] = value;
    setIncludeInputs(newInputs);

    // Clear error when user starts typing
    const newErrors = [...includeErrors];
    newErrors[index] = "";
    setIncludeErrors(newErrors);
  };

  const handleExcludeChange = (value: string, index: number) => {
    const newInputs = [...excludeInputs];
    newInputs[index] = value;
    setExcludeInputs(newInputs);

    // Clear error when user starts typing
    const newErrors = [...excludeErrors];
    newErrors[index] = "";
    setExcludeErrors(newErrors);
  };

  const validateIncludeInput = (value: string, index: number): boolean => {
    const newErrors = [...includeErrors];

    if (!value.trim()) {
      newErrors[index] = "Item cannot be empty";
      setIncludeErrors(newErrors);
      return false;
    }

    if (includes.includes(value.trim())) {
      newErrors[index] = "Item already exists";
      setIncludeErrors(newErrors);
      return false;
    }

    newErrors[index] = "";
    setIncludeErrors(newErrors);
    return true;
  };

  const validateExcludeInput = (value: string, index: number): boolean => {
    const newErrors = [...excludeErrors];

    if (!value.trim()) {
      newErrors[index] = "Item cannot be empty";
      setExcludeErrors(newErrors);
      return false;
    }

    if (excludes.includes(value.trim())) {
      newErrors[index] = "Item already exists";
      setExcludeErrors(newErrors);
      return false;
    }

    newErrors[index] = "";
    setExcludeErrors(newErrors);
    return true;
  };

  const commitInclude = (index: number) => {
    const item = includeInputs[index].trim();
    if (!validateIncludeInput(item, index)) return;

    setIncludes((prev) => [...prev, item]);
    handleIncludeChange("", index);
  };

  const commitExclude = (index: number) => {
    const item = excludeInputs[index].trim();
    if (!validateExcludeInput(item, index)) return;

    setExcludes((prev) => [...prev, item]);
    handleExcludeChange("", index);
  };

  const addIncludeInput = () => {
    // Check if the last input is not empty before adding a new one
    const lastIndex = includeInputs.length - 1;
    if (includeInputs[lastIndex].trim() !== "") {
      setIncludeInputs([...includeInputs, ""]);
      setIncludeErrors([...includeErrors, ""]);
    } else {
      // Show error for the last input if it's empty
      const newErrors = [...includeErrors];
      newErrors[lastIndex] = "Please fill this item first";
      setIncludeErrors(newErrors);
    }
  };

  const addExcludeInput = () => {
    // Check if the last input is not empty before adding a new one
    const lastIndex = excludeInputs.length - 1;
    if (excludeInputs[lastIndex].trim() !== "") {
      setExcludeInputs([...excludeInputs, ""]);
      setExcludeErrors([...excludeErrors, ""]);
    } else {
      // Show error for the last input if it's empty
      const newErrors = [...excludeErrors];
      newErrors[lastIndex] = "Please fill this item first";
      setExcludeErrors(newErrors);
    }
  };

  const removeInclude = (index: number) => {
    setIncludes((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExclude = (index: number) => {
    setExcludes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    // Validate all fields before proceeding
    const isPriceValid = validatePrice(price);

    if (isPriceValid) {
      onNext();
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${plusJakartaSans.className}`}>
      {/* Vendor Bar */}
      <div className="hidden md:block">
        <VendorBar />
      </div>

      {/* Mobile Top Navigation */}
      <div className="flex md:hidden items-center justify-between px-4 sm:px-6 mt-10 mb-6">
        <Link
          href=""
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <span className="mr-2">
            <ArrowRightIcon />
          </span>
        </Link>
        <div className="flex-grow flex justify-center">
          <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow px-4 sm:px-6 md:px-8 lg:px-[8em] pb-24 md:pb-32">
        <div className="py-4 sm:py-6 md:py-8 px-0 sm:px-4 md:px-6 lg:px-[7rem] flex justify-center">
          <div className="space-y-6 md:space-y-8 w-full max-w-[800px]">
            <h2 className="text-2xl mb-[36px] md:text-[32px] text-center font-semibold text-[#112211]">
              Pricing Details
            </h2>

            <div className="space-y-6">
              {/* Price */}
              <div>
                <label className="text-[#334054] block mb-2">
                  Regular Price (in Rupees){" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span
                    className={`absolute left-3 -translate-y-1/2 text-gray-700 font-medium 
                    ${priceError ? "top-1/3" : "top-1/2"}`}
                  >
                    ₹
                  </span>
                  <Input
                    value={price}
                    onChange={handlePriceChange}
                    onBlur={() => validatePrice(price)}
                    className={`pl-8 border h-10 bg-white font-medium focus:ring-0 ${
                      priceError
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#E7E8E9] focus:border-[#B0B0B0]"
                    }`}
                  />
                  {priceError && (
                    <div className="flex items-center mt-1 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      <span>{priceError}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Includes Section */}
              <div>
                <label className="text-[#334054] block mb-2">
                  Above price includes
                </label>

                <div className="space-y-2">
                  {includes.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-[#f9f9f9] rounded px-3 py-2 border"
                    >
                      <span className="text-sm text-gray-800">{item}</span>
                      <button onClick={() => removeInclude(index)}>
                        <X className="w-4 h-4 text-gray-500 hover:text-black" />
                      </button>
                    </div>
                  ))}
                  {includeInputs.map((value, index) => (
                    <div key={index} className="space-y-1">
                      <Input
                        placeholder="Add item..."
                        value={value}
                        onChange={(e) =>
                          handleIncludeChange(e.target.value, index)
                        }
                        onBlur={() => {
                          if (value.trim()) {
                            validateIncludeInput(value, index);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            commitInclude(index);
                          }
                        }}
                        className={`border-[#E7E8E9] h-10 bg-white focus:ring-0 ${
                          includeErrors[index]
                            ? "border-red-500 focus:border-red-500"
                            : "focus:border-[#B0B0B0]"
                        }`}
                      />
                      {includeErrors[index] && (
                        <div className="flex items-center text-red-500 text-sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          <span>{includeErrors[index]}</span>
                        </div>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addIncludeInput}
                    className="mt-2 text-sm flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add More
                  </Button>
                </div>
              </div>

              {/* Excludes Section */}
              <div>
                <label className="text-[#334054] block mb-2">
                  Below price excludes
                </label>

                <div className="space-y-2">
                  {excludes.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-[#f9f9f9] rounded px-3 py-2 border"
                    >
                      <span className="text-sm text-gray-800">{item}</span>
                      <button onClick={() => removeExclude(index)}>
                        <X className="w-4 h-4 text-gray-500 hover:text-black" />
                      </button>
                    </div>
                  ))}
                  {excludeInputs.map((value, index) => (
                    <div key={index} className="space-y-1">
                      <Input
                        placeholder="Add item..."
                        value={value}
                        onChange={(e) =>
                          handleExcludeChange(e.target.value, index)
                        }
                        onBlur={() => {
                          if (value.trim()) {
                            validateExcludeInput(value, index);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            commitExclude(index);
                          }
                        }}
                        className={`border-[#E7E8E9] h-10 bg-white focus:ring-0 ${
                          excludeErrors[index]
                            ? "border-red-500 focus:border-red-500"
                            : "focus:border-[#B0B0B0]"
                        }`}
                      />
                      {excludeErrors[index] && (
                        <div className="flex items-center text-red-500 text-sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          <span>{excludeErrors[index]}</span>
                        </div>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addExcludeInput}
                    className="mt-2 text-sm flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white px-4 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <Button
          onClick={handleNext}
          disabled={!formValid}
          className={`w-full ${
            formValid
              ? "bg-black text-white hover:bg-black/90"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          } rounded-[60px] py-[14px] px-[32px]`}
        >
          Next
        </Button>
      </div>

      {/* Desktop Footer */}
      <div className="hidden md:flex fixed bottom-0 left-0 right-0 bg-white justify-between items-center border-t border-[#E7E8E9] pt-6 pb-6 px-4 sm:px-6 md:px-8 lg:px-[7rem] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
        <StepNavigation
          onNext={handleNext}
          onBack={onBack}
          isFirstStep={false}
          isNextDisabled={!formValid}
        />
      </div>
    </div>
  );
}
