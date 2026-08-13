import type {Metadata} from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShopProvider } from '@/context/ShopContext';
import CartSidebar from '@/components/CartSidebar';
import SubscriptionSidebar from '@/components/SubscriptionSidebar';
import SelectSizeSidebar from '@/components/SelectSizeSidebar';

export const metadata: Metadata = {
  title: 'SeamLadies',
  description: 'SeamLadies E-commerce and Foundation',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased" suppressHydrationWarning>
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
