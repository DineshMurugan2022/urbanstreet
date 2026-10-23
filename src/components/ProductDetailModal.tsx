import React, { useState, useEffect } from 'react';
import { Product, ProductColor, ProductReview, UserProfile } from '../types';
import { SizeGuideModal } from './SizeGuideModal';
import { ProductReviewSection } from './ProductReviewSection';
import { checkPincodeServiceability, PincodeInfo } from '../utils/tnPincodes';
import { 
  X, 
  ShoppingBag, 
  Truck, 
  Shield, 
  RotateCcw, 
  Ruler, 
  Check, 
  MapPin, 
  Heart, 
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
  reviews?: ProductReview[];
  currentUser?: UserProfile;
  onAddReview?: (review: Omit<ProductReview, 'id' | 'createdAt'>) => void;
  averageRating?: number;
  reviewsCount?: number;
  onClose: () => void;
  onAddToCart: (product: Product, color: ProductColor, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL', quantity: number) => void;
  onBuyNow: (product: Product, color: ProductColor, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL', quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isWishlisted = false,
  onToggleWishlist,
  reviews = [],
  currentUser,
  onAddReview,
  averageRating,
  reviewsCount,
  onClose,
  onAddToCart,
  onBuyNow
}) => {
  // --- All hooks must be declared before any early return ---
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product ? product.colors[0] : { name: '', hex: '' }
  );
  const [selectedSize, setSelectedSize] = useState<'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'>('M');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [pinCodeInput, setPinCodeInput] = useState('');
  const [pinInfo, setPinInfo] = useState<PincodeInfo | null>(null);
  const [pinError, setPinError] = useState('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  // Reset state when product changes
  useEffect(() => {
    if (!product) return;
    setSelectedColor(product.colors[0]);
    setSelectedSize('M');
    setQuantity(1);
    setActiveImageIndex(0);
    setPinCodeInput('');
    setPinInfo(null);
    setPinError('');
    setAddedToast(false);
  }, [product?.id]);

  // Early return AFTER all hooks
  if (!product) return null;

  const galleryImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.primaryImage, product.secondaryImage || product.primaryImage];

  // Check stock for selected size
  const sizeObj = product.sizes.find(s => s.size === selectedSize);
  const stockForSelectedSize = sizeObj ? sizeObj.stock : 0;
  const isOutOfStock = stockForSelectedSize === 0;

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
      setPinError('Valid PIN code required');
      setPinInfo(null);
    }
  };

  const handleAdd = () => {
    if (isOutOfStock) return;
    onAddToCart(product, selectedColor, selectedSize, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuy = () => {
    if (isOutOfStock) return;
    onBuyNow(product, selectedColor, selectedSize, quantity);
    onClose();
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      {/* Modal Surface */}
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-2xl shadow-2xl overflow-hidden my-8 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 text-[#71717A] hover:text-[#09090B] dark:text-[#94A3B8] dark:hover:text-[#F8FAFC] bg-[#F4F4F5] dark:bg-[#181A22] rounded-full transition-colors border border-[#E4E4E7] dark:border-[#22242F]"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
          
          {/* Left Column: Real Photography Carousel */}
          <div className="md:col-span-6 bg-[#F4F4F5] dark:bg-[#0A0A0C] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E4E4E7] dark:border-[#22242F]">
            
            {/* Top SKU Tag */}
            <div className="flex items-center justify-between text-xs font-mono-numbers">
              <span className="text-[#71717A] dark:text-[#94A3B8]">SKU: {product.sku}</span>
              <span className="text-[#2563EB] dark:text-[#3B82F6] font-semibold">{product.collection}</span>
            </div>

            {/* Central Real Photography Image Carousel */}
            <div className="relative my-4 aspect-[4/5] w-full max-w-[360px] mx-auto rounded-xl overflow-hidden shadow-md bg-slate-200 dark:bg-[#151720] group">
              <img
                src={galleryImages[activeImageIndex] || product.primaryImage}
                alt={`${product.name} angle ${activeImageIndex + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-500 ease-out"
              />

              {/* Gallery Arrow Controls */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-transform active:scale-95"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-transform active:scale-95"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImageIndex(i)}
                    className={`relative w-12 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImageIndex === i
                        ? 'border-[#2563EB] scale-105 ring-2 ring-[#2563EB]/30'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Quality Commitment Note */}
            <div className="mt-4 pt-3 border-t border-[#E4E4E7] dark:border-[#22242F] flex items-center justify-between text-[11px] font-mono-numbers text-[#71717A] dark:text-[#94A3B8]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                100% Sourced Combed Cotton
              </span>
              <span>Tiruppur Quality Audit Passed</span>
            </div>

          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
            
            <div className="flex flex-col gap-5">
              
              {/* Header: Title & Pricing */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-numbers text-[#71717A] dark:text-[#94A3B8] mb-1">
                  <span>{product.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.fit}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#2563EB] dark:text-[#3B82F6] font-semibold">Tiruppur Atelier</span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#09090B] dark:text-[#F8FAFC] tracking-wide">
                  {product.name}
                </h2>

                {/* Rating and Reviews Counter */}
                <div className="flex items-center gap-2 mt-1.5 font-mono-numbers text-xs">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-[#09090B] dark:text-[#F8FAFC]">
                      {(averageRating !== undefined ? averageRating : product.rating).toFixed(1)}
                    </span>
                  </div>
                  <span className="text-slate-400">·</span>
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('product-reviews-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-[#71717A] dark:text-[#94A3B8] hover:text-[#09090B] dark:hover:text-[#F8FAFC] underline"
                  >
                    {reviewsCount !== undefined ? reviewsCount : product.reviewsCount} customer reviews
                  </button>
                </div>

                <div className="flex items-baseline gap-3 mt-2 font-mono-numbers">
                  <span className="text-2xl font-bold text-[#09090B] dark:text-[#F8FAFC]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.compareAtPrice && product.compareAtPrice > product.price && (
                    <>
                      <span className="text-sm text-[#71717A] line-through">
                        ₹{product.compareAtPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        Save ₹{(product.compareAtPrice - product.price).toLocaleString('en-IN')}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Colorway Selection */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono-numbers mb-2">
                  <span className="text-[#71717A] dark:text-[#94A3B8] uppercase tracking-wider">
                    Color: <strong className="text-[#09090B] dark:text-[#F8FAFC]">{selectedColor.name}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        selectedColor.hex === c.hex 
                          ? 'border-[#2563EB] scale-110 shadow-md ring-2 ring-[#2563EB]/30' 
                          : 'border-black/20 dark:border-white/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection & Size Guide */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono-numbers mb-2">
                  <span className="text-[#71717A] dark:text-[#94A3B8] uppercase tracking-wider">
                    Select Size
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="flex items-center gap-1 text-[#2563EB] dark:text-[#3B82F6] hover:underline font-semibold"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Measurement Chart</span>
                  </button>
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((s) => {
                    const isAvailable = s.stock > 0;
                    const isSelected = selectedSize === s.size;
                    return (
                      <button
                        key={s.size}
                        type="button"
                        disabled={!isAvailable}
                        onClick={() => setSelectedSize(s.size)}
                        className={`py-2 text-xs font-mono-numbers font-semibold rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                            : isAvailable
                            ? 'bg-[#F4F4F5] dark:bg-[#181A22] text-[#09090B] dark:text-[#F8FAFC] border-[#E4E4E7] dark:border-[#22242F] hover:border-[#2563EB]'
                            : 'bg-transparent text-[#999] border-[#E4E4E7]/40 line-through cursor-not-allowed opacity-50'
                        }`}
                      >
                        {s.size}
                      </button>
                    );
                  })}
                </div>

                {/* Stock Warning */}
                <div className="mt-2 text-xs font-mono-numbers">
                  {isOutOfStock ? (
                    <span className="text-red-500 font-semibold">Out of Stock in this size</span>
                  ) : stockForSelectedSize <= 5 ? (
                    <span className="text-amber-500 font-semibold">Only {stockForSelectedSize} left in size {selectedSize}</span>
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-400">In Stock · Ready to dispatch from Tiruppur Hub</span>
                  )}
                </div>
              </div>

              {/* PIN Code Delivery Checker */}
              <div className="p-3.5 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl text-xs font-mono-numbers space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#71717A] dark:text-[#94A3B8] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Check Delivery Timeline</span>
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit PIN code (e.g. 600040)"
                    value={pinCodeInput}
                    onChange={(e) => setPinCodeInput(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 px-3 py-1.5 bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-xs font-mono-numbers text-[#09090B] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2563EB]"
                  />
                  <button
                    type="button"
                    onClick={handlePincodeCheck}
                    className="px-3.5 py-1.5 bg-[#09090B] dark:bg-white text-white dark:text-[#09090B] rounded-lg font-semibold text-xs transition-colors hover:bg-[#2563EB] dark:hover:bg-[#2563EB] dark:hover:text-white"
                  >
                    Check
                  </button>
                </div>

                {pinError && <p className="text-[11px] text-red-500">{pinError}</p>}

                {pinInfo && (
                  <div className="pt-1 text-[11px] text-emerald-600 dark:text-emerald-400 space-y-0.5">
                    <p className="font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>{pinInfo.city}: Express Delivery in {pinInfo.deliveryDays}</span>
                    </p>
                    <p className="text-[#71717A] dark:text-[#94A3B8]">Doorstep Cash on Delivery & UPI available.</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleAdd}
                    disabled={isOutOfStock}
                    className="flex-1 py-3 px-4 bg-[#09090B] hover:bg-[#27272A] dark:bg-[#F8FAFC] dark:hover:bg-white text-white dark:text-[#09090B] font-mono-numbers text-xs uppercase tracking-wider font-bold rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-40 shadow-xs"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#2563EB]" />
                    <span>{addedToast ? 'Added to Bag!' : 'Add to Bag'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBuy}
                    disabled={isOutOfStock}
                    className="flex-1 py-3 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono-numbers text-xs uppercase tracking-wider font-bold rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-40 shadow-md"
                  >
                    <span>Buy Now</span>
                  </button>

                  {onToggleWishlist && (
                    <button
                      type="button"
                      onClick={() => onToggleWishlist(product.id)}
                      className={`px-3.5 py-3 rounded-lg border transition-all flex items-center justify-center ${
                        isWishlisted
                          ? 'bg-[#FF4800] border-[#FF4800] text-white'
                          : 'bg-[#F4F4F5] dark:bg-[#181A22] border-[#E4E4E7] dark:border-[#22242F] text-[#71717A] hover:text-[#09090B] dark:hover:text-[#F8FAFC]'
                      }`}
                      title={isWishlisted ? "Remove from Saved Drops" : "Save to Wishlist"}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                  )}
                </div>
              </div>

              {/* Fabric Specs & Details Summary */}
              <div className="pt-3 border-t border-[#E4E4E7] dark:border-[#22242F] text-xs text-[#71717A] dark:text-[#94A3B8] flex flex-col gap-2 font-mono-numbers">
                <div>
                  <strong className="text-[#09090B] dark:text-[#F8FAFC]">Fabric:</strong> {product.fabric}
                </div>
                <div>
                  <strong className="text-[#09090B] dark:text-[#F8FAFC]">Silhouette:</strong> {product.fit}
                </div>
                <div>
                  <strong className="text-[#09090B] dark:text-[#F8FAFC]">Care:</strong> {product.careInstructions[0]}
                </div>
                <div className="flex items-center gap-4 text-[11px] pt-1">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-[#2563EB]" />
                    100% Genuine Cotton
                  </span>
                  <span className="flex items-center gap-1">
                    <RotateCcw className="w-3.5 h-3.5 text-[#2563EB]" />
                    7-Day Free Exchange
                  </span>
                </div>
              </div>

              {/* Product Reviews & Rating Module */}
              <div id="product-reviews-section">
                {onAddReview && (
                  <ProductReviewSection
                    productId={product.id}
                    productName={product.name}
                    reviews={reviews}
                    currentUser={currentUser || {
                      isLoggedIn: true,
                      name: 'Dinesh Murugan',
                      email: '2002dineshmurugan@gmail.com',
                      phone: '+91 9840123456',
                      city: 'Chennai, TN'
                    }}
                    onAddReview={onAddReview}
                  />
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Dedicated Size Guide Modal Overlay */}
        <SizeGuideModal
          isOpen={showSizeGuide}
          onClose={() => setShowSizeGuide(false)}
          defaultCategory={product.category}
        />

      </div>
    </div>
  );
};
