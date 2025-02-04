import Image from 'next/image';
import React from 'react';

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
];

const RatingBar: React.FC<{ score: number }> = ({ score }) => (
  <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
    <div 
      className="h-full bg-black rounded-full" 
      style={{ width: `${(score / 5) * 100}%` }}
    />
  </div>
);

export function Reviews() {
  return (
    <div className="py-8 w-full md:w-[65%] border-b">
      <h2 className="text-xl font-semibold mb-6">Reviews</h2>
      
      <div className="flex flex-col md:flex-row items-baseline gap-4 mb-8">
        <div>
          <div className="text-4xl font-medium">4.5</div>
          <div className="flex items-center gap-1 text-sm">
            <div className="flex">
              {"★★★★★".split("").map((star, i) => (
                <span key={i} className={i < 4 ? "text-black" : "text-gray-300"}>
                  {star}
                </span>
              ))}
            </div>
            <span className="text-gray-500">•</span>
            <span className="text-gray-500">2,304</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
          {ratings.map((rating) => (
            <div key={rating.category} className="flex items-center gap-4">
              <span className="text-sm text-gray-600 w-24">{rating.category}</span>
              <RatingBar score={rating.score} />
              <span className="text-sm text-gray-600">{rating.score}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        {reviews.slice(0, 1).map((review) => (
          <div key={review.id} className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src={review.avatar}
                alt={review.author}
                width={100}
                height={100}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-medium">{review.author}</div>
                <div className="text-sm text-gray-500">{review.date}</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {review.content}
            </p>
          </div>
        ))}
      </div>

      <button className="mt-4 text-black border border-[#000000] py-[12px] px-[32px] rounded-[60px]">
        See All 12 Reviews
      </button>
    </div>
  );
}