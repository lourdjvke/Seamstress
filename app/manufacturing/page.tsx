'use client';

import { useState, useRef, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Pause, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ManufacturingTopic {
  title: string;
  desc: string;
  img: string;
}

interface TabData {
  id: string;
  label: string;
  heroTitle: string;
  intro: {
    title: string;
    text: string;
  };
  items: ManufacturingTopic[];
  featured: {
    img: string;
    title: string;
    text: string;
  };
}

const MANUFACTURING_DATA: Record<string, TabData> = {
  'production-routes': {
    id: 'production-routes',
    label: 'Production Routes',
    heroTitle: 'PRODUCTION ROUTES',
    intro: {
      title: 'Strategic Manufacturing Pathways',
      text: 'We offer flexible, highly calibrated production pathways tailored to your brand stage, quantity thresholds, and go-to-market velocity. Whether leveraging our pre-engineered stock libraries, custom original design manufacturing (ODM), or fully bespoke original equipment manufacturing (OEM), our multi-tier infrastructure guarantees technical rigor, cost transparency, and uncompromising craftsmanship.'
    },
    items: [
      {
        title: 'Stock Products',
        desc: 'Immediate access to proven, high-demand core silhouettes ready for immediate ordering with minimal lead times and optimized lower minimum order quantities.',
        img: 'https://loremflickr.com/1200/1500/fashion,apparel?lock=201'
      },
      {
        title: 'Configured Stock',
        desc: 'Customizing our vetted foundational blocks with brand-specific colorways, bespoke trims, custom hardware, and specialized luxury wash treatments.',
        img: 'https://loremflickr.com/1200/1500/fashion,textile?lock=202'
      },
      {
        title: 'ODM Development',
        desc: 'Collaborative original design manufacturing, transforming your creative direction into production-ready designs utilizing our technical library and fabric mills.',
        img: 'https://loremflickr.com/1200/1500/fashion,design?lock=203'
      },
      {
        title: 'OEM Development',
        desc: 'Full-service bespoke development engineered strictly from your proprietary tech packs, custom master patterns, and exclusive yarn specifications.',
        img: 'https://loremflickr.com/1200/1500/fashion,factory?lock=204'
      },
      {
        title: 'Repeat Production',
        desc: 'Streamlined replenishment workflows with guaranteed batch-to-batch color continuity, consistent sizing, and priority factory scheduling for top sellers.',
        img: 'https://loremflickr.com/1200/1500/fashion,workshop?lock=205'
      },
      {
        title: 'Production Transfer',
        desc: 'Seamless re-engineering and onboarding of existing styles into our certified factory network, maintaining construction integrity while improving margins.',
        img: 'https://loremflickr.com/1200/1500/fashion,craft?lock=206'
      }
    ],
    featured: {
      img: 'https://loremflickr.com/2000/1000/fashion,industry?lock=207',
      title: 'Scalable Manufacturing Architecture',
      text: 'Every production route operates under our unified Vendor Code of Conduct and quality assurance protocols. From micro-capsule releases to enterprise-level bulk runs, our digital tracking systems monitor material staging, cutting yields, and inline inspections to eliminate friction and ensure on-time delivery across global retail networks.'
    }
  },
  'product-capabilities': {
    id: 'product-capabilities',
    label: 'Product Capabilities',
    heroTitle: 'PRODUCT CAPABILITIES',
    intro: {
      title: 'Multi-Category Technical Mastery',
      text: 'Our specialized production units are organized by product category to deliver specialized expertise across every fabric construction. From precision-tailored suiting and complex corsetry to ultra-fine gauge knitwear and technical seamless activewear, our technical design leads and pattern masters ensure flawless execution for every garment category.'
    },
    items: [
      {
        title: 'Jersey',
        desc: 'Premium circular knit engineering encompassing organic heavyweights, fluid modal blends, and delicate micro-ribs with superior drape and recovery.',
        img: 'https://loremflickr.com/1200/1500/fashion,jersey?lock=211'
      },
      {
        title: 'Wovens',
        desc: 'Crisp poplins, textured silks, fine linens, and technical blended wovens with immaculate French seams, bias bindings, and refined finishing.',
        img: 'https://loremflickr.com/1200/1500/fashion,fabric?lock=212'
      },
      {
        title: 'Dresses',
        desc: 'Versatile day-to-evening dress construction featuring intricate drape lines, smocking, sunray pleating, and concealed structural support.',
        img: 'https://loremflickr.com/1200/1500/fashion,dress?lock=213'
      },
      {
        title: 'Tailoring',
        desc: 'Sartorial craftsmanship utilizing floating horsehair canvassing, precise chest felt padding, functional sleeve cuffs, and razor-sharp pressed lapels.',
        img: 'https://loremflickr.com/1200/1500/fashion,suit?lock=214'
      },
      {
        title: 'Knitwear',
        desc: 'Fully-fashioned flat knits ranging from ultra-fine 18-gauge merino to sculptural 3-gauge hand-knit cable textures and jacquard motifs.',
        img: 'https://loremflickr.com/1200/1500/fashion,knitwear?lock=215'
      },
      {
        title: 'Denim',
        desc: 'Sustainable indigo and sulfur dye denim manufacturing featuring laser whiskering, ozone washing, selvedge finishes, and custom rivet applications.',
        img: 'https://loremflickr.com/1200/1500/fashion,denim?lock=216'
      },
      {
        title: 'Outerwear',
        desc: 'Architectural wool coats, double-face cashmere, insulated storm-proof parkas, and taped-seam waterproof outerwear designed for severe climate performance.',
        img: 'https://loremflickr.com/1200/1500/fashion,coat?lock=217'
      },
      {
        title: 'Activewear',
        desc: 'Ergonomic 4-way stretch active pieces with flatlock anti-chafe stitching, moisture-wicking capillary technology, and bonded compression zones.',
        img: 'https://loremflickr.com/1200/1500/fashion,sportswear?lock=218'
      },
      {
        title: 'Seamless',
        desc: 'Advanced Santoni circular knitting engineering seamless silhouettes with gradient micro-mesh ventilation and body-contouring compression.',
        img: 'https://loremflickr.com/1200/1500/fashion,activewear?lock=219'
      },
      {
        title: 'Occasionwear',
        desc: 'Couture-grade eveningwear featuring hand-applied bugle beading, internal corset boning, cascading horsehair hems, and delicate silk tulle layering.',
        img: 'https://loremflickr.com/1200/1500/fashion,evening?lock=220'
      }
    ],
    featured: {
      img: 'https://loremflickr.com/2000/1000/fashion,couture?lock=221',
      title: 'Precision Craftsmanship & Innovation',
      text: 'By segregating manufacturing into dedicated category centers of excellence, we maintain rigorous machinery specialization and craftsman focus. Every production line is calibrated to the exact tensile and thermal behaviors of its specific textile category.'
    }
  },
  'production-network': {
    id: 'production-network',
    label: 'Production Network',
    heroTitle: 'PRODUCTION NETWORK',
    intro: {
      title: 'Audited Global Manufacturing Hubs',
      text: 'Our diversified manufacturing footprint spans the United Kingdom, continental Europe, and certified international hubs. Each facility undergoes exhaustive social, ethical, and environmental compliance audits to ensure fair living wages, transparent governance, and world-class technical capabilities.'
    },
    items: [
      {
        title: 'UK Production',
        desc: 'Heritage ateliers in London, the Midlands, and Scotland specializing in rapid quick-response sampling, luxury tailoring, and artisanal knitwear.',
        img: 'https://loremflickr.com/1200/1500/fashion,london?lock=231'
      },
      {
        title: 'European Production',
        desc: 'Specialized manufacturing hubs across Portugal, Italy, and Romania delivering near-shore agility, exquisite leather craft, and luxury jersey finishing.',
        img: 'https://loremflickr.com/1200/1500/fashion,europe?lock=232'
      },
      {
        title: 'International Production',
        desc: 'High-volume ethical facilities across Turkey, India, and East Asia equipped with advanced automated cutting rooms and vertically integrated dye mills.',
        img: 'https://loremflickr.com/1200/1500/fashion,global?lock=233'
      },
      {
        title: 'Specialist Factories',
        desc: 'Boutique partner workshops dedicated exclusively to complex niche crafts including pleating, featherwork, boning, and specialized embroidery.',
        img: 'https://loremflickr.com/1200/1500/fashion,atelier?lock=234'
      },
      {
        title: 'Factory Qualification',
        desc: 'Rigorous vetting framework encompassing SMETA 4-pillar audits, environmental effluent standards, health & safety validation, and carbon tracking.',
        img: 'https://loremflickr.com/1200/1500/fashion,inspection?lock=235'
      }
    ],
    featured: {
      img: 'https://loremflickr.com/2000/1000/fashion,sustainable?lock=236',
      title: 'Ethical Standards & Supply Chain Transparency',
      text: 'We mandate that 100% of our Tier-1 and Tier-2 manufacturing partners uphold strict fair-labor guidelines. Through continuous on-site audits and worker empowerment programs, we foster stable, long-term commercial relationships that strengthen communities and advance sustainable industrial practices.'
    }
  },
  'production-services': {
    id: 'production-services',
    label: 'Production Services',
    heroTitle: 'PRODUCTION SERVICES',
    intro: {
      title: 'End-to-End Supply Chain Solutions',
      text: 'Beyond assembly, we provide a full spectrum of end-to-end supply chain services to de-risk manufacturing. From global raw material sourcing and custom trim casting to comprehensive AQL 2.5 quality control, barcoding, bonded warehousing, and multi-channel fulfillment, our operations team manages every logistical touchpoint.'
    },
    items: [
      {
        title: 'Material Sourcing',
        desc: 'Extensive global fabric sourcing network spanning certified organic cottons, European flax linens, GRS recycled polyesters, and luxury silks.',
        img: 'https://loremflickr.com/1200/1500/fashion,swatch?lock=241'
      },
      {
        title: 'Trim Development',
        desc: 'Custom hardware casting, branded corozo buttons, engraved Raccagni zippers, woven jacquard labels, and FSC-certified swing tags.',
        img: 'https://loremflickr.com/1200/1500/fashion,button?lock=242'
      },
      {
        title: 'Costing',
        desc: 'Transparent open-book Bill of Materials (BOM) cost calculations, yielding detailed unit economics and margin optimization modeling.',
        img: 'https://loremflickr.com/1200/1500/fashion,costing?lock=243'
      },
      {
        title: 'Production Management',
        desc: 'Dedicated production merchandisers overseeing critical path milestones, raw material arrival dates, and factory capacity schedules.',
        img: 'https://loremflickr.com/1200/1500/fashion,management?lock=244'
      },
      {
        title: 'Quality Control',
        desc: 'Standardized inline and final AQL 2.5 defect inspections, verifying stitch tension, color fastness, seam pull strength, and exact measurement charts.',
        img: 'https://loremflickr.com/1200/1500/fashion,quality?lock=245'
      },
      {
        title: 'Packaging',
        desc: 'Eco-friendly biodegradable polybags, custom branded tissue wraps, recycled corrugated shipper cartons, and barcoded retail ticketing.',
        img: 'https://loremflickr.com/1200/1500/fashion,packaging?lock=246'
      },
      {
        title: 'Warehousing',
        desc: 'Temperature-controlled bonded warehouse storage with real-time digital inventory telemetry and secure pallet consolidation.',
        img: 'https://loremflickr.com/1200/1500/fashion,warehouse?lock=247'
      },
      {
        title: 'Fulfilment & Delivery',
        desc: 'Global freight forwarding via air, sea, and road with full customs clearance management, DDP shipments, and direct B2B/D2C distribution.',
        img: 'https://loremflickr.com/1200/1500/fashion,logistics?lock=248'
      }
    ],
    featured: {
      img: 'https://loremflickr.com/2000/1000/fashion,shipping?lock=249',
      title: 'Seamless Global Logistics & Execution',
      text: 'Our integrated operations simplify international trade logistics. We handle export documentation, duty classification, and freight consolidation, giving your brand total peace of mind from fabric mill origin to doorstep delivery.'
    }
  }
};

const TAB_KEYS = Object.keys(MANUFACTURING_DATA);

function ManufacturingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentTabId = searchParams.get('tab') || 'production-routes';
  const activeData = MANUFACTURING_DATA[currentTabId as keyof typeof MANUFACTURING_DATA] || MANUFACTURING_DATA['production-routes'];

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const setTab = (tabId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabId);
    router.push(pathname + '?' + params.toString(), { scroll: false });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pt-20 md:pt-28">
      {/* Secondary Navigation (Non-sticky, exactly cloned structure) */}
      <div className="bg-white border-b border-gray-200">
        <h2 className="block md:hidden text-center uppercase text-xs tracking-[0.15em] py-3 font-semibold text-gray-900 border-b border-gray-100">
          Manufacturing
        </h2>
        <div className="w-full overflow-x-auto no-scrollbar py-4 px-4 md:px-8">
          <nav className="flex whitespace-nowrap gap-6 md:gap-8 items-center w-max mx-auto min-w-max">
            {TAB_KEYS.map((key) => {
              const item = MANUFACTURING_DATA[key];
              const isActive = activeData.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className={`uppercase text-xs tracking-[0.1em] font-medium transition-colors cursor-pointer inline-block whitespace-nowrap ${
                    isActive
                      ? 'text-gray-900 border-b border-gray-900 pb-0.5 font-semibold'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Hero Section with Video Background and Working Pause/Play */}
      <section className="relative w-full h-[50vh] min-h-[420px] md:h-[60vh] md:min-h-[520px] overflow-hidden flex items-center justify-center bg-gray-900">
        {/* Background Video */}
        <video
          ref={videoRef}
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
        <div className="absolute inset-0 bg-black/15" />

        {/* Hero Title with fold slot animation */}
        <div className="relative z-10 text-white text-center uppercase px-4 w-full max-w-[92vw] md:max-w-[85vw] lg:max-w-[80vw] mx-auto min-h-[160px] sm:min-h-[180px] md:min-h-[220px] lg:min-h-[260px] h-40 sm:h-48 md:h-56 lg:h-64 flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.h1
              key={activeData.id}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
              className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.12em] md:tracking-[0.18em] font-normal w-full text-center mx-auto leading-tight md:leading-snug px-4"
            >
              {activeData.heroTitle}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Pause / Play Video Controls Button */}
        <button
          onClick={togglePlay}
          className="absolute bottom-6 right-6 z-10 bg-white/80 hover:bg-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer transition-all shadow-sm"
          aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 text-gray-900 fill-gray-900" />
          ) : (
            <Play className="w-3.5 h-3.5 text-gray-900 fill-gray-900 ml-0.5" />
          )}
        </button>
      </section>

      {/* Section 1: Intro / Commitment Statement */}
      <section className="py-16 md:py-24 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-xl md:text-2xl tracking-[0.15em] uppercase mb-6 md:mb-8 text-gray-900 font-normal">
          {activeData.intro.title}
        </h2>
        <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-3xl mx-auto px-2 md:px-0 font-normal">
          {activeData.intro.text}
        </p>
      </section>

      {/* 2-Column Grid Cards Section (Flush cards matching /programmes structure) */}
      <section className="w-full max-w-[calc(100%+8em)] px-0 mx-auto pb-12 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full">
          {activeData.items.map((item, index) => (
            <div key={index} className="flex flex-col text-center w-full bg-white">
              <div className="relative aspect-[3/4] md:aspect-[4/5] w-full overflow-hidden bg-gray-100">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="px-4 md:px-10 py-6 md:py-8 flex flex-col items-center">
                <h3 className="text-base md:text-lg tracking-[0.15em] uppercase mb-3 text-gray-900 font-normal">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-normal max-w-xl mx-auto">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Landscape Image Section & Highlight Statement */}
      <section className="w-full">
        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-gray-100">
          <Image
            src={activeData.featured.img}
            alt={activeData.featured.title}
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="py-16 md:py-24 px-6 max-w-4xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl tracking-[0.15em] uppercase mb-6 md:mb-8 text-gray-900 font-normal">
            {activeData.featured.title}
          </h2>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-3xl mx-auto px-2 md:px-0 font-normal">
            {activeData.featured.text}
          </p>
          <div className="mt-8 md:mt-10">
            <Link
              href="/contact"
              className="uppercase text-xs tracking-[0.15em] text-gray-900 border-b border-gray-900 pb-1 inline-block hover:opacity-60 transition-opacity font-medium"
            >
              Inquire About Manufacturing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ManufacturingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ManufacturingContent />
    </Suspense>
  );
}
