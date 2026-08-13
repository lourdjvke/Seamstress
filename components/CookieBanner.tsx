'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function CookieBanner() {
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setShowCookieBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowCookieBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowCookieBanner(false);
  };

  if (!showCookieBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-5 md:py-5 md:px-10 shadow-[0_-2px_20px_rgba(0,0,0,0.15)] z-[9999] flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-gray-200 text-xs">
      <div className="text-gray-600 flex-1 md:pr-10 leading-relaxed text-justify md:text-left">
        Tory Burch uses our own and third party cookies to enable website functionality, serve personalized ads, analyze website traffic, and to overall give you the best browsing experience. Cookies allow you to make full use of the online shopping and personalized features available on our website. By clicking &quot;Accept All Cookies&quot;, you consent to our use of cookies. Please click &quot;Cookie Settings&quot; and here to view our Cookie Policy and Privacy Policy. By Selecting &quot;Continue without Accepting&quot;, you decide to continue browsing without installing additional targeting cookies.
      </div>
      
      <div className="flex flex-col gap-2.5 min-w-[240px]">
        <button 
          onClick={handleAccept}
          className="bg-black text-white py-3 px-6 text-[11px] font-semibold tracking-widest uppercase hover:bg-gray-800 transition-colors w-full cursor-pointer"
        >
          Accept All Cookies
        </button>
        <button 
          onClick={handleReject}
          className="bg-black text-white py-3 px-6 text-[11px] font-semibold tracking-widest uppercase hover:bg-gray-800 transition-colors w-full cursor-pointer"
        >
          Reject All
        </button>
        <button 
          onClick={() => {}} // Could be a link to settings
          className="text-gray-500 text-xs underline mt-1 w-full text-center hover:text-black cursor-pointer"
        >
          Cookie Settings
        </button>
      </div>

      <button 
        onClick={handleReject}
        className="absolute top-4 right-4 md:hidden text-gray-500 hover:text-black cursor-pointer"
        aria-label="Close cookie banner"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
