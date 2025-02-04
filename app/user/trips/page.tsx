"use client";
import React, { useState } from "react";
import { Filter } from "lucide-react";
import Appbar from "@/components/landingPage/appbar";
import Image from "next/image";
import Footer from "@/components/landingPage/footer";

type Trip = {
  id: number;
  image: string;
  title: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  price: number;
  isUnique?: boolean;
};

export default function Trips() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "previous">("upcoming");

  const trips: Trip[] = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&q=80&w=400",
      title: "Fully Furnished Apartment",
      checkIn: "20/10/23",
      checkOut: "25/10/23",
      guests: 2,
      price: 2890,
      isUnique: true,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400",
      title: "Fully Furnished Apartment",
      checkIn: "20/10/23",
      checkOut: "25/10/23",
      guests: 2,
      price: 2890,
      isUnique: true,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=400",
      title: "Fully Furnished Apartment",
      checkIn: "20/10/23",
      checkOut: "25/10/23",
      guests: 2,
      price: 2890,
      isUnique: true,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="py-[1rem] px-[1rem] md:px-[5rem] border-b">
        <Appbar />
      </div>

      <div className="max-w-7xl mx-[5rem] px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[2rem] font-semibold text-[#1C2939]">Trips</h1>
          <button className="flex items-center gap-[10px] px-[20px] py-[12px] text-sm font-medium rounded-[60px] border">
            <Filter className="w-4 h-4 text-gray-600" /> <span>Filter</span>
          </button>
        </div>  

        <div className="flex gap-6 mb-6 border-b border-gray-200">
          <button
            className={`pb-3 ${
              activeTab === "upcoming"
                ? "border-b-2 border-black text-black font-medium"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcomings
          </button>
          <button
            className={`pb-3 ${
              activeTab === "previous"
                ? "border-b-2 border-black text-black font-medium"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("previous")}
          >
            Previous
          </button>
        </div>

        <div className="space-y-4">
          {trips.map((trip) => (
            <div key={trip.id} className="flex items-start gap-3 py-2">
              <Image
                src={trip.image}
                alt={trip.title}
                className="w-[110px] h-[110px] object-cover rounded-lg"
                width={100}
                height={100}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-[12px]">
                      <h3 className="font-medium text-[#334054]">
                        {trip.title}
                      </h3>
                      {trip.isUnique && (
                        <span className="inline-block text-xs text-[#222222] rounded-[4px] px-[12px] py-[5px] bg-[#00000014]">
                          Unique Stay
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-4 text-xs text-gray-500 mb-[25px]">
                      <div className="flex items-center gap-1">
                        <span className="text-[#222222] font-bold">
                          Check-in:{" "}
                          <span className="text-[#5E5E5E] font-normal">{trip.checkIn}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                      <span className="text-[#222222] font-bold">
                          Check-out:{" "}
                          <span className="text-[#5E5E5E] font-normal">{trip.checkOut}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[#222222] font-bold">
                          Guest:{" "}
                          <span className="text-[#5E5E5E] font-normal">
                            {trip.guests}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="mt-1 text-sm">
                      <span className="font-medium text-gray-900">
                        ₹{trip.price}
                      </span>
                      <span className="text-gray-500">/day</span>
                    </div>
                  </div>
                  <div className="flex gap-[20px] shrink-0">
                    {activeTab === "upcoming" ? (
                      <>
                        <button className="px-[20px] py-[12px] text-sm font-medium rounded-[60px] border border-[#000000]">
                          Cancel Reservation
                        </button>
                        <button className="px-[20px] py-[12px] text-sm font-medium text-white bg-black rounded-[60px]">
                          View
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="px-[20px] py-[12px] text-sm font-medium rounded-[60px] border border-[#000000]">
                          Get a Invoice
                        </button>
                        <button className="px-[20px] py-[12px] text-sm font-medium text-white bg-black rounded-[60px]">
                          View
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}