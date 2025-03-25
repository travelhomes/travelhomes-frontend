"use client";

import { useState, useEffect } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Pencil, X, Plus, Instagram, Facebook } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

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
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [socialLinks, setSocialLinks] = useState([
    { title: "Badal Singh", url: "+91 5202442423" }
  ]);
  
  const [socialAccounts, setSocialAccounts] = useState({
    instagram: "@badal_ux",
    facebook: "@badal_ux"
  });
  
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResetPassword = () => {
    // Handle password reset logic here
    console.log("Password reset with data:", passwordData);
    // Reset form and close modal
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setShowPasswordModal(false);
  };
  
  const handleSocialLinkChange = (index: number, field: 'title' | 'url', value: string) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index][field] = value;
    setSocialLinks(updatedLinks);
  };
  
  const handleAddSocialLink = () => {
    setSocialLinks([...socialLinks, { title: "", url: "" }]);
  };
  
  const handleRemoveAccount = (type: 'instagram' | 'facebook') => {
    setSocialAccounts(prev => ({
      ...prev,
      [type]: ""
    }));
  };

  useEffect(() => {
    const tab = searchParams.get("tab") as "personal" | "social" | "business";
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <div className={`${plusJakartaSans.className} bg-[#FFFFFF] h-[90vh] rounded-[24px]`}>
      {/* Header with Tabs and Change Password */}
      <div className="flex justify-between items-center py-[16px] px-[20px] border-b border-[#EAECF0]">
        <div className="flex gap-6">
          <button
            className={`font-medium  pb-[10px] ${
              activeTab === "personal" 
                ? "text-black border-b-2 border-[#131313] " 
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
            className={`font-medium  pb-[10px] ${
              activeTab === "business" 
                ? "text-black border-b-2 border-[#131313]" 
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => handleTabChange("business")}
          >
            Business Details
          </button>
        </div>
        <Button 
          className="rounded-full bg-[#131313] hover:bg-black/90 text-white px-[24px] py-[20px]"
          onClick={() => setShowPasswordModal(true)}
        >
          Change Password
        </Button>
      </div>

      {/* Content Area */}
      <div className="p-6 border-t">
        {activeTab === "personal" && (
          <div className="p-6 relative bg-[#F6F6F6] rounded-[12px]">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
              <div>
                <p className="text-[#334054] mb-3">First Name</p>
                <p className="text-[#717171]">{userData.firstName}</p>
              </div>
              
              <div>
                <p className="text-[#334054] mb-3">Last Name</p>
                <p className="text-[#717171]">{userData.lastName}</p>
              </div>
              
              <div>
                <p className="text-[#334054] mb-3">Email</p>
                <p className="text-[#717171]">{userData.email}</p>
              </div>
              
              <div>
                <p className="text-[#334054] mb-3">Phone Number</p>
                <p className="text-[#717171]">{userData.phone}</p>
              </div>
              
              <div>
                <p className="text-[#334054] mb-3">State</p>
                <p className="text-[#717171]">{userData.state}</p>
              </div>
              
              <div>
                <p className="text-[#334054] mb-3">City</p>
                <p className="text-[#717171]">{userData.city}</p>
              </div>
              
              <div>
                <p className="text-[#334054] mb-3">Id Proof</p>
                <p className="text-[#717171]">{userData.idProof}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "social" && (
          <div className="space-y-8">
            {/* Connected Account Section - White background with border */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-3">Connected Account</h2>
              <p className="text-[#485467] mb-6">Build trust with your network by connecting your social profiles</p>
              
              <div className="space-y-4">
                {/* Instagram */}
                <div className="flex items-center justify-between py-3 border-b pb-[28px]">
                  <div className="flex items-center gap-4">
                    <Instagram className="text-black" />
                    <span className="font-medium">Instagram</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#485467]">{socialAccounts.instagram}</span>
                    <button 
                      onClick={() => handleRemoveAccount('instagram')}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
                
                {/* Facebook */}
                <div className="flex items-center justify-between pb-[28px] py-3">
                  <div className="flex items-center gap-4">
                    <Facebook className="text-black" />
                    <span className="font-medium">Facebook</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#485467]">{socialAccounts.facebook}</span>
                    <button 
                      onClick={() => handleRemoveAccount('facebook')}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Links Section - Light gray background */}
     <div className="bg-[#F9F9F9] p-6 rounded-xl">
              <div className="flex gap-4 mb-6">
                <div className="w-[40%]">
                  <label className="block text-[#485467] mb-2">Link Title</label>
                  <Input 
                    value={socialLinks[0].title}
                    onChange={(e) => handleSocialLinkChange(0, 'title', e.target.value)}
                    className="h-12 border rounded-lg w-full"
                    placeholder="Enter link title"
                  />
                </div>
                <div className="w-[40%]">
                  <label className="block text-[#485467] mb-2">URL</label>
                  <Input 
                    value={socialLinks[0].url}
                    onChange={(e) => handleSocialLinkChange(0, 'url', e.target.value)}
                    className="w-full h-12 border rounded-lg"
                    placeholder="Enter URL"
                  />
                </div>
                <div className="w-[10%] flex items-end">
                  <Button className="rounded-full bg-[#131313] text-white w-full h-12">
                    ADD
                  </Button>
                </div>
              </div>
            </div>       
            <div className="flex justify-end">
                <p 
                  onClick={handleAddSocialLink}
                  className="flex items-center  text-black px-5"
                >
                  <Plus size={18} />
                  Add More
                </p>
              </div>
          </div>
        )}

        {activeTab === "business" && (
          <div className="p-6 relative bg-[#F6F6F6] rounded-[12px]">
            <p className="text-gray-500">Add your business details.</p>
          </div>
        )}
        
        {/* Edit Button - Positioned in the bottom right - Only show for Personal and Business tabs */}
        {activeTab !== "social" && (
          <div className="flex justify-end mt-[20px]">
            <Button 
              onClick={handleEdit}
              className="rounded-full h-[48px] bg-white hover:bg-gray-100 border border-black text-black flex items-center gap-2 px-6"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </Button>
          </div>
        )}
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-[540px] relative">
            <button 
              onClick={() => setShowPasswordModal(false)}
              className="absolute right-4 p-[4px] bg-[#E5E5E5] rounded-[30px] top-4 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>
            
            <div className="mb-6">
              <h2 className="text-[2rem] font-semibold mb-3">Change new password</h2>
              <p className="text-[#334054]">Enter different password with previous one</p>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block mb-3 text-[#334054]">Current Password</label>
                <Input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  className="w-full h-[52px] py-[16px] px-[12px] border rounded-[8px]"
                />
              </div>
              
              <div>
                <label className="block mb-3 text-[#334054]">Create New Password</label>
                <Input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  className="w-full h-[52px] py-[16px] px-[12px] border rounded-[8px]"
                />
              </div>
              
              <div>
                <label className="block mb-3 text-[#334054]">Confirm Password</label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  className="w-full h-[52px] py-[16px] px-[12px] border rounded-[8px]"
                />
              </div>
              
              <Button
                onClick={handleResetPassword}
                className="w-full h-[48px] bg-[#131313] hover:bg-black/90 text-white rounded-full py-3 mt-[32px]"
              >
                Re-set Password
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 