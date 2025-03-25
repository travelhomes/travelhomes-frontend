"use client";

import { useState } from "react";
import { ChevronDown, Eye, Loader2, Clock } from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Chart data - monthly earnings
const chartData = [
  { month: "Jan", value: 120 },
  { month: "Feb", value: 100 },
  { month: "Mar", value: 430 },
  { month: "Apr", value: 240 },
  { month: "May", value: 320 },
  { month: "Jun", value: 450 },
  { month: "Jul", value: 280 },
  { month: "Aug", value: 430 },
  { month: "Sep", value: 420 },
  { month: "Oct", value: 240 },
  { month: "Nov", value: 280 },
  { month: "Dec", value: 330 },
];

// Sample payment history data
const paymentHistoryData = [
  {
    paymentMethod: "Badal Singh",
    refId: "Gpay_2034u3293r94539",
    translationId: "34535",
    amountPay: "2000 INR",
    firstName: "Badal",
    lastName: "Singh",
    receiptDate: "20/2/2024",
  },
  {
    paymentMethod: "Badal Singh",
    refId: "Gpay_2034u3293r94539",
    translationId: "34535",
    amountPay: "2000 INR",
    firstName: "Badal",
    lastName: "Singh",
    receiptDate: "20/2/2024",
  },
  {
    paymentMethod: "Badal Singh",
    refId: "Gpay_2034u3293r94539",
    translationId: "34535",
    amountPay: "2000 INR",
    firstName: "Badal",
    lastName: "Singh",
    receiptDate: "20/2/2024",
  },
];

export function RevenueContent() {
  const [filterPeriod] = useState("Monthly");

  return (
    <div className={`${plusJakartaSans.className} bg-white rounded-xl h-[90vh] overflow-y-auto`}>
      <div>
        {/* Header */}
        <div className="flex justify-between items-center pb-6 border-b p-5">
          <h1 className="text-2xl font-semibold">Overview</h1>
          <Button className="rounded-full bg-black hover:bg-black/90 text-white px-[24px] py-[20px] flex items-center gap-2">
            <span className="font-medium">+</span>
            <span>New Booking</span>
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-5">
          {/* Total Earnings Card */}
          <div className="bg-[#FDEBE0] rounded-lg p-6 flex items-start">
                        <div className="h-[48px] w-[48px] rounded-full bg-[#F8DBCB] flex items-center justify-center mr-4">
                            <Eye className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                            <h3 className="text-sm text-[#485467]">Total Earnings</h3>
                            <p className="text-2xl font-bold mt-[10px]">424242</p>
                        </div>
                    </div>

          {/* Total Payment Received Card */}
          <div className="bg-[#DBD9FF] rounded-lg p-6 flex items-start">
                        <div className="h-[48px] w-[48px] rounded-full bg-[#D0CDFF] flex items-center justify-center mr-4">
                            <Loader2 className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                            <h3 className="text-sm text-[#485467]">Total Payment Recivied</h3>
                            <p className="text-2xl font-bold mt-[10px]">250</p>
                        </div>
                    </div>

          {/* Pending Payment Card */}
          <div className="bg-[#DBF6FC] rounded-lg p-6 flex items-start">
                        <div className="h-[48px] w-[48px] rounded-full bg-[#CCF5FF] flex items-center justify-center mr-4">
                            <Clock className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                            <h3 className="text-sm text-[#485467]">Pending Payment</h3>
                            <p className="text-2xl font-bold mt-[10px]">23</p>
                        </div>
                    </div>
        </div>

        {/* Revenue Chart Section */}
        <div className="p-5 pb-0">

        <div className="bg-white border rounded-xl p-5 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg">Total Earnings</h2>
            <div className="relative">
              <button className="flex items-center gap-2 border rounded-md px-4 py-2 text-sm">
                {filterPeriod}
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E2A48" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#1E2A48" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#EAECF0" />
                <XAxis 
                  dataKey="month" 
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
                  ticks={[0, 100, 200, 300, 400, 500]}
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
        </div>


        {/* Payment History Table */}
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg">Payment History</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  placeholder="Search List"
                  className="pl-10 h-10 w-64 border-gray-200"
                />
                <div className="absolute left-3 top-0 h-full flex items-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 14L10 10M11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z"
                      stroke="#667085"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <button className="flex items-center gap-2 border rounded-md px-4 py-2 text-sm">
                  Monthly
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F2F4F7]">
                  <TableHead className="font-bold text-[#334054] text-[14px]">Payment Method</TableHead>
                  <TableHead className="font-bold text-[#334054] text-[14px]">Payment Ref ID</TableHead>
                  <TableHead className="font-bold text-[#334054] text-[14px]">Translation ID</TableHead>
                  <TableHead className="font-bold text-[#334054] text-[14px]">Amount Pay</TableHead>
                  <TableHead className="font-bold text-[#334054] text-[14px]">First Name</TableHead>
                  <TableHead className="font-bold text-[#334054] text-[14px]">Last Name</TableHead>
                  <TableHead className="font-bold text-[#334054] text-[14px]">Receipt Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistoryData.map((payment, index) => (
                  <TableRow key={index} className="hover:bg-gray-50 py-[14px] px-[12px] text-[14px] text-[#485467]">
                    <TableCell>{payment.paymentMethod}</TableCell>
                    <TableCell>{payment.refId}</TableCell>
                    <TableCell className="font-bold">{payment.translationId}</TableCell>
                    <TableCell>{payment.amountPay}</TableCell>
                    <TableCell>{payment.firstName}</TableCell>
                    <TableCell>{payment.lastName}</TableCell>
                    <TableCell>{payment.receiptDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
} 