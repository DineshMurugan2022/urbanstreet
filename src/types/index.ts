export type Category = 
  | 'All'
  | 'Oversized T-shirts'
  | 'Graphic T-shirts'
  | 'Hoodies and sweatshirts'
  | 'Cargo pants'
  | 'Jeans and denim'
  | 'Shirts'
  | 'Caps and accessories';

export interface ProductVariantSize {
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  stock: number;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category: Category;
  collection: string;
  price: number; // in INR
  compareAtPrice?: number; // original price in INR
  description: string;
  fabric: string;
  gsm?: number; // Optional Grams per square meter
  fit: string;
  colors: ProductColor[];
  sizes: ProductVariantSize[];
  weightGrams: number;
  primaryImage: string;
  secondaryImage?: string;
  images: string[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
  rating: number;
  reviewsCount: number;
  careInstructions: string[];
  visualStyle: {
    baseColor: string;
    accentColor: string;
    pattern: 'minimal' | 'typography' | 'utility' | 'vintage' | 'denim' | 'tech';
    has3dModel?: boolean;
  };
}

export interface CartItem {
  id: string; // unique item id (productId + color + size)
  productId: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  quantity: number;
}

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type FulfillmentStatus = 'confirmed' | 'processing' | 'dispatched' | 'delivered' | 'cancelled';

export interface ShippingAddress {
  fullName: string;
  mobile: string;
  addressLine: string;
  landmark?: string;
  city: string;
  district: string;
  state: string;
  pinCode: string;
}

export interface TrackingEvent {
  status: FulfillmentStatus;
  title: string;
  location: string;
  timestamp: string;
  description: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  trackingNumber: string;
  courierName: string;
  estimatedDeliveryDate: string;
  trackingTimeline: TrackingEvent[];
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  minOrderValue: number;
  description: string;
  expiryDate: string;
}

export interface InventoryMovement {
  id: string;
  timestamp: string;
  sku: string;
  productName: string;
  size: string;
  changeType: 'sale' | 'restock' | 'adjustment' | 'return';
  quantityChange: number;
  remainingStock: number;
}

export interface StoreSettings {
  brandName: string;
  tagline: string;
  announcementText: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  codFee: number;
  isCodEnabled: boolean;
  isUpiEnabled: boolean;
  isCardEnabled: boolean;
  contactEmail: string;
  contactPhone: string;
  cityHub: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userCity: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
  verifiedPurchase?: boolean;
  helpfulVotes?: number;
}

export interface UserProfile {
  isLoggedIn: boolean;
  name: string;
  email: string;
  phone: string;
  city: string;
  memberTier?: string;
}
