import Link from 'next/link';

export default function SaleBanner() {
  return (
    <section className="w-full py-16 bg-white text-center border-t border-gray-100">
      <p className="text-[10px] font-semibold tracking-widest uppercase mb-4">
        New Styles Added
      </p>
      <h2 className="text-3xl md:text-4xl font-serif uppercase tracking-widest mb-4">
        Summer Sale
      </h2>
      <p className="text-sm font-semibold tracking-widest uppercase mb-8">
        Up to 50% Off
      </p>
      
      <div className="flex flex-wrap justify-center items-center gap-6 text-[10px] font-semibold tracking-widest uppercase text-gray-500 px-4">
        <Link href="#" className="border-b border-black text-black pb-1">View All</Link>
        <Link href="#" className="border-b border-gray-300 pb-1 hover:text-black transition-colors">Handbags</Link>
        <Link href="#" className="border-b border-gray-300 pb-1 hover:text-black transition-colors">Shoes</Link>
        <Link href="#" className="border-b border-gray-300 pb-1 hover:text-black transition-colors">Ready-To-Wear</Link>
        <span className="text-[8px] tracking-normal text-gray-400 ml-4 hidden md:inline">DETAILS</span>
      </div>
    </section>
  );
}
