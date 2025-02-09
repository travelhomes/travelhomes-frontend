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
  responseTime: "within a hour",
}

export function OwnerDetails() {
  return (
    <div className="py-8 w-full max-w-3xl border-b" id="ownerdetails">
      <h2 className="text-xl font-semibold mb-6">Owner Details</h2>

      <div className="flex items-start gap-8">
        <div className="flex flex-col gap-6">
          <Image
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop"
            alt="Hanna"
            width={80}
            height={80}
            className="rounded-full object-cover"
          />

          <div className="space-y-4">
            <div className="ml-5">
              <h3 className="font-medium">Hanna</h3>
              <p className="text-sm text-gray-500">Owner</p>
              </div>
              </div>
              </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="font-medium">{ownerStats.reviews}</span>
                <span className="text-sm text-gray-500">Reviews</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-medium">{ownerStats.rating}</span>
                <span className="text-gray-500">★</span>
                <span className="text-sm text-gray-500">Rating</span>
              </div>
        </div>

        <div className="flex-1 hidden md:block">
          <div className="mb-4">
            <div className="text-sm font-medium mb-1">Verified by Travelhomes</div>
            <p className="text-sm text-gray-600">
              Toilet will have consumables like toothpaste, soap, shampoo, air freshener, etc
            </p>
          </div>

          <div className="space-y-1 mb-4">
            <h4 className="text-sm font-medium">Owner Details</h4>
            <p className="text-sm text-gray-600">Response Rate: {ownerStats.responseRate}%</p>
            <p className="text-sm text-gray-600">Response {ownerStats.responseTime}</p>
          </div>

          <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
            Contact Owner
          </button>
        </div>
      </div>
    </div>
  )
}

