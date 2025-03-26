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
    <section className="py-8 px-4 md:px-6">
      {/* Mobile heading and description */}
      <div className="lg:hidden mb-6">
        <h2 className="text-2xl font-bold mb-4">
          <span>Trending </span>
          <span>Destinations</span>
        </h2>
        <p className="text-gray-600 text-base md:text-lg">
          When it comes to planning a dream destination, some destinations
          stand out as top recommendations for travelers.
        </p>
      </div>

      {/* Mobile Slider for small screens */}
      <div className="lg:hidden">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Arrow icon (top right) */}
                <div className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 z-10">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
              
              {/* Destination name (bottom) */}
              <div className="absolute bottom-4 left-0 right-0 px-4">
                <h3 className="text-white text-lg font-semibold relative z-10">{dest.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <h2 className="text-4xl font-bold mb-6">
            Trending destinations
          </h2>
          <div className="relative rounded-2xl overflow-hidden group h-[300px]">
            <Image
              src={Delhi}
              alt="Delhi"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Arrow icon (top right) */}
            <div className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 z-10">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
            
            {/* Destination name (bottom) */}
            <div className="absolute bottom-4 left-0 right-0 px-4">
              <h3 className="text-white text-lg font-semibold">Delhi</h3>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative rounded-2xl overflow-hidden group h-[410px]">
            <Image
              src={Kolkata}
              alt="Kolkata"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Arrow icon (top right) */}
            <div className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 z-10">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
            
            {/* Destination name (bottom) */}
            <div className="absolute bottom-4 left-0 right-0 px-4">
              <h3 className="text-white text-lg font-semibold">Kolkata</h3>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative rounded-2xl overflow-hidden group h-[410px]">
            <Image
              src={Bombay}
              alt="Bombay"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Arrow icon (top right) */}
            <div className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 z-10">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
            
            {/* Destination name (bottom) */}
            <div className="absolute bottom-4 left-0 right-0 px-4">
              <h3 className="text-white text-lg font-semibold">Bombay</h3>
            </div>
          </div>
        </div>

        <div className="col-span-1 flex flex-col">
          <div className="relative rounded-2xl overflow-hidden group h-[270px]">
            <Image
              src={Karela}
              alt="Kerala"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Arrow icon (top right) */}
            <div className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 z-10">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
            
            {/* Destination name (bottom) */}
            <div className="absolute bottom-4 left-0 right-0 px-4">
              <h3 className="text-white text-lg font-semibold">Kerala</h3>
            </div>
          </div>
          <p className="text-gray-600 text-base md:text-lg text-center mt-4">
            When it comes to planning a dream destination, some destinations
            stand out as top recommendations for travelers.
          </p>
        </div>
      </div>
    </section>
  );
}
