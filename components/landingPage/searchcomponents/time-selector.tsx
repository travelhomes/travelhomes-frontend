"use client"
import React from 'react';

interface TimeSelectorProps {
  onTimeSelect: (time: string, period: 'AM' | 'PM') => void;
  onClose: () => void;
}

export function TimeSelector({ onTimeSelect, onClose }: TimeSelectorProps) {
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const [selectedHour, setSelectedHour] = React.useState<number | null>(null);
  const [selectedPeriod, setSelectedPeriod] = React.useState<'AM' | 'PM'>('AM');

  const handleTimeSelect = (hour: number) => {
    setSelectedHour(hour);
    onTimeSelect(`${hour}`, selectedPeriod);
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-[300px]">
      <div className="mb-4">
        <h3 className="text-sm text-gray-500 mb-2">Time</h3>
        <div className="grid grid-cols-3 gap-2">
          {hours.map((hour) => (
            <button
              key={hour}
              onClick={() => handleTimeSelect(hour)}
              className={`p-2 rounded-lg text-center hover:bg-gray-100 ${
                selectedHour === hour ? 'bg-black text-white' : ''
              }`}
            >
              {hour}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => {
            setSelectedPeriod('AM');
            if (selectedHour) {
              onTimeSelect(`${selectedHour}`, 'AM');
              onClose();
            }
          }}
          className={`flex-1 p-2 rounded-lg ${
            selectedPeriod === 'AM' ? 'bg-black text-white' : 'bg-gray-100'
          }`}
        >
          AM
        </button>
        <button
          onClick={() => {
            setSelectedPeriod('PM');
            if (selectedHour) {
              onTimeSelect(`${selectedHour}`, 'PM');
              onClose();
            }
          }}
          className={`flex-1 p-2 rounded-lg ${
            selectedPeriod === 'PM' ? 'bg-black text-white' : 'bg-gray-100'
          }`}
        >
          PM
        </button>
      </div>
    </div>
  );
} 