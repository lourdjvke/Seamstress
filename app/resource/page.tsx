'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pause, Play } from 'lucide-react';

const SECONDARY_NAV_ITEMS = [
  { label: 'Our Impact', href: '/resource', active: true },
  { label: 'Our Philosophy', href: '/programmes' },
  { label: 'Purpose', href: '/programmes' },
  { label: 'Products', href: '/programmes' },
  { label: 'Partners', href: '/programmes' },
  { label: 'Our Impact Goals', href: '/programmes' },
  { label: 'Tory Burch Foundation', href: '/programmes' },
];

export default function ResourcePage() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState('Our Impact');

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pt-20 md:pt-28">
      {/* Secondary Navigation */}
      <div className="bg-white border-b border-gray-100">
        <nav className="flex overflow-x-auto whitespace-nowrap no-scrollbar py-4 px-6 gap-6 md:gap-10 justify-start md:justify-center items-center">
          {SECONDARY_NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`uppercase text-xs tracking-[0.12em] font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'text-gray-900 font-semibold'
                    : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[calc(65vh+2em)] min-h-[calc(400px+2em)] md:h-[calc(60vh+2em)] md:min-h-[calc(450px+2em)] overflow-hidden flex items-center justify-center bg-gray-200">
        {/* Background Image Container with gentle scale motion when playing */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Desktop Image */}
          <div className="hidden md:block absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?auto=format&fit=crop&w=2500&q=80"
              alt="Our Impact Pebbles and Beads"
              fill
              className={`object-cover brightness-90 transition-transform duration-[8000ms] ease-out ${
                isPlaying ? 'scale-105' : 'scale-100'
              }`}
              priority
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Mobile Image */}
          <div className="block md:hidden absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1497250681554-fc1c56e29ee4?auto=format&fit=crop&w=1200&q=80"
              alt="Our Impact Nature Background"
              fill
              className={`object-cover brightness-90 transition-transform duration-[8000ms] ease-out ${
                isPlaying ? 'scale-105' : 'scale-100'
              }`}
              priority
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Hero Title */}
        <div className="relative z-10 text-white text-center uppercase px-4 mt-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-[0.2em] font-normal">
            Our Impact
          </h1>
        </div>

        {/* Working Pause / Play Toggle Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute bottom-6 right-6 z-10 bg-white/90 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center cursor-pointer transition-all shadow-md"
          aria-label={isPlaying ? 'Pause background image' : 'Play background image'}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 text-gray-900 fill-gray-900" />
          ) : (
            <Play className="w-3.5 h-3.5 text-gray-900 fill-gray-900 ml-0.5" />
          )}
        </button>
      </section>

      {/* Philosophy Statement Section */}
      <section className="py-16 md:py-24 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-lg md:text-xl tracking-[0.15em] uppercase mb-6 text-gray-900 font-medium">
          Philosophy
        </h2>
        <div className="text-[13px] md:text-sm text-gray-800 leading-relaxed max-w-2xl mx-auto space-y-6 font-normal">
          <p>
            As a global luxury lifestyle brand, our collections are designed to inspire women and the next generation. These values extend from our collections to the way we conduct business to the work of the Tory Burch Foundation.
          </p>
          <p>
            Tory launched the Foundation in 2009 to increase women&apos;s economic power through entrepreneurship — and with an early conviction that this hybrid model of a purpose-led company represented the future of business. Since then, a portion of every purchase has benefited the Foundation.
          </p>
        </div>
        <div className="mt-8 md:mt-10">
          <Link
            href="/programmes"
            className="uppercase text-xs tracking-[0.15em] text-gray-900 border-b border-gray-900 pb-1 inline-block hover:opacity-60 transition-opacity font-medium"
          >
            Read Our Impact Report
          </Link>
        </div>
      </section>

      {/* 3 Column Flush Grid (Purpose, Products, Partners) */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          
          {/* Column 1: Purpose */}
          <div className="flex flex-col w-full bg-white">
            <div className="w-full aspect-square relative bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&w=1000&q=80"
                alt="Women walking outdoors"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 flex flex-col items-center text-center px-6 md:px-10 py-12 md:py-16">
              <h3 className="text-base md:text-lg tracking-[0.15em] uppercase mb-4 text-gray-900 font-medium">
                Purpose
              </h3>
              <p className="text-[13px] md:text-sm text-gray-800 leading-relaxed mb-6 font-normal">
                We give voice to our values through the work of the Tory Burch Foundation, investment in our employees and support of values-aligned nonprofits
              </p>
              <Link
                href="/programmes"
                className="uppercase text-xs tracking-[0.15em] text-gray-900 border-b border-gray-900 pb-1 mt-auto inline-block hover:opacity-60 transition-opacity font-medium"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Column 2: Products */}
          <div className="flex flex-col w-full bg-white">
            <div className="w-full aspect-square relative bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1000&q=80"
                alt="Crafted Leather Tote Bag"
                fill
                className="object-cover object-bottom"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 flex flex-col items-center text-center px-6 md:px-10 py-12 md:py-16">
              <h3 className="text-base md:text-lg tracking-[0.15em] uppercase mb-4 text-gray-900 font-medium">
                Products
              </h3>
              <p className="text-[13px] md:text-sm text-gray-800 leading-relaxed mb-6 font-normal">
                Discover the materials and processes we use to drive innovation and impact while maintaining the highest level of design, quality, craftsmanship
              </p>
              <Link
                href="/clothing"
                className="uppercase text-xs tracking-[0.15em] text-gray-900 border-b border-gray-900 pb-1 mt-auto inline-block hover:opacity-60 transition-opacity font-medium"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Column 3: Partners */}
          <div className="flex flex-col w-full bg-white">
            <div className="w-full aspect-square relative bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1000&q=80"
                alt="Women collaborating in creative workplace"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 flex flex-col items-center text-center px-6 md:px-10 py-12 md:py-16">
              <h3 className="text-base md:text-lg tracking-[0.15em] uppercase mb-4 text-gray-900 font-medium">
                Partners
              </h3>
              <p className="text-[13px] md:text-sm text-gray-800 leading-relaxed mb-6 font-normal">
                We work with suppliers who set and maintain best-in-class social and environmental standards, operate transparently, empower their workers and lower their impact
              </p>
              <Link
                href="/programmes"
                className="uppercase text-xs tracking-[0.15em] text-gray-900 border-b border-gray-900 pb-1 mt-auto inline-block hover:opacity-60 transition-opacity font-medium"
              >
                Learn More
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 2 Column Flush Grid (Impact 2030 Goals, Tory Burch Foundation) */}
      <section className="w-full bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          
          {/* Column 1: Impact 2030 Goals */}
          <div className="flex flex-col w-full bg-white">
            <div className="w-full aspect-[4/3] md:aspect-[3/2] relative bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1498623116890-37e912163d5d?auto=format&fit=crop&w=1400&q=80"
                alt="Ocean view from cliffs"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 flex flex-col items-center text-center px-6 md:px-16 py-12 md:py-16">
              <h3 className="text-base md:text-lg tracking-[0.15em] uppercase mb-4 text-gray-900 font-medium">
                Impact 2030 Goals
              </h3>
              <p className="text-[13px] md:text-sm text-gray-800 leading-relaxed mb-6 font-normal">
                Explore the milestones that we are committed to meet in relation to our purpose, products and partners
              </p>
              <Link
                href="/programmes"
                className="uppercase text-xs tracking-[0.15em] text-gray-900 border-b border-gray-900 pb-1 mt-auto inline-block hover:opacity-60 transition-opacity font-medium"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Column 2: Tory Burch Foundation */}
          <div className="flex flex-col w-full bg-white">
            <div className="w-full aspect-[4/3] md:aspect-[3/2] relative bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=1400&q=80"
                alt="Women speaking on a panel"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 flex flex-col items-center text-center px-6 md:px-16 py-12 md:py-16">
              <h3 className="text-base md:text-lg tracking-[0.15em] uppercase mb-4 text-gray-900 font-medium">
                Tory Burch Foundation
              </h3>
              <p className="text-[13px] md:text-sm text-gray-800 leading-relaxed mb-6 font-normal">
                Increases women&apos;s economic power by supporting entrepreneurs to build businesses that last
              </p>
              <Link
                href="/programmes"
                className="uppercase text-xs tracking-[0.15em] text-gray-900 border-b border-gray-900 pb-1 mt-auto inline-block hover:opacity-60 transition-opacity font-medium"
              >
                Learn More
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
