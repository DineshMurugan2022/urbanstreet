import { Product, Coupon } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    sku: 'UB-HD-001',
    name: 'UB Signature Heavy Hoodie',
    slug: 'ub-signature-heavy-hoodie',
    category: 'Hoodies and sweatshirts',
    collection: 'Drop 01 — Street Archive',
    price: 1899,
    compareAtPrice: 2499,
    description: 'Constructed from custom-developed 400 GSM Indian French Terry cotton. Features an exaggerated boxy drop-shoulder cut, dual-layer thermal hood, and bold graffiti typography back graphic. Made to move with you.',
    fabric: '400 GSM 100% Combed Indian Cotton French Terry',
    fit: 'Exaggerated Boxy Oversized',
    primaryImage: '/images/hoodie-charcoal-back.jpg',
    secondaryImage: '/images/hero-banner.jpg',
    images: [
      '/images/hoodie-charcoal-back.jpg',
      '/images/hero-banner.jpg',
      '/images/hero-full-model.jpg'
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#191A1D' },
      { name: 'Heather Grey', hex: '#71717A' },
      { name: 'Bone Ivory', hex: '#EBE7DF' }
    ],
    sizes: [
      { size: 'XS', stock: 4 },
      { size: 'S', stock: 8 },
      { size: 'M', stock: 14 },
      { size: 'L', stock: 9 },
      { size: 'XL', stock: 6 },
      { size: 'XXL', stock: 2 }
    ],
    weightGrams: 780,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    rating: 4.9,
    reviewsCount: 142,
    careInstructions: [
      'Machine wash cold inside-out (30°C)',
      'Dry flat in shade — do not tumble dry',
      'Warm iron on reverse side, do not iron print'
    ],
    visualStyle: {
      baseColor: '#191A1D',
      accentColor: '#1765F5',
      pattern: 'typography'
    }
  },
  {
    id: 'prod-02',
    sku: 'UB-TS-002',
    name: 'Street Essentials Oversize Tee',
    slug: 'street-essentials-oversize-tee',
    category: 'Oversized T-shirts',
    collection: 'Drop 01 — Timeless Essentials',
    price: 999,
    compareAtPrice: 1499,
    description: 'Heavy 280 GSM single-jersey organic cotton knit spun in Tiruppur. Features a thick 1.25" ribbed collar that holds shape and a wide drop-shoulder silhouette with minimal chest typography.',
    fabric: '280 GSM 100% Ring-Spun Indian Combed Cotton',
    fit: 'Relaxed Drop Shoulder Boxy',
    primaryImage: '/images/tee-offwhite-front.jpg',
    secondaryImage: '/images/hero-full-model.jpg',
    images: [
      '/images/tee-offwhite-front.jpg',
      '/images/hero-full-model.jpg'
    ],
    colors: [
      { name: 'Off White', hex: '#F5F2EA' },
      { name: 'Forest Green', hex: '#1E3A2F' },
      { name: 'Obsidian Black', hex: '#0B0B0D' }
    ],
    sizes: [
      { size: 'S', stock: 15 },
      { size: 'M', stock: 25 },
      { size: 'L', stock: 20 },
      { size: 'XL', stock: 10 },
      { size: 'XXL', stock: 5 }
    ],
    weightGrams: 320,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    rating: 4.8,
    reviewsCount: 218,
    careInstructions: [
      'Gentle machine wash with like colors',
      'Do not bleach or dry clean',
      'Hang dry in shade'
    ],
    visualStyle: {
      baseColor: '#F5F2EA',
      accentColor: '#1765F5',
      pattern: 'minimal'
    }
  },
  {
    id: 'prod-03',
    sku: 'UB-HD-003',
    name: 'Good Things Ahead Hoodie',
    slug: 'good-things-ahead-hoodie',
    category: 'Hoodies and sweatshirts',
    collection: 'Drop 01 — Street Archive',
    price: 1899,
    compareAtPrice: 2699,
    description: 'Constructed from rich mocha brown 400 GSM heavyweight brushed fleece cotton. Features large vintage puff print typography "Good Things Ahead" with golden starbursts across the back.',
    fabric: '400 GSM Heavyweight Brushed Fleece Indian Cotton',
    fit: 'Boxy Heavyweight Oversized',
    primaryImage: '/images/hoodie-brown-back.jpg',
    secondaryImage: '/images/hoodie-charcoal-back.jpg',
    images: [
      '/images/hoodie-brown-back.jpg',
      '/images/hoodie-charcoal-back.jpg'
    ],
    colors: [
      { name: 'Mocha Brown', hex: '#5A3828' },
      { name: 'Sand Beige', hex: '#D8C4B6' },
      { name: 'Midnight Black', hex: '#0B0B0D' }
    ],
    sizes: [
      { size: 'S', stock: 6 },
      { size: 'M', stock: 12 },
      { size: 'L', stock: 18 },
      { size: 'XL', stock: 7 },
      { size: 'XXL', stock: 3 }
    ],
    weightGrams: 760,
    isNewArrival: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 94,
    careInstructions: [
      'Wash inside-out with cold water',
      'Never iron directly over graphic print',
      'Air dry naturally'
    ],
    visualStyle: {
      baseColor: '#5A3828',
      accentColor: '#1765F5',
      pattern: 'typography'
    }
  },
  {
    id: 'prod-04',
    sku: 'UB-CG-004',
    name: 'Tactical 8-Pocket Relaxed Cargo Pants',
    slug: 'tactical-8-pocket-relaxed-cargo-pants',
    category: 'Cargo pants',
    collection: 'Urban Utility Lab',
    price: 2199,
    compareAtPrice: 2999,
    description: 'Constructed from durable cotton-ripstop canvas with double-needle reinforced knees, 8 utility bellows pockets with YKK matte hardware, and adjustable bungee toggles at the leg cuffs.',
    fabric: 'Heavy Cotton Ripstop with DWR Finish',
    fit: 'Relaxed Tapered with Drawcord Hem',
    primaryImage: '/images/cargo-tactical.jpg',
    secondaryImage: '/images/hero-full-model.jpg',
    images: [
      '/images/cargo-tactical.jpg',
      '/images/hero-full-model.jpg'
    ],
    colors: [
      { name: 'Army Olive', hex: '#3B4031' },
      { name: 'Stealth Black', hex: '#1C1C1B' },
      { name: 'Desert Sand Khaki', hex: '#C2B6A3' }
    ],
    sizes: [
      { size: 'S', stock: 5 },
      { size: 'M', stock: 12 },
      { size: 'L', stock: 16 },
      { size: 'XL', stock: 8 },
      { size: 'XXL', stock: 4 }
    ],
    weightGrams: 650,
    isFeatured: true,
    isBestSeller: true,
    rating: 4.8,
    reviewsCount: 167,
    careInstructions: [
      'Machine wash cold gentle cycle',
      'Fasten all snaps before washing',
      'Cool iron if needed'
    ],
    visualStyle: {
      baseColor: '#383D2F',
      accentColor: '#C7F000',
      pattern: 'utility'
    }
  },
  {
    id: 'prod-05',
    sku: 'UB-DN-005',
    name: 'Washed Slate Baggy Carpenter Denims',
    slug: 'washed-slate-baggy-carpenter-denims',
    category: 'Jeans and denim',
    collection: 'Raw & Distressed',
    price: 2999,
    compareAtPrice: 3899,
    description: '13.5 oz rigid 100% cotton denim subjected to vintage stone-wash treatment. Fitted with authentic carpenter hammer loop, double-layer back pockets, and subtle distressing at the hemline.',
    fabric: '13.5 oz 100% Indian Indigo Denim',
    fit: 'Wide-Leg Skate Baggy',
    primaryImage: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Washed Slate Grey', hex: '#4A4C50' },
      { name: 'Vintage Acid Indigo', hex: '#3B4E6B' }
    ],
    sizes: [
      { size: 'S', stock: 4 },
      { size: 'M', stock: 9 },
      { size: 'L', stock: 14 },
      { size: 'XL', stock: 5 }
    ],
    weightGrams: 750,
    isNewArrival: true,
    rating: 4.7,
    reviewsCount: 74,
    careInstructions: [
      'Wash separately on first wear to prevent dye transfer',
      'Cold water wash only',
      'Hang dry inside out'
    ],
    visualStyle: {
      baseColor: '#45484D',
      accentColor: '#D4D0C8',
      pattern: 'denim'
    }
  },
  {
    id: 'prod-06',
    sku: 'UB-SH-006',
    name: 'Boxy Canvas Workwear Chore Overshirt',
    slug: 'boxy-canvas-workwear-chore-overshirt',
    category: 'Shirts',
    collection: 'Atelier Workwear',
    price: 2199,
    compareAtPrice: 2899,
    description: 'Heavy-duty duck canvas shirt jacket built for layering. Clean open camp collar, dual chest patch pockets with pen slot, and genuine horn button closures.',
    fabric: 'Heavyweight Cotton Duck Canvas',
    fit: 'Square Boxy Overshirt',
    primaryImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Warm Tobacco', hex: '#8C5835' },
      { name: 'Charcoal Black', hex: '#222220' },
      { name: 'Unbleached Natural', hex: '#DCD6CA' }
    ],
    sizes: [
      { size: 'M', stock: 11 },
      { size: 'L', stock: 15 },
      { size: 'XL', stock: 7 },
      { size: 'XXL', stock: 3 }
    ],
    weightGrams: 580,
    rating: 4.9,
    reviewsCount: 92,
    careInstructions: [
      'Wash with similar colors',
      'Reshape while damp',
      'Medium heat iron'
    ],
    visualStyle: {
      baseColor: '#845535',
      accentColor: '#F4F1EA',
      pattern: 'utility'
    }
  },
  {
    id: 'prod-07',
    sku: 'UB-SW-007',
    name: 'Oatmeal Terry Minimalist Crewneck',
    slug: 'oatmeal-terry-minimalist-crewneck',
    category: 'Hoodies and sweatshirts',
    collection: 'Nordic Calm Essentials',
    price: 1999,
    compareAtPrice: 2599,
    description: 'Subtle heather oatmeal knit in combed cotton loopback fleece. Clean neckband with twin-needle stitching and blind hems for a quiet, luxury streetwear statement.',
    fabric: 'Combed Loopback Heavy Terry',
    fit: 'Relaxed Ergonomic',
    primaryImage: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Raw Oatmeal', hex: '#DED8CB' },
      { name: 'Smoked Ash', hex: '#686663' }
    ],
    sizes: [
      { size: 'S', stock: 7 },
      { size: 'M', stock: 14 },
      { size: 'L', stock: 11 },
      { size: 'XL', stock: 6 }
    ],
    weightGrams: 520,
    isBestSeller: true,
    rating: 4.8,
    reviewsCount: 115,
    careInstructions: [
      'Wash gentle cycle (30°C)',
      'Do not wring',
      'Flat air dry'
    ],
    visualStyle: {
      baseColor: '#D8D1C3',
      accentColor: '#111111',
      pattern: 'minimal'
    }
  },
  {
    id: 'prod-08',
    sku: 'UB-GT-008',
    name: 'Streets of Madras Vintage Graphic Tee',
    slug: 'streets-of-madras-vintage-graphic-tee',
    category: 'Graphic T-shirts',
    collection: 'Tamil Nadu Heritage',
    price: 1099,
    compareAtPrice: 1599,
    description: 'Tribute to 90s Chennai street culture, vintage bus routes, and neon street typography. Printed on pre-washed vintage jersey with intentional subtle cracking finish.',
    fabric: 'Bio-Washed Combed Heavy Cotton',
    fit: 'Boxy Drop Shoulder',
    primaryImage: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Washed Ash', hex: '#3E3E3C' },
      { name: 'Off-White Ivory', hex: '#EAE6DD' }
    ],
    sizes: [
      { size: 'S', stock: 12 },
      { size: 'M', stock: 22 },
      { size: 'L', stock: 19 },
      { size: 'XL', stock: 8 }
    ],
    weightGrams: 300,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 198,
    careInstructions: [
      'Machine wash cold with mild detergent',
      'Wash inside out',
      'Dry in shade'
    ],
    visualStyle: {
      baseColor: '#363634',
      accentColor: '#C7F000',
      pattern: 'vintage'
    }
  },
  {
    id: 'prod-09',
    sku: 'UB-AC-009',
    name: 'Atelier Low-Profile Chino Twill Cap',
    slug: 'atelier-low-profile-chino-twill-cap',
    category: 'Caps and accessories',
    collection: 'Hardware Accessories',
    price: 799,
    compareAtPrice: 1199,
    description: 'Heavy 16 oz washed chino twill 6-panel cap with raised tonal embroidery of the URBAN STREET monogram. Antique brass clasp adjuster at rear.',
    fabric: '100% Chino Cotton Twill 16 oz',
    fit: 'Unstructured 6-Panel Adjustable',
    primaryImage: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Deep Black', hex: '#171716' },
      { name: 'Washed Olive', hex: '#484D3D' },
      { name: 'Raw Bone', hex: '#D9D3C7' }
    ],
    sizes: [
      { size: 'M', stock: 24 }
    ],
    weightGrams: 140,
    isBestSeller: true,
    rating: 4.8,
    reviewsCount: 88,
    careInstructions: [
      'Spot clean with damp cloth',
      'Do not machine wash or soak',
      'Air dry'
    ],
    visualStyle: {
      baseColor: '#171716',
      accentColor: '#C7F000',
      pattern: 'minimal'
    }
  },
  {
    id: 'prod-10',
    sku: 'UB-TS-010',
    name: 'Nilgiri Mist Heavy Acid-Wash Tee',
    slug: 'nilgiri-mist-heavy-acid-wash-tee',
    category: 'Oversized T-shirts',
    collection: 'Highlands Drop',
    price: 1299,
    compareAtPrice: 1799,
    description: 'Each garment is individually hand-acid washed in Tiruppur for a one-of-a-kind misty gradient effect inspired by Nilgiris mountain fog. Dense combed yarn.',
    fabric: 'Super-Heavy Combed Cotton Jersey',
    fit: 'Oversized Boxy',
    primaryImage: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Acid Mist Sage', hex: '#586358' },
      { name: 'Acid Slate', hex: '#3E4249' }
    ],
    sizes: [
      { size: 'S', stock: 4 },
      { size: 'M', stock: 10 },
      { size: 'L', stock: 12 },
      { size: 'XL', stock: 5 }
    ],
    weightGrams: 350,
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 63,
    careInstructions: [
      'Gentle cold wash',
      'Wash with dark colors',
      'Dry flat away from direct sun'
    ],
    visualStyle: {
      baseColor: '#525B52',
      accentColor: '#E9E6DF',
      pattern: 'vintage'
    }
  },
  {
    id: 'prod-11',
    sku: 'UB-CG-011',
    name: 'Modular Utility Street Parachute Jogger',
    slug: 'modular-utility-street-parachute-jogger',
    category: 'Cargo pants',
    collection: 'Urban Utility Lab',
    price: 2499,
    compareAtPrice: 3299,
    description: 'Featherlight yet tear-resistant technical nylon-cotton blend with articulated knee darts, waterproof zip pockets, and elasticated ankle cording for quick silhouette switching.',
    fabric: 'Nylon-Cotton Technical Weave',
    fit: 'Balloon Parachute Fit',
    primaryImage: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Matte Ink', hex: '#141414' },
      { name: 'Moonbeam Grey', hex: '#7D7E82' }
    ],
    sizes: [
      { size: 'S', stock: 7 },
      { size: 'M', stock: 16 },
      { size: 'L', stock: 14 },
      { size: 'XL', stock: 6 }
    ],
    weightGrams: 420,
    rating: 4.7,
    reviewsCount: 51,
    careInstructions: [
      'Machine wash gentle with synthetic cycle',
      'Do not use fabric softeners',
      'Low tumble dry or drip dry'
    ],
    visualStyle: {
      baseColor: '#1F2021',
      accentColor: '#C7F000',
      pattern: 'tech'
    }
  },
  {
    id: 'prod-12',
    sku: 'UB-SH-012',
    name: 'Raw Madras Flannel Relaxed Shirt',
    slug: 'raw-madras-flannel-relaxed-shirt',
    category: 'Shirts',
    collection: 'Madras Heritage',
    price: 1899,
    compareAtPrice: 2499,
    description: 'Reimagining historic Madras checks with muted monochrome and moss tones. Woven with double-twisted cotton yarn for a substantial brushed feel.',
    fabric: '100% Brushed Cotton Twill Flannel',
    fit: 'Relaxed Fit with Curved Hem',
    primaryImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Moss & Charcoal Plaid', hex: '#3E4239' },
      { name: 'Monochrome Check', hex: '#262626' }
    ],
    sizes: [
      { size: 'M', stock: 8 },
      { size: 'L', stock: 12 },
      { size: 'XL', stock: 5 },
      { size: 'XXL', stock: 2 }
    ],
    weightGrams: 480,
    rating: 4.8,
    reviewsCount: 78,
    careInstructions: [
      'Machine wash 30°C',
      'Iron while slightly damp',
      'Do not bleach'
    ],
    visualStyle: {
      baseColor: '#363A32',
      accentColor: '#F4F1EA',
      pattern: 'vintage'
    }
  }
];

export const VALID_COUPONS: Coupon[] = [
  {
    code: 'URBAN20',
    discountPercent: 20,
    minOrderValue: 1999,
    description: '20% OFF on all orders above ₹1,999',
    expiryDate: '2026-12-31'
  },
  {
    code: 'VANAKKAM',
    discountAmount: 300,
    minOrderValue: 1499,
    description: 'Flat ₹300 OFF for Tamil Nadu residents (Min ₹1,499)',
    expiryDate: '2026-12-31'
  },
  {
    code: 'FREESHIP',
    discountAmount: 99,
    minOrderValue: 799,
    description: 'Free Express Shipping across Tamil Nadu',
    expiryDate: '2026-12-31'
  }
];
