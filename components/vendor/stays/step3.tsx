"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import StepProgress from "../StepProgress";
import StepNavigation from "../StepNavigation";
import VendorBar from "../caravan/vendorbar";
import Link from "next/link";
import { ArrowRightIcon } from "@/public/assets/CustomIcon";
import { Button } from "@/components/ui/button";
import { Plus_Jakarta_Sans } from "next/font/google";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
});

interface Step3Props {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

type StayType = "entireStay" | "individualRoom";
type RoomType = "single" | "double" | "suite" | "deluxe";

export default function Step3({ onNext, onBack, currentStep, totalSteps }: Step3Props) {
  const [stayType, setStayType] = useState<StayType>("entireStay");
  const [roomType, setRoomType] = useState<RoomType>("single");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    guestCapacity: 1,
    numberOfRooms: 1,
    numberOfBeds: 1,
    numberOfBathrooms: 1,
    price: "5,934"
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

  const handleIncrement = (field: keyof typeof formData) => {
    if (typeof formData[field] === 'number') {
      setFormData(prev => ({
        ...prev,
        [field]: (prev[field] as number) + 1
      }));
    }
  };

  const handleDecrement = (field: keyof typeof formData) => {
    if (typeof formData[field] === 'number' && formData[field] > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: (prev[field] as number) - 1
      }));
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${plusJakartaSans.className}`}>
      <div className="hidden md:block">
        <VendorBar />
      </div>

      {/* Mobile: Top navigation with back button and progress bar */}
      <div className="flex md:hidden items-center justify-between px-4 sm:px-6 mt-10 mb-6">
        <Link href="" className="inline-flex items-center  text-muted-foreground hover:text-primary">
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
        <div className="py-4 sm:py-6 md:py-8 px-0 sm:px-4 md:px-6 lg:px-[7rem] flex justify-center">
          <div className="space-y-6 md:space-y-8 w-full max-w-[800px]">
            <div>
              <h2 className="text-2xl md:text-[32px] mb-[50px] text-center font-semibold text-[#112211]">
                Stay Details
              </h2>
            </div>

            {/* Stay type selection */}
            <div className="mb-6">
              <p className=" font-medium text-[#334054] mb-3">Select best what you think</p>
              <div className="flex gap-4">
                <div
                  className={`relative flex items-center gap-2 py-3 px-5 rounded-full cursor-pointer transition-colors ${stayType === "entireStay" ? "bg-black border border-black" : "bg-white border border-[#E7E8E9]"
                    }`}
                  onClick={() => setStayType("entireStay")}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${stayType === "entireStay" ? "border-white" : "border-[#D0D5DD]"
                    }`}>
                    {stayType === "entireStay" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className={` font-medium ${stayType === "entireStay" ? "text-white" : "text-[#101828]"}`}>
                    Entire Stay
                  </span>
                </div>

                <div
                  className={`relative flex items-center gap-2 py-3 px-5 rounded-full cursor-pointer transition-colors ${stayType === "individualRoom" ? "bg-black border border-black" : "bg-white border border-[#E7E8E9]"
                    }`}
                  onClick={() => setStayType("individualRoom")}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${stayType === "individualRoom" ? "border-white" : "border-[#D0D5DD]"
                    }`}>
                    {stayType === "individualRoom" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className={` font-medium ${stayType === "individualRoom" ? "text-white" : "text-[#101828]"}`}>
                    Individual Room
                  </span>
                </div>
              </div>
            </div>

            {stayType === "entireStay" && (
              <div className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="text-[#334054] block mb-2">
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
                  <label className="text-[#334054] block mb-2">
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
                    {formData.description.length}/500
                  </div>
                </div>

                {/* Upload Photos */}
                <div>
                  <label className="text-[#334054] block mb-4">
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
                      className=" cursor-pointer hover:border-gray-400 transition-colors"
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
                            <span className=" text-[#667085]">
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
                            className=" cursor-pointer hover:border-gray-400 transition-colors"
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
                                  <span className=" text-[#667085]">
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
                  <label className="text-[#334054] block mb-2">
                    Address
                  </label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Locality"
                    className="border-[#E7E8E9] h-[50px] bg-white focus:ring-0 focus:border-[#B0B0B0]"
                  />
                </div>

                {/* State, City, Pincode */}
                <div className="grid grid-cols-3 gap-4">
                  <Input
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="border-[#E7E8E9] h-[50px] bg-white focus:ring-0 focus:border-[#B0B0B0]"
                  />
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="border-[#E7E8E9] h-[50px] bg-white focus:ring-0 focus:border-[#B0B0B0]"
                  />
                  <Input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="Pincode"
                    className="border-[#E7E8E9] h-[50px] bg-white focus:ring-0 focus:border-[#B0B0B0]"
                  />
                </div>

                {/* Map Section */}
                <div className="mt-4 h-[300px] relative rounded-md overflow-hidden border border-[#E7E8E9]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5965665774604!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1679900095651!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                {/* Guest Capacity */}
                <div className="mt-6">
                  <div className="flex justify-between items-center border-b pb-5 px-3">
                    <div>
                      <h3 className="text-base font-medium">Guest Capacity</h3>
                      <p className=" text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleDecrement('guestCapacity')}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
                      >
                        −
                      </button>
                      <span>{formData.guestCapacity}</span>
                      <button
                        onClick={() => handleIncrement('guestCapacity')}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Number of Rooms */}
                <div>
                  <div className="flex justify-between items-center border-b pb-5 px-3">
                    <div>
                      <h3 className="text-base font-medium">Number of Rooms</h3>
                      <p className=" text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleDecrement('numberOfRooms')}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
                      >
                        −
                      </button>
                      <span>{formData.numberOfRooms}</span>
                      <button
                        onClick={() => handleIncrement('numberOfRooms')}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Number of Beds */}
                <div>
                  <div className="flex justify-between items-center border-b pb-5 px-3">
                    <div>
                      <h3 className="text-base font-medium">Number of Bed</h3>
                      <p className=" text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleDecrement('numberOfBeds')}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
                      >
                        −
                      </button>
                      <span>{formData.numberOfBeds}</span>
                      <button
                        onClick={() => handleIncrement('numberOfBeds')}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Number of Bathrooms */}
                <div>
                  <div className="flex justify-between items-center border-b pb-5 px-3">
                    <div>
                      <h3 className="text-base font-medium">Number of Bathroom</h3>
                      <p className=" text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleDecrement('numberOfBathrooms')}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
                      >
                        −
                      </button>
                      <span>{formData.numberOfBathrooms}</span>
                      <button
                        onClick={() => handleIncrement('numberOfBathrooms')}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Regular Price */}
                <div className="mt-6">
                  <label className="text-base font-medium block mb-2">
                    Regular Price (in Rupees)
                  </label>
                  <div className="flex items-center font-extrabold">
                    <span className="text-[24px] 
 mr-1">₹</span>
                    <span className="text-[24px]">{formData.price}</span>
                  </div>
                </div>
              </div>
            )}

            {stayType === "individualRoom" && (
              <div className="space-y-6">

                {/* Number of Rooms */}
                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-base font-medium">Number of Rooms</h3>
                      <p className=" text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleDecrement('numberOfRooms')}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
                      >
                        −
                      </button>
                      <span className="w-6 text-center">{formData.numberOfRooms}</span>
                      <button
                        onClick={() => handleIncrement('numberOfRooms')}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Room 1 (Expanded) */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-base font-medium">Room 1</h3>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 15L12 9L6 15" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Name Input */}
                  <div className="mb-6">
                    <label className=" text-[#334054] block mb-2">
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
                      0/50
                    </div>
                  </div>

                  {/* Descriptions Input */}
                  <div className="mb-6">
                    <label className=" text-[#334054] block mb-2">
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
                      0/200
                    </div>
                  </div>

                  {/* Upload Photos */}
                  <div>
                    <label className="text-[#334054] block mb-4">
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
                        className=" cursor-pointer hover:border-gray-400 transition-colors"
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
                              <span className=" text-[#667085]">
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
                              className=" cursor-pointer hover:border-gray-400 transition-colors"
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
                                    <span className=" text-[#667085]">
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

                  {/* Guest Capacity */}
                  <div className="mt-6">
                    <div className="flex justify-between items-center pb-5 px-3">
                      <div>
                        <h3 className="text-base font-semibold my-[10px]">Guest Capacity</h3>
                        <p className="text-[#334054] text-[14px] ">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleDecrement('guestCapacity')}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
                        >
                          −
                        </button>
                        <span>{formData.guestCapacity}</span>
                        <button
                          onClick={() => handleIncrement('guestCapacity')}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Number of Rooms */}
                  <div>
                    <div className="flex justify-between items-center pb-5 px-3">
                      <div>
                        <h3 className="text-base font-semibold my-[10px]">Number of Rooms</h3>
                        <p className=" text-[#334054] text-[14px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleDecrement('numberOfRooms')}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
                        >
                          −
                        </button>
                        <span>{formData.numberOfRooms}</span>
                        <button
                          onClick={() => handleIncrement('numberOfRooms')}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Number of Beds */}
                  <div>
                    <div className="flex justify-between items-center pb-5 px-3">
                      <div>
                        <h3 className="text-base font-semibold my-[10px]">Number of Bed</h3>
                        <p className=" text-[#334054] text-[14px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleDecrement('numberOfBeds')}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
                        >
                          −
                        </button>
                        <span>{formData.numberOfBeds}</span>
                        <button
                          onClick={() => handleIncrement('numberOfBeds')}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Number of Bathrooms */}
                  <div>
                    <div className="flex justify-between items-center  pb-5 px-3">
                      <div>
                        <h3 className="text-base font-semibold my-[10px]">Number of Bathroom</h3>
                        <p className=" text-[#334054] text-[14px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleDecrement('numberOfBathrooms')}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
                        >
                        </button>
                        <span>{formData.numberOfBathrooms}</span>
                        <button
                          onClick={() => handleIncrement('numberOfBathrooms')}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Regular Price */}
                  <div className="mt-6">
                    <label className="text-base font-semibold block mb-2">
                      Regular Price (in Rupees)
                    </label>
                    <div className="flex items-center font-extrabold">
                      <span className="text-[24px] mr-1">₹</span>
                      <span className="text-[24px]">{formData.price}</span>
                    </div>
                  </div>
                </div>
                {/* Room 2 (Collapsed) */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium">Room 2</h3>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
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