"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


interface PropertyData {
  title: string;
  description: string;
  rule: string;
  city: string;
  state: string;
  discount_price: string;
  regular_price: string;
  images: string[];
}

interface CamperCardProps {
  property: PropertyData;
  images: string[];
}

const DiscoverPage = () => {
  const [properties, setProperties] = useState<CamperCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/properties/available",
          {
            params: {
              category_id: 1,
              from_date: "",
              to_date: "",
              from_place: "",
              to_place: "",
            },
          }
        );

        console.log("API Response:", response);

        if (response.data && Array.isArray(response.data.properties)) {
          const updatedProperties = response.data.properties.map((property: any) => ({
            property: {
              title: property.property.title,
              description: property.property.description,
              rule: property.property.rule,
              city: property.property.city,
              state: property.property.state,
              discount_price: property.property.discount_price,
              regular_price: property.property.regular_price,
              images: property.images || [], 
            },
            images: property.images || [],
          }));
          setProperties(updatedProperties);
        } else {
          setError("Invalid data format.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []); 

  return (
    <section className="py-12 mx-[1rem] w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="md:text-2xl text-[20px] font-bold mb-2">
            Results ({properties.length})
          </h2>
        </div>
        <Link href="/discover">
          <button className="hidden md:block text-gray-900 font-medium hover:underline">
            Discover more
          </button>
        </Link>
      </div>

      {/* Show loading, error, or properties */}
      {loading ? (
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
      ) : error ? (
        <p>{error}</p>
      ) : !Array.isArray(properties) || properties.length === 0 ? (
        <p>No properties available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {properties.map((property, index) => (
            <CamperCard key={index} {...property} />
          ))}
        </div>
      )}

      <Link href="/discover">
        <button className="px-[20px] py-[12px] text-sm font-medium text-gray-700 border border-gray-300 rounded-[60px] text-center m-auto block md:hidden">
          Discover more
        </button>
      </Link>

      <p className={`${plusJakartaSans.className} text-center font-semibold my-[3rem]`}>
        View More
      </p>
    </section>
  );
};

export default DiscoverPage;


function CamperCard({
  property: {
    title,
    description,
    rule,
    city,
    state,
    discount_price,
    regular_price,
  },
  images,
}: CamperCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const extendedImages = [...images, ...images, ...images];
  const totalImages = images.length;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    }, 3000);
    return () => clearInterval(intervalId); 
  }, [totalImages]);

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
    <Link href="/product">
      <div className="relative rounded-xl w-full">
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
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 305px"
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
            className="absolute top-3 right-3 p-2 rounded-full z-10"
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? "fill-red-500 stroke-red-500" : "stroke-white fill-gray-400"}`}
            />
          </button>

          {rule && (
            <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-[4px] z-10">
              <span className="text-sm font-medium">{rule}</span>
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
              {title}, {city}
            </h3>
            {/* <div className="flex text-[14px] items-center gap-1">
              <span>★</span>
              <span>{avg_rating || "N/A"}</span>
            </div> */}
              <div className="flex text-[14px] items-center gap-1">
              <span>★</span>
              <span>4</span>
            </div>
          </div>

          {/* <p className="text-[#5E5E5E] text-[14px] mb-1">
            {seat_cap} Seats / {sleep_cap} Sleeps
          </p> */}
           <p className="text-[#5E5E5E] text-[14px] mb-1">
            2 Seats / 2 Sleeps
          </p>

          <div className="flex justify-between items-center text-[14px]">
            <div>
              <span className="text-[#5E5E5E] line-through">₹{discount_price}</span>
              <span className="ml-2 text-lg font-bold text-[#222222]">₹{regular_price}</span>
              <span className="text-[#222222]">/night</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}