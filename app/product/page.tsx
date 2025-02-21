"use client";
import { useEffect } from "react";
import Appbar from "@/components/landingPage/appbar";
import FAQ from "@/components/landingPage/faq";
import Footer from "@/components/landingPage/footer";
import TopRatedStays from "@/components/landingPage/sections/TopRatedStays";
import { Amenities } from "@/components/products/Amenities";
import { Header } from "@/components/products/header";
import Inclusions from "@/components/products/Inclusions";
import Newslatter from "@/components/products/newslatter";
import Overview from "@/components/products/overview";
import { OwnerDetails } from "@/components/products/OwnerDetails";
import { ProductHero } from "@/components/products/ProductHero";
import { Reviews } from "@/components/products/Reviews";
import { StickyNav } from "@/components/products/StickyNav";
import { StickyPrice } from "@/components/products/StickyPrice";
import Link from "next/link";
import Exclusions from "@/components/products/exclusions";
export default function Product() {
  useEffect(() => {
    const handleScroll = () => {
      const stickyPrice = document.getElementById('sticky-price');
      const topRatedSection = document.getElementById('top-rated-section');
      
      if (stickyPrice && topRatedSection) {
        const topRatedRect = topRatedSection.getBoundingClientRect();
        
        if (topRatedRect.top <= 100) {
          stickyPrice.classList.add('lg:col-span-2');
          stickyPrice.classList.remove('lg:col-span-1');
        } else {
          stickyPrice.classList.remove('lg:col-span-2');
          stickyPrice.classList.add('lg:col-span-1');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="py-[1rem] px-[1rem] md:px-[2rem] lg:px-[5rem]">
        <Appbar />
        <Header />
        <ProductHero />
      </div>

      {/* Navigation - Sticky at top */}
      <div className="sticky top-0 bg-white z-50 border-b">
        <div className="px-[1rem] md:px-[2rem] lg:px-[5rem]">
          <StickyNav />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 px-[1rem] md:px-[2rem] lg:px-[5rem]">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
          {/* Scrollable Content */}
          <div className="space-y-8">
            <Overview hidePrice />
            <Amenities />
            <Inclusions />
            <Exclusions />
            <Reviews />
            <OwnerDetails />
            <div id="top-rated-section"></div>
          </div>

          {/* Sticky Price Section */}
          <div className="hidden lg:block">
            <div className="sticky top-[100px] transi
            tion-all duration-300 lg:col-span-1" id="sticky-price">
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <div className="space-y-3 mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="line-through text-gray-400">$500</span>
                    <span className="text-2xl font-semibold">$440</span>
                    <span className="text-gray-600">night</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <span>★</span>
                    <span>4.91</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">337 reviews</span>
                  </div>
                </div>

                <div className="border rounded-xl overflow-hidden mb-4">
                  <div className="grid grid-cols-2 divide-x">
                    <div className="p-3">
                      <div className="text-xs font-medium">CHECKIN</div>
                      <input 
                        type="date" 
                        className="text-sm w-full outline-none" 
                        placeholder="Select check-in date"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-xs font-medium">CHECKOUT</div>
                      <input 
                        type="date" 
                        className="text-sm w-full outline-none"
                        placeholder="Select check-out date"
                      />
                    </div>
                  </div>
                  <div className="border-t p-3">
                    <div className="text-xs font-medium">Guest</div>
                    <input 
                      type="number" 
                      className="text-sm w-full outline-none"
                      placeholder="Number of guests"
                      min="1"
                    />
                  </div>
                </div>

                <Link href="/payment">
                  <button className="w-full bg-black text-white rounded-full py-4 text-base font-medium">
                    Reserve
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Content After Grid */}
        <div className="mt-8 space-y-8">
          <TopRatedStays />
          <Newslatter />
          <FAQ />
        </div>
      </div>

      <Footer />
      <StickyPrice />
    </div>
  );
}
