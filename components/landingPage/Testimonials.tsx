'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Testimoleft, Testmoright } from '@/public/assets/CustomIcon'
import { Plus_Jakarta_Sans } from "next/font/google";


const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


interface Testimonial {
  id: number
  author: string
  role: string
  content: string
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    author: 'Evyatar Ram',
    role: 'Aware Studios - Art Dir',
    content: 'Being good at capturing signals is key to our success! Knowing what the customers really say and meaning that feedback is really helpful, especially across different teams with different tools.',
    image: 'https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 2,
    author: 'Evyatar Ram',
    role: 'Aware Studios - Art Dir',
    content: 'Being good at capturing signals is key to our success! Knowing what the customers really say and meaning that feedback is really helpful, especially across different teams with different tools.',
    image: 'https://images.pexels.com/photos/30236440/pexels-photo-30236440/free-photo-of-businessman-using-smartphone-in-black-and-white-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 3,
    author: 'Evyatar Ram',
    role: 'Aware Studios - Art Dir',
    content: 'Being good at capturing signals is key to our success! Knowing what the customers really say and meaning that feedback is really helpful, especially across different teams with different tools.',
    image: 'https://images.pexels.com/photos/5511629/pexels-photo-5511629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 4,
    author: 'Evyatar Ram',
    role: 'Aware Studios - Art Dir',
    content: 'Being good at capturing signals is key to our success! Knowing what the customers really say and meaning that feedback is really helpful, especially across different teams with different tools.',
    image: 'https://images.pexels.com/photos/5511629/pexels-photo-5511629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 5,
    author: 'Evyatar Ram',
    role: 'Aware Studios - Art Dir',
    content: 'Being good at capturing signals is key to our success! Knowing what the customers really say and meaning that feedback is really helpful, especially across different teams with different tools.',
    image: 'https://images.pexels.com/photos/5511629/pexels-photo-5511629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 6,
    author: 'Evyatar Ram',
    role: 'Aware Studios - Art Dir',
    content: 'Being good at capturing signals is key to our success! Knowing what the customers really say and meaning that feedback is really helpful, especially across different teams with different tools.',
    image: 'https://images.pexels.com/photos/5511629/pexels-photo-5511629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 7,
    author: 'Evyatar Ram',
    role: 'Aware Studios - Art Dir',
    content: 'Being good at capturing signals is key to our success! Knowing what the customers really say and meaning that feedback is really helpful, especially across different teams with different tools.',
    image: 'https://images.pexels.com/photos/5511629/pexels-photo-5511629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const newIndex = direction === 'left' 
        ? Math.max(currentIndex - 1, 0)
        : Math.min(currentIndex + 1, testimonials.length - 1)
      
      setCurrentIndex(newIndex)
      
      const card = scrollRef.current.children[newIndex] as HTMLElement
      card.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      })
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (scrollRef.current) {
      const touch = e.touches[0]
      scrollRef.current.dataset.touchStartX = touch.clientX.toString()
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (scrollRef.current && scrollRef.current.dataset.touchStartX) {
      const touch = e.touches[0]
      const startX = parseInt(scrollRef.current.dataset.touchStartX)
      const currentX = touch.clientX
      const diff = startX - currentX

      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0 && currentIndex < testimonials.length - 1) {
          scroll('right')
        } else if (diff < 0 && currentIndex > 0) {
          scroll('left')
        }
        scrollRef.current.dataset.touchStartX = ''
      }
    }
  }

  return (
    <div className="py-8 md:mt-20 md:px-[5rem]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-[36px] text-[#0B0907] font-bold">Testimonials</h2>
          <p className="text-[#989892] mt-1">Most popular choices for travelers from India</p>
        </div>
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={currentIndex === 0}
            className=" disabled:cursor-not-allowed"
            aria-label="Previous testimonial"
          >
            <Testimoleft />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={currentIndex === testimonials.length - 1}
            className="disabled:cursor-not-allowed"
            aria-label="Next testimonial"
          >
            <Testmoright />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory touch-pan-x p-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className=" snap-start h-[221px]  "
          >
            <div className=" p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-[300px]">
              <p className={`${plusJakartaSans.className} text-[#0B0907] text-[14px] mb-6`}>{testimonial.content}</p>
              <div className="flex items-center gap-3 justify-between">
               
                <div>
                  <h3 className="font- text-[#072130] mb-[5px]">{testimonial.author}</h3>
                  <p className="text-[12px] text-[#4A6778]">{testimonial.role}</p>
                </div>

                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-6 md:hidden">
        <button
          onClick={() => scroll('left')}
          disabled={currentIndex === 0}
          className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous testimonial"
        >
          <Testimoleft />
        </button>
        <button
          onClick={() => scroll('right')}
          disabled={currentIndex === testimonials.length - 1}
          className="  hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next testimonial"
        >
          <Testmoright />
        </button>
      </div>
    </div>
  )
}
