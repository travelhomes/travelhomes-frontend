"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import StepProgress from "../StepProgress";
import StepNavigation from "../StepNavigation";
import VendorBar from "./vendorbar";
import Link from "next/link";
import { ArrowRightIcon } from "@/public/assets/CustomIcon";
import { Button } from "@/components/ui/button";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Calendar } from "@/components/landingPage/searchcomponents/calendar";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Step7Props {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function Step7({
  onNext,
  onBack,
  currentStep,
  totalSteps,
}: Step7Props) {
  const [formData, setFormData] = useState({
    brandName: "",
    legalCompanyName: "",
    gstNumber: "",
    businessEmailId: "",
    businessPhoneNumber: "",
    businessAddress: "",
    state: "",
    city: "",
    pincode: "",
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.brandName.trim())
      errors.brandName = "Brand Name is required.";
    if (!formData.legalCompanyName.trim())
      errors.legalCompanyName = "Legal Company Name is required.";
    if (!formData.gstNumber.trim())
      errors.gstNumber = "GST Number is required.";
    else if (!/^[0-9A-Z]{15}$/.test(formData.gstNumber))
      errors.gstNumber = "Enter a valid 15-character GST number.";

    if (!formData.businessEmailId.trim())
      errors.businessEmailId = "Business Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.businessEmailId))
      errors.businessEmailId = "Invalid email format.";

    if (!formData.businessPhoneNumber.trim())
      errors.businessPhoneNumber = "Phone number is required.";
    else if (!/^\d{10}$/.test(formData.businessPhoneNumber))
      errors.businessPhoneNumber = "Phone number must be 10 digits.";

    if (!formData.businessAddress.trim())
      errors.businessAddress = "Business Address is required.";
    if (!formData.state.trim()) errors.state = "State is required.";
    if (!formData.city.trim()) errors.city = "City is required.";
    if (!formData.pincode.trim()) errors.pincode = "Pincode is required.";
    else if (!/^\d{6}$/.test(formData.pincode))
      errors.pincode = "Pincode must be 6 digits.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${plusJakartaSans.className}`}>
      <div className="hidden md:block">
        <VendorBar />
      </div>

      {/* Mobile navigation */}
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

      {/* Main form */}
      <div className="flex-grow px-4 sm:px-6 md:px-8 lg:px-[8em] pb-24 md:pb-32">
        <div className="py-4 sm:py-6 md:py-8 px-0 sm:px-4 md:px-6 lg:px-[7rem] flex justify-center">
          <div className="space-y-6 md:space-y-8 w-full max-w-[890px]">
            <h2 className="text-2xl mb-[50px] md:text-[32px] text-center font-semibold text-[#112211]">
              Business Details
            </h2>

            <div className="space-y-6">
              {/* Brand and Company Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-600 block mb-2">Brand Name</label>
                  <Input
                    name="brandName"
                    value={formData.brandName}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="border-[#E7E8E9] h-10"
                  />
                  {formErrors.brandName && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.brandName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-gray-600 block mb-2">
                    Legal Company Name
                  </label>
                  <Input
                    name="legalCompanyName"
                    value={formData.legalCompanyName}
                    onChange={handleInputChange}
                    placeholder="Company Name"
                    className="border-[#E7E8E9] h-10"
                  />
                  {formErrors.legalCompanyName && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.legalCompanyName}
                    </p>
                  )}
                </div>
              </div>

              {/* GST and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-600 block mb-2">GST Number</label>
                  <Input
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                    placeholder="XXXXXXXX"
                    className="border-[#E7E8E9] h-10"
                  />
                  {formErrors.gstNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.gstNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-gray-600 block mb-2">
                    Business Email ID
                  </label>
                  <Input
                    name="businessEmailId"
                    value={formData.businessEmailId}
                    onChange={handleInputChange}
                    placeholder="example@mail.com"
                    className="border-[#E7E8E9] h-10"
                  />
                  {formErrors.businessEmailId && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.businessEmailId}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="text-gray-600 block mb-2">
                  Business Phone number
                </label>
                <div className="flex">
                  <div className="flex items-center border border-[#E7E8E9] rounded-l-md px-3 bg-white">
                    <span className="mr-4">🇮🇳</span>
                    <span className="text-[#98A2B3]">+91</span>
                  </div>
                  <Input
                    name="businessPhoneNumber"
                    value={formData.businessPhoneNumber}
                    onChange={handleInputChange}
                    placeholder="83443-52234"
                    className="border-[#E7E8E9] h-10 rounded-l-none"
                  />
                </div>
                {formErrors.businessPhoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.businessPhoneNumber}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="text-gray-600 block mb-2">
                  Business Address
                </label>
                <Input
                  name="businessAddress"
                  value={formData.businessAddress}
                  onChange={handleInputChange}
                  placeholder="Locality"
                  className="border-[#E7E8E9] h-10"
                />
                {formErrors.businessAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.businessAddress}
                  </p>
                )}
              </div>

              {/* State, City, Pincode */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Input
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="border-[#E7E8E9] h-10"
                  />
                  {formErrors.state && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.state}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="border-[#E7E8E9] h-10"
                  />
                  {formErrors.city && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.city}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="Pincode"
                    className="border-[#E7E8E9] h-10"
                  />
                  {formErrors.pincode && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.pincode}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile next button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white px-4 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <Button
          onClick={handleNext}
          className="w-full bg-black text-white hover:bg-black/90 rounded-[60px] py-[14px] px-[32px]"
        >
          Next
        </Button>
      </div>

      {/* Desktop navigation */}
      <div className="hidden md:flex fixed bottom-0 left-0 right-0 bg-white justify-between items-center border-t border-[#E7E8E9] pt-6 pb-6 px-4 sm:px-6 md:px-8 lg:px-[7rem] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
        <StepNavigation
          onNext={handleNext}
          onBack={onBack}
          isFirstStep={false}
          isNextDisabled={Object.values(formData).some((value) => !value)}
        />
      </div>
    </div>
  );
}
