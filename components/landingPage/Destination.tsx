"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import Delhi from "@/public/assets/destination/delhi.png"
import Kolkata from "@/public/assets/destination/Kalkata.png"
import Bombay from "@/public/assets/destination/bombay.png"
import Karela from "@/public/assets/destination/karela.png"

export default function TrendingDestinations() {
  return (
    <div className="py-8 px-4 md:px-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Trending destinations</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Delhi */}
        <div className="relative rounded-2xl overflow-hidden group">
          <div className="aspect-[4/3] relative">
            <Image
              src={Delhi}
              alt="Delhi"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
          <div className="absolute bottom-[-10px] left-0 right-0 p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white text-lg font-semibold">Delhi</h3>
              </div>
              <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Kolkata */}
        <div className="relative rounded-2xl overflow-hidden group">
          <div className="aspect-[4/3] relative">
            <Image
              src={Kolkata}
              alt="Kolkata"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
          <div className="absolute bottom-[-10px] left-0 right-0 p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white text-lg font-semibold">Kolkata</h3>
              </div>
              <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Bombay */}
        <div className="relative rounded-2xl overflow-hidden group">
          <div className="aspect-[4/3] relative">
            <Image
              src={Bombay}
              alt="Bombay"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
          <div className="absolute bottom-[-10px] left-0 right-0 p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white text-lg font-semibold">Bombay</h3>
              </div>
              <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Kerala */}
        <div className="relative rounded-2xl overflow-hidden group">
          <div className="aspect-[4/3] relative">
            <Image
              src={Karela}
              alt="Kerala"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
          <div className="absolute bottom-[-10px] left-0 right-0 p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white text-lg font-semibold">Kerala</h3>
              </div>
              <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-base md:text-lg mt-6 max-w-3xl mx-auto text-center">
        When it comes to planning a dream destination, some destinations
        stand out as top recommendations for travelers.
      </p>
    </div>
  )
}
