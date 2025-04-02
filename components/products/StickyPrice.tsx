import Link from "next/link";

export function StickyPrice() {

  return (
    <>
              <div className="hidden lg:block">
            <div className="sticky top-[100px] transition-all duration-300 lg:col-span-1" id="sticky-price">
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <div className="space-y-3 mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="line-through text-gray-400">$500</span>
                    <span className="text-2xl font-semibold">$440</span>
                    <span className="text-gray-600">night</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <span>★</span>
                    <span>4.91</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">337 reviews</span>
                  </div>
                </div>

                <div className="border rounded-xl overflow-hidden mb-4">
                  <div className="grid grid-cols-2 divide-x">
                    <div className="p-3">
                      <div className="text-xs font-medium">CHECKIN</div>
                      <input 
                        type="date" 
                        className="text-sm w-full outline-none" 
                        placeholder="Select check-in date"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-xs font-medium">CHECKOUT</div>
                      <input 
                        type="date" 
                        className="text-sm w-full outline-none"
                        placeholder="Select check-out date"
                      />
                    </div>
                  </div>
                  <div className="border-t p-3">
                    <div className="text-xs font-medium">Guest</div>
                    <input 
                      type="number" 
                      className="text-sm w-full outline-none"
                      placeholder="Number of guests"
                      min="1"
                    />
                  </div>
                </div>

                <Link href="/payment">
                  <button className="w-full bg-black text-white rounded-full py-4 text-base font-medium">
                    Reserve
                  </button>
                </Link>
              </div>
            </div>
          </div>
    </>
  );
} 