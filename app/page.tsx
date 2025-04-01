"use client";
import Appbar from "@/components/landingPage/appbar";
import LatestArticles from "@/components/landingPage/article";
import TrendingDestinations from "@/components/landingPage/Destination";
import FAQ from "@/components/landingPage/faq";
import Footer from "@/components/landingPage/footer";
import { Header } from "@/components/landingPage/header";
import Hero from "@/components/landingPage/HeroSection";
import SearchFilter from "@/components/landingPage/searchsection";
import BestActivity from "@/components/landingPage/sections/BestActively";
import CamperListing from "@/components/landingPage/sections/CamperVan";
import TopRatedStays from "@/components/landingPage/sections/TopRatedStays";
import UniqueStay from "@/components/landingPage/sections/UniqueStay";
import ServiceListing from "@/components/landingPage/ServiceListing ";
import Testimonials from "@/components/landingPage/Testimonials";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState('campervan');

  return (
    <>
      {/* Hero section with floating components */}
      <div className="relative">
        {/* Background image */}
        <Hero />
        
        {/* Components in correct order */}
        <div className="absolute top-0 left-0 right-0 z-10 px-[1rem] md:px-[5rem]">
          {/* 1. Appbar at top */}
          <Appbar />
          
          {/* 2. Hero heading is handled in Hero component */}
          
          {/* 3. Header below hero title */}
          <div className="mt-[180px] md:mt-[250px]">
            <Header onTabChange={setActiveTab} />
          </div>
          
          {/* 4. Search filter at bottom */}
          <div className="mt-6">
            <SearchFilter activeTab={activeTab} />
          </div>
        </div>
      </div>
      
      {/* Content sections */}
      <div className="py-[1rem]">
        <CamperListing />
        <UniqueStay />
        <BestActivity />
        {/* Destinations */}
        <TrendingDestinations />
        <ServiceListing />
        <Testimonials />
        <TopRatedStays />
        <LatestArticles />
        <FAQ />
      </div>
      <Footer />
    </>
  );
}
