import Link from 'next/link';

export default function Philosophy() {
  return (
    <section className="w-full py-24 px-6 text-center bg-white flex justify-center">
      <div className="max-w-4xl">
        <h2 className="text-xl md:text-2xl tracking-[0.2em] font-semibold uppercase mb-8">
          Philosophy
        </h2>
        <p className="text-sm md:text-base leading-relaxed text-gray-700 mb-6">
          As a global luxury lifestyle brand, our collections are designed to inspire women and the next generation. These values extend from our collections to the way we conduct business to the work of the Tory Burch Foundation.
        </p>
        <p className="text-sm md:text-base leading-relaxed text-gray-700 mb-10">
          Tory launched the Foundation in 2009 to increase women&apos;s economic power through entrepreneurship — and with an early conviction that this hybrid model of a purpose-led company represented the future of business. Since then, a portion of every purchase has benefited the Foundation.
        </p>
        <Link 
          href="#" 
          className="text-xs font-semibold tracking-widest uppercase border-b border-black pb-1 hover:border-transparent hover:opacity-70 transition-all"
        >
          Read Our Impact Report
        </Link>
      </div>
    </section>
  );
}
