import Image from 'next/image';
import Link from 'next/link';

export default function TorySport() {
  return (
    <section className="relative w-full flex flex-col md:flex-row bg-[#f7f7f7]">
      {/* Left Image */}
      <div className="w-full md:w-1/2 aspect-[3/4] relative">
        <Image 
          src="https://picsum.photos/seed/sport1/800/1000" 
          alt="Tory Sport 1" 
          fill 
          className="object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/2 aspect-[3/4] relative">
        <Image 
          src="https://picsum.photos/seed/sport2/800/1000" 
          alt="Tory Sport 2" 
          fill 
          className="object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Transparent Center Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center z-10 pointer-events-none">
        <div className="pointer-events-auto flex flex-col items-center justify-center p-6 md:p-8 bg-white/70 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none">
          <h2 className="text-2xl md:text-3xl font-serif tracking-widest uppercase mb-2 text-gray-900 drop-shadow-xs">Tory Sport</h2>
          <p className="text-xs md:text-sm text-gray-800 mb-5 max-w-xs drop-shadow-xs">For workouts, travel and weekends</p>
          <Link 
            href="#" 
            className="text-[10px] md:text-xs font-semibold tracking-widest uppercase border-b border-black pb-0.5 hover:border-transparent transition-colors text-black"
          >
            Shop
          </Link>
        </div>
      </div>
    </section>
  );
}
