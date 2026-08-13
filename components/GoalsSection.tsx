'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const TABS = ['Purpose', 'Products', 'Partners'];
const TAB_DATA = [
  {
    stats: [
      { value: '$1B', text: 'contributed to the economy from the Tory Burch Foundation\'s community of extraordinary women entrepreneurs' },
      { value: 'OVER $25M', text: 'company donations to values-aligned nonprofit organizations, including the Tory Burch Foundation' },
      { value: '75%', text: 'growth in number of Tory Burch employees participating in skills-based volunteering with the Tory Burch Foundation' },
    ],
    image: 'https://picsum.photos/seed/podium/600/800'
  },
  {
    stats: [
      { value: '100%', text: 'of our packaging is now sustainably sourced or recyclable' },
      { value: '50%', text: 'reduction in our greenhouse gas emissions across all global operations' },
      { value: 'OVER 2M', text: 'products made using circular and zero-waste design principles' },
    ],
    image: 'https://picsum.photos/seed/products_podium/600/800'
  },
  {
    stats: [
      { value: '10,000+', text: 'artisan partners supported globally through our supply chain initiatives' },
      { value: '100%', text: 'of direct suppliers audited for fair wage and safety compliance' },
      { value: '500+', text: 'community grants distributed to empower local women in manufacturing regions' },
    ],
    image: 'https://picsum.photos/seed/partners_podium/600/800'
  }
];

const DURATION_PER_TAB = 5000;

export default function GoalsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      
      if (!isPausedRef.current) {
        const elapsed = timestamp - startTimeRef.current;
        const totalDuration = TABS.length * DURATION_PER_TAB;
        
        // Loop progress
        const currentProgress = (elapsed % totalDuration) / totalDuration * 100;
        setProgress(currentProgress);
        
        const currentTab = Math.floor((currentProgress / 100) * TABS.length);
        if (currentTab !== activeTab) {
          setActiveTab(currentTab);
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [activeTab]);

  const handleTabClick = (index: number) => {
    const totalDuration = TABS.length * DURATION_PER_TAB;
    const targetElapsed = (index / TABS.length) * totalDuration;
    startTimeRef.current = performance.now() - targetElapsed;
    setActiveTab(index);
    // Setting progress immediately to avoid visual jump delay
    setProgress((index / TABS.length) * 100);
  };

  return (
    <section className="w-full bg-white border-t border-gray-100 flex flex-col lg:flex-row overflow-hidden min-h-[600px]">
      {/* Left Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-24 py-16">
        <h2 className="text-xl tracking-[0.2em] font-semibold uppercase mb-12 text-center">
          Impact 2030 Goals
        </h2>
        
        <div className="relative w-full max-w-md mx-auto flex justify-between mb-12 text-[11px] font-semibold tracking-widest uppercase text-gray-400">
           {TABS.map((tab, idx) => (
             <button 
               key={tab} 
               onClick={() => handleTabClick(idx)}
               className={`flex-1 pb-4 text-center transition-colors cursor-pointer ${activeTab === idx ? 'text-black' : 'hover:text-black'}`}
             >
               {tab}
             </button>
           ))}
           {/* Gray background bar */}
           <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gray-200" />
           {/* Dark progress bar */}
           <div 
             className="absolute bottom-0 left-0 h-[4px] bg-black ease-linear" 
             style={{ width: `${progress}%` }} 
           />
        </div>

        <div className="space-y-12 text-center max-w-md mx-auto min-h-[300px]">
          {TAB_DATA[activeTab].stats.map((stat, idx) => (
            <div key={idx} className="animate-in fade-in duration-500">
              <div className="text-2xl font-bold mb-3">{stat.value}</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {stat.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Content */}
      <div 
        className="w-full lg:w-1/2 relative bg-[#fef8f0] flex items-center justify-center min-h-[400px] lg:min-h-full overflow-hidden p-8"
        onMouseEnter={() => { isPausedRef.current = true; }}
        onMouseLeave={() => {
          // Adjust start time so it doesn't jump forward when unpausing
          const totalDuration = TABS.length * DURATION_PER_TAB;
          const currentElapsed = (progress / 100) * totalDuration;
          startTimeRef.current = performance.now() - currentElapsed;
          isPausedRef.current = false;
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <span className="text-[150px] font-serif tracking-tighter text-black whitespace-nowrap -ml-40">
            TORY BURCH FOUNDA
          </span>
        </div>
        
        <div className="relative z-10 w-full max-w-md aspect-[3/4]">
          <Image 
            key={activeTab} // Forces re-render/animation on tab change
            src={TAB_DATA[activeTab].image} 
            alt="Podium" 
            fill 
            className="object-cover animate-in fade-in duration-700"
            referrerPolicy="no-referrer"
          />
          {/* Carousel Arrows (functional now for cycling) */}
          <button 
            onClick={() => handleTabClick((activeTab - 1 + TABS.length) % TABS.length)}
            className="absolute left-[-40px] top-1/2 -translate-y-1/2 p-2 hidden md:block hover:opacity-50 cursor-pointer"
          >
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 1L2 10L11 19" stroke="black" strokeWidth="2"/>
            </svg>
          </button>
          <button 
            onClick={() => handleTabClick((activeTab + 1) % TABS.length)}
            className="absolute right-[-40px] top-1/2 -translate-y-1/2 p-2 hidden md:block hover:opacity-50 cursor-pointer"
          >
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L10 10L1 19" stroke="black" strokeWidth="2"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
