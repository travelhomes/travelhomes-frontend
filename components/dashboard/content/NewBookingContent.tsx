import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@/public/assets/CustomIcon";
import { ChevronDown, Clock, Upload } from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useState } from "react";
import Image from "next/image";

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

export function NewBookingContent() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-[12px] overflow-hidden relative min-h-[90vh]">
      {/* Header */}
      <div className="border-b border-[#EAECF0] py-[16px] px-[20px]">
        <h1 className="text-[24px] font-semibold text-[#101828]">New Bookings</h1>
      </div>
      
      {/* Form Content - Added pb-24 to make space for the fixed button */}
      <div className="p-6 space-y-6 pb-24 relative">
        {/* Service Name */}
        <div>
          <label className={`block font-normal text-[#334054] mb-2 ${plusJakartaSans.className}`}>Service Name</label>
          <div className="relative">
            <select 
              className="w-full h-[48px] p-3 pr-10 border border-gray-200 rounded-lg appearance-none focus:outline-none"
              defaultValue=""
            >
              <option value="" disabled>Select</option>
              <option value="service1">XYX</option>
              <option value="service2">XYZ</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        
        {/* Name, Email, Phone Number in a row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={`block text-[#334054] mb-2 ${plusJakartaSans.className}`}>Name</label>
            <input 
              type="text" 
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none" 
              placeholder="Badal Singh"
            />
          </div>
          <div>
            <label className={`block text-[#334054] mb-2 ${plusJakartaSans.className}`}>Email</label>
            <input 
              type="email" 
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none" 
              placeholder="Jpbadalsigh"
            />
          </div>
          <div>
            <label className={`block text-[#334054] mb-2 ${plusJakartaSans.className}`}>Phone Number</label>
            <input 
              type="tel" 
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none" 
              placeholder="+91 52024 42423"
            />
          </div>
        </div>
        
        {/* Checkin & Checkout Date, Time, Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-[#334054] mb-2 ${plusJakartaSans.className}`}>Checkin & Checkout Date</label>
            <div className="relative">
              <input 
                type="text" 
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none" 
                placeholder="Jamshedpur"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <CalendarIcon />
              </div>
            </div>
          </div>
          <div>
            <label className={`block text-[#334054] mb-2 ${plusJakartaSans.className}`}>Checkin & Checkout Time</label>
            <div className="relative">
              <input 
                type="text" 
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none" 
                placeholder="Jamshedpur"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Location From and To */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-[#334054] mb-2 ${plusJakartaSans.className}`}>Location From</label>
            <div className="relative">
              <input 
                type="text" 
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none" 
                placeholder="Jamshedpur"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div>
            <label className={`block text-[#334054] mb-2 ${plusJakartaSans.className}`}>Location To</label>
            <div className="relative">
              <input 
                type="text" 
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none" 
                placeholder="Jamshedpur"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Pickup Location */}
        <div>
          <label className={`block text-[#334054] mb-2 ${plusJakartaSans.className}`}>Pickup Location</label>
          <input 
            type="text" 
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none" 
            placeholder="Badal Singh"
          />
        </div>
        
        {/* Upload ID */}
        <div>
          <label className={`block text-[#334054] mb-2 ${plusJakartaSans.className}`}>Upload ID</label>
          <div className="border border-gray-200 rounded-lg p-6">
            {previewUrl ? (
              <div className="relative">
                <div className="w-full aspect-[3/2] relative rounded-lg overflow-hidden">
                  <Image 
                    src={previewUrl} 
                    alt="ID Document" 
                    fill 
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                  }}
                  className="absolute top-2 right-2 bg-white text-black hover:bg-gray-100 p-1 rounded-full"
                >
                  ✕
                </Button>
                <p className="mt-2 text-sm text-gray-500">{selectedFile?.name}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <label htmlFor="file-upload" className="cursor-pointer w-full">
                  <div className="flex flex-col items-center justify-center p-4 hover:bg-gray-50">
                    <div className="mb-4 p-3 bg-gray-100 rounded-full">
                      <Upload className="h-6 w-6 text-gray-600" />
                    </div>
                    <p className="text-sm text-gray-500 text-center mb-1">Drag and drop choose file to upload your files.</p>
                    <p className="text-sm text-gray-500 text-center">All pdf, doc, csv, xlsx types are supported</p>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept="image/*,.pdf,.doc,.docx,.csv,.xlsx"
                      onChange={handleFileChange}
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById('file-upload')?.click()}
                      className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 font-medium"
                    >
                      Browse Files
                    </button>
                  </div>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button Container - Using absolute positioning within the parent */}
        <div className="absolute bottom-0 left-0 right-0 bg-white py-4 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="flex justify-end">
            <Button 
              className="rounded-full bg-black hover:bg-black/90 text-white px-8 py-6"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 