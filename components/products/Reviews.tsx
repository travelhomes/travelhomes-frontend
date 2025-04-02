import Image from 'next/image';
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface Review {
  id: number;
  author: string;
  date: string;
  content: string;
  avatar: string;
}

interface Rating {
  category: string;
  score: number;
}

const ratings: Rating[] = [
  { category: "Cleanliness", score: 4.8 },
  { category: "Accuracy", score: 4.8 },
  { category: "Communication", score: 4.8 },
  { category: "Location", score: 4.8 },
  { category: "Value", score: 4.8 },
];

// Expanded reviews array with more mock data
const reviews: Review[] = [
  {
    id: 1,
    author: "Hanna",
    date: "January 2023",
    content: "We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop",
  },
  {
    id: 2,
    author: "Akash",
    date: "January 2023",
    content: "We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop",
  },
  {
    id: 3,
    author: "Hanna",
    date: "January 2023",
    content: "We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop",
  },
  {
    id: 4,
    author: "Akash",
    date: "January 2023",
    content: "We had a delightful stay! We loved soaking in the tub, hiking in the area, and wine tasting in Truckee.",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop",
  },
  // Additional reviews for the modal
  {
    id: 5,
    author: "Sarah",
    date: "December 2022",
    content: "What a wonderful experience! The cabin was immaculate and the surroundings were peaceful. We'll definitely be back next year.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop",
  },
  {
    id: 6,
    author: "Michael",
    date: "December 2022",
    content: "Perfect winter getaway. The fireplace was cozy and the kitchen had everything we needed to cook great meals.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
  },
  {
    id: 7,
    author: "Jessica",
    date: "November 2022",
    content: "This property exceeded our expectations. Amazing views and the host was very responsive to all our questions.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop",
  },
  {
    id: 8,
    author: "David",
    date: "November 2022",
    content: "Great location near hiking trails and local restaurants. The home was clean and comfortable for our family of four.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=50&h=50&fit=crop",
  },
  {
    id: 9,
    author: "Emily",
    date: "October 2022",
    content: "Beautiful cabin with all the amenities you could ask for. The hot tub was perfect after a day of exploring.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop",
  },
  {
    id: 10,
    author: "James",
    date: "October 2022",
    content: "We had such a peaceful weekend here. The outdoor space is fantastic and the interior is beautifully decorated.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop",
  },
  {
    id: 11,
    author: "Laura",
    date: "September 2022",
    content: "Stunning property with amazing attention to detail. The beds were so comfortable and the kitchen was well-equipped.",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=50&h=50&fit=crop",
  },
  {
    id: 12,
    author: "Robert",
    date: "September 2022",
    content: "A perfect retreat from the city. We enjoyed the quiet mornings on the deck and evenings by the fire pit.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop",
  },
];

const RatingBar: React.FC<{ score: number }> = ({ score }) => (
  <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
    <div 
      className="h-full bg-black rounded-full" 
      style={{ width: `${(score / 5) * 100}%` }}
    />
  </div>
);

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-3">
      <Image
        src={review.avatar}
        alt={review.author}
        width={40}
        height={40}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <div className="font-medium">{review.author}</div>
        <div className="text-sm text-gray-500">{review.date}</div>
      </div>
    </div>
    <p className="text-gray-700 text-sm leading-relaxed">
      {review.content}
    </p>
  </div>
);

interface ReviewsModalProps {
  onClose: () => void;
  showModal: boolean;
}

const ReviewsModal: React.FC<ReviewsModalProps> = ({ onClose, showModal }) => {
  const [isMounted, setIsMounted] = useState(false);

  // Handle mounting the portal only on the client side
  React.useEffect(() => {
    setIsMounted(true);
    
    // Prevent body scroll when modal is open
    if (showModal) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  if (!isMounted || !showModal) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl w-[90vw] max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-semibold">All Reviews</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
            <div className="md:w-48">
              <div className="text-5xl font-medium mb-2">4.5</div>
              <div className="flex items-center gap-1 mb-1">
                <div className="flex text-xl">
                  {"★★★★★".split("").map((star, i) => (
                    <span key={i} className={i < 4 ? "text-yellow-400" : "text-yellow-200"}>
                      {star}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-gray-600">2,304</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 flex-1">
              {ratings.map((rating) => (
                <div key={rating.category} className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium w-36">{rating.category}</span>
                  <RatingBar score={rating.score} />
                  <span className="text-sm text-gray-600 w-8 text-right">{rating.score}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export function Reviews() {
  const [showAllReviews, setShowAllReviews] = useState(false);

  return (
    <div className="py-8 w-full" id="reviews">
      <h2 className="text-2xl font-semibold mb-6">Reviews</h2>
      
      <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
        <div className="md:w-48">
          <div className="text-5xl font-medium mb-2">4.5</div>
          <div className="flex items-center gap-1 mb-1">
            <div className="flex text-xl">
              {"★★★★★".split("").map((star, i) => (
                <span key={i} className={i < 4 ? "text-yellow-400" : "text-yellow-200"}>
                  {star}
                </span>
              ))}
            </div>
          </div>
          <div className="text-gray-600">2,304</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 flex-1">
          {ratings.map((rating) => (
            <div key={rating.category} className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium w-36">{rating.category}</span>
              <RatingBar score={rating.score} />
              <span className="text-sm text-gray-600 w-8 text-right">{rating.score}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {reviews.slice(0, 4).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <button 
        className="mt-4 text-black border border-gray-800 py-[12px] px-[32px] rounded-[60px] font-medium hover:bg-gray-50 transition-colors"
        onClick={() => setShowAllReviews(true)}
      >
        See All 12 Reviews
      </button>
      
      <ReviewsModal 
        showModal={showAllReviews}
        onClose={() => setShowAllReviews(false)}
      />
    </div>
  );
}