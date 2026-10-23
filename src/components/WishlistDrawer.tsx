import React, { useEffect } from 'react';
import { Product, ProductColor } from '../types';
import { ProductVisual } from './ProductVisual';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  Plus, 
  Star
} from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProductIds: string[];
  products: Product[];
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL', quantity: number) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProductIds,
  products,
  onToggleWishlist,
  onSelectProduct,
  onAddToCart
}) => {
  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const wishlistedProducts = products.filter(p => wishlistProductIds.includes(p.id));

  const handleQuickMoveToBag = (product: Product) => {
    const availableSizes = product.sizes.filter(s => s.stock > 0);
    const defaultSize = availableSizes[0]?.size || 'L';
    const defaultColor = product.colors[0];
    onAddToCart(product, defaultColor, defaultSize, 1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs transition-opacity duration-300">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
        <div className="w-screen max-w-md bg-white dark:bg-[#121318] border-l border-[#E4E4E7] dark:border-[#22242F] shadow-2xl flex flex-col justify-between pointer-events-auto">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#E4E4E7] dark:border-[#22242F] flex items-center justify-between bg-[#FAFAFA] dark:bg-[#0E0F14]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#FF4800] dark:bg-[#FF5500] flex items-center justify-center text-white">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <h2 className="font-display text-xl font-bold tracking-tight text-[#09090B] dark:text-[#F8FAFC]">
                SAVED DROPS ({wishlistedProducts.length})
              </h2>
            </div>
            
            <button
              onClick={onClose}
              className="p-1.5 text-[#71717A] hover:text-[#09090B] dark:text-[#94A3B8] dark:hover:text-[#F8FAFC] rounded-full hover:bg-[#F4F4F5] dark:hover:bg-[#181A22] transition-colors"
              aria-label="Close wishlist drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#71717A] dark:text-[#94A3B8]">
                <div className="w-16 h-16 rounded-full bg-[#F4F4F5] dark:bg-[#181A22] flex items-center justify-center mb-4 border border-[#E4E4E7] dark:border-[#22242F]">
                  <Heart className="w-8 h-8 text-[#71717A]" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#09090B] dark:text-[#F8FAFC] mb-1">
                  NO SAVED DROPS YET
                </h3>
                <p className="text-xs font-mono-numbers mb-6 max-w-xs">
                  Tap the heart icon on any heavyweight hoodie, boxy tee, or cargo pant to save it for later.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#09090B] hover:bg-[#27272A] dark:bg-[#F8FAFC] dark:hover:bg-white text-white dark:text-[#09090B] font-mono-numbers text-xs font-semibold rounded-lg shadow-sm"
                >
                  Explore Drops
                </button>
              </div>
            ) : (
              wishlistedProducts.map((product) => {
                const totalStock = product.sizes.reduce((a, b) => a + b.stock, 0);
                const isOutOfStock = totalStock === 0;

                return (
                  <div
                    key={product.id}
                    className="flex gap-4 p-3.5 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl hover:border-[#2563EB] dark:hover:border-[#3B82F6] transition-colors"
                  >
                    {/* Visual Box */}
                    <div 
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="w-20 h-24 rounded-lg bg-[#E4E4E7] dark:bg-[#0A0A0C] flex items-center justify-center shrink-0 cursor-pointer overflow-hidden relative"
                    >
                      <ProductVisual product={product} />
                    </div>

                    {/* Information */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 
                            onClick={() => {
                              onSelectProduct(product);
                              onClose();
                            }}
                            className="font-display text-sm font-bold text-[#09090B] dark:text-[#F8FAFC] line-clamp-1 cursor-pointer hover:text-[#2563EB] dark:hover:text-[#3B82F6] transition-colors"
                          >
                            {product.name}
                          </h4>
                          <button
                            onClick={() => onToggleWishlist(product.id)}
                            className="text-[#71717A] hover:text-red-500 p-1"
                            title="Remove from saved drops"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] font-mono-numbers text-[#71717A] dark:text-[#94A3B8] mt-0.5">
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

                      <div className="flex items-center justify-between pt-2 border-t border-[#E4E4E7] dark:border-[#242735]">
                        <span className="font-mono-numbers text-sm font-bold text-[#09090B] dark:text-[#F8FAFC]">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>

                        <button
                          onClick={() => handleQuickMoveToBag(product)}
                          disabled={isOutOfStock}
                          className="px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[11px] font-mono-numbers font-bold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-40 shadow-xs"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Bag</span>
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer */}
          {wishlistedProducts.length > 0 && (
            <div className="p-5 border-t border-[#E4E4E7] dark:border-[#22242F] bg-[#FAFAFA] dark:bg-[#0E0F14] flex items-center justify-between">
              <span className="text-xs font-mono-numbers text-[#71717A] dark:text-[#94A3B8]">
                Items saved in browser memory
              </span>

              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#09090B] hover:bg-[#27272A] dark:bg-[#F8FAFC] dark:hover:bg-white text-white dark:text-[#09090B] font-mono-numbers text-xs font-bold rounded-lg transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
