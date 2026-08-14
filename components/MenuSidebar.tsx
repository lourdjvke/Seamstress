'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, ChevronRight, ChevronLeft, Globe } from 'lucide-react';

interface MenuSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Menu structure definition
type SubmenuData = {
  title: string;
  viewAllHref?: string;
  categories: { label: string; href: string }[];
  collections?: { label: string; href: string }[];
};

const SUBMENU_DATA: Record<string, SubmenuData> = {
  'new': {
    title: 'New Arrivals',
    viewAllHref: '/clothing',
    categories: [
      { label: 'New This Week', href: '/clothing' },
      { label: 'New Handbags', href: '/clothing' },
      { label: 'New Shoes', href: '/clothing' },
      { label: 'New Ready-To-Wear', href: '/clothing' },
      { label: 'New Jewelry', href: '/clothing' },
    ],
    collections: [
      { label: 'Spring Runway Collection', href: '/clothing' },
      { label: 'T Monogram Denim', href: '/clothing' },
      { label: 'The Pierced Shoe', href: '/clothing' },
    ],
  },
  'handbags': {
    title: 'Handbags',
    viewAllHref: '/clothing',
    categories: [
      { label: 'Totes', href: '/clothing' },
      { label: 'Crossbody Bags', href: '/clothing' },
      { label: 'Shoulder Bags', href: '/clothing' },
      { label: 'Bucket Bags', href: '/clothing' },
      { label: 'Mini Bags & Chain Wallets', href: '/clothing' },
      { label: 'Satchels', href: '/clothing' },
      { label: 'Nylon Bags & Backpacks', href: '/clothing' },
    ],
    collections: [
      { label: 'Romy', href: '/product' },
      { label: 'Charlie', href: '/product' },
      { label: 'T Monogram', href: '/product' },
      { label: 'Kira', href: '/product' },
      { label: 'Lee Radziwill', href: '/product' },
      { label: 'Ella', href: '/product' },
      { label: 'Fleming', href: '/product' },
      { label: 'Eleanor', href: '/product' },
      { label: 'Perry', href: '/product' },
    ],
  },
  'shoes': {
    title: 'Shoes',
    viewAllHref: '/clothing',
    categories: [
      { label: 'Sandals', href: '/clothing' },
      { label: 'Ballets & Flats', href: '/clothing' },
      { label: 'Espadrilles', href: '/clothing' },
      { label: 'Flip-Flops & Slides', href: '/clothing' },
      { label: 'Mules & Loafers', href: '/clothing' },
      { label: 'Sneakers', href: '/clothing' },
      { label: 'Pumps & Heels', href: '/clothing' },
      { label: 'Boots', href: '/clothing' },
    ],
    collections: [
      { label: 'Romy', href: '/product' },
      { label: 'Miller', href: '/product' },
      { label: 'Reva', href: '/product' },
      { label: 'Pierced Collection', href: '/product' },
    ],
  },
  'jewelry': {
    title: 'Jewelry & Watches',
    viewAllHref: '/clothing',
    categories: [
      { label: 'Earrings', href: '/clothing' },
      { label: 'Necklaces', href: '/clothing' },
      { label: 'Bracelets', href: '/clothing' },
      { label: 'Rings', href: '/clothing' },
      { label: 'Watches', href: '/clothing' },
    ],
    collections: [
      { label: 'Kira Jewelry', href: '/product' },
      { label: 'Roxanne', href: '/product' },
      { label: 'Miller Jewelry', href: '/product' },
    ],
  },
  'ready-to-wear': {
    title: 'Ready-To-Wear',
    viewAllHref: '/clothing',
    categories: [
      { label: 'Dresses', href: '/clothing' },
      { label: 'Tops & Shirts', href: '/clothing' },
      { label: 'Sweaters & Cardigans', href: '/clothing' },
      { label: 'Jackets & Coats', href: '/clothing' },
      { label: 'Pants & Denim', href: '/clothing' },
      { label: 'Skirts', href: '/clothing' },
    ],
  },
  'swim': {
    title: 'Swim',
    viewAllHref: '/clothing',
    categories: [
      { label: 'One-Piece Swimsuits', href: '/clothing' },
      { label: 'Bikinis', href: '/clothing' },
      { label: 'Cover-Ups & Tunics', href: '/clothing' },
      { label: 'Beach Accessories', href: '/clothing' },
    ],
  },
  'wallets': {
    title: 'Wallets & Accessories',
    viewAllHref: '/clothing',
    categories: [
      { label: 'Card Cases', href: '/clothing' },
      { label: 'Continental Wallets', href: '/clothing' },
      { label: 'Pouches', href: '/clothing' },
      { label: 'Belts', href: '/clothing' },
      { label: 'Sunglasses', href: '/clothing' },
      { label: 'Hats & Scarves', href: '/clothing' },
    ],
  },
  'tory-sport': {
    title: 'Tory Sport',
    viewAllHref: '/clothing',
    categories: [
      { label: 'Tennis Apparel', href: '/clothing' },
      { label: 'Golf Apparel', href: '/clothing' },
      { label: 'Activewear & Leggings', href: '/clothing' },
      { label: 'Tracksuits & Outerwear', href: '/clothing' },
    ],
  },
  'about-us': {
    title: 'About Us',
    viewAllHref: '/resource',
    categories: [
      { label: 'Our Story & Brand Philosophy', href: '/resource' },
      { label: 'Fit & Development', href: '/resource' },
      { label: 'Business & Leadership', href: '/resource' },
    ],
  },
  'our-impact': {
    title: 'Our Impact',
    viewAllHref: '/resource',
    categories: [
      { label: 'Overview & Philosophy', href: '/resource' },
      { label: 'Supply Chain & Partners', href: '/programmes' },
      { label: 'Materials & Sustainability', href: '/history' },
      { label: 'Tory Burch Foundation', href: '/programmes' },
    ],
  },
};

const MAIN_NAV_ITEMS = [
  { id: 'new', label: 'New' },
  { id: 'handbags', label: 'Handbags' },
  { id: 'shoes', label: 'Shoes' },
  { id: 'jewelry', label: 'Jewelry & Watches' },
  { id: 'ready-to-wear', label: 'Ready-To-Wear' },
  { id: 'swim', label: 'Swim' },
  { id: 'wallets', label: 'Wallets & Accessories' },
  { id: 'tory-sport', label: 'Tory Sport' },
  { id: 'about-us', label: 'About Us' },
  { id: 'our-impact', label: 'Our Impact' },
];

export default function MenuSidebar({ isOpen, onClose }: MenuSidebarProps) {
  const [activeSubmenuId, setActiveSubmenuId] = useState<string | null>(null);

  // Prevent main page scroll when menu sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCloseAll = () => {
    setActiveSubmenuId(null);
    onClose();
  };

  const handleSubmenuToggle = (id: string) => {
    if (activeSubmenuId === id) {
      setActiveSubmenuId(null);
    } else {
      setActiveSubmenuId(id);
    }
  };

  const handleBackToMain = () => {
    setActiveSubmenuId(null);
  };

  const activeSubmenuData = activeSubmenuId ? SUBMENU_DATA[activeSubmenuId] : null;

  return (
    <>
      {/* Dark Backdrop Overlay */}
      <div
        onClick={handleCloseAll}
        className={`fixed inset-0 bg-black/30 z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Main Sidebar (Desktop width increased by 60px to 500px) */}
      <div
        className={`fixed top-0 left-0 h-full w-full md:w-[500px] bg-white flex flex-col z-[70] border-r border-gray-200 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Main Header with Close Button */}
        <div className="h-[60px] flex items-center justify-end px-6 md:pl-12 md:pr-6 border-b border-transparent shrink-0">
          <button
            onClick={handleCloseAll}
            className="p-2 -mr-2 text-gray-500 hover:text-black cursor-pointer transition-colors"
            aria-label="Close Menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Navigation List */}
        <div className="flex-1 overflow-y-auto px-6 md:pl-12 md:pr-6 py-4">
          <ul className="space-y-3 md:space-y-4 text-[19px] font-bold tracking-widest uppercase mb-10">
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = activeSubmenuId === item.id;
              const hasSubmenuActive = activeSubmenuId !== null;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleSubmenuToggle(item.id)}
                    title={hasSubmenuActive && !isActive ? item.label : undefined}
                    className={`w-full py-2.5 flex items-center justify-between group transition-colors cursor-pointer text-left ${
                      hasSubmenuActive
                        ? isActive
                          ? 'text-black'
                          : 'text-gray-400'
                        : 'text-black hover:text-gray-600'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className={`w-4 h-4 transition-colors ${
                      hasSubmenuActive
                        ? isActive
                          ? 'text-black'
                          : 'text-gray-400'
                        : 'text-gray-400 group-hover:text-black'
                    }`} />
                  </button>
                </li>
              );
            })}
          </ul>

          <hr className="border-gray-200 mb-8" />

          {/* Secondary Footer Links */}
          <ul className="space-y-5 text-[17px] text-gray-800 font-medium">
            <li>
              <button className="flex items-center gap-2 hover:text-black py-2 cursor-pointer transition-colors">
                <Globe className="w-4 h-4" />
                <span>GB</span>
              </button>
            </li>
            <li>
              <Link href="/resource" onClick={handleCloseAll} className="hover:text-black block py-2 transition-colors">
                Sign In / Create An Account
              </Link>
            </li>
            <li>
              <Link href="/clothing" onClick={handleCloseAll} className="hover:text-black block py-2 transition-colors">
                My Favorites
              </Link>
            </li>
            <li>
              <Link href="/resource" onClick={handleCloseAll} className="hover:text-black block py-2 transition-colors">
                Find A Store
              </Link>
            </li>
            <li>
              <Link href="/resource" onClick={handleCloseAll} className="hover:text-black pb-8 block py-2 transition-colors">
                Gift Cards
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Submenu Panel Container
          On Desktop (md:):
            Placed adjacent at md:left-[500px] w-[500px] z-[65], slides out from behind the main sidebar
      */}
      <div
        className={`fixed top-0 h-full bg-white flex flex-col transition-transform duration-300 ease-in-out
          left-0 w-full z-[80] 
          md:left-[500px] md:w-[500px] md:z-[65] md:border-l md:border-gray-200
          ${
            activeSubmenuId && isOpen
              ? 'translate-x-0 pointer-events-auto visible'
              : '-translate-x-full pointer-events-none invisible md:pointer-events-none'
          }
        `}
      >
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="md:hidden h-[60px] flex items-center justify-between px-6 border-b border-gray-200 shrink-0">
          <button
            onClick={handleBackToMain}
            className="p-2 -ml-2 text-gray-500 hover:text-black cursor-pointer"
            aria-label="Back to main menu"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-[13px] font-bold tracking-widest uppercase text-black">
            {activeSubmenuData?.title || ''}
          </span>
          <button
            onClick={handleCloseAll}
            className="p-2 -mr-2 text-gray-500 hover:text-black cursor-pointer"
            aria-label="Close all menus"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Submenu Scrollable Content */}
        {activeSubmenuData && (
          <div className="flex-1 overflow-y-auto px-6 md:pl-12 md:pr-6 py-4 pt-6 md:pt-6">
            {activeSubmenuData.viewAllHref && (
              <>
                <Link
                  href={activeSubmenuData.viewAllHref}
                  onClick={handleCloseAll}
                  className="block text-[15px] font-normal text-black mb-6 hover:text-gray-600"
                >
                  View All
                </Link>
                <hr className="border-gray-200 mb-6 border-dashed" />
              </>
            )}

            {/* Categories */}
            <ul className="space-y-5 text-[15px] font-normal text-gray-800 mb-10">
              {activeSubmenuData.categories.map((cat, idx) => (
                <li key={idx}>
                  <Link
                    href={cat.href}
                    onClick={handleCloseAll}
                    className="hover:text-black transition-colors block py-0.5"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Collections Section */}
            {activeSubmenuData.collections && activeSubmenuData.collections.length > 0 && (
              <>
                <hr className="border-gray-200 mb-8" />
                <h3 className="text-[11px] font-bold text-gray-500 tracking-widest uppercase mb-6">
                  Collections
                </h3>
                <ul className="space-y-5 text-[15px] font-normal text-gray-800 pb-8">
                  {activeSubmenuData.collections.map((col, idx) => (
                    <li key={idx}>
                      <Link
                        href={col.href}
                        onClick={handleCloseAll}
                        className="hover:text-black transition-colors block py-0.5"
                      >
                        {col.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
