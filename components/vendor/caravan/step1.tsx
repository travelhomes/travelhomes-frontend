"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef } from "react";
import Image from "next/image";
import StepProgress from "../StepProgress";
import StepNavigation from "../StepNavigation";
import VendorBar from "./vendorbar";
import Link from "next/link";
import { ArrowRightIcon } from "@/public/assets/CustomIcon";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
});

interface Step1Props {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function Step1({ onNext, onBack, currentStep, totalSteps }: Step1Props) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rules: "",
  });

  const [images, setImages] = useState<{ [key: string]: string }>({
    cover: "",
    photo1: "",
    photo2: "",
    photo3: "",
    photo4: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeUpload, setActiveUpload] = useState<string>("");

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageClick = (position: string) => {
    setActiveUpload(position);
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          setImages((prev) => ({
            ...prev,
            [activeUpload]: event.target?.result as string,
          }));
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${plusJakartaSans.className}`}>
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
        <div className="py-4 sm:py-6 md:py-8 px-0 sm:px-4 md:px-6 lg:px-[7rem] flex justify-center">
          <div className="space-y-6 md:space-y-8 w-full max-w-[615px]">
            <div className="mb-[32px]">
              <h2 className=" md:text-[32px] text-center font-semibold text-[#112211]">
                Caravan Descriptions
              </h2>
            </div>

            <div className="space-y-4 md:space-y-6 w-full">
              {/* Name Input */}
              <div>
                <label className=" font-normal text-[#334054] block mb-2">
                  Name
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="border-[#EAECF0] text-[#EAECF0] h-11 outline-none focus:ring-0 focus:border-[#B0B0B0]"
                />
                <div className="text-right text-xs text-[#334054] mt-1">
                  {formData.name.length}/50
                </div>
              </div>

              {/* Description Input */}
              <div>
                <label className=" font-normal text-[#334054] block mb-2">
                  Descriptions
                </label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Write here..."
                  className="border-[#EAECF0] min-h-[120px] bg-white focus:ring-0 focus:border-[#B0B0B0] resize-none"
                />
                <div className="text-right text-xs text-[#334054] mt-1">
                  {formData.description.length}/200
                </div>
              </div>

              {/* Rules & Regulation Input */}
              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <label className=" font-normal text-[#334054]">
                    Rules & Regulation
                  </label>
                </div>
                <Textarea
                  name="rules"
                  value={formData.rules}
                  onChange={handleInputChange}
                  placeholder="Write here..."
                  className="border-[#EAECF0] min-h-[120px] bg-white focus:ring-0 focus:border-[#B0B0B0] resize-none"
                />
                   <Button
                    variant="ghost"
                    className="text-[#131313] text-[12px] absolute right-0 mt-2 hover:text-black hover:bg-transparent p-0 h-auto text-sm"
                  >
                    + Add More
                  </Button>
              </div>

              {/* Upload Photos */}
              <div>
                <label className="font-normal text-[#334054] block mb-2">
                  Upload Photos
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {/* Cover Photo */}
                  <div
                    onClick={() => handleImageClick("cover")}
                    className="cursor-pointer"
                  >
                    <div
                      className={`border border-dashed border-[#EAECF0] rounded-lg aspect-square flex flex-col items-center justify-center text-center bg-[#F9FAFB] hover:bg-[#F0F1F3] transition-colors relative overflow-hidden ${
                        images.cover ? "p-0" : "p-4"
                      }`}
                    >
                      {images.cover ? (
                        <Image
                          src={images.cover}
                          alt="Cover"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-sm text-[#667085]">
                            Cover Photo
                          </span>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 4.16666V15.8333M4.16667 10H15.8333"
                              stroke="#667085"
                              strokeWidth="1.67"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 2x2 Grid for other photos */}
                  <div className="grid grid-cols-2 gap-3">
                    {["photo1", "photo2", "photo3", "photo4"].map(
                      (position, index) => (
                        <div
                          key={position}
                          onClick={() => handleImageClick(position)}
                          className="cursor-pointer"
                        >
                          <div
                            className={`border border-dashed border-[#E7E8E9] rounded-lg aspect-square flex items-center justify-center bg-[#F9FAFB] hover:bg-[#F0F1F3] transition-colors relative overflow-hidden ${
                              images[position] ? "p-0" : "p-4"
                            }`}
                          >
                            {images[position] ? (
                              <Image
                                src={images[position]}
                                alt={`Photo ${index + 1}`}
                                fill
                                style={{ objectFit: "cover" }}
                              />
                            ) : (
                              <div className="flex flex-col items-center gap-1">
                                <span className="text-sm text-[#667085]">
                                  Photos
                                </span>
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10 4.16666V15.8333M4.16667 10H15.8333"
                                    stroke="#667085"
                                    strokeWidth="1.67"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <p className="text-right mt-2 text-[14px] text-[#667085]">
                  (Minimum 5 photo required)
                </p>
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
      <div className="hidden md:flex fixed bottom-0 left-0 right-0 bg-white justify-between items-center border-t border-[#E7E8E9] pt-6 pb-6 px-4 sm:px-6 md:px-8 lg:px-[7rem] ">
        <StepProgress 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
        />
        <StepNavigation 
          onNext={onNext}
          onBack={onBack}
          isFirstStep={currentStep === 1}
          isNextDisabled={false} // Disabled validation check for testing
        />
      </div>
    </div>
  );
}
