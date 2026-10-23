import React, { useState } from 'react';
import { Product } from '../types';
import { Shirt } from 'lucide-react';
import { useElementParallax } from '../hooks/useParallax';

interface ProductVisualProps {
  product: Product;
  selectedColorHex?: string;
  className?: string;
  isZoomed?: boolean;
  showSecondaryOnHover?: boolean;
  enableParallax?: boolean;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  product,
  selectedColorHex,
  className = '',
  isZoomed = false,
  showSecondaryOnHover = true,
  enableParallax = true
}) => {
  const [hasPrimaryError, setHasPrimaryError] = useState(false);
  const [hasSecondaryError, setHasSecondaryError] = useState(false);
  const [loadedPrimary, setLoadedPrimary] = useState(false);

  const { ref: containerRef, offset, prefersReducedMotion } = useElementParallax<HTMLDivElement>(0.07, 18);

  const primarySrc = product.primaryImage;
  const secondarySrc = product.secondaryImage || product.images?.[1] || product.primaryImage;
  const shouldApplyParallax = enableParallax && !prefersReducedMotion;

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-[#F4F4F5] dark:bg-[#0A0A0C] flex items-center justify-center select-none ${className}`}
    >
      
      {/* Fallback Container if Image Fails to Load */}
      {hasPrimaryError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#F4F4F5] to-[#E4E4E7] dark:from-[#181A22] dark:to-[#0F1016]">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-sm border border-black/10 dark:border-white/10"
            style={{ backgroundColor: selectedColorHex || product.colors[0]?.hex || '#09090B' }}
          >
            <Shirt className="w-8 h-8 text-white" />
          </div>
          <span className="font-display font-bold text-sm tracking-wide text-[#09090B] dark:text-[#F8FAFC]">
            {product.name}
          </span>
          <span className="text-xs font-mono-numbers text-[#71717A] dark:text-[#94A3B8] mt-1">
            {product.fit} · {product.category}
          </span>
        </div>
      ) : (
        <>
          {/* Subtle loading shimmer placeholder until image loads */}
          {!loadedPrimary && (
            <div className="absolute inset-0 bg-slate-200/60 dark:bg-slate-800/60 animate-pulse" />
          )}

          {/* Parallax Image Canvas with Bleed bounds */}
          <div
            className="absolute inset-x-0 w-full h-[116%] -top-[8%] will-change-transform"
            style={{
              transform: shouldApplyParallax ? `translate3d(0, ${offset}px, 0)` : undefined
            }}
          >
            {/* Primary Real Photo */}
            <img
              src={primarySrc}
              alt={product.name}
              referrerPolicy="no-referrer"
              loading="lazy"
              onLoad={() => setLoadedPrimary(true)}
              onError={() => setHasPrimaryError(true)}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
                isZoomed ? 'scale-105' : 'scale-100'
              } ${
                showSecondaryOnHover && secondarySrc && !hasSecondaryError
                  ? 'group-hover:opacity-0 group-hover:scale-105'
                  : ''
              }`}
            />

            {/* Secondary Real Lookbook / Model Photo (Advanced Slide & Reveal on Hover) */}
            {showSecondaryOnHover && secondarySrc && !hasSecondaryError && (
              <img
                src={secondarySrc}
                alt={`${product.name} detail`}
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={() => setHasSecondaryError(true)}
                className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 ${
                  isZoomed ? 'group-hover:scale-105' : 'group-hover:scale-100'
                }`}
              />
            )}
          </div>

          {/* Color Tint Indicator */}
          {selectedColorHex && (
            <div 
              className="absolute bottom-2.5 left-2.5 w-3 h-3 rounded-full border border-white shadow-sm transition-transform duration-300 pointer-events-none z-10"
              style={{ backgroundColor: selectedColorHex }}
              title={`Selected shade: ${selectedColorHex}`}
            />
          )}

          {/* Subtle vignette scrim at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        </>
      )}

    </div>
  );
};
