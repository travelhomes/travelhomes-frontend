'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import Delhi from "@/public/assets/destination/delhi.png"
import Kolkata from "@/public/assets/destination/Kalkata.png"
import Bombay from "@/public/assets/destination/bombay.png"
import Karela from "@/public/assets/destination/karela.png"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

export default function TrendingDestinations() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 1.1,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 640px)': {
        slides: {
          perView: 2,
          spacing: 16,
        },
      },
      '(min-width: 1024px)': {
        slides: {
          perView: 4,
          spacing: 16,
        },
      },
    },
  })

  const destinations = [
    { image: Delhi, name: 'Delhi' },
    { image: Kolkata, name: 'Kolkata' },
    { image: Bombay, name: 'Bombay' },
    { image: Karela, name: 'Kerala' }
  ]

  return (
    <div className="py-8 px-4 md:px-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Trending destinations</h2>
      <div ref={sliderRef} className="keen-slider">
        {destinations.map((destination, index) => (
          <div key={index} className="keen-slider__slide">
            <div className="relative rounded-2xl overflow-hidden">
              <div className="aspect-[4/3] relative">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white text-base sm:text-lg font-semibold">{destination.name}</h3>
                  </div>
                  <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[#6A6A6A] text-sm sm:text-base md:text-[18px] mt-6 px-4">
        When it comes to planning a dream destination, some destinations stand out as top recommendations for travelers.
      </p>
    </div>
  )
}
