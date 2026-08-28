'use client';

import { useState, useRef, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Pause, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProgrammeCard {
  title: string;
  desc: string;
  img: string;
}

interface ProgrammeData {
  id: string;
  label: string;
  heroTitle: string;
  intro: {
    title: string;
    text: string;
  };
  cards: ProgrammeCard[];
  featured: {
    img: string;
    title: string;
    text: string;
  };
}

const PROGRAMMES_DATA: Record<string, ProgrammeData> = {
  'collection-development': {
    id: 'collection-development',
    label: 'Collection Development',
    heroTitle: 'COLLECTION DEVELOPMENT',
    intro: {
      title: 'End-to-End Assortment & Capsule Architecture',
      text: 'One capsule, seasonal collection or full multi-category assortment. We translate your overarching aesthetic vision into cohesive, technically viable production ranges with rigorous silhouette development, balanced fabric allocations, and strict margin viability.'
    },
    cards: [
      {
        title: 'Capsule & Range Planning',
        desc: 'Structuring harmonious SKU counts, color drops, and product tiers to ensure commercial viability and cohesive retail storytelling.',
        img: 'https://loremflickr.com/1200/1500/fashion,runway?lock=301'
      },
      {
        title: 'Silhouette & Block Harmonization',
        desc: 'Developing cohesive design languages across tailored, fluid, and structured pieces using shared core fit blocks.',
        img: 'https://loremflickr.com/1200/1500/fashion,sketch?lock=302'
      },
      {
        title: 'Fabric Allocation & Storytelling',
        desc: 'Curating seasonal textile stories that maximize yield efficiencies across jackets, dresses, and coordinating separates.',
        img: 'https://loremflickr.com/1200/1500/fashion,textiles?lock=303'
      },
      {
        title: 'Cost Engineering & Margins',
        desc: 'Detailed margin planning and open-book target costing calculated at the design stage to secure commercial profitability.',
        img: 'https://loremflickr.com/1200/1500/fashion,design?lock=304'
      }
    ],
    featured: {
      img: 'https://loremflickr.com/2000/1000/fashion,studio?lock=305',
      title: 'Structured Assortment Execution',
      text: 'Our collection development pathway bridges pure creative aspiration with factory-floor reality. By validating fabric yields, grading curves, and construction engineering during early range planning, we safeguard brand identity while guaranteeing seamless production translation.'
    }
  },
  'product-development-partnership': {
    id: 'product-development-partnership',
    label: 'Product Development Partnership',
    heroTitle: 'PRODUCT DEVELOPMENT PARTNERSHIP',
    intro: {
      title: 'Dedicated Technical & Design Support',
      text: 'Ongoing design, technical and sampling support. Operating as an extension of your internal team, we provide continuous access to master pattern cutters, technical designers, and fabric technologists across all development phases.'
    },
    cards: [
      {
        title: 'Master Pattern Development',
        desc: 'Precision pattern drafting and digitization in 2D and 3D, creating exacting fit foundations tailored to your brand standard.',
        img: 'https://loremflickr.com/1200/1500/fashion,pattern?lock=311'
      },
      {
        title: 'Comprehensive Tech Packs',
        desc: 'Production-ready specification packages detailing POM points of measurement, seam finishes, tolerances, and BOM components.',
        img: 'https://loremflickr.com/1200/1500/fashion,tailor?lock=312'
      },
      {
        title: 'Iterative Fit & Wear Testing',
        desc: 'Systematic fit sample reviews conducted on live fit models to refine balance lines, ease distribution, and comfort.',
        img: 'https://loremflickr.com/1200/1500/fashion,fitting?lock=313'
      },
      {
        title: 'Material Lab Testing',
        desc: 'Pre-production validation of tensile strength, shrinkage behavior, colorfastness, and seam slippage across all textiles.',
        img: 'https://loremflickr.com/1200/1500/fashion,laboratory?lock=314'
      }
    ],
    featured: {
      img: 'https://loremflickr.com/2000/1000/fashion,atelier?lock=315',
      title: 'Collaborative Technical Infrastructure',
      text: 'We embed senior technical leads directly into your creative calendar. Our agile development workflows reduce sampling iterations by over 35%, preserving momentum and locking in production standards well ahead of critical commercial milestones.'
    }
  },
  'continuous-production': {
    id: 'continuous-production',
    label: 'Continuous Production',
    heroTitle: 'CONTINUOUS PRODUCTION',
    intro: {
      title: 'Reliable Repeat & Reorder Systems',
      text: 'Repeat production against approved product versions. Designed for established brands with core perennial best-sellers requiring predictable cycle times, batch consistency, and uninterrupted factory scheduling.'
    },
    cards: [
      {
        title: 'Locked Spec Integrity',
        desc: 'Maintaining rigid adherence to golden master samples, approved patterns, and sealed tech packs across subsequent reorders.',
        img: 'https://loremflickr.com/1200/1500/fashion,factory?lock=321'
      },
      {
        title: 'Batch Color & Yarn Consistency',
        desc: 'Spectrophotometer lab dip tracking and controlled yarn dyeing protocols ensuring zero shade variance across seasons.',
        img: 'https://loremflickr.com/1200/1500/fashion,dye?lock=322'
      },
      {
        title: 'Priority Line Allocation',
        desc: 'Dedicated production capacity reserved with certified manufacturing partners to guarantee compressed manufacturing windows.',
        img: 'https://loremflickr.com/1200/1500/fashion,machinery?lock=323'
      },
      {
        title: 'AQL 2.5 Quality Assurance',
        desc: 'Mandatory inline and end-of-line inspections validating stitching precision, barcode verification, and carton integrity.',
        img: 'https://loremflickr.com/1200/1500/fashion,quality?lock=324'
      }
    ],
    featured: {
      img: 'https://loremflickr.com/2000/1000/fashion,manufacturing?lock=325',
      title: 'Flawless Supply Continuity',
      text: 'Continuous production removes the uncertainty from reordering. With pre-reserved machine capacity and automated quality gateways, our clients protect their cash flows and consistently satisfy retail demand without stockout penalties.'
    }
  },
  'new-label-launch': {
    id: 'new-label-launch',
    label: 'New Label Launch',
    heroTitle: 'NEW LABEL LAUNCH',
    intro: {
      title: 'Commercial Incubation for Emerging Founders',
      text: 'Development support for a founder with a legitimate commercial plan—not a generic business coaching programme. We provide real industrial execution, vetted supply chain access, and technical mentorship to bring your premier collection to market.'
    },
    cards: [
      {
        title: 'Go-to-Market Feasibility',
        desc: 'Auditing design concepts against realistic MOQ thresholds, wholesale pricing margins, and direct-to-consumer cost structures.',
        img: 'https://loremflickr.com/1200/1500/fashion,boutique?lock=331'
      },
      {
        title: 'Foundational Block Creation',
        desc: 'Drafting exclusive, proprietary fit blocks that establish your brand’s signature silhouette standard from day one.',
        img: 'https://loremflickr.com/1200/1500/fashion,styling?lock=332'
      },
      {
        title: 'Accessible MOQ Navigation',
        desc: 'Leveraging our network of flexible boutique manufacturing partners capable of crafting luxury-tier low-volume maiden runs.',
        img: 'https://loremflickr.com/1200/1500/fashion,craftsman?lock=333'
      },
      {
        title: 'Packaging & Retail Readiness',
        desc: 'Engineering branded hangtags, care labels, compliant barcode formats, and luxury presentation packaging.',
        img: 'https://loremflickr.com/1200/1500/fashion,box?lock=334'
      }
    ],
    featured: {
      img: 'https://loremflickr.com/2000/1000/fashion,editorial?lock=335',
      title: 'Grounded Industrial Partnership',
      text: 'We strip away superficial coaching and replace it with direct technical manufacturing rigor. Emerging labels gain direct entry to top-tier fabric mills, skilled ateliers, and precise cost models typically accessible only to global luxury houses.'
    }
  },
  'womens-uniform-programme': {
    id: 'womens-uniform-programme',
    label: 'Women’s Uniform Programme',
    heroTitle: 'WOMEN’S UNIFORM PROGRAMME',
    intro: {
      title: 'Corporate & Hospitality Wardrobe Engineering',
      text: 'Women-specific wardrobe development feeding into SmX programme infrastructure. We combine luxury aesthetic tailoring with heavy-duty performance fabrics, delivering durable, empowering, and exceptionally fitted uniform collections for high-profile institutions.'
    },
    cards: [
      {
        title: 'Ergonomic Movement Analysis',
        desc: 'Engineering discreet gussets, bi-stretch interlinings, and adjustable waistbands for active corporate and service environments.',
        img: 'https://loremflickr.com/1200/1500/fashion,suit?lock=341'
      },
      {
        title: 'High-Durability Textile Specs',
        desc: 'Specifying abrasion-tested, stain-resistant, and machine-washable fabrics engineered for intensive multi-shift longevity.',
        img: 'https://loremflickr.com/1200/1500/fashion,blazer?lock=342'
      },
      {
        title: 'Inclusive Body-Type Grading',
        desc: 'Developing specialized grade rules across diverse height profiles and proportions to ensure uniform elegance across entire teams.',
        img: 'https://loremflickr.com/1200/1500/fashion,portrait?lock=343'
      },
      {
        title: 'SmX Portal Integration',
        desc: 'Seamless digital ordering and employee wardrobe allotment tracking integrated with institutional procurement systems.',
        img: 'https://loremflickr.com/1200/1500/fashion,corporate?lock=344'
      }
    ],
    featured: {
      img: 'https://loremflickr.com/2000/1000/fashion,hospitality?lock=345',
      title: 'Elevating Organizational Presence',
      text: 'Uniforms should never be an afterthought. Our bespoke women’s uniform programmes ensure that hospitality leaders, aviation teams, and luxury retail staff embody the dignity, sophistication, and comfort required to perform at their best every day.'
    }
  },
  'retail-rollout': {
    id: 'retail-rollout',
    label: 'Retail Rollout',
    heroTitle: 'RETAIL ROLLOUT',
    intro: {
      title: 'Multi-Location Delivery & Assortment Logistics',
      text: 'Multiple styles, locations, delivery windows and replenishment. We engineer coordinated distribution cadences, custom carton marking, and strict compliance routing to service global department stores, boutiques, and flagship networks.'
    },
    cards: [
      {
        title: 'Staggered Delivery Windows',
        desc: 'Sequencing production cut-dates to deliver targeted monthly drops, holiday capsules, and mid-season reorders seamlessly.',
        img: 'https://loremflickr.com/1200/1500/fashion,store?lock=351'
      },
      {
        title: 'EDI & Vendor Compliance',
        desc: 'Adhering to strict major-retailer packing mandates, GS1-128 shipping labels, security tagging, and master carton dimensions.',
        img: 'https://loremflickr.com/1200/1500/fashion,logistics?lock=352'
      },
      {
        title: 'Multi-Door Drop Shipping',
        desc: 'Coordinating cross-docking and split freight manifests to route inventory directly to regional fulfillment centers and flagship doors.',
        img: 'https://loremflickr.com/1200/1500/fashion,delivery?lock=353'
      },
      {
        title: 'Floor-Ready Merchandising',
        desc: 'Pre-hanger garment processing, branded polybagging, and pre-applied retail price tickets for immediate merchandising.',
        img: 'https://loremflickr.com/1200/1500/fashion,hanger?lock=354'
      }
    ],
    featured: {
      img: 'https://loremflickr.com/2000/1000/fashion,mall?lock=355',
      title: 'Precision Commercial Distribution',
      text: 'Navigating wholesale compliance requires zero-defect execution. We coordinate factory lines with international logistics coordinators to guarantee that every garment arrives on time, fully tagged, and ready to immediately convert on the sales floor.'
    }
  },
  'managed-replenishment': {
    id: 'managed-replenishment',
    label: 'Managed Replenishment',
    heroTitle: 'MANAGED REPLENISHMENT',
    intro: {
      title: 'Predictive Stock Triggers & Active Warehousing',
      text: 'Stock monitoring, production triggers and recurring fulfilment. We actively analyze sales velocity, hold greige fabric reserves, and automate manufacturing cycles to ensure top SKUs remain in stock while minimizing working capital risk.'
    },
    cards: [
      {
        title: 'Greige Fabric Buffering',
        desc: 'Holding undyed yarn and greige fabric reserves to cut reorder production lead times from months down to weeks.',
        img: 'https://loremflickr.com/1200/1500/fashion,rolls?lock=361'
      },
      {
        title: 'Inventory Telemetry Tracking',
        desc: 'Real-time sell-through velocity analytics that dynamically generate automated factory cutting orders before stockouts occur.',
        img: 'https://loremflickr.com/1200/1500/fashion,warehouse?lock=362'
      },
      {
        title: 'Bonded Warehouse Staging',
        desc: 'Secure bonded storage facilities providing low-cost holding and rapid regional dispatch across prime international markets.',
        img: 'https://loremflickr.com/1200/1500/fashion,shipping?lock=363'
      },
      {
        title: 'Working Capital Optimization',
        desc: 'Tiered drawdown invoicing models designed to smooth cash flow and align manufacturing payments with realized retail sales.',
        img: 'https://loremflickr.com/1200/1500/fashion,finance?lock=364'
      }
    ],
    featured: {
      img: 'https://loremflickr.com/2000/1000/fashion,inventory?lock=365',
      title: 'Intelligent Inventory Balancing',
      text: 'Managed replenishment turns supply chain friction into a competitive advantage. By pairing fabric buffering with rapid factory reorder triggers, your brand captures every sale while maintaining lean, agile balance sheets.'
    }
  },
  'multi-season-partnership': {
    id: 'multi-season-partnership',
    label: 'Multi-Season Partnership',
    heroTitle: 'MULTI-SEASON PARTNERSHIP',
    intro: {
      title: 'Strategic Long-Term Brand Alliances',
      text: 'Comprehensive long-term manufacturing agreements encompassing recurring seasonal development, dedicated production lines, priority mill pricing, and collaborative continuous improvement across multiple annual collections.'
    },
    cards: [
      {
        title: 'Dedicated Atelier Capacity',
        desc: 'Contractually reserved machine lines and artisan teams dedicated exclusively to your brand across all seasonal peaks.',
        img: 'https://loremflickr.com/1200/1500/fashion,designer?lock=371'
      },
      {
        title: 'Volume-Leveraged Mill Pricing',
        desc: 'Aggregated multi-season yarn and fabric purchasing unlocking premium Tier-1 mill rates and custom weave developments.',
        img: 'https://loremflickr.com/1200/1500/fashion,loom?lock=372'
      },
      {
        title: 'Archival Pattern & Block Asset Library',
        desc: 'Digital repository of refined proprietary patterns and fit profiles, compounding technical efficiency year over year.',
        img: 'https://loremflickr.com/1200/1500/fashion,archive?lock=373'
      },
      {
        title: 'Strategic Carbon & ESG Roadmaps',
        desc: 'Joint sustainability initiatives targeting material traceability, renewable factory energy, and zero-waste cutting yields.',
        img: 'https://loremflickr.com/1200/1500/fashion,sustainability?lock=374'
      }
    ],
    featured: {
      img: 'https://loremflickr.com/2000/1000/fashion,luxury?lock=375',
      title: 'Compounding Value & Long-Term Excellence',
      text: 'The best luxury products are built on deep, enduring relationships between designers and craftsmen. Our multi-season partnerships provide the operational stability and institutional knowledge necessary to elevate your brand to generational permanence.'
    }
  }
};

const TAB_KEYS = Object.keys(PROGRAMMES_DATA);

function ProgrammesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentTabId = searchParams.get('tab') || 'collection-development';
  const activeData = PROGRAMMES_DATA[currentTabId as keyof typeof PROGRAMMES_DATA] || PROGRAMMES_DATA['collection-development'];

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
      {/* Secondary Navigation (Non-sticky) */}
      <div className="bg-white border-b border-gray-200">
        <h2 className="block md:hidden text-center uppercase text-xs tracking-[0.15em] py-3 font-semibold text-gray-900 border-b border-gray-100">
          Programmes
        </h2>
        <div className="w-full overflow-x-auto no-scrollbar py-4 px-4 md:px-8">
          <nav className="flex whitespace-nowrap gap-6 md:gap-8 items-center w-max mx-auto min-w-max">
            {TAB_KEYS.map((key) => {
              const item = PROGRAMMES_DATA[key];
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

      {/* 2-Column Grid Cards Section (Flush cards matching original /programmes structure) */}
      <section className="w-full max-w-[calc(100%+8em)] px-0 mx-auto pb-12 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full">
          {activeData.cards.map((card, index) => (
            <div key={index} className="flex flex-col text-center w-full bg-white">
              <div className="relative aspect-[3/4] md:aspect-[4/5] w-full overflow-hidden bg-gray-100">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="px-4 md:px-10 py-6 md:py-8 flex flex-col items-center">
                <h3 className="text-base md:text-lg tracking-[0.15em] uppercase mb-3 text-gray-900 font-normal">
                  {card.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-normal max-w-xl mx-auto">
                  {card.desc}
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
              Inquire About Programmes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ProgrammesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ProgrammesContent />
    </Suspense>
  );
}
