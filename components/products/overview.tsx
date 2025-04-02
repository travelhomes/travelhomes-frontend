"use client"
import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface OverviewProps {
  hidePrice?: boolean;
}

export default function Overview({ hidePrice = false }: OverviewProps) {
  const [showModal, setShowModal] = useState(false);

  // Full text content
  const shortText = `Your journey commences in Camper Van in Delhi, a bustling metropolis where the old and the new coexist in perfect chaos. From here, you venture forth, witnessing the stark transition to the tranquil ghats of Varanasi along the sacred Ganges River. The spiritual aura of this ancient city, with its profound rituals and mystical charm, sets the stage for a profound cultural encounter.`;

  const fullText = `Your journey commences in Camper Van in Delhi, a bustling metropolis where the old and the new coexist in perfect chaos. From here, you venture forth, witnessing the stark transition to the tranquil ghats of Varanasi along the sacred Ganges River. The spiritual aura of this ancient city, with its profound rituals and mystical charm, sets the stage for a profound cultural encounter.

As you motor southwest into the enchanting state of Rajasthan, the landscape transforms into a realm of majestic palaces, forts, and vibrant markets. You'll discover the royal heritage of Jaipur, the romantic allure of Udaipur, and the golden hues of Jaisalmer's desert landscapes.

Your odyssey advances to the coastal paradise of Goa, where pristine beaches and Portuguese-influenced architecture offer a perfect blend of relaxation and cultural immersion. The journey through India's diverse tapestry, experienced from the comfortable confines of your camper van, will create memories to last a lifetime.`;

  // Disable body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <div className="pt-[20px]" id="overview">
      <div className={hidePrice ? "" : "flex flex-col lg:flex-row gap-8"}>
        <div className={hidePrice ? "" : "lg:w-2/3"}>
          <h2 className="text-[20px] md:text-[24px] text-[#0B0907] font-bold mb-[2rem]">
            Overview
          </h2>
          <div className="text-gray-600 leading-relaxed">
            <p>{shortText}</p>
            <p className="text-gray-600 leading-relaxed mt-4">
              As you motor southwest into the enchanting state of Rajasthan, The landscape transforms into a realm of
              majestic palaces, forts, and vibrant markets. <span className="mt-4 cursor-pointer text-black font-medium " onClick={() => setShowModal(true)}> read more ...</span>
            </p>
          </div>
        </div>
      </div>

      {/* Full Text Modal Popup */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-8"
          onClick={handleOutsideClick}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6">
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              <X size={24} />
            </button>
            
            <h3 className="text-2xl font-bold mb-4">About This Journey</h3>
            
            <div className="text-gray-600 leading-relaxed space-y-4">
              {fullText.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}