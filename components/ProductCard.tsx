'use client';

import { useState } from 'react';
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
  images: string[];
  colors?: ColorOption[];
}

export default function ProductCard({ product }: { product: Product }) {
  const { openSelectSize } = useShop();
  const [activeColorIdx, setActiveColorIdx] = useState<number>(0);
  const [currentImgSrc, setCurrentImgSrc] = useState<string>(product.images[0]);
  const [altImgSrc] = useState<string>(product.images[1] || product.images[0]);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [showingAlt, setShowingAlt] = useState<boolean>(false);

  // Quick Shop button state: 'initial' | 'loading' | 'selectSize'
  const [quickShopState, setQuickShopState] = useState<'initial' | 'loading' | 'selectSize'>('initial');

  const handleColorClick = (idx: number, imgSrc: string) => {
    setActiveColorIdx(idx);
    setCurrentImgSrc(imgSrc);
    setShowingAlt(false);
  };

  const handleSliderNav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowingAlt(!showingAlt);
  };

  const handleQuickShopClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    openSelectSize({
      id: product.id,
      title: product.title,
      price: product.price,
      image: currentImgSrc,
      color: 'Dark Roast',
    });
  };

  return (
    <div 
      className="product-card bg-white relative group flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] bg-[#f6f6f6] overflow-hidden flex items-center justify-center">
        {/* Favorite Button */}
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3.5 right-3.5 z-10 bg-transparent border-none cursor-pointer text-gray-900 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Add to wishlist"
        >
          <Heart 
            className={`w-5 h-5 ${isFavorite ? 'fill-black text-black' : 'text-gray-900'}`} 
          />
        </button>

        {/* Chevron buttons without solid background */}
        <button 
          onClick={handleSliderNav}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 bg-transparent rounded-full w-8 h-8 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10 text-gray-800 hover:scale-110"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Primary Product Image */}
        <Image
          src={showingAlt ? altImgSrc : currentImgSrc}
          alt={product.title}
          fill
          className={`object-cover transition-opacity duration-300 ${
            isHovered && !showingAlt ? 'opacity-0' : 'opacity-100'
          }`}
          referrerPolicy="no-referrer"
        />

        {/* Hover Alternate Product Image */}
        <Image
          src={altImgSrc}
          alt={`${product.title} Alternate View`}
          fill
          className={`object-cover transition-opacity duration-300 absolute inset-0 ${
            isHovered && !showingAlt ? 'opacity-100' : 'opacity-0'
          }`}
          referrerPolicy="no-referrer"
        />

        <button 
          onClick={handleSliderNav}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-transparent rounded-full w-8 h-8 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10 text-gray-800 hover:scale-110"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Quick Shop Button (Desktop & Touch) */}
        <button 
          onClick={handleQuickShopClick}
          className="hidden md:flex items-center justify-center absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 hover:bg-black hover:text-white text-gray-900 py-3 text-[11px] font-semibold uppercase tracking-wider text-center transition-all duration-300 z-10 border border-black/10 cursor-pointer opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 shadow-sm"
        >
          Quick Shop
        </button>
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

          {product.tag && (
            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-medium">
              {product.tag}
            </p>
          )}

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
        </div>
      </div>
    </div>
  );
}

