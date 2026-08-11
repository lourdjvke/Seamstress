import Image from 'next/image';
import Link from 'next/link';

export default function TorySport() {
  return (
    <section className="w-full flex flex-col md:flex-row items-center bg-[#f7f7f7]">
      {/* Left Image */}
      <div className="w-full md:w-1/3 aspect-[3/4] relative">
        <Image 
          src="https://picsum.photos/seed/sport1/600/800" 
          alt="Tory Sport 1" 
          fill 
          className="object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Center Text */}
      <div className="w-full md:w-1/3 flex flex-col justify-center items-center py-16 px-8 text-center bg-white h-full md:aspect-[3/4]">
        <h2 className="text-2xl font-serif tracking-widest uppercase mb-4">Tory Sport</h2>
        <p className="text-sm text-gray-600 mb-6">For workouts, travel and weekends</p>
        <Link 
          href="#" 
          className="text-[10px] font-semibold tracking-widest uppercase border-b border-gray-300 pb-1 hover:border-transparent transition-colors"
        >
          Shop
        </Link>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/3 aspect-[3/4] relative">
        <Image 
          src="https://picsum.photos/seed/sport2/600/800" 
          alt="Tory Sport 2" 
          fill 
          className="object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    </section>
  );
}
