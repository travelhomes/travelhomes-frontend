"use client";
import React, { useState } from "react";
import { Star, X, Check, ArrowLeft } from "lucide-react";
import Image from "next/image";
import CamperImage from "@/public/Rectangle 8.png"
import { ArrowRightIcon } from "@/public/assets/CustomIcon"



export default function Payment() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      phone: "",
      email: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) {
      setFormError("Error! This payment was done processed. Please retry...");
    } else {
      setFormError("");
    }
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowSuccess(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <main className="min-h-screen py-[1rem] px-[1rem] md:px-[2rem] lg:px-[5rem] relative">
      <div className="mx-auto p-4 flex flex-col gap-4">
        <div className="flex flex-col-reverse lg:flex-row gap-6">
          {/* Left Column */}
          <div className="flex-1">
            <div className="hidden lg:block">
              <a
                href="#"
                className="inline-flex items-center text-sm text-semibold hover:text-primary mb-3"
              >
                <ArrowRightIcon />
                <span className="ml-2">Modify Booking</span>
              </a>
            </div>

       

            {formError && (
              <div className="p-4 hidden md:block  border rounded-[6px] bg-[#DA190B1F] text-[#DA190B] border-[#DA190B] mb-[24px]">
                {formError}
              </div>
            )}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border-[1px]">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-2xl font-semibold text-[#1C2939]">
                  Booking Details
                </h1>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h2 className="text-[#334054] mb-1">Date</h2>
                    <p className="text-[#717171] font-medium">27-28 Jan</p>
                  </div>
                  <div>
                    <h2 className="text-[#334054] mb-1">Guest</h2>
                    <p className="text-[#717171] font-medium">2</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-[#334054] mb-1">Location</h2>
                  <p className="text-[#717171] font-medium">Mumbai</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-xl font-semibold text-[#1C2939]">
                    Enter your details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#334054] mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        className="w-full px-4 py-2 border rounded-[8px] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#334054] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 52024 42423"
                        className="w-full px-4 py-2 border rounded-[8px] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#334054] mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 border rounded-[8px] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="md:w-[130px] w-full bg-black text-white py-3 rounded-[60px] transition-colors hover:bg-gray-800"
                  >
                    Proceed
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-[370px] h-fit rounded-[12px] shadow-sw">
            <div className="md:hidden block">
              <a
                href="#"
                className="inline-flex items-center text-sm text-semibold hover:text-primary mb-3"
              >
                <ArrowLeft className="w-4 h-4" />{" "}
                <span className="ml-2">Modify Booking</span>
              </a>
            </div>

            {formError && (
              <div className="p-4 block md:hidden  border rounded-[6px] bg-[#DA190B1F] text-[#DA190B] border-[#DA190B] mb-[24px]">
                {formError}
              </div>
            )}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex gap-4 mb-6">
                <Image
                  src={CamperImage}
                  alt="Camper Van"
                  width={125}
                  height={110}
                  className=" h-[110px] rounded-lg"
                />
                <div>
                  <span className="text-[12px] text-[#717171]">Camper Van</span>
                  <h2 className="text-[18px] font-semibold text-[#1C2939]">
                    My Rolling Homes
                  </h2>
                  <div className="flex items-center gap-1 mt-[25px] text-[16px]">
                    <Star className="w-4 h-4 fill-current text-[#222222]" />
                    <span className="font-medium text-[#222222]">4.91</span>
                    <span className="text-[#5E5E5E]">• 337 reviews</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-b border-[#DDDDDD] py-4 mb-[24px]">
                <div className="flex items-center text-sm text-[#5E5E5E]">
                  <span>Your booking is protected by</span>
                  <span className="font-semibold text-[#131313] ml-1">
                    TravelHomes
                  </span>
                </div>
              </div>

              <h3 className="text-[22px] text-[#222222] font-semibold mb-4">
                Price details
              </h3>

              <div className="space-y-3 text-[#222222]">
                <div className="flex justify-between">
                  <span className="text-gray-600">500 x 5 nights</span>
                  <span>$2,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Long stay discount</span>
                  <span>-$2,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cleaning fee</span>
                  <span>$200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service fee</span>
                  <span>$0</span>
                </div>
                <div className="pt-[24px] border-t flex justify-between font-semibold">
                  <span>Total (USD)</span>
                  <span>$2,400</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowSuccess(false)}
          />
          <div className="bg-white rounded-2xl p-8 relative z-10 max-w-md w-full mx-4">
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-8 h-8 bg-[#E5E5E5] rounded-full p-2" />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Congrats!</h2>
              <p className="text-gray-600 mb-6">
                Your payment is processed successfully. You will receive a
                confirmation email shortly.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowSuccess(false)}
                  className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-50"
                >
                  Back To Home
                </button>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800"
                >
                  Booking Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
