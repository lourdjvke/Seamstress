import Link from 'next/link';

export default function SecondaryNav() {
  const links = ['WOMENSWEAR', 'FIT & DEVELOPMENT', 'MANUFACTURING', 'PROGRAMMES'];
  
  return (
    <div className="w-full border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between text-xs tracking-[0.2em] font-semibold text-gray-500 uppercase">
        {links.map((link, index) => (
          <Link 
            key={link} 
            href="#" 
            className={`flex-1 text-center py-6 hover:text-black transition-colors ${
              index !== links.length - 1 ? 'md:border-r border-gray-200' : ''
            }`}
          >
            {link}
          </Link>
        ))}
      </div>
    </div>
  );
}
