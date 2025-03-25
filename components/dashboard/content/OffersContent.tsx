"use client";

import { useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface OfferFormProps {
  id: number;
}

function OfferForm({ id }: OfferFormProps) {
  return (
    <div className="p-6 border border-gray-200 rounded-lg mb-6">
      <h2 className="text-lg font-medium mb-6">Offer {id}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Service Name</label>
          <Select>
            <SelectTrigger className="w-full h-12">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="service1">Service 1</SelectItem>
              <SelectItem value="service2">Service 2</SelectItem>
              <SelectItem value="service3">Service 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Date</label>
          <Input 
            type="text" 
            placeholder="₹1868" 
            className="h-12" 
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Discount Type</label>
          <Select>
            <SelectTrigger className="w-full h-12">
              <SelectValue placeholder="Percentage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">Percentage</SelectItem>
              <SelectItem value="fixed">Fixed Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Discount Percentage</label>
          <Input 
            type="text" 
            placeholder="₹2000" 
            className="h-12" 
          />
        </div>
      </div>
    </div>
  );
}

export function OffersContent() {
  const [offers, setOffers] = useState([1, 2]);

  const addNewOffer = () => {
    setOffers([...offers, offers.length + 1]);
  };

  return (
    <div className={`${plusJakartaSans.className} bg-white rounded-xl h-full overflow-y-auto`}>
      <div>
        {/* Header */}
        <div className="border-b pb-2 border-[#EAECF0] py-5 flex justify-between items-center">
          <h1 className="text-[20px] text-[#101828] font-semibold px-5">Offers</h1>
          <div className="px-5">
            <Button 
              onClick={addNewOffer}
              className="rounded-full bg-black hover:bg-black/90 text-white px-6 py-5 flex items-center gap-2"
            >
              <span className="font-medium">+</span>
              <span>More Offers</span>
            </Button>
          </div>
        </div>

        {/* Offers Forms Section */}
        <div className="p-5">
          {offers.map((id) => (
            <OfferForm key={id} id={id} />
          ))}
        </div>
      </div>
    </div>
  );
} 