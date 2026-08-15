'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  X, 
  Plus, 
  Minus,
  Check 
} from 'lucide-react';
import ProductCard, { Product } from '@/components/ProductCard';

const CATEGORIES = [
  { name: 'View All', href: '#' },
  { name: 'Dresses', href: '#' },
  { name: 'Tops & Shirts', href: '#' },
  { name: 'Sweaters', href: '#' },
  { name: 'Skirts', href: '#' },
  { name: 'Pants & Denim', href: '#' },
  { name: 'Jackets & Outerwear', href: '#', desktopOnly: true },
  { name: 'Tunics & Caftans', href: '#', desktopOnly: true },
  { name: 'Swim Coverups', href: '#', mobileOnly: true },
  { name: 'Swim One Pieces', href: '#', mobileOnly: true },
];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Printed Viscose Dress',
    price: '£595',
    images: [
      'https://picsum.photos/seed/clothing1/400/533',
      'https://picsum.photos/seed/clothing1_alt/400/533',
    ],
  },
  {
    id: '2',
    title: 'Wool Cardigan',
    price: '£550',
    images: [
      'https://picsum.photos/seed/clothing2/400/533',
      'https://picsum.photos/seed/clothing2_alt/400/533',
    ],
  },
  {
    id: '3',
    title: 'Silk-Front Wool Top',
    price: '£445',
    images: [
      'https://picsum.photos/seed/clothing3/400/533',
      'https://picsum.photos/seed/clothing3_alt/400/533',
    ],
  },
  {
    id: '4',
    title: 'Wide-Leg Cotton Pant',
    price: '£345',
    images: [
      'https://picsum.photos/seed/clothing4/400/533',
      'https://picsum.photos/seed/clothing4_alt/400/533',
    ],
  },
  {
    id: '5',
    title: 'Crinkled Viscose Top',
    price: '£325',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/clothing5/400/533',
      'https://picsum.photos/seed/clothing5_alt/400/533',
    ],
  },
  {
    id: '6',
    title: 'Crinkled Viscose Skirt',
    price: '£345',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/clothing6/400/533',
      'https://picsum.photos/seed/clothing6_alt/400/533',
    ],
  },
];

const AFTER_INTERRUPTION_PRODUCTS: Product[] = [
  {
    id: '7',
    title: 'Printed Golf Dress',
    price: '£365',
    images: [
      'https://picsum.photos/seed/clothing7_pattern/400/533',
      'https://picsum.photos/seed/clothing7_alt/400/533',
    ],
    colors: [
      { colorHex: '#e5e0d8', imgSrc: 'https://picsum.photos/seed/clothing7_pattern/400/533' },
      { colorHex: '#6b8cce', imgSrc: 'https://picsum.photos/seed/clothing7_blue/400/533' },
    ],
  },
  {
    id: '8',
    title: 'Printed Smocked Dress',
    price: '£495',
    images: [
      'https://picsum.photos/seed/clothing8/400/533',
      'https://picsum.photos/seed/clothing8_alt/400/533',
    ],
  },
  {
    id: '9',
    title: 'Printed Tory Tunic',
    price: '£325',
    images: [
      'https://picsum.photos/seed/clothing9_white/400/533',
      'https://picsum.photos/seed/clothing9_alt/400/533',
    ],
    colors: [
      { colorHex: '#f0f0f0', imgSrc: 'https://picsum.photos/seed/clothing9_white/400/533' },
      { colorHex: '#7b9c6f', imgSrc: 'https://picsum.photos/seed/clothing9_green/400/533' },
    ],
  },
  {
    id: '10',
    title: 'Printed Camp Shorts',
    price: '£245',
    images: [
      'https://picsum.photos/seed/clothing10_white/400/533',
      'https://picsum.photos/seed/clothing10_alt/400/533',
    ],
    colors: [
      { colorHex: '#f0f0f0', imgSrc: 'https://picsum.photos/seed/clothing10_white/400/533' },
      { colorHex: '#7b9c6f', imgSrc: 'https://picsum.photos/seed/clothing10_green/400/533' },
    ],
  },
  {
    id: '11',
    title: 'Merino Wool Sweater',
    price: '£395',
    images: [
      'https://picsum.photos/seed/clothing11_beige/400/533',
      'https://picsum.photos/seed/clothing11_alt/400/533',
    ],
    colors: [
      { colorHex: '#d2b48c', imgSrc: 'https://picsum.photos/seed/clothing11_beige/400/533' },
      { colorHex: '#333333', imgSrc: 'https://picsum.photos/seed/clothing11_black/400/533' },
      { colorHex: '#e0e0e0', imgSrc: 'https://picsum.photos/seed/clothing11_grey/400/533' },
    ],
  },
  {
    id: '12',
    title: 'Relaxed-Fit Suede Pant',
    price: '£895',
    images: [
      'https://picsum.photos/seed/clothing12_brown/400/533',
      'https://picsum.photos/seed/clothing12_alt/400/533',
    ],
    colors: [
      { colorHex: '#5c4033', imgSrc: 'https://picsum.photos/seed/clothing12_brown/400/533' },
      { colorHex: '#d2b48c', imgSrc: 'https://picsum.photos/seed/clothing12_tan/400/533' },
    ],
  },
  {
    id: '13',
    title: 'Cotton Scoop Tank',
    price: '£165',
    images: [
      'https://picsum.photos/seed/clothing13_black/400/533',
      'https://picsum.photos/seed/clothing13_alt/400/533',
    ],
    colors: [
      { colorHex: '#111111', imgSrc: 'https://picsum.photos/seed/clothing13_black/400/533' },
      { colorHex: '#f0f0f0', imgSrc: 'https://picsum.photos/seed/clothing13_white/400/533' },
      { colorHex: '#e0e0e0', imgSrc: 'https://picsum.photos/seed/clothing13_grey/400/533' },
    ],
  },
  {
    id: '14',
    title: 'Striped Cotton Polo',
    price: '£595',
    images: [
      'https://picsum.photos/seed/clothing14/400/533',
      'https://picsum.photos/seed/clothing14_alt/400/533',
    ],
  },
];

// Featured Interruption Items
const FEATURED_ITEMS: Product[] = [
  {
    id: 'feat-1',
    title: 'Racerback Tank',
    price: '£350',
    images: [
      'https://picsum.photos/seed/feat_tank/400/533',
      'https://picsum.photos/seed/feat_tank_alt/400/533',
    ],
  },
  {
    id: 'feat-2',
    title: 'Striped Flared Skirt',
    price: '£795',
    images: [
      'https://picsum.photos/seed/feat_skirt/400/533',
      'https://picsum.photos/seed/feat_skirt_alt/400/533',
    ],
  },
  {
    id: 'feat-3',
    title: 'Wool Cardigan',
    price: '£550',
    images: [
      'https://picsum.photos/seed/feat_cardigan/400/533',
      'https://picsum.photos/seed/feat_cardigan_alt/400/533',
    ],
    colors: [
      { colorHex: '#111111', imgSrc: 'https://picsum.photos/seed/feat_cardigan/400/533' },
      { colorHex: '#d2b48c', imgSrc: 'https://picsum.photos/seed/feat_cardigan_beige/400/533' },
      { colorHex: '#5c4033', imgSrc: 'https://picsum.photos/seed/feat_cardigan_brown/400/533' },
    ],
  },
  {
    id: 'feat-4',
    title: 'Tie-Back Crepe Dress',
    price: '£595',
    images: [
      'https://picsum.photos/seed/feat_dress/400/533',
      'https://picsum.photos/seed/feat_dress_alt/400/533',
    ],
  },
];

// Filter Options
const FILTER_TYPES = [
  'All',
  'Dresses',
  'Swim Coverups',
  'Swim One Pieces',
  'Swim Two Pieces',
  'Tops & Shirts',
  'Pants & Skirts',
  'Jackets & Outerwear',
  'Sweaters',
];

const FILTER_STYLES = [
  'Tunics',
  'Tops & Blouses',
  'Sweaters',
  'Shorts',
  'Skirts',
  'Pants',
  'Leggings',
  'Denim',
  'Coats & Puffers',
  'Blazers',
  'Jackets',
  'T-Shirts and Tank Tops',
  'Windbreakers',
];

const FILTER_SIZES = ['18', '23', '24', '25', '26', '27', '28', '29', '30', 'S', 'M', 'L'];

const FILTER_COLORS = [
  { name: 'Beige', hex: '#E5E0D8' },
  { name: 'Black', hex: '#000000' },
  { name: 'Blue', hex: '#1E70BF' },
  { name: 'Brown', hex: '#5C4033' },
  { name: 'Gray', hex: '#999999' },
  { name: 'Green', hex: '#008037' },
  { name: 'Multi', hex: '#D29B7E' },
  { name: 'Pink', hex: '#F1A1B4' },
  { name: 'Purple', hex: '#6A2598' },
  { name: 'Red', hex: '#E31B23' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Yellow', hex: '#FFE600' },
];

const FILTER_MATERIALS = [
  'Cotton',
  'Denim',
  'Jacquard',
  'Jersey',
  'Leather',
  'Linen',
  'Nylon',
  'Other',
  'Polyester',
  'Polyester Blend',
  'Silk',
  'Swimwear',
  'Wool',
];

const FILTER_LENGTHS = ['Maxi', 'Midi', 'Mini'];



export default function ClothingPage() {
  const [activeCategory, setActiveCategory] = useState<string>('View All');
  const [showNavbarLinks, setShowNavbarLinks] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 50) {
        setShowNavbarLinks(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbarLinks(false);
      } else if (currentScrollY < lastScrollY - 5) {
        setShowNavbarLinks(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const [showCookieBanner, setShowCookieBanner] = useState<boolean>(true);
  const [showCollectionDetails, setShowCollectionDetails] = useState<boolean>(false);

  // Sort State & Popover
  const [sortOption, setSortOption] = useState<string>('View All');
  const [showSortDropdown, setShowSortDropdown] = useState<boolean>(false);

  // Filter Drawer State
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedLengths, setSelectedLengths] = useState<string[]>([]);

  // Prevent background scroll when filter is open
  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFilterOpen]);

  const toggleStyle = (style: string) => {
    setSelectedStyles(prev => 
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const toggleMaterial = (mat: string) => {
    setSelectedMaterials(prev => 
      prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]
    );
  };

  const toggleLength = (len: string) => {
    setSelectedLengths(prev => 
      prev.includes(len) ? prev.filter(l => l !== len) : [...prev, len]
    );
  };

  const sortOptions = ['View All', 'Price Low To High', 'Price High To Low'];

  return (
    <div className="min-h-screen bg-white text-gray-900 text-sm font-sans pt-28 md:pt-36">
      {/* Category Sub-header Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto">
          {/* Horizontal Subnav Category Links */}
          <nav className="overflow-x-auto no-scrollbar py-4 px-4 md:px-8">
            <ul className="flex space-x-6 md:justify-center min-w-max text-[11px] tracking-wider uppercase text-gray-500 font-medium">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.name;
                const displayClass = cat.desktopOnly 
                  ? 'hidden md:block' 
                  : cat.mobileOnly 
                  ? 'md:hidden' 
                  : '';

                return (
                  <li key={cat.name} className={displayClass}>
                    <button
                      onClick={() => setActiveCategory(cat.name)}
                      className={`transition-colors cursor-pointer ${
                        isActive
                          ? 'text-black font-semibold border-b border-black pb-1'
                          : 'hover:text-black'
                      }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className={`w-full max-w-full px-4 md:px-8 py-4 flex justify-between items-center text-xs font-medium tracking-wider uppercase bg-white z-40 sticky transition-all duration-500 ${showNavbarLinks ? 'top-[64px] md:top-[108px]' : 'top-[64px]'}`}>
        {/* Mobile Filter / Sort Buttons */}
          <div className="flex items-center space-x-3 cursor-pointer md:hidden">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="font-semibold uppercase tracking-wider cursor-pointer"
            >
              Filter
            </button>
            <span className="text-gray-300">|</span>
            <button 
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="uppercase tracking-wider cursor-pointer"
            >
              Sort
            </button>
          </div>

          <div className="hidden md:block flex-1" />

          {/* Desktop Filter / Sort Controls */}
          <div className="hidden md:flex items-center space-x-3 cursor-pointer relative">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="font-semibold uppercase tracking-wider cursor-pointer hover:opacity-75 transition-opacity"
            >
              Filter
            </button>
            <span className="text-gray-300">|</span>
            <div className="relative flex items-center">
              <button 
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="font-semibold uppercase tracking-wider cursor-pointer hover:opacity-75 transition-opacity"
              >
                Sort
              </button>

              {/* Sort Popover Dropdown (Desktop) */}
              {showSortDropdown && (
                <div className="absolute top-8 right-0 w-56 bg-white border border-gray-200 shadow-xl z-40 p-4 space-y-3 normal-case tracking-normal text-xs animate-in fade-in zoom-in-95 duration-150">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSortOption(opt);
                        setShowSortDropdown(false);
                      }}
                      className="w-full text-left flex items-center gap-2 py-1 hover:text-black cursor-pointer transition-colors"
                    >
                      <div className="w-4 flex items-center justify-center">
                        {sortOption === opt && <Check className="w-3.5 h-3.5 text-gray-900" />}
                      </div>
                      <span className={sortOption === opt ? 'font-medium text-gray-900' : 'text-gray-600'}>
                        {opt}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Sort Dropdown Popover */}
          {showSortDropdown && (
            <div className="md:hidden absolute top-12 left-4 w-52 bg-white border border-gray-200 shadow-xl z-40 p-4 space-y-3 normal-case tracking-normal text-xs">
              {sortOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSortOption(opt);
                    setShowSortDropdown(false);
                  }}
                  className="w-full text-left flex items-center gap-2 py-1 cursor-pointer"
                >
                  <div className="w-4 flex items-center justify-center">
                    {sortOption === opt && <Check className="w-3.5 h-3.5 text-gray-900" />}
                  </div>
                  <span className={sortOption === opt ? 'font-medium text-gray-900' : 'text-gray-600'}>
                    {opt}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Mobile Grid Layout Toggle Icons */}
          <div className="flex space-x-2 md:hidden">
            <button className="w-4 h-4 border border-black cursor-pointer" aria-label="Single column view" />
            <button className="w-4 h-4 grid grid-cols-2 gap-[1px] cursor-pointer" aria-label="Two column view">
              <div className="bg-black" />
              <div className="bg-black" />
              <div className="bg-black" />
              <div className="bg-black" />
            </button>
          </div>
        </div>

      {/* Main Content Area */}
      <main className="w-full mb-20 px-0">
        {/* First Grid Row (First 6 Products) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[3px] py-3">
          {INITIAL_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Feature Interruption Section ("TWO ICONS, REFRESHED") */}
        <div className="my-8 md:my-14 bg-white border-t border-b border-gray-100 py-6 md:py-10 px-0">
          {/* Desktop Interruption View */}
          <div className="hidden md:grid md:grid-cols-2 gap-[3px] items-stretch">
            {/* Left 50% Editorial Feature Image */}
            <div className="flex flex-col bg-white">
              <div className="relative flex-1 bg-[#f6f6f6] overflow-hidden group">
                <Image 
                  src="https://picsum.photos/seed/two_icons_hero/800/1066"
                  alt="Two Icons, Refreshed - Feature"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="pt-4 pb-2 px-1">
                <h3 className="text-lg font-semibold tracking-wider uppercase mb-1">
                  TWO ICONS, REFRESHED
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  The flower tank and flared skirt in Japanese cotton jersey
                </p>
              </div>
            </div>

            {/* Right 50% - 2x2 Product Grid */}
            <div className="grid grid-cols-2 gap-[3px]">
              {FEATURED_ITEMS.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>

          {/* Mobile Interruption View */}
          <div className="md:hidden flex flex-col gap-6">
            <div className="relative aspect-[3/4] bg-[#f6f6f6] w-full overflow-hidden">
              <Image 
                src="https://picsum.photos/seed/two_icons_hero/800/1066"
                alt="Two Icons, Refreshed - Feature"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="px-4">
              <h3 className="text-base font-semibold tracking-wider uppercase mb-1">
                TWO ICONS, REFRESHED
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-6">
                The flower tank and flared skirt in Japanese cotton jersey
              </p>
            </div>

            {/* Mobile 2-column Grid of 4 Featured Items */}
            <div className="grid grid-cols-2 gap-[3px]">
              {FEATURED_ITEMS.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Second Grid Row (Remaining Products) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[3px] py-3">
          {AFTER_INTERRUPTION_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Collection Details Accordion Section */}
        <div className="py-12 px-2 md:px-4 bg-white border-t border-gray-200 mt-12">
          <button 
            onClick={() => setShowCollectionDetails(!showCollectionDetails)}
            className="text-sm font-medium flex items-center space-x-2.5 cursor-pointer text-gray-900 hover:text-black group"
          >
            <span>Collection Details</span>
            {showCollectionDetails ? (
              <Minus className="w-3.5 h-3.5 text-gray-800" />
            ) : (
              <Plus className="w-3.5 h-3.5 text-gray-800" />
            )}
          </button>

          {/* Expanded Paragraph: 50% width on Desktop, 100% on Mobile */}
          {showCollectionDetails && (
            <div className="mt-4 text-xs text-gray-600 leading-relaxed w-full md:w-1/2 animate-in fade-in duration-300">
              Discover Tory Burch&apos;s Ready-To-Wear Collection featuring tailored blazers, silk tunic tops, versatile viscose dresses, and refined knitwear designed with timeless craftsmanship and modern elegance.
            </div>
          )}

          <div className="mt-8 text-xs text-gray-500">
            <Link href="/clothing" className="hover:text-black">
              Clothing
            </Link>
            {' / '}
            <span className="text-black font-normal">View All</span>
          </div>
        </div>
      </main>

      {/* FILTER SIDEBAR / DRAWER */}
      {/* Overlay Backdrop */}
      {isFilterOpen && (
        <div 
          onClick={() => setIsFilterOpen(false)}
          className="fixed inset-0 bg-black/40 z-50 transition-opacity duration-300"
        />
      )}

      {/* Drawer Panel */}
      <div 
        className={`fixed top-0 right-0 bottom-0 z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isFilterOpen ? 'translate-x-0' : 'translate-x-full'
        } w-full md:w-[450px]`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="font-semibold uppercase tracking-widest text-sm text-gray-900">
            FILTER
          </h2>
          <button 
            onClick={() => setIsFilterOpen(false)}
            className="w-8 h-8 border border-gray-300 hover:border-black flex items-center justify-center text-gray-800 cursor-pointer transition-colors"
            aria-label="Close filter drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Filter Categories */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 text-xs font-normal">
          {/* 1. Type */}
          <div>
            <h3 className="font-semibold uppercase text-xs tracking-wider mb-4 text-gray-900">
              Type
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3.5 gap-x-2">
              {FILTER_TYPES.map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer text-gray-800 hover:text-black">
                  <input 
                    type="radio" 
                    name="filter-type" 
                    checked={selectedType === type}
                    onChange={() => setSelectedType(type)}
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* 2. Style */}
          <div>
            <h3 className="font-semibold uppercase text-xs tracking-wider mb-4 text-gray-900">
              Style
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3.5 gap-x-2">
              {FILTER_STYLES.map((style) => (
                <label key={style} className="flex items-center gap-2 cursor-pointer text-gray-800 hover:text-black">
                  <input 
                    type="checkbox" 
                    checked={selectedStyles.includes(style)}
                    onChange={() => toggleStyle(style)}
                    className="w-4 h-4 accent-black cursor-pointer rounded-none"
                  />
                  <span>{style}</span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* 3. Size */}
          <div>
            <h3 className="font-semibold uppercase text-xs tracking-wider mb-4 text-gray-900">
              Size
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3.5 gap-x-2">
              {FILTER_SIZES.map((size) => (
                <label key={size} className="flex items-center gap-2 cursor-pointer text-gray-800 hover:text-black">
                  <input 
                    type="checkbox" 
                    checked={selectedSizes.includes(size)}
                    onChange={() => toggleSize(size)}
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* 4. Color */}
          <div>
            <h3 className="font-semibold uppercase text-xs tracking-wider mb-4 text-gray-900">
              Color
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3.5 gap-x-2">
              {FILTER_COLORS.map((c) => (
                <label key={c.name} className="flex items-center gap-2 cursor-pointer text-gray-800 hover:text-black">
                  <span 
                    className="w-4 h-4 rounded-full border border-gray-300 inline-block shrink-0" 
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* 5. Material */}
          <div>
            <h3 className="font-semibold uppercase text-xs tracking-wider mb-4 text-gray-900">
              Material
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3.5 gap-x-2">
              {FILTER_MATERIALS.map((mat) => (
                <label key={mat} className="flex items-center gap-2 cursor-pointer text-gray-800 hover:text-black">
                  <input 
                    type="checkbox" 
                    checked={selectedMaterials.includes(mat)}
                    onChange={() => toggleMaterial(mat)}
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                  <span>{mat}</span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* 6. Length */}
          <div>
            <h3 className="font-semibold uppercase text-xs tracking-wider mb-4 text-gray-900">
              Length
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3.5 gap-x-2">
              {FILTER_LENGTHS.map((len) => (
                <label key={len} className="flex items-center gap-2 cursor-pointer text-gray-800 hover:text-black">
                  <input 
                    type="checkbox" 
                    checked={selectedLengths.includes(len)}
                    onChange={() => toggleLength(len)}
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                  <span>{len}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Sticky Footer */}
        <div className="p-6 border-t border-gray-200 bg-white space-y-3">
          <p className="text-[11px] text-gray-500 text-center">
            You can select several filters at once.
          </p>
          <button 
            onClick={() => setIsFilterOpen(false)}
            className="w-full bg-[#111111] text-white py-2.5 text-xs font-semibold tracking-widest uppercase hover:bg-gray-800 transition-colors cursor-pointer"
          >
            APPLY (81)
          </button>
        </div>
      </div>

    </div>
  );
}
