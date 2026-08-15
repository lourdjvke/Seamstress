export default function Hero() {
  return (
    <section className="relative w-full h-[80vh] md:h-[95vh] flex items-end justify-center pb-24 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
      >
        <source
          src="https://tb-foundation-wordpress-assets.storage.googleapis.com/wp-content/uploads/2025/01/10202053/WebsiteVideo_3840_2160_v02_optimized.mp4"
          type="video/mp4"
        />
      </video>
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
