'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

interface SubmenuData {
  id: string;
  title: string;
  items: { label: string; href: string }[];
}

interface NavItem {
  id: string;
  label: string;
  hasSubmenu: boolean;
  href?: string;
}

// 1st block: Primary items
const PRIMARY_NAV_ITEMS: NavItem[] = [
  { id: 'womenswear', label: 'Womenswear', hasSubmenu: true },
  { id: 'fit-development', label: 'Fit & Development', hasSubmenu: true },
  { id: 'manufacturing', label: 'Manufacturing', hasSubmenu: true },
  { id: 'programmes', label: 'Programmes', hasSubmenu: true },
  { id: 'resources', label: 'Resources', hasSubmenu: true },
  { id: 'about', label: 'About', hasSubmenu: true },
];

// 2nd block: Middle items
const SECONDARY_NAV_ITEMS: NavItem[] = [
  { id: 'start', label: 'Start', hasSubmenu: false, href: '/resource?tab=tools' },
  { id: 'product-archive', label: 'Product Archive', hasSubmenu: false, href: '/about?tab=project-archive' },
  { id: 'seamx-world', label: 'SeamX™ World', hasSubmenu: false, href: '/about?tab=about-seamladies' },
];

// 3rd block: Bottom items
const TERTIARY_NAV_ITEMS: NavItem[] = [
  { id: 'womens-blanks', label: 'Women’s Blanks', hasSubmenu: false, href: '/womenswear/categories' },
  { id: 'samples', label: 'Samples', hasSubmenu: false, href: '/fit-and-development?tab=sampling' },
  { id: 'journal', label: 'Journal', hasSubmenu: false, href: '/about?tab=journal' },
  { id: 'portal', label: 'Portal', hasSubmenu: false, href: '/resource?tab=tools' },
];

const SUBMENU_DATA: Record<string, SubmenuData> = {
  womenswear: {
    id: 'womenswear',
    title: 'Womenswear',
    items: [
      { label: 'Explore', href: '/womenswear/explore' },
      { label: 'Categories', href: '/womenswear/categories' },
      { label: 'Specialist Categories', href: '/womenswear/Specialist-categories' },
      { label: 'Start omsx workflow', href: '/product' },
    ],
  },
  'fit-development': {
    id: 'fit-development',
    title: 'Fit & Development',
    items: [
      { label: 'Female Fit', href: '/fit-and-development?tab=female-fit' },
      { label: 'Sizing', href: '/fit-and-development?tab=sizing' },
      { label: 'Technical Development', href: '/fit-and-development?tab=technical-development' },
      { label: 'Sampling', href: '/fit-and-development?tab=sampling' },
    ],
  },
  manufacturing: {
    id: 'manufacturing',
    title: 'Manufacturing',
    items: [
      { label: 'Production Routes', href: '/manufacturing?tab=production-routes' },
      { label: 'Product Capabilities', href: '/manufacturing?tab=product-capabilities' },
      { label: 'Production Network', href: '/manufacturing?tab=production-network' },
      { label: 'Production Services', href: '/manufacturing?tab=production-services' },
    ],
  },
  programmes: {
    id: 'programmes',
    title: 'Programmes',
    items: [
      { label: 'Collection Development', href: '/programmes?tab=collection-development' },
      { label: 'Product Development Partnership', href: '/programmes?tab=product-development-partnership' },
      { label: 'Continuous Production', href: '/programmes?tab=continuous-production' },
    ],
  },
  resources: {
    id: 'resources',
    title: 'Resources',
    items: [
      { label: 'Guides', href: '/resource?tab=guides' },
      { label: 'Tools', href: '/resource?tab=tools' },
      { label: 'Libraries', href: '/resource?tab=libraries' },
      { label: 'Help', href: '/resource?tab=help' },
    ],
  },
  about: {
    id: 'about',
    title: 'About',
    items: [
      { label: 'About SeamLadies', href: '/about?tab=about-seamladies' },
      { label: 'Our Approach', href: '/about?tab=our-approach' },
      { label: 'Female Fit Philosophy', href: '/about?tab=female-fit-philosophy' },
      { label: 'Design & Technical Team', href: '/about?tab=design-technical-team' },
      { label: 'Manufacturing Network', href: '/about?tab=manufacturing-network' },
      { label: 'Responsibility', href: '/about?tab=responsibility' },
      { label: 'Women-Led Brands', href: '/about?tab=women-led-brands' },
      { label: 'Project Archive', href: '/about?tab=project-archive' },
      { label: 'Journal', href: '/about?tab=journal' },
      { label: 'Careers', href: '/about?tab=careers' },
      { label: 'Contact', href: '/about?tab=contact' },
    ],
  },
};

interface MenuSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuSidebar({ isOpen, onClose }: MenuSidebarProps) {
  const [activeSubmenuId, setActiveSubmenuId] = useState<string | null>(null);
  const [prevIsOpen, setPrevIsOpen] = useState<boolean>(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) {
      setActiveSubmenuId(null);
    }
  }

  // Disable body scroll when sidebar is open
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

  const handleCloseAll = () => {
    setActiveSubmenuId(null);
    onClose();
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

      {/* Main Sidebar (Desktop width 500px) */}
      <div
        className={`fixed top-0 left-0 h-full w-full md:w-[500px] bg-white overflow-y-auto menu-sidebar-scrollbar z-[70] border-r border-gray-200 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Main Header with Close Button (scrolls with content) */}
        <div className="h-[60px] flex items-center justify-end px-6 md:pl-12 md:pr-6 border-b border-transparent">
          <button
            onClick={handleCloseAll}
            className="p-2 -mr-2 text-gray-500 hover:text-black cursor-pointer transition-colors"
            aria-label="Close Menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Navigation Content */}
        <div className="px-6 md:pl-12 md:pr-6 py-4">
          {/* Group 1: Primary items */}
          <ul className="space-y-3 md:space-y-4 text-[19px] font-bold tracking-wider uppercase mb-8">
            {PRIMARY_NAV_ITEMS.map((item) => {
              const isActive = activeSubmenuId === item.id;
              const hasSubmenuActive = activeSubmenuId !== null;

              if (item.hasSubmenu) {
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleSubmenuToggle(item.id)}
                      className={`w-full py-2.5 flex items-center justify-between group transition-colors cursor-pointer text-left ${
                        hasSubmenuActive
                          ? isActive
                            ? 'text-black'
                            : 'text-gray-400'
                          : 'text-black hover:text-gray-600'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight
                        className={`w-4 h-4 transition-colors ${
                          hasSubmenuActive
                            ? isActive
                              ? 'text-black'
                              : 'text-gray-400'
                            : 'text-gray-400 group-hover:text-black'
                        }`}
                      />
                    </button>
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <Link
                    href={item.href || '#'}
                    onClick={handleCloseAll}
                    className={`block py-2.5 transition-colors ${
                      hasSubmenuActive
                        ? 'text-gray-400 hover:text-black'
                        : 'text-black hover:text-gray-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <hr className="border-gray-200 mb-8" />

          {/* Group 2: Secondary items (Start, Product Archive, SeamX™ World) */}
          <ul className="space-y-3 md:space-y-4 text-[17px] font-medium text-gray-900 mb-8">
            {SECONDARY_NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href || '#'}
                  onClick={handleCloseAll}
                  className="block py-1.5 hover:text-gray-500 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <hr className="border-gray-200 mb-8" />

          {/* Group 3: Tertiary items (Women’s Blanks, Samples, Journal, Portal) */}
          <ul className="space-y-3 md:space-y-4 text-[17px] font-medium text-gray-900 pb-10">
            {TERTIARY_NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href || '#'}
                  onClick={handleCloseAll}
                  className="block py-1.5 hover:text-gray-500 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Submenu Panel Container
          On Desktop: Adjacent at md:left-[500px] w-[500px] z-[65], slides out
          On Mobile: Fullscreen slide over at z-[80]
      */}
      <div
        className={`fixed top-0 h-full bg-white overflow-y-auto menu-sidebar-scrollbar transition-transform duration-300 ease-in-out
          left-0 w-full z-[80] 
          md:left-[500px] md:w-[500px] md:z-[65] md:border-l md:border-gray-200
          ${
            activeSubmenuId && isOpen
              ? 'translate-x-0 pointer-events-auto visible'
              : '-translate-x-full pointer-events-none invisible md:pointer-events-none'
          }
        `}
      >
        {/* Mobile Header (Hidden on Desktop, scrolls with menu content on mobile) */}
        <div className="md:hidden h-[60px] flex items-center justify-between px-6 border-b border-gray-200">
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

        {/* Submenu Content */}
        {activeSubmenuData && (
          <div className="px-6 md:pl-12 md:pr-6 py-4 pt-6 md:pt-14">
            <h2 className="hidden md:block text-[13px] font-bold text-gray-400 tracking-widest uppercase mb-8">
              {activeSubmenuData.title}
            </h2>

            <ul className="space-y-5 text-[16px] font-medium text-gray-900 pb-8">
              {activeSubmenuData.items.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    onClick={handleCloseAll}
                    className="hover:text-gray-500 transition-colors block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
