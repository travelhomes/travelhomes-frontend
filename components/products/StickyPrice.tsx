"use client"

import { EditIcon } from "@/public/assets/CustomIcon";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function StickyPrice() {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    guests: "1",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGuestsChange = (value: string) => {
    setBookingData(prev => ({
      ...prev,
      guests: value
    }));
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 lg:hidden">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold">$440</span>
              <span className="text-gray-600">/night</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-500">19-20 Jan • Guest: 02</div>
              <EditIcon />
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(true)}
            className="bg-black text-white rounded-full px-8 py-3 text-base font-medium"
          >
            Reserve
          </button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md p-0 gap-0">
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-center">Edit Booking Details</h2>
            
            <div className="space-y-4">
              {/* Check-in */}
              <div>
                <label className="text-sm font-medium text-[#334054] block mb-2">
                  Check-in
                </label>
                <Input
                  type="date"
                  name="checkIn"
                  value={bookingData.checkIn}
                  onChange={handleInputChange}
                  className="border-[#EAECF0] h-11 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                />
              </div>

              {/* Check-out */}
              <div>
                <label className="text-sm font-medium text-[#334054] block mb-2">
                  Check-Out
                </label>
                <Input
                  type="date"
                  name="checkOut"
                  value={bookingData.checkOut}
                  onChange={handleInputChange}
                  className="border-[#EAECF0] h-11 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                />
              </div>

              {/* Guest */}
              <div>
                <label className="text-sm font-medium text-[#334054] block mb-2">
                  Guest
                </label>
                <Select
                  value={bookingData.guests}
                  onValueChange={handleGuestsChange}
                >
                  <SelectTrigger className="border-[#EAECF0] h-11 bg-white focus:ring-0 focus:border-[#B0B0B0]">
                    <SelectValue placeholder="Select number of guests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Adult</SelectItem>
                    <SelectItem value="2">2 Adults</SelectItem>
                    <SelectItem value="3">3 Adults</SelectItem>
                    <SelectItem value="4">4 Adults</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="p-6 border-t">
            <Button 
              onClick={() => setIsOpen(false)}
              className="w-full bg-black text-white rounded-full py-3 text-base font-medium hover:bg-black/90"
            >
              Reserve
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 