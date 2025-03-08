"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import StepProgress from "../StepProgress"
import StepNavigation from "../StepNavigation"
import Image from "next/image"

interface Step4Props {
  onNext: () => void
  onBack: () => void
  currentStep: number
  totalSteps: number
  stayType: "entire" | "individual"
  onStayTypeChange: (type: "entire" | "individual") => void
}

interface FormData {
  name: string
  description: string
  basePrice: string
  guestCapacity: number
  bedCount: number
  bathroomCount: number
  roomCount: number
}

export default function Step4({ 
  onNext, 
  onBack, 
  currentStep, 
  totalSteps, 
  stayType,
  onStayTypeChange 
}: Step4Props) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    basePrice: "",
    guestCapacity: 1,
    bedCount: 1,
    bathroomCount: 1,
    roomCount: 1
  })

  const [images, setImages] = useState<{ [key: string]: string }>({
    cover: "",
    photo1: "",
    photo2: "",
    photo3: "",
    photo4: "",
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [activeUpload, setActiveUpload] = useState<string>("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleIncrement = (field: keyof typeof formData) => {
    setFormData(prev => ({
      ...prev,
      [field]: typeof prev[field] === 'number' ? (prev[field] as number) + 1 : prev[field]
    }))
  }

  const handleDecrement = (field: keyof typeof formData) => {
    setFormData(prev => ({
      ...prev,
      [field]: typeof prev[field] === 'number' ? Math.max(1, (prev[field] as number) - 1) : prev[field]
    }))
  }

  const handleImageClick = (position: string) => {
    setActiveUpload(position)
    fileInputRef.current?.click()
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target?.result) {
          setImages((prev) => ({
            ...prev,
            [activeUpload]: event.target?.result as string,
          }))
        }
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex flex-col h-screen">

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-4 pb-20">
          <div className="mt-6 mb-8">
            <h2 className="text-xl md:text-2xl text-center font-semibold text-[#112211]">
              Stay Details
            </h2>
          </div>

          <div className="space-y-8 max-w-[800px] mx-auto">
            {/* Stay Type Selection */}
            <div>
              <label className="text-sm font-medium text-[#334054] block mb-3">
                Select best what you think
              </label>
              <div className="flex gap-4">
                <div 
                  onClick={() => onStayTypeChange("entire")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer border transition-all ${
                    stayType === "entire" 
                      ? "bg-black text-white border-black" 
                      : "border-[#E7E8E9] hover:border-gray-300"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    stayType === "entire" ? "border-white" : "border-[#667085]"
                  }`}>
                    {stayType === "entire" && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="text-sm">Entire Stay</span>
                </div>
                <div 
                  onClick={() => onStayTypeChange("individual")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer border transition-all ${
                    stayType === "individual" 
                      ? "bg-black text-white border-black" 
                      : "border-[#E7E8E9] hover:border-gray-300"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    stayType === "individual" ? "border-white" : "border-[#667085]"
                  }`}>
                    {stayType === "individual" && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="text-sm">Individual Room</span>
                </div>
              </div>
            </div>

            {stayType === "entire" ? (
              // Entire Stay Form
              <>
                {/* Guest Capacity */}
                <div className="flex justify-between items-center">
                  <div className="flex-1 pr-4">
                    <label className="text-sm font-medium text-[#334054] block mb-1">
                      Guest Capacity
                    </label>
                    <p className="text-xs text-[#667085]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleDecrement('guestCapacity')}
                      className="w-8 h-8 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      name="guestCapacity"
                      value={formData.guestCapacity}
                      onChange={handleInputChange}
                      className="w-12 text-center border-[#E7E8E9] h-9 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                      min={1}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleIncrement('guestCapacity')}
                      className="w-8 h-8 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Room Count */}
                <div className="flex justify-between items-center">
                  <div className="flex-1 pr-4">
                    <label className="text-sm font-medium text-[#334054] block mb-1">
                      Number of Rooms
                    </label>
                    <p className="text-xs text-[#667085]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleDecrement('roomCount')}
                      className="w-8 h-8 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      name="roomCount"
                      value={formData.roomCount}
                      onChange={handleInputChange}
                      className="w-12 text-center border-[#E7E8E9] h-9 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                      min={1}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleIncrement('roomCount')}
                      className="w-8 h-8 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Bed Count */}
                <div className="flex justify-between items-center">
                  <div className="flex-1 pr-4">
                    <label className="text-sm font-medium text-[#334054] block mb-1">
                      Number of Bed
                    </label>
                    <p className="text-xs text-[#667085]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleDecrement('bedCount')}
                      className="w-8 h-8 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      name="bedCount"
                      value={formData.bedCount}
                      onChange={handleInputChange}
                      className="w-12 text-center border-[#E7E8E9] h-9 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                      min={1}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleIncrement('bedCount')}
                      className="w-8 h-8 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Bathroom Count */}
                <div className="flex justify-between items-center">
                  <div className="flex-1 pr-4">
                    <label className="text-sm font-medium text-[#334054] block mb-1">
                      Number of Bathroom
                    </label>
                    <p className="text-xs text-[#667085]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleDecrement('bathroomCount')}
                      className="w-8 h-8 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      name="bathroomCount"
                      value={formData.bathroomCount}
                      onChange={handleInputChange}
                      className="w-12 text-center border-[#E7E8E9] h-9 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                      min={1}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleIncrement('bathroomCount')}
                      className="w-8 h-8 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Base Price */}
                <div>
                  <label className="text-sm font-medium text-[#334054] block mb-1">
                    Regular Price (in Rupees)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]">₹</span>
                    <Input
                      type="number"
                      name="basePrice"
                      value={formData.basePrice}
                      onChange={handleInputChange}
                      placeholder="5,954"
                      className="pl-8 border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                    />
                  </div>
                </div>
              </>
            ) : (
              // Individual Room Form
              <>
                {/* Room Name */}
                <div>
                  <label className="text-sm font-medium text-[#334054] block mb-2">
                    Room 1
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                  />
                </div>

                {/* Room Description */}
                <div>
                  <label className="text-sm font-medium text-[#334054] block mb-2">
                    Description
                  </label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Write here"
                    className="border-[#E7E8E9] min-h-[120px] bg-white focus:ring-0 focus:border-[#B0B0B0] resize-none"
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

                {/* Guest Capacity */}
                <div className="flex justify-between items-center">
                  <div className="flex-1 pr-4">
                    <label className="text-sm font-medium text-[#334054] block mb-1">
                      Guest Capacity
                    </label>
                    <p className="text-xs text-[#667085]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleDecrement('guestCapacity')}
                      className="w-8 h-8 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      name="guestCapacity"
                      value={formData.guestCapacity}
                      onChange={handleInputChange}
                      className="w-12 text-center border-[#E7E8E9] h-9 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                      min={1}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleIncrement('guestCapacity')}
                      className="w-8 h-8 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Number of Bed */}
                <div className="flex justify-between items-center">
                  <div className="flex-1 pr-4">
                    <label className="text-sm font-medium text-[#334054] block mb-1">
                      Number of Bed
                    </label>
                    <p className="text-xs text-[#667085]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleDecrement('bedCount')}
                      className="w-8 h-8 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      name="bedCount"
                      value={formData.bedCount}
                      onChange={handleInputChange}
                      className="w-12 text-center border-[#E7E8E9] h-9 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                      min={1}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleIncrement('bedCount')}
                      className="w-8 h-8 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Number of Bathroom */}
                <div className="flex justify-between items-center">
                  <div className="flex-1 pr-4">
                    <label className="text-sm font-medium text-[#334054] block mb-1">
                      Number of Bathroom
                    </label>
                    <p className="text-xs text-[#667085]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleDecrement('bathroomCount')}
                      className="w-8 h-8 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      name="bathroomCount"
                      value={formData.bathroomCount}
                      onChange={handleInputChange}
                      className="w-12 text-center border-[#E7E8E9] h-9 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                      min={1}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleIncrement('bathroomCount')}
                      className="w-8 h-8 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Regular Price */}
                <div>
                  <label className="text-sm font-medium text-[#334054] block mb-1">
                    Regular Price (in Rupees)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]">₹</span>
                    <Input
                      type="number"
                      name="basePrice"
                      value={formData.basePrice}
                      onChange={handleInputChange}
                      placeholder="5,954"
                      className="pl-8 border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                    />
                  </div>
                </div>

                {/* Room 2 */}
                <div>
                  <label className="text-sm font-medium text-[#334054] block mb-2">
                    Room 2
                  </label>
                  <Input
                    disabled
                    placeholder="Name"
                    className="border-[#E7E8E9] h-10 bg-[#F9FAFB] focus:ring-0 focus:border-[#B0B0B0] cursor-not-allowed"
                  />
                </div>
              </>
            )}
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
  )
} 