'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronDown } from 'lucide-react';
import { useShop, ProductForSize } from '@/context/ShopContext';

const DEFAULT_SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export default function SelectSizeSidebar() {
  const { isSelectSizeOpen, closeSelectSize, selectedProductForSize, addToCart } = useShop();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [cachedProduct, setCachedProduct] = useState<ProductForSize | null>(null);

  useEffect(() => {
    if (selectedProductForSize) {
      setCachedProduct(selectedProductForSize);
    }
  }, [selectedProductForSize]);

  // Lock body scroll when size sidebar is open
  useEffect(() => {
    if (isSelectSizeOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSelectSizeOpen]);

  const activeProduct = selectedProductForSize || cachedProduct;
  if (!activeProduct) return null;

  const handleAddToBag = () => {
    const sizeToUse = selectedSize || 'M';
    addToCart({
      id: `${activeProduct.id}-${sizeToUse}`,
      title: activeProduct.title,
      price: activeProduct.price,
      color: activeProduct.color || 'Dark Roast',
      size: sizeToUse,
      image: activeProduct.image,
      quantity: 1,
    });
    closeSelectSize();
  };

  const sizesToRender = activeProduct.sizes || DEFAULT_SIZES;

  return (
    <>
      {/* Dark Overlay */}
      <div
        onClick={closeSelectSize}
        className={`fixed inset-0 bg-black/40 z-[80] transition-opacity duration-300 ${
          isSelectSizeOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Select Size Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[320px] bg-white z-[90] shadow-2xl flex flex-col p-6 transition-transform duration-300 ease-in-out ${
          isSelectSizeOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-transparent">
          <h2 className="text-xs font-bold tracking-[0.18em] text-gray-900 uppercase">
            SELECT A SIZE
          </h2>
          <button
            onClick={closeSelectSize}
            className="p-1 text-gray-600 hover:text-black transition-colors cursor-pointer"
            aria-label="Close Size Selection"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Preview */}
        <div className="flex gap-4 py-4 mb-2">
          <div className="relative w-24 h-28 bg-[#f6f6f6] overflow-hidden shrink-0">
            <Image
              src={activeProduct.image}
              alt={activeProduct.title}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex-1 text-xs text-gray-800 space-y-1 pt-1">
            <h3 className="font-normal text-gray-900 text-[13px] leading-tight">
              {activeProduct.title}
            </h3>
            <p className="font-semibold text-gray-900 pt-0.5">{activeProduct.price}</p>
            {activeProduct.color && (
              <p className="text-gray-500 text-[11px] pt-1">
                Color <span className="text-gray-900 font-normal">{activeProduct.color}</span>
              </p>
            )}
          </div>
        </div>

        {/* Size Selection Dropdown */}
        <div className="relative my-4">
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 text-xs text-gray-800 bg-white appearance-none cursor-pointer focus:outline-none focus:border-black font-normal"
          >
            <option value="">Select Size</option>
            {sizesToRender.map((sz) => (
              <option key={sz} value={sz}>
                {sz}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>

        {/* ADD TO BAG Button */}
        <button
          onClick={handleAddToBag}
          className="w-full bg-[#1a1a1a] hover:bg-black text-white py-3 text-xs font-bold uppercase tracking-[0.2em] transition-colors cursor-pointer mt-2"
        >
          ADD TO BAG
        </button>
      </div>
    </>
  );
}
