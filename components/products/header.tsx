import React from "react";
import { Share, Heart, MapPin } from "lucide-react";

export function Header() {
  return (
    <div className="pt-[2rem]">
      <h1 className="text-[28px] md:text-[36px] text-[#0B0907] font-bold mb-2">
        My Rolling Homes
      </h1>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <p className="text-[#5E5E5E] text-[16px] md:text-[18px] flex items-center gap-2">
          <MapPin />
          Shanti Hari Ahivasan, South Park, Bistupur, Jamshedpur
        </p>
        <div className="flex gap-4">
          <button className="flex items-center gap-2">
            <Share size={20} /> Share
          </button>
          <button className="flex items-center gap-2">
            <Heart size={20} /> Save
          </button>
          <button className="px-[20px] py-[12px] text-sm font-medium text-white bg-black rounded-[60px]">
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}
