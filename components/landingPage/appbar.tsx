import Logo from "@/public/mainlogo.png"
import { ListIcon } from "@/public/assets/CustomIcon"
import Image from "next/image"

export default function Appbar() {
  return (
    <nav className="w-full border-gray-200 hidden md:block">
      <div className="mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo area */}
          <div className="flex-shrink-0">
            
              <Image src={Logo} alt="" />
            
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <button
              className="px-[20px] py-[12px] text-sm font-medium text-gray-700 border border-gray-300 rounded-[60px]"
            >
              <span className="flex items-center">
                <ListIcon />
                <span className="ml-2 text-[#131313]">List your offering</span>
              </span>
            </button>
            <button
              className="px-[20px] py-[12px] text-sm font-medium text-white bg-black rounded-[60px]"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

