"use client";

import { useState } from "react";
import { Eye, MousePointerClick, FileCheck, Clock, ChevronDown } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Plus_Jakarta_Sans } from "next/font/google";


const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Monthly data for charts
const monthlyData = [
  { name: "Jan", value: 100 },
  { name: "Feb", value: 120 },
  { name: "Mar", value: 420 },
  { name: "Apr", value: 260 },
  { name: "May", value: 500 },
  { name: "Jun", value: 450 },
  { name: "Jul", value: 480 },
  { name: "Aug", value: 400 },
  { name: "Sep", value: 380 },
  { name: "Oct", value: 300 },
  { name: "Nov", value: 200 },
  { name: "Dec", value: 300 },
];

// Daily data for visitor chart
const dailyData = [
  { name: "Mon", value: 100 },
  { name: "Tues", value: 420 },
  { name: "Wed", value: 260 },
  { name: "Thu", value: 450 },
  { name: "Fri", value: 380 },
  { name: "Sat", value: 250 },
  { name: "Sun", value: 300 },
];

// Yearly data
const yearlyData = [
  { name: "2018", value: 100 },
  { name: "2019", value: 420 },
  { name: "2020", value: 500 },
  { name: "2021", value: 380 },
  { name: "2022", value: 450 },
  { name: "2023", value: 300 },
  { name: "2024", value: 400 },
];

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
  iconBgColor: string;
}

function StatCard({ title, value, icon, bgColor, iconBgColor }: StatCardProps) {
  return (
    <div className={`${bgColor} rounded-lg flex items-start`}>
      <div className={`h-[48px] w-[48px] rounded-full ${iconBgColor} flex items-center justify-center mr-4`}>
        {icon}
      </div>
      <div>
        <h3 className="text-sm text-[#485467]">{title}</h3>
        <p className="text-2xl font-bold mt-[10px]">{value}</p>
      </div>
    </div>
  );
}

interface ChartSectionProps {
  title: string;
  data: {name: string; value: number}[];
  period: string;
  setPeriod: (value: string) => void;
}

function ChartSection({ title, data, period, setPeriod }: ChartSectionProps) {
  return (
    <div className="bg-white border rounded-xl p-5 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">{title}</h2>
        <div className="relative">
          <button 
            className="flex items-center gap-2 border rounded-md px-4 py-2 text-sm"
            onClick={() => setPeriod(period === "Monthly" ? "Yearly" : "Monthly")}
          >
            {period}
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1E2A48" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#1E2A48" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#EAECF0" />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#667085' }}
              dy={10}
            />
            <YAxis
              tickCount={6}
              domain={[0, 500]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#667085' }}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #EAECF0',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
              }}
              itemStyle={{ color: '#1E2A48' }}
              labelStyle={{ color: '#667085' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#1E2A48"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function AnalyticsContent() {
  const [earningsPeriod, setEarningsPeriod] = useState("Monthly");
  const [visitorPeriod, setVisitorPeriod] = useState("Daily");
  const [revenuePeriod, setRevenuePeriod] = useState("Monthly");

  return (
    <div className={`${plusJakartaSans.className} bg-white rounded-xl h-full overflow-y-auto`}>
      <div>
        {/* Header */}
        <div className="border-b pb-2 border-[#EAECF0] py-5">
          <h1 className="text-[20px] text-[#101828] font-semibold px-5">Overview</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-5">
          <StatCard
            title="Impression"
            value="1246"
            icon={<Eye className="h-5 w-5 text-gray-600" />}
            bgColor="bg-[#FDEBE0]"
            iconBgColor="bg-[#F8DBCB]"
          />
          <StatCard
            title="Clicked"
            value="1246"
            icon={<MousePointerClick className="h-5 w-5 text-gray-600" />}
            bgColor="bg-[#DBD9FF]"
            iconBgColor="bg-[#D0CDFF]"
          />
          <StatCard
            title="No. of Payment Received"
            value="1246"
            icon={<FileCheck className="h-5 w-5 text-gray-600" />}
         bgColor="bg-[#DBF6FC]"
            iconBgColor="bg-[#CCF5FF]"
          />
          <StatCard
            title="No. of Payment Pending"
            value="532"
            icon={<Clock className="h-5 w-5 text-gray-600" />}
            bgColor="bg-[#FFE7E7]"
            iconBgColor="bg-[#FFD5D5]"
          />
        </div>

        {/* Booking Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-5">
          <StatCard
            title="Total Booking"
            value="1246"
            icon={<FileCheck className="h-5 w-5 text-gray-600" />}
            bgColor="bg-[#F4E8FF]"
            iconBgColor="bg-[#ECD9FF]"
          />
          <StatCard
            title="Upcoming Booking"
            value="1246"
            icon={<Clock className="h-5 w-5 text-gray-600" />}
            bgColor="bg-[#DBF6FC]"
            iconBgColor="bg-[#CCF5FF]"
          />
          <StatCard
            title="Past Booking"
            value="1246"
            icon={<FileCheck className="h-5 w-5 text-gray-600" />}
            bgColor="bg-[#E3FBE4]"
            iconBgColor="bg-[#D8F4D9]"
          />
          <StatCard
            title="Cancelled Booking"
            value="1246"
            icon={<Clock className="h-5 w-5 text-gray-600" />}
            bgColor="bg-[#F6E0FD]"
            iconBgColor="bg-[#F4D2FF]"
          />
        </div>
        {/* Property Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-5">
          <StatCard
            title="Approved Property Listing"
            value="1246"
            icon={<FileCheck className="h-5 w-5 text-gray-600" />}
            bgColor="bg-[#FDEBE0]"
            iconBgColor="bg-[#F8DBCB]"
          />
          <StatCard
            title="Pending Property for Approval"
            value="1246"
            icon={<Clock className="h-5 w-5 text-gray-600" />}
            bgColor="bg-[#FDEBE0]"
            iconBgColor="bg-[#F8DBCB]"
          />
          {/* Add two empty columns to maintain grid alignment */}
          <div className="hidden lg:block"></div>
          <div className="hidden lg:block"></div>
        </div>

        {/* Charts */}
        <div className="p-5">
          <div className="flex flex-wrap gap-6">
            {/* First row - 2 charts */}
            <div className="w-full lg:w-[calc(50%-0.75rem)]">
              <ChartSection
                title="Total Earnings"
                data={earningsPeriod === "Monthly" ? monthlyData : yearlyData}
                period={earningsPeriod}
                setPeriod={setEarningsPeriod}
              />
            </div>
            
            <div className="w-full lg:w-[calc(50%-0.75rem)]">
              <ChartSection
                title="Total Visitor"
                data={visitorPeriod === "Daily" ? dailyData : monthlyData}
                period={visitorPeriod}
                setPeriod={setVisitorPeriod}
              />
            </div>

            {/* Second row - 1 chart */}
            <div className="w-full lg:w-[calc(50%-0.75rem)]">
              <ChartSection
                title="Total Revenue"
                data={revenuePeriod === "Monthly" ? monthlyData : yearlyData}
                period={revenuePeriod}
                setPeriod={setRevenuePeriod}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 