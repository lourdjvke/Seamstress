export default function Newsletter() {
  return (
    <section className="w-full py-20 px-6 bg-[#f7f7f7] text-center border-b border-gray-200">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl md:text-2xl font-semibold tracking-widest uppercase mb-4">
          Take 10% Off Your First Order of £200+
        </h2>
        <p className="text-sm text-gray-600 mb-8 leading-relaxed">
          Your first Tory Burch purchase of £200 or more, online or in boutiques, when you sign up for emails. Exclusions apply.
        </p>
        <button className="px-16 py-4 bg-[#1a1a1a] text-white text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-black transition-colors">
          Sign Up
        </button>
      </div>
    </section>
  );
}
