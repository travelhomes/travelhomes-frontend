import Image from "next/image";
import HeroImage from "@/public/heroSection.png";

export default function Hero() {
  return (
    <div className="flex text-center md:text-left flex-col lg:flex-row items-center justify-between pt-[4rem]">
      {/* Image on top for mobile, right for larger screens */}
      <div className="order-1 lg:order-2 w-full lg:w-auto">
        <Image src={HeroImage} alt={"Hero Image"} />
      </div>

      {/* Text content below image for mobile, left for larger screens */}
      <div className="order-2 lg:order-1 w-full lg:w-[550px] md:px-4 lg:pr-[55px] pt-8 lg:py-[80px]">
        <p className="text-[30px] lg:text-[56px] leading-tight lg:leading-[72px] font-semibold">
          Explore The Unexplored in The Caravan!
        </p>
        <p className="text-base lg:text-[20px] mt-4">
          Non, une fois votre devis établi, aucun coût supplémentaire ne
          s&apos;ajoute. Nous nous engageons à une transparence totale et à une
          tarification fixe, garantissant ainsi aucune surprise tarifaire après
          l&apos;établissement du devis.
        </p>
      </div>
    </div>
  );
}
