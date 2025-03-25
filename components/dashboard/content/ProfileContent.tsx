"use client";

import { useState, useEffect } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function ProfileContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"personal" | "social" | "business">(
    (searchParams.get("tab") as "personal" | "social" | "business") || "personal"
  );
  
  const userData = {
    firstName: "Badal",
    lastName: "Singh",
    email: "Jpbadalsingh899@gmail.com",
    phone: "+91 6202948676",
    state: "Jharkhand",
    city: "Jamshedpur",
    idProof: "Adhere Card"
  };

  const handleEdit = () => {
    // Handle edit functionality
    console.log("Edit clicked");
  };

  const handleTabChange = (tab: "personal" | "social" | "business") => {
    setActiveTab(tab);
    router.push(`/dashboard/profile?tab=${tab}`);
  };

  useEffect(() => {
    const tab = searchParams.get("tab") as "personal" | "social" | "business";
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <div className={`${plusJakartaSans.className} bg-white rounded-[12px] h-full`}>
      {/* Profile Tabs and Change Password */}
      <div className="flex justify-between items-center p-6 ">
        <div className="flex gap-6">
          <button
            className={`font-medium  pb-[10px] ${
              activeTab === "personal" 
                ? "text-black border-b-2 border-[#131313]" 
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => handleTabChange("personal")}
          >
            Perosnal Details
          </button>
          <button
            className={`font-medium  pb-[10px] ${
              activeTab === "social" 
                ? "text-black border-b-2 border-[#131313]" 
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => handleTabChange("social")}
          >
            Social Profile
          </button>
          <button
            className={`font-medium pb-[10px] ${
              activeTab === "business" 
                ? "text-black border-b-2 border-[#131313] " 
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => handleTabChange("business")}
          >
            Business Details
          </button>
        </div>
        <Button 
          className="bg-black h-[43px] hover:bg-gray-800 text-white rounded-full px-6"
        >
          Change Password
        </Button>
      </div>

      {/* Content Area */}
      <div className="p-6 relative border-t ">
        {activeTab === "personal" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
            <div>
              <p className="text-gray-700 mb-2">First Name</p>
              <p className="font-medium">{userData.firstName}</p>
            </div>
            
            <div>
              <p className="text-gray-700 mb-2">Last Name</p>
              <p className="font-medium">{userData.lastName}</p>
            </div>
            
            <div>
              <p className="text-gray-700 mb-2">Email</p>
              <p className="font-medium">{userData.email}</p>
            </div>
            
            <div>
              <p className="text-gray-700 mb-2">Phone Number</p>
              <p className="font-medium">{userData.phone}</p>
            </div>
            
            <div>
              <p className="text-gray-700 mb-2">State</p>
              <p className="font-medium">{userData.state}</p>
            </div>
            
            <div>
              <p className="text-gray-700 mb-2">City</p>
              <p className="font-medium">{userData.city}</p>
            </div>
            
            <div>
              <p className="text-gray-700 mb-2">Id Proof</p>
              <p className="font-medium">{userData.idProof}</p>
            </div>
          </div>
        )}

        {activeTab === "social" && (
          <div>
            <p className="text-gray-500">Add your social media profiles.</p>
          </div>
        )}

        {activeTab === "business" && (
          <div>
            <p className="text-gray-500">Add your business details.</p>
          </div>
        )}
        
        {/* Edit Button - Positioned in the bottom right */}
        <Button 
          onClick={handleEdit}
          className="absolute bottom-8 right-8 rounded-full bg-white hover:bg-gray-100 border border-black text-black flex items-center gap-2 px-6"
        >
          <EditIcon className="w-4 h-4" />
          Edit
        </Button>
      </div>
    </div>
  );
} 