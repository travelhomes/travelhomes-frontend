'use client'

import DiscoverImages from "@/components/discover/cards";
import Filter from "@/components/discover/filter";
import Appbar from "@/components/landingPage/appbar";
import Footer from "@/components/landingPage/footer";
import { Header } from "@/components/landingPage/header";
import SearchFilter from "@/components/landingPage/searchsection";
import { useState } from "react";

export default function Discover() {
  const [activeTab, setActiveTab] = useState('campervan');

  return (
    <>
      <div className="py-[1rem] px-[1rem] md:px-[5rem]">
        <Appbar />
        
        <Header onTabChange={setActiveTab} />
        <SearchFilter activeTab={activeTab} />

        <div>
          <div className="flex gap-1">
            <Filter activeTab={activeTab} />
            <DiscoverImages />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
