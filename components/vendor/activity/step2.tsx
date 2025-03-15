"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef } from "react";
import Image from "next/image";
import StepProgress from "../StepProgress";
import StepNavigation from "../StepNavigation";
import VendorBar from "../caravan/vendorbar";
import Link from "next/link";
import { ArrowRightIcon } from "@/public/assets/CustomIcon";
import { Button } from "@/components/ui/button";

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function Step2({ onNext, onBack, currentStep, totalSteps }: Step2Props) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
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
      <div className="flex-grow px-4 sm:px-6 md:px-8 lg:px-[8em] pb-24 md:pb-32 overflow-y-auto">
        <div className="py-4 sm:py-6 md:py-8 px-0 sm:px-4 md:px-6 lg:px-[7rem]">
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="text-2xl md:text-[32px] text-center font-semibold text-[#112211]">
                Activity Description
              </h2>
            </div>

            <div className="space-y-6 max-w-[800px] mx-auto">
              {/* Name Input */}
              <div>
                <label className="text-sm font-medium text-[#334054] block mb-2">
                  Name
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="border-[#EAECF0] h-11 outline-none focus:ring-0 focus:border-[#B0B0B0]"
                />
                <div className="text-right text-xs text-[#334054] mt-1">
                  {formData.name.length}/50
                </div>
              </div>

              {/* Description Input */}
              <div>
                <label className="text-sm font-medium text-[#334054] block mb-2">
                  Description
                </label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Write here"
                  className="border-[#EAECF0] min-h-[120px] bg-white focus:ring-0 focus:border-[#B0B0B0] resize-none"
                />
                <div className="text-right text-xs text-[#334054] mt-1">
                  {formData.description.length}/500
                </div>
              </div>

              {/* Upload Photos */}
              <div>
                <label className="text-sm font-medium text-[#334054] block mb-4">
                  Upload Photos
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                  {/* Cover photo */}
                  <div
                    onClick={() => handleImageClick("cover")}
                    className="rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <div className="aspect-[1/1] relative flex items-center justify-center bg-[#F9FAFB] rounded-lg overflow-hidden">
                      {images.cover ? (
                        <Image
                          src={images.cover}
                          alt="Cover"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <div className="flex flex-row md:flex-col items-center gap-1">
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

                  {/* Grid for other photos */}
                  <div className="grid grid-cols-2 gap-4">
                    {["photo1", "photo2", "photo3", "photo4"].map(
                      (position, index) => (
                        <div
                          key={position}
                          onClick={() => handleImageClick(position)}
                          className="rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                        >
                          <div className="aspect-square relative flex items-center justify-center bg-[#F9FAFB] rounded-lg overflow-hidden">
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
                  (Minimum 5 photos required)
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
