import Link from 'next/link';
import { Sun } from 'lucide-react'; // Placeholder for the foundation logo icon

export default function Footer() {
  return (
    <footer className="w-full text-sm font-sans bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold tracking-wider text-xs mb-4 uppercase">Help</h3>
          <ul className="space-y-3 text-gray-600">
            <li><Link href="#" className="hover:underline">Client Services</Link></li>
            <li><Link href="#" className="hover:underline">Contact Us</Link></li>
            <li><Link href="#" className="hover:underline">Returns & Exchanges</Link></li>
            <li><Link href="#" className="hover:underline">Track Your Order</Link></li>
            <li><Link href="#" className="hover:underline">Shipping & Delivery</Link></li>
            <li><Link href="#" className="hover:underline">Counterfeit FAQs</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold tracking-wider text-xs mb-4 uppercase">Shop</h3>
          <ul className="space-y-3 text-gray-600">
            <li><Link href="#" className="hover:underline">Ship To: United Kingdom £</Link></li>
            <li><Link href="#" className="hover:underline">Find a Store</Link></li>
            <li><Link href="#" className="hover:underline">Gift Services</Link></li>
            <li><Link href="#" className="hover:underline">Gift Cards</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold tracking-wider text-xs mb-4 uppercase">About Tory Burch</h3>
          <ul className="space-y-3 text-gray-600">
            <li><Link href="#" className="hover:underline">Our Impact</Link></li>
            <li><Link href="#" className="hover:underline">Careers</Link></li>
            <li><Link href="#" className="hover:underline">Tory Burch Foundation</Link></li>
            <li><Link href="#" className="hover:underline">Tory Daily</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold tracking-wider text-xs mb-4 uppercase">Follow Us</h3>
          <ul className="space-y-3 text-gray-600">
            <li><Link href="#" className="hover:underline">Instagram</Link></li>
            <li><Link href="#" className="hover:underline">Facebook</Link></li>
            <li><Link href="#" className="hover:underline">Twitter</Link></li>
            <li><Link href="#" className="hover:underline">Pinterest</Link></li>
            <li><Link href="#" className="hover:underline">Tumblr</Link></li>
            <li><Link href="#" className="hover:underline">YouTube</Link></li>
            <li><Link href="#" className="hover:underline">LinkedIn</Link></li>
          </ul>
        </div>
      </div>

      <div className="bg-[#8b9e58] text-white py-12 flex flex-col items-center justify-center text-center px-6">
        <Sun className="w-12 h-12 mb-4" />
        <h2 className="text-xl tracking-widest font-semibold uppercase mb-4">Tory Burch Foundation</h2>
        <p className="max-w-xl text-sm leading-relaxed">
          The Tory Burch Foundation increases women&apos;s economic power<br/>
          by supporting entrepreneurs to build businesses that last
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 border-t border-gray-200">
        <div className="mb-4 md:mb-0">
          © 2024 Tory Burch LLC
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="#" className="hover:underline">Privacy Policy</Link>
          <Link href="#" className="hover:underline">UK Modern Slavery Act Statement</Link>
          <Link href="#" className="hover:underline">Terms of Use</Link>
          <Link href="#" className="hover:underline">Cookies Settings</Link>
          <Link href="#" className="hover:underline">Company Imprint</Link>
          <Link href="#" className="hover:underline">Site Map</Link>
        </div>
      </div>
    </footer>
  );
}
