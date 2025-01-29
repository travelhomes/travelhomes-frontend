import {CarIcon , HomeIcon ,RocketIcon } from "@/public/assets/CustomIcon"

export function Header() {
  return (
    <div className="hidden md:block">
    <div className="flex items-center justify-start my-[2.5rem] ">

      <div className="flex items-center space-x-4"> {/* Changed space-x-2 to space-x-4 for 16px gap */}
        <button className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-full">
          <div className="bg-white p-1.5 rounded-full">
           <CarIcon />
          </div>
          <span className="text-sm font-medium pr-1">Camper Van</span>
        </button>

        <button className="flex items-center space-x-2 bg-[#F6F6F6] text-[#131313] px-4 py-2 rounded-full">
          <div className="bg-white p-1.5 rounded-full">
            <HomeIcon />
          </div>
          <span className="text-sm font-medium pr-1">Home</span>
        </button>

        <button className="flex items-center space-x-2 bg-[#F6F6F6] text-[#131313] px-4 py-2 rounded-full">
          <div className="bg-white p-1.5 rounded-full">
            <RocketIcon />
          </div>
          <span className="text-sm font-medium pr-1">Camper Van</span>
        </button>
      </div>

    </div>
    </div>
  );
}
