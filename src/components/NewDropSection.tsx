import React from 'react';
import { Product, ProductColor } from '../types';
import { ArrowRight, Heart } from 'lucide-react';

interface NewDropSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onViewAll: () => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
}

export const NewDropSection: React.FC<NewDropSectionProps> = ({
  products,
  onSelectProduct,
  onViewAll,
  wishlist,
  onToggleWishlist
}) => {
  // Take top 3 drop products (prod-01, prod-02, prod-03)
  const dropProducts = products.slice(0, 3);

  return (
    <section className="w-full bg-[#F5F2EA] dark:bg-[#0E0F12] py-14 px-4 sm:px-6 lg:px-8 border-b border-[#D9D6CE] dark:border-[#262830] transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-8">
            {/* Title with Blue Brush Stroke Underline */}
            <div>
              <div className="text-xs font-mono-numbers uppercase tracking-[0.2em] text-[#1765F5] font-bold mb-1">
                LATEST ARRIVALS
              </div>
              <div className="relative inline-block">
                <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B0B0D] dark:text-[#F5F2EA] tracking-tight uppercase leading-none">
                  THE NEW DROP
                </h2>
                {/* Hand-drawn style blue artistic brush stroke / marker */}
                <svg className="absolute -bottom-3.5 left-2 w-48 sm:w-56 h-4 text-[#1765F5] overflow-visible" viewBox="0 0 200 14" fill="none">
                  <path d="M3 8C45 4 125 1 197 10C155 5 80 8 20 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-[#7A7C82] dark:text-[#92949A] font-body leading-relaxed max-w-xs sm:border-l sm:border-[#D9D6CE] dark:sm:border-[#262830] sm:pl-6 pt-1">
              Fresh silhouettes. Timeless essentials. <br />
              Designed for India's streets.
            </p>
          </div>

          {/* View All CTA */}
          <button
            type="button"
            onClick={onViewAll}
            className="group inline-flex items-center gap-1.5 text-xs font-mono-numbers uppercase font-bold text-[#1765F5] hover:text-[#0E53D6] tracking-wider shrink-0 transition-colors"
          >
            <span>VIEW ALL</span>
            <span className="text-sm transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

        {/* 3 Horizontal Product Cards (Pixel-Identical to Screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {dropProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const mainColor = product.colors[0];

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group relative flex bg-white dark:bg-[#16171D] border border-[#D9D6CE] dark:border-[#2A2C35] rounded-xl overflow-hidden cursor-pointer hover:border-[#1765F5] dark:hover:border-[#1765F5] hover:shadow-lg transition-all duration-200"
              >
                {/* Left: Product Image */}
                <div className="w-[45%] aspect-square bg-[#EDEAE1] dark:bg-[#101115] overflow-hidden shrink-0 relative">
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle Wishlist Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className="absolute top-2.5 left-2.5 p-1.5 rounded-full bg-black/40 hover:bg-black/70 text-white/90 hover:text-white backdrop-blur-sm transition-colors"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'text-[#FF4800] fill-current' : ''}`} />
                  </button>
                </div>

                {/* Right: Product Details */}
                <div className="w-[55%] p-4 flex flex-col justify-between">
                  
                  <div className="space-y-1.5">
                    {/* Title */}
                    <h3 className="font-headline text-base sm:text-lg font-bold text-[#0B0B0D] dark:text-[#F5F2EA] uppercase leading-tight line-clamp-2 tracking-wide group-hover:text-[#1765F5] transition-colors">
                      {product.name}
                    </h3>
                    
                    {/* Color Name */}
                    <p className="text-[11px] font-body text-[#7A7C82] dark:text-[#92949A]">
                      {mainColor?.name || 'Streetwear Edition'}
                    </p>
                  </div>

                  {/* Price and Swatches */}
                  <div className="space-y-3 pt-2">
                    {/* Price */}
                    <div className="font-mono-numbers font-bold text-sm sm:text-base text-[#0B0B0D] dark:text-[#F5F2EA]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </div>

                    {/* Color Swatch Dots */}
                    <div className="flex items-center gap-1.5">
                      {product.colors.slice(0, 3).map((col) => (
                        <span
                          key={col.name}
                          className="w-3.5 h-3.5 rounded-full border border-black/20 dark:border-white/20 inline-block shadow-2xs"
                          style={{ backgroundColor: col.hex }}
                          title={col.name}
                        />
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
