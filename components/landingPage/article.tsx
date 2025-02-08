import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className={`group relative aspect-[4/3] rounded-2xl overflow-hidden ${index > 0 ? 'hidden md:block' : ''}`}
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
           
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-lg font-medium leading-snug">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
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
