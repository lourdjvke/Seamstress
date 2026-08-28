'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { 
  X, 
  Plus, 
  Minus,
  Check 
} from 'lucide-react';
import ProductCard, { Product } from '@/components/ProductCard';

const MAIN_CATEGORIES = [
  { name: 'All Womenswear', slug: 'all', label: 'All Womenswear' },
  { name: 'Product Archive', slug: 'product-archive', label: 'Product Archive' },
  { name: 'New Developments', slug: 'new-developments', label: 'New Developments' },
  { name: 'Sample Library', slug: 'sample-library', label: 'Sample Library' },
  { name: 'Women’s Blanks', slug: 'womens-blanks', label: 'Women’s Blanks' },
];

const ALL_PRODUCTS: Product[] = [
  // 1. PRODUCT ARCHIVE ITEMS
  {
    id: 'arch-1',
    title: 'Printed Viscose Runway Dress',
    price: '£595',
    tag: 'Product Archive',
    tags: ['Product Archive', 'Runway'],
    category: 'product-archive',
    type: 'Dresses',
    style: 'Tops & Blouses',
    size: ['S', 'M', 'L'],
    material: 'Viscose',
    images: [
      'https://loremflickr.com/g/600/800/dress,runway,fashion?lock=101',
      'https://loremflickr.com/g/600/800/dress,editorial,fashion?lock=102',
    ],
  },
  {
    id: 'arch-2',
    title: 'Archival Wool Cardigan',
    price: '£550',
    tag: 'Product Archive',
    tags: ['Product Archive'],
    category: 'product-archive',
    type: 'Sweaters',
    style: 'Sweaters',
    size: ['S', 'M', 'L'],
    material: 'Wool',
    images: [
      'https://loremflickr.com/g/600/800/cardigan,knitwear,fashion?lock=103',
      'https://loremflickr.com/g/600/800/sweater,wool,fashion?lock=104',
    ],
    colors: [
      { colorHex: '#222222', imgSrc: 'https://loremflickr.com/g/600/800/cardigan,black,fashion?lock=103' },
      { colorHex: '#d2b48c', imgSrc: 'https://loremflickr.com/g/600/800/cardigan,beige,fashion?lock=104' },
    ],
  },
  {
    id: 'arch-3',
    title: 'Silk-Front Jacquard Top',
    price: '£445',
    tag: 'Product Archive',
    tags: ['Product Archive', 'Silk'],
    category: 'product-archive',
    type: 'Tops & Shirts',
    style: 'Tops & Blouses',
    size: ['S', 'M'],
    material: 'Silk',
    images: [
      'https://loremflickr.com/g/600/800/blouse,silk,fashion?lock=105',
      'https://loremflickr.com/g/600/800/top,jacquard,fashion?lock=106',
    ],
  },
  {
    id: 'arch-4',
    title: 'Crinkled Viscose Runway Top',
    price: '£325',
    tag: 'Product Archive',
    tags: ['Product Archive', 'Runway'],
    category: 'product-archive',
    type: 'Tops & Shirts',
    style: 'Tops & Blouses',
    size: ['S', 'M', 'L'],
    material: 'Viscose',
    images: [
      'https://loremflickr.com/g/600/800/top,viscose,fashion?lock=107',
      'https://loremflickr.com/g/600/800/top,runway,fashion?lock=108',
    ],
  },
  {
    id: 'arch-5',
    title: 'Crinkled Viscose Skirt',
    price: '£345',
    tag: 'Product Archive',
    tags: ['Product Archive', 'Runway'],
    category: 'product-archive',
    type: 'Pants & Skirts',
    style: 'Skirts',
    size: ['26', '27', '28', '29'],
    material: 'Viscose',
    images: [
      'https://loremflickr.com/g/600/800/skirt,viscose,fashion?lock=109',
      'https://loremflickr.com/g/600/800/skirt,editorial,fashion?lock=110',
    ],
  },
  {
    id: 'arch-6',
    title: 'Embellished Mesh Dress',
    price: '£3,300',
    tag: 'Product Archive',
    tags: ['Product Archive', 'Sold Out'],
    category: 'product-archive',
    type: 'Dresses',
    style: 'Tops & Blouses',
    size: ['S', 'M'],
    material: 'Silk',
    images: [
      'https://loremflickr.com/g/600/800/eveningdress,fashion,couture?lock=111',
      'https://loremflickr.com/g/600/800/dress,mesh,fashion?lock=112',
    ],
  },

  // 2. NEW DEVELOPMENTS
  {
    id: 'dev-1',
    title: 'Bonded Poplin Trench Dress',
    price: '£695',
    tag: 'New Developments',
    tags: ['New Developments', 'Spring 26'],
    category: 'new-developments',
    type: 'Dresses',
    style: 'Coats & Puffers',
    size: ['S', 'M', 'L'],
    material: 'Cotton',
    images: [
      'https://loremflickr.com/g/600/800/trench,coat,fashion?lock=201',
      'https://loremflickr.com/g/600/800/trenchdress,fashion?lock=202',
    ],
  },
  {
    id: 'dev-2',
    title: 'Sculpted Double-Faced Wool Jacket',
    price: '£1,250',
    tag: 'New Developments',
    tags: ['New Developments', 'Tailoring'],
    category: 'new-developments',
    type: 'Jackets & Outerwear',
    style: 'Blazers',
    size: ['S', 'M', 'L'],
    material: 'Wool',
    images: [
      'https://loremflickr.com/g/600/800/blazer,jacket,tailored?lock=203',
      'https://loremflickr.com/g/600/800/woolcoat,fashion?lock=204',
    ],
  },
  {
    id: 'dev-3',
    title: 'Seamless Technical Rib Knit Bodysuit',
    price: '£385',
    tag: 'New Developments',
    tags: ['New Developments'],
    category: 'new-developments',
    type: 'Tops & Shirts',
    style: 'T-Shirts and Tank Tops',
    size: ['S', 'M', 'L'],
    material: 'Jersey',
    images: [
      'https://loremflickr.com/g/600/800/bodysuit,ribbed,fashion?lock=205',
      'https://loremflickr.com/g/600/800/bodysuit,minimalist,fashion?lock=206',
    ],
    colors: [
      { colorHex: '#111111', imgSrc: 'https://loremflickr.com/g/600/800/bodysuit,black,fashion?lock=205' },
      { colorHex: '#e5e0d8', imgSrc: 'https://loremflickr.com/g/600/800/bodysuit,beige,fashion?lock=206' },
    ],
  },
  {
    id: 'dev-4',
    title: 'Bias-Cut Silk Crepe Slip Skirt',
    price: '£495',
    tag: 'New Developments',
    tags: ['New Developments', 'Silk'],
    category: 'new-developments',
    type: 'Pants & Skirts',
    style: 'Skirts',
    size: ['26', '27', '28', '29', '30'],
    material: 'Silk',
    images: [
      'https://loremflickr.com/g/600/800/silk,skirt,fashion?lock=207',
      'https://loremflickr.com/g/600/800/slipskirt,editorial?lock=208',
    ],
  },
  {
    id: 'dev-5',
    title: 'Water-Repellent Waxed Popover Jacket',
    price: '£850',
    tag: 'New Developments',
    tags: ['New Developments', 'Outerwear'],
    category: 'new-developments',
    type: 'Jackets & Outerwear',
    style: 'Jackets',
    size: ['S', 'M', 'L'],
    material: 'Cotton',
    images: [
      'https://loremflickr.com/g/600/800/jacket,outerwear,minimalist?lock=209',
      'https://loremflickr.com/g/600/800/parka,jacket,fashion?lock=210',
    ],
  },
  {
    id: 'dev-6',
    title: 'Engineered Pleat Midi Dress',
    price: '£825',
    tag: 'New Developments',
    tags: ['New Developments'],
    category: 'new-developments',
    type: 'Dresses',
    style: 'Tops & Blouses',
    size: ['S', 'M', 'L'],
    material: 'Polyester Blend',
    images: [
      'https://loremflickr.com/g/600/800/pleated,dress,fashion?lock=211',
      'https://loremflickr.com/g/600/800/mididress,runway?lock=212',
    ],
  },

  // 3. SAMPLE LIBRARY
  {
    id: 'smp-1',
    title: 'Racerback Tank [Sample Ref #04]',
    price: '£180',
    tag: 'Sample Library',
    tags: ['Sample Library', 'Prototype'],
    category: 'sample-library',
    type: 'Tops & Shirts',
    style: 'T-Shirts and Tank Tops',
    size: ['M'],
    material: 'Jersey',
    images: [
      'https://loremflickr.com/g/600/800/tanktop,fashion,minimalist?lock=301',
      'https://loremflickr.com/g/600/800/tank,top,fashion?lock=302',
    ],
  },
  {
    id: 'smp-2',
    title: 'Striped Flared Knit Skirt [Sample Ref #12]',
    price: '£320',
    tag: 'Sample Library',
    tags: ['Sample Library', 'Knit Trial'],
    category: 'sample-library',
    type: 'Pants & Skirts',
    style: 'Skirts',
    size: ['27'],
    material: 'Wool',
    images: [
      'https://loremflickr.com/g/600/800/knitskirt,fashion,stripes?lock=303',
      'https://loremflickr.com/g/600/800/skirt,flared,fashion?lock=304',
    ],
  },
  {
    id: 'smp-3',
    title: 'Crushed Silk Fit Prototype [Sample Ref #09]',
    price: '£295',
    tag: 'Sample Library',
    tags: ['Sample Library', 'Fit Trial'],
    category: 'sample-library',
    type: 'Tops & Shirts',
    style: 'Tunics',
    size: ['S'],
    material: 'Silk',
    images: [
      'https://loremflickr.com/g/600/800/silktop,minimalist,fashion?lock=305',
      'https://loremflickr.com/g/600/800/tunic,silk,fashion?lock=306',
    ],
  },
  {
    id: 'smp-4',
    title: 'Tie-Back Crepe Prototype [Sample Ref #19]',
    price: '£360',
    tag: 'Sample Library',
    tags: ['Sample Library', 'Drape Sample'],
    category: 'sample-library',
    type: 'Dresses',
    style: 'Tops & Blouses',
    size: ['S'],
    material: 'Viscose',
    images: [
      'https://loremflickr.com/g/600/800/crepedress,fashion?lock=307',
      'https://loremflickr.com/g/600/800/drapedress,minimalist?lock=308',
    ],
  },

  // 4. WOMEN’S BLANKS
  {
    id: 'blk-1',
    title: 'Heavyweight Supima Cotton Tee Blank',
    price: '£95',
    tag: 'Women’s Blanks',
    tags: ['Women’s Blanks', 'Core'],
    category: 'womens-blanks',
    type: 'Tops & Shirts',
    style: 'T-Shirts and Tank Tops',
    size: ['S', 'M', 'L'],
    material: 'Cotton',
    images: [
      'https://loremflickr.com/g/600/800/tshirt,white,minimalist?lock=401',
      'https://loremflickr.com/g/600/800/tee,cotton,fashion?lock=402',
    ],
    colors: [
      { colorHex: '#ffffff', imgSrc: 'https://loremflickr.com/g/600/800/tshirt,white,minimalist?lock=401' },
      { colorHex: '#111111', imgSrc: 'https://loremflickr.com/g/600/800/tshirt,black,minimalist?lock=402' },
      { colorHex: '#999999', imgSrc: 'https://loremflickr.com/g/600/800/tshirt,grey,minimalist?lock=403' },
    ],
  },
  {
    id: 'blk-2',
    title: 'French Terry Relaxed Sweatpant Blank',
    price: '£165',
    tag: 'Women’s Blanks',
    tags: ['Women’s Blanks', 'Fleece'],
    category: 'womens-blanks',
    type: 'Pants & Skirts',
    style: 'Pants',
    size: ['S', 'M', 'L'],
    material: 'Cotton',
    images: [
      'https://loremflickr.com/g/600/800/sweatpants,lounge,fashion?lock=404',
      'https://loremflickr.com/g/600/800/joggers,terry,fashion?lock=405',
    ],
    colors: [
      { colorHex: '#E5E0D8', imgSrc: 'https://loremflickr.com/g/600/800/sweatpants,beige,fashion?lock=404' },
      { colorHex: '#111111', imgSrc: 'https://loremflickr.com/g/600/800/sweatpants,black,fashion?lock=405' },
    ],
  },
  {
    id: 'blk-3',
    title: 'Fine Gauge Merino Crewneck Blank',
    price: '£225',
    tag: 'Women’s Blanks',
    tags: ['Women’s Blanks', 'Knitwear'],
    category: 'womens-blanks',
    type: 'Sweaters',
    style: 'Sweaters',
    size: ['S', 'M', 'L'],
    material: 'Wool',
    images: [
      'https://loremflickr.com/g/600/800/merino,sweater,knitwear?lock=406',
      'https://loremflickr.com/g/600/800/crewneck,wool,fashion?lock=407',
    ],
    colors: [
      { colorHex: '#5C4033', imgSrc: 'https://loremflickr.com/g/600/800/merino,brown,knitwear?lock=406' },
      { colorHex: '#111111', imgSrc: 'https://loremflickr.com/g/600/800/merino,black,knitwear?lock=407' },
      { colorHex: '#999999', imgSrc: 'https://loremflickr.com/g/600/800/merino,grey,knitwear?lock=408' },
    ],
  },
  {
    id: 'blk-4',
    title: 'Crisp Organic Poplin Button-Down Blank',
    price: '£175',
    tag: 'Women’s Blanks',
    tags: ['Women’s Blanks', 'Shirting'],
    category: 'womens-blanks',
    type: 'Tops & Shirts',
    style: 'Tops & Blouses',
    size: ['S', 'M', 'L'],
    material: 'Cotton',
    images: [
      'https://loremflickr.com/g/600/800/shirt,white,poplin?lock=409',
      'https://loremflickr.com/g/600/800/buttondown,blue,fashion?lock=410',
    ],
    colors: [
      { colorHex: '#FFFFFF', imgSrc: 'https://loremflickr.com/g/600/800/shirt,white,poplin?lock=409' },
      { colorHex: '#1E70BF', imgSrc: 'https://loremflickr.com/g/600/800/buttondown,blue,fashion?lock=410' },
    ],
  },
];

// Featured Interruption Items
const FEATURED_ITEMS: Product[] = [
  {
    id: 'feat-1',
    title: 'Racerback Tank [Archive Cut]',
    price: '£350',
    tag: 'Product Archive',
    images: [
      'https://loremflickr.com/g/600/800/tank,fashion,minimalist?lock=501',
      'https://loremflickr.com/g/600/800/top,editorial,fashion?lock=502',
    ],
  },
  {
    id: 'feat-2',
    title: 'Striped Flared Skirt [Dev Prototype]',
    price: '£795',
    tag: 'New Developments',
    images: [
      'https://loremflickr.com/g/600/800/flaredskirt,fashion,paris?lock=503',
      'https://loremflickr.com/g/600/800/skirt,runway,fashion?lock=504',
    ],
  },
  {
    id: 'feat-3',
    title: 'Fine Wool Cardigan [Sample #08]',
    price: '£550',
    tag: 'Sample Library',
    images: [
      'https://loremflickr.com/g/600/800/woolcardigan,knitwear,luxury?lock=505',
      'https://loremflickr.com/g/600/800/cardigan,editorial,paris?lock=506',
    ],
    colors: [
      { colorHex: '#111111', imgSrc: 'https://loremflickr.com/g/600/800/woolcardigan,black,luxury?lock=505' },
      { colorHex: '#d2b48c', imgSrc: 'https://loremflickr.com/g/600/800/woolcardigan,beige,luxury?lock=506' },
    ],
  },
  {
    id: 'feat-4',
    title: 'Tie-Back Crepe Dress [Blank]',
    price: '£595',
    tag: 'Women’s Blanks',
    images: [
      'https://loremflickr.com/g/600/800/dress,black,minimalist?lock=507',
      'https://loremflickr.com/g/600/800/crepedress,editorial,paris?lock=508',
    ],
  },
];

// Filter Options
const FILTER_TYPES = [
  'All',
  'Dresses',
  'Tops & Shirts',
  'Pants & Skirts',
  'Jackets & Outerwear',
  'Sweaters',
];

const FILTER_STYLES = [
  'Tunics',
  'Tops & Blouses',
  'Sweaters',
  'Shorts',
  'Skirts',
  'Pants',
  'Denim',
  'Coats & Puffers',
  'Blazers',
  'Jackets',
  'T-Shirts and Tank Tops',
];

const FILTER_SIZES = ['26', '27', '28', '29', '30', 'S', 'M', 'L'];

const FILTER_COLORS = [
  { name: 'Beige', hex: '#E5E0D8' },
  { name: 'Black', hex: '#000000' },
  { name: 'Blue', hex: '#1E70BF' },
  { name: 'Brown', hex: '#5C4033' },
  { name: 'Gray', hex: '#999999' },
  { name: 'Green', hex: '#008037' },
  { name: 'Pink', hex: '#F1A1B4' },
  { name: 'Red', hex: '#E31B23' },
  { name: 'White', hex: '#FFFFFF' },
];

const FILTER_MATERIALS = [
  'Cotton',
  'Denim',
  'Jersey',
  'Leather',
  'Polyester Blend',
  'Silk',
  'Viscose',
  'Wool',
];

function ExploreContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL Query State (Single source of truth)
  const activeCategory = searchParams.get('category') || 'all';
  const selectedTag = searchParams.get('tag') || '';
  const selectedType = searchParams.get('type') || 'All';
  const sortOption = searchParams.get('sort') || 'View All';

  const [showNavbarLinks, setShowNavbarLinks] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [showCollectionDetails, setShowCollectionDetails] = useState<boolean>(false);
  const [mobileColumns, setMobileColumns] = useState<1 | 2>(2);

  // Sort State Popover
  const [showSortDropdown, setShowSortDropdown] = useState<boolean>(false);

  // Filter Drawer State
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  // Navbar scroll hide/show listener
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 50) {
        setShowNavbarLinks(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbarLinks(false);
      } else if (currentScrollY < lastScrollY - 5) {
        setShowNavbarLinks(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Prevent background scroll when filter is open
  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFilterOpen]);

  // Helper to update URL params cleanly
  const updateUrlParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val === null || val === '' || val === 'all' || val === 'All' || val === 'View All') {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    });
    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
  };

  const handleCategorySelect = (slug: string) => {
    updateUrlParams({ category: slug === 'all' ? null : slug, tag: null });
  };

  const handleTagClick = (tag: string) => {
    const newTag = selectedTag === tag ? null : tag;
    updateUrlParams({ tag: newTag });
  };

  const toggleStyle = (style: string) => {
    setSelectedStyles(prev => 
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const toggleMaterial = (mat: string) => {
    setSelectedMaterials(prev => 
      prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]
    );
  };

  const clearAllFilters = () => {
    setSelectedStyles([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedMaterials([]);
    updateUrlParams({ tag: null, type: null, category: null, sort: null });
  };

  // Filter and sort products reactively
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((prod) => {
      // 1. Category tab filter
      if (activeCategory !== 'all') {
        if (prod.category !== activeCategory) return false;
      }

      // 2. Tag filter
      if (selectedTag) {
        const hasTag = prod.tag === selectedTag || prod.tags?.includes(selectedTag);
        if (!hasTag) return false;
      }

      // 3. Type filter
      if (selectedType !== 'All') {
        if (prod.type !== selectedType) return false;
      }

      // 4. Style filter
      if (selectedStyles.length > 0 && prod.style) {
        if (!selectedStyles.includes(prod.style)) return false;
      }

      // 5. Size filter
      if (selectedSizes.length > 0 && prod.size) {
        const hasSize = prod.size.some(s => selectedSizes.includes(s));
        if (!hasSize) return false;
      }

      // 6. Material filter
      if (selectedMaterials.length > 0 && prod.material) {
        if (!selectedMaterials.includes(prod.material)) return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = parseInt(a.price.replace(/[^\d]/g, ''), 10) || 0;
      const priceB = parseInt(b.price.replace(/[^\d]/g, ''), 10) || 0;
      if (sortOption === 'Price Low To High') return priceA - priceB;
      if (sortOption === 'Price High To Low') return priceB - priceA;
      return 0;
    });
  }, [activeCategory, selectedTag, selectedType, selectedStyles, selectedSizes, selectedMaterials, sortOption]);

  const totalActiveFilters = 
    (selectedType !== 'All' ? 1 : 0) +
    (selectedTag ? 1 : 0) +
    selectedStyles.length +
    selectedSizes.length +
    selectedColors.length +
    selectedMaterials.length;

  const sortOptions = ['View All', 'Price Low To High', 'Price High To Low'];

  return (
    <div className="min-h-screen bg-white text-gray-900 text-sm font-sans pt-28 md:pt-36">
      {/* Category Sub-header Navigation: Tree-style list */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full overflow-x-auto no-scrollbar py-4 px-4 md:px-8">
          <nav className="flex justify-center min-w-max mx-auto">
            <ul className="flex space-x-6 md:space-x-8 items-center justify-center text-[11px] tracking-wider uppercase text-gray-500 font-medium">
              {MAIN_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.slug;
                return (
                  <li key={cat.slug} className="flex items-center">
                    <button
                      onClick={() => handleCategorySelect(cat.slug)}
                      className={`transition-colors cursor-pointer flex items-center gap-1 ${
                        isActive
                          ? 'text-black font-bold border-b border-black pb-1'
                          : 'hover:text-black'
                      }`}
                    >
                      <span>{cat.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className={`w-full max-w-full px-4 md:px-8 py-4 flex justify-between items-center text-xs font-medium tracking-wider uppercase bg-white z-40 sticky transition-all duration-500 border-b border-gray-100 ${showNavbarLinks ? 'top-[64px] md:top-[108px]' : 'top-[64px]'}`}>
        
        {/* Left side: Active Tag Filter Indicator Pill if selected */}
        <div>
          {selectedTag && (
            <div className="flex items-center gap-1 bg-gray-100 text-black px-2.5 py-0.5 rounded-full text-[10px] lowercase tracking-normal">
              <span>tag: {selectedTag}</span>
              <button 
                onClick={() => {
                  updateUrlParams({ tag: null });
                }} 
                className="hover:text-red-500 cursor-pointer ml-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Right side: Filter & Sort Controls + Mobile layout toggles */}
        <div className="ml-auto flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="font-semibold uppercase tracking-wider cursor-pointer flex items-center hover:opacity-75 transition-opacity"
            >
              <span>Filter</span>
              {totalActiveFilters > 0 && (
                <span className="ml-1 w-4 h-4 rounded-full bg-black text-white text-[9px] flex items-center justify-center font-bold">
                  {totalActiveFilters}
                </span>
              )}
            </button>
            
            <span className="text-gray-300">|</span>

            {/* Desktop/Mobile Sort */}
            <div className="relative flex items-center">
              <button 
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="font-semibold uppercase tracking-wider cursor-pointer hover:opacity-75 transition-opacity"
              >
                Sort
              </button>

              {/* Sort Popover Dropdown */}
              {showSortDropdown && (
                <div className="absolute top-8 right-0 w-56 bg-white border border-gray-200 shadow-xl z-40 p-4 space-y-3 normal-case tracking-normal text-xs animate-in fade-in zoom-in-95 duration-150">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setShowSortDropdown(false);
                        updateUrlParams({ sort: opt === 'View All' ? null : opt });
                      }}
                      className="w-full text-left flex items-center gap-2 py-1 hover:text-black cursor-pointer transition-colors"
                    >
                      <div className="w-4 flex items-center justify-center">
                        {sortOption === opt && <Check className="w-3.5 h-3.5 text-gray-900" />}
                      </div>
                      <span className={sortOption === opt ? 'font-medium text-gray-900' : 'text-gray-600'}>
                        {opt}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Grid Layout Toggle Icons */}
          <div className="flex space-x-2 md:hidden">
            <button 
              onClick={() => setMobileColumns(1)}
              className={`w-4 h-4 border border-black cursor-pointer transition-colors ${mobileColumns === 1 ? 'bg-black' : 'bg-transparent'}`} 
              aria-label="Single column view" 
            />
            <button 
              onClick={() => setMobileColumns(2)}
              className="w-4 h-4 grid grid-cols-2 gap-[1px] cursor-pointer" 
              aria-label="Two column view"
            >
              <div className={`transition-colors ${mobileColumns === 2 ? 'bg-black' : 'bg-gray-400'}`} />
              <div className={`transition-colors ${mobileColumns === 2 ? 'bg-black' : 'bg-gray-400'}`} />
              <div className={`transition-colors ${mobileColumns === 2 ? 'bg-black' : 'bg-gray-400'}`} />
              <div className={`transition-colors ${mobileColumns === 2 ? 'bg-black' : 'bg-gray-400'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="w-full mb-20 px-0">
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center text-gray-500">
            <p className="text-sm uppercase tracking-wider mb-3">No products match the selected criteria</p>
            <button
              onClick={clearAllFilters}
              className="text-xs underline uppercase tracking-widest text-black font-semibold cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            {/* First Grid Row (Top Products) */}
            <div className={`grid ${mobileColumns === 1 ? 'grid-cols-1' : 'grid-cols-2'} md:grid-cols-4 gap-[3px] py-3`}>
              {filteredProducts.slice(0, 6).map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  mobileColumns={mobileColumns}
                  onTagClick={handleTagClick}
                />
              ))}
            </div>

            {/* Feature Interruption Section ("TWO ICONS, REFRESHED") */}
            <div className="my-8 md:my-14 bg-white border-t border-b border-gray-100 py-6 md:py-10 px-0">
              {/* Desktop Interruption View */}
              <div className="hidden md:grid md:grid-cols-2 gap-[3px] items-stretch">
                {/* Left 50% Editorial Feature Image */}
                <div className="flex flex-col bg-white">
                  <div className="relative flex-1 bg-[#f6f6f6] overflow-hidden group min-h-[480px]">
                    <Image 
                      src="https://loremflickr.com/g/800/1066/fashion,model,paris?lock=801"
                      alt="Two Icons, Refreshed - Feature"
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="pt-4 pb-2 px-1">
                    <h3 className="text-lg font-semibold tracking-wider uppercase mb-1">
                      TWO ICONS, REFRESHED
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      The flower tank and flared skirt in Japanese cotton jersey
                    </p>
                  </div>
                </div>

                {/* Right 50% - 2x2 Product Grid */}
                <div className="grid grid-cols-2 gap-[3px]">
                  {FEATURED_ITEMS.map((item) => (
                    <ProductCard 
                      key={item.id} 
                      product={item} 
                      onTagClick={handleTagClick}
                    />
                  ))}
                </div>
              </div>

              {/* Mobile Interruption View */}
              <div className="md:hidden flex flex-col gap-6">
                <div className="relative aspect-[3/4] bg-[#f6f6f6] w-full overflow-hidden">
                  <Image 
                    src="https://loremflickr.com/g/800/1066/fashion,model,paris?lock=801"
                    alt="Two Icons, Refreshed - Feature"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="px-4">
                  <h3 className="text-base font-semibold tracking-wider uppercase mb-1">
                    TWO ICONS, REFRESHED
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-6">
                    The flower tank and flared skirt in Japanese cotton jersey
                  </p>
                </div>

                {/* Mobile 2-column Grid of 4 Featured Items */}
                <div className="grid grid-cols-2 gap-[3px]">
                  {FEATURED_ITEMS.map((item) => (
                    <ProductCard 
                      key={item.id} 
                      product={item} 
                      mobileColumns={mobileColumns}
                      onTagClick={handleTagClick}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Second Grid Row (Remaining Products) */}
            {filteredProducts.length > 6 && (
              <div className={`grid ${mobileColumns === 1 ? 'grid-cols-1' : 'grid-cols-2'} md:grid-cols-4 gap-[3px] py-3`}>
                {filteredProducts.slice(6).map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    mobileColumns={mobileColumns}
                    onTagClick={handleTagClick}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Collection Details Accordion Section */}
        <div className="py-12 px-2 md:px-4 bg-white border-t border-gray-200 mt-12">
          <button 
            onClick={() => setShowCollectionDetails(!showCollectionDetails)}
            className="text-sm font-medium flex items-center space-x-2.5 cursor-pointer text-gray-900 hover:text-black group"
          >
            <span>Collection Details</span>
            {showCollectionDetails ? (
              <Minus className="w-3.5 h-3.5 text-gray-800" />
            ) : (
              <Plus className="w-3.5 h-3.5 text-gray-800" />
            )}
          </button>

          {/* Expanded Paragraph */}
          {showCollectionDetails && (
            <div className="mt-4 text-xs text-gray-600 leading-relaxed w-full md:w-1/2 animate-in fade-in duration-300">
              Explore our complete archival, developmental, and foundational womenswear collections. Featuring precision-cut dresses, fine gauge merino knitwear, prototype sample references, and luxury garment blanks designed with timeless craft and modern elegance.
            </div>
          )}

          <div className="mt-8 text-xs text-gray-500">
            <Link href="/womenswear" className="hover:text-black">
              Womenswear
            </Link>
            {' / '}
            <span className="text-black font-normal">
              {MAIN_CATEGORIES.find(c => c.slug === activeCategory)?.label || 'Explore All'}
            </span>
          </div>
        </div>
      </main>

      {/* FILTER SIDEBAR / DRAWER */}
      {isFilterOpen && (
        <div 
          onClick={() => setIsFilterOpen(false)} 
          className="fixed inset-0 bg-black/40 z-50 transition-opacity duration-300"
        />
      )}

      {/* Drawer Panel */}
      <div 
        className={`fixed top-0 right-0 bottom-0 z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isFilterOpen ? 'translate-x-0' : 'translate-x-full'
        } w-full md:w-[450px]`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="font-semibold uppercase tracking-widest text-sm text-gray-900">
            FILTER
          </h2>
          <button 
            onClick={() => setIsFilterOpen(false)}
            className="w-8 h-8 border border-gray-300 hover:border-black flex items-center justify-center text-gray-800 cursor-pointer transition-colors"
            aria-label="Close filter drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Filter Categories */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 text-xs font-normal">
          {/* 1. Category Section */}
          <div>
            <h3 className="font-semibold uppercase text-xs tracking-wider mb-4 text-gray-900">
              Collection Branch
            </h3>
            <div className="grid grid-cols-1 gap-y-2.5">
              {MAIN_CATEGORIES.map((cat) => (
                <label key={cat.slug} className="flex items-center gap-2 cursor-pointer text-gray-800 hover:text-black">
                  <input 
                    type="radio" 
                    name="filter-main-cat" 
                    checked={activeCategory === cat.slug}
                    onChange={() => handleCategorySelect(cat.slug)}
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                  <span>{cat.label}</span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* 2. Type */}
          <div>
            <h3 className="font-semibold uppercase text-xs tracking-wider mb-4 text-gray-900">
              Type
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3.5 gap-x-2">
              {FILTER_TYPES.map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer text-gray-800 hover:text-black">
                  <input 
                    type="radio" 
                    name="filter-type" 
                    checked={selectedType === type}
                    onChange={() => {
                      updateUrlParams({ type: type === 'All' ? null : type });
                    }}
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* 3. Style */}
          <div>
            <h3 className="font-semibold uppercase text-xs tracking-wider mb-4 text-gray-900">
              Style
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3.5 gap-x-2">
              {FILTER_STYLES.map((style) => (
                <label key={style} className="flex items-center gap-2 cursor-pointer text-gray-800 hover:text-black">
                  <input 
                    type="checkbox" 
                    checked={selectedStyles.includes(style)}
                    onChange={() => toggleStyle(style)}
                    className="w-4 h-4 accent-black cursor-pointer rounded-none"
                  />
                  <span>{style}</span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* 4. Size */}
          <div>
            <h3 className="font-semibold uppercase text-xs tracking-wider mb-4 text-gray-900">
              Size
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3.5 gap-x-2">
              {FILTER_SIZES.map((size) => (
                <label key={size} className="flex items-center gap-2 cursor-pointer text-gray-800 hover:text-black">
                  <input 
                    type="checkbox" 
                    checked={selectedSizes.includes(size)}
                    onChange={() => toggleSize(size)}
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* 5. Color */}
          <div>
            <h3 className="font-semibold uppercase text-xs tracking-wider mb-4 text-gray-900">
              Color
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3.5 gap-x-2">
              {FILTER_COLORS.map((c) => (
                <label key={c.name} className="flex items-center gap-2 cursor-pointer text-gray-800 hover:text-black">
                  <span 
                    className="w-4 h-4 rounded-full border border-gray-300 inline-block shrink-0" 
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* 6. Material */}
          <div>
            <h3 className="font-semibold uppercase text-xs tracking-wider mb-4 text-gray-900">
              Material
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3.5 gap-x-2">
              {FILTER_MATERIALS.map((mat) => (
                <label key={mat} className="flex items-center gap-2 cursor-pointer text-gray-800 hover:text-black">
                  <input 
                    type="checkbox" 
                    checked={selectedMaterials.includes(mat)}
                    onChange={() => toggleMaterial(mat)}
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                  <span>{mat}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Sticky Footer */}
        <div className="p-6 border-t border-gray-200 bg-white space-y-3">
          <p className="text-[11px] text-gray-500 text-center">
            You can select several filters at once.
          </p>
          <div className="flex space-x-3">
            <button
              onClick={clearAllFilters}
              className="flex-1 py-2.5 border border-gray-300 text-xs font-semibold tracking-widest uppercase hover:bg-gray-50 transition-colors cursor-pointer text-black"
            >
              CLEAR
            </button>
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="flex-1 bg-[#111111] text-white py-2.5 text-xs font-semibold tracking-widest uppercase hover:bg-gray-800 transition-colors cursor-pointer"
            >
              APPLY {totalActiveFilters > 0 ? `(${totalActiveFilters})` : ''}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WomenswearExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white pt-36 px-8 text-xs text-gray-400">Loading collection...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
