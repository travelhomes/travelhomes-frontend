"use client";
import React, { useState, useEffect } from "react";
import { Calendar } from "./calendar";

interface TimeSelectorProps {
  checkInTime: string | null;
  checkOutTime: string | null;
  onTimeSelect: (time: string, type: "checkIn" | "checkOut") => void;
  onClose: () => void;
  timePickerType: "checkIn" | "checkOut";
  onDateSelect?: (dates: Date[]) => void;
  initialDates?: Date[];
}

export function TimeSelector({
  checkInTime,
  checkOutTime,
  onTimeSelect,
  onClose,
  timePickerType: initialTabType,
  onDateSelect,
  initialDates,
}: TimeSelectorProps) {
  // Use initialTabType to determine if we should start in time tab when a particular time is being edited
  const startInTimeTab = Boolean(initialDates && initialDates.length === 2);
  const [activeTab, setActiveTab] = useState<"date" | "time">(
    startInTimeTab ? "time" : "date"
  );

  // Use initialTabType to focus on either check-in or check-out times initially
  const [activeTimeField, setActiveTimeField] = useState<
    "checkIn" | "checkOut"
  >(initialTabType);
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);

  // Check-in time state - initialize period to null to require explicit selection
  const [selectedCheckInHour, setSelectedCheckInHour] = React.useState<
    number | null
  >(checkInTime ? parseInt(checkInTime.split(" ")[0]) : null);
  const [selectedCheckInPeriod, setSelectedCheckInPeriod] = React.useState<
    "AM" | "PM" | null
  >(
    checkInTime?.includes("PM")
      ? "PM"
      : checkInTime?.includes("AM")
      ? "AM"
      : null
  );

  // Check-out time state - initialize period to null to require explicit selection
  const [selectedCheckOutHour, setSelectedCheckOutHour] = React.useState<
    number | null
  >(checkOutTime ? parseInt(checkOutTime.split(" ")[0]) : null);
  const [selectedCheckOutPeriod, setSelectedCheckOutPeriod] = React.useState<
    "AM" | "PM" | null
  >(
    checkOutTime?.includes("PM")
      ? "PM"
      : checkOutTime?.includes("AM")
      ? "AM"
      : null
  );

  // Use initial dates if provided
  useEffect(() => {
    if (initialDates && initialDates.length === 2) {
      // If dates are already selected, start on the time tab
      setActiveTab("time");
    }
  }, [initialDates]);

  const handleHourSelect = (hour: number, type: "checkIn" | "checkOut") => {
    if (type === "checkIn") {
      setSelectedCheckInHour(hour);

      // Only dispatch time select if both hour and period are selected
      if (selectedCheckInPeriod) {
        onTimeSelect(`${hour} ${selectedCheckInPeriod}`, "checkIn");

        // If check-out time is already completely selected, set the flag to close
      }
    } else {
      setSelectedCheckOutHour(hour);

      // Only dispatch time select if both hour and period are selected
      if (selectedCheckOutPeriod) {
        onTimeSelect(`${hour} ${selectedCheckOutPeriod}`, "checkOut");
      }
    }
  };

  // closes the modal when clicked
  const handleDoneClick = () => {
    if (
      selectedCheckInHour &&
      selectedCheckInPeriod &&
      selectedCheckOutHour &&
      selectedCheckOutPeriod
    ) {
      onClose();
    }
  };

  const handlePeriodSelect = (
    period: "AM" | "PM",
    type: "checkIn" | "checkOut"
  ) => {
    if (type === "checkIn") {
      setSelectedCheckInPeriod(period);

      // Only dispatch time select if both hour and period are selected
      if (selectedCheckInHour) {
        onTimeSelect(`${selectedCheckInHour} ${period}`, "checkIn");
      }
    } else {
      setSelectedCheckOutPeriod(period);

      // Only dispatch time select if both hour and period are selected
      if (selectedCheckOutHour) {
        onTimeSelect(`${selectedCheckOutHour} ${period}`, "checkOut");
      }
    }
  };

  const handleCalendarDateSelect = (dates: Date[]) => {
    if (dates.length === 2 && onDateSelect) {
      onDateSelect(dates);
      setActiveTab("time");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-[600px] max-w-full">
      <div className="flex items-center mb-6">
        <div className="flex space-x-4 w-full">
          <button
            onClick={() => setActiveTab("date")}
            className={`text-lg font-semibold pb-2 ${
              activeTab === "date"
                ? "border-b-2 border-black text-black"
                : "text-gray-500"
            }`}
          >
            Date
          </button>
          <button
            onClick={() => setActiveTab("time")}
            className={`text-lg font-semibold pb-2 ${
              activeTab === "time"
                ? "border-b-2 border-black text-black"
                : "text-gray-500"
            }`}
          >
            Time
          </button>
        </div>
        {activeTab === "time" && (
          <button
            onClick={handleDoneClick}
            className="bg-black px-3 py-2 rounded-sm text-white"
          >
            Done
          </button>
        )}
      </div>

      {activeTab === "date" && (
        <div>
          <Calendar onDateSelect={handleCalendarDateSelect} />
        </div>
      )}

      {activeTab === "time" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Check-in Time Column */}
          <div
            className={
              activeTimeField === "checkIn"
                ? "bg-gray-50 p-4 rounded-lg"
                : "p-4"
            }
          >
            <h3 className="text-lg font-medium mb-4">
              <button
                onClick={() => setActiveTimeField("checkIn")}
                className={`focus:outline-none ${
                  activeTimeField === "checkIn" ? "text-black" : "text-gray-500"
                }`}
              >
                Check-in Time
              </button>
            </h3>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {hours.map((hour) => (
                <button
                  key={`checkin-${hour}`}
                  onClick={() => handleHourSelect(hour, "checkIn")}
                  className={`p-2 rounded-lg text-center hover:bg-gray-100 ${
                    selectedCheckInHour === hour ? "bg-black text-white" : ""
                  }`}
                >
                  {hour}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => handlePeriodSelect("AM", "checkIn")}
                className={`flex-1 p-2 rounded-lg ${
                  selectedCheckInPeriod === "AM"
                    ? "bg-black text-white"
                    : "bg-gray-100"
                }`}
              >
                AM
              </button>
              <button
                onClick={() => handlePeriodSelect("PM", "checkIn")}
                className={`flex-1 p-2 rounded-lg ${
                  selectedCheckInPeriod === "PM"
                    ? "bg-black text-white"
                    : "bg-gray-100"
                }`}
              >
                PM
              </button>
            </div>
            <div className="text-center text-lg mt-2">
              {selectedCheckInHour && selectedCheckInPeriod
                ? `${selectedCheckInHour} ${selectedCheckInPeriod}`
                : selectedCheckInHour
                ? `${selectedCheckInHour} (select AM/PM)`
                : "Select time"}
            </div>
          </div>

          {/* Check-out Time Column */}
          <div
            className={
              activeTimeField === "checkOut"
                ? "bg-gray-50 p-4 rounded-lg"
                : "p-4"
            }
          >
            <h3 className="text-lg font-medium mb-4">
              <button
                onClick={() => setActiveTimeField("checkOut")}
                className={`focus:outline-none ${
                  activeTimeField === "checkOut"
                    ? "text-black"
                    : "text-gray-500"
                }`}
              >
                Check-out Time
              </button>
            </h3>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {hours.map((hour) => (
                <button
                  key={`checkout-${hour}`}
                  onClick={() => handleHourSelect(hour, "checkOut")}
                  className={`p-2 rounded-lg text-center hover:bg-gray-100 ${
                    selectedCheckOutHour === hour ? "bg-black text-white" : ""
                  }`}
                >
                  {hour}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => handlePeriodSelect("AM", "checkOut")}
                className={`flex-1 p-2 rounded-lg ${
                  selectedCheckOutPeriod === "AM"
                    ? "bg-black text-white"
                    : "bg-gray-100"
                }`}
              >
                AM
              </button>
              <button
                onClick={() => handlePeriodSelect("PM", "checkOut")}
                className={`flex-1 p-2 rounded-lg ${
                  selectedCheckOutPeriod === "PM"
                    ? "bg-black text-white"
                    : "bg-gray-100"
                }`}
              >
                PM
              </button>
            </div>
            <div className="text-center text-lg mt-2">
              {selectedCheckOutHour && selectedCheckOutPeriod
                ? `${selectedCheckOutHour} ${selectedCheckOutPeriod}`
                : selectedCheckOutHour
                ? `${selectedCheckOutHour} (select AM/PM)`
                : "Select time"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
