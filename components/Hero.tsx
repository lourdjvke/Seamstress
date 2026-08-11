import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full h-[80vh] md:h-[95vh] flex items-end justify-center pb-24">
      <Image
        src="https://picsum.photos/seed/speaker/1920/1080"
        alt="Women Entrepreneurs"
        fill
        className="object-cover object-top"
        referrerPolicy="no-referrer"
        priority
      />
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative z-10 text-center text-white px-4">
        <p className="text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase mb-4">
          Extraordinary Women Entrepreneurs
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-widest uppercase">
          Building Economic Power
        </h1>
      </div>
    </section>
  );
}
