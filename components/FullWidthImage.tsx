import Image from 'next/image';

export default function FullWidthImage() {
  return (
    <section className="w-full relative h-[50vh] md:h-[70vh] flex items-center justify-center">
      <Image 
        src="https://picsum.photos/seed/sandalshop/1920/800" 
        alt="The Sandal Shop" 
        fill 
        className="object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-widest uppercase shadow-sm">
          The Sandal Shop
        </h2>
      </div>
      
      {/* Icon button in bottom right corner */}
      <button className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm hover:bg-white/40 transition-colors">
        <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
      </button>
    </section>
  );
}
