"use client";

import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import StepProgress from "../StepProgress";
import StepNavigation from "../StepNavigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

interface Step8Props {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function Step8({ onNext, onBack, currentStep, totalSteps }: Step8Props) {
  const [formData, setFormData] = useState({
    firstName: "Rahul",
    lastName: "Singh",
    state: "",
    city: "",
    dateOfBirth: "01/01/2000",
    maritalStatus: "",
    idProof: "",
  });

  const [idPhoto, setIdPhoto] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

  return (
    <div className="fixed inset-0 flex flex-col">
      {/* Space for app bar */}
      <div className="h-16"></div>

      <div className="flex-1 px-4 md:px-20 lg:px-40 overflow-auto">
        <div className="h-full flex flex-col">
          {/* Logo */}
         

          <div className="mt-2 mb-8">
            <h2 className="text-xl md:text-2xl text-center font-semibold text-[#112211]">
              Personal Details
            </h2>
          </div>

          <div className="w-full max-w-3xl mx-auto space-y-6">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-600 block mb-2">
                  First Name
                </label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-600 block mb-2">
                  Last Name
                </label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                />
              </div>
            </div>

            {/* State and City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-600 block mb-2">
                  State
                </label>
                <Select value={formData.state} onValueChange={handleSelectChange("state")}>
                  <SelectTrigger className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm text-gray-600 block mb-2">
                  City
                </label>
                <Select value={formData.city} onValueChange={handleSelectChange("city")}>
                  <SelectTrigger className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newdelhi">New Delhi</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date of Birth and Marital Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-600 block mb-2">
                  Date of Birth
                </label>
                <Input
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  placeholder="DD/MM/YYYY"
                  className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-600 block mb-2">
                  Marital Status
                </label>
                <Select value={formData.maritalStatus} onValueChange={handleSelectChange("maritalStatus")}>
                  <SelectTrigger className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* ID Proof */}
            <div>
              <label className="text-sm text-gray-600 block mb-2">
                ID Proof
              </label>
              <Select value={formData.idProof} onValueChange={handleSelectChange("idProof")}>
                <SelectTrigger className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aadhar">Aadhar Card</SelectItem>
                  <SelectItem value="pan">PAN Card</SelectItem>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="driving">Driving License</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* ID Photos */}
            <div>
              <label className="text-sm text-gray-600 block mb-2">
                ID Photos
              </label>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handlePhotoUpload}
              />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer border border-dashed border-[#E7E8E9] rounded-lg h-[120px] flex flex-col items-center justify-center bg-[#F9FAFB] hover:bg-[#F0F1F3] transition-colors relative overflow-hidden"
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
                    <span className="text-sm text-[#667085]">Upload here</span>
                  </div>
                )}
              </div>
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
