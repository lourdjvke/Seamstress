import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

interface SearchSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchSidebar({ isOpen, onClose }: SearchSidebarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-[99999] transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-full max-w-[400px] bg-white z-[100000] transform transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] md:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
          <div className="w-6" /> {/* Spacer to center logo */}
          <div className="flex-1 flex justify-center">
            <Image 
              src="https://user23004.na.imgto.link/public/20260811/seamladies-logo.avif" 
              alt="SeamLadies Logo" 
              width={160} 
              height={40} 
              className="object-contain h-6 w-auto"
              priority
            />
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:opacity-70 cursor-pointer w-6 flex justify-end"
            aria-label="Close search"
          >
            <X className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>
        
        <div className="p-6 pt-8">
          <div className="flex items-center border border-gray-300 rounded-md px-4 py-3">
            <input 
              type="text" 
              placeholder="Search for resources" 
              className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400 text-gray-900"
              autoFocus={isOpen}
            />
            <button 
              className="ml-2 p-1 hover:opacity-70 cursor-pointer text-gray-400"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
