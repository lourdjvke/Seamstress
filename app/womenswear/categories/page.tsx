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

const CATEGORY_LIST = [
  { name: 'All Categories', slug: 'all', label: 'All Categories' },
  { name: 'Dresses', slug: 'dresses', label: 'Dresses' },
  { name: 'Tops & Blouses', slug: 'tops-blouses', label: 'Tops & Blouses' },
  { name: 'Tailoring', slug: 'tailoring', label: 'Tailoring' },
  { name: 'Trousers & Shorts', slug: 'trousers-shorts', label: 'Trousers & Shorts' },
  { name: 'Skirts', slug: 'skirts', label: 'Skirts' },
  { name: 'Knitwear', slug: 'knitwear', label: 'Knitwear' },
  { name: 'Denim', slug: 'denim', label: 'Denim' },
  { name: 'Jersey & Essentials', slug: 'jersey-essentials', label: 'Jersey & Essentials' },
  { name: 'Outerwear', slug: 'outerwear', label: 'Outerwear' },
  { name: 'Activewear', slug: 'activewear', label: 'Activewear' },
  { name: 'Occasionwear', slug: 'occasionwear', label: 'Occasionwear' },
  { name: 'Loungewear', slug: 'loungewear', label: 'Loungewear' },
  { name: 'Maternity & Adaptive', slug: 'maternity-adaptive', label: 'Maternity & Adaptive' },
];

const COLORFUL_PRODUCTS: Product[] = [
  // 1. DRESSES
  {
    id: 'cat-dress-1',
    title: 'Floral Silk Tiered Maxi Dress',
    price: '£645',
    tag: 'Dresses',
    tags: ['Dresses', 'Floral Print', 'Silk'],
    category: 'dresses',
    type: 'Dresses',
    style: 'Maxi Dresses',
    size: ['S', 'M', 'L'],
    material: 'Silk',
    images: [
      'https://loremflickr.com/600/800/dress,floral,colorful?lock=711',
      'https://loremflickr.com/600/800/dress,fashion,spring?lock=712',
    ],
    colors: [
      { colorHex: '#E31B23', imgSrc: 'https://loremflickr.com/600/800/dress,red,colorful?lock=711' },
      { colorHex: '#1E70BF', imgSrc: 'https://loremflickr.com/600/800/dress,blue,colorful?lock=712' },
    ],
  },
  {
    id: 'cat-dress-2',
    title: 'Cobalt Blue Crepe Pleated Midi Dress',
    price: '£520',
    tag: 'Dresses',
    tags: ['Dresses', 'Pleated'],
    category: 'dresses',
    type: 'Dresses',
    style: 'Midi Dresses',
    size: ['S', 'M', 'L'],
    material: 'Viscose',
    images: [
      'https://loremflickr.com/600/800/dress,blue,vibrant?lock=713',
      'https://loremflickr.com/600/800/dress,cyan,model?lock=714',
    ],
  },

  // 2. TOPS & BLOUSES
  {
    id: 'cat-top-1',
    title: 'Canary Yellow Ruffle Silk Blouse',
    price: '£380',
    tag: 'Tops & Blouses',
    tags: ['Tops & Blouses', 'Silk', 'Yellow'],
    category: 'tops-blouses',
    type: 'Tops & Shirts',
    style: 'Tops & Blouses',
    size: ['S', 'M', 'L'],
    material: 'Silk',
    images: [
      'https://loremflickr.com/600/800/blouse,yellow,colorful?lock=721',
      'https://loremflickr.com/600/800/shirt,yellow,fashion?lock=722',
    ],
    colors: [
      { colorHex: '#FFD700', imgSrc: 'https://loremflickr.com/600/800/blouse,yellow,colorful?lock=721' },
      { colorHex: '#FF69B4', imgSrc: 'https://loremflickr.com/600/800/blouse,pink,colorful?lock=723' },
    ],
  },
  {
    id: 'cat-top-2',
    title: 'Emerald Green Satin Wrap Top',
    price: '£340',
    tag: 'Tops & Blouses',
    tags: ['Tops & Blouses', 'Satin', 'Green'],
    category: 'tops-blouses',
    type: 'Tops & Shirts',
    style: 'Tops & Blouses',
    size: ['S', 'M'],
    material: 'Silk',
    images: [
      'https://loremflickr.com/600/800/blouse,green,satin?lock=724',
      'https://loremflickr.com/600/800/top,emerald,fashion?lock=725',
    ],
  },

  // 3. TAILORING
  {
    id: 'cat-tailor-1',
    title: 'Fuchsia Structured Wool Blazer',
    price: '£890',
    tag: 'Tailoring',
    tags: ['Tailoring', 'Blazers', 'Magenta'],
    category: 'tailoring',
    type: 'Jackets & Outerwear',
    style: 'Blazers',
    size: ['S', 'M', 'L'],
    material: 'Wool',
    images: [
      'https://loremflickr.com/600/800/blazer,pink,magenta?lock=731',
      'https://loremflickr.com/600/800/suit,pink,fashion?lock=732',
    ],
    colors: [
      { colorHex: '#E0115F', imgSrc: 'https://loremflickr.com/600/800/blazer,pink,magenta?lock=731' },
      { colorHex: '#008080', imgSrc: 'https://loremflickr.com/600/800/blazer,teal,fashion?lock=733' },
    ],
  },
  {
    id: 'cat-tailor-2',
    title: 'Tangerine Orange Tailored Trousers',
    price: '£450',
    tag: 'Tailoring',
    tags: ['Tailoring', 'Trousers'],
    category: 'tailoring',
    type: 'Pants & Skirts',
    style: 'Pants',
    size: ['26', '27', '28', '29', '30'],
    material: 'Wool',
    images: [
      'https://loremflickr.com/600/800/trousers,orange,tailored?lock=734',
      'https://loremflickr.com/600/800/pants,orange,fashion?lock=735',
    ],
  },

  // 4. TROUSERS & SHORTS
  {
    id: 'cat-trouser-1',
    title: 'Turquoise Wide-Leg Silk Pants',
    price: '£420',
    tag: 'Trousers & Shorts',
    tags: ['Trousers & Shorts', 'Wide Leg'],
    category: 'trousers-shorts',
    type: 'Pants & Skirts',
    style: 'Pants',
    size: ['26', '27', '28', '29'],
    material: 'Silk',
    images: [
      'https://loremflickr.com/600/800/trousers,blue,turquoise?lock=741',
      'https://loremflickr.com/600/800/pants,cyan,fashion?lock=742',
    ],
  },
  {
    id: 'cat-trouser-2',
    title: 'Coral Pink Linen Tailored Shorts',
    price: '£260',
    tag: 'Trousers & Shorts',
    tags: ['Trousers & Shorts', 'Shorts', 'Linen'],
    category: 'trousers-shorts',
    type: 'Pants & Skirts',
    style: 'Shorts',
    size: ['S', 'M', 'L'],
    material: 'Cotton',
    images: [
      'https://loremflickr.com/600/800/shorts,pink,fashion?lock=743',
      'https://loremflickr.com/600/800/shorts,coral,summer?lock=744',
    ],
  },

  // 5. SKIRTS
  {
    id: 'cat-skirt-1',
    title: 'Sunset Gradient Pleated Midi Skirt',
    price: '£390',
    tag: 'Skirts',
    tags: ['Skirts', 'Pleated', 'Gradient'],
    category: 'skirts',
    type: 'Pants & Skirts',
    style: 'Skirts',
    size: ['26', '27', '28', '29', '30'],
    material: 'Polyester Blend',
    images: [
      'https://loremflickr.com/600/800/skirt,colorful,gradient?lock=751',
      'https://loremflickr.com/600/800/skirt,rainbow,fashion?lock=752',
    ],
  },
  {
    id: 'cat-skirt-2',
    title: 'Lapis Blue Satin Bias Midi Skirt',
    price: '£350',
    tag: 'Skirts',
    tags: ['Skirts', 'Satin', 'Blue'],
    category: 'skirts',
    type: 'Pants & Skirts',
    style: 'Skirts',
    size: ['26', '27', '28', '29'],
    material: 'Silk',
    images: [
      'https://loremflickr.com/600/800/skirt,blue,satin?lock=753',
      'https://loremflickr.com/600/800/skirt,blue,silk?lock=754',
    ],
  },

  // 6. KNITWEAR
  {
    id: 'cat-knit-1',
    title: 'Colorblock Cashmere Crewneck Sweater',
    price: '£590',
    tag: 'Knitwear',
    tags: ['Knitwear', 'Cashmere', 'Colorblock'],
    category: 'knitwear',
    type: 'Sweaters',
    style: 'Sweaters',
    size: ['S', 'M', 'L'],
    material: 'Wool',
    images: [
      'https://loremflickr.com/600/800/sweater,colorful,knitwear?lock=761',
      'https://loremflickr.com/600/800/knitwear,colorful,fashion?lock=762',
    ],
    colors: [
      { colorHex: '#FF4500', imgSrc: 'https://loremflickr.com/600/800/sweater,colorful,knitwear?lock=761' },
      { colorHex: '#4169E1', imgSrc: 'https://loremflickr.com/600/800/sweater,blue,knitwear?lock=763' },
    ],
  },
  {
    id: 'cat-knit-2',
    title: 'Lavender Brushed Mohair Cardigan',
    price: '£480',
    tag: 'Knitwear',
    tags: ['Knitwear', 'Mohair', 'Pastel'],
    category: 'knitwear',
    type: 'Sweaters',
    style: 'Sweaters',
    size: ['S', 'M', 'L'],
    material: 'Wool',
    images: [
      'https://loremflickr.com/600/800/cardigan,purple,pastel?lock=764',
      'https://loremflickr.com/600/800/sweater,lilac,fashion?lock=765',
    ],
  },

  // 7. DENIM
  {
    id: 'cat-denim-1',
    title: 'Vintage Indigo High-Rise Straight Jean',
    price: '£295',
    tag: 'Denim',
    tags: ['Denim', 'Straight Leg', 'Indigo'],
    category: 'denim',
    type: 'Pants & Skirts',
    style: 'Denim',
    size: ['26', '27', '28', '29', '30'],
    material: 'Denim',
    images: [
      'https://loremflickr.com/600/800/jeans,denim,blue?lock=771',
      'https://loremflickr.com/600/800/denim,fashion,woman?lock=772',
    ],
    colors: [
      { colorHex: '#1E3A8A', imgSrc: 'https://loremflickr.com/600/800/jeans,denim,blue?lock=771' },
      { colorHex: '#60A5FA', imgSrc: 'https://loremflickr.com/600/800/jeans,lightblue,denim?lock=773' },
    ],
  },
  {
    id: 'cat-denim-2',
    title: 'Chambray Blue Denim Overshirt',
    price: '£310',
    tag: 'Denim',
    tags: ['Denim', 'Shirting'],
    category: 'denim',
    type: 'Tops & Shirts',
    style: 'Tops & Blouses',
    size: ['S', 'M', 'L'],
    material: 'Denim',
    images: [
      'https://loremflickr.com/600/800/denimjacket,blue,fashion?lock=774',
      'https://loremflickr.com/600/800/chambray,shirt,denim?lock=775',
    ],
  },

  // 8. JERSEY & ESSENTIALS
  {
    id: 'cat-jersey-1',
    title: 'Vibrant Scarlet Pima Cotton Crew Tee',
    price: '£110',
    tag: 'Jersey & Essentials',
    tags: ['Jersey & Essentials', 'Cotton', 'Red'],
    category: 'jersey-essentials',
    type: 'Tops & Shirts',
    style: 'T-Shirts and Tank Tops',
    size: ['S', 'M', 'L'],
    material: 'Cotton',
    images: [
      'https://loremflickr.com/600/800/tshirt,red,colorful?lock=781',
      'https://loremflickr.com/600/800/tee,red,fashion?lock=782',
    ],
    colors: [
      { colorHex: '#DC2626', imgSrc: 'https://loremflickr.com/600/800/tshirt,red,colorful?lock=781' },
      { colorHex: '#059669', imgSrc: 'https://loremflickr.com/600/800/tshirt,green,colorful?lock=783' },
      { colorHex: '#D97706', imgSrc: 'https://loremflickr.com/600/800/tshirt,yellow,colorful?lock=784' },
    ],
  },
  {
    id: 'cat-jersey-2',
    title: 'Sky Blue Ribbed Scoop Neck Bodysuit',
    price: '£185',
    tag: 'Jersey & Essentials',
    tags: ['Jersey & Essentials', 'Ribbed'],
    category: 'jersey-essentials',
    type: 'Tops & Shirts',
    style: 'T-Shirts and Tank Tops',
    size: ['S', 'M', 'L'],
    material: 'Jersey',
    images: [
      'https://loremflickr.com/600/800/bodysuit,blue,fashion?lock=785',
      'https://loremflickr.com/600/800/top,skyblue,fashion?lock=786',
    ],
  },

  // 9. OUTERWEAR
  {
    id: 'cat-outer-1',
    title: 'Crimson Red Double-Breasted Wool Trench',
    price: '£1,450',
    tag: 'Outerwear',
    tags: ['Outerwear', 'Wool', 'Trench'],
    category: 'outerwear',
    type: 'Jackets & Outerwear',
    style: 'Coats & Puffers',
    size: ['S', 'M', 'L'],
    material: 'Wool',
    images: [
      'https://loremflickr.com/600/800/coat,red,fashion?lock=791',
      'https://loremflickr.com/600/800/trench,red,wool?lock=792',
    ],
    colors: [
      { colorHex: '#991B1B', imgSrc: 'https://loremflickr.com/600/800/coat,red,fashion?lock=791' },
      { colorHex: '#065F46', imgSrc: 'https://loremflickr.com/600/800/coat,green,fashion?lock=793' },
    ],
  },
  {
    id: 'cat-outer-2',
    title: 'Pastel Mint Quilted Parka Jacket',
    price: '£780',
    tag: 'Outerwear',
    tags: ['Outerwear', 'Puffer'],
    category: 'outerwear',
    type: 'Jackets & Outerwear',
    style: 'Jackets',
    size: ['S', 'M', 'L'],
    material: 'Polyester Blend',
    images: [
      'https://loremflickr.com/600/800/jacket,mint,puffer?lock=794',
      'https://loremflickr.com/600/800/parka,pastel,green?lock=795',
    ],
  },

  // 10. ACTIVEWEAR
  {
    id: 'cat-active-1',
    title: 'Electric Violet Compression Legging & Bra Set',
    price: '£240',
    tag: 'Activewear',
    tags: ['Activewear', 'Set', 'Purple'],
    category: 'activewear',
    type: 'Pants & Skirts',
    style: 'Pants',
    size: ['S', 'M', 'L'],
    material: 'Jersey',
    images: [
      'https://loremflickr.com/600/800/activewear,purple,yoga?lock=801',
      'https://loremflickr.com/600/800/leggings,violet,fitness?lock=802',
    ],
    colors: [
      { colorHex: '#7C3AED', imgSrc: 'https://loremflickr.com/600/800/activewear,purple,yoga?lock=801' },
      { colorHex: '#EC4899', imgSrc: 'https://loremflickr.com/600/800/activewear,pink,fitness?lock=803' },
    ],
  },
  {
    id: 'cat-active-2',
    title: 'Citrus Lime Seamless Racer Tank',
    price: '£95',
    tag: 'Activewear',
    tags: ['Activewear', 'Neon'],
    category: 'activewear',
    type: 'Tops & Shirts',
    style: 'T-Shirts and Tank Tops',
    size: ['S', 'M', 'L'],
    material: 'Jersey',
    images: [
      'https://loremflickr.com/600/800/tanktop,lime,activewear?lock=804',
      'https://loremflickr.com/600/800/sports,yellow,fitness?lock=805',
    ],
  },

  // 11. OCCASIONWEAR
  {
    id: 'cat-occas-1',
    title: 'Royal Sapphire Embellished Gown',
    price: '£1,850',
    tag: 'Occasionwear',
    tags: ['Occasionwear', 'Gown', 'Evening'],
    category: 'occasionwear',
    type: 'Dresses',
    style: 'Maxi Dresses',
    size: ['S', 'M', 'L'],
    material: 'Silk',
    images: [
      'https://loremflickr.com/600/800/eveningdress,blue,glamour?lock=811',
      'https://loremflickr.com/600/800/gown,royal,blue?lock=812',
    ],
  },
  {
    id: 'cat-occas-2',
    title: 'Golden Ochre Satin Asymmetrical Gown',
    price: '£1,200',
    tag: 'Occasionwear',
    tags: ['Occasionwear', 'Satin', 'Gold'],
    category: 'occasionwear',
    type: 'Dresses',
    style: 'Maxi Dresses',
    size: ['S', 'M'],
    material: 'Silk',
    images: [
      'https://loremflickr.com/600/800/eveningdress,gold,yellow?lock=813',
      'https://loremflickr.com/600/800/dress,satin,yellow?lock=814',
    ],
  },

  // 12. LOUNGEWEAR
  {
    id: 'cat-lounge-1',
    title: 'Sage Green Organic French Terry Sweatshirt',
    price: '£195',
    tag: 'Loungewear',
    tags: ['Loungewear', 'Fleece', 'Green'],
    category: 'loungewear',
    type: 'Sweaters',
    style: 'Sweaters',
    size: ['S', 'M', 'L'],
    material: 'Cotton',
    images: [
      'https://loremflickr.com/600/800/sweatshirt,green,pastel?lock=821',
      'https://loremflickr.com/600/800/hoodie,sage,lounge?lock=822',
    ],
    colors: [
      { colorHex: '#84A98C', imgSrc: 'https://loremflickr.com/600/800/sweatshirt,green,pastel?lock=821' },
      { colorHex: '#E29578', imgSrc: 'https://loremflickr.com/600/800/sweatshirt,terracotta,lounge?lock=823' },
    ],
  },
  {
    id: 'cat-lounge-2',
    title: 'Peach Blossom Mulberry Silk Pajama Pant',
    price: '£280',
    tag: 'Loungewear',
    tags: ['Loungewear', 'Silk', 'Pastel'],
    category: 'loungewear',
    type: 'Pants & Skirts',
    style: 'Pants',
    size: ['S', 'M', 'L'],
    material: 'Silk',
    images: [
      'https://loremflickr.com/600/800/pajamas,silk,pink?lock=824',
      'https://loremflickr.com/600/800/loungewear,peach,silk?lock=825',
    ],
  },

  // 13. MATERNITY & ADAPTIVE
  {
    id: 'cat-mat-1',
    title: 'Marigold Tiered Maternity Wrap Maxi Dress',
    price: '£490',
    tag: 'Maternity & Adaptive',
    tags: ['Maternity & Adaptive', 'Maternity', 'Yellow'],
    category: 'maternity-adaptive',
    type: 'Dresses',
    style: 'Maxi Dresses',
    size: ['S', 'M', 'L'],
    material: 'Viscose',
    images: [
      'https://loremflickr.com/600/800/maternity,dress,yellow?lock=831',
      'https://loremflickr.com/600/800/maternity,fashion,floral?lock=832',
    ],
  },
  {
    id: 'cat-mat-2',
    title: 'Soft Berry Adaptive Magnetic-Closure Poplin Shirt',
    price: '£220',
    tag: 'Maternity & Adaptive',
    tags: ['Maternity & Adaptive', 'Adaptive', 'Shirting'],
    category: 'maternity-adaptive',
    type: 'Tops & Shirts',
    style: 'Tops & Blouses',
    size: ['S', 'M', 'L'],
    material: 'Cotton',
    images: [
      'https://loremflickr.com/600/800/shirt,pink,berry?lock=833',
      'https://loremflickr.com/600/800/blouse,magenta,fashion?lock=834',
    ],
  },
];

// Vibrant Featured Interruption Items
const VIBRANT_FEATURED_ITEMS: Product[] = [
  {
    id: 'vfeat-1',
    title: 'Canary Yellow Silk Blouse',
    price: '£380',
    tag: 'Tops & Blouses',
    images: [
      'https://loremflickr.com/600/800/blouse,yellow,colorful?lock=721',
      'https://loremflickr.com/600/800/shirt,yellow,fashion?lock=722',
    ],
  },
  {
    id: 'vfeat-2',
    title: 'Fuchsia Tailored Wool Blazer',
    price: '£890',
    tag: 'Tailoring',
    images: [
      'https://loremflickr.com/600/800/blazer,pink,magenta?lock=731',
      'https://loremflickr.com/600/800/suit,pink,fashion?lock=732',
    ],
  },
  {
    id: 'vfeat-3',
    title: 'Sunset Gradient Pleated Skirt',
    price: '£390',
    tag: 'Skirts',
    images: [
      'https://loremflickr.com/600/800/skirt,colorful,gradient?lock=751',
      'https://loremflickr.com/600/800/skirt,rainbow,fashion?lock=752',
    ],
  },
  {
    id: 'vfeat-4',
    title: 'Electric Violet Activewear Set',
    price: '£240',
    tag: 'Activewear',
    images: [
      'https://loremflickr.com/600/800/activewear,purple,yoga?lock=801',
      'https://loremflickr.com/600/800/leggings,violet,fitness?lock=802',
    ],
  },
];

// Filter Types
const FILTER_TYPES = [
  'All',
  'Dresses',
  'Tops & Shirts',
  'Pants & Skirts',
  'Jackets & Outerwear',
  'Sweaters',
];

const FILTER_STYLES = [
  'Maxi Dresses',
  'Midi Dresses',
  'Tops & Blouses',
  'T-Shirts and Tank Tops',
  'Blazers',
  'Coats & Puffers',
  'Jackets',
  'Pants',
  'Shorts',
  'Skirts',
  'Sweaters',
  'Denim',
];

const FILTER_SIZES = ['26', '27', '28', '29', '30', 'S', 'M', 'L'];

const FILTER_COLORS = [
  { name: 'Red & Berry', hex: '#E31B23' },
  { name: 'Pink & Fuchsia', hex: '#E0115F' },
  { name: 'Yellow & Gold', hex: '#FFD700' },
  { name: 'Orange & Coral', hex: '#FF7F50' },
  { name: 'Green & Sage', hex: '#059669' },
  { name: 'Blue & Cobalt', hex: '#1E70BF' },
  { name: 'Purple & Violet', hex: '#7C3AED' },
  { name: 'Lavender', hex: '#BDB2FF' },
  { name: 'White', hex: '#FFFFFF' },
];

const FILTER_MATERIALS = [
  'Cotton',
  'Denim',
  'Jersey',
  'Linen',
  'Polyester Blend',
  'Silk',
  'Viscose',
  'Wool',
];

function CategoriesContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL Query State
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
    return COLORFUL_PRODUCTS.filter((prod) => {
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
      {/* Category Sub-header Navigation: Clean horizontal category list without arrows */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full overflow-x-auto no-scrollbar py-4 px-4 md:px-8">
          <nav className="flex justify-center min-w-max mx-auto">
            <ul className="flex space-x-6 md:space-x-8 items-center justify-center text-[11px] tracking-wider uppercase text-gray-500 font-medium">
              {CATEGORY_LIST.map((cat) => {
                const isActive = activeCategory === cat.slug;
                return (
                  <li key={cat.slug} className="flex items-center">
                    <button
                      onClick={() => handleCategorySelect(cat.slug)}
                      className={`transition-colors cursor-pointer flex items-center gap-1 ${
                        isActive
                          ? 'text-black font-bold border-b-2 border-black pb-1'
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
            <p className="text-sm uppercase tracking-wider mb-3">No products match the selected category or filter criteria</p>
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

            {/* Feature Interruption Section ("COLOR & CRAFT: VIBRANT PALETTES") */}
            <div className="my-8 md:my-14 bg-white border-t border-b border-gray-100 py-6 md:py-10 px-0">
              {/* Desktop Interruption View */}
              <div className="hidden md:grid md:grid-cols-2 gap-[3px] items-stretch">
                {/* Left 50% Editorial Feature Image */}
                <div className="flex flex-col bg-white">
                  <div className="relative flex-1 bg-[#f6f6f6] overflow-hidden group min-h-[480px]">
                    <Image 
                      src="https://loremflickr.com/800/1066/fashion,colorful,runway?lock=911"
                      alt="Color & Form - Vibrant Edit"
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="pt-4 pb-2 px-1">
                    <h3 className="text-lg font-semibold tracking-wider uppercase mb-1">
                      COLOR & FORM: SPRING / SUMMER
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Saturated silks, bold suiting, and vivid knitwear crafted for radiant expression
                    </p>
                  </div>
                </div>

                {/* Right 50% - 2x2 Product Grid */}
                <div className="grid grid-cols-2 gap-[3px]">
                  {VIBRANT_FEATURED_ITEMS.map((item) => (
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
                    src="https://loremflickr.com/800/1066/fashion,colorful,runway?lock=911"
                    alt="Color & Form - Vibrant Edit"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="px-4">
                  <h3 className="text-base font-semibold tracking-wider uppercase mb-1">
                    COLOR & FORM: SPRING / SUMMER
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-6">
                    Saturated silks, bold suiting, and vivid knitwear crafted for radiant expression
                  </p>
                </div>

                {/* Mobile 2-column Grid */}
                <div className="grid grid-cols-2 gap-[3px]">
                  {VIBRANT_FEATURED_ITEMS.map((item) => (
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
            <span>Category Insights & Materials</span>
            {showCollectionDetails ? (
              <Minus className="w-3.5 h-3.5 text-gray-800" />
            ) : (
              <Plus className="w-3.5 h-3.5 text-gray-800" />
            )}
          </button>

          {/* Expanded Paragraph */}
          {showCollectionDetails && (
            <div className="mt-4 text-xs text-gray-600 leading-relaxed w-full md:w-1/2 animate-in fade-in duration-300">
              Browse each signature womenswear category with precision curation. From structured tailoring in rich wools to fluid mulberry silks, vivid cashmere colorblocks, and adaptive wardrobe staples, each piece is engineered with exceptional silhouette design and vivid chromatic depth.
            </div>
          )}

          <div className="mt-8 text-xs text-gray-500">
            <Link href="/womenswear" className="hover:text-black">
              Womenswear
            </Link>
            {' / '}
            <span className="text-black font-normal">
              {CATEGORY_LIST.find(c => c.slug === activeCategory)?.label || 'Categories'}
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
              Categories
            </h3>
            <div className="grid grid-cols-1 gap-y-2.5">
              {CATEGORY_LIST.map((cat) => (
                <label key={cat.slug} className="flex items-center gap-2.5 cursor-pointer text-gray-800 hover:text-black">
                  <input 
                    type="radio" 
                    name="filter-cat-list" 
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
                    className="w-4 h-4 rounded-full border border-gray-300 inline-block shrink-0 shadow-xs" 
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

export default function WomenswearCategoriesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white pt-36 px-8 text-xs text-gray-400">Loading categories...</div>}>
      <CategoriesContent />
    </Suspense>
  );
}
