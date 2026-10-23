import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Truck, Layers, Sparkles, Feather } from 'lucide-react';

interface HeroProps {
  onShopClick: (categoryFilter?: string) => void;
  onExploreLookbook?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onExploreLookbook }) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#0B0B0D] text-[#F5F2EA] border-b border-[#2A2C33] select-none">
      
      {/* Background Graphic Photography Layer */}
      <div className="relative min-h-[600px] sm:min-h-[660px] lg:min-h-[720px] w-full flex items-center">
        
        {/* Editorial Model Photography Positioned on Right */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <img
            src="/images/hero-banner.jpg"
            alt="Urban Street Editorial Model in Charcoal Hoodie"
            className="w-full h-full object-cover object-[70%_25%] sm:object-[65%_center] lg:object-right-top brightness-[0.92] contrast-[1.08]"
          />
          {/* Subtle dark gradient scrim for left-side typography readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0D] via-[#0B0B0D]/80 sm:via-[#0B0B0D]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-[#0B0B0D]/30" />
        </div>

        {/* Right Concrete Wall Graffiti Elements (Exactly as in Reference Image) */}
        <div className="hidden lg:flex absolute right-12 xl:right-24 top-20 z-10 flex-col items-center select-none pointer-events-none opacity-85 rotate-[-2deg]">
          {/* Crown Doodle */}
          <svg className="w-12 h-10 text-[#2C2E35] mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
          </svg>
          <div className="font-marker text-2xl xl:text-3xl font-extrabold text-[#363842] leading-[1.05] tracking-wider text-center uppercase">
            <div>INDIAN</div>
            <div>STREETWEAR</div>
            <div>FOR A</div>
            <div>BOLDER</div>
            <div className="relative inline-block text-[#3E404C]">
              GENERATION
              {/* Electric Blue Chalk Marker Underline */}
              <span className="absolute -bottom-2 right-0 w-24 h-2 bg-[#1765F5] rounded-full transform -rotate-1 shadow-sm block" />
            </div>
          </div>
        </div>

        {/* Left Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-24 z-20">
          <div className="max-w-2xl lg:max-w-3xl space-y-7">
            
            {/* Eyebrow Label with Electric Blue Dot */}
            <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-mono-numbers uppercase tracking-[0.2em] text-[#C8C6BF]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1765F5] shrink-0" />
              <span>AUTUMN / WINTER 2026 — DROP 01</span>
            </div>

            {/* Headline: Giant Italic Condensed Typography */}
            <div className="space-y-1">
              <h1 className="font-headline text-6xl sm:text-7xl lg:text-8xl xl:text-[98px] font-black italic tracking-tight text-white leading-[0.88] uppercase drop-shadow-md">
                <div>BUILT FOR THE</div>
                <div className="relative inline-block">
                  <span>STREET_</span>
                  {/* Electric Blue Rectangular Marker under T_ */}
                  <span className="absolute -bottom-1.5 right-0 w-16 sm:w-20 h-2.5 sm:h-3 bg-[#1765F5] block rounded-xs shadow-md" />
                </div>
              </h1>
            </div>

            {/* Supporting Prose */}
            <p className="text-base sm:text-lg text-[#D0CECB] font-body max-w-lg leading-relaxed pt-1">
              Heavyweight essentials. Premium Indian cotton. <br className="hidden sm:inline" />
              Made to move with you.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              {/* Primary CTA */}
              <button
                type="button"
                onClick={() => onShopClick('Hoodies and sweatshirts')}
                className="px-7 sm:px-8 py-3.5 sm:py-4 bg-[#1765F5] hover:bg-[#0E53D6] text-white font-mono-numbers text-xs tracking-wider uppercase font-bold rounded-md flex items-center gap-2.5 shadow-lg hover:shadow-blue-600/30 transition-all hover:translate-y-[-1px] active:translate-y-[1px]"
              >
                <span>SHOP NEW DROP</span>
                <span className="text-base leading-none">→</span>
              </button>

              {/* Secondary CTA */}
              <button
                type="button"
                onClick={onExploreLookbook}
                className="px-6 sm:px-7 py-3.5 sm:py-4 bg-[#191A1D]/80 hover:bg-[#191A1D] border border-white/25 hover:border-white/50 text-white font-mono-numbers text-xs tracking-wider uppercase font-semibold rounded-md backdrop-blur-sm transition-all flex items-center gap-2"
              >
                <span>EXPLORE THE LOOKBOOK</span>
                <span className="text-base leading-none">→</span>
              </button>
            </div>

            {/* Three Benefit Specification Blocks */}
            <div className="pt-8 grid grid-cols-3 max-w-lg gap-4 sm:gap-6 border-t border-white/10">
              
              {/* Spec 1: 400 GSM Heavyweight */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center shrink-0 text-white">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-mono-numbers font-bold text-xs sm:text-sm text-white tracking-wider">
                    400 GSM
                  </div>
                  <div className="font-mono-numbers text-[10px] text-[#92949A] uppercase tracking-wider">
                    HEAVYWEIGHT
                  </div>
                </div>
              </div>

              {/* Spec 2: 100% Combed Cotton */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center shrink-0 text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-mono-numbers font-bold text-xs sm:text-sm text-white tracking-wider">
                    100%
                  </div>
                  <div className="font-mono-numbers text-[10px] text-[#92949A] uppercase tracking-wider">
                    COMBED COTTON
                  </div>
                </div>
              </div>

              {/* Spec 3: Fast Tamil Nadu Delivery */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center shrink-0 text-white">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-mono-numbers font-bold text-xs sm:text-sm text-white tracking-wider leading-tight">
                    FAST TAMIL NADU
                  </div>
                  <div className="font-mono-numbers text-[10px] text-[#92949A] uppercase tracking-wider">
                    DELIVERY
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Carousel Edge Arrows (Subtle Rounded Glass Buttons as in Reference) */}
        <button
          type="button"
          onClick={() => onShopClick()}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-sm transition-all z-20"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => onShopClick()}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-sm transition-all z-20"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>
    </section>
  );
};
