import Image from "next/image"

interface OwnerStats {
  reviews: number
  rating: number
  responseRate: number
  responseTime: string
}

const ownerStats: OwnerStats = {
  reviews: 943,
  rating: 4.2,
  responseRate: 100,
  responseTime: "with in hour",
}

export function OwnerDetails() {
  return (
    <div className="py-8 w-full" id="ownerdetails">
      <h2 className="text-2xl font-semibold mb-6">Owner Details</h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Owner Card - Left Side */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 md:w-1/2 flex items-center text-center">
        <div>
          <Image
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=184&h=184&fit=crop"
            alt="Hanna"
            width={120}
            height={120}
            className="rounded-full object-cover mb-4"
          />

          <h3 className="text-2xl font-medium">Hanna</h3>
          <p className="text-[#717171] mb-6">Owner</p>
          </div>
          <div className="space-y-2 w-full flex flex-col justify-center items-center">
            <div className=" text-[18px] border-b pb-5">
              <p className="font-semibold text-[#222222]">{ownerStats.reviews}</p>
              <p className="text-[#222222]">Reviews</p>
            </div>
            
            <div className="text-[18px] ">
                <p className="font-semibold">{ownerStats.rating} ★</p>
                <p className="text-[#222222]">Rating</p>
            </div>
          </div>
        </div>

        {/* Details - Right Side */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
                <h3 className="text-[18px] text-[#0B0907] font-semibold mb-2">Verified by Travelhomes</h3>
              <p className="text-[#535353]">
                Toilet will have consumables like toothpaste, soap, shampoo, air freshener, etc.
              </p>
            </div>

            <div>
              <h3 className="text-[18px] text-[#0B0907] mb-2">Owner Details</h3>
                <p className="text-[#535353">Response Rate : {ownerStats.responseRate}%</p>
              <p className="text-[#535353]">Response {ownerStats.responseTime}</p>
            </div>
          </div>

          <div className="mt-6">
            <button className="bg-[#131313] h-[37px] text-white px-8 py-1 rounded-full font-medium hover:bg-gray-800 transition-colors">
              Contact Owner
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

