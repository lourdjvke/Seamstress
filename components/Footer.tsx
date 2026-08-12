'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Plus, Minus, Globe } from 'lucide-react';

const FOOTER_SECTIONS = [
  {
    title: 'Help',
    links: [
      { label: 'Client Services', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'Returns & Exchanges', href: '#' },
      { label: 'Track Your Order', href: '#' },
      { label: 'Shipping & Delivery', href: '#' },
      { label: 'Counterfeit FAQs', href: '#' },
    ],
  },
  {
    title: 'About Tory Burch',
    links: [
      { label: 'Our Impact', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Tory Burch Foundation', href: '#' },
      { label: 'Tory Daily', href: '#' },
    ],
  },
  {
    title: 'Follow Us',
    links: [
      { label: 'Instagram', href: '#' },
      { label: 'Facebook', href: '#' },
      { label: 'Twitter', href: '#' },
      { label: 'Pinterest', href: '#' },
      { label: 'Tumblr', href: '#' },
      { label: 'YouTube', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
  },
];

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    setOpenSection(openSection === title ? null : title);
  };

  return (
    <footer className="w-full text-sm font-sans bg-white text-gray-900">
      {/* Take 10% Off First Order Promo Section */}
      <section className="w-full py-14 md:py-20 px-6 bg-[#f7f7f7] text-center border-b border-gray-200">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg md:text-2xl font-semibold tracking-widest uppercase mb-3 text-gray-900">
            Take 10% Off Your First Order of £200+
          </h2>
          <p className="text-xs md:text-sm text-gray-600 mb-6 md:mb-8 leading-relaxed font-normal">
            Your first Tory Burch purchase of £200 or more, online or in boutiques, when you sign up for emails. Exclusions apply.
          </p>
          <button className="px-12 md:px-16 py-3.5 md:py-4 bg-[#1a1a1a] text-white text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-black transition-colors cursor-pointer">
            Sign Up
          </button>
        </div>
      </section>

      {/* Mobile Accordion Navigation (Search removed as requested) */}
      <div className="md:hidden px-5 pt-4 pb-4">
        {/* Accordion Menu */}
        <div className="border-t border-gray-200">
          {FOOTER_SECTIONS.map((section) => {
            const isOpen = openSection === section.title;
            return (
              <div key={section.title} className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex justify-between items-center py-4 text-left font-normal text-[15px] text-gray-900 cursor-pointer"
                >
                  <span>{section.title}</span>
                  {isOpen ? (
                    <Minus className="w-4 h-4 text-gray-700" />
                  ) : (
                    <Plus className="w-4 h-4 text-gray-700" />
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-80 pb-4 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <ul className="space-y-3 text-sm text-gray-600 pl-1">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="hover:underline">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Region / Language Selector */}
        <div className="py-5 flex items-center gap-2.5 text-sm font-normal text-gray-900 border-b border-gray-200">
          <Globe className="w-4 h-4 text-gray-800" />
          <span>US / EN</span>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:grid max-w-7xl mx-auto px-6 py-16 grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold tracking-wider text-xs mb-4 uppercase">Help</h3>
          <ul className="space-y-3 text-gray-600">
            <li><Link href="#" className="hover:underline">Client Services</Link></li>
            <li><Link href="#" className="hover:underline">Contact Us</Link></li>
            <li><Link href="#" className="hover:underline">Returns & Exchanges</Link></li>
            <li><Link href="#" className="hover:underline">Track Your Order</Link></li>
            <li><Link href="#" className="hover:underline">Shipping & Delivery</Link></li>
            <li><Link href="#" className="hover:underline">Counterfeit FAQs</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold tracking-wider text-xs mb-4 uppercase">Shop</h3>
          <ul className="space-y-3 text-gray-600">
            <li><Link href="#" className="hover:underline">Ship To: United Kingdom £</Link></li>
            <li><Link href="#" className="hover:underline">Find a Store</Link></li>
            <li><Link href="#" className="hover:underline">Gift Services</Link></li>
            <li><Link href="#" className="hover:underline">Gift Cards</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold tracking-wider text-xs mb-4 uppercase">About Tory Burch</h3>
          <ul className="space-y-3 text-gray-600">
            <li><Link href="#" className="hover:underline">Our Impact</Link></li>
            <li><Link href="#" className="hover:underline">Careers</Link></li>
            <li><Link href="#" className="hover:underline">Tory Burch Foundation</Link></li>
            <li><Link href="#" className="hover:underline">Tory Daily</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold tracking-wider text-xs mb-4 uppercase">Follow Us</h3>
          <ul className="space-y-3 text-gray-600">
            <li><Link href="#" className="hover:underline">Instagram</Link></li>
            <li><Link href="#" className="hover:underline">Facebook</Link></li>
            <li><Link href="#" className="hover:underline">Twitter</Link></li>
            <li><Link href="#" className="hover:underline">Pinterest</Link></li>
            <li><Link href="#" className="hover:underline">Tumblr</Link></li>
            <li><Link href="#" className="hover:underline">YouTube</Link></li>
            <li><Link href="#" className="hover:underline">LinkedIn</Link></li>
          </ul>
        </div>
      </div>

      {/* Green Foundation Banner */}
      <div
        style={{
          backgroundColor: '#91a24d',
          paddingTop: 'calc(3.5rem + 1.4em)',
          paddingBottom: 'calc(3.5rem + 1.4em)',
        }}
        className="text-white flex flex-col items-center justify-center text-center px-6"
      >
        {/* Circular Flower Emblem */}
        <div className="w-16 h-16 mb-5 relative flex items-center justify-center">
          <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <circle cx="50" cy="50" r="44" strokeWidth="2" />
            <circle cx="50" cy="50" r="16" strokeWidth="2" fill="white" fillOpacity="0.1" />
            <circle cx="50" cy="50" r="10" strokeWidth="2" />
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 22.5 * Math.PI) / 180;
              const x1 = 50 + 16 * Math.cos(angle);
              const y1 = 50 + 16 * Math.sin(angle);
              const x2 = 50 + 42 * Math.cos(angle);
              const y2 = 50 + 42 * Math.sin(angle);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
        </div>

        <h2 className="text-base md:text-lg tracking-[0.2em] font-medium uppercase mb-4">
          Tory Burch Foundation
        </h2>
        <p className="max-w-lg text-sm md:text-base leading-relaxed text-white/95 font-normal px-2">
          The Tory Burch Foundation increases women&apos;s economic power by supporting entrepreneurs to build businesses that last
        </p>
      </div>

      {/* Footer Legal & Copyright */}
      {/* Mobile Layout */}
      <div className="md:hidden max-w-7xl mx-auto px-6 py-8 flex flex-col items-center text-center text-[12px] text-gray-500 leading-relaxed gap-2 border-t border-gray-100">
        <div>
          <Link href="#" className="hover:underline">Privacy Policy</Link>
        </div>
        <div>
          <Link href="#" className="hover:underline">Do Not Sell or Share My Personal Information</Link>
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          <Link href="#" className="hover:underline">Supply Chain Disclosure</Link>
          <Link href="#" className="hover:underline">Terms of Use</Link>
          <Link href="#" className="hover:underline">Site Map</Link>
        </div>
        <div className="mt-2 text-gray-400">
          © 2004 - 2026 River Light V, L.P.
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex max-w-7xl mx-auto px-6 py-8 justify-between items-center text-[12px] text-gray-500 border-t border-gray-100">
        <div className="text-gray-500 font-normal">
          © 2004 - 2026 River Light V, L.P.
        </div>
        <div className="flex flex-wrap items-center gap-6 text-gray-500 font-normal">
          <Link href="#" className="hover:underline">Privacy Policy</Link>
          <Link href="#" className="hover:underline">UK Modern Slavery Act Statement</Link>
          <Link href="#" className="hover:underline">Terms of Use</Link>
          <Link href="#" className="hover:underline">Cookies Settings</Link>
          <Link href="#" className="hover:underline">Company Imprint</Link>
          <Link href="#" className="hover:underline">Site Map</Link>
        </div>
      </div>
    </footer>
  );
}
