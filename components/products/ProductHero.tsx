import image1 from "@/public/assets/product/car1.png"
import image2 from "@/public/assets/product/car2.png"
import image3 from "@/public/assets/product/card3.png"
import image4 from "@/public/assets/product/card4.png"
import Image from "next/image";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { StaticImageData } from "next/image";

// Define the type for image objects
interface ImageData {
  src: StaticImageData;
  alt: string;
}

export function ProductHero() {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [allImages, setAllImages] = useState<ImageData[]>([]);

  useEffect(() => {
    // Collect all images for the gallery view
    setAllImages([
      { src: image1, alt: "image 1" },
      { src: image2, alt: "image 2" },
      { src: image3, alt: "image 3" },
      { src: image4, alt: "image 4" },
    ]);
  }, []);

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

  const handleImageClick = (image: ImageData) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const viewAllPhotos = () => {
    setSelectedImage(allImages[0]);
    setShowModal(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-[2rem]">
        <div className="col-span-1">
          <div 
            className="cursor-pointer"
            onClick={() => handleImageClick(allImages[0])}
          >
            <Image 
              src={image1} 
              alt="image 1" 
              width={500} 
              height={500} 
              className="w-full h-[300px] md:h-full object-cover md:rounded-tl-[24px] md:rounded-bl-[24px]" 
            />
          </div>
        </div>
        <div className="col-span-1 grid grid-rows-2 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div 
              className="cursor-pointer"
              onClick={() => handleImageClick(allImages[1])}
            >
              <Image 
                src={image2} 
                alt="image 2" 
                width={500} 
                height={500} 
                className="w-full h-[150px] md:h-full object-cover md:rounded-none" 
              />
            </div>
            <div 
              className="cursor-pointer"
              onClick={() => handleImageClick(allImages[2])}
            >
              <Image 
                src={image3} 
                alt="image 3" 
                width={500} 
                height={500} 
                className="w-full h-[150px] md:h-full object-cover md:rounded-tr-[24px]" 
              />
            </div>
          </div>
          <div className="relative">
            <div 
              className="cursor-pointer"
              onClick={() => handleImageClick(allImages[3])}
            >
              <Image 
                src={image4} 
                alt="image 4" 
                width={500} 
                height={500} 
                className="w-full h-[150px] md:h-full object-cover md:rounded-br-[24px]" 
              />
            </div>
            <button 
              onClick={viewAllPhotos}
              className="absolute bottom-4 right-4 px-[16px] md:px-[24px] py-[8px] md:py-[12px] bg-white text-black rounded-full shadow-md text-sm md:text-base">
              View all photos
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showModal && selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center p-4"
          onClick={handleOutsideClick}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div className="relative max-w-6xl w-full h-auto mx-auto">
            <button 
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full"
              onClick={closeModal}
            >
              <X size={24} className="text-black" />
            </button>
            
            <div className="bg-transparent rounded-lg overflow-hidden max-h-[90vh]">
              <Image 
                src={selectedImage.src} 
                alt={selectedImage.alt}
                width={1200} 
                height={800}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
