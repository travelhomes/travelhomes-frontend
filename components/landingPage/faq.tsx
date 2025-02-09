'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

interface FAQItem {
  id: number
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 2,
    question: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 3,
    question: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 4,
    question: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  }
]

const tags = ['Lorem ipsum', 'Lorem', 'Lorem ip']

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null)
  const [activeTagIndex, setActiveTagIndex] = useState(0)

  return (
    <div className="py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:mb-8 text-center lg:text-center w-full lg:w-[450px] lg:pr-[56px]">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently<br />Asked Questions</h2>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Find answer go common inquiries about using lorem ipsum we&apos;re here to make your experience as smooth as possible and here answer am to provide you information
          </p>
          <div className="flex flex-row gap-2 justify-between border border-[#F6F6F6] h-[50px] shadow-sm rounded-[60px]">
            {tags.map((tag, index) => (
              <button
                key={index}
                onClick={() => setActiveTagIndex(index)}
                className={`px-[20px] py-[13px] sm:px-4 sm:py-2 text-xs  md:w-[125px] sm:text-sm rounded-full transition-colors ${
                  activeTagIndex === index ? 'bg-black text-white' : 'bg-white text-black'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full space-y-2 sm:space-y-4 rounded-lg sm:rounded-[8px]">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="rounded-lg overflow-hidden border border-gray-200"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className={`flex justify-between items-center w-full p-3 sm:p-4 text-left ${
                  openId === faq.id ? 'bg-[#F6F6F6]' : 'hover:bg-gray-50'
                }`}
                aria-expanded={openId === faq.id}
                aria-controls={`faq-${faq.id}`}
              >
                <span className="font-medium text-sm sm:text-base">{faq.question}</span>
                <span className="ml-2 sm:ml-4 flex-shrink-0">
                  {openId === faq.id ? (
                    <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </span>
              </button>
              <div
                id={`faq-${faq.id}`}
                role="region"
                className={`
                  transition-all duration-200 ease-in-out
                  ${openId === faq.id ? 'max-h-96' : 'max-h-0'}
                  overflow-hidden
                  ${openId === faq.id ? 'bg-[#F6F6F6]' : ''}
                `}
              >
                <div className="p-3 sm:p-4 pt-0 text-gray-600 text-sm sm:text-base">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  )
}
