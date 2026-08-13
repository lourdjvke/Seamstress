'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { useShop, CartItem } from '@/context/ShopContext';

const RECOMMENDATIONS = [
  {
    id: 'rec-bag-1',
    title: 'Charlie Quilted Shoulder Bag',
    price: '£655',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=400&q=80',
    color: 'Black',
    colors: [
      { hex: '#111111' },
      { hex: '#d2b48c' },
      { hex: '#3b4731' },
    ],
    moreColorsCount: 3,
  },
  {
    id: 'rec-bag-2',
    title: 'Kira Diamond Quilt Shoulder Bag',
    price: '£655',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80',
    color: 'Cream',
    colors: [
      { hex: '#f5f5dc' },
      { hex: '#111111' },
      { hex: '#d2b48c' },
    ],
    moreColorsCount: 2,
  },
  {
    id: 'rec-bag-3',
    title: 'Charlie Suede Shoulder Bag',
    price: '£550',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80',
    color: 'Suede Tan',
    colors: [
      { hex: '#c68b59' },
      { hex: '#b0c4de' },
      { hex: '#f0f0f0' },
    ],
    moreColorsCount: 3,
  },
  {
    id: 'rec-bag-4',
    title: 'Charlie Leather Tote Bag',
    price: '£595',
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=400&q=80',
    color: 'Dark Roast',
    colors: [
      { hex: '#4a2c11' },
    ],
    moreColorsCount: 1,
  },
];

export default function CartSidebar() {
  const { isCartOpen, closeCart, cartItems, removeFromCart, formattedSubtotal, addToCart } = useShop();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when cart sidebar is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -160 : 160;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleAddRecToCart = (rec: typeof RECOMMENDATIONS[0]) => {
    addToCart({
      id: rec.id,
      title: rec.title,
      price: rec.price,
      color: rec.color,
      image: rec.image,
      quantity: 1,
    });
  };

  return (
    <>
      {/* Dark Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/40 z-[80] transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Cart Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[350px] bg-white z-[90] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between shrink-0">
          <h2 className="text-sm font-bold tracking-[0.18em] text-gray-900 uppercase">
            SHOPPING BAG
          </h2>
          <button
            onClick={closeCart}
            className="p-1 text-gray-500 hover:text-black cursor-pointer transition-colors"
            aria-label="Close Shopping Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="p-8 text-center text-gray-500 my-auto">
              <p className="text-sm mb-4 font-normal">Your shopping bag is currently empty.</p>
              <button
                onClick={closeCart}
                className="inline-block px-6 py-2.5 bg-[#1a1a1a] text-white text-xs font-semibold uppercase tracking-wider hover:bg-black"
              >
                Shop New Arrivals
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size || ''}`} className="p-5 flex gap-4">
                  <div className="relative w-20 h-24 bg-[#f6f6f6] shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between text-[13px] text-gray-800">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-normal text-gray-900 leading-snug">{item.title}</h3>
                        <span className="font-bold text-gray-900 shrink-0">{item.price}</span>
                      </div>
                      {item.color && (
                        <p className="text-gray-500 text-xs mt-1">Color: {item.color}</p>
                      )}
                      {item.size && (
                        <p className="text-gray-500 text-xs mt-0.5">Size: {item.size}</p>
                      )}
                      <p className="text-gray-500 text-xs mt-0.5">Qty: {item.quantity}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-gray-400 hover:text-black transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Subtotal & Checkout Section */}
          <div className="p-5 border-t border-b border-gray-200 bg-white">
            <div className="flex justify-between items-center mb-4 text-sm">
              <span className="font-semibold text-gray-900">Subtotal</span>
              <span className="font-bold text-gray-900">{formattedSubtotal}</span>
            </div>

            <button
              onClick={() => {
                alert('Proceeding to Tory Burch Checkout...');
              }}
              className="w-full bg-[#1a1a1a] hover:bg-black text-white py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition-colors cursor-pointer"
            >
              REVIEW & CHECKOUT
            </button>
          </div>

          {/* YOU MAY ALSO LIKE Carousel Section */}
          <div className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-900">
                YOU MAY ALSO LIKE
              </h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => scrollCarousel('left')}
                  className="w-7 h-7 flex items-center justify-center border border-gray-300 hover:border-black cursor-pointer text-gray-700"
                  aria-label="Previous recommendation"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollCarousel('right')}
                  className="w-7 h-7 flex items-center justify-center border border-dashed border-gray-400 hover:border-black cursor-pointer text-gray-700"
                  aria-label="Next recommendation"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Recommendations Row */}
            <div
              ref={carouselRef}
              className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth pb-2"
            >
              {RECOMMENDATIONS.map((rec) => (
                <div
                  key={rec.id}
                  className="w-[120px] shrink-0 group cursor-pointer"
                  onClick={() => handleAddRecToCart(rec)}
                >
                  <div className="relative aspect-[3/4] bg-[#f6f6f6] overflow-hidden mb-2">
                    <Image
                      src={rec.image}
                      alt={rec.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="text-[11px] text-gray-900 leading-tight font-normal line-clamp-2">
                    {rec.title}
                  </h4>
                  <p className="text-[11px] font-medium text-gray-600 mt-0.5">{rec.price}</p>

                  <div className="flex items-center gap-1 mt-1.5">
                    {rec.colors.map((c, idx) => (
                      <span
                        key={idx}
                        className="w-2.5 h-2.5 rounded-full border border-gray-300 inline-block"
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                    {rec.moreColorsCount && (
                      <span className="text-[9px] text-gray-400">+{rec.moreColorsCount}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
