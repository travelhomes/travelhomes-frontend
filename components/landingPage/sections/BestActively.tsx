/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import Image1 from "@/public/assets/bestactivety/image1.png"
import Image2 from "@/public/assets/bestactivety/image2.png";
import Image3 from "@/public/assets/bestactivety/image3.png";
import Image4 from "@/public/assets/bestactivety/image4.png";
import { Plus_Jakarta_Sans } from "next/font/google"; 
import { Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const campers = [
  {
    imageUrl: Image1, // Changed to directly use the image variable
    title: "New Camper Van, Jaipur",
    rating: 4.91,
    seats: 4,
    sleeps: 2,
    price: 2890,
    period: "day",
  },
  {
    imageUrl: Image2, // Changed to directly use the image variable
    title: "New Camper Van, Jaipur",
    rating: 4.91,
    seats: 4,
    sleeps: 2,
    price: 2890,
    period: "night",
  },
  {
    imageUrl: Image3, // Changed to directly use the image variable
    title: "New Camper Van, Jaipur",
    rating: 4.91,
    seats: 4,
    sleeps: 2,
    price: 2890,
    period: "night",
  },
  {
    imageUrl: Image4, // Changed to directly use the image variable
    title: "New Camper Van , Jaipur",
    rating: 4.91,
    seats: 4,
    sleeps: 2,
    favoriteText: "Guest Favourite",
    price: 2890,

    period: "night",
  },
];

export default function BestActivity() {
  return (
    <section className="md:py-12 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Best Activity</h2>
          <p className="text-gray-600">
            From castles and villas to boats and igloos, we have it all
          </p>
        </div>
        <button className="hidden md:block text-gray-900 font-medium hover:underline">
          Discover more
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {campers.map((camper, index) => (
          //@ts-expect-error
          <CamperCard key={index} {...camper} />
        ))}
      </div>

      <button className="px-[20px] py-[12px] text-sm font-medium text-gray-700 border border-gray-300 rounded-[60px] text-center m-auto block md:hidden">
        Discover more
      </button>

    </section>
  );
}

interface CamperCardProps {
  imageUrl: string;
  title: string;
  rating: number;
  seats: number;
  sleeps: number;
  price: number;
  period: string;
  favoriteText: string;
}

function CamperCard({
  imageUrl,
  title,
  rating,
  seats,
  sleeps,
  price,
  period,
}: CamperCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const dotsCount = 5; // Number of dots to display

  return (
    <div className="relative rounded-xl">
      <div className="relative aspect-[1] w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="rounded-[12px]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 37vw"
          />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 z-10 p-2 rounded-full"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? "fill-red-500 stroke-red-500" : "stroke-white fill-gray-400"
            }`}
          />
        </button>

        {/* Carousel Dots */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {[...Array(dotsCount)].map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full bg-white ${
                index === 0 ? "opacity-100" : "opacity-60"
              }`}
            />
          ))}
        </div>
      </div>

      <Link href="/product">
        <div className="py-4">
          <div className="flex justify-between items-start mb-2">
            <h3
              className={`${plusJakartaSans.className} text-[15px] text-[#222222] font-semibold`}
            >
              {title}
            </h3>
            <div className="flex text-[14px] items-center gap-1">
              <span>★</span>
              <span>{rating}</span>
            </div>
          </div>

          <p className="text-[#5E5E5E] text-[14px] mb-2">
            {seats} Seats / {sleeps} Sleeps
          </p>

          <div className="flex justify-between items-center text-[14px]">
            <div>
              <span className="text-[#5E5E5E] line-through">₹{price}</span>
              <span className="ml-2 text-lg font-bold text-[222222]">
                ₹{price}
              </span>
              <span className="text-[#222222]">/{period}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
