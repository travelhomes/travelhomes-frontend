"use client";
import { useEffect } from "react";
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
import { ArrowRightIcon } from "@/public/assets/CustomIcon"
import Exclusions from "@/components/products/exclusions";
import { useRouter } from "next/navigation";

export default function Product() {
  const router = useRouter();

  useEffect(() => {
    // Add scroll padding to allow for the sticky header
    document.documentElement.style.scrollPaddingTop = "120px";
    
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
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollPaddingTop = "";
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="py-[1rem] px-[1rem] md:px-[2rem] lg:px-[5rem]">
        <button
          onClick={() => router.back()}
          className="flex justify-center items-center"
        >
          <ArrowRightIcon />
          <span className="ml-2">Back</span>
        </button>
      </div>

      <div className="py-[1rem] px-[1rem] md:px-[2rem] lg:px-[5rem]">
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
            {/* Each section has its own ID and additional top padding to ensure visibility */}
            <section id="overview" className="pt-6">
              <Overview hidePrice />
            </section>
            
            <section id="amenities" className="pt-6">
              <Amenities />
            </section>
            
            <section id="inclusions" className="pt-6">
              <Inclusions />
            </section>
            
            <section id="exclusions" className="pt-6">
              <Exclusions />
            </section>
            
            <section id="reviews" className="pt-6">
              <Reviews />
            </section>
            
            <section id="ownerdetails" className="pt-6">
              <OwnerDetails />
            </section>
            
            <div id="top-rated-section"></div>
          </div>

          {/* Sticky Price Section */}
          <StickyPrice />

        </div>

        {/* Full Width Content After Grid */}
        <div className="mt-8 space-y-8">
          <section id="policy&rules" className="pt-6">
            <TopRatedStays />
          </section>
          <Newslatter />
          <FAQ />
        </div>
      </div>

      <Footer />
      <StickyPrice />
    </div>
  );
}
