import type {Metadata} from 'next';
import './globals.css';
import { Montserrat, Playfair_Display } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShopProvider } from '@/context/ShopContext';
import CartSidebar from '@/components/CartSidebar';
import SubscriptionSidebar from '@/components/SubscriptionSidebar';
import SelectSizeSidebar from '@/components/SelectSizeSidebar';

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'SeamLadies',
  description: 'SeamLadies E-commerce and Foundation',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${montserrat.variable} ${playfair.variable} font-sans antialiased overflow-x-hidden`} suppressHydrationWarning>
        <ShopProvider>
          <Navbar />
          {children}
          <Footer />
          <CartSidebar />
          <SubscriptionSidebar />
          <SelectSizeSidebar />
        </ShopProvider>
      </body>
    </html>
  );
}
