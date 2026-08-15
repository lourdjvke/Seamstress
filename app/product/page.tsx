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
  Minus
} from 'lucide-react';
import ProductCard, { Product } from '@/components/ProductCard';
import { useShop } from '@/context/ShopContext';

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

const STYLE_WITH_PRODUCT: Product = {
  id: 'style-with-1',
  title: 'Wide-Leg Cotton Pant',
  price: '£345',
  images: [
    'https://picsum.photos/seed/clothing4/400/533',
    'https://picsum.photos/seed/clothing4_alt/400/533',
  ],
  colors: [
    { colorHex: '#e5e0d8', imgSrc: 'https://picsum.photos/seed/clothing4/400/533' },
    { colorHex: '#111111', imgSrc: 'https://picsum.photos/seed/clothing12_brown/400/533' },
  ],
};

const RECENTLY_VIEWED_PRODUCTS: Product[] = [
  {
    id: 'rv-1',
    title: 'Printed Viscose Dress',
    price: '£595',
    images: [
      'https://picsum.photos/seed/clothing1/400/533',
      'https://picsum.photos/seed/clothing1_alt/400/533',
    ],
    colors: [
      { colorHex: '#000000', imgSrc: 'https://picsum.photos/seed/clothing1/400/533' },
      { colorHex: '#e1d7c6', imgSrc: 'https://picsum.photos/seed/clothing1_alt/400/533' }
    ]
  },
  {
    id: 'rv-2',
    title: 'Wool Cardigan',
    price: '£550',
    images: [
      'https://picsum.photos/seed/clothing2/400/533',
      'https://picsum.photos/seed/clothing2_alt/400/533',
    ],
  },
  {
    id: 'rv-3',
    title: 'Printed Tory Tunic',
    price: '£325',
    images: [
      'https://picsum.photos/seed/clothing9_white/400/533',
      'https://picsum.photos/seed/clothing9_alt/400/533',
    ],
    colors: [
      { colorHex: '#ffffff', imgSrc: 'https://picsum.photos/seed/clothing9_white/400/533' },
      { colorHex: '#c0a080', imgSrc: 'https://picsum.photos/seed/clothing9_alt/400/533' }
    ]
  },
  {
    id: 'rv-4',
    title: 'Tie-Back Crepe Dress',
    price: '£595',
    images: [
      'https://picsum.photos/seed/feat_dress/400/533',
      'https://picsum.photos/seed/feat_dress_alt/400/533',
    ],
  },
];

export default function ProductPage() {
  const { addToCart, openSelectSize } = useShop();
  // Desktop pinned image scroll index
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const heroSectionRef = useRef<HTMLDivElement>(null);

  // Exclusive Accordion state: only one open at a time
  const [openAccordion, setOpenAccordion] = useState<string[]>(['desc']);

  const toggleAccordion = (id: 'desc' | 'details' | 'shipping') => {
    if (openAccordion.includes(id)) {
      setOpenAccordion((prev) => prev.filter((a) => a !== id));
    } else {
      setOpenAccordion((prev) => [...prev, id]);
      const prevOpen = openAccordion.find((a) => a !== id);
      if (prevOpen) {
        setTimeout(() => {
          setOpenAccordion((prev) => prev.filter((a) => a !== prevOpen));
        }, 100);
      }
    }
  };

  // Recommendation Tab state
  const [recTab, setRecTab] = useState<'youMayAlsoLike' | 'styleWith'>('youMayAlsoLike');

  // Size state
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [showSizeDropdown, setShowSizeDropdown] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [readMoreDesc, setReadMoreDesc] = useState<boolean>(false);

  const handleProductPageAddToBag = () => {
    if (!selectedSize) {
      openSelectSize({
        id: 'silk-wool-top',
        title: 'Silk-Front Wool Top',
        price: '£395',
        color: 'Dark Roast',
        image: PRODUCT_IMAGES[0],
      });
    } else {
      addToCart({
        id: `silk-wool-top-${selectedSize}`,
        title: 'Silk-Front Wool Top',
        price: '£395',
        color: 'Dark Roast',
        size: selectedSize,
        image: PRODUCT_IMAGES[0],
        quantity: 1,
      });
    }
  };

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
            <h1 className="text-[20px] leading-[1.2] font-semibold tracking-wider uppercase text-gray-900 mb-1">
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

          {/* ADD TO BAG Button (Mobile) */}
          <button 
            onClick={handleProductPageAddToBag}
            className="w-full bg-[#2d3238] text-white py-4 text-xs font-semibold tracking-widest uppercase hover:bg-black transition-colors cursor-pointer shadow-sm"
          >
            ADD TO BAG
          </button>

          {/* Accordion List */}
          <div className="border-t border-gray-200 divide-y divide-gray-200 text-xs">
            {/* Description */}
            <div className="py-4">
              <button 
                onClick={() => toggleAccordion('desc')}
                className="w-full flex justify-between items-center text-xs font-semibold tracking-wider uppercase text-gray-900 cursor-pointer"
              >
                <span>DESCRIPTION</span>
                {openAccordion.includes('desc') ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </button>

              {openAccordion.includes('desc') && (
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
                onClick={() => toggleAccordion('details')}
                className="w-full flex justify-between items-center text-xs font-semibold tracking-wider uppercase text-gray-900 cursor-pointer"
              >
                <span>DETAILS</span>
                {openAccordion.includes('details') ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </button>

              {openAccordion.includes('details') && (
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
                onClick={() => toggleAccordion('shipping')}
                className="w-full flex justify-between items-center text-xs font-semibold tracking-wider uppercase text-gray-900 cursor-pointer"
              >
                <span>FREE SHIPPING & RETURNS</span>
                {openAccordion.includes('shipping') ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </button>

              {openAccordion.includes('shipping') && (
                <div className="mt-3 text-gray-600 leading-relaxed font-normal animate-in fade-in duration-200">
                  Enjoy complimentary standard shipping on all orders. Free returns within 14 days of receipt.
                </div>
              )}
            </div>
          </div>

          {/* Breadcrumb Links */}
          <div className="pt-2 text-xs text-gray-500">
            <span>View More </span>
            <Link href="/clothing" className="hover:text-black transition-colors text-gray-800">
              Ready-To-Wear
            </Link>
            {' | '}
            <Link href="/clothing" className="hover:text-black transition-colors text-gray-800">
              Sweaters
            </Link>
          </div>
        </div>
      </div>

      {/* DESKTOP HERO SECTION (50% Stacked Image Scroll + 50% Sticky Details Panel) */}
      <div className="hidden md:block pt-[4em]">
        <div className="w-full grid grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 50% Width Stacked Cover Images */}
          <div className="col-span-6 flex flex-col gap-0 w-full relative">
            <div className="flex flex-col gap-0 w-full">
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
                      className={`absolute top-6 right-6 z-10 bg-transparent border-none cursor-pointer opacity-0 hover:opacity-100 transition-opacity ${isFavorite ? 'opacity-100' : ''}`}
                      aria-label="Wishlist"
                    >
                      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-black text-black' : 'text-gray-900'}`} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="sticky bottom-10 z-30 w-full h-0 pointer-events-none">
              <div className="absolute bottom-0 left-6 font-semibold text-xs tracking-widest text-black">
                {activeImageIdx + 1} | {PRODUCT_IMAGES.length}
              </div>
            </div>
          </div>

          {/* Right Column: 50% Width Details Panel Centered */}
          <div className="col-span-6 sticky top-24 self-start py-4 px-6 flex justify-center">
            {/* Inner Details Container: max-width 370px and margin-left 0 */}
            <div className="w-full ml-0 max-w-[370px] 2xl:max-w-[450px] pt-[1em] space-y-3.5">
              <div>
                <h1 className="text-[20px] leading-[1.2] font-semibold tracking-wider uppercase text-gray-900 mb-1">
                  SILK-FRONT WOOL TOP
                </h1>
                <p className="text-sm text-gray-600 font-normal leading-tight">
                  £445
                </p>
              </div>

              {/* Color Swatch */}
              <div className="flex items-center justify-between border-b border-gray-200 py-2.5 text-[14px]">
                <span className="text-[#191919] font-medium">
                  Color: <span className="font-normal text-[#191919] ml-1">New Ivory / Brown Floral</span>
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
                    className="w-full flex justify-between items-center py-2.5 border-b border-gray-200 text-[14px] text-gray-900 cursor-pointer hover:border-black transition-colors"
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
                          className="w-full text-left px-4 py-2 text-[14px] hover:bg-gray-50 transition-colors text-gray-800 cursor-pointer"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <button className="text-[14px] text-gray-500 hover:text-black transition-colors cursor-pointer">
                    Size Guide
                  </button>
                </div>
              </div>

              {/* ADD TO BAG Button (Desktop) */}
              <button 
                onClick={handleProductPageAddToBag}
                className="w-full bg-black text-white py-2.5 text-xs font-semibold tracking-widest uppercase hover:bg-[#2d3238] transition-colors cursor-pointer shadow-sm my-2"
              >
                ADD TO BAG
              </button>

              {/* Accordion List (Exclusive single opening) */}
              <div className="border-t border-gray-200 divide-y divide-gray-200 text-[14px] text-[#191919]">
                {/* Description */}
                <div className="py-3">
                  <button 
                    onClick={() => toggleAccordion('desc')}
                    className="w-full flex justify-between items-center text-[12px] tracking-[.75px] leading-[18px] uppercase text-[#191919] font-[800] cursor-pointer hover:opacity-70 transition-opacity"
                  >
                    <span>DESCRIPTION</span>
                    {openAccordion.includes('desc') ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>

                  <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${openAccordion.includes('desc') ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className="mt-2.5 leading-relaxed font-normal">
                        Our silk-front wool top, reissued in an original scarf print. Crafted in a mix of printed silk twill and wool, it&apos;s a versatile piece that adds a touch of signature style.{' '}
                        {readMoreDesc ? (
                          <>
                            This beautiful piece features a tailored fit that drapes perfectly, and a subtle sheen on the front panel. It can easily transition from day to evening wear. Pair it with structured pants or a flowing skirt for an effortlessly chic look.{' '}
                            <button onClick={() => setReadMoreDesc(false)} className="underline hover:no-underline cursor-pointer font-medium">
                              Read less
                            </button>
                          </>
                        ) : (
                          <button onClick={() => setReadMoreDesc(true)} className="underline hover:no-underline cursor-pointer font-medium">
                            Read more
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="py-3">
                  <button 
                    onClick={() => toggleAccordion('details')}
                    className="w-full flex justify-between items-center text-[12px] tracking-[.75px] leading-[18px] uppercase text-[#191919] font-[800] cursor-pointer hover:opacity-70 transition-opacity"
                  >
                    <span>DETAILS</span>
                    {openAccordion.includes('details') ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>

                  <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${openAccordion.includes('details') ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className="mt-2.5 leading-relaxed font-normal space-y-1.5">
                        <p>• Body: 70% Wool, 30% Silk twill front panel</p>
                        <p>• Dry clean only</p>
                        <p>• Model is 5&apos;10&quot; (178 cm) and is wearing a US size S</p>
                        <p>• Style Number 145892</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Free Shipping & Returns */}
                <div className="py-3">
                  <button 
                    onClick={() => toggleAccordion('shipping')}
                    className="w-full flex justify-between items-center text-[12px] tracking-[.75px] leading-[18px] uppercase text-[#191919] font-[800] cursor-pointer hover:opacity-70 transition-opacity"
                  >
                    <span>FREE SHIPPING & RETURNS</span>
                    {openAccordion.includes('shipping') ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>

                  <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${openAccordion.includes('shipping') ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className="mt-2.5 leading-relaxed font-normal">
                        <p className="mb-4">
                          Great news: we offer free shipping, exchanges and returns. See Shipping Details.<br/>
                          Plus, complimentary gift wrap available at checkout.
                        </p>
                        <Image 
                          src="https://s7.toryburch.com/is/image/ToryBurch/SPR25_GiftWrap2_1000x560-1.dq-2180x1221.jpg"
                          alt="Gift Wrap"
                          width={400}
                          height={224}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Breadcrumb Links */}
              <div className="pt-1 text-xs text-gray-500">
                <span>View More </span>
                <Link href="/clothing" className="hover:text-black transition-colors text-gray-800">
                  Ready-To-Wear
                </Link>
                {' | '}
                <Link href="/clothing" className="hover:text-black transition-colors text-gray-800">
                  Sweaters
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* LOWER CONTENT SECTION (Carousel with Style With, Recently Viewed, Reviews, Search Bar) */}
      <div className="bg-white pt-16 pb-24 border-t border-gray-100">
        
        {/* YOU MAY ALSO LIKE & STYLE WITH TABS CAROUSEL */}
        <section className="mb-20 max-w-[1600px] mx-auto px-[0.8em] relative">
          <div className="flex items-center justify-center gap-[1.5em] mb-8">
            <button
              onClick={() => setRecTab('youMayAlsoLike')}
              className={`text-xs md:text-sm tracking-widest uppercase transition-all cursor-pointer ${
                recTab === 'youMayAlsoLike'
                  ? 'font-[700] text-gray-900 underline underline-offset-8 decoration-2'
                  : 'text-gray-500 hover:text-gray-900 font-normal'
              }`}
            >
              YOU MAY ALSO LIKE
            </button>
            <button
              onClick={() => setRecTab('styleWith')}
              className={`text-xs md:text-sm tracking-widest uppercase transition-all cursor-pointer ${
                recTab === 'styleWith'
                  ? 'font-[700] text-gray-900 underline underline-offset-8 decoration-2'
                  : 'text-gray-500 hover:text-gray-900 font-normal'
              }`}
            >
              STYLE WITH
            </button>
          </div>

          {recTab === 'youMayAlsoLike' ? (
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
                className="flex space-x-[2px] overflow-x-auto no-scrollbar scroll-smooth py-2"
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
          ) : (
            /* Style With: Shows 1 product centered */
            <div className="flex justify-center items-center py-4">
              <div className="w-[240px] md:w-[280px]">
                <ProductCard product={STYLE_WITH_PRODUCT} />
              </div>
            </div>
          )}
        </section>

        {/* RECENTLY VIEWED SECTION */}
        <section className="mb-20 max-w-[1600px] mx-auto px-[0.8em] relative">
          <h2 className="text-center text-xs md:text-sm font-[700] tracking-widest uppercase text-gray-900 mb-8">
            RECENTLY VIEWED
          </h2>
          
          {/* Desktop 4-column grid with 2px gap, centered */}
          <div className="hidden md:grid grid-cols-4 gap-[2px] justify-center max-w-6xl mx-auto">
            {RECENTLY_VIEWED_PRODUCTS.map((prod) => (
              <div key={prod.id} className="w-full">
                <ProductCard product={prod} />
              </div>
            ))}
          </div>

          {/* Mobile horizontal carousel */}
          <div className="md:hidden flex space-x-2 overflow-x-auto no-scrollbar scroll-smooth py-2">
            {RECENTLY_VIEWED_PRODUCTS.map((prod) => (
              <div key={prod.id} className="min-w-[200px] w-[220px] shrink-0">
                <ProductCard product={prod} />
              </div>
            ))}
          </div>
        </section>

        {/* REVIEWS SECTION */}
        <section className="text-center space-y-3 max-w-md mx-auto px-4">
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

      </div>
    </div>
  );
}
