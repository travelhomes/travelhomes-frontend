"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Step1Props {
  onNext: () => void
}

export default function Step1({ onNext }: Step1Props) {
  return (
    <div className="max-w-[720px] mx-auto py-8">
      <div className="space-y-8">
        <div>
          <h2 className="text-[24px] font-semibold text-[#112211]">Caravan Descriptions</h2>
        </div>

        <div className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="text-sm font-medium text-[#112211] block mb-2">Name</label>
            <Input 
              placeholder="Name" 
              className="border-[#E7E8E9] h-11 bg-white focus:ring-0 focus:border-[#B0B0B0]"
            />
            <div className="text-right text-xs text-[#112211] mt-1">0/50</div>
          </div>

          {/* Description Input */}
          <div>
            <label className="text-sm font-medium text-[#112211] block mb-2">Descriptions</label>
            <Textarea 
              placeholder="Write here" 
              className="border-[#E7E8E9] min-h-[120px] bg-white focus:ring-0 focus:border-[#B0B0B0] resize-none"
            />
            <div className="text-right text-xs text-[#112211] mt-1">0/500</div>
          </div>

          {/* Rules & Regulation Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-[#112211]">Rules & Regulation</label>
              <Button 
                variant="ghost" 
                className="text-black hover:text-black hover:bg-transparent p-0 h-auto text-sm"
              >
                + Add More
              </Button>
            </div>
            <Textarea 
              placeholder="Write here" 
              className="border-[#E7E8E9] min-h-[120px] bg-white focus:ring-0 focus:border-[#B0B0B0] resize-none"
            />
          </div>

          {/* Upload Photos */}
          <div>
            <label className="text-sm font-medium text-[#112211] block mb-2">Upload Photos</label>
            <div className="grid grid-cols-3 gap-3">
              {/* Cover Photo */}
              <div className="col-span-1">
                <div className="border border-dashed border-[#E7E8E9] rounded-lg aspect-[4/3] flex flex-col items-center justify-center text-center bg-[#F9FAFB] cursor-pointer hover:bg-[#F0F1F3] transition-colors">
                  <span className="text-sm text-[#667085]">Cover Photo</span>
                  <div className="mt-1">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 4.16666V15.8333M4.16667 10H15.8333" stroke="#667085" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Additional Photos Grid */}
              <div className="col-span-2 grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="border border-dashed border-[#E7E8E9] rounded-lg aspect-square flex items-center justify-center bg-[#F9FAFB] cursor-pointer hover:bg-[#F0F1F3] transition-colors">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 4.16666V15.8333M4.16667 10H15.8333" stroke="#667085" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-2 text-xs text-[#667085]">(Min image 5 photo required)</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center border-t border-[#E7E8E9] pt-6">
        <Button 
          variant="outline" 
          className="border-[#E7E8E9] text-black hover:bg-transparent hover:border-[#B0B0B0]"
        >
          Back
        </Button>
        <div className="text-sm text-[#112211]">0/6 Completed</div>
        <Button 
          onClick={onNext}
          className="bg-black text-white hover:bg-black/90 rounded"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
