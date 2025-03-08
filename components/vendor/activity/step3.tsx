"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import StepProgress from "../StepProgress";
import StepNavigation from "../StepNavigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Step3Props {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export default function Step3({ onNext, onBack, currentStep, totalSteps }: Step3Props) {
  const [formData, setFormData] = useState({
    price: "5,934",
    personCapacity: 1,
    timeDuration: "",
    address: "",
    state: "",
    city: "",
    pincode: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and commas
    const value = e.target.value.replace(/[^0-9,]/g, '');
    setFormData(prev => ({ ...prev, price: value }));
  };

  const handleIncrement = () => {
    setFormData(prev => ({
      ...prev,
      personCapacity: prev.personCapacity + 1
    }));
  };

  const handleDecrement = () => {
    setFormData(prev => ({
      ...prev,
      personCapacity: Math.max(1, prev.personCapacity - 1)
    }));
  };

  return (
    <div className="flex flex-col h-screen">

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-4 pb-20">
          <div className="mt-6 mb-8">
            <h2 className="text-xl md:text-2xl text-center font-semibold text-[#112211]">
              Pricing Details
            </h2>
          </div>

          <div className="space-y-6 max-w-[800px] mx-auto">
            {/* Regular Price */}
            <div>
              <label className="text-sm font-medium text-[#334054] block mb-2">
                Regular Price (in Rupees)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]">₹</span>
                <Input
                  name="price"
                  value={formData.price}
                  onChange={handlePriceChange}
                  className="pl-8 border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                />
              </div>
            </div>

            {/* Person Capacity */}
            <div>
              <label className="text-sm font-medium text-[#334054] block mb-2">
                Person Capacity
              </label>
              <p className="text-xs text-[#667085] mb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDecrement}
                  className="w-8 h-8 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  name="personCapacity"
                  value={formData.personCapacity}
                  onChange={handleInputChange}
                  className="w-12 text-center border-[#E7E8E9] h-9 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                  min={1}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleIncrement}
                  className="w-8 h-8 rounded-full border-[#E7E8E9] p-0 hover:bg-transparent hover:border-gray-300"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Time Duration */}
            <div>
              <label className="text-sm font-medium text-[#334054] block mb-2">
                Time Duration
              </label>
              <Select
                value={formData.timeDuration}
                onValueChange={(value) => setFormData(prev => ({ ...prev, timeDuration: value }))}
              >
                <SelectTrigger className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1hour">1 Hour</SelectItem>
                  <SelectItem value="2hours">2 Hours</SelectItem>
                  <SelectItem value="3hours">3 Hours</SelectItem>
                  <SelectItem value="4hours">4 Hours</SelectItem>
                  <SelectItem value="5hours">5 Hours</SelectItem>
                  <SelectItem value="fullday">Full Day</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-medium text-[#334054] block mb-2">
                Address
              </label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Location"
                className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
              />
            </div>

            {/* State, City, Pincode */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Input
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State"
                  className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                />
              </div>
              <div>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                />
              </div>
              <div>
                <Input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="Pincode"
                  className="border-[#E7E8E9] h-10 bg-white focus:ring-0 focus:border-[#B0B0B0]"
                />
              </div>
            </div>

            {/* Map */}
            <div className="w-full h-[300px] relative rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5965665774604!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1679900095651!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-[#E7E8E9] mt-auto">
        <div className="max-w-[1200px] mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
            <StepNavigation
              onNext={onNext}
              onBack={onBack}
              isFirstStep={false}
              isNextDisabled={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 