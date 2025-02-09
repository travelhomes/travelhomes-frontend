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
      <div className="py-[1rem] px-[1rem] md:px-[5rem]">
        <Appbar />
        <Header onTabChange={setActiveTab} />
        <SearchFilter activeTab={activeTab} />
        <Hero />
        {/* Sections */}
        <CamperListing />
        <UniqueStay />
        <BestActivity />
        {/* Destinations  */}
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
