import Image from 'next/image';
import Link from 'next/link';

export default function TwoImageBanner() {
  return (
    <section className="w-full flex flex-col md:flex-row bg-white">
      {/* Left */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <div className="w-full aspect-[4/5] relative">
          <Image 
            src="https://picsum.photos/seed/romy/800/1000" 
            alt="Romy" 
            fill 
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="py-12 px-6 text-center">
          <h2 className="text-2xl font-serif mb-4">ROMY</h2>
          <p className="text-sm text-gray-600 mb-6">Chic, casual and easy on the go</p>
          <Link 
            href="#" 
            className="text-[10px] font-semibold tracking-widest uppercase border-b border-gray-300 pb-1 hover:border-transparent transition-colors"
          >
            Shop
          </Link>
        </div>
      </div>

      {/* Right */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <div className="w-full aspect-[4/5] relative">
          <Image 
            src="https://picsum.photos/seed/tory/800/1000" 
            alt="Tory's Favorites" 
            fill 
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="py-12 px-6 text-center">
          <h2 className="text-2xl font-serif mb-4 uppercase tracking-wider">Tory&apos;s Favorites</h2>
          <p className="text-sm text-gray-600 mb-6">&quot;I want to create collections that inspire women to experiment with their individuality and style&quot;</p>
          <Link 
            href="#" 
            className="text-[10px] font-semibold tracking-widest uppercase border-b border-gray-300 pb-1 hover:border-transparent transition-colors"
          >
            Shop The Edit
          </Link>
        </div>
      </div>
    </section>
  );
}
