import DiscoverImages from "@/components/discover/cards";
import Filter from "@/components/discover/filter";
import Appbar from "@/components/landingPage/appbar";
import Footer from "@/components/landingPage/footer";
import { Header } from "@/components/landingPage/header";
import SearchFilter from "@/components/landingPage/searchsection";

import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
  });

export default function Discover() {
  return (
    <>
      <div className="py-[1rem] px-[1rem] md:px-[5rem]">
        <Appbar />
        <Header />
        <SearchFilter />

        <div>
          <div className="flex gap-4">
            <Filter />
            <DiscoverImages />
          </div>

<p className={`${plusJakartaSans.className} text-center font-semibold mb-[3rem]`}>View More</p>

        </div>
      </div>

      <Footer />
    </>
  );
}
