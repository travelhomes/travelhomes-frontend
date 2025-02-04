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

export default function Product() {
  return (
    <>
    <div className="py-[1rem] px-[1rem] md:px-[2rem] lg:px-[5rem]">
      <Appbar />
      <Header />
      <ProductHero />
      <Overview />
      <Amenities />
      <Inclusions />
      <Reviews />
      <OwnerDetails />
      <TopRatedStays />
      <Newslatter />
      <FAQ />
    </div>
      <Footer />
      </>
  );
}
