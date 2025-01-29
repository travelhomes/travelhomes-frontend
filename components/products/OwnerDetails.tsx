import Image from 'next/image';
import React from 'react';

interface OwnerStats {
  reviews: number;
  rating: number;
  responseRate: number;
  responseTime: string;
}

const ownerStats: OwnerStats = {
  reviews: 943,
  rating: 4.2,
  responseRate: 100,
  responseTime: "within a hour"
};

export function OwnerDetails() {
  return (
    <div className="py-8 w-[65%] border-b">
      <h2 className="text-xl font-semibold mb-6">Owner Details</h2>
      
      <div className="flex gap-8">
        <div className="flex items-center gap-4">
          <Image
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop"
            alt="Hanna"
            width={100}
            height={100}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium">Hanna</h3>
            <p className="text-sm text-gray-500">Owner</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm">{ownerStats.reviews}</span>
              <span className="text-sm text-gray-500">Reviews</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <span>{ownerStats.rating}</span>
              <span>★</span>
              <span className="text-gray-500">Rating</span>
            </div>
          </div>
        </div>

        <div className="flex-1">
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

          <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium">
            Contact Owner
          </button>
        </div>
      </div>
    </div>
  );
}