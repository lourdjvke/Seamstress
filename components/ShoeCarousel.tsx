'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function ShoeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const totalDots = 3;

  const shoes = [
    { name: 'Miller Beaded Espadrille', src: 'https://picsum.photos/seed/shoe1/400/500' },
    { name: 'Mini Miller Jelly Sandal', src: 'https://picsum.photos/seed/shoe2/400/500' },
    { name: 'Miller Jelly Sandal', src: 'https://picsum.photos/seed/shoe3/400/500' },
    { name: 'Miller Jelly Sandal', src: 'https://picsum.photos/seed/shoe4/400/500' },
    { name: 'Miller Jelly Sandal', src: 'https://picsum.photos/seed/shoe5/400/500' },
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll <= 0) return;
      
      const scrollProgress = scrollLeft / maxScroll;
      const dotIndex = Math.min(
        Math.max(Math.round(scrollProgress * (totalDots - 1)), 0),
        totalDots - 1
      );
      setActiveIndex(dotIndex);
    }
  };

  const scrollToDot = (index: number) => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const targetScroll = (index / (totalDots - 1)) * maxScroll;
      scrollRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-12 bg-white overflow-hidden border-t border-gray-100">
      <div className="text-center mb-8 px-4">
        <p className="text-sm text-gray-700 mb-4">The ultimate destination for warm-weather shoes</p>
        <div className="flex justify-center gap-8 text-[11px] font-semibold tracking-widest uppercase">
          <Link href="#" className="border-b border-black pb-1">Shop Sandals</Link>
          <Link href="#" className="border-b border-gray-300 pb-1 hover:border-transparent transition-colors text-gray-500">Shop New Arrivals</Link>
        </div>
      </div>

      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full overflow-x-auto snap-x snap-mandatory gap-[2px] px-0 no-scrollbar"
      >
        {shoes.map((shoe, idx) => (
          <div key={idx} className="flex-none w-[70vw] sm:w-[40vw] md:w-[30vw] lg:w-[20vw] snap-center px-0">
            <div className="relative aspect-[4/5] bg-[#f7f7f7] mb-2 group overflow-hidden cursor-pointer">
              <Image 
                src={shoe.src} 
                alt={shoe.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
              <button className="absolute top-3 right-3 text-gray-500 hover:text-black opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center py-1 px-1">
              <p className="text-xs text-gray-700 font-medium truncate">{shoe.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalDots }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToDot(idx)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === idx ? 'w-4 bg-black' : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
