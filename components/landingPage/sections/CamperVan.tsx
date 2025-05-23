"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface PropertyData {
  id: number;
  title: string;
  avg_rating: number;
  seat_cap: number;
  sleep_cap: number;
  regular_price: string;
  discount_price: string;
  rule?: string;
  city: string;
}

interface CamperData {
  imageUrl: string;
  images: string[];
  property: PropertyData;
}

export default function CamperListing() {
  const [campers, setCampers] = useState<CamperData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCampers() {
      try {
        const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://3.7.52.212:5000";
        const response = await axios.get(`${BACKEND_URL}/api/properties/by-category/1`);
        if (response.data.success) {
          setCampers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching campers:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCampers();
  }, []);

  if (loading) {
    return (
      <section className="px-4 mt-[3rem] lg:mx-auto max-w-7xl animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex flex-col h-full">
              <div className="w-full h-[204px] bg-gray-300 rounded-[12px]" />
              <div className="py-3 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-5 bg-gray-300 rounded w-2/3 mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 mt-[3rem] lg:mx-auto max-w-7xl">
      <div className="flex justify-between items-center mb-4">
        <div className="w-full">
          <p className="md:text-[36px] text-[20px] font-bold mb-1 text-[#0B0907]">
            Stay at our top Camper Van
          </p>
          <div className="flex items-center justify-between">
            <p className="text-[#989892]">
              From castles and villas to boats and igloos, we have it all
            </p>
            <Link href="/discover">
              <button className="hidden md:block text-gray-900 font-medium hover:underline">
                Discover more
              </button>
            </Link>
          </div>
        </div>
      </div>

      {campers.length > 5 ? (
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 min-w-full pb-4">
            {campers.map((camper) => {
              // if (!camper || !camper.id) {
              //   // Log the structure of camper to debug
              //   console.error('Camper property missing id:', camper);
              //   return null;
              // }

              return (
                <div key={camper.id} className="min-w-[300px] max-w-[300px] flex-shrink-0">
                  <CamperCard
                    id={camper.id}
                    imageUrl={camper.imageUrl}
                    title={camper.title}
                    rating={camper.avg_rating}
                    seat_cap={camper.seat_cap}
                    sleep_cap={camper.sleep_cap}
                    regular_price={parseInt(camper.regular_price)}
                    discount_price={parseInt(camper.discount_price)}
                    period="night"
                    favoriteText={camper.rule || ""}
                    images={camper.images}
                    city={camper.city}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {campers.map((camper) => {
            // if (!camper || !camper.id) {
            //   // Log the structure of camper to debug
            //   console.error('Camper property missing id:', camper);
            //   return null;
            // }

            return (
              <div key={camper.id} className="min-w-[300px] max-w-[300px] flex-shrink-0">
                <CamperCard
                  id={camper.id}
                  imageUrl={camper.imageUrl}
                  title={camper.title}
                  rating={camper.avg_rating}
                  seat_cap={camper.seat_cap}
                  sleep_cap={camper.sleep_cap}
                  regular_price={parseInt(camper.regular_price)}
                  discount_price={parseInt(camper.discount_price)}
                  period="night"
                  favoriteText={camper.rule || ""}
                  images={camper.images}
                  city={camper.city}
                />
              </div>
            );
          })}
        </div>
      )}

      <Link href="/discover">
        <button className="px-[20px] py-[12px] text-sm font-medium text-gray-700 border border-gray-300 rounded-[60px] text-center m-auto block md:hidden mt-6">
          Discover more
        </button>
      </Link>
    </section>
  );
}

interface CamperCardProps {
  id: number;
  imageUrl: string;
  title: string;
  rating: number;
  seat_cap: number;
  sleep_cap: number;
  regular_price: number;
  discount_price: number;
  period: string;
  favoriteText: string;
  images: string[];
  city: string;
}

function CamperCard({
  id,
  title,
  rating,
  seat_cap,
  sleep_cap,
  regular_price,
  discount_price,
  period,
  favoriteText,
  images,
  city,
}: CamperCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const totalImages = images.length;
  const extendedImages = [...images, ...images, ...images];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? totalImages * 2 - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === totalImages * 2 - 1 ? 0 : prev + 1));
  };

  const displayImageIndex = currentImageIndex % totalImages;

  return (
    <Link href={`/product?id=${id}`}>
      <div className="flex flex-col h-full">
        <div
          className="relative w-full h-[204px] overflow-hidden rounded-[12px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute inset-0">
            {extendedImages.map((image, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(${(index - currentImageIndex) * 100}%)`,
                }}
              >
                <Image
                  src={image}
                  alt={`${title} - Image ${(index % totalImages) + 1}`}
                  fill
                  className="object-cover"
                  priority={index === currentImageIndex}
                />
              </div>
            ))}
          </div>

          {isHovered && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md transition-all hover:bg-white hover:scale-105"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md transition-all hover:bg-white hover:scale-105 z-20"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-3 right-3 p-2 rounded-full"
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? "fill-red-500 stroke-red-500" : "stroke-white fill-gray-400"}`}
            />
          </button>

          {favoriteText && (
            <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-[4px]">
              <span className="text-sm font-medium">{favoriteText}</span>
            </div>
          )}

          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full bg-white ${index === displayImageIndex ? "opacity-100" : "opacity-60"}`}
              />
            ))}
          </div>
        </div>

        <div className="py-3">
          <div className="flex justify-between items-start">
            <h3 className={`${plusJakartaSans.className} text-[15px] text-[#222222] font-semibold`}>
              {title} {city && `, ${city}`}
            </h3>
            <div className="flex text-[14px] items-center gap-1">
              <span>★</span>
              <span>{rating}</span>
            </div>
          </div>

          <p className="text-[#5E5E5E] text-[14px] mb-1">
            {seat_cap} Seats / {sleep_cap} Sleeps
          </p>

          <div className="flex justify-between items-center text-[14px]">
            <div>
              <span className="text-[#5E5E5E] line-through">₹{discount_price}</span>
              <span className="ml-2 text-lg font-bold text-[#222222]">₹{regular_price}</span>
              <span className="text-[#222222]">/{period}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}