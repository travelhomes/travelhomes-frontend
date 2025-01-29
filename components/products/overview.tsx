export default function Overview() {
  return (
    <div className="pt-[20px]">
      <nav className="overflow-x-auto">
        <div className="flex space-x-4 md:space-x-8 text-sm min-w-max">
          {[
            "Overview",
            "Amenities",
            "Inclusions",
            "Exclusions",
            "Policy & Rules",
            "Reviews",
            "Owner Details"
          ].map((item) => (
            <button
              key={item}
              className={`py-4 ${
                item === "Overview"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8 py-6">
        <div className="space-y-4 lg:w-2/3">
          <p className="text-gray-600  leading-relaxed">
            Your journey commences in Camper Van in Delhi, a bustling metropolis where the old and the new coexist in
            perfect chaos. From here, you venture forth, witnessing the stark transition to the tranquil ghats of
            Varanasi along the sacred Ganges River. The spiritual aura of this ancient city, with its profound rituals
            and mystical charm, sets the stage for a profound cultural encounter.
          </p>
          <p className="text-gray-600 leading-relaxed">
            As you motor southwest into the enchanting state of Rajasthan, The landscape transforms into a realm of
            majestic palaces, forts, and vibrant markets.
          </p>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-3xl shadow-lg p-4 md:p-6 sticky top-4">
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
                  <div className="text-sm">2/11/2023</div>
                </div>
                <div className="p-3">
                  <div className="text-xs font-medium">CHECKOUT</div>
                  <div className="text-sm">2/11/2023</div>
                </div>
              </div>
              <div className="border-t p-3">
                <div className="text-xs font-medium">Guest</div>
                <div className="text-sm">2 guest</div>
              </div>
            </div>

            <button className="w-full bg-black text-white rounded-full py-4 text-base font-medium">
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}