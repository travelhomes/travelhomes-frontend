/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import Image1 from "@/public/assets/UniqueStays/image1.png";
import Image2 from "@/public/assets/UniqueStays/image2.png";
import Image3 from "@/public/assets/UniqueStays/image3.png";
import Image4 from "@/public/assets/UniqueStays/image4.png";
import { Plus_Jakarta_Sans } from "next/font/google"; // Corrected import path
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const campers = [
  {
    imageUrl: Image1,
    title: "New Camper Van, Jaipur",
    rating: 4.91,
    seats: 4,
    sleeps: 2,
    favoriteText: "Guest Favourite",
    price: 2890,
    period: "day",
    images: [Image1, Image2, Image3, Image4], // Specific images for this camper
  },
  {
    imageUrl: Image2,
    title: "New Camper Van, Jaipur",
    rating: 4.91,
    seats: 4,
    sleeps: 2,
    price: 2890,
    period: "night",
    images: [Image3, Image4, Image1, Image2], // Specific images for this camper
  },
  {
    imageUrl: Image3,
    title: "New Camper Van, Jaipur",
    rating: 4.91,
    seats: 4,
    sleeps: 2,
    price: 2890,
    period: "night",
    images: [Image2, Image3, Image4, Image1], // Specific images for this camper
  },
  {
    imageUrl: Image4,
    title: "New Camper Van, Jaipur",
    rating: 4.91,
    seats: 4,
    sleeps: 2,
    favoriteText: "Guest Favourite",
    price: 2890,
    period: "night",
    images: [Image1, Image4, Image3, Image2], // Specific images for this camper
  },
];

export default function UniqueStay() {
  return (
    <section className="py-12 md:px-4 mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="md:text-2xl text-[20px] font-bold mb-2">
            Stay at our top Camper Van
          </h2>
          <p className="text-[#989892]">
            From castles and villas to boats and igloos, we have it all
          </p>
        </div>


        <Link href="/discover"> 
        <button className="hidden md:block text-gray-900 font-medium hover:underline">
          Discover more
        </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {campers.map((camper, index) => (
          //@ts-expect-error
          <CamperCard key={index} {...camper} />
        ))}
      </div>

<Link href="/discover"> 
      <button className="px-[20px] py-[12px] text-sm font-medium text-gray-700 border border-gray-300 rounded-[60px] text-center m-auto block md:hidden">
        Discover more
      </button>
      </Link>
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
  images: string[]; // Added images prop
}

function CamperCard({
  title,
  rating,
  seats,
  sleeps,
  price,
  period,
  favoriteText,
  images,
}: CamperCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Link href="/product">
<div className="relative rounded-xl">
      <div
        className="relative aspect-[1] w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={images[currentImageIndex]}
          alt={title}
          fill
          className="rounded-[12px] transition-all duration-300 hover:brightness-75"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 37vw"
        />
        
        {/* Carousel Navigation Arrows */}
        {isHovered && (
          <>
            {currentImageIndex > 0 && (
              <button
                onClick={handlePrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md transition-opacity hover:bg-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            {currentImageIndex < images.length - 1 && (
              <button
                onClick={handleNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md transition-opacity hover:bg-white"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 z-50 p-2 rounded-full"
        >
          <Heart
            className={`w-5 h-5 z-50 ${
              isFavorite
                ? "fill-red-500 stroke-red-500"
                : "stroke-white fill-gray-400"
            }`}
          />
        </button>

        {/* Favorite Text */}
        <div
          className={`absolute top-3 left-3 ${
            favoriteText ? "bg-white/90" : ""
          } px-3 py-1 rounded-[4px]`}
        >
          <span className="text-sm font-medium">{favoriteText}</span>
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full bg-white ${
                index === currentImageIndex ? "opacity-100" : "opacity-60"
              }`}
            />
          ))}
        </div>
      </div>

        <div className="py-4">
          <div className="flex justify-between items-start">
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

          <p className="text-[#5E5E5E] text-[14px] mb-1">
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
    </div>
      </Link>
  );
}
