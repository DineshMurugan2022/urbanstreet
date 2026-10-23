import React from 'react';
import { Category } from '../types';
import { ArrowRight } from 'lucide-react';

interface CategoryTilesProps {
  onSelectCategory: (category: Category) => void;
  activeCategory: Category;
}

export const CategoryTiles: React.FC<CategoryTilesProps> = ({
  onSelectCategory,
  activeCategory
}) => {
  const categories: {
    name: Category;
    label: string;
    description: string;
    image: string;
    tag: string;
  }[] = [
    {
      name: 'Hoodies and sweatshirts',
      label: 'Heavyweight Hoodies',
      description: '400 GSM French Terry & thermal dual-layer hoods',
      image: '/images/hoodie-charcoal-back.jpg',
      tag: 'Drop 01 Essential'
    },
    {
      name: 'Oversized T-shirts',
      label: 'Boxy Oversized Tees',
      description: '280 GSM combed Indian cotton with 1.25" thick ribbed collars',
      image: '/images/tee-offwhite-front.jpg',
      tag: 'Bestseller'
    },
    {
      name: 'Cargo pants',
      label: 'Tactical Utility Cargos',
      description: '8-pocket ripstop canvas with adjustable ankle bungee cinches',
      image: '/images/cargo-tactical.jpg',
      tag: 'Modular Mobility'
    },
    {
      name: 'Graphic T-shirts',
      label: 'Graphic & Kolam Archive',
      description: 'Zero-hand feel discharge silkscreen prints merging heritage & futurism',
      image: '/images/hoodie-brown-back.jpg',
      tag: 'Limited Capsule'
    }
  ];

  return (
    <section className="w-full bg-[#EDE8DE] dark:bg-[#121318] py-16 px-4 sm:px-6 lg:px-8 border-b border-[#D9D6CE] dark:border-[#262830] transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono-numbers uppercase tracking-[0.2em] text-[#1765F5] font-bold block mb-1">
              CURATED SILHOUETTES
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl font-black text-[#0B0B0D] dark:text-[#F5F2EA] tracking-tight uppercase leading-none">
              SHOP BY CATEGORY
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#7A7C82] dark:text-[#92949A] font-body max-w-sm">
            Architectural street cuts engineered for Indian body frames and subcontinental climate.
          </p>
        </div>

        {/* 4 Large Visual Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.name;

            return (
              <div
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                className={`group relative rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 aspect-[4/5] flex flex-col justify-end p-6 ${
                  isSelected 
                    ? 'border-[#1765F5] ring-2 ring-[#1765F5]/30 shadow-xl' 
                    : 'border-[#D9D6CE] dark:border-[#2A2C35] hover:border-[#1765F5] hover:shadow-lg'
                }`}
              >
                {/* Background Image with Zoom */}
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.78] contrast-[1.05]"
                />

                {/* Dark Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Content Overlay */}
                <div className="relative z-10 space-y-1.5">
                  <span className="text-[10px] font-mono-numbers uppercase tracking-wider text-[#1765F5] font-bold bg-black/60 px-2 py-0.5 rounded-sm inline-block backdrop-blur-xs">
                    {cat.tag}
                  </span>
                  
                  <h3 className="font-headline text-2xl font-bold text-white uppercase tracking-wide group-hover:text-[#1765F5] transition-colors flex items-center justify-between">
                    <span>{cat.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#1765F5]" />
                  </h3>

                  <p className="text-[11px] font-body text-neutral-300 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
