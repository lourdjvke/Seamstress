'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  X, 
  Plus, 
  Minus, 
  Check, 
  Pause, 
  Play,
  Grid,
  Square
} from 'lucide-react';
import ProductCard, { Product } from '@/components/ProductCard';
import Newsletter from '@/components/Newsletter';

// ----------------------------------------------------
// PRODUCT CATALOG MATCHING EXACT RUNWAY COLLECTION
// ----------------------------------------------------

const RUNWAY_SECTION_1_PRODUCTS: Product[] = [
  {
    id: 'rw-1',
    title: 'Silk Polo',
    price: '£595',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/silkpolo_blue/600/800',
      'https://picsum.photos/seed/silkpolo_blue_alt/600/800',
    ],
    colors: [
      { colorHex: '#b8c7db', imgSrc: 'https://picsum.photos/seed/silkpolo_blue/600/800' },
      { colorHex: '#ffffff', imgSrc: 'https://picsum.photos/seed/silkpolo_white/600/800' },
      { colorHex: '#222222', imgSrc: 'https://picsum.photos/seed/silkpolo_black/600/800' },
    ],
  },
  {
    id: 'rw-2',
    title: 'Wool Skirt',
    price: '£795',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/woolskirt_brown/600/800',
      'https://picsum.photos/seed/woolskirt_brown_alt/600/800',
    ],
  },
  {
    id: 'rw-3',
    title: 'Runway Shell Drop Earrings',
    price: '£330',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/shellearrings/600/800',
      'https://picsum.photos/seed/shellearrings_alt/600/800',
    ],
  },
];

const RUNWAY_SECTION_1_REST: Product[] = [
  {
    id: 'rw-4',
    title: 'Crinkled Viscose Top',
    price: '£595',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/crinkledtop_blue/600/800',
      'https://picsum.photos/seed/crinkledtop_blue_alt/600/800',
    ],
  },
  {
    id: 'rw-5',
    title: 'Crinkled Viscose Skirt',
    price: '£595',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/crinkledskirt_blue/600/800',
      'https://picsum.photos/seed/crinkledskirt_blue_alt/600/800',
    ],
  },
  {
    id: 'rw-6',
    title: 'Crushed Silk Shirt',
    price: '£775',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/crushedsilk_gold/600/800',
      'https://picsum.photos/seed/crushedsilk_gold_alt/600/800',
    ],
  },
  {
    id: 'rw-7',
    title: 'Silk Jacquard Skirt',
    price: '£795',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/jacquardskirt_blue/600/800',
      'https://picsum.photos/seed/jacquardskirt_blue_alt/600/800',
    ],
    colors: [
      { colorHex: '#c2d3ea', imgSrc: 'https://picsum.photos/seed/jacquardskirt_blue/600/800' },
      { colorHex: '#e8d0c8', imgSrc: 'https://picsum.photos/seed/jacquardskirt_pink/600/800' },
    ],
  },
];

const RUNWAY_SECTION_2_PRODUCTS: Product[] = [
  {
    id: 'rw-8',
    title: 'Runway Shell Necklace',
    price: '£440',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/shellnecklace/600/800',
      'https://picsum.photos/seed/shellnecklace_alt/600/800',
    ],
  },
  {
    id: 'rw-9',
    title: 'Silk Cardigan',
    price: '£775',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/silkcardigan_lavender/600/800',
      'https://picsum.photos/seed/silkcardigan_lavender_alt/600/800',
    ],
  },
  {
    id: 'rw-10',
    title: 'Silk Polo',
    price: '£595',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/silkpolo_lavender/600/800',
      'https://picsum.photos/seed/silkpolo_lavender_alt/600/800',
    ],
    colors: [
      { colorHex: '#c4b0d7', imgSrc: 'https://picsum.photos/seed/silkpolo_lavender/600/800' },
      { colorHex: '#ffffff', imgSrc: 'https://picsum.photos/seed/silkpolo_white/600/800' },
      { colorHex: '#222222', imgSrc: 'https://picsum.photos/seed/silkpolo_black/600/800' },
    ],
  },
  {
    id: 'rw-11',
    title: 'Striped Cotton Shirt',
    price: '£550',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/stripedshirt_blue/600/800',
      'https://picsum.photos/seed/stripedshirt_blue_alt/600/800',
    ],
  },
  {
    id: 'rw-12',
    title: 'Silk Polo Cardigan',
    price: '£770',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/silkpolocardigan_blue/600/800',
      'https://picsum.photos/seed/silkpolocardigan_blue_alt/600/800',
    ],
  },
  {
    id: 'rw-13',
    title: 'Colorblock Ribbed Bodysuit',
    price: '£435',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/ribbedbodysuit/600/800',
      'https://picsum.photos/seed/ribbedbodysuit_alt/600/800',
    ],
  },
  {
    id: 'rw-14',
    title: 'Viscose Jersey Dress',
    price: '£945',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/jerseydress_pink/600/800',
      'https://picsum.photos/seed/jerseydress_pink_alt/600/800',
    ],
    colors: [
      { colorHex: '#d64242', imgSrc: 'https://picsum.photos/seed/jerseydress_coral/600/800' },
      { colorHex: '#e88b9c', imgSrc: 'https://picsum.photos/seed/jerseydress_pink/600/800' },
    ],
  },
  {
    id: 'rw-15',
    title: 'Viscose Jersey Dress',
    price: '£945',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/jerseydress_merlot/600/800',
      'https://picsum.photos/seed/jerseydress_merlot_alt/600/800',
    ],
    colors: [
      { colorHex: '#6a1a2b', imgSrc: 'https://picsum.photos/seed/jerseydress_merlot/600/800' },
      { colorHex: '#d64242', imgSrc: 'https://picsum.photos/seed/jerseydress_coral/600/800' },
    ],
  },
];

const RUNWAY_SECTION_3_PRODUCTS: Product[] = [
  {
    id: 'rw-16',
    title: 'Buddy Wool Jacket',
    price: '£1,400',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/buddyjacket_navy/600/800',
      'https://picsum.photos/seed/buddyjacket_navy_alt/600/800',
    ],
  },
  {
    id: 'rw-17',
    title: 'Pleated Skirt',
    price: '£945',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/pleatedskirt_cream/600/800',
      'https://picsum.photos/seed/pleatedskirt_cream_alt/600/800',
    ],
  },
  {
    id: 'rw-18',
    title: 'Oversized Waxed Canvas Jacket',
    price: '£1,795',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/waxedjacket_yellow/600/800',
      'https://picsum.photos/seed/waxedjacket_yellow_alt/600/800',
    ],
  },
  {
    id: 'rw-19',
    title: 'Waxed Canvas Skirt',
    price: '£945',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/waxedskirt_yellow/600/800',
      'https://picsum.photos/seed/waxedskirt_yellow_alt/600/800',
    ],
  },
  {
    id: 'rw-20',
    title: 'Embellished Mesh Dress',
    price: '£3,300',
    tag: 'Sold Out Online',
    images: [
      'https://picsum.photos/seed/meshdress_baroque/600/800',
      'https://picsum.photos/seed/meshdress_baroque_alt/600/800',
    ],
  },
  {
    id: 'rw-21',
    title: 'Viscose and Cotton Crepe Jacket',
    price: '£1,695',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/crepejacket_black/600/800',
      'https://picsum.photos/seed/crepejacket_black_alt/600/800',
    ],
  },
  {
    id: 'rw-22',
    title: 'Leather Skirt',
    price: '£1,395',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/leatherskirt_red/600/800',
      'https://picsum.photos/seed/leatherskirt_red_alt/600/800',
    ],
  },
  {
    id: 'rw-23',
    title: 'Embroidered Silk Sweater',
    price: '£770',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/silksweater_black/600/800',
      'https://picsum.photos/seed/silksweater_black_alt/600/800',
    ],
  },
];

const RUNWAY_SECTION_4_PRODUCTS: Product[] = [
  {
    id: 'rw-24',
    title: 'Cotton Canvas Skirt',
    price: '£595',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/canvasskirt_grey/600/800',
      'https://picsum.photos/seed/canvasskirt_grey_alt/600/800',
    ],
  },
  {
    id: 'rw-25',
    title: 'Double Wire Buckle Belt',
    price: '£275',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/wirebelt_black/600/800',
      'https://picsum.photos/seed/wirebelt_black_alt/600/800',
    ],
    colors: [
      { colorHex: '#111111', imgSrc: 'https://picsum.photos/seed/wirebelt_black/600/800' },
      { colorHex: '#633a1e', imgSrc: 'https://picsum.photos/seed/wirebelt_brown/600/800' },
    ],
  },
  {
    id: 'rw-26',
    title: 'Silk Polo',
    price: '£595',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/silkpolo_charcoal/600/800',
      'https://picsum.photos/seed/silkpolo_charcoal_alt/600/800',
    ],
    colors: [
      { colorHex: '#2b2b2b', imgSrc: 'https://picsum.photos/seed/silkpolo_charcoal/600/800' },
      { colorHex: '#c4b0d7', imgSrc: 'https://picsum.photos/seed/silkpolo_lavender/600/800' },
      { colorHex: '#b8c7db', imgSrc: 'https://picsum.photos/seed/silkpolo_blue/600/800' },
    ],
  },
  {
    id: 'rw-27',
    title: 'Embroidered Jacquard Dress',
    price: '£1,795',
    tag: 'Coming Soon',
    images: [
      'https://picsum.photos/seed/jacquarddress_embellished/600/800',
      'https://picsum.photos/seed/jacquarddress_embellished_alt/600/800',
    ],
  },
  {
    id: 'rw-28',
    title: 'Double Wire Buckle Belt',
    price: '£275',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/wirebelt_brown/600/800',
      'https://picsum.photos/seed/wirebelt_brown_alt/600/800',
    ],
    colors: [
      { colorHex: '#633a1e', imgSrc: 'https://picsum.photos/seed/wirebelt_brown/600/800' },
      { colorHex: '#111111', imgSrc: 'https://picsum.photos/seed/wirebelt_black/600/800' },
    ],
  },
  {
    id: 'rw-29',
    title: 'Embroidered Henley Sweater',
    price: '£660',
    images: [
      'https://picsum.photos/seed/henleysweater_maroon/600/800',
      'https://picsum.photos/seed/henleysweater_maroon_alt/600/800',
    ],
  },
  {
    id: 'rw-30',
    title: 'Wool Pant',
    price: '£795',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/woolpant_brown/600/800',
      'https://picsum.photos/seed/woolpant_brown_alt/600/800',
    ],
    colors: [
      { colorHex: '#4a332a', imgSrc: 'https://picsum.photos/seed/woolpant_brown/600/800' },
      { colorHex: '#333333', imgSrc: 'https://picsum.photos/seed/woolpant_charcoal/600/800' },
      { colorHex: '#1e2538', imgSrc: 'https://picsum.photos/seed/woolpant_navy/600/800' },
    ],
  },
  {
    id: 'rw-31',
    title: 'Embellished Wool Cardigan',
    price: '£2,600',
    tag: 'Sold Out Online',
    images: [
      'https://picsum.photos/seed/embellishedcardigan/600/800',
      'https://picsum.photos/seed/embellishedcardigan_alt/600/800',
    ],
  },
  {
    id: 'rw-32',
    title: 'Silk Jacquard Skirt',
    price: '£830',
    tag: 'Sold Out Online',
    images: [
      'https://picsum.photos/seed/jacquardskirt_pink/600/800',
      'https://picsum.photos/seed/jacquardskirt_pink_alt/600/800',
    ],
    colors: [
      { colorHex: '#e8d0c8', imgSrc: 'https://picsum.photos/seed/jacquardskirt_pink/600/800' },
      { colorHex: '#c2d3ea', imgSrc: 'https://picsum.photos/seed/jacquardskirt_blue/600/800' },
    ],
  },
];

// Filter metadata
const FILTER_TYPES = [
  'All',
  'Dresses',
  'Tops & Shirts',
  'Sweaters',
  'Skirts',
  'Pants & Denim',
  'Jackets & Outerwear',
  'Accessories & Belts',
  'Jewelry',
];

const FILTER_STYLES = [
  'Polos',
  'Skirts',
  'Jackets',
  'Earrings',
  'Necklaces',
  'Cardigans',
  'Shirts',
  'Bodysuits',
  'Dresses',
  'Belts',
  'Trousers',
];

const FILTER_SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', '2', '4', '6', '8', '10', '12'];

const FILTER_COLORS = [
  { name: 'Black', hex: '#000000' },
  { name: 'Blue', hex: '#6B8CCE' },
  { name: 'Brown', hex: '#5C4033' },
  { name: 'Cream / White', hex: '#F6F6F6' },
  { name: 'Gold / Yellow', hex: '#D4AF37' },
  { name: 'Lavender', hex: '#C4B0D7' },
  { name: 'Pink', hex: '#E88B9C' },
  { name: 'Red / Burgundy', hex: '#8B1E2F' },
];

const FILTER_MATERIALS = [
  'Silk',
  'Wool',
  'Viscose',
  'Cotton',
  'Waxed Canvas',
  'Leather',
  'Shell & Pearl',
  'Jacquard',
];

export default function WomenswearPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Layout View Mode on Mobile: 1-col or 2-col
  const [mobileColumns, setMobileColumns] = useState<1 | 2>(2);

  // Filter & Sort State
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [showSortDropdown, setShowSortDropdown] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>('View All');
  const sortOptions = ['View All', 'Price Low To High', 'Price High To Low'];

  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  // Navbar Scroll State
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

  // Toggle Video Playback
  const handleToggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  // Prevent background scroll when filter drawer is open
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

  const clearAllFilters = () => {
    setSelectedType('All');
    setSelectedStyles([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedMaterials([]);
  };

  const totalActiveFilters = 
    (selectedType !== 'All' ? 1 : 0) +
    selectedStyles.length +
    selectedSizes.length +
    selectedColors.length +
    selectedMaterials.length;

  return (
    <main className="w-full flex flex-col min-h-screen bg-white text-gray-900 font-sans">
      
      {/* ---------------------------------------------------- */}
      {/* 1. TOP VIDEO HERO SECTION (THE RUNWAY SHOP)          */}
      {/* ---------------------------------------------------- */}
      <section className="relative w-full h-[70vh] md:h-[88vh] flex items-end justify-start overflow-hidden pt-20">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source
            src="https://tb-foundation-wordpress-assets.storage.googleapis.com/wp-content/uploads/2025/01/10202053/WebsiteVideo_3840_2160_v02_optimized.mp4"
            type="video/mp4"
          />
        </video>

        {/* Video Overlay gradient for pristine typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Hero Headline & Subtitle */}
        <div className="relative z-10 w-full px-4 md:px-[42px] pb-8 md:pb-12 flex items-end justify-between">
          <div className="max-w-2xl text-white">
            <h1 
              className="font-bold uppercase drop-shadow-sm text-[15px] leading-[17px] tracking-[0.5px] md:text-[27px] md:leading-[30px] md:tracking-[1px] md:font-bold"
            >
              THE RUNWAY SHOP
            </h1>
            <p 
              className="text-white/90 mt-1.5 md:mt-2 font-normal drop-shadow-sm max-w-xl text-[12px] leading-[14px] tracking-[0px] md:text-[16px] md:leading-[21px] md:tracking-[0px] md:font-semibold"
            >
              A new interpretation of American sportswear with touches of romance, sentimentality and craft.
            </p>
          </div>

          {/* Pause / Play Control Button */}
          <button
            onClick={handleToggleVideo}
            className="w-8 h-8 rounded-full border border-white/60 bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer"
            aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
          >
            {isVideoPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
          </button>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. FILTER & SORT TOOLBAR                             */}
      {/* ---------------------------------------------------- */}
      <div className={`w-full max-w-full px-4 md:px-8 py-4 flex justify-end items-center text-xs font-medium tracking-wider uppercase bg-white z-40 sticky transition-all duration-500 border-b border-gray-200 ${showNavbarLinks ? 'top-[64px] md:top-[108px]' : 'top-[64px]'}`}>
        {/* Right-aligned Filter, Sort & Mobile Grid Layout Toggles */}
        <div className="ml-auto flex items-center space-x-4">
          <div className="flex items-center space-x-3 cursor-pointer relative">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="font-semibold uppercase tracking-wider cursor-pointer hover:opacity-75 transition-opacity flex items-center"
            >
              Filter
              {totalActiveFilters > 0 && (
                <span className="ml-1 w-4 h-4 rounded-full bg-black text-white text-[9px] flex items-center justify-center font-bold">
                  {totalActiveFilters}
                </span>
              )}
            </button>
            <span className="text-gray-300">|</span>
            <div className="relative flex items-center">
              <button 
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="font-semibold uppercase tracking-wider cursor-pointer hover:opacity-75 transition-opacity"
              >
                Sort
              </button>

              {/* Sort Popover Dropdown */}
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

          {/* Mobile Grid Layout Toggle Icons */}
          <div className="flex space-x-2 md:hidden">
            <button
              onClick={() => setMobileColumns(1)}
              className={`w-4 h-4 border border-black cursor-pointer transition-colors ${mobileColumns === 1 ? 'bg-black' : 'bg-transparent'}`} 
              aria-label="Single column view" 
            />
            <button
              onClick={() => setMobileColumns(2)}
              className="w-4 h-4 grid grid-cols-2 gap-[1px] cursor-pointer" 
              aria-label="Two column view"
            >
              <div className={`transition-colors ${mobileColumns === 2 ? 'bg-black' : 'bg-gray-400'}`} />
              <div className={`transition-colors ${mobileColumns === 2 ? 'bg-black' : 'bg-gray-400'}`} />
              <div className={`transition-colors ${mobileColumns === 2 ? 'bg-black' : 'bg-gray-400'}`} />
              <div className={`transition-colors ${mobileColumns === 2 ? 'bg-black' : 'bg-gray-400'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 3. PRODUCT CATALOG GRID & EDITORIAL BREAKS          */}
      {/* ---------------------------------------------------- */}
      <div className="w-full px-0 py-0">

        {/* SECTION 1: Rows 1 & 2 */}
        <div className={`grid ${mobileColumns === 1 ? 'grid-cols-1 gap-y-[2px]' : 'grid-cols-2 gap-[2px]'} md:grid-cols-4 md:gap-[2px]`}>
          
          {/* Row 1 Products (3 items) */}
          {RUNWAY_SECTION_1_PRODUCTS.map((prod) => (
            <ProductCard key={prod.id} product={prod} showMobileAddToBag={true} mobileColumns={mobileColumns} />
          ))}

          {/* Feature Tile: RUNWAY EARRINGS */}
          <div className="relative aspect-[3/4] bg-[#0c2a26] text-white flex flex-col justify-end p-4 md:p-6 overflow-hidden group">
            <Image
              src="https://picsum.photos/seed/shellearrings/600/800"
              alt="Runway Earrings Feature"
              fill
              className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative z-10">
              <h3 className="text-sm md:text-[20px] font-bold tracking-widest md:tracking-[1px] md:leading-[22px] uppercase">
                RUNWAY EARRINGS
              </h3>
              <p className="text-xs md:text-[16px] text-white/90 mt-1 font-light md:font-normal tracking-wide md:tracking-[0px] md:leading-[19px]">
                Oversized yet lightweight in natural shell
              </p>
            </div>
          </div>

          {/* Row 2 Products (4 items) */}
          {RUNWAY_SECTION_1_REST.map((prod) => (
            <ProductCard key={prod.id} product={prod} showMobileAddToBag={true} mobileColumns={mobileColumns} />
          ))}
        </div>

        {/* ---------------------------------------------------- */}
        {/* EDITORIAL STORY BANNER 1: "NEW ROMANCE"              */}
        {/* ---------------------------------------------------- */}
        <section className="my-0 mb-[0.8em] md:mb-[1.8em] w-full relative">
          <div className="grid grid-cols-2 gap-0 w-full">
            <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-gray-100">
              <Image
                src="https://picsum.photos/seed/runway_necklaces_editorial/1200/900"
                alt="New Romance Jewelry Editorial"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-gray-100">
              <Image
                src="https://picsum.photos/seed/runway_models_garden/1200/900"
                alt="New Romance Group Editorial"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="hidden md:block absolute bottom-8 left-8 max-w-lg z-10 text-white drop-shadow-md">
            <h2 className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase text-white mb-2">
              NEW ROMANCE
            </h2>
            <p className="text-xs md:text-sm text-white/95 leading-relaxed">
              Opulent materials and elegant accessories worn with a sense of ease. The new Charlie is a perfect finishing touch.
            </p>
          </div>
          <div className="md:hidden w-full text-center py-4 px-4 bg-white">
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-900 mb-1">
              NEW ROMANCE
            </h2>
            <p className="text-[11px] text-gray-600 leading-snug">
              Opulent materials and elegant accessories worn with a sense of ease. The new Charlie is a perfect finishing touch.
            </p>
          </div>
        </section>

        {/* SECTION 2: Rows 3 & 4 (8 products) */}
        <div className={`grid ${mobileColumns === 1 ? 'grid-cols-1 gap-y-[2px]' : 'grid-cols-2 gap-[2px]'} md:grid-cols-4 md:gap-[2px]`}>
          {RUNWAY_SECTION_2_PRODUCTS.map((prod) => (
            <ProductCard key={prod.id} product={prod} showMobileAddToBag={true} mobileColumns={mobileColumns} />
          ))}
        </div>

        {/* ---------------------------------------------------- */}
        {/* EDITORIAL STORY BANNER 2: "BOTH SIDES NOW"           */}
        {/* ---------------------------------------------------- */}
        <section className="my-0 mb-[0.8em] md:mb-[1.8em] w-full relative">
          <div className="grid grid-cols-2 gap-0 w-full">
            <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-gray-100">
              <Image
                src="https://picsum.photos/seed/runway_macrame_bag/1200/900"
                alt="Both Sides Now Texture Editorial"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-gray-100">
              <Image
                src="https://picsum.photos/seed/runway_models_walking/1200/900"
                alt="Both Sides Now Silhouettes Editorial"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="hidden md:block absolute bottom-8 left-8 max-w-lg z-10 text-white drop-shadow-md">
            <h2 className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase text-white mb-2">
              BOTH SIDES NOW
            </h2>
            <p className="text-xs md:text-sm text-white/95 leading-relaxed">
              Exploring facets of women’s style — softness and structure, precision and imperfection
            </p>
          </div>
          <div className="md:hidden w-full text-center py-4 px-4 bg-white">
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-900 mb-1">
              BOTH SIDES NOW
            </h2>
            <p className="text-[11px] text-gray-600 leading-snug">
              Exploring facets of women’s style — softness and structure, precision and imperfection
            </p>
          </div>
        </section>

        {/* SECTION 3: Rows 5 & 6 (8 products) */}
        <div className={`grid ${mobileColumns === 1 ? 'grid-cols-1 gap-y-[2px]' : 'grid-cols-2 gap-[2px]'} md:grid-cols-4 md:gap-[2px]`}>
          {RUNWAY_SECTION_3_PRODUCTS.map((prod) => (
            <ProductCard key={prod.id} product={prod} showMobileAddToBag={true} mobileColumns={mobileColumns} />
          ))}
        </div>

        {/* ---------------------------------------------------- */}
        {/* EDITORIAL STORY BANNER 3: "A FINE BALANCE"          */}
        {/* ---------------------------------------------------- */}
        <section className="my-0 mb-[0.8em] md:mb-[1.8em] w-full relative">
          <div className="grid grid-cols-2 gap-0 w-full">
            <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-gray-100">
              <Image
                src="https://picsum.photos/seed/runway_leather_skirt_belt/1200/900"
                alt="A Fine Balance Leather & Hardware"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-gray-100">
              <Image
                src="https://picsum.photos/seed/runway_models_street/1200/900"
                alt="A Fine Balance Runway Charlie"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="hidden md:block absolute bottom-8 left-8 max-w-lg z-10 text-white drop-shadow-md">
            <h2 className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase text-white mb-2">
              A FINE BALANCE
            </h2>
            <p className="text-xs md:text-sm text-white/95 leading-relaxed">
              Femininity and strength. Slouchy polos with low-sling skirts and the gamine Runway Charlie.
            </p>
          </div>
          <div className="md:hidden w-full text-center py-4 px-4 bg-white">
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-900 mb-1">
              A FINE BALANCE
            </h2>
            <p className="text-[11px] text-gray-600 leading-snug">
              Femininity and strength. Slouchy polos with low-sling skirts and the gamine Runway Charlie.
            </p>
          </div>
        </section>

        {/* SECTION 4: Rows 7, 8 & 9 (9 products) */}
        <div className={`grid ${mobileColumns === 1 ? 'grid-cols-1 gap-y-[2px]' : 'grid-cols-2 gap-[2px]'} md:grid-cols-4 md:gap-[2px] pb-12`}>
          {RUNWAY_SECTION_4_PRODUCTS.map((prod) => (
            <ProductCard key={prod.id} product={prod} showMobileAddToBag={true} mobileColumns={mobileColumns} />
          ))}
        </div>

      </div>

      {/* ---------------------------------------------------- */}
      {/* 4. NEWSLETTER PROMO (Removed to prevent duplication) */}
      {/* ---------------------------------------------------- */}

      {/* ---------------------------------------------------- */}
      {/* 5. SLIDEOUT FILTER DRAWER                            */}
      {/* ---------------------------------------------------- */}
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
        </div>

        {/* Drawer Sticky Footer */}
        <div className="p-6 border-t border-gray-200 bg-white space-y-3">
          <p className="text-[11px] text-gray-500 text-center">
            You can select several filters at once.
          </p>
          <div className="flex space-x-3">
            <button
              onClick={clearAllFilters}
              className="flex-1 py-2.5 border border-gray-300 text-xs font-semibold tracking-widest uppercase hover:bg-gray-50 transition-colors cursor-pointer text-black"
            >
              CLEAR
            </button>
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="flex-1 bg-[#111111] text-white py-2.5 text-xs font-semibold tracking-widest uppercase hover:bg-gray-800 transition-colors cursor-pointer"
            >
              APPLY {totalActiveFilters > 0 ? `(${totalActiveFilters})` : ''}
            </button>
          </div>
        </div>
      </div>

    </main>
  );
}
