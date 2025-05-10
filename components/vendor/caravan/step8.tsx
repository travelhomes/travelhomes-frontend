"use client";

import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import StepProgress from "../StepProgress";
import StepNavigation from "../StepNavigation";
import Select from "react-select";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import VendorBar from "./vendorbar";
import Link from "next/link";
import { ArrowRightIcon } from "@/public/assets/CustomIcon";

interface Step8Props {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function Step8({
  onNext,
  onBack,
  currentStep,
  totalSteps,
}: Step8Props) {
  const stateOptions = [
    { value: "delhi", label: "Delhi" },
    { value: "maharashtra", label: "Maharashtra" },
    { value: "karnataka", label: "Karnataka" },
    { value: "tamilnadu", label: "Tamil Nadu" },
  ];

  const cityOptions = [
    { value: "goa", label: "Goa" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "kerala", label: "Kerala" },
    { value: "bangalore", label: "Bangalore" },
  ];

  const maritalOptions = [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "dicorced", label: "Divorced" },
    { value: "widowed", label: "Widowed" },
  ];

  const idOptions = [
    { value: "aadhar", label: "Aadhar No" },
    { value: "pan", label: "PAN" },
    { value: "driving", label: "Driving License" },
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    state: "",
    city: "",
    dateOfBirth: "",
    maritalStatus: "",
    idProof: "",
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required.";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required.";
    }
    if (!formData.city.trim()) {
      errors.city = "City is required.";
    }
    if (!formData.state.trim()) {
      errors.state = "State is required.";
    }
    if (!formData.dateOfBirth.trim()) {
      errors.dateOfBirth = "Date of Birth is required.";
    } else if (
      !/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(
        formData.dateOfBirth
      )
    ) {
      errors.dateOfBirth = "Enter DOB in valid format (DD/MM/YYYY).";
    }
    if (!formData.maritalStatus.trim()) {
      errors.maritalStatus = "Marital Status is required.";
    }
    if (!formData.idProof.trim()) {
      errors.idProof = "ID Proof is required.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const [idPhoto, setIdPhoto] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(formData);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          setIdPhoto(event.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  // Function to open the native date picker
  const openDatePicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  // Handle date change from the date input
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    setFormData((prev) => ({
      ...prev,
      dateOfBirth: formattedDate,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="hidden md:block">
        <VendorBar />
      </div>

      {/* Mobile: Top navigation with back button and progress bar */}
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

      {/* Main content */}
      <div className="flex-grow px-4 sm:px-6 md:px-8 lg:px-[8em] pb-24 md:pb-32">
        <div className="py-4 sm:py-6 md:py-8 px-0 sm:px-4 md:px-6 lg:px-[7rem]">
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="text-2xl md:text-[32px] mb-[50px] text-center font-semibold text-[#112211]">
                Personal Details
              </h2>
            </div>

            <div className="w-full md:w-[890px] mx-auto space-y-6">
              {/* First Name and Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[#334054] block mb-2">
                    First Name
                  </label>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                  />
                  {formErrors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-[#334054] block mb-2">Last Name</label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                  />

                  {formErrors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* State and City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[#334054] block mb-2">State</label>
                  <Select
                    options={stateOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange("state")(selectedOption?.value || "")
                    }
                    placeholder="Select or type state"
                    classNamePrefix="react-select"
                    isClearable
                  />

                  {formErrors.state && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.state}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-[#334054] block mb-2">City</label>
                  <Select
                    options={cityOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange("city")(selectedOption?.value || "")
                    }
                    placeholder="Select or type city"
                    classNamePrefix="react-select"
                    isClearable
                  />

                  {formErrors.city && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.city}
                    </p>
                  )}
                </div>
              </div>

              {/* Date of Birth and Marital Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[#334054] block mb-2">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <div
                      className="cursor-pointer border border-[#E7E8E9] h-10 flex items-center px-3 rounded-md"
                      onClick={openDatePicker}
                    >
                      <span
                        className={
                          formData.dateOfBirth ? "text-black" : "text-gray-400"
                        }
                      >
                        {formData.dateOfBirth || "DD/MM/YYYY"}
                      </span>
                      <svg
                        className="absolute right-3 top-2.5 h-5 w-5 opacity-50"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          width="18"
                          height="18"
                          x="3"
                          y="4"
                          rx="2"
                          ry="2"
                        />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                      </svg>
                    </div>
                    <input
                      ref={dateInputRef}
                      type="date"
                      onChange={handleDateChange}
                      className="sr-only"
                      min="1900-01-01"
                      max={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  {formErrors.dateOfBirth && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.dateOfBirth}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-[#334054] block mb-2">
                    Marital Status
                  </label>
                  <Select
                    options={maritalOptions}
                    onChange={(selectedOption) =>
                      handleSelectChange("maritalStatus")(
                        selectedOption?.value || ""
                      )
                    }
                    placeholder="Select or type status"
                    classNamePrefix="react-select"
                    isClearable
                  />

                  {formErrors.maritalStatus && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.maritalStatus}
                    </p>
                  )}
                </div>
              </div>

              {/* ID Proof */}
              <div>
                <label className="text-[#334054] block mb-2">ID Proof</label>
                <Select
                  options={idOptions}
                  onChange={(selectedOption) =>
                    handleSelectChange("idProof")(selectedOption?.value || "")
                  }
                  placeholder="Select or type ID"
                  classNamePrefix="react-select"
                  isClearable
                />

                {formErrors.idProof && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.idProof}
                  </p>
                )}
              </div>

              {/* ID Photos */}
              {formData.idProof && (
                <div>
                  <label className="text-[#334054] block mb-2">ID Photos</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer border border-dashed border-[#E7E8E9] rounded-lg w-[250px] h-[180px] flex flex-col items-center justify-center bg-[#F9FAFB] hover:bg-[#F0F1F3] transition-colors relative overflow-hidden"
                  >
                    {idPhoto ? (
                      <Image
                        src={idPhoto}
                        alt="ID Photo"
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 5V19M5 12H19"
                            stroke="#667085"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-[#667085]">Upload here</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Full width Next button - fixed at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white px-4 py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <Button
          onClick={handleNext}
          className="w-full bg-black text-white hover:bg-black/90 rounded-[60px] py-[14px] px-[32px]"
        >
          Next
        </Button>
      </div>

      {/* Desktop: Original navigation with progress and next/back buttons - fixed at bottom */}
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
