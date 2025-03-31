"use client"
import React from 'react';

interface TimeSelectorProps {
  onTimeSelect: (time: string, type: 'checkIn' | 'checkOut') => void;
  onClose: () => void;
  checkInTime?: string | null;
  checkOutTime?: string | null;
}

export function TimeSelector({ onTimeSelect, onClose, checkInTime, checkOutTime }: TimeSelectorProps) {
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  
  // Check-in time state
  const [selectedCheckInHour, setSelectedCheckInHour] = React.useState<number | null>(
    checkInTime ? parseInt(checkInTime.split(' ')[0]) : null
  );
  const [selectedCheckInPeriod, setSelectedCheckInPeriod] = React.useState<'AM' | 'PM'>(
    checkInTime?.includes('PM') ? 'PM' : 'AM'
  );

  // Check-out time state
  const [selectedCheckOutHour, setSelectedCheckOutHour] = React.useState<number | null>(
    checkOutTime ? parseInt(checkOutTime.split(' ')[0]) : null
  );
  const [selectedCheckOutPeriod, setSelectedCheckOutPeriod] = React.useState<'AM' | 'PM'>(
    checkOutTime?.includes('PM') ? 'PM' : 'AM'
  );

  const handleHourSelect = (hour: number, type: 'checkIn' | 'checkOut') => {
    if (type === 'checkIn') {
      setSelectedCheckInHour(hour);
    } else {
      setSelectedCheckOutHour(hour);
    }
  };

  const handlePeriodSelect = (period: 'AM' | 'PM', type: 'checkIn' | 'checkOut') => {
    if (type === 'checkIn') {
      setSelectedCheckInPeriod(period);
    } else {
      setSelectedCheckOutPeriod(period);
    }
  };

  const handleConfirm = (type: 'checkIn' | 'checkOut') => {
    if (type === 'checkIn' && selectedCheckInHour) {
      onTimeSelect(`${selectedCheckInHour} ${selectedCheckInPeriod}`, 'checkIn');
      
      // If check-out time is already confirmed, close the popup
      if (selectedCheckOutHour) {
        onClose();
      }
    } else if (type === 'checkOut' && selectedCheckOutHour) {
      onTimeSelect(`${selectedCheckOutHour} ${selectedCheckOutPeriod}`, 'checkOut');
      
      // If check-in time is already confirmed, close the popup
      if (selectedCheckInHour) {
        onClose();
      }
    }
  };

  const handleDone = () => {
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-[600px] max-w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Select Times</h2>
        <button 
          onClick={handleDone}
          className="text-sm text-gray-500 hover:text-gray-800"
        >
          Done
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Check-in Time Column */}
        <div>
          <h3 className="text-sm text-gray-500 mb-4 font-medium">Check-in Time</h3>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {hours.map((hour) => (
              <button
                key={`checkin-${hour}`}
                onClick={() => handleHourSelect(hour, 'checkIn')}
                className={`p-2 rounded-lg text-center hover:bg-gray-100 ${
                  selectedCheckInHour === hour ? 'bg-black text-white' : ''
                }`}
              >
                {hour}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => handlePeriodSelect('AM', 'checkIn')}
              className={`flex-1 p-2 rounded-lg ${
                selectedCheckInPeriod === 'AM' ? 'bg-black text-white' : 'bg-gray-100'
              }`}
            >
              AM
            </button>
            <button
              onClick={() => handlePeriodSelect('PM', 'checkIn')}
              className={`flex-1 p-2 rounded-lg ${
                selectedCheckInPeriod === 'PM' ? 'bg-black text-white' : 'bg-gray-100'
              }`}
            >
              PM
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {selectedCheckInHour ? `${selectedCheckInHour} ${selectedCheckInPeriod}` : 'Select hour and period'}
            </div>
            <button 
              onClick={() => handleConfirm('checkIn')}
              disabled={!selectedCheckInHour}
              className={`px-4 py-2 rounded-lg text-sm ${
                selectedCheckInHour 
                  ? 'bg-black text-white hover:bg-gray-800' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Confirm
            </button>
          </div>
        </div>

        {/* Check-out Time Column */}
        <div>
          <h3 className="text-sm text-gray-500 mb-4 font-medium">Check-out Time</h3>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {hours.map((hour) => (
              <button
                key={`checkout-${hour}`}
                onClick={() => handleHourSelect(hour, 'checkOut')}
                className={`p-2 rounded-lg text-center hover:bg-gray-100 ${
                  selectedCheckOutHour === hour ? 'bg-black text-white' : ''
                }`}
              >
                {hour}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => handlePeriodSelect('AM', 'checkOut')}
              className={`flex-1 p-2 rounded-lg ${
                selectedCheckOutPeriod === 'AM' ? 'bg-black text-white' : 'bg-gray-100'
              }`}
            >
              AM
            </button>
            <button
              onClick={() => handlePeriodSelect('PM', 'checkOut')}
              className={`flex-1 p-2 rounded-lg ${
                selectedCheckOutPeriod === 'PM' ? 'bg-black text-white' : 'bg-gray-100'
              }`}
            >
              PM
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {selectedCheckOutHour ? `${selectedCheckOutHour} ${selectedCheckOutPeriod}` : 'Select hour and period'}
            </div>
            <button 
              onClick={() => handleConfirm('checkOut')}
              disabled={!selectedCheckOutHour}
              className={`px-4 py-2 rounded-lg text-sm ${
                selectedCheckOutHour 
                  ? 'bg-black text-white hover:bg-gray-800' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 