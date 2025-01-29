'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'

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

  return (
    <div className="py-8 md:mt-20">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Testimonials</h2>
          <p className="text-gray-600 mt-1">Most popular choices for travelers from India</p>
        </div>
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={currentIndex === 0}
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={currentIndex === testimonials.length - 1}
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next testimonial"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="min-w-[calc(100%-2rem)] md:min-w-[calc(50%-1rem)] lg:min-w-[calc(33.333%-1rem)] snap-start"
          >
            <div className="bg-white p-6 rounded-xl">
              <p className="text-gray-700 mb-6">{testimonial.content}</p>
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.author}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
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
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll('right')}
          disabled={currentIndex === testimonials.length - 1}
          className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next testimonial"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

