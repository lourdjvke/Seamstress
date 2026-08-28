'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export interface ColorOption {
  colorHex: string;
  imgSrc: string;
}

export interface Product {
  id: string;
  title: string;
  price: string;
  tag?: string;
  tags?: string[];
  category?: string;
  type?: string;
  style?: string;
  size?: string[];
  material?: string;
  images: string[];
  colors?: ColorOption[];
}

export default function ProductCard({ 
  product, 
  showMobileAddToBag = false,
  mobileColumns = 2,
  onTagClick,
}: { 
  product: Product; 
  showMobileAddToBag?: boolean; 
  mobileColumns?: 1 | 2;
  onTagClick?: (tag: string) => void;
}) {
  const { openSelectSize } = useShop();
  const [activeColorIdx, setActiveColorIdx] = useState<number>(0);
  const [colorImgOverride, setColorImgOverride] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [showingAlt, setShowingAlt] = useState<boolean>(false);

  const currentImgSrc = colorImgOverride || product.images?.[0] || 'https://loremflickr.com/g/600/800/fashion,model?lock=999';
  const altImgSrc = product.images?.[1] || product.images?.[0] || currentImgSrc;

  const [quickShopState, setQuickShopState] = useState<'initial' | 'loading' | 'selectSize'>('initial');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const allImages = product.images && product.images.length > 0 ? product.images : [currentImgSrc];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.clientWidth;
    if (width > 0) {
      const index = Math.round(scrollLeft / width);
      setActiveImageIndex(index);
    }
  };

  const handleColorClick = (idx: number, imgSrc: string) => {
    setActiveColorIdx(idx);
    setColorImgOverride(imgSrc);
    setShowingAlt(false);
  };

  const handleSliderNav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowingAlt(!showingAlt);
  };

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleQuickShopMouseEnter = () => {
    if (quickShopState !== 'initial') return;
    hoverTimeoutRef.current = setTimeout(() => {
      setQuickShopState('loading');
      setTimeout(() => {
        setQuickShopState('selectSize');
      }, 600);
    }, 500);
  };

  const handleQuickShopMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleQuickShopClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setQuickShopState('loading');
    setTimeout(() => {
      setQuickShopState('selectSize');
    }, 600);
  };

  const handleSelectSizeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openSelectSize({
      id: product.id,
      title: product.title,
      price: product.price,
      image: currentImgSrc,
      color: product.colors?.[activeColorIdx]?.colorHex || 'Default',
    });
    setQuickShopState('initial');
  };

  const isUnavailable = product.tag === 'Sold Out Online' || product.tag === 'Coming Soon';

  return (
    <div 
      className="product-card bg-white relative group flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setQuickShopState('initial');
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }
      }}
    >
      <div className="relative aspect-[3/4] bg-[#f6f6f6] overflow-hidden flex items-center justify-center cursor-pointer select-none">
        
        {/* Desktop Single/Hover Image Display */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src={showingAlt ? altImgSrc : currentImgSrc}
            alt={product.title}
            fill
            className={`object-cover transition-opacity duration-300 ${
              isHovered && !showingAlt ? 'opacity-0' : 'opacity-100'
            }`}
            referrerPolicy="no-referrer"
          />
          <Image
            src={altImgSrc}
            alt={`${product.title} Alternate View`}
            fill
            className={`object-cover transition-opacity duration-300 absolute inset-0 ${
              isHovered && !showingAlt ? 'opacity-100' : 'opacity-0'
            }`}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Mobile Swipeable Gallery with snap */}
        <div 
          onScroll={handleScroll}
          className="md:hidden flex overflow-x-auto snap-x snap-mandatory scrollbar-none w-full h-full absolute inset-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {allImages.map((img, idx) => (
            <div key={idx} className="w-full h-full flex-shrink-0 snap-center relative">
              <Image
                src={img}
                alt={`${product.title} - View ${idx + 1}`}
                fill
                className="object-cover pointer-events-none"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>

        {/* Favorite Button */}
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsFavorite(!isFavorite); }}
          className={`absolute top-3.5 right-3.5 z-10 bg-transparent border-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity ${isFavorite ? 'opacity-100' : ''}`}
          aria-label="Add to wishlist"
        >
          <Heart 
            className={`w-5 h-5 ${isFavorite ? 'fill-black text-black' : 'text-gray-900'}`} 
          />
        </button>

        {/* Chevron buttons without solid background */}
        <button 
          onClick={handleSliderNav}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 bg-transparent rounded-full w-8 h-8 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10 text-gray-800 hover:scale-110 md:flex hidden"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-7 h-7 stroke-[1.5]" />
        </button>
        <button 
          onClick={handleSliderNav}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-transparent rounded-full w-8 h-8 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10 text-gray-800 hover:scale-110 md:flex hidden"
          aria-label="Next image"
        >
          <ChevronRight className="w-7 h-7 stroke-[1.5]" />
        </button>

        {/* Subtle Indicator dots on mobile */}
        {allImages.length > 1 && (
          <div className={`md:hidden absolute bottom-3 z-10 pointer-events-none flex space-x-1.5 ${
            mobileColumns === 1 ? 'right-4 left-auto' : 'left-1/2 -translate-x-1/2'
          }`}>
            {allImages.map((_, idx) => (
              <span 
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  activeImageIndex === idx ? 'bg-black' : 'bg-black/25'
                }`} 
              />
            ))}
          </div>
        )}

        {/* Quick Shop or Select Size Panel */}
        <div className={`hidden md:flex absolute bottom-2.5 left-2.5 right-2.5 transition-all duration-300 z-10 ${
          isHovered ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}>
          {isUnavailable ? null : quickShopState === 'initial' ? (
            <button 
              onClick={handleQuickShopClick}
              onMouseEnter={handleQuickShopMouseEnter}
              onMouseLeave={handleQuickShopMouseLeave}
              className="w-full bg-white/95 text-gray-900 py-3 text-[11px] font-semibold uppercase tracking-wider text-center border border-black/10 cursor-pointer shadow-sm transition-colors flex justify-center items-center h-[42px]"
            >
              Quick Shop
            </button>
          ) : quickShopState === 'loading' ? (
            <button 
              className="w-full bg-white/95 text-gray-900 py-3 text-[11px] font-semibold uppercase tracking-wider text-center border border-black/10 cursor-default shadow-sm transition-colors flex justify-center items-center h-[42px]"
            >
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
              </div>
            </button>
          ) : (
            <button 
              onClick={handleSelectSizeClick}
              className="w-full bg-white/95 text-gray-900 py-3 text-[11px] font-semibold uppercase tracking-wider text-center border border-black/10 cursor-pointer shadow-sm transition-colors flex justify-center items-center h-[42px]"
            >
              Select Size
            </button>
          )}
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3 md:p-4 flex-1 flex flex-col justify-start">
        <div>
          <h3 className="text-[12px] md:text-[13px] text-gray-900 leading-tight mb-1 font-normal">
            {product.title}
          </h3>
          <p className="text-[11px] md:text-[12px] text-gray-500 mb-1">
            {product.price}
          </p>

          {product.tags && product.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1 mt-1">
              {product.tags.map((t) => (
                <span
                  key={t}
                  onClick={(e) => {
                    if (onTagClick) {
                      e.preventDefault();
                      e.stopPropagation();
                      onTagClick(t);
                    }
                  }}
                  className={`text-[10px] uppercase tracking-wider font-medium text-gray-500 hover:text-black transition-colors ${
                    onTagClick ? 'cursor-pointer hover:underline' : ''
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          ) : product.tag ? (
            <p 
              onClick={(e) => {
                if (onTagClick && product.tag) {
                  e.preventDefault();
                  e.stopPropagation();
                  onTagClick(product.tag);
                }
              }}
              className={`text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-medium ${
                onTagClick ? 'cursor-pointer hover:text-black hover:underline' : ''
              }`}
            >
              {product.tag}
            </p>
          ) : null}

          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2">
              {product.colors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => handleColorClick(idx, color.imgSrc)}
                  className={`relative w-3.5 h-3.5 rounded-full border border-gray-300 cursor-pointer transition-all ${
                    activeColorIdx === idx ? 'ring-1 ring-black ring-offset-1' : ''
                  }`}
                  style={{ backgroundColor: color.colorHex }}
                  aria-label={`Select color option ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Mobile ADD TO BAG Button */}
          {showMobileAddToBag && !isUnavailable && (
            <button
              onClick={handleSelectSizeClick}
              className="md:hidden mt-3 text-[10px] font-semibold tracking-widest uppercase text-black border-b border-black pb-0.5 inline-block text-left cursor-pointer hover:opacity-75 transition-opacity"
            >
              ADD TO BAG
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

