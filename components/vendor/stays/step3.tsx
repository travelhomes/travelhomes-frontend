"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import StepProgress from "../StepProgress";
import StepNavigation from "../StepNavigation";

interface Step3Props {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function Step3({ onNext, onBack, currentStep, totalSteps }: Step3Props) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
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
    <div className="flex flex-col h-screen">
      <div className="h-16"></div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-4 pb-20">
          <div className="mt-6 mb-8">
            <h2 className="text-xl md:text-2xl text-center font-semibold text-[#112211]">
              Unique Stay Descriptions
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
              <div className="grid grid-cols-2 gap-4">
                {/* Cover photo */}
                <div
                  onClick={() => handleImageClick("cover")}
                  className="border-2 border-dashed border-[#E7E8E9] rounded-lg p-4 cursor-pointer hover:border-gray-400 transition-colors"
                >
                  <div className="aspect-[2/1] relative flex items-center justify-center bg-[#F9FAFB] rounded-lg overflow-hidden">
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

                {/* Grid for other photos */}
                <div className="grid grid-cols-2 gap-4">
                  {["photo1", "photo2", "photo3", "photo4"].map(
                    (position, index) => (
                      <div
                        key={position}
                        onClick={() => handleImageClick(position)}
                        className="border-2 border-dashed border-[#E7E8E9] rounded-lg p-4 cursor-pointer hover:border-gray-400 transition-colors"
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

            {/* Address */}
            <div className="mt-4">
              <label className="text-sm font-medium text-[#334054] block mb-2">
                Address
              </label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Location"
                className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
              />
            </div>

            {/* State, City, Pincode */}
            <div className="grid grid-cols-3 gap-4">
              <Input
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State"
                className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
              />
              <Input
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
              />
              <Input
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="Pincode"
                className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
              />
            </div>

            {/* Map Section */}
            <div className="mt-4 h-[180px] relative rounded-md overflow-hidden border border-[#E7E8E9]">
              <Image 
                src="https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7C40.7128,-74.0060&key=YOUR_API_KEY_HERE"
                alt="Location Map"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-[#E7E8E9] mt-auto">
        <div className="max-w-[1200px] mx-auto px-4 py-3">
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
    </div>
  );
}