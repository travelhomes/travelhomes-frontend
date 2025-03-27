"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

import { Plus_Jakarta_Sans } from "next/font/google";


const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
});

export function AddOfferingContent() {
  const [activeTab, setActiveTab] = useState("campervan");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rules: "",
    category: "",
    features: [],
    seatingCapacity: "4",
    sleepingCapacity: "2",
    locality: "",
    pincode: "",
    city: "",
    state: "",
    price: "",
    priceIncludes: "",
    priceExcludes: ""
  });

  const [expandedSections, setExpandedSections] = useState({
    descriptions: true,
    campervanDetails: true,
    pricingDetails: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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
    <div className={`${plusJakartaSans.className} bg-white rounded-xl h-[calc(100vh-130px)] overflow-y-auto`}>
      <div className="max-w-full pb-32">
        {/* Top bar with "Offering" title and Add button */}
        <div className="flex justify-between items-center px-6 py-[1rem] border-b">
          <h1 className="text-xl font-semibold">Offering</h1>
          <Button
          className="rounded-full bg-black hover:bg-black/90 text-white px-6 py-[25px] flex items-center gap-2"
        >
          <span className="text-lg font-bold">+</span>
          <span>Add Offering</span>
        </Button>
        </div>

        {/* Header with tabs */}
        <div className="flex py-[20px] px-[10px]">
          <button 
            className={`pb-[10px] px-6 font-medium text-base ${activeTab === "campervan" ? "border-b-2 border-black text-[#0B0907] font-bold" : "text-[#6B6B6B]"}`}
            onClick={() => setActiveTab("campervan")}
          >
            Camper Van
          </button>
          <button 
            className={`pb-[10px] px-6 font-medium text-base ${activeTab === "uniquestay" ? "border-b-2 border-black text-[#0B0907] font-bold" : "text-[#6B6B6B]"}`}
            onClick={() => setActiveTab("uniquestay")}
          >
            Unique Stay
          </button>
          <button 
            className={`pb-[10px] px-6 font-medium text-base ${activeTab === "activity" ? "border-b-2 border-black text-[#0B0907] font-bold" : "text-[#6B6B6B]"}`}
            onClick={() => setActiveTab("activity")}
          >
            Activity
          </button>
        </div>

        {/* Main form */}
        <div className=" p-[20px]">
          {/* Descriptions Section */}
          <div className="border rounded-[12px]">
            <div 
              className="flex justify-between items-center py-4 px-6   cursor-pointer   "
              onClick={() => toggleSection('descriptions')}
            >
              <h2 className="text-[#334054] w-full">Descriptions</h2>
              <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.descriptions ? 'rotate-180' : ''}`} />
            </div>
            
            {expandedSections.descriptions && (
              <div className="py-4 px-6  space-y-6 border-t border-dashed">
                {/* Name Input */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-normal text-[#334054] block mb-2">
                      Name
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                      className="border-[#EAECF0] text-[#0B0907] h-11 outline-none focus:ring-0 focus:border-[#B0B0B0]"
                    />
                    <div className="text-right text-[14px] text-[#334054] mt-1">
                      {formData.name.length}/50
                    </div>
                  </div>
                  
                  <div>
                    <label className="font-normal text-[#334054] block mb-2">
                      Camper Van Category
                    </label>
                    <div className="relative">
                      <div className="border border-[#EAECF0] rounded-md h-11 flex items-center px-3 justify-between text-[#667085]">
                        <span>Select</span>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description Input */}
                <div>
                  <label className="font-normal text-[#334054] block mb-2">
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
                    <label className="font-normal text-[#334054]">
                      Rules & Regulation
                    </label>
                  </div>
                  <Textarea
                    name="rules"
                    value={formData.rules}
                    onChange={handleInputChange}
                    placeholder="Add rules..."
                    className="border-[#EAECF0] min-h-[120px] bg-white focus:ring-0 focus:border-[#B0B0B0] resize-none"
                  />
                  <Button
                    variant="ghost"
                    className="text-[#131313] text-[14px] absolute right-0 mt-2 hover:text-black hover:bg-transparent p-0 h-auto text-sm"
                  >
                    + Add More
                  </Button>
                </div>

                {/* Upload Photos */}
                <div className="space-y-4 pt-4">
                  <label className="font-normal text-[#334054] block">
                    Upload Photos
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-sm text-[#667085]">
                              Cover Photo
                            </span>
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
                                <div className="flex flex-col items-center gap-2">
                                  <span className="text-sm text-[#667085]">
                                    Photos
                                  </span>
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
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <p className="text-right text-[14px] text-[#667085]">
                    (Minimum 5 photo required)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* CamperVan Details Section */}
          <div className="border my-[20px] rounded-[12px]">
            <div 
              className="flex justify-between items-center py-4 px-6 "
              onClick={() => toggleSection('campervanDetails')}
            >
              <h2 className="text-[#334054] w-full">CamperVan Details</h2>
              <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.campervanDetails ? 'rotate-180' : ''}`} />
            </div>
            
            {expandedSections.campervanDetails && (
              <div className=" py-4 px-6  space-y-6 border-t border-dashed">
                <div>
                  <label className="font-normal text-[#334054] block mb-2">
                    CamperVan Features
                  </label>
                  <div className="border border-[#EAECF0] rounded-md p-4 flex justify-between items-center text-[#667085]">
                    <span>Multi-select</span>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-normal text-[#334054] block mb-2">
                      Seating Capacity
                    </label>
                    <div className="border border-[#EAECF0] rounded-md p-3 flex justify-between items-center">
                      <span>{formData.seatingCapacity}</span>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <label className="font-normal text-[#334054] block mb-2">
                      Sleeping Capacity
                    </label>
                    <div className="border border-[#EAECF0] rounded-md p-3 flex justify-between items-center">
                      <span>{formData.sleepingCapacity}</span>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="font-normal text-[#334054] block mb-2">
                    Address
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input placeholder="Locality" name="locality" className="border-[#EAECF0] h-11" />
                    <Input placeholder="Pincode" name="pincode" className="border-[#EAECF0] h-11" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="City" name="city" className="border-[#EAECF0] h-11" />
                    <Input placeholder="State" name="state" className="border-[#EAECF0] h-11" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pricing Details Section */}
          <div className="border rounded-[12px]">
            <div 
              className="flex justify-between items-center py-4 px-6 cursor-pointer"
              onClick={() => toggleSection('pricingDetails')}
            >
              <h2 className="text-[#334054] w-full">Pricing Details</h2>
              <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.pricingDetails ? 'rotate-180' : ''}`} />
            </div>
            
            {expandedSections.pricingDetails && (
              <div className="px-6 pb-10 pt-5 space-y-6 border-t border-dashed">
                <div>
                  <label className="font-normal text-[#334054] block mb-2">
                    Regular Price (in Rupees)
                  </label>
                  <div className="border border-[#EAECF0] rounded-md p-3 flex justify-between items-center">
                    <span>Select</span>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>
                
                <div>
                  <label className="font-normal text-[#334054] block mb-2">
                    Above price includes
                  </label>
                  <Textarea
                    name="priceIncludes"
                    value={formData.priceIncludes}
                    onChange={handleInputChange}
                    placeholder="Text here..."
                    className="border-[#EAECF0] min-h-[100px] bg-white focus:ring-0 focus:border-[#B0B0B0] resize-none"
                  />
                  <Button
                    variant="ghost"
                    className="text-[#131313] text-[14px] mt-2 hover:text-black hover:bg-transparent p-0 h-auto float-right"
                  >
                    + Add More
                  </Button>
                </div>
                
                <div className="pt-4">
                  <label className="font-normal text-[#334054] block mb-2">
                    Above price excludes
                  </label>
                  <Textarea
                    name="priceExcludes"
                    value={formData.priceExcludes}
                    onChange={handleInputChange}
                    placeholder="Text here..."
                    className="border-[#EAECF0] min-h-[100px] bg-white focus:ring-0 focus:border-[#B0B0B0] resize-none"
                  />
                  <Button
                    variant="ghost"
                    className="text-[#131313] text-[14px] mt-2 hover:text-black hover:bg-transparent p-0 h-auto float-right"
                  >
                    + Add More
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer with Cancel/Submit buttons - fixed at the bottom */}
      <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-[#E7E8E9] py-4 px-6 flex justify-end items-center">
        <div className="flex gap-4">
          <button 
            className=" text-[#B01D1D] border-none pr-[20px] "
          >
            Cancel
          </button>
          <Button 
            className="bg-black hover:bg-black/90 text-white px-5 py-[25px] rounded-[60px]"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
} 