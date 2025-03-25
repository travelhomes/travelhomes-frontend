"use client";

import { useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";
import { CheckCircle2 } from "lucide-react";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface SettingsContentProps {
  initialTab?: "general" | "issue";
}

export function SettingsContent({ initialTab = "general" }: SettingsContentProps) {
  const [activeTab, setActiveTab] = useState<"general" | "issue">(initialTab);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
    email: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, we're showing success popup without validation
    setShowSuccessPopup(true);
  };

  const closePopup = () => {
    setShowSuccessPopup(false);
    // Reset form after submission
    setFormData({
      name: "",
      phone: "",
      subject: "",
      email: "",
      message: ""
    });
    setActiveTab("general");
  };

  return (
    <div className={`${plusJakartaSans.className} bg-white rounded-xl h-full overflow-y-auto`}>
      {/* Content Area */}
      <div>
        {activeTab === "general" && (
          <div>
            <h2 className="text-[20px] font-semibold p-6">General Settings</h2>
            
            <div className="border-t p-6">
            <div className="bg-white rounded-[16px] p-6 border border-[#EAECF0] mb-4 h-[107px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-gray-500">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className=" text-[#334054]">Confirmation before accepting booking</h3>
                      <p className="text-sm text-[#485467] mt-[6px]">when clients complete assessments or upload documents</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={bookingConfirmation} 
                    onChange={() => setBookingConfirmation(!bookingConfirmation)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#B0B0B0] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
          </div>
        )}

        {activeTab === "issue" && (
          <div>
            <h2 className="text-xl font-medium p-6">Raise Issue Ticket</h2>
            
            <div className="border-t border-[#EAECF0] p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-gray-700">Name</label>
                  <Input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Badal Singh"
                    className="w-full p-2 border h-[46px] border-[#B0B0B0] rounded-md focus:outline-none focus:ring-0 focus:border-gray-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-gray-700">Phone Number</label>
                  <Input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 52024 42423"
                    className="w-full p-2 border  h-[46px] border-[#B0B0B0] rounded-md focus:outline-none focus:ring-0 focus:border-gray-400"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-gray-700">Subject</label>
                  <Input 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="..."
                    className="w-full p-2 border  h-[46px] border-[#B0B0B0] rounded-md focus:outline-none focus:ring-0 focus:border-gray-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-gray-700">Email</label>
                  <Input 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="jpbadalsigh"
                    className="w-full p-2 border  h-[46px] border-[#B0B0B0] rounded-md focus:outline-none focus:ring-0 focus:border-gray-400"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-gray-700">Message</label>
                <Textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Badal Singh"
                  className="w-full p-2 border border-[#B0B0B0] rounded-md min-h-[160px] focus:outline-none focus:ring-0 focus:border-gray-400"
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="submit"
                  className="bg-black h-[48px] hover:bg-gray-800 text-white rounded-full px-12 py-2"
                >
                  Submit
                </Button>
              </div>
            </form>

            <div className="mt-12 bg-gray-50 p-8 rounded-[12px]">
              <h3 className="text-lg font-medium mb-4">How I delete my account</h3>
              <div className="space-y-2">
                <h4 className="font-medium">Message</h4>
                <p className="text-gray-600">
                  The alignment of the primary CTA button on the homepage appears inconsistent across different screen sizes. On smaller screens, the button shifts slightly to the right, affecting the visual balance.
                </p>
              </div>
            </div>
          </div>
          </div>

        )}
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed  inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-[550px]">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#4CAF50]/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-10 w-10 text-[#4CAF50]" />
              </div>
              
              <h3 className="text-2xl font-semibold mb-4">Thank you for submitting your details!</h3>
              
              <p className="text-gray-600 mb-8">
                Our team will review your information and get in touch with you shortly. Stay tuned for an exciting journey ahead!
              </p>
              
              <Button 
                onClick={closePopup}
                className="bg-black h-[48px] w-full hover:bg-gray-800 text-white rounded-full px-8 py-2"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 