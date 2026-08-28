import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24 bg-white text-gray-900">
      <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase mb-4">404 - Page Not Found</h1>
      <p className="text-gray-500 text-sm md:text-base max-w-md mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-8 py-3 bg-[#1a1a1a] text-white text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-black transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
