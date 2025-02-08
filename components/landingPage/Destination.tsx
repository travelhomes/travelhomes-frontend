"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Delhi from "@/public/assets/destination/delhi.png";
import Kolkata from "@/public/assets/destination/Kalkata.png";
import Bombay from "@/public/assets/destination/bombay.png";
import Karela from "@/public/assets/destination/karela.png";
import { useRef } from "react";

export default function TrendingDestinations() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const destinations = [
    { image: Delhi, name: "Delhi" },
    { image: Kolkata, name: "Kolkata" }, 
    { image: Bombay, name: "Bombay" },
    { image: Karela, name: "Kerala" }
  ];

  return (
    <div className="py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Mobile heading and description */}
        <div className="lg:hidden col-span-full mb-6">
          <h2 className="text-2xl md:text-2xl font-bold mb-4">
            Trending destinations
          </h2>
          <p className="text-gray-600 text-base md:text-lg md:text-left">
            When it comes to planning a dream destination, some destinations
            stand out as top recommendations for travelers.
          </p>
        </div>

        {/* Mobile Slider for all cards */}
        <div className="lg:hidden col-span-full">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide"
          >
            {destinations.map((dest, index) => (
              <div 
                key={index}
                className="relative rounded-2xl overflow-hidden group flex-none w-[85%] snap-start"
              >
                <div className="w-full h-[270px] relative">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute bottom-[-10px] left-0 right-0 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <h3 className="text-white text-lg font-semibold">{dest.name}</h3>
                    </div>
                    <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block relative rounded-2xl overflow-hidden group">
          <h2 className="text-2xl md:text-2xl font-bold mb-6">
            Trending destinations
          </h2>
          <div className="w-full h-[290px] relative">
            <Image
              src={Delhi}
              alt="Delhi"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="absolute bottom-[-10px] left-0 right-0 p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <h3 className="text-white text-lg font-semibold">Delhi</h3>
              </div>
              <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block relative rounded-2xl overflow-hidden group">
          <div className="w-full h-[380px] relative">
            <Image
              src={Kolkata}
              alt="Kolkata"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="absolute bottom-[-10px] left-0 right-0 p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <h3 className="text-white text-lg font-semibold">Kolkata</h3>
              </div>
              <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block relative rounded-2xl overflow-hidden group">
          <div className="w-full h-[380px] relative">
            <Image
              src={Bombay}
              alt="Bombay"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="absolute bottom-[-10px] left-0 right-0 p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <h3 className="text-white text-lg font-semibold">Bombay</h3>
              </div>
              <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

<div className="relative">
        <div className="hidden lg:block md:h-[220px] rounded-2xl overflow-hidden group relative">
          <div className="w-full  h-[360px] relative">
            <Image
              src={Karela}
              alt="Kerala"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="absolute bottom-[-10px] left-0 right-0 p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <h3 className="text-white text-lg font-semibold">Kerala</h3>
              </div>
              <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        <p className="hidden lg:block text-gray-600 text-base md:text-lg text-center mt-4">
          When it comes to planning a dream destination, some destinations
          stand out as top recommendations for travelers.
        </p>
      </div>
      </div>
    </div>
  );
}
