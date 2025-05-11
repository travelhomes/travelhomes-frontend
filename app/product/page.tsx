"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/landingPage/footer";
import { Amenities } from "@/components/products/Amenities";
import { Header } from "@/components/products/header";
import Inclusions from "@/components/products/Inclusions";
import Overview from "@/components/products/overview";
import { OwnerDetails } from "@/components/products/OwnerDetails";
import { ProductHero } from "@/components/products/ProductHero";
import { Reviews } from "@/components/products/Reviews";
import { StickyNav } from "@/components/products/StickyNav";
import { StickyPrice } from "@/components/products/StickyPrice";
import { ArrowRightIcon } from "@/public/assets/CustomIcon";
import Exclusions from "@/components/products/exclusions";
import PolicyRules from "@/components/products/PolicyRules";
import TopRatedStays from "@/components/products/TopStayed";

export default function Product() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");  // Get the "id" query parameter from URL
  const [propertyData, setPropertyData] = useState<any>(null); // Store the fetched property data
  const [loading, setLoading] = useState(true); // Manage loading state

  useEffect(() => {
    // Ensure id is available before making the API call
    if (!id) return;  // Skip fetching if no id

    // Fetch property data based on the dynamic id
    const fetchPropertyData = async () => {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://3.7.52.212:5000";
      try {
        const response = await axios.get(`${BACKEND_URL}/api/properties/${id}`); // Make the API call with the id
        setPropertyData(response.data.data);  // Set the property data into state
        setLoading(false);  // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching property data:", error);
        setLoading(false);  // Set loading to false even if there's an error
      }
    };

    fetchPropertyData();
  }, [id]);  // Trigger the effect when the id changes (i.e., when the query parameter changes)

  if (loading) {
    return (
      <section className="px-4 mt-[3rem] lg:mx-auto max-w-7xl animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex flex-col h-full space-y-4">
              {/* Skeleton Image Placeholder */}
              <div className="w-full h-[250px] bg-gray-300 rounded-lg" />

              {/* Skeleton Title */}
              <div className="w-3/4 h-5 bg-gray-300 rounded"></div>

              {/* Skeleton Text Placeholder */}
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>

              {/* Skeleton Button */}
              <div className="h-12 w-32 bg-gray-300 rounded-full"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="py-[1rem] px-[1rem] md:px-[2rem] lg:px-[5rem]">
        <button
          onClick={() => window.history.back()}
          className="flex justify-center items-center"
        >
          <ArrowRightIcon />
          <span className="ml-2">Back</span>
        </button>
      </div>

      <div className="py-[1rem] px-[1rem] md:px-[2rem] lg:px-[5rem]">
        <Header propertyData={propertyData} /> {/* Passing data to Header */}
        <ProductHero propertyData={propertyData} /> {/* Passing data to ProductHero */}
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

            <section id="policy&rules" className="pt-6">
              <PolicyRules />
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
          <TopRatedStays />
        </div>
      </div>

      <Footer />
    </div>
  );
}
