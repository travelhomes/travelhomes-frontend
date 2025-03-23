import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useRouter } from "next/navigation";

// Sample images - Import more images for the slider
import CamperVanImage1 from "@/public/assets/bestactivety/image1.png";
import CamperVanImage2 from "@/public/assets/bestactivety/image2.png";
import CamperVanImage3 from "@/public/assets/bestactivety/image3.png";
import CamperVanImage4 from "@/public/assets/bestactivety/image4.png";

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

// Mock data for offerings with multiple images
const offeringData = [
  {
    id: "1",
    title: "New Camper Van, Jaipur",
    images: [CamperVanImage1, CamperVanImage2, CamperVanImage3, CamperVanImage4],
    type: "Unique Stay",
    seats: 4,
    sleeps: 2,
    price: 2890,
    period: "day",
    status: "approved",
    rating: 4.91
  },
  {
    id: "2",
    title: "New Camper Van, Jaipur",
    images: [CamperVanImage2, CamperVanImage3, CamperVanImage4, CamperVanImage1],
    type: "Unique Stay",
    seats: 4,
    sleeps: 2,
    price: 2890,
    period: "day",
    status: "approved",
    rating: 4.91
  },
  {
    id: "3",
    title: "New Camper Van, Jaipur",
    images: [CamperVanImage3, CamperVanImage4, CamperVanImage1, CamperVanImage2],
    type: "Unique Stay",
    seats: 4,
    sleeps: 2,
    price: 2890,
    period: "day",
    status: "pending",
    rating: 4.91
  },
  {
    id: "4",
    title: "New Camper Van, Jaipur",
    images: [CamperVanImage4, CamperVanImage1, CamperVanImage2, CamperVanImage3],
    type: "Unique Stay",
    seats: 4,
    sleeps: 2,
    price: 2890,
    period: "day",
    status: "pending",
    rating: 4.91
  },
  {
    id: "5",
    title: "New Camper Van, Jaipur",
    images: [CamperVanImage1, CamperVanImage4, CamperVanImage3, CamperVanImage2],
    type: "Unique Stay",
    seats: 4,
    sleeps: 2,
    price: 2890,
    period: "day",
    status: "approved",
    rating: 4.91
  },
  {
    id: "6",
    title: "New Camper Van, Jaipur",
    images: [CamperVanImage2, CamperVanImage1, CamperVanImage4, CamperVanImage3],
    type: "Unique Stay",
    seats: 4,
    sleeps: 2,
    price: 2890,
    period: "day",
    status: "approved",
    rating: 4.91
  }
];

export function OfferingContent() {
  const [activeTab, setActiveTab] = useState("approved");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const router = useRouter();
  
  // Detect click outside to close menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (openMenuId !== null) {
        setOpenMenuId(null);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  const toggleMenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (openMenuId === id) {
      setOpenMenuId(null);
    } else {
      setOpenMenuId(id);
    }
  };

  // Filter offerings based on active tab
  const filteredOfferings = offeringData.filter(
    offering => offering.status === activeTab
  );

  return (
    <div className="bg-white rounded-xl h-[90vh] overflow-y-auto">
      {/* Header area with tabs and new offering button */}
      <div className="flex justify-between items-center px-6 py-[1rem] border-b sticky top-0 bg-white z-10">
        <div className="flex border-gray-200">
          <button 
            className={`pb-[10px] px-4 font-medium text-base ${activeTab === "approved" ? "border-b-2 border-black text-[#0B0907] font-bold" : "text-[#6B6B6B]"}`}
            onClick={() => setActiveTab("approved")}
          >
            Approved
          </button>
          <button 
            className={`pb-[10px] px-4 font-medium text-base ${activeTab === "pending" ? "border-b-2 border-black text-[#0B0907] font-bold" : "text-[#6B6B6B]"}`}
            onClick={() => setActiveTab("pending")}
          >
            Pending
          </button>
        </div>
        
        <Button
          className="rounded-full bg-black hover:bg-black/90 text-white px-[24px] py-[20px] flex items-center gap-2"
          onClick={() => router.push('/dashboard?section=offering-add')}
        >
          <span className="font-medium">+</span>
          <span>Offerings</span>
        </Button>
      </div>
      
      {/* Offerings grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOfferings.map((offering) => (
            <OfferingCard 
              key={offering.id} 
              offering={offering} 
              isMenuOpen={openMenuId === offering.id}
              toggleMenu={(e) => toggleMenu(offering.id, e)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface OfferingCardProps {
  offering: {
    id: string;
    title: string;
    images: any[];
    type: string;
    seats: number;
    sleeps: number;
    price: number;
    period: string;
    status: string;
    rating: number;
  };
  isMenuOpen: boolean;
  toggleMenu: (e: React.MouseEvent) => void;
}

function OfferingCard({ offering, isMenuOpen, toggleMenu }: OfferingCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isFirstImage = currentImageIndex === 0;
  const isLastImage = currentImageIndex === offering.images.length - 1;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isFirstImage) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLastImage) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
      {/* Image container with slider */}
      <div 
        className="relative w-full aspect-[4/3]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0">
          {offering.images.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(${(index - currentImageIndex) * 100}%)`,
              }}
            >
              <Image 
                src={image}
                alt={`${offering.title} - Image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
        
        {/* Carousel Navigation Arrows */}
        {isHovered && (
          <>
            <button
              onClick={handlePrevImage}
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md transition-all hover:bg-white z-20 ${
                isFirstImage ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
              aria-label="Previous image"
              disabled={isFirstImage}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md transition-all hover:bg-white z-20 ${
                isLastImage ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
              aria-label="Next image"
              disabled={isLastImage}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
        
        {/* Type tag */}
        <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-[4px]">
          <span className="text-sm font-medium">{offering.type}</span>
        </div>
        
        {/* Menu button */}
        <div className="absolute top-3 right-3 z-30">
          <button 
            className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md"
            onClick={toggleMenu}
          >
            <MoreVertical className="w-5 h-5 text-gray-700" />
          </button>
          
          {/* Dropdown menu */}
          {isMenuOpen && (
            <div 
              ref={menuRef}
              className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-md overflow-hidden z-20 w-48"
              onClick={(e) => e.stopPropagation()}
            >
              {offering.status === "approved" ? (
                <div className="py-1">
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Edit
                  </button>
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                    View
                  </button>
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Temporary Inactive
                  </button>
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Add/Sync Calender
                  </button>
                </div>
              ) : (
                <div className="py-1">
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Edit
                  </button>
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                    View
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Carousel Dots */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {offering.images.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full bg-white ${
                index === currentImageIndex ? "opacity-100" : "opacity-60"
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Offering details */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className={`${plusJakartaSans.className} text-[15px] text-[#222222] font-semibold`}>
            {offering.title}
          </h3>
          <div className="flex text-[14px] items-center gap-1">
            <span>★</span>
            <span>{offering.rating}</span>
          </div>
        </div>
        
        <p className="text-[#5E5E5E] text-[14px] mb-1">
          {offering.seats} Seats / {offering.sleeps} Sleeps
        </p>
        
        <div className="flex justify-between items-center text-[14px]">
          <div>
            <span className="text-[#5E5E5E] line-through">₹{offering.price}</span>
            <span className="ml-2 text-lg font-bold text-[#222222]">₹{offering.price}</span>
            <span className="text-[#222222]">/{offering.period}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 