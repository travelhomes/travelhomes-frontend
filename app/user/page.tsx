"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Appbar from "@/components/landingPage/appbar";
import user from "@/public/user.png";
import { EditIcon  } from "@/public/assets/CustomIcon";
import Footer from "@/components/landingPage/footer";
import { useState } from "react";
import {Check} from "lucide-react";

export default function User() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "David Singh",
    phone: "+91 92929 *****",
    email: "davidsingh555@gmail.com",
    dob: "15th Dec 1995",
    city: "Hyderabad",
    state: "Telangana",
    password: "********"
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically make an API call to save the updated data
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="py-[1rem] px-[1rem] md:px-[5rem] border-b">
        <Appbar />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          {/* Sidebar */}
          <div className="bg-[#131313] rounded-lg p-[2rem] space-y-6">
            {/* Profile Photo Component */}
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div
                className={`w-full h-full rounded-full overflow-hidden bg-sidebar-accent flex items-center justify-center border-2 border-sidebar-border`}
              >
                <Image
                  src={user}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              </div>
              <button className="p-2 bg-sidebar-primary rounded-full hover:bg-opacity-90 transition-all text-[#FFFFFF] mt-[12px]">
                Upload a photo
              </button>
            </div>

            <div className="space-y-4 text-[#FFFFFF]">
              <div className="p-4 mt-[3rem]">
                <h3 className="text-sm font-medium mb-3">
                  Identity Verification
                </h3>
                <p className="text-xs mb-4">
                  Complete these steps to verify your identity and unlock all
                  features
                </p>

                {/* Verification Status Component */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 ">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Email Confirmed</span>
                  </div>
                  <div className="flex items-center space-x-2 ">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Profile Confirmed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-card rounded-lg ">
            <div className="flex justify-between items-center mb-[30px]">
              <h1 className="text-[2rem] font-bold text-[#1C2939] ">
                Profile
              </h1>
              <button 
                className="text-[#1C2939] text-[1rem] font-medium flex items-center gap-2"
                onClick={isEditing ? handleSave : handleEdit}
              >
                {isEditing ? "" : <EditIcon />}
                {isEditing ? <button className="px-[20px] py-[12px] text-sm font-medium text-white bg-black rounded-[60px]">Save</button> : "Edit"}
              </button>
            </div>
            <div className="max-w-3xl">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(userData).map(([key, value]) => (
                    <div className="space-y-2" key={key}>
                      <Label htmlFor={key} className="text-[#334054] font-semibold">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </Label>
                      {isEditing ? (
                        <Input
                          id={key}
                          name={key}
                          value={value}
                          onChange={handleChange}
                          className="text-[#717171] font-medium"
                          type={key === 'password' ? 'password' : 'text'}
                        />
                      ) : (
                        <p id={key} className="text-[#717171] font-medium">{value}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
