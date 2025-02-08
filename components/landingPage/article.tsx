"use client"
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useRef, useState } from 'react'
import Article1 from "@/public/assets/article/Rectangle 4407.png"
import Article2 from "@/public/assets/article/image2.png"
import Article3 from "@/public/assets/article/image3.png"

const articles = [
  {
    id: 1,
    title: 'The ultimate guide to buying your first home',
    image: Article1,
    slug: 'buying-first-home'
  },
  {
    id: 2,
    title: 'Experience Goa Like Never Before Unique Adventures Await',
    image: Article2,
    slug: 'goa-adventures'
  },
  {
    id: 3,
    title: 'The ultimate guide to buying your first home',
    image: Article3,
    slug: 'home-buying-guide'
  }
]

export default function LatestArticles() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

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
        if (diff > 0 && currentIndex < articles.length - 1) {
          setCurrentIndex(prev => Math.min(prev + 1, articles.length - 1))
        } else if (diff < 0 && currentIndex > 0) {
          setCurrentIndex(prev => Math.max(prev - 1, 0))
        }
        scrollRef.current.dataset.touchStartX = ''
      }
    }
  }

  return (
    <section className="px-4 md:py-12 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Latest Articles</h2>
            <p className="text-gray-600">Find popular content for travelers worldwide</p>
          </div>
          <Link 
            href="/blog" 
            className="hidden md:flex items-center gap-2 text-sm transition-opacity hover:opacity-80 px-[20px] py-[12px] border border-gray-300 rounded-[60px]"
          >
            <span>Read all blog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4">
                <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-lg font-medium leading-snug">
                  {article.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div 
          ref={scrollRef}
          className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory touch-pan-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group relative aspect-[4/3] min-w-[calc(100%-2rem)] snap-start rounded-2xl overflow-hidden"
            >
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4">
                <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-lg font-medium leading-snug">
                  {article.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <button className="md:hidden mt-5 px-[20px] py-[12px] text-sm font-medium text-gray-700 border border-gray-300 rounded-[60px] text-center m-auto flex items-center gap-2">
        <span>Read all blog</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </section>
  )
}
