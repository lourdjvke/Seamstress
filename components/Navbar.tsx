'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, Search, ShoppingBag, User, ChevronDown, X } from 'lucide-react';
import MenuSidebar from '@/components/MenuSidebar';
import SearchSidebar from '@/components/SearchSidebar';
import { useShop } from '@/context/ShopContext';

const NAV_ITEMS = [
  { label: 'Womenswear', href: '/clothing' },
  { 
    label: 'Fit & Development', 
    href: '/resource',
    subLinks: [
      { label: 'Articles and Videos', href: '/resource' },
      { label: 'Business Plan Builder', href: '/resource' },
      { label: 'Funding Finder', href: '/resource' },
    ]
  },
  { 
    label: 'Manufacturing', 
    href: '/history',
    subLinks: [
      { label: 'Supplier Guidelines', href: '/programmes' },
      { label: 'Quality Control', href: '/history' },
      { label: 'Sustainability', href: '/programmes' },
    ]
  },
  { 
    label: 'Programmes', 
    href: '/programmes',
    subLinks: [
      { label: 'Fellowship Programs', href: '/programmes' },
      { label: 'Grants & Funding', href: '/programmes' },
      { label: 'Mentorship', href: '/programmes' },
    ]
  },
  { label: 'About', href: '/resource' },
];

function NavItem({ item, isScrolled }: { item: typeof NAV_ITEMS[0], isScrolled: boolean }) {
  return (
    <div className="relative group cursor-pointer h-10 flex items-start">
      {item.subLinks && (
        <div className={`
          absolute -top-4 left-1/2 -translate-x-1/2 min-w-[240px] pt-4 pb-6 px-6 rounded-md
          transition-all duration-300 pointer-events-none group-hover:pointer-events-auto
          opacity-0 group-hover:opacity-100 flex flex-col items-start text-left
          ${isScrolled 
            ? 'bg-white border border-gray-200 shadow-lg text-black' 
            : 'bg-white/20 backdrop-blur-md text-white'
          }
        `}>
           {/* Spacer to push dropdown items below title, matching title height + spacing */}
           <div className="h-6 mb-4"></div> 
           <div className="flex flex-col gap-3.5 w-full items-start text-left">
             {item.subLinks.map(sub => (
               <Link key={sub.label} href={sub.href} className="text-[13px] font-medium tracking-normal normal-case hover:underline transition-all text-left block w-full">
                 {sub.label}
               </Link>
             ))}
           </div>
        </div>
      )}
      
      <Link href={item.href} className="relative z-10 flex items-center gap-1 group-hover:underline underline-offset-[6px]">
        {item.label}
        {item.subLinks && (
          <ChevronDown className="w-[14px] h-[14px] transition-transform duration-300 group-hover:rotate-180" />
        )}
      </Link>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { openCart, cartCount } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLinks, setShowLinks] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isWhiteNavbar = isScrolled || pathname === '/clothing' || pathname === '/product' || pathname === '/programmes' || pathname === '/resource' || pathname === '/history';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY <= 50) {
        setShowLinks(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowLinks(false);
      } else if (currentScrollY < lastScrollY - 5) {
        setShowLinks(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isWhiteNavbar ? 'bg-white text-black border-b border-gray-200' : 'bg-transparent text-white'
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex-1 flex items-center">
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Menu"
              className="p-2 -ml-2 cursor-pointer hover:opacity-70 transition-opacity"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 text-center flex justify-center">
            <Link href="/" className="cursor-pointer inline-flex items-center justify-center">
              <Image 
                src="https://user23004.na.imgto.link/public/20260811/seamladies-logo.avif" 
                alt="SeamLadies Logo" 
                width={160} 
                height={40} 
                className={`object-contain h-8 w-auto transition-all duration-300 ${
                  !isWhiteNavbar ? 'brightness-0 invert' : ''
                }`} 
                priority
              />
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-end gap-3 md:gap-4 relative">
            {/* Desktop search bar starting from search icon */}
            <div 
              className={`hidden md:flex items-center transition-all duration-300 ease-in-out ${
                isSearchOpen 
                  ? 'w-[260px] opacity-100 pointer-events-auto mr-1' 
                  : 'w-0 opacity-0 pointer-events-none overflow-hidden'
              }`}
            >
              <div className={`w-full flex items-center px-3 py-1.5 rounded-md transition-colors duration-300 ${
                isWhiteNavbar 
                  ? 'bg-white border border-gray-300 text-gray-900' 
                  : 'bg-white/20 backdrop-blur-md border border-transparent text-white'
              }`}>
                <input 
                  type="text" 
                  placeholder="Search for resources" 
                  className="w-full bg-transparent outline-none text-xs placeholder:text-current placeholder:opacity-70"
                  autoFocus={isSearchOpen}
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-2 p-1 hover:opacity-70 cursor-pointer"
                  aria-label="Close search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Desktop Search Icon - only disappears when search is open */}
            {!isSearchOpen && (
              <button 
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search" 
                className="p-2 hidden md:block cursor-pointer hover:opacity-70 transition-opacity"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* Mobile Search Button */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search" 
              className="p-2 md:hidden cursor-pointer hover:opacity-70 transition-opacity"
            >
              <Search className="w-5 h-5" />
            </button>

            <button aria-label="User Account" className="p-2 hidden sm:block cursor-pointer hover:opacity-70 transition-opacity">
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={openCart}
              aria-label="Shopping Bag"
              className="p-2 cursor-pointer relative hover:opacity-70 transition-opacity"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
        <div
          className={`hidden md:flex justify-center gap-[6em] lg:gap-[8em] text-[11px] tracking-[0.2em] font-semibold uppercase transition-all duration-500 ${
            showLinks ? 'h-10 opacity-100 pointer-events-auto' : 'h-0 opacity-0 pointer-events-none overflow-hidden'
          }`}
        >
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.label} item={item} isScrolled={isWhiteNavbar} />
          ))}
        </div>
      </header>

      {/* Menu Sidebar Component */}
      <MenuSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* Mobile Search Sidebar Component */}
      <SearchSidebar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
