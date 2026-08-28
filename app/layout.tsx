import type {Metadata} from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShopProvider } from '@/context/ShopContext';
import CartSidebar from '@/components/CartSidebar';
import SubscriptionSidebar from '@/components/SubscriptionSidebar';
import SelectSizeSidebar from '@/components/SelectSizeSidebar';
import CookieBanner from '@/components/CookieBanner';
import ScrollProgressBar from '@/components/ScrollProgressBar';

export const metadata: Metadata = {
  title: 'SeamLadies',
  description: 'SeamLadies E-commerce and Foundation',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ScrollProgressBar />
        <ShopProvider>
          <Navbar />
          {children}
          <Footer />
          <CartSidebar />
          <SubscriptionSidebar />
          <SelectSizeSidebar />
          <CookieBanner />
        </ShopProvider>
      </body>
    </html>
  );
}
