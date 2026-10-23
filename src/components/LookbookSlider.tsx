import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useElementParallax } from '../hooks/useParallax';

interface LookbookSliderProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const LookbookCardItem: React.FC<{
  product: Product;
  index: number;
  onSelect: (p: Product) => void;
}> = ({ product, index, onSelect }) => {
  const { ref, offset, prefersReducedMotion } = useElementParallax<HTMLDivElement>(0.06, 16);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ 
        duration: 0.65, 
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08 
      }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
      onClick={() => onSelect(product)}
      className="group relative flex-none w-[280px] sm:w-[320px] snap-start bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-2xl hover:border-[#2563EB] dark:hover:border-[#3B82F6]"
    >
      {/* Image Container with Hover Slide/Zoom & Subtle Parallax */}
      <div className="relative aspect-[3/4] w-full bg-[#F4F4F5] dark:bg-[#0A0A0C] overflow-hidden">
        <div
          className="absolute inset-x-0 w-full h-[116%] -top-[8%] will-change-transform"
          style={{
            transform: prefersReducedMotion ? undefined : `translate3d(0, ${offset}px, 0)`
          }}
        >
          <img
            src={product.primaryImage}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
          />

          {/* Secondary Image Overlay with Slide-in Effect on Hover */}
          {product.secondaryImage && (
            <img
              src={product.secondaryImage}
              alt={`${product.name} look`}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-105"
            />
          )}
        </div>

        {/* Subtle scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none" />

        {/* Look Index */}
        <div className="absolute top-3 left-3 text-[10px] font-mono-numbers px-2.5 py-1 rounded bg-[#09090B]/80 text-[#3B82F6] border border-white/10 backdrop-blur-md uppercase tracking-wider z-10 font-bold">
          LOOK 0{index + 1}
        </div>

        {/* Bottom Slide Info */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white z-10">
          <span className="text-[10px] font-mono-numbers text-slate-300 uppercase tracking-wider block">
            {product.collection}
          </span>
          <h4 className="font-display text-base font-bold text-white line-clamp-1 mt-0.5">
            {product.name}
          </h4>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20 text-xs font-mono-numbers">
            <span className="font-bold text-[#60A5FA]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-white/90 group-hover:text-[#60A5FA] transition-colors">
              <span>View Piece</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

      </div>

    </motion.div>
  );
};

export const LookbookSlider: React.FC<LookbookSliderProps> = ({
  products,
  onSelectProduct
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Curate spotlight pieces for horizontal slider
  const spotlightProducts = products.filter(p => p.isFeatured || p.isNewArrival).slice(0, 6);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-[#F4F4F5] dark:bg-[#0D0E13] border-b border-[#E4E4E7] dark:border-[#22242F] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Section Header with Slide Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-numbers text-[#71717A] dark:text-[#94A3B8] uppercase tracking-wider mb-1">
              <span>Curated Streetwear Edit</span>
              <span>·</span>
              <span>Smooth Slide Gallery</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#09090B] dark:text-[#F8FAFC]">
              THE WINTER LOOKBOOK
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-numbers text-[#71717A] dark:text-[#94A3B8] mr-2 hidden sm:inline">
              Swipe or Slide
            </span>
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className="p-2.5 rounded-full bg-white dark:bg-[#181A22] hover:bg-[#E4E4E7] dark:hover:bg-[#242735] text-[#09090B] dark:text-[#F8FAFC] border border-[#E4E4E7] dark:border-[#22242F] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xs"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className="p-2.5 rounded-full bg-white dark:bg-[#181A22] hover:bg-[#E4E4E7] dark:hover:bg-[#242735] text-[#09090B] dark:text-[#F8FAFC] border border-[#E4E4E7] dark:border-[#22242F] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xs"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Slider Viewport with Smooth Momentum Scroll */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {spotlightProducts.map((p, idx) => (
            <LookbookCardItem
              key={p.id}
              product={p}
              index={idx}
              onSelect={onSelectProduct}
            />
          ))}
        </div>

      </div>
    </motion.section>
  );
};
