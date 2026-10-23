import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product, ProductColor } from '../types';
import { ProductVisual } from './ProductVisual';
import { Check, Heart, Star, ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index?: number;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
  averageRating?: number;
  reviewsCount?: number;
  onSelect: (product: Product) => void;
  onQuickAdd: (product: Product, color: ProductColor, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL') => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  isWishlisted = false,
  onToggleWishlist,
  averageRating,
  reviewsCount,
  onSelect,
  onQuickAdd
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [addedSize, setAddedSize] = useState<string | null>(null);

  // Calculate total stock
  const totalStock = product.sizes.reduce((acc, s) => acc + s.stock, 0);
  const isLowStock = totalStock > 0 && totalStock <= 6;
  const isOutOfStock = totalStock === 0;

  const handleSizeClick = (e: React.MouseEvent, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL') => {
    e.stopPropagation();
    onQuickAdd(product, selectedColor, size);
    setAddedSize(size);
    setTimeout(() => setAddedSize(null), 1600);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ 
        duration: 0.55, 
        ease: [0.16, 1, 0.3, 1],
        delay: index !== undefined ? (index % 3) * 0.06 : 0
      }}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
      onClick={() => onSelect(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white dark:bg-[#16171D] border border-[#D9D6CE] dark:border-[#2A2C35] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-[#1765F5] dark:hover:border-[#1765F5]"
    >
      {/* Product Image Area with Dual Slide Effect */}
      <div className="relative aspect-[3/4] w-full bg-[#EDEAE1] dark:bg-[#101115] overflow-hidden">
        
        {/* Real photo rendering with hover slide/fade */}
        <ProductVisual 
          product={product} 
          selectedColorHex={selectedColor.hex}
          isZoomed={isHovered}
          showSecondaryOnHover={true}
        />

        {/* Top Floating Bar: Category, Stock & Wishlist */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs font-mono-numbers z-10 pointer-events-none">
          <div className="flex items-center gap-1.5 text-[#0B0B0D] dark:text-[#F5F2EA] bg-[#F5F2EA]/90 dark:bg-black/80 backdrop-blur-md px-2 py-0.5 rounded border border-black/10 dark:border-white/10 shadow-2xs">
            <span className="font-semibold text-[10px] uppercase tracking-wider">{product.category}</span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            {isOutOfStock ? (
              <span className="text-rose-600 dark:text-rose-400 font-bold uppercase text-[10px] bg-rose-500/10 px-2 py-0.5 rounded backdrop-blur-sm border border-rose-500/20">Sold Out</span>
            ) : isLowStock ? (
              <span className="text-amber-600 dark:text-amber-400 font-bold uppercase text-[10px] bg-amber-500/10 px-2 py-0.5 rounded backdrop-blur-sm border border-amber-500/20">Only {totalStock} left</span>
            ) : product.isNewArrival ? (
              <span className="text-white font-bold uppercase text-[10px] bg-[#1765F5] px-2 py-0.5 rounded backdrop-blur-sm shadow-xs">New Drop</span>
            ) : null}

            {onToggleWishlist && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWishlist(product.id);
                }}
                className={`p-2 rounded-full transition-all backdrop-blur-md shadow-xs ${
                  isWishlisted
                    ? 'bg-[#FF4800] text-white scale-110 shadow-md'
                    : 'bg-[#F5F2EA]/90 dark:bg-black/60 text-[#0B0B0D] dark:text-white hover:bg-white dark:hover:bg-black'
                }`}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Quick Size Selection Slide Bar on Hover */}
        <div className={`absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-all duration-300 z-20 flex flex-col gap-1.5 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        }`}>
          <div className="flex items-center justify-between text-[11px] font-mono-numbers text-white/90">
            <span className="uppercase tracking-wider font-semibold">Quick Add Size</span>
            <span className="flex items-center gap-0.5 text-xs text-[#1765F5]">
              <span>View details</span>
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
            {product.sizes.map((s) => {
              const isAvailable = s.stock > 0;
              const isThisAdded = addedSize === s.size;
              return (
                <button
                  key={s.size}
                  type="button"
                  disabled={!isAvailable}
                  onClick={(e) => handleSizeClick(e, s.size)}
                  className={`flex-1 py-1 px-1.5 text-xs font-mono-numbers font-bold rounded transition-all duration-150 ${
                    isThisAdded
                      ? 'bg-emerald-500 text-white scale-105'
                      : isAvailable
                      ? 'bg-white hover:bg-[#1765F5] hover:text-white text-[#0B0B0D] dark:bg-[#1C1E27] dark:hover:bg-[#1765F5] dark:text-[#F5F2EA]'
                      : 'bg-black/40 text-white/30 cursor-not-allowed line-through'
                  }`}
                  title={isAvailable ? `Add Size ${s.size} to Bag` : `Size ${s.size} Sold Out`}
                >
                  {isThisAdded ? <Check className="w-3 h-3 mx-auto" /> : s.size}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Product Information Section */}
      <div className="p-4 flex flex-col gap-2.5 flex-1 justify-between">
        
        <div>
          {/* Metadata Row */}
          <div className="flex items-center gap-2 text-[11px] font-mono-numbers text-[#7A7C82] dark:text-[#92949A] mb-1">
            <span>{product.collection}</span>
            <span aria-hidden="true" className="text-neutral-400">·</span>
            <span>{product.fit}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-headline text-lg font-bold text-[#0B0B0D] dark:text-[#F5F2EA] tracking-wide line-clamp-1 group-hover:text-[#1765F5] transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1 text-xs font-mono-numbers">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold text-[#0B0B0D] dark:text-[#F5F2EA]">
                {(averageRating !== undefined ? averageRating : product.rating).toFixed(1)}
              </span>
            </div>
            <span className="text-neutral-400">·</span>
            <span className="text-[11px] text-[#7A7C82] dark:text-[#92949A]">
              {reviewsCount !== undefined ? reviewsCount : product.reviewsCount} reviews
            </span>
          </div>
        </div>

        {/* Pricing & Color Swatches Row */}
        <div className="pt-2.5 border-t border-[#D9D6CE] dark:border-[#2A2C35] flex items-center justify-between">
          
          {/* Price */}
          <div className="flex items-baseline gap-2 font-mono-numbers">
            <span className="text-base font-bold text-[#0B0B0D] dark:text-[#F5F2EA]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs text-[#7A7C82] dark:text-[#92949A] line-through">
                ₹{product.compareAtPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Color Swatches */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedColor(c)}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor.hex === c.hex
                    ? 'border-[#1765F5] scale-125 ring-2 ring-[#1765F5]/40'
                    : 'border-black/20 dark:border-white/20 hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>

        </div>

      </div>

    </motion.div>
  );
};
