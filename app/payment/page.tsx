"use client";

import Appbar from "@/components/landingPage/appbar";
import {  Star } from "lucide-react";
import Image from "next/image";
import image from "@/public/Rectangle 8.png";
import Link from "next/link";
import { ArrowRightIcon, EditIcon } from "@/public/assets/CustomIcon";
export default function page() {
  return (
    <main className="min-h-screen py-[1rem] px-[1rem] md:px-[2rem] lg:px-[5rem]">
      {/* Header */}
      <Appbar />

      <div className="mx-auto p-4 flex flex-col-reverse lg:flex-row gap-6">
        {/* Left Column */}

        <div className="flex-1 ">

          <div className="hidden lg:block">
          <Link
            href="#"
            className="inline-flex items-center text-sm text-semibold hover:text-primary mb-3  "
          >
            <ArrowRightIcon /> <span className="ml-2">Modify Booking</span>
          </Link>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border-[1px]">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-2xl font-semibold text-[#1C2939]">
                Booking Details
              </h1>
              <button className="text-gray-500 hover:text-gray-700">
                <EditIcon />
              </button>
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

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[#1C2939]">
                  Enter your details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#334054] mb-1">Name</label>
                    <input
                      type="text"
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
                      placeholder="+91  52024 42423"
                      className="w-full px-4 py-2 border rounded-[8px] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#334054] mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border rounded-[8px] outline-none"
                  />
                </div>

                <button className="md:w-[130px] w-full bg-black text-white py-3 rounded-[60px] transition-colors">
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
      
        
        <div className="w-full md:w-[370px] h-fit rounded-[12px] shadow-sw">
        <div className="md:hidden block">
          <Link
            href="#"
            className="inline-flex items-center text-sm text-semibold hover:text-primary mb-3  "
          >
            <ArrowRightIcon /> <span className="ml-2">Modify Booking</span>
          </Link>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex gap-4 mb-6">
              <Image
                src={image}
                alt="Camper Van"
                width={125}
                height={110}
                className="rounded-lg object-cover"
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

            <div className="border-t border-b  border-[#DDDDDD] pt-4 mb-[24px]">
              <div className="flex items-center text-sm text-[#5E5E5E] mb-4">
                <span>Your booking is protected by</span>
                <span className="font-semibold text-[#131313] ml-1">
                  TravelHomes
                </span>
              </div>
            </div>

            <h3 className="text-[22px] text-[#222222] font-semibold mb-4">Price details</h3>

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
    </main>
  );
}
