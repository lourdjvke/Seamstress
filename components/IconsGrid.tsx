import Image from 'next/image';
import Link from 'next/link';

export default function IconsGrid() {
  const items = [
    { title: 'HANDBAGS', src: 'https://picsum.photos/seed/handbag/600/600' },
    { title: 'SHOES', src: 'https://picsum.photos/seed/shoes/600/600' },
    { title: 'READY-TO-WEAR', src: 'https://picsum.photos/seed/rtw/600/600' },
    { title: 'JEWELRY', src: 'https://picsum.photos/seed/jewelry/600/600' },
  ];

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-xl md:text-2xl tracking-[0.2em] font-semibold uppercase mb-4">
          Our Icons
        </h2>
        <p className="text-sm text-gray-600">Discover our signature collections</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center group">
            <div className="w-full aspect-square relative bg-[#f7f7f7] mb-6 overflow-hidden">
              <Image 
                src={item.src} 
                alt={item.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <Link 
              href="#" 
              className="text-xs font-semibold tracking-widest uppercase border-b border-black pb-1 hover:border-transparent hover:opacity-70 transition-all"
            >
              {item.title}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
