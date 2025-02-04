"use client"
import React, { useState } from 'react';
import { Plus, Minus, Search } from 'lucide-react';
import Appbar from '@/components/landingPage/appbar';
import Footer from '@/components/landingPage/footer';

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'Lorem ipsum is simply dummy text of the printing and typesetting industry',
    answer: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth.'
  },
  {
    id: 2,
    question: 'Lorem ipsum is simply dummy text of the printing and typesetting industry',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 3,
    question: 'Lorem ipsum is simply dummy text of the printing and typesetting industry',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    id: 4,
    question: 'Lorem ipsum is simply dummy text of the printing and typesetting industry',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    id: 5,
    question: 'Lorem ipsum is simply dummy text of the printing and typesetting industry',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }
];

export default function HelpCenter() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(2);
  const [activeTab, setActiveTab] = useState('guest');

  return (
    <div className="min-h-screen">
      <div className="py-4 px-4 md:px-20 border-b">
        <Appbar />
      </div>

      <div className="mx-4 md:mx-[10%] px-4 md:px-6 py-8">
        <h1 className="text-2xl md:text-[2rem] font-semibold text-[#1C2939] mb-[25px] text-center">👋🏻 Hi Badal, how can we help?</h1>
        
        <div className="relative mb-8">
          <div className="max-w-[640px] mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search your queries here..."
                className="w-full p-3 md:p-4 pr-12 border border-[#E5E7EB] rounded-[60px] outline-none text-[#717171] placeholder:text-[#717171] text-sm md:text-base"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-black rounded-full p-2">
                <Search className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 md:gap-6 mb-8 text-sm">
          {['Guest', 'Booking', 'Common Questions', 'Locations'].map((tab) => (
            <button
              key={tab}
              className={`whitespace-nowrap ${
                activeTab === tab.toLowerCase()
                  ? 'text-black font-medium'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab(tab.toLowerCase())}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-4 mb-12">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`border py-1 px-4 md:px-5 border-gray-100 rounded-[8px] ${
                openFAQ === faq.id ? 'bg-[#F6F6F6]' : ''
              }`}
            >
              <button
                className="w-full flex items-start justify-between py-4 text-left"
                onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
              >
                <span className="text-[#131313] pr-4 md:pr-8 text-base md:text-[17px]">{faq.question}</span>
                {openFAQ === faq.id ? (
                  <Minus className="w-5 h-5 text-gray-400 shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-400 shrink-0" />
                )}
              </button>
              {openFAQ === faq.id && (
                <div className="pb-4 text-[#535353] text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-[#F6F6F6] rounded-lg p-4 md:p-8">
          <h2 className="text-lg md:text-xl font-semibold text-[#1C2939] mb-6">Raise a Ticket</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-sm font-medium text-[#334054]">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Steve Rogers"
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg outline-none text-[#717171] bg-white text-sm md:text-base"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="phone" className="block text-sm font-medium text-[#334054]">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg outline-none text-[#717171] bg-white text-sm md:text-base"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="subject" className="block text-sm font-medium text-[#334054]">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="Booking Issue"
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg outline-none text-[#717171] bg-white text-sm md:text-base"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium text-[#334054]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="steve@gmail.com"
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg outline-none text-[#717171] bg-white text-sm md:text-base"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="city" className="block text-sm font-medium text-[#334054]">
                City
              </label>
              <input
                id="city"
                type="text"
                placeholder="Mumbai"
                className="w-full p-3 border border-[#E5E7EB] rounded-lg outline-none text-[#717171] bg-white text-sm md:text-base"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="message" className="block text-sm font-medium text-[#334054]">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="I have a booking issue..."
                className="w-full p-3 border border-[#E5E7EB] rounded-lg outline-none text-[#717171] bg-white text-sm md:text-base"
              />
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm md:text-base"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}