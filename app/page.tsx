import Hero from '@/components/Hero';
import SecondaryNav from '@/components/SecondaryNav';
import Philosophy from '@/components/Philosophy';
import IconsGrid from '@/components/IconsGrid';
import ThreeImageGrid from '@/components/ThreeImageGrid';
import GoalsSection from '@/components/GoalsSection';
import TwoImageBanner from '@/components/TwoImageBanner';
import FoundationSection from '@/components/FoundationSection';
import ShoeCarousel from '@/components/ShoeCarousel';
import TorySport from '@/components/TorySport';
import SaleBanner from '@/components/SaleBanner';
import FullWidthImage from '@/components/FullWidthImage';
import Newsletter from '@/components/Newsletter';

export default function Home() {
  return (
    <main className="w-full flex flex-col min-h-screen">
      <Hero />
      <SecondaryNav />
      <Philosophy />
      <IconsGrid />
      <ThreeImageGrid />
      <GoalsSection />
      <TwoImageBanner />
      <FoundationSection />
      <ShoeCarousel />
      <TorySport />
      <SaleBanner />
      <FullWidthImage />
      <Newsletter />
    </main>
  );
}
