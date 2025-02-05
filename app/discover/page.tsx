import DiscoverImages from "@/components/discover/cards";
import Filter from "@/components/discover/filter";
import Appbar from "@/components/landingPage/appbar";
import Footer from "@/components/landingPage/footer";
import { Header } from "@/components/landingPage/header";
import SearchFilter from "@/components/landingPage/searchsection";




export default function Discover() {
  return (
    <>
      <div className="py-[1rem] px-[1rem] md:px-[5rem]">
        <Appbar />
        <Header />
        <SearchFilter />

        <div>
          <div className="flex gap-1">
            <Filter />
            <DiscoverImages />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
