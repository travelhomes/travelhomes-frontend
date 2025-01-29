import image1 from "@/public/assets/product/car1.png"
import image2 from "@/public/assets/product/car2.png"
import image3 from "@/public/assets/product/card3.png"
import image4 from "@/public/assets/product/card4.png"
import Image from "next/image";

export function ProductHero() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-[2rem]">
      <div className="col-span-1">
        <Image 
          src={image1} 
          alt="image 1" 
          width={500} 
          height={500} 
          className="w-full h-[300px] md:h-full object-cover rounded-[12px] md:rounded-tl-[24px] md:rounded-bl-[24px]" 
        />
      </div>
      <div className="col-span-1 grid grid-rows-2 gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Image 
            src={image2} 
            alt="image 2" 
            width={500} 
            height={500} 
            className="w-full h-[150px] md:h-full object-cover rounded-[12px] md:rounded-none" 
          />
          <Image 
            src={image3} 
            alt="image 3" 
            width={500} 
            height={500} 
            className="w-full h-[150px] md:h-full object-cover rounded-[12px] md:rounded-tr-[24px]" 
          />
        </div>
        <div className="relative">
          <Image 
            src={image4} 
            alt="image 4" 
            width={500} 
            height={500} 
            className="w-full h-[150px] md:h-full object-cover rounded-[12px] md:rounded-br-[24px]" 
          />
          <button className="absolute bottom-4 right-4 px-[16px] md:px-[24px] py-[8px] md:py-[12px] bg-white text-black rounded-full shadow-md text-sm md:text-base">
            View all photos
          </button>
        </div>
      </div>
    </div>
  );
}
