import Image from "next/image";
import heroBackground from "@/public/hero-image.png";

export default function Hero() {
  return (
    <div className="relative w-full h-[520px]">
      {/* Background Image - ensuring full visibility */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image 
          src={heroBackground} 
          alt="Hero Background"
          fill
          priority
          sizes="100vw"
          quality={100}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Light dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      </div>

      {/* Only the title, no subtext, positioned for 520px height */}
      <div className="relative z-1 h-full flex flex-col items-center text-center text-white px-4 md:px-8 pt-[100px] md:pt-[120px]">
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-[40px] md:text-[48px] font-bold leading-tight">
            Explore The Unexplored in The Caravan!
          </h1>
        </div>
      </div>
    </div>
  );
}
