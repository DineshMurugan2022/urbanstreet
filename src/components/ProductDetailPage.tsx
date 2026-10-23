import React, { useState, useEffect } from 'react';
import { Product, ProductColor, ProductReview, UserProfile } from '../types';
import { SizeGuideModal } from './SizeGuideModal';
import { ProductReviewSection } from './ProductReviewSection';
import { checkPincodeServiceability, PincodeInfo } from '../utils/tnPincodes';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Ruler, 
  Check, 
  MapPin, 
  Heart, 
  Star, 
  ChevronRight, 
  Zap, 
  Minus, 
  Plus, 
  Sparkles, 
  Layers, 
  Share2, 
  ChevronDown, 
  HelpCircle 
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  reviews: ProductReview[];
  currentUser: UserProfile;
  onAddReview: (review: Omit<ProductReview, 'id' | 'createdAt'>) => void;
  onBackToCatalog: () => void;
  onAddToCart: (product: Product, color: ProductColor, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL', quantity: number) => void;
  onBuyNow: (product: Product, color: ProductColor, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL', quantity: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  isWishlisted,
  onToggleWishlist,
  reviews,
  currentUser,
  onAddReview,
  onBackToCatalog,
  onAddToCart,
  onBuyNow,
  onSelectProduct
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'>('M');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [pinCodeInput, setPinCodeInput] = useState('600040');
  const [pinInfo, setPinInfo] = useState<PincodeInfo | null>(null);
  const [pinError, setPinError] = useState('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedToast, setAddedToast] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Accordion open states
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    fabric: true,
    fit: false,
    care: false,
    shipping: false
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedColor(product.colors[0]);
    setSelectedSize('M');
    setQuantity(1);
    setActiveImageIndex(0);
    setAddedToast(false);
  }, [product.id]);

  // Initial check for default pincode
  useEffect(() => {
    if (pinCodeInput && pinCodeInput.length === 6) {
      const res = checkPincodeServiceability(pinCodeInput);
      if (res) setPinInfo(res);
    }
  }, []);

  const galleryImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.primaryImage, product.secondaryImage || product.primaryImage];

  // Stock calculations
  const sizeObj = product.sizes.find(s => s.size === selectedSize);
  const stockForSelectedSize = sizeObj ? sizeObj.stock : 0;
  const isOutOfStock = stockForSelectedSize === 0;
  const isLowStock = stockForSelectedSize > 0 && stockForSelectedSize <= 5;

  const handlePincodeCheck = () => {
    if (!pinCodeInput || pinCodeInput.trim().length !== 6) {
      setPinError('Please enter a 6-digit PIN code');
      setPinInfo(null);
      return;
    }
    const res = checkPincodeServiceability(pinCodeInput);
    if (res) {
      setPinInfo(res);
      setPinError('');
    } else {
      setPinError('Serviceable within 2-3 days via Express Air');
      setPinInfo({
        pinCode: pinCodeInput,
        city: 'Tamil Nadu Region',
        district: 'Tamil Nadu',
        state: 'Tamil Nadu',
        deliveryDays: '24-48 Hours Express',
        isCodAvailable: true
      });
    }
  };

  const handleAdd = () => {
    if (isOutOfStock) return;
    onAddToCart(product, selectedColor, selectedSize, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2400);
  };

  const handleBuy = () => {
    if (isOutOfStock) return;
    onBuyNow(product, selectedColor, selectedSize, quantity);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Compute discount percentage
  const discountPercent = product.compareAtPrice && product.compareAtPrice > product.price
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  // Filter related streetwear products
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.category === product.category || p.isFeatured))
    .slice(0, 3);

  // Compute product reviews count and rating
  const productReviews = reviews.filter(r => r.productId === product.id);
  const avgRating = productReviews.length > 0
    ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
    : product.rating.toFixed(1);
  const totalReviewsCount = productReviews.length > 0 ? productReviews.length : product.reviewsCount;

  return (
    <div className="w-full bg-[#F5F2EA] dark:bg-[#0B0B0D] text-[#0B0B0D] dark:text-[#F5F2EA] transition-colors duration-200">
      
      {/* 1. Breadcrumbs Bar */}
      <div className="w-full border-b border-[#D9D6CE] dark:border-[#262830] bg-[#EDE8DE]/60 dark:bg-[#121318]/60 backdrop-blur-xs py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono-numbers">
          <div className="flex items-center gap-2 text-[#7A7C82] dark:text-[#92949A] truncate">
            <button
              type="button"
              onClick={onBackToCatalog}
              className="hover:text-[#1765F5] transition-colors font-semibold flex items-center gap-1 shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Catalog</span>
            </button>
            <span>/</span>
            <span className="hover:text-[#0B0B0D] dark:hover:text-[#F5F2EA] cursor-pointer truncate">
              {product.category}
            </span>
            <span>/</span>
            <span className="text-[#0B0B0D] dark:text-[#F5F2EA] font-bold truncate">
              {product.name}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0 ml-4">
            <button
              type="button"
              onClick={handleShare}
              className="p-1.5 text-[#7A7C82] hover:text-[#0B0B0D] dark:hover:text-[#F5F2EA] transition-colors flex items-center gap-1"
              title="Copy Product Link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Product Showcase Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          
          {/* ================= LEFT: High-End Fashion Gallery ================= */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Featured Hero Photo */}
            <div className="relative aspect-[4/5] sm:aspect-square w-full rounded-2xl overflow-hidden bg-[#EDE8DE] dark:bg-[#14151B] border border-[#D9D6CE] dark:border-[#262830] shadow-sm group">
              <img
                src={galleryImages[activeImageIndex]}
                alt={`${product.name} view ${activeImageIndex + 1}`}
                className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
              />

              {/* Floating Badge Overlays */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none z-10">
                <span className="px-3 py-1 bg-[#0B0B0D]/85 text-white text-[11px] font-mono-numbers uppercase tracking-wider font-bold rounded-sm backdrop-blur-sm">
                  {product.collection}
                </span>
                {discountPercent > 0 && (
                  <span className="px-3 py-1 bg-[#1765F5] text-white text-[11px] font-mono-numbers uppercase tracking-wider font-bold rounded-sm shadow-sm">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Quick Wishlist Icon */}
              <button
                type="button"
                onClick={() => onToggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-md transition-all z-10 ${
                  isWishlisted
                    ? 'bg-[#FF4800] text-white scale-110'
                    : 'bg-white/80 dark:bg-black/70 text-[#0B0B0D] dark:text-[#F5F2EA] hover:bg-white dark:hover:bg-black'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>

              {/* Fabric spec badge at bottom */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono-numbers pointer-events-none">
                <div className="px-3 py-1.5 bg-black/70 text-white rounded-md backdrop-blur-md flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#1765F5]" />
                  <span>{product.fabric}</span>
                </div>
                <div className="px-3 py-1.5 bg-black/70 text-white rounded-md backdrop-blur-md hidden sm:flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Preshrunk Heavyweight</span>
                </div>
              </div>
            </div>

            {/* Thumbnail Row */}
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 pt-1">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-square rounded-xl overflow-hidden border transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#1765F5] ring-2 ring-[#1765F5]/30 scale-[1.02] shadow-sm'
                        : 'border-[#D9D6CE] dark:border-[#262830] opacity-70 hover:opacity-100 hover:border-[#1765F5]'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Quality Guarantees Feature Strip */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-white dark:bg-[#16171D] border border-[#D9D6CE] dark:border-[#262830] rounded-xl text-xs font-mono-numbers text-center">
              <div className="p-2 border-r border-[#D9D6CE] dark:border-[#262830]">
                <strong className="block text-sm font-bold text-[#0B0B0D] dark:text-[#F5F2EA]">400 GSM</strong>
                <span className="text-[10px] text-[#7A7C82] dark:text-[#92949A] uppercase">French Terry Weave</span>
              </div>
              <div className="p-2 border-r border-[#D9D6CE] dark:border-[#262830]">
                <strong className="block text-sm font-bold text-[#0B0B0D] dark:text-[#F5F2EA]">Tiruppur Mill</strong>
                <span className="text-[10px] text-[#7A7C82] dark:text-[#92949A] uppercase">100% Combed Cotton</span>
              </div>
              <div className="p-2">
                <strong className="block text-sm font-bold text-[#1765F5]">24-48h Delivery</strong>
                <span className="text-[10px] text-[#7A7C82] dark:text-[#92949A] uppercase">Tamil Nadu Express</span>
              </div>
            </div>

          </div>

          {/* ================= RIGHT: Purchase & Specifications (Sticky) ================= */}
          <div className="lg:col-span-5 space-y-7 lg:sticky lg:top-28">
            
            {/* Header / Title / Rating */}
            <div className="space-y-3 border-b border-[#D9D6CE] dark:border-[#262830] pb-6">
              
              <div className="flex items-center gap-2 text-xs font-mono-numbers uppercase text-[#7A7C82] dark:text-[#92949A] tracking-wider">
                <span className="font-bold text-[#1765F5]">URBAN STREET ATELIER</span>
                <span>·</span>
                <span>SKU: {product.sku}</span>
              </div>

              <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B0B0D] dark:text-[#F5F2EA] tracking-tight uppercase leading-[0.95]">
                {product.name}
              </h1>

              {/* Rating Summary with Reviews Anchor */}
              <div className="flex items-center gap-3 text-xs font-mono-numbers">
                <div className="flex items-center gap-1.5 bg-[#EDE8DE] dark:bg-[#181A22] px-2.5 py-1 rounded-md text-[#0B0B0D] dark:text-[#F5F2EA]">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                  <span className="font-bold">{avgRating}</span>
                </div>
                <a
                  href="#customer-reviews"
                  className="text-[#7A7C82] dark:text-[#92949A] hover:text-[#1765F5] underline transition-colors"
                >
                  Based on {totalReviewsCount} customer verified reviews
                </a>
              </div>

              {/* Price Block */}
              <div className="pt-2 flex items-baseline gap-3">
                <span className="font-mono-numbers text-3xl font-extrabold text-[#0B0B0D] dark:text-[#F5F2EA]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="font-mono-numbers text-lg text-[#7A7C82] dark:text-[#92949A] line-through">
                    ₹{product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-mono-numbers font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Save ₹{(product.compareAtPrice! - product.price).toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <p className="text-[11px] font-mono-numbers text-[#7A7C82] dark:text-[#92949A]">
                Inclusive of all taxes. Free express shipping on orders above ₹1,499.
              </p>
            </div>

            {/* Color Swatch Selection */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono-numbers">
                <span className="text-[#7A7C82] dark:text-[#92949A] uppercase tracking-wider">
                  Colorway: <strong className="text-[#0B0B0D] dark:text-[#F5F2EA]">{selectedColor.name}</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => {
                  const isSelected = selectedColor.name === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`relative w-8 h-8 rounded-full border transition-all ${
                        isSelected
                          ? 'border-[#1765F5] ring-2 ring-[#1765F5]/40 scale-110 shadow-sm'
                          : 'border-black/20 dark:border-white/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-white drop-shadow-md mx-auto" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector with Live Stock Warnings */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono-numbers">
                <span className="text-[#7A7C82] dark:text-[#92949A] uppercase tracking-wider">
                  Select Size: <strong className="text-[#0B0B0D] dark:text-[#F5F2EA]">{selectedSize}</strong>
                  {isLowStock && (
                    <span className="text-amber-600 dark:text-amber-400 ml-2 font-bold">
                      · Only {stockForSelectedSize} units left!
                    </span>
                  )}
                  {isOutOfStock && (
                    <span className="text-rose-600 dark:text-rose-400 ml-2 font-bold">
                      · Sold Out
                    </span>
                  )}
                </span>
                
                {/* Size Guide Trigger */}
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(true)}
                  className="text-[#1765F5] hover:underline flex items-center gap-1 font-bold"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((s) => {
                  const isSelected = selectedSize === s.size;
                  const isAvailable = s.stock > 0;
                  return (
                    <button
                      key={s.size}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => setSelectedSize(s.size)}
                      className={`py-3 rounded-lg font-mono-numbers text-xs font-bold transition-all border ${
                        isSelected
                          ? 'bg-[#0B0B0D] dark:bg-[#F5F2EA] text-white dark:text-[#0B0B0D] border-[#0B0B0D] dark:border-[#F5F2EA] shadow-sm'
                          : isAvailable
                          ? 'bg-white dark:bg-[#16171D] text-[#0B0B0D] dark:text-[#F5F2EA] border-[#D9D6CE] dark:border-[#262830] hover:border-[#1765F5]'
                          : 'bg-black/5 dark:bg-white/5 text-neutral-400 border-[#D9D6CE] dark:border-[#262830] cursor-not-allowed line-through'
                      }`}
                    >
                      {s.size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & Add to Bag / Buy Now CTAs */}
            <div className="space-y-3 pt-2">
              
              <div className="flex items-center gap-3">
                {/* Stepper */}
                <div className="flex items-center border border-[#D9D6CE] dark:border-[#262830] rounded-lg bg-white dark:bg-[#16171D] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-[#7A7C82] hover:text-[#0B0B0D] dark:hover:text-[#F5F2EA] transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-mono-numbers font-bold text-sm text-[#0B0B0D] dark:text-[#F5F2EA]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(stockForSelectedSize || 10, quantity + 1))}
                    className="p-3 text-[#7A7C82] hover:text-[#0B0B0D] dark:hover:text-[#F5F2EA] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Add to Bag Button */}
                <button
                  type="button"
                  disabled={isOutOfStock}
                  onClick={handleAdd}
                  className="flex-1 py-4 px-6 bg-[#1765F5] hover:bg-[#0E53D6] disabled:bg-neutral-300 text-white font-mono-numbers text-xs uppercase tracking-wider font-bold rounded-lg flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.99]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isOutOfStock ? 'Sold Out' : `Add to Bag · ₹${(product.price * quantity).toLocaleString('en-IN')}`}</span>
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                type="button"
                disabled={isOutOfStock}
                onClick={handleBuy}
                className="w-full py-3.5 px-6 bg-[#0B0B0D] hover:bg-neutral-800 dark:bg-[#F5F2EA] dark:hover:bg-white text-white dark:text-[#0B0B0D] font-mono-numbers text-xs uppercase tracking-wider font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99]"
              >
                <Zap className="w-4 h-4 text-amber-400 fill-current" />
                <span>Instant Checkout & Place Order</span>
              </button>

              {/* Toast Feedback */}
              {addedToast && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-lg text-xs font-mono-numbers flex items-center justify-between animate-in fade-in">
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Added {quantity}x {product.name} ({selectedSize}) to Bag!</span>
                  </span>
                  <button onClick={onBackToCatalog} className="underline font-bold">
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Live Tamil Nadu PIN Code Delivery Estimator */}
            <div className="p-4 bg-white dark:bg-[#16171D] border border-[#D9D6CE] dark:border-[#262830] rounded-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-numbers">
                <span className="font-bold text-[#0B0B0D] dark:text-[#F5F2EA] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#1765F5]" />
                  <span>Check Delivery & Express Timeline</span>
                </span>
                <span className="text-[11px] text-[#7A7C82]">Tiruppur Atelier Dispatch</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pinCodeInput}
                  onChange={(e) => setPinCodeInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit PIN Code"
                  className="flex-1 px-3 py-2 bg-[#EDE8DE] dark:bg-[#121318] border border-[#D9D6CE] dark:border-[#262830] rounded-lg text-xs font-mono-numbers text-[#0B0B0D] dark:text-[#F5F2EA] focus:outline-none focus:border-[#1765F5]"
                />
                <button
                  type="button"
                  onClick={handlePincodeCheck}
                  className="px-4 py-2 bg-[#0B0B0D] dark:bg-[#F5F2EA] text-white dark:text-[#0B0B0D] text-xs font-mono-numbers font-bold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Verify
                </button>
              </div>

              {pinInfo && (
                <div className="p-3 bg-[#EDE8DE]/60 dark:bg-[#121318] rounded-lg text-xs font-mono-numbers space-y-1">
                  <p className="text-[#0B0B0D] dark:text-[#F5F2EA] font-semibold flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#1765F5]" />
                    <span>Delivering to <strong>{pinInfo.city}, TN</strong> — {pinInfo.deliveryDays}</span>
                  </p>
                  <p className="text-[11px] text-[#7A7C82] dark:text-[#92949A]">
                    ✓ Cash on Delivery & UPI QR available at doorstep.
                  </p>
                </div>
              )}
            </div>

            {/* Technical Accordions */}
            <div className="border-t border-[#D9D6CE] dark:border-[#262830] divide-y divide-[#D9D6CE] dark:divide-[#262830]">
              
              {/* Accordion 1: Fabric & Craft */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion('fabric')}
                  className="w-full flex items-center justify-between text-left font-headline text-lg font-bold text-[#0B0B0D] dark:text-[#F5F2EA] uppercase tracking-wide"
                >
                  <span>Fabric & Material Specifications</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openAccordions.fabric ? 'rotate-180' : ''}`} />
                </button>
                {openAccordions.fabric && (
                  <div className="pt-2.5 text-xs text-[#7A7C82] dark:text-[#92949A] space-y-2 font-body leading-relaxed">
                    <p>{product.description}</p>
                    <ul className="list-disc pl-5 space-y-1 font-mono-numbers text-[11px]">
                      <li>Fabric: <strong>{product.fabric}</strong></li>
                      <li>Weight: <strong>{product.weightGrams} grams (Heavyweight Grade)</strong></li>
                      <li>Double-needle construction with high-tensile poly-core thread</li>
                      <li>Zero synthetic shrinkage guarantee</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2: Silhouette & Fit */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion('fit')}
                  className="w-full flex items-center justify-between text-left font-headline text-lg font-bold text-[#0B0B0D] dark:text-[#F5F2EA] uppercase tracking-wide"
                >
                  <span>Silhouette & Fit Guide</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openAccordions.fit ? 'rotate-180' : ''}`} />
                </button>
                {openAccordions.fit && (
                  <div className="pt-2.5 text-xs text-[#7A7C82] dark:text-[#92949A] space-y-2 font-body leading-relaxed">
                    <p>Designed with an architectural {product.fit.toLowerCase()} cut. Dropped shoulders, relaxed chest, and cropped waistband engineered for balanced layering.</p>
                    <p className="font-mono-numbers text-[11px]">
                      Model in editorial photos is 6'1" (185 cm) wearing size <strong>L</strong>.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Care Instructions */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion('care')}
                  className="w-full flex items-center justify-between text-left font-headline text-lg font-bold text-[#0B0B0D] dark:text-[#F5F2EA] uppercase tracking-wide"
                >
                  <span>Garment Care Instructions</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openAccordions.care ? 'rotate-180' : ''}`} />
                </button>
                {openAccordions.care && (
                  <div className="pt-2.5 text-xs text-[#7A7C82] dark:text-[#92949A] space-y-1 font-mono-numbers">
                    {product.careInstructions.map((instruction, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1765F5]" />
                        <span>{instruction}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion 4: Shipping & 7-Day Exchange */}
              <div className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex items-center justify-between text-left font-headline text-lg font-bold text-[#0B0B0D] dark:text-[#F5F2EA] uppercase tracking-wide"
                >
                  <span>Shipping & Doorstep Exchange Policy</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openAccordions.shipping ? 'rotate-180' : ''}`} />
                </button>
                {openAccordions.shipping && (
                  <div className="pt-2.5 text-xs text-[#7A7C82] dark:text-[#92949A] space-y-2 font-body leading-relaxed">
                    <p>Orders are dispatched directly from our central Tiruppur facility. Tamil Nadu metro orders (Chennai, Coimbatore, Madurai, Tiruppur) are delivered in 24 to 48 hours.</p>
                    <p>Enjoy a 7-day no-questions-asked doorstep exchange for sizing replacements.</p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* 3. Complete Verified Customer Reviews Section */}
      <section id="customer-reviews" className="w-full bg-[#EDE8DE] dark:bg-[#121318] border-t border-[#D9D6CE] dark:border-[#262830] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ProductReviewSection
            productId={product.id}
            productName={product.name}
            reviews={reviews}
            currentUser={currentUser}
            onAddReview={onAddReview}
          />
        </div>
      </section>

      {/* 4. Complete the Look / Recommended Streetwear Pieces */}
      {relatedProducts.length > 0 && (
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8 border-t border-[#D9D6CE] dark:border-[#262830]">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono-numbers uppercase tracking-[0.2em] text-[#1765F5] font-bold block mb-1">
                  ATELIER PAIRING
                </span>
                <h2 className="font-headline text-3xl sm:text-4xl font-black text-[#0B0B0D] dark:text-[#F5F2EA] uppercase">
                  COMPLETE THE LOOK
                </h2>
              </div>
              <button
                type="button"
                onClick={onBackToCatalog}
                className="text-xs font-mono-numbers text-[#1765F5] hover:underline font-bold uppercase"
              >
                View Full Catalog →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((relProduct) => (
                <div
                  key={relProduct.id}
                  onClick={() => onSelectProduct(relProduct)}
                  className="group bg-white dark:bg-[#16171D] border border-[#D9D6CE] dark:border-[#262830] rounded-xl overflow-hidden cursor-pointer hover:border-[#1765F5] hover:shadow-lg transition-all"
                >
                  <div className="aspect-[4/5] bg-[#EDE8DE] dark:bg-[#121318] overflow-hidden">
                    <img
                      src={relProduct.primaryImage}
                      alt={relProduct.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="text-[10px] font-mono-numbers uppercase text-[#7A7C82]">{relProduct.category}</span>
                    <h4 className="font-headline text-lg font-bold text-[#0B0B0D] dark:text-[#F5F2EA] uppercase truncate group-hover:text-[#1765F5] transition-colors">
                      {relProduct.name}
                    </h4>
                    <p className="font-mono-numbers text-sm font-bold text-[#0B0B0D] dark:text-[#F5F2EA]">
                      ₹{relProduct.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Sticky Bottom Purchase Bar for Mobile Screens */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 dark:bg-[#121318]/95 backdrop-blur-md border-t border-[#D9D6CE] dark:border-[#262830] p-3 z-30 flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <div className="font-headline text-sm font-bold truncate max-w-[180px] text-[#0B0B0D] dark:text-[#F5F2EA]">
            {product.name}
          </div>
          <div className="font-mono-numbers text-xs font-extrabold text-[#1765F5]">
            ₹{product.price.toLocaleString('en-IN')} <span className="text-[10px] text-[#7A7C82]">({selectedSize})</span>
          </div>
        </div>

        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleAdd}
          className="px-5 py-2.5 bg-[#1765F5] hover:bg-[#0E53D6] text-white text-xs font-mono-numbers font-bold rounded-lg shadow-md flex items-center gap-1.5"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Bag</span>
        </button>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
        category={product.category}
      />

    </div>
  );
};
