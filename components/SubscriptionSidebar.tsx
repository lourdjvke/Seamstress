'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Check } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export default function SubscriptionSidebar() {
  const { isSubscriptionOpen, closeSubscription } = useShop();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
        closeSubscription();
      }, 2000);
    }
  };

  return (
    <>
      {/* Dark Backdrop Overlay */}
      <div
        onClick={closeSubscription}
        className={`fixed inset-0 bg-black/40 z-[80] transition-opacity duration-300 ${
          isSubscriptionOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Subscription Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[350px] bg-white z-[90] shadow-2xl flex flex-col overflow-y-auto transition-transform duration-300 ease-in-out ${
          isSubscriptionOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Top Close Button Overlay */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={closeSubscription}
            className="w-8 h-8 flex items-center justify-center border border-dashed border-gray-400 bg-white/90 hover:bg-white text-gray-900 transition-colors cursor-pointer"
            aria-label="Close Subscription Drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Top Campaign Image Banner */}
        <div className="relative w-full h-[220px] bg-gray-100 shrink-0">
          <Image
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
            alt="Tory Burch Campaign"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 flex-1 flex flex-col justify-center text-center">
          <h2 className="text-lg md:text-xl font-bold tracking-[0.1em] text-gray-900 uppercase mb-4 leading-tight">
            TAKE 10% OFF YOUR FIRST ORDER OF £200+
          </h2>

          <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-8">
            Your first Tory Burch purchase of £200 or more, online or in boutiques, when you sign up for emails. Exclusions apply.
          </p>

          {submitted ? (
            <div className="bg-emerald-50 text-emerald-800 p-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                required
                className="w-full border border-gray-300 px-4 py-3.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black font-normal"
              />

              <button
                type="submit"
                className="w-full bg-[#1a1a1a] hover:bg-black text-white py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition-colors cursor-pointer"
              >
                SIGN UP
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
