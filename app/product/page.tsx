'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  Plus, 
  Minus,
  Search
} from 'lucide-react';
import ProductCard, { Product } from '@/components/ProductCard';

const PRODUCT_IMAGES = [
  'https://picsum.photos/seed/silk_wool_top_main/800/1000',
  'https://picsum.photos/seed/silk_wool_top_model/800/1000',
  'https://picsum.photos/seed/silk_wool_top_back/800/1000',
  'https://picsum.photos/seed/silk_wool_top_detail/800/1000',
  'https://picsum.photos/seed/silk_wool_top_outfit/800/1000',
];

const YOU_MAY_ALSO_LIKE_PRODUCTS: Product[] = [
  {
    id: 'rec-1',
    title: 'Merino Wool Sweater',
    price: '£395',
    images: [
      'https://picsum.photos/seed/rec_merino_black/400/533',
      'https://picsum.photos/seed/rec_merino_black_alt/400/533',
    ],
    colors: [
      { colorHex: '#111111', imgSrc: 'https://picsum.photos/seed/rec_merino_black/400/533' },
      { colorHex: '#d2b48c', imgSrc: 'https://picsum.photos/seed/rec_merino_tan/400/533' },
      { colorHex: '#5c4033', imgSrc: 'https://picsum.photos/seed/rec_merino_brown/400/533' },
    ],
  },
  {
    id: 'rec-2',
    title: 'Wool Scalloped Top',
    price: '£295',
    images: [
      'https://picsum.photos/seed/rec_scalloped/400/533',
      'https://picsum.photos/seed/rec_scalloped_alt/400/533',
    ],
    colors: [
      { colorHex: '#111111', imgSrc: 'https://picsum.photos/seed/rec_scalloped/400/533' },
      { colorHex: '#c8c8e6', imgSrc: 'https://picsum.photos/seed/rec_scalloped_blue/400/533' },
    ],
  },
  {
    id: 'rec-3',
    title: 'Merino Wool Sweater',
    price: '£395',
    images: [
      'https://picsum.photos/seed/rec_merino_tan/400/533',
      'https://picsum.photos/seed/rec_merino_tan_alt/400/533',
    ],
    colors: [
      { colorHex: '#d2b48c', imgSrc: 'https://picsum.photos/seed/rec_merino_tan/400/533' },
      { colorHex: '#111111', imgSrc: 'https://picsum.photos/seed/rec_merino_black/400/533' },
      { colorHex: '#5c4033', imgSrc: 'https://picsum.photos/seed/rec_merino_brown/400/533' },
    ],
  },
  {
    id: 'rec-4',
    title: 'Merino Wool Sweater',
    price: '£395',
    images: [
      'https://picsum.photos/seed/rec_merino_brown/400/533',
      'https://picsum.photos/seed/rec_merino_brown_alt/400/533',
    ],
    colors: [
      { colorHex: '#5c4033', imgSrc: 'https://picsum.photos/seed/rec_merino_brown/400/533' },
      { colorHex: '#d2b48c', imgSrc: 'https://picsum.photos/seed/rec_merino_tan/400/533' },
      { colorHex: '#111111', imgSrc: 'https://picsum.photos/seed/rec_merino_black/400/533' },
    ],
  },
  {
    id: 'rec-5',
    title: 'Wool Cardigan',
    price: '£550',
    images: [
      'https://picsum.photos/seed/rec_cardigan_beige/400/533',
      'https://picsum.photos/seed/rec_cardigan_beige_alt/400/533',
    ],
    colors: [
      { colorHex: '#d2b48c', imgSrc: 'https://picsum.photos/seed/rec_cardigan_beige/400/533' },
      { colorHex: '#111111', imgSrc: 'https://picsum.photos/seed/rec_cardigan_black/400/533' },
      { colorHex: '#5c4033', imgSrc: 'https://picsum.photos/seed/rec_cardigan_brown/400/533' },
    ],
  },
  {
    id: 'rec-6',
    title: 'Silk Polo Cardigan',
    price: '£770',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/rec_silk_polo_blue/400/533',
      'https://picsum.photos/seed/rec_silk_polo_blue_alt/400/533',
    ],
  },
  {
    id: 'rec-7',
    title: 'Silk Polo',
    price: '£595',
    tag: 'Runway',
    images: [
      'https://picsum.photos/seed/rec_silk_polo_charcoal/400/533',
      'https://picsum.photos/seed/rec_silk_polo_charcoal_alt/400/533',
    ],
    colors: [
      { colorHex: '#333333', imgSrc: 'https://picsum.photos/seed/rec_silk_polo_charcoal/400/533' },
      { colorHex: '#d8b4e2', imgSrc: 'https://picsum.photos/seed/rec_silk_polo_purple/400/533' },
      { colorHex: '#c0d6e4', imgSrc: 'https://picsum.photos/seed/rec_silk_polo_light_blue/400/533' },
    ],
  },
  {
    id: 'rec-8',
    title: 'Wool Cardigan',
    price: '£595',
    images: [
      'https://picsum.photos/seed/rec_cardigan_green/400/533',
      'https://picsum.photos/seed/rec_cardigan_green_alt/400/533',
    ],
    colors: [
      { colorHex: '#005a36', imgSrc: 'https://picsum.photos/seed/rec_cardigan_green/400/533' },
      { colorHex: '#222222', imgSrc: 'https://picsum.photos/seed/rec_cardigan_black/400/533' },
    ],
  },
];

export default function ProductPage() {
  // Desktop pinned image scroll index
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const heroSectionRef = useRef<HTMLDivElement>(null);

  // Accordion states
  const [isDescOpen, setIsDescOpen] = useState<boolean>(true);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [isShippingOpen, setIsShippingOpen] = useState<boolean>(false);

  // Size state
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [showSizeDropdown, setShowSizeDropdown] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // Mobile Carousel index
  const [mobileSlideIdx, setMobileSlideIdx] = useState<number>(0);

  // "You May Also Like" Carousel scroll state
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  // Track active image in view on desktop scroll
  useEffect(() => {
    const handleScroll = () => {
      const imageElements = document.querySelectorAll('.desktop-product-img');
      imageElements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        // If image top is near viewport upper third
        if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
          setActiveImageIdx(idx);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Carousel scroll listeners
  const checkCarouselScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    checkCarouselScroll();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkCarouselScroll);
      return () => carousel.removeEventListener('scroll', checkCarouselScroll);
    }
  }, []);

  const handleScrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.75;
    carouselRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pt-[0.8em]">
      {/* Mobile Top Breadcrumb */}
      <div className="md:hidden pt-28 px-4 pb-2 text-xs text-gray-500 font-normal">
        <Link href="/clothing" className="underline hover:no-underline text-gray-600">
          Ready-To-Wear
        </Link>
        {' / '}
        <span className="text-gray-900 font-medium">Sweaters</span>
      </div>

      {/* MOBILE HERO SECTION (Sticky image underneath, scrolling details cover over) */}
      <div className="md:hidden">
        {/* Sticky Mobile Image Gallery */}
        <div className="sticky top-20 z-0 bg-[#f6f6f6] w-full aspect-[3/4] relative overflow-hidden">
          <Image 
            src={PRODUCT_IMAGES[mobileSlideIdx]}
            alt={`Silk-Front Wool Top View ${mobileSlideIdx + 1}`}
            fill
            className="object-cover transition-opacity duration-300"
            referrerPolicy="no-referrer"
            priority
          />

          {/* Favorite Button */}
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 z-10 text-gray-900 p-1"
            aria-label="Wishlist"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-black text-black' : 'text-gray-900'}`} />
          </button>

          {/* Mobile Dot Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
            {PRODUCT_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setMobileSlideIdx(idx)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  mobileSlideIdx === idx ? 'bg-black w-3' : 'bg-gray-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Sliding White Details Panel Over Image */}
        <div className="relative z-10 bg-white pt-6 px-5 pb-12 rounded-t-xl shadow-[0_-10px_25px_rgba(0,0,0,0.05)] space-y-6">
          <div>
            <h1 className="text-base font-semibold tracking-wider uppercase text-gray-900 mb-1">
              SILK-FRONT WOOL TOP
            </h1>
            <p className="text-sm text-gray-600 font-normal">
              £445
            </p>
          </div>

          {/* Color Option */}
          <div className="flex items-center justify-between border-t border-b border-gray-100 py-3 text-xs">
            <span className="text-gray-900">
              Color: <span className="font-normal text-gray-600">New Ivory / Brown Floral</span>
            </span>
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-gray-300 ring-1 ring-black ring-offset-1 cursor-pointer">
              <Image 
                src="https://picsum.photos/seed/floral_swatch/100/100" 
                alt="Color Swatch"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Size Dropdown Selector */}
          <div className="space-y-2">
            <div className="relative">
              <button 
                onClick={() => setShowSizeDropdown(!showSizeDropdown)}
                className="w-full flex justify-between items-center py-3 border-b border-gray-200 text-xs text-gray-900 cursor-pointer"
              >
                <span>
                  Size <span className="text-gray-500 ml-2">{selectedSize || 'Select Size'}</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showSizeDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showSizeDropdown && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-30 py-2 mt-1">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSelectedSize(s);
                        setShowSizeDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs hover:bg-gray-50 transition-colors text-gray-800"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button className="text-xs text-gray-500 underline hover:no-underline cursor-pointer">
                Size Guide
              </button>
            </div>
          </div>

          {/* ADD TO BAG Button */}
          <button className="w-full bg-[#2d3238] text-white py-4 text-xs font-semibold tracking-widest uppercase hover:bg-black transition-colors cursor-pointer shadow-sm">
            ADD TO BAG
          </button>

          {/* Accordion List */}
          <div className="border-t border-gray-200 divide-y divide-gray-200 text-xs">
            {/* Description */}
            <div className="py-4">
              <button 
                onClick={() => setIsDescOpen(!isDescOpen)}
                className="w-full flex justify-between items-center text-xs font-semibold tracking-wider uppercase text-gray-900 cursor-pointer"
              >
                <span>DESCRIPTION</span>
                {isDescOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </button>

              {isDescOpen && (
                <div className="mt-3 text-gray-600 leading-relaxed font-normal animate-in fade-in duration-200">
                  Our silk-front wool top, reissued in an original scarf print. Crafted in a mix of printed silk twill and wool, it&apos;s a versatile piece that adds a touch of signature style.{' '}
                  <button className="text-gray-900 underline hover:no-underline cursor-pointer font-medium">
                    Read more
                  </button>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="py-4">
              <button 
                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                className="w-full flex justify-between items-center text-xs font-semibold tracking-wider uppercase text-gray-900 cursor-pointer"
              >
                <span>DETAILS</span>
                {isDetailsOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </button>

              {isDetailsOpen && (
                <div className="mt-3 text-gray-600 leading-relaxed font-normal animate-in fade-in duration-200 space-y-2">
                  <p>• Body: 70% Wool, 30% Silk twill front panel</p>
                  <p>• Dry clean only</p>
                  <p>• Model is 5&apos;10&quot; (178 cm) and is wearing a US size S</p>
                  <p>• Style Number 145892</p>
                </div>
              )}
            </div>

            {/* Free Shipping & Returns */}
            <div className="py-4">
              <button 
                onClick={() => setIsShippingOpen(!isShippingOpen)}
                className="w-full flex justify-between items-center text-xs font-semibold tracking-wider uppercase text-gray-900 cursor-pointer"
              >
                <span>FREE SHIPPING & RETURNS</span>
                {isShippingOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </button>

              {isShippingOpen && (
                <div className="mt-3 text-gray-600 leading-relaxed font-normal animate-in fade-in duration-200">
                  Enjoy complimentary standard shipping on all orders. Free returns within 14 days of receipt.
                </div>
              )}
            </div>
          </div>

          {/* Breadcrumb Links */}
          <div className="pt-2 text-xs text-gray-500">
            <span>View More </span>
            <Link href="/clothing" className="underline hover:no-underline text-gray-800">
              Ready-To-Wear
            </Link>
            {' | '}
            <Link href="/clothing" className="underline hover:no-underline text-gray-800">
              Sweaters
            </Link>
          </div>
        </div>
      </div>

      {/* DESKTOP HERO SECTION (Natural Stacked Image Scroll + Sticky 350px Info Right) */}
      <div className="hidden md:block pt-20">
        <div className="w-full grid grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Stacked Cover Images (7 Cols) - Touching left screen edge */}
          <div className="col-span-7 flex flex-col gap-0 w-full relative">
            {PRODUCT_IMAGES.map((imgSrc, idx) => (
              <div 
                key={idx} 
                className="desktop-product-img relative w-full aspect-[3/4] bg-[#f6f6f6] overflow-hidden"
              >
                <Image 
                  src={imgSrc}
                  alt={`Silk-Front Wool Top View ${idx + 1}`}
                  fill
                  className="object-cover w-full h-full"
                  referrerPolicy="no-referrer"
                  priority={idx === 0}
                />

                {/* Wishlist Heart Icon on first image */}
                {idx === 0 && (
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="absolute top-6 right-6 z-10 text-gray-900 cursor-pointer hover:scale-110 transition-transform"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-black text-black' : 'text-gray-900'}`} />
                  </button>
                )}
              </div>
            ))}

            {/* Floating Overlay Counter "1|5" at bottom-left of image scroll side */}
            <div className="sticky bottom-6 left-6 self-start ml-6 mb-6 -mt-12 z-20 font-semibold text-xs tracking-widest text-gray-900 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-sm shadow-sm pointer-events-none">
              {activeImageIdx + 1} | {PRODUCT_IMAGES.length}
            </div>
          </div>

          {/* Right Column: Sticky 350px Details Panel (5 Cols) Centered in its area */}
          <div className="col-span-5 sticky top-24 self-start py-4 px-6 flex justify-center">
            {/* Inner Details Container constrained to 350px max-width */}
            <div className="w-full max-w-[350px] space-y-3">
              <div>
                <h1 className="text-base font-semibold tracking-wider uppercase text-gray-900 leading-tight mb-1">
                  SILK-FRONT WOOL TOP
                </h1>
                <p className="text-sm text-gray-600 font-normal leading-tight">
                  £445
                </p>
              </div>

              {/* Color Swatch */}
              <div className="flex items-center justify-between border-t border-b border-gray-200 py-2.5 text-xs">
                <span className="text-gray-900 font-medium">
                  Color: <span className="font-normal text-gray-600 ml-1">New Ivory / Brown Floral</span>
                </span>
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-gray-300 ring-1 ring-black ring-offset-1 cursor-pointer hover:scale-105 transition-transform">
                  <Image 
                    src="https://picsum.photos/seed/floral_swatch/100/100" 
                    alt="Color Swatch"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-1.5">
                <div className="relative">
                  <button 
                    onClick={() => setShowSizeDropdown(!showSizeDropdown)}
                    className="w-full flex justify-between items-center py-2.5 border-b border-gray-200 text-xs text-gray-900 cursor-pointer hover:border-black transition-colors"
                  >
                    <span>
                      Size <span className="text-gray-500 ml-2">{selectedSize || 'Select Size'}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showSizeDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showSizeDropdown && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-xl z-30 py-2 mt-1">
                      {sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            setSelectedSize(s);
                            setShowSizeDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs hover:bg-gray-50 transition-colors text-gray-800 cursor-pointer"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <button className="text-xs text-gray-500 underline hover:no-underline cursor-pointer">
                    Size Guide
                  </button>
                </div>
              </div>

              {/* ADD TO BAG Button */}
              <button className="w-full bg-[#2d3238] text-white py-3.5 text-xs font-semibold tracking-widest uppercase hover:bg-black transition-colors cursor-pointer shadow-sm my-2">
                ADD TO BAG
              </button>

              {/* Accordion List */}
              <div className="border-t border-gray-200 divide-y divide-gray-200 text-xs">
                {/* Description */}
                <div className="py-3">
                  <button 
                    onClick={() => setIsDescOpen(!isDescOpen)}
                    className="w-full flex justify-between items-center text-xs font-semibold tracking-widest uppercase text-gray-900 cursor-pointer hover:opacity-70 transition-opacity"
                  >
                    <span>DESCRIPTION</span>
                    {isDescOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>

                  {isDescOpen && (
                    <div className="mt-2.5 text-gray-600 leading-relaxed font-normal animate-in fade-in duration-200">
                      Our silk-front wool top, reissued in an original scarf print. Crafted in a mix of printed silk twill and wool, it&apos;s a versatile piece that adds a touch...{' '}
                      <button className="text-gray-900 underline hover:no-underline cursor-pointer font-medium">
                        Read more
                      </button>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="py-3">
                  <button 
                    onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                    className="w-full flex justify-between items-center text-xs font-semibold tracking-widest uppercase text-gray-900 cursor-pointer hover:opacity-70 transition-opacity"
                  >
                    <span>DETAILS</span>
                    {isDetailsOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>

                  {isDetailsOpen && (
                    <div className="mt-2.5 text-gray-600 leading-relaxed font-normal animate-in fade-in duration-200 space-y-1.5">
                      <p>• Body: 70% Wool, 30% Silk twill front panel</p>
                      <p>• Dry clean only</p>
                      <p>• Model is 5&apos;10&quot; (178 cm) and is wearing a US size S</p>
                      <p>• Style Number 145892</p>
                    </div>
                  )}
                </div>

                {/* Free Shipping & Returns */}
                <div className="py-3">
                  <button 
                    onClick={() => setIsShippingOpen(!isShippingOpen)}
                    className="w-full flex justify-between items-center text-xs font-semibold tracking-widest uppercase text-gray-900 cursor-pointer hover:opacity-70 transition-opacity"
                  >
                    <span>FREE SHIPPING & RETURNS</span>
                    {isShippingOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>

                  {isShippingOpen && (
                    <div className="mt-2.5 text-gray-600 leading-relaxed font-normal animate-in fade-in duration-200">
                      Enjoy complimentary standard shipping on all orders. Free returns within 14 days of receipt.
                    </div>
                  )}
                </div>
              </div>

              {/* Breadcrumb Links */}
              <div className="pt-1 text-xs text-gray-500">
                <span>View More </span>
                <Link href="/clothing" className="underline hover:no-underline text-gray-800">
                  Ready-To-Wear
                </Link>
                {' | '}
                <Link href="/clothing" className="underline hover:no-underline text-gray-800">
                  Sweaters
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* LOWER CONTENT SECTION (Carousel, Reviews, Search Bar) */}
      <div className="bg-white pt-16 pb-24 border-t border-gray-100">
        
        {/* YOU MAY ALSO LIKE CAROUSEL */}
        <section className="mb-20 max-w-[1600px] mx-auto px-4 md:px-8 relative">
          <h2 className="text-center text-sm md:text-base font-semibold tracking-widest uppercase text-gray-900 mb-8">
            YOU MAY ALSO LIKE
          </h2>

          <div className="relative group/carousel">
            {/* Left Chevron Button */}
            {canScrollLeft && (
              <button 
                onClick={() => handleScrollCarousel('left')}
                className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white border border-gray-200 shadow-md rounded-full items-center justify-center cursor-pointer text-gray-800 hover:scale-110 transition-transform"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Carousel Container */}
            <div 
              ref={carouselRef}
              className="flex space-x-3 md:space-x-4 overflow-x-auto no-scrollbar scroll-smooth py-2"
            >
              {YOU_MAY_ALSO_LIKE_PRODUCTS.map((prod) => (
                <div key={prod.id} className="min-w-[200px] w-[220px] md:min-w-[280px] md:w-[300px] shrink-0">
                  <ProductCard product={prod} />
                </div>
              ))}
            </div>

            {/* Right Chevron Button */}
            {canScrollRight && (
              <button 
                onClick={() => handleScrollCarousel('right')}
                className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white border border-gray-200 shadow-md rounded-full items-center justify-center cursor-pointer text-gray-800 hover:scale-110 transition-transform"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </section>

        {/* REVIEWS SECTION */}
        <section className="mb-20 text-center space-y-3 max-w-md mx-auto px-4">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-900">
            REVIEWS
          </h2>
          <p className="text-xs text-gray-600">
            No reviews yet.{' '}
            <button className="text-gray-900 underline hover:no-underline font-medium cursor-pointer">
              Write the first review
            </button>
          </p>
        </section>

        {/* LOOKING FOR SOMETHING ELSE? SEARCH BAR */}
        <section className="text-center space-y-4 max-w-md mx-auto px-4">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-900">
            LOOKING FOR SOMETHING ELSE?
          </h2>
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full bg-gray-100 hover:bg-gray-200/70 focus:bg-white border border-transparent focus:border-gray-300 rounded-full py-3 pl-10 pr-4 text-xs text-gray-900 placeholder-gray-500 outline-none transition-all"
            />
          </div>
        </section>

      </div>
    </div>
  );
}
