import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { Search, X, ArrowRight, Tag, Star } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input and handle Escape key
  useEffect(() => {
    if (!isOpen) return;
    setTimeout(() => inputRef.current?.focus(), 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.sku.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.fabric.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = (product: Product) => {
    onSelectProduct(product);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150 cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search Catalog"
    >
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-2xl shadow-2xl overflow-hidden cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E4E4E7] dark:border-[#22242F] flex items-center gap-3 bg-[#FAFAFA] dark:bg-[#0E0F14]">
          <Search className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search heavyweight hoodies, boxy tees, utility cargos, denim..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base font-body text-[#09090B] dark:text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#71717A] hover:text-[#09090B] dark:text-[#94A3B8] dark:hover:text-[#F8FAFC] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-mono-numbers bg-[#F4F4F5] dark:bg-[#181A22] text-[#71717A] dark:text-[#94A3B8] rounded hover:text-[#09090B] dark:hover:text-[#F8FAFC] border border-[#E4E4E7] dark:border-[#22242F]"
          >
            ESC
          </button>
        </div>

        {/* Results / Quick Suggestions */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-2">
          {!query.trim() ? (
            <div className="py-4 space-y-3">
              <span className="text-[11px] font-mono-numbers uppercase text-[#71717A] dark:text-[#94A3B8] tracking-wider block">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono-numbers">
                {['French Terry Hoodie', 'Marina Sunset', 'Tactical Cargo', 'Madras Flannel', 'Cyber Kolam', 'Oversized Tee'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 bg-[#F4F4F5] dark:bg-[#181A22] hover:bg-[#E4E4E7] dark:hover:bg-[#242735] text-[#09090B] dark:text-[#F8FAFC] rounded-lg transition-colors border border-[#E4E4E7] dark:border-[#22242F] flex items-center gap-1.5"
                  >
                    <Tag className="w-3 h-3 text-[#2563EB]" />
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono-numbers text-[#71717A] dark:text-[#94A3B8]">
              No garments matching "{query}". Try searching "Hoodie", "Cargo", or "Tee".
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSelect(product)}
                className="p-2.5 bg-[#F4F4F5] dark:bg-[#181A22] hover:bg-[#E4E4E7] dark:hover:bg-[#242735] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl cursor-pointer flex items-center justify-between gap-3 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-14 rounded-lg overflow-hidden bg-black/10 shrink-0">
                    <img 
                      src={product.primaryImage} 
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-display text-sm font-bold text-[#09090B] dark:text-[#F8FAFC] group-hover:text-[#2563EB] dark:group-hover:text-[#3B82F6] truncate transition-colors">
                      {product.name}
                    </h4>
                    <div className="text-[11px] font-mono-numbers text-[#71717A] dark:text-[#94A3B8] mt-0.5 flex items-center gap-1.5 truncate">
                      <span>{product.sku}</span>
                      <span>·</span>
                      <span>{product.category}</span>
                      <span>·</span>
                      <span>{product.fit}</span>
                      <span>·</span>
                      <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-current" />
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono-numbers text-sm font-bold text-[#09090B] dark:text-[#F8FAFC]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#71717A] group-hover:text-[#2563EB] dark:group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
