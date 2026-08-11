import Image from 'next/image';
import Link from 'next/link';

export default function ThreeImageGrid() {
  const items = [
    {
      title: 'PURPOSE',
      desc: 'We give voice to our values through the work of the Tory Burch Foundation, investment in our employees and support of values-aligned nonprofits',
      src: 'https://picsum.photos/seed/purpose/800/800',
    },
    {
      title: 'PRODUCTS',
      desc: 'Discover the materials and processes we use to drive innovation and impact while maintaining the highest level of design, quality, craftsmanship',
      src: 'https://picsum.photos/seed/products/800/800',
    },
    {
      title: 'PARTNERS',
      desc: 'We work with suppliers who set and maintain best-in-class social and environmental standards, operate transparently, empower their workers and lower their impact',
      src: 'https://picsum.photos/seed/partners/800/800',
    },
  ];

  return (
    <section className="w-full py-16 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col text-center">
            <div className="w-full aspect-square relative mb-8 overflow-hidden">
              <Image 
                src={item.src} 
                alt={item.title} 
                fill 
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="px-6 flex flex-col items-center flex-grow">
              <h3 className="text-[13px] tracking-widest font-semibold uppercase mb-4">
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed text-gray-700 mb-6 max-w-sm">
                {item.desc}
              </p>
              <Link 
                href="#" 
                className="mt-auto text-[10px] font-semibold tracking-widest uppercase border-b border-gray-300 pb-1 hover:border-transparent transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
