'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Check } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export default function SubscriptionSidebar() {
  const { isSubscriptionOpen, closeSubscription } = useShop();
  
  // Shared state
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  // Lock body scroll when subscription sidebar is open
  useEffect(() => {
    if (isSubscriptionOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSubscriptionOpen]);

  const showExpanded = isFocused || email.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setSubmitted(true);
        setSubmittedEmail(email);
      }, 1400);
    }
  };

  const handleClose = () => {
    closeSubscription();
    // Reset form after animation
    setTimeout(() => {
      setEmail('');
      setIsFocused(false);
      setSubmitted(false);
      setIsLoading(false);
      setSubmittedEmail('');
    }, 350);
  };

  return (
    <>
      {/* Dark Backdrop Overlay */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-black/40 z-[80] transition-opacity duration-350 ease-out ${
          isSubscriptionOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* --- DESKTOP SIDEBAR (width increased by 30px to 410px) --- */}
      <div
        className={`hidden md:flex fixed top-0 right-0 h-full w-[410px] bg-white z-[90] shadow-2xl flex-col overflow-y-auto transition-transform duration-300 ease-in-out ${
          isSubscriptionOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center border border-dashed border-gray-400 bg-white/90 hover:bg-white text-gray-900 transition-colors cursor-pointer"
            aria-label="Close Subscription Drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

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

        {/* Content placed directly below the image */}
        <div className="p-6 md:px-8 flex-none flex flex-col justify-start text-center pt-6">
          {submitted ? (
            <div className="flex flex-col items-center justify-start pt-4">
              <h2 className="text-[16px] font-semibold tracking-[1.8px] uppercase text-[#111] mb-3">
                Confirmed - Thank You
              </h2>
              <p className="text-[12px] text-[#333] leading-snug mb-6 max-w-[290px]">
                You&apos;ve been added to our email list as<br />
                <span className="font-normal text-[#111] block mt-1 break-all">{submittedEmail}</span>
              </p>
              <button
                onClick={handleClose}
                className="w-full h-[48px] bg-[#1a1a1a] text-white text-[11px] font-semibold tracking-[2px] uppercase cursor-pointer hover:bg-black transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-bold tracking-[0.08em] text-gray-900 uppercase mb-2.5 leading-tight">
                TAKE 10% OFF YOUR FIRST ORDER OF £200+
              </h2>
              <p className="text-[13px] text-gray-600 leading-tight mb-5">
                Your first Tory Burch purchase of £200 or more, online or in boutiques, when you sign up for emails. Exclusions apply.
              </p>

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
                  disabled={isLoading}
                  className="w-full bg-[#1a1a1a] hover:bg-black text-white py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition-colors cursor-pointer flex justify-center items-center h-[48px]"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-[pulseDots_1.2s_infinite_ease-in-out]" />
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-[pulseDots_1.2s_infinite_ease-in-out_0.2s]" />
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-[pulseDots_1.2s_infinite_ease-in-out_0.4s]" />
                    </div>
                  ) : (
                    'SIGN UP'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* --- MOBILE BOTTOM SHEET (hidden on desktop) --- */}
      <div
        className={`md:hidden fixed bottom-0 left-0 w-full bg-white rounded-t-[12px] z-[90] pb-[34px] pt-[10px] px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.12)] transform transition-transform duration-[380ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isSubscriptionOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="w-[80px] h-[3.5px] bg-[#d1d2d4] rounded-[2px] mx-auto mb-4" />
        
        <button
          onClick={handleClose}
          className="absolute top-[20px] right-[20px] p-1.5 bg-transparent border-none cursor-pointer z-10"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#111] stroke-[1.5] fill-none">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {!submitted ? (
          <div>
            <h2 className="text-[16.5px] font-semibold tracking-[1.8px] uppercase text-center leading-[1.4] text-[#111] mt-2.5 mb-[14px] px-2.5">
              Take 10% off your first order of £200+
            </h2>
            <p className="text-[12.5px] leading-[1.55] text-center text-[#333] mb-6 font-normal px-1">
              Your first Tory Burch purchase of £200 or more, online or in boutiques, when you sign up for emails. Exclusions apply.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="relative mb-4 w-full">
                <input
                  type="email"
                  id="mobileEmailInput"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="peer w-full h-[52px] border border-[#757575] rounded-none px-[14px] pt-[18px] pb-[6px] text-[13.5px] text-[#111] bg-white outline-none focus:border-[#111] transition-colors placeholder-transparent"
                  placeholder="Your Email"
                  required
                  autoComplete="email"
                />
                <label
                  htmlFor="mobileEmailInput"
                  className="absolute left-[14px] top-[16px] text-[13px] text-[#757575] pointer-events-none transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] bg-white px-1 origin-top-left
                  peer-focus:-translate-y-[23px] peer-focus:scale-[0.85] peer-focus:text-[#555] peer-focus:top-[16px]
                  peer-not-placeholder-shown:-translate-y-[23px] peer-not-placeholder-shown:scale-[0.85] peer-not-placeholder-shown:text-[#555] peer-not-placeholder-shown:top-[16px]"
                >
                  Your Email
                </label>
              </div>

              <div
                className={`overflow-hidden transition-all duration-400 ease-in-out ${
                  showExpanded ? 'max-h-[220px] opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'
                }`}
              >
                <div className="relative w-full mb-[18px]">
                  <select className="w-full h-[50px] border border-[#ccc] bg-white pl-[14px] pr-[40px] text-[13.5px] text-[#111] outline-none appearance-none cursor-pointer rounded-none">
                    <option value="Nigeria">Nigeria</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Italy">Italy</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                  <svg viewBox="0 0 24 24" className="absolute right-[14px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] stroke-[#333] stroke-[1.8] fill-none pointer-events-none">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                <label className="flex items-start gap-3 mb-[22px] cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-[19px] h-[19px] border border-[#757575] mt-0.5 cursor-pointer shrink-0 appearance-none bg-white checked:bg-[#111] checked:border-[#111] relative checked:after:content-[''] checked:after:absolute checked:after:left-[5px] checked:after:top-[2px] checked:after:w-[5px] checked:after:h-[9px] checked:after:border-white checked:after:border-b-2 checked:after:border-r-2 checked:after:rotate-45"
                  />
                  <span className="text-[11px] leading-[1.5] text-[#444] font-normal">
                    Yes, I would like to receive updates about collections, offers and exclusives by email. See our{' '}
                    <a href="#" className="text-[#333] underline">Privacy Policy</a> for further information.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[48px] bg-[#1a1a1a] hover:bg-[#222] text-white text-[11px] font-semibold tracking-[2px] uppercase flex justify-center items-center transition-colors disabled:cursor-default"
              >
                {isLoading ? (
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-[pulseDots_1.2s_infinite_ease-in-out]" />
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-[pulseDots_1.2s_infinite_ease-in-out_0.2s]" />
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-[pulseDots_1.2s_infinite_ease-in-out_0.4s]" />
                  </div>
                ) : (
                  'SIGN UP'
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center pt-2.5">
            <h2 className="text-[16px] font-semibold tracking-[1.8px] uppercase text-[#111] mb-4">
              Confirmed - Thank You
            </h2>
            <p className="text-[12.5px] text-[#333] leading-[1.5] mb-7 max-w-[290px]">
              You&apos;ve been added to our email list as<br />
              <span className="font-normal text-[#111] block mt-1 break-all">{submittedEmail}</span>
            </p>
            <button
              onClick={handleClose}
              className="w-full h-[48px] bg-[#1a1a1a] hover:bg-[#222] text-white text-[11px] font-semibold tracking-[2px] uppercase cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
      
      {/* Add keyframes for dots loader if they don't exist yet */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulseDots {
            0%, 80%, 100% {
                transform: scale(0.6);
                opacity: 0.4;
            }
            40% {
                transform: scale(1.2);
                opacity: 1;
            }
        }
      `}} />
    </>
  );
}

