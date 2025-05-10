import image1 from "@/public/assets/product/car1.png";
import image2 from "@/public/assets/product/car2.png";
import image3 from "@/public/assets/product/card3.png";
import image4 from "@/public/assets/product/card4.png";
import Image from "next/image";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { StaticImageData } from "next/image";

// Define the type for image objects
interface ImageData {
  src: StaticImageData;
  alt: string;
}

export function ProductHero() {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allImages, setAllImages] = useState<ImageData[]>([]);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

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
    const index = allImages.findIndex((img) => img.src === image.src);
    setCurrentIndex(index);
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
    setCurrentIndex(0);
    setSelectedImage(allImages[0]);
    setShowModal(true);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % allImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
  };

  // Handling touch events for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }

    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showModal) return;

      if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showModal, currentIndex]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
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
              className="absolute bottom-4 right-4 px-4 py-2 bg-white text-black rounded-full shadow-md text-sm md:text-base"
            >
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
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div className="relative max-w-6xl w-full h-auto mx-auto">
            <button
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full"
              onClick={closeModal}
            >
              <X size={24} className="text-black" />
            </button>

            <div className="flex items-center justify-center">
              {/* Navigation Arrows */}
              <button
                className="absolute left-4 z-10 p-2 bg-white bg-opacity-50 rounded-full hidden md:block"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft size={24} className="text-black" />
              </button>

              <div
                className="bg-transparent rounded-lg overflow-hidden max-h-[90vh] w-full"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>

              <button
                className="absolute right-4 z-10 p-2 bg-white bg-opacity-50 rounded-full hidden md:block"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight size={24} className="text-black" />
              </button>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-1 rounded-full text-sm">
              {currentIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
