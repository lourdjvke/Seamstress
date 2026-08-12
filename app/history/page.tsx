'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pause, Play, ChevronRight } from 'lucide-react';

const SECONDARY_NAV_ITEMS = [
  { label: 'Our Impact', href: '/resource' },
  { label: 'Our Philosophy', href: '/programmes' },
  { label: 'Purpose', href: '/programmes' },
  { label: 'Products', href: '/history', active: true },
  { label: 'Partners', href: '/programmes' },
  { label: 'Our Impact Goals', href: '/programmes' },
  { label: 'Tory Burch Foundation', href: '/programmes' },
];

const TAB_SLIDES = [
  {
    id: 'natural',
    label: 'Natural Fibers & Leather',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80',
    alt: 'Handcrafted Brown Leather Bag',
    text: "Across our products, we use a range of natural, renewable materials like leather, raffia, cotton, silk, wool, rubber and jute. We're a long-standing member of Leather Working Group, an internationally recognized organization that helps ensure manufacturing facilities meet internationally established social and environmental standards by improving chemical management, and waste and energy use. Over 95% of our leather is from Leather Working Group certified tanneries that have achieved the highest silver and gold medal rating.",
  },
  {
    id: 'recycled',
    label: 'Recycled Materials',
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1200&q=80',
    alt: 'Eco Recycled Nylon Collection',
    text: 'Our best-selling Ella Nylon collection has had a 100% recycled shell and lining since 2021. We joined leading nonprofit organization Textile Exchange in 2022 to further our work around lower-impact materials. In 2025, we launched our new Ella Nylon collection, transitioning fillers and interior components to recycled content where possible. And in 2026, we expanded recycled components in footwear, jewelry and swim and launched our Nylon Shop featuring recycled products across categories.',
  },
];

export default function HistoryPage() {
  const [activeNavTab, setActiveNavTab] = useState('Products');
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const duration = 6000; // 6 seconds per slide
  const stepTime = 50; // update progress every 50ms

  // Auto-progress timer effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (stepTime / duration) * 100;
        if (next >= 100) {
          setActiveSlideIdx((curr) => (curr + 1) % TAB_SLIDES.length);
          return 0;
        }
        return next;
      });
    }, stepTime);

    return () => clearInterval(interval);
  }, [isPaused, activeSlideIdx]);

  const handleTabClick = (index: number) => {
    setActiveSlideIdx(index);
    setProgress(0);
  };

  const handleNextSlide = () => {
    setActiveSlideIdx((prev) => (prev + 1) % TAB_SLIDES.length);
    setProgress(0);
  };

  const currentSlide = TAB_SLIDES[activeSlideIdx];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pt-20 md:pt-28">
      {/* Secondary Sub-Navigation */}
      <div className="bg-white border-b border-gray-100">
        <nav className="flex overflow-x-auto whitespace-nowrap no-scrollbar py-4 px-6 gap-6 md:gap-10 justify-start md:justify-center items-center">
          {SECONDARY_NAV_ITEMS.map((item) => {
            const isActive = activeNavTab === item.label;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setActiveNavTab(item.label)}
                className={`uppercase text-xs tracking-[0.12em] font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'text-gray-900 font-semibold border-b border-gray-900 pb-0.5'
                    : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] md:min-h-[500px] overflow-hidden flex items-center justify-center bg-gray-100">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=80"
            alt="Showroom Products Hero Background"
            fill
            className="object-cover brightness-90"
            priority
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-10 text-white text-center uppercase px-4 w-full">
          <h1 className="text-3xl md:text-5xl lg:text-6xl tracking-[0.25em] font-normal drop-shadow-md">
            PRODUCTS
          </h1>
        </div>
      </section>

      {/* By Design Section - Compact padding & tighter paragraph line height */}
      <section className="py-10 md:py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-[15px] md:text-base tracking-[0.15em] uppercase mb-4 md:mb-6 text-gray-900 font-medium">
          By Design
        </h2>
        <div className="text-[13px] md:text-[14px] text-[#333333] leading-relaxed max-w-[46rem] mx-auto space-y-4 font-normal">
          <p>
            We design timeless products with distinctive details and thoughtful construction. Quality and craftsmanship set our products apart. We focus on creating pieces that our customers love, keep and pass on — one of the most scalable ways we can lower our impact.
          </p>
          <p>
            As we evolve, we are committed to using innovative, lower-impact materials and production while preserving our high standards of quality and workmanship.
          </p>
        </div>
      </section>

      {/* Hardware Close-Up & Materials & Quality */}
      <section className="w-full max-w-[1400px] mx-auto px-4 md:px-8 mb-12 md:mb-20">
        <div className="relative w-full aspect-[16/10] md:aspect-[21/9] mb-10 md:mb-14 overflow-hidden bg-gray-100">
          <Image
            src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1600&q=80"
            alt="Silver Hardware Detail Close-up"
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-[15px] md:text-base tracking-[0.15em] uppercase mb-5 md:mb-7 text-gray-900 font-medium">
            Materials & Quality
          </h2>
          <div className="text-[13px] md:text-[14px] text-[#333333] leading-relaxed space-y-4 font-normal">
            <p>
              Building on our longstanding use of natural and renewable materials, we are introducing innovative, lower-impact alternatives — while actively working across our supply chain to trace primary raw materials.
            </p>
            <p>
              We have rigorous testing protocols and work with third-party labs to ensure materials and products meet our restricted substances, safety and quality standards. In keeping with our responsible sourcing values, we do not use fur in our products, and we require material claims to be backed by third-party certifications or test reports.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Progress Tab Slider Section */}
      <section className="w-full bg-white mb-4 md:mb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[580px]">
          
          {/* Text/Tabs Container */}
          <div className="order-2 md:order-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 xl:px-28 py-10 md:py-16">
            
            {/* Progress Tabs Navigation */}
            <div className="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar">
              {TAB_SLIDES.map((slide, idx) => {
                const isActive = activeSlideIdx === idx;
                return (
                  <button
                    key={slide.id}
                    onClick={() => handleTabClick(idx)}
                    className="relative pb-3 text-[11px] md:text-xs tracking-[0.15em] font-semibold uppercase whitespace-nowrap cursor-pointer transition-colors"
                  >
                    <span className={isActive ? 'text-gray-900' : 'text-gray-400 hover:text-gray-700'}>
                      {slide.label}
                    </span>

                    {/* Active Tab Progress Bar Line */}
                    {isActive ? (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-200">
                        <div
                          className="h-full bg-gray-900 transition-all ease-linear"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    ) : (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Tab Content */}
            <div className="text-[13px] md:text-[14px] text-[#333333] leading-relaxed text-center md:text-left transition-opacity duration-300">
              <p>{currentSlide.text}</p>
            </div>
          </div>

          {/* Image Container with Arrow & Pause Overlays */}
          <div className="order-1 md:order-2 relative w-full h-[45vh] md:h-auto min-h-[380px] bg-gray-100 overflow-hidden">
            <Image
              src={currentSlide.image}
              alt={currentSlide.alt}
              fill
              className="object-cover transition-all duration-500"
              referrerPolicy="no-referrer"
            />

            {/* Next Slide Arrow Button */}
            <button
              onClick={handleNextSlide}
              className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center cursor-pointer shadow-sm transition-all z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-gray-900" />
            </button>

            {/* Pause / Play Auto-Progress Toggle */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="absolute bottom-6 right-6 z-10 bg-white/85 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer shadow-sm transition-all"
              aria-label={isPaused ? 'Resume auto progress' : 'Pause auto progress'}
            >
              {isPaused ? (
                <Play className="w-3.5 h-3.5 text-gray-900 fill-gray-900 ml-0.5" />
              ) : (
                <Pause className="w-3.5 h-3.5 text-gray-900 fill-gray-900" />
              )}
            </button>
          </div>

        </div>
      </section>

      {/* Packaging Progress Section */}
      <section className="w-full bg-white pb-16 md:pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[580px]">
          
          {/* Image Container */}
          <div className="order-1 relative w-full h-[45vh] md:h-auto min-h-[380px] bg-gray-100 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1200&q=80"
              alt="Mossy Green Luxury Eco Packaging Boxes"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Text Container */}
          <div className="order-2 flex flex-col justify-center items-center text-center px-6 md:px-16 lg:px-24 xl:px-28 py-10 md:py-16">
            <h2 className="text-[15px] md:text-base tracking-[0.15em] uppercase mb-4 md:mb-6 text-gray-900 font-medium">
              Packaging Progress
            </h2>
            <div className="text-[13px] md:text-[14px] text-[#333333] leading-relaxed space-y-4 mb-8 font-normal">
              <p>
                Our packaging is a harmonious blend of our heritage and sustainability. The mossy green is deeply personal to Tory and has been a brand color since she founded the company. Our packaging is crafted from recycled and responsibly-sourced materials that meet rigorous environmental certification standards.
              </p>
              <p>
                We catalog every piece of protective and brand packaging, reducing anything unnecessary. Shoppers, boxes and gift folders contain a minimum of 70% recycled paper, while jewelry boxes, garment bags and canvas totes are designed for re-use; dustbags and the bags used to protect our handbags during transit are 100% recycled. For online orders in the US, we have eliminated plastic air pillows in favor of recyclable paper protection and optimized shipping box sizes to minimize waste.
              </p>
            </div>
            <Link
              href="/programmes"
              className="uppercase text-xs tracking-[0.15em] text-gray-900 border-b border-gray-900 pb-1 inline-block hover:opacity-60 transition-opacity font-medium"
            >
              Learn More
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
