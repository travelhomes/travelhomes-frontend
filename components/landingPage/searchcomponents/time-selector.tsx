"use client"
import React from 'react';

interface TimeSelectorProps {
  onTimeSelect: (time: string) => void;
  onClose: () => void;
  timePickerType: 'checkIn' | 'checkOut';
}

export function TimeSelector({ onTimeSelect, onClose, timePickerType }: TimeSelectorProps) {
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const [selectedHour, setSelectedHour] = React.useState<number | null>(null);
  const [selectedPeriod, setSelectedPeriod] = React.useState<'AM' | 'PM'>('AM');

  const handleHourSelect = (hour: number) => {
    setSelectedHour(hour);
    // Don't close yet - wait for explicit confirmation
  };

  const handlePeriodSelect = (period: 'AM' | 'PM') => {
    setSelectedPeriod(period);
    // Don't close yet - wait for explicit confirmation
  };

  const handleConfirm = () => {
    if (selectedHour) {
      onTimeSelect(`${selectedHour} ${selectedPeriod}`);
      onClose();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-[300px]">
      <div className="mb-4">
        <h3 className="text-sm text-gray-500 mb-2">
          {timePickerType === 'checkIn' ? 'Check-in Time' : 'Check-out Time'}
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {hours.map((hour) => (
            <button
              key={hour}
              onClick={() => handleHourSelect(hour)}
              className={`p-2 rounded-lg text-center hover:bg-gray-100 ${
                selectedHour === hour ? 'bg-black text-white' : ''
              }`}
            >
              {hour}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => handlePeriodSelect('AM')}
          className={`flex-1 p-2 rounded-lg ${
            selectedPeriod === 'AM' ? 'bg-black text-white' : 'bg-gray-100'
          }`}
        >
          AM
        </button>
        <button
          onClick={() => handlePeriodSelect('PM')}
          className={`flex-1 p-2 rounded-lg ${
            selectedPeriod === 'PM' ? 'bg-black text-white' : 'bg-gray-100'
          }`}
        >
          PM
        </button>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {selectedHour ? `Selected: ${selectedHour} ${selectedPeriod}` : 'Select hour and period'}
        </div>
        <button 
          onClick={handleConfirm}
          disabled={!selectedHour}
          className={`px-4 py-2 rounded-lg text-sm ${
            selectedHour 
              ? 'bg-black text-white hover:bg-gray-800' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Confirm
        </button>
      </div>
    </div>
  );
} 