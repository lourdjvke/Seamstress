
'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Pause, Play, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';


type AboutDataMap = Record<string, any>;
const ABOUT_DATA: AboutDataMap = {

  'about-seamladies': {
     id: 'about-seamladies', label: 'About SeamLadies', heroTitle: 'ABOUT SEAMLADIES',
     heroImg: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=80',
     introBlock: { title: 'By Design', p1: 'We design timeless products with distinctive details and thoughtful construction. Quality and craftsmanship set our products apart. We focus on creating pieces that our customers love, keep and pass on — one of the most scalable ways we can lower our impact.', p2: 'As we evolve, we are committed to using innovative, lower-impact materials and production while preserving our high standards of quality and workmanship.' },
     featuredBlock: { img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1600&q=80', title: 'Materials & Quality', p1: 'Building on our longstanding use of natural and renewable materials, we are introducing innovative, lower-impact alternatives — while actively working across our supply chain to trace primary raw materials.', p2: 'We have rigorous testing protocols and work with third-party labs to ensure materials and products meet our restricted substances, safety and quality standards.' },
     tabSliderBlock: [
       { id: 'natural', label: 'Natural Fibers', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80', alt: 'Natural Fibers', text: 'Across our products, we use a range of natural, renewable materials like leather, raffia, cotton, silk, wool, rubber and jute. Over 95% of our leather is from certified tanneries.' },
       { id: 'recycled', label: 'Recycled Materials', image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1200&q=80', alt: 'Recycled', text: 'Our collections transition fillers and interior components to recycled content where possible. We expand recycled components in footwear, jewelry and swim.' }
     ],
     closingBlock: { img: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1200&q=80', title: 'Packaging Progress', p1: 'Our packaging is a harmonious blend of our heritage and sustainability. It is crafted from recycled and responsibly-sourced materials that meet rigorous environmental standards.', p2: 'We catalog every piece of protective and brand packaging, reducing anything unnecessary while optimizing shipping sizes to minimize waste.', linkText: 'Learn More' }
  },
  'our-approach': {
     id: 'our-approach', label: 'Our Approach', heroTitle: 'OUR APPROACH',
     heroImg: 'https://images.unsplash.com/photo-1558769132-cb1fac08c04b?auto=format&fit=crop&w=2000&q=80',
     introBlock: { title: 'Strategic Methods', p1: 'Our approach unites creative vision with industrial rigor. We map out precise workflows to eliminate friction between design intent and factory execution.', p2: 'We meticulously plan every step of the development cycle, ensuring predictable outcomes.' },
     featuredBlock: { img: 'https://images.unsplash.com/photo-1618220179428-22790b46a0eb?auto=format&fit=crop&w=1600&q=80', title: 'End-to-End Execution', p1: 'From sketch to final bulk delivery, our processes ensure consistency and scalability for luxury collections.', p2: 'We leverage deep technical expertise to optimize yields and margins at the earliest design stages.' },
     tabSliderBlock: [
       { id: 'dev', label: 'Development Phase', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80', alt: 'Pattern', text: 'We translate your aesthetic into technically viable ranges, providing master patterns and comprehensive tech packs.' },
       { id: 'prod', label: 'Production Phase', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80', alt: 'Factory', text: 'Precision manufacturing powered by our global network of certified ateliers and specialized facilities.' }
     ],
     closingBlock: { img: 'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?auto=format&fit=crop&w=1200&q=80', title: 'Accelerated Timelines', p1: 'We streamline the critical path for faster market delivery without sacrificing artisan quality.', p2: 'Our systems reduce friction and sampling waste, enabling agile market response.', linkText: 'Explore Programmes' }
  },
  'female-fit-philosophy': {
     id: 'female-fit-philosophy', label: 'Female Fit Philosophy', heroTitle: 'FEMALE FIT PHILOSOPHY',
     heroImg: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=2000&q=80',
     introBlock: { title: 'Anatomical Precision', p1: 'Fit is the foundational pillar of everything we do. Our team specializes in engineering garments that respect and enhance the female form.', p2: 'We obsess over biomechanical movement, ease distribution, and proportion balancing.' },
     featuredBlock: { img: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=1600&q=80', title: 'Mastering Proportions', p1: 'Our grading rules are rigorously tested across multiple size breaks to ensure absolute consistency.', p2: 'We account for real biomechanical movement in our patterns, ensuring comfort matches elegance.' },
     tabSliderBlock: [
       { id: 'blocks', label: 'Master Blocks', image: 'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=1200&q=80', alt: 'Mannequin', text: 'Proprietary blocks developed over thousands of fitting sessions to create the perfect foundational standard.' },
       { id: 'grading', label: 'Dynamic Grading', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=80', alt: 'Measure', text: 'Non-linear grading to ensure consistent fit and silhouette integrity across the entire size run.' }
     ],
     closingBlock: { img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80', title: 'The Perfect Silhouette', p1: 'Confidence begins with a garment that fits flawlessly. Our technical approach guarantees superior drape and structure.', p2: 'Our commitment to fit translates directly to brand loyalty and drastically reduced return rates.', linkText: 'View Fit Guide' }
  },
  'design-technical-team': {
     id: 'design-technical-team', label: 'Design & Technical Team', heroTitle: 'TECHNICAL TEAM',
     heroImg: 'https://images.unsplash.com/photo-1529156069898-49953eb1b5ce?auto=format&fit=crop&w=2000&q=80',
     introBlock: { title: 'Industry Veterans', p1: 'Our team comprises master pattern cutters, senior garment technologists, and production specialists drawn from top luxury houses.', p2: 'We operate as a seamless extension of your internal creative department.' },
     featuredBlock: { img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80', title: 'Technical Mastery', p1: 'We bridge the gap between pure design aspiration and industrial reality.', p2: 'Our specialists provide hands-on guidance through every phase of 2D and 3D prototyping.' },
     tabSliderBlock: [
       { id: 'pattern', label: 'Pattern Masters', image: 'https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?auto=format&fit=crop&w=1200&q=80', alt: 'Cutting', text: 'Artisans skilled in both traditional draping and advanced digital CAD pattern making.' },
       { id: 'qa', label: 'Quality Analysts', image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=1200&q=80', alt: 'Inspection', text: 'Dedicated QA leads who ensure stringent AQL 2.5 standards are met on every production line.' }
     ],
     closingBlock: { img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80', title: 'Collaborative Excellence', p1: 'By embedding our technical leads into your calendar, we drastically reduce sampling iterations.', p2: 'Our collaborative infrastructure protects your brand identity while guaranteeing scalability.', linkText: 'Meet The Team' }
  },
  'manufacturing-network': {
     id: 'manufacturing-network', label: 'Manufacturing Network', heroTitle: 'MANUFACTURING NETWORK',
     heroImg: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=2000&q=80',
     introBlock: { title: 'Global Infrastructure', p1: 'We maintain a highly curated, audited network of manufacturing hubs across the UK, Europe, and Asia.', p2: 'Each facility is specialized by product category to ensure supreme craftsmanship.' },
     featuredBlock: { img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80', title: 'Ethical & Audited', p1: 'Our partners undergo exhaustive social, ethical, and environmental compliance audits.', p2: 'We mandate fair living wages, transparent governance, and safe working conditions.' },
     tabSliderBlock: [
       { id: 'europe', label: 'European Hubs', image: 'https://images.unsplash.com/photo-1533038590840-1cbea676aeb3?auto=format&fit=crop&w=1200&q=80', alt: 'Europe', text: 'Specialized manufacturing hubs across Portugal, Italy, and Romania delivering exquisite luxury finishing.' },
       { id: 'asia', label: 'International Hubs', image: 'https://images.unsplash.com/photo-1558222218-b7b54eede3f3?auto=format&fit=crop&w=1200&q=80', alt: 'Global', text: 'High-volume ethical facilities equipped with advanced automated cutting and vertically integrated mills.' }
     ],
     closingBlock: { img: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80', title: 'Seamless Logistics', p1: 'Our integrated operations simplify international trade, customs, and freight consolidation.', p2: 'We deliver complete peace of mind from the factory floor to your fulfillment center.', linkText: 'View Network' }
  },
  'responsibility': {
     id: 'responsibility', label: 'Responsibility', heroTitle: 'RESPONSIBILITY',
     heroImg: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=2000&q=80',
     introBlock: { title: 'Sustainable Practices', p1: 'We are committed to advancing sustainable industrial practices and lowering our environmental impact.', p2: 'Responsibility is woven into our fabric sourcing, energy usage, and waste management protocols.' },
     featuredBlock: { img: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1600&q=80', title: 'Traceability & Ethics', p1: 'We actively trace primary raw materials and mandate third-party certifications (GOTS, OEKO-TEX).', p2: 'Our vendor code of conduct ensures all workers are treated with dignity and respect.' },
     tabSliderBlock: [
       { id: 'materials', label: 'Eco Materials', image: 'https://images.unsplash.com/photo-1618022325802-7e5e732e9786?auto=format&fit=crop&w=1200&q=80', alt: 'Eco', text: 'Sourcing organic cottons, recycled polyesters, and luxury deadstock to minimize virgin resource extraction.' },
       { id: 'community', label: 'Community Impact', image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=80', alt: 'Community', text: 'Fostering stable, long-term commercial relationships that strengthen communities and empower female workers.' }
     ],
     closingBlock: { img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80', title: 'Carbon & Waste Reduction', p1: 'We implement zero-waste cutting techniques and prioritize low-impact sea freight.', p2: 'Our continuous improvement roadmaps target measurable reductions in water and chemical usage.', linkText: 'Read Impact Report' }
  },
  'women-led-brands': {
     id: 'women-led-brands', label: 'Women-Led Brands', heroTitle: 'WOMEN-LED BRANDS',
     heroImg: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=2000&q=80',
     introBlock: { title: 'Empowering Founders', p1: 'We are dedicated to supporting and scaling fashion labels founded and led by women.', p2: 'Our infrastructure provides the technical backing necessary for female visionaries to thrive.' },
     featuredBlock: { img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80', title: 'Strategic Incubation', p1: 'Beyond manufacturing, we offer grounded industrial partnerships that strip away superficial coaching.', p2: 'We provide real supply chain access, vetted mills, and precise cost modeling.' },
     tabSliderBlock: [
       { id: 'support', label: 'Technical Mentorship', image: 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?auto=format&fit=crop&w=1200&q=80', alt: 'Mentor', text: 'Direct access to our senior technical team to navigate the complexities of collection launches.' },
       { id: 'growth', label: 'Scalable Growth', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80', alt: 'Growth', text: 'Flexible MOQs and agile manufacturing pathways designed to scale alongside your business.' }
     ],
     closingBlock: { img: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1200&q=80', title: 'A Community of Leaders', p1: 'Join a network of successful female founders transforming the modern fashion landscape.', p2: 'We believe that investing in women-led brands yields the highest creative dividends.', linkText: 'Join Our Network' }
  },
  'project-archive': {
     id: 'project-archive', label: 'Project Archive', heroTitle: 'PROJECT ARCHIVE',
     heroImg: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=2000&q=80',
     introBlock: { title: 'Legacy of Craft', p1: 'A curated look back at some of our most complex and rewarding manufacturing projects.', p2: 'Our archive serves as a testament to our capabilities in tailoring, knitwear, and eveningwear.' },
     featuredBlock: { img: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&w=1600&q=80', title: 'Bespoke Developments', p1: 'Explore innovative fabric treatments, archival stitch finishes, and complex draping techniques.', p2: 'These case studies highlight our commitment to overcoming technical design challenges.' },
     tabSliderBlock: [
       { id: 'tailoring', label: 'Sartorial Tailoring', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80', alt: 'Suit', text: 'Floating horsehair canvassing, precise chest felt padding, and razor-sharp pressed lapels.' },
       { id: 'evening', label: 'Couture Occasionwear', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1200&q=80', alt: 'Dress', text: 'Hand-applied bugle beading, internal corset boning, and cascading silk tulle layering.' }
     ],
     closingBlock: { img: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=80', title: 'Design Heritage', p1: 'We preserve historic patterns and development milestones for future inspiration.', p2: 'Our digital repository compounds technical efficiency year over year.', linkText: 'View Case Studies' }
  },
  'journal': {
     id: 'journal', label: 'Journal', heroTitle: 'JOURNAL',
     heroImg: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=2000&q=80',
     introBlock: { title: 'Industry Insights', p1: 'Read our latest editorial features on manufacturing trends, material science, and supply chain strategy.', p2: 'We share deep technical knowledge to elevate the industry standard.' },
     featuredBlock: { img: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=1600&q=80', title: 'Expert Perspectives', p1: 'Interviews with master pattern cutters, textile innovators, and global factory directors.', p2: 'Discover the meticulous processes that go into creating luxury womenswear.' },
     tabSliderBlock: [
       { id: 'materials', label: 'Material Innovations', image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8d59?auto=format&fit=crop&w=1200&q=80', alt: 'Textiles', text: 'Exploring the future of bio-fabricated leathers and regenerative organic agriculture.' },
       { id: 'process', label: 'Behind The Seams', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=1200&q=80', alt: 'Sewing', text: 'A technical breakdown of complex garment constructions and factory-floor realities.' }
     ],
     closingBlock: { img: 'https://images.unsplash.com/photo-1522881113591-b05d6dbf08ef?auto=format&fit=crop&w=1200&q=80', title: 'Stay Informed', p1: 'Subscribe to our technical dispatches for monthly updates on production lead times and market shifts.', p2: 'Knowledge is the most critical tool for navigating modern fashion logistics.', linkText: 'Read Latest Posts' }
  },
  'careers': {
     id: 'careers', label: 'Careers', heroTitle: 'CAREERS',
     heroImg: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2000&q=80',
     introBlock: { title: 'Join Our Team', p1: 'We are always looking for passionate garment technologists, production coordinators, and pattern masters.', p2: 'Build your career at the intersection of creative design and precision manufacturing.' },
     featuredBlock: { img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80', title: 'Our Culture', p1: 'We foster a collaborative, detail-oriented environment that values technical mastery and continuous learning.', p2: 'Diversity, inclusion, and mutual respect are the cornerstones of our workplace.' },
     tabSliderBlock: [
       { id: 'roles', label: 'Open Positions', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80', alt: 'Desk', text: 'From London to our European hubs, explore active openings across our technical and operations teams.' },
       { id: 'benefits', label: 'Team Benefits', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80', alt: 'Culture', text: 'Comprehensive healthcare, continuous education stipends, and flexible working environments.' }
     ],
     closingBlock: { img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80', title: 'Shape The Future', p1: 'Help us redefine the standard of luxury womenswear manufacturing.', p2: 'If you are obsessed with quality and industrial execution, we want to hear from you.', linkText: 'View Open Roles' }
  },
  'contact': {
     id: 'contact', label: 'Contact', heroTitle: 'CONTACT US',
     heroImg: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=2000&q=80',
     isContact: true
  }
};

const TAB_KEYS = Object.keys(ABOUT_DATA);

function AboutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentTabId = searchParams.get('tab') || 'about-seamladies';
  const activeData = ABOUT_DATA[currentTabId as keyof typeof ABOUT_DATA] || ABOUT_DATA['about-seamladies'];

  const [prevTabId, setPrevTabId] = useState(currentTabId);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  if (prevTabId !== currentTabId) {
    setPrevTabId(currentTabId);
    setActiveSlideIdx(0);
    setProgress(0);
  }

  const duration = 6000;
  const stepTime = 50;

  useEffect(() => {
    if (isPaused || activeData.isContact || !activeData.tabSliderBlock) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (stepTime / duration) * 100;
        if (next >= 100) {
          setActiveSlideIdx((curr) => (curr + 1) % activeData.tabSliderBlock.length);
          return 0;
        }
        return next;
      });
    }, stepTime);

    return () => clearInterval(interval);
  }, [isPaused, activeSlideIdx, activeData]);

  const handleTabClick = (index: number) => {
    setActiveSlideIdx(index);
    setProgress(0);
  };

  const handleNextSlide = () => {
    if(!activeData.tabSliderBlock) return;
    setActiveSlideIdx((prev) => (prev + 1) % activeData.tabSliderBlock.length);
    setProgress(0);
  };

  const setTab = (tabId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabId);
    router.push(pathname + '?' + params.toString(), { scroll: false });
  };

  const currentSlide = activeData.tabSliderBlock ? activeData.tabSliderBlock[activeSlideIdx] : null;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pt-20 md:pt-28">
      {/* Secondary Sub-Navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="w-full overflow-x-auto no-scrollbar py-4 px-4 md:px-8">
          <nav className="flex whitespace-nowrap gap-6 md:gap-8 items-center w-max mx-auto min-w-max">
            {TAB_KEYS.map((key) => {
              const item = ABOUT_DATA[key as keyof typeof ABOUT_DATA];
              const isActive = activeData.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className={`uppercase text-xs tracking-[0.12em] font-medium transition-colors cursor-pointer inline-block whitespace-nowrap ${
                    isActive
                      ? 'text-gray-900 font-semibold border-b border-gray-900 pb-0.5'
                      : 'text-gray-400 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[420px] md:h-[60vh] md:min-h-[520px] overflow-hidden flex items-center justify-center bg-gray-100">
        <div className="absolute inset-0 z-0">
          <Image
            src={activeData.heroImg}
            alt={activeData.heroTitle}
            fill
            className="object-cover brightness-90"
            priority
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Hero Title with fold slot animation */}
        <div className="relative z-10 text-white text-center uppercase px-4 w-full max-w-[92vw] md:max-w-[85vw] lg:max-w-[80vw] mx-auto min-h-[160px] sm:min-h-[180px] md:min-h-[220px] lg:min-h-[260px] h-40 sm:h-48 md:h-56 lg:h-64 flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.h1
              key={activeData.id}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
              className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.12em] md:tracking-[0.18em] font-normal w-full text-center mx-auto leading-tight md:leading-snug px-4 drop-shadow-md"
            >
              {activeData.heroTitle}
            </motion.h1>
          </AnimatePresence>
        </div>
      </section>

      {/* Conditional Content Rendering */}
      {activeData.isContact ? (
        /* Contact Form Layout */
        <section className="py-16 md:py-24 px-[0.4em] md:px-6 max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24">
            
            {/* Left: Text Content */}
            <div className="flex flex-col justify-start text-center md:text-left">
              <h2 className="text-[15px] md:text-base tracking-[0.15em] uppercase mb-4 md:mb-6 text-gray-900 font-medium">
                Get in Touch
              </h2>
              <p className="text-[13px] md:text-[14px] text-[#333333] leading-relaxed font-normal">
                Whether you’re inquiring about our manufacturing network, seeking guidance on female fit development, or exploring partnership opportunities, our dedicated team is here to assist you. Please fill out the form, and a specialist will be in touch shortly.
              </p>
            </div>
            
            {/* Right: Form */}
            <div className="flex flex-col gap-4">
              {/* Mobile: Name and Email side by side with gap-[0.4em] */}
              <div className="flex flex-row gap-[0.4em] w-full">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-1/2 h-12 px-4 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-900 text-[13px] transition-colors" 
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-1/2 h-12 px-4 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-900 text-[13px] transition-colors" 
                />
              </div>
              <select className="w-full h-12 px-4 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-900 text-[13px] bg-white text-gray-500 cursor-pointer appearance-none rounded-none transition-colors">
                <option value="" disabled selected>Reason for contacting</option>
                <option value="manufacturing">Manufacturing Inquiry</option>
                <option value="partnership">Partnership</option>
                <option value="career">Careers</option>
                <option value="other">Other</option>
              </select>
              <textarea 
                placeholder="Message" 
                className="w-full h-32 px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-900 text-[13px] resize-none transition-colors"
              />
              <div className="flex justify-end">
                {/* Button size matching footer signup */}
                <button className="px-12 md:px-16 py-3 md:py-3.5 bg-[#1a1a1a] text-white text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-black transition-colors cursor-pointer">
                  Submit
                </button>
              </div>
            </div>

          </div>
        </section>
      ) : (
        /* Standard Tab Layout */
        <motion.div
          key={activeData.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Intro Section */}
          <section className="py-10 md:py-16 px-6 max-w-4xl mx-auto text-center">
            <h2 className="text-[15px] md:text-base tracking-[0.15em] uppercase mb-4 md:mb-6 text-gray-900 font-medium">
              {activeData.introBlock.title}
            </h2>
            <div className="text-[13px] md:text-[14px] text-[#333333] leading-relaxed max-w-[46rem] mx-auto space-y-4 font-normal">
              <p>{activeData.introBlock.p1}</p>
              <p>{activeData.introBlock.p2}</p>
            </div>
          </section>

          {/* Featured Hardware/Quality Image */}
          <section className="w-full max-w-[1400px] mx-auto px-4 md:px-8 mb-12 md:mb-20">
            <div className="relative w-full aspect-[16/10] md:aspect-[21/9] mb-10 md:mb-14 overflow-hidden bg-gray-100">
              <Image
                src={activeData.featuredBlock.img}
                alt={activeData.featuredBlock.title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="max-w-3xl mx-auto text-center px-4">
              <h2 className="text-[15px] md:text-base tracking-[0.15em] uppercase mb-5 md:mb-7 text-gray-900 font-medium">
                {activeData.featuredBlock.title}
              </h2>
              <div className="text-[13px] md:text-[14px] text-[#333333] leading-relaxed space-y-4 font-normal">
                <p>{activeData.featuredBlock.p1}</p>
                <p>{activeData.featuredBlock.p2}</p>
              </div>
            </div>
          </section>

          {/* Interactive Progress Tab Slider Section */}
          <section className="w-full bg-white mb-4 md:mb-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[580px]">
              
              {/* Text/Tabs Container */}
              <div className="order-2 md:order-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 xl:px-28 py-10 md:py-16">
                <div className="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar">
                  {activeData.tabSliderBlock.map((slide: any, idx: number) => {
                    const isActive = activeSlideIdx === idx;
                    return (
                      <button
                        key={slide.id}
                        onClick={() => handleTabClick(idx)}
                        className="relative pb-3 text-[11px] md:text-xs tracking-[0.15em] font-semibold uppercase whitespace-nowrap cursor-pointer transition-colors"
                      >
                        <span className={isActive ? 'text-gray-900' : 'text-gray-400 hover:text-gray-700'}>
                          {slide.label}
                        </span>
                        {isActive ? (
                          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-200">
                            <div
                              className="h-full bg-gray-900 transition-all ease-linear"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        ) : (
                          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent" />
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="text-[13px] md:text-[14px] text-[#333333] leading-relaxed text-center md:text-left transition-opacity duration-300">
                  <p>{currentSlide?.text}</p>
                </div>
              </div>

              {/* Image Container */}
              <div className="order-1 md:order-2 relative w-full h-[45vh] md:h-auto min-h-[380px] bg-gray-100 overflow-hidden">
                {currentSlide && (
                  <Image
                    src={currentSlide.image}
                    alt={currentSlide.alt}
                    fill
                    className="object-cover transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                )}
                <button
                  onClick={handleNextSlide}
                  className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center cursor-pointer shadow-sm transition-all z-10"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 text-gray-900" />
                </button>
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="absolute bottom-6 right-6 z-10 bg-white/85 hover:bg-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer shadow-sm transition-all"
                  aria-label={isPaused ? 'Resume auto progress' : 'Pause auto progress'}
                >
                  {isPaused ? (
                    <Play className="w-3.5 h-3.5 text-gray-900 fill-gray-900 ml-0.5" />
                  ) : (
                    <Pause className="w-3.5 h-3.5 text-gray-900 fill-gray-900" />
                  )}
                </button>
              </div>

            </div>
          </section>

          {/* Closing Section */}
          <section className="w-full bg-white pb-16 md:pb-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[580px]">
              <div className="order-1 relative w-full h-[45vh] md:h-auto min-h-[380px] bg-gray-100 overflow-hidden">
                <Image
                  src={activeData.closingBlock.img}
                  alt={activeData.closingBlock.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="order-2 flex flex-col justify-center items-center text-center px-6 md:px-16 lg:px-24 xl:px-28 py-10 md:py-16">
                <h2 className="text-[15px] md:text-base tracking-[0.15em] uppercase mb-4 md:mb-6 text-gray-900 font-medium">
                  {activeData.closingBlock.title}
                </h2>
                <div className="text-[13px] md:text-[14px] text-[#333333] leading-relaxed space-y-4 mb-8 font-normal">
                  <p>{activeData.closingBlock.p1}</p>
                  <p>{activeData.closingBlock.p2}</p>
                </div>
                <button
                  onClick={() => setTab('contact')}
                  className="uppercase text-xs tracking-[0.15em] text-gray-900 border-b border-gray-900 pb-1 inline-block hover:opacity-60 transition-opacity font-medium cursor-pointer"
                >
                  {activeData.closingBlock.linkText}
                </button>
              </div>
            </div>
          </section>
        </motion.div>
      )}
    </div>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <AboutContent />
    </Suspense>
  );
}
