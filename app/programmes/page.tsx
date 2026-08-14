'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pause, Play } from 'lucide-react';

const SECONDARY_NAV_ITEMS = [
  { label: 'Our Philosophy', href: '#' },
  { label: 'Purpose', href: '#' },
  { label: 'Products', href: '#' },
  { label: 'Partners', href: '#', active: true },
  { label: 'Our Impact Goals', href: '#' },
  { label: 'Tory Burch Foundation', href: '#', desktopOnly: true },
];

export default function ProgrammesPage() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState('Partners');

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pt-20 md:pt-28">
      {/* Secondary Navigation (Non-sticky) */}
      <div className="bg-white border-b border-gray-200">
        <h2 className="block md:hidden text-center uppercase text-xs tracking-[0.15em] py-3 font-semibold text-gray-900 border-b border-gray-100">
          Our Impact
        </h2>
        <nav className="flex overflow-x-auto whitespace-nowrap no-scrollbar py-4 px-6 gap-6 md:gap-10 justify-start md:justify-center items-center">
          {SECONDARY_NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`uppercase text-xs tracking-[0.1em] font-medium transition-colors cursor-pointer ${
                  item.desktopOnly ? 'hidden md:inline-block' : 'inline-block'
                } ${
                  isActive
                    ? 'text-gray-900 border-b border-gray-900 pb-0.5 font-semibold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[350px] md:h-[60vh] md:min-h-[400px] overflow-hidden flex items-center justify-center bg-gray-100">
        <Image
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80"
          alt="Worker crafting garment in workshop"
          fill
          className="object-cover object-[center_20%] brightness-[0.8] contrast-[0.9]"
          priority
          referrerPolicy="no-referrer"
        />

        <div className="relative z-10 text-white text-center uppercase">
          <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-[0.15em] font-normal">
            Partners
          </h1>
        </div>

        {/* Pause / Play Video Controls Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute bottom-6 right-6 z-10 bg-white/80 hover:bg-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer transition-all shadow-sm"
          aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 text-gray-900 fill-gray-900" />
          ) : (
            <Play className="w-3.5 h-3.5 text-gray-900 fill-gray-900 ml-0.5" />
          )}
        </button>
      </section>

      {/* Section 1: Commitment to our Supply Chain */}
      <section className="py-16 md:py-24 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-xl md:text-2xl tracking-[0.15em] uppercase mb-6 md:mb-8 text-gray-900 font-normal">
          Commitment to our Supply Chain
        </h2>
        <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-3xl mx-auto px-2 md:px-0 font-normal">
          We invest in long-term partnerships, with many suppliers having grown alongside our brand over the past 20 years. We look for partners who share our values and commitment to fair working conditions, set and maintain best-in-class social and environmental standards, operate transparently, empower their workers and lower their impact. All suppliers are required to comply with our Vendor Code of Conduct, and we conduct independent, third-party audits with key suppliers to ensure their commitment to continuous improvement.
        </p>
      </section>

      {/* 2-Column Grid Cards Section (Increased width by 4em each, no gap between columns, reduced text padding) */}
      <section className="w-full max-w-[calc(100%+8em)] px-0 mx-auto pb-12 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full">
          
          {/* Card 1: Women in Supply Chain */}
          <div className="flex flex-col text-center w-full bg-white">
            <div className="relative aspect-[3/4] md:aspect-[4/5] w-full overflow-hidden bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80"
                alt="Women collaborating in a garment workspace"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="px-4 md:px-10 py-4 md:py-6">
              <h3 className="text-base md:text-lg tracking-[0.15em] uppercase mb-2 text-gray-900 font-normal">
                Women in the Supply Chain
              </h3>
              <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-normal max-w-xl mx-auto">
                We&apos;ve reached tens-of-thousands of workers through our partnership with RISE: Reimagining Industry to Support Equality. This industry collaboration advances gender equality in global supply chains by strengthening workers&apos; knowledge and capability and embedding gender equality in business practice.
              </p>
            </div>
          </div>

          {/* Card 2: Economic Opportunity Through Craft */}
          <div className="flex flex-col text-center w-full bg-white">
            <div className="relative aspect-[3/4] md:aspect-[4/5] w-full overflow-hidden bg-gray-100">
              <Image
                src="https://tb-foundation-wordpress-assets.storage.googleapis.com/wp-content/uploads/2025/01/10154646/RESOURCES-IMAGE.png"
                alt="Hands weaving natural fibers with artisan technique"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="px-4 md:px-10 py-4 md:py-6">
              <h3 className="text-base md:text-lg tracking-[0.15em] uppercase mb-2 text-gray-900 font-normal">
                Economic Opportunity Through Craft
              </h3>
              <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-normal max-w-xl mx-auto">
                We work with skilled weavers and craftswomen around the world who use natural fibers and traditional techniques to create economic opportunity. In 2024, we began a partnership with the nonprofit Nest and other leading brands to establish industry definitions and standards around craft that help preserve and celebrate traditional techniques while bringing greater visibility and legitimacy to global crafts and craftspeople.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Landscape Image Section & Act on Climate */}
      <section className="w-full">
        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-gray-100">
          <Image
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=80"
            alt="Large majestic tree with sprawling green branches"
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="py-16 md:py-24 px-6 max-w-4xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl tracking-[0.15em] uppercase mb-6 md:mb-8 text-gray-900 font-normal">
            Act on Climate
          </h2>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-3xl mx-auto px-2 md:px-0 font-normal">
            We measure our GHG emissions across our value chain annually — Scopes 1, 2 and 3 — from raw materials to finished product and use that data to inform our reduction strategy focused on materials, manufacturing, transportation and operations. We partner with key suppliers to measure and reduce the environmental impact of their manufacturing operations and we&apos;re driving efficiencies in how we work — from energy in operations and transportation to how we manage inventory.
          </p>
        </div>
      </section>
    </div>
  );
}
