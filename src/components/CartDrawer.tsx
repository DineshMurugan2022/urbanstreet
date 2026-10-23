import React, { useState, useEffect } from 'react';
import { CartItem, Coupon } from '../types';
import { VALID_COUPONS } from '../data/mockProducts';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  ArrowRight, 
  Truck, 
  CheckCircle2,
  AlertCircle 
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (coupon: Coupon | null) => void;
  onCheckout: () => void;
  freeShippingThreshold: number;
  standardShippingFee: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  appliedCoupon,
  onApplyCoupon,
  onCheckout,
  freeShippingThreshold = 1499,
  standardShippingFee = 99
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

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

  // Calculate financials
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Free shipping meter
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const isFreeShipping = subtotal >= freeShippingThreshold || appliedCoupon?.code === 'FREESHIP';
  const shippingFee = isFreeShipping || cart.length === 0 ? 0 : standardShippingFee;

  // Coupon discount calculation
  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountPercent) {
      discount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountAmount) {
      discount = appliedCoupon.discountAmount;
    }
  }

  const finalTotal = Math.max(0, subtotal - discount + shippingFee);

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    const found = VALID_COUPONS.find(c => c.code === code);
    if (!found) {
      setCouponError('Invalid coupon code. Try URBAN20 or VANAKKAM');
      return;
    }

    if (subtotal < found.minOrderValue) {
      setCouponError(`Minimum order value of ₹${found.minOrderValue.toLocaleString('en-IN')} required for ${code}`);
      return;
    }

    onApplyCoupon(found);
    setCouponError('');
    setCouponInput('');
  };

  const handleRemoveCoupon = () => {
    onApplyCoupon(null);
    setCouponError('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs transition-opacity duration-300">
      {/* Backdrop overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
        <div className="w-screen max-w-md bg-white dark:bg-[#121318] border-l border-[#E4E4E7] dark:border-[#22242F] shadow-2xl flex flex-col justify-between pointer-events-auto">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#E4E4E7] dark:border-[#22242F] flex items-center justify-between bg-[#FAFAFA] dark:bg-[#0E0F14]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6]" />
              <h2 className="font-display text-xl font-bold tracking-tight text-[#09090B] dark:text-[#F8FAFC]">
                STREET BAG ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#71717A] hover:text-[#09090B] dark:text-[#94A3B8] dark:hover:text-[#F8FAFC] rounded-full hover:bg-[#F4F4F5] dark:hover:bg-[#181A22] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Meter */}
          <div className="px-5 py-3 bg-[#F4F4F5] dark:bg-[#181A22] border-b border-[#E4E4E7] dark:border-[#22242F] text-xs font-mono-numbers">
            {amountNeededForFreeShipping > 0 ? (
              <div>
                <p className="text-[#09090B] dark:text-[#F8FAFC] mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Add <strong>₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</strong> for Free TN Express</span>
                  </span>
                  <span className="text-[#2563EB] font-bold">{freeShippingProgress}%</span>
                </p>
                <div className="w-full h-1.5 bg-[#E4E4E7] dark:bg-[#22242F] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2563EB] dark:bg-[#3B82F6] transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>You qualify for Free Tamil Nadu Express Delivery!</span>
              </p>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#71717A] dark:text-[#94A3B8]">
                <div className="w-16 h-16 rounded-full bg-[#F4F4F5] dark:bg-[#181A22] flex items-center justify-center mb-4 border border-[#E4E4E7] dark:border-[#22242F]">
                  <ShoppingBag className="w-8 h-8 text-[#71717A]" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#09090B] dark:text-[#F8FAFC] mb-1">
                  YOUR BAG IS EMPTY
                </h3>
                <p className="text-xs font-mono-numbers mb-6">
                  Explore new heavyweight streetwear drops engineered in Tiruppur.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#09090B] hover:bg-[#27272A] dark:bg-[#F8FAFC] dark:hover:bg-white text-white dark:text-[#09090B] font-mono-numbers text-xs font-semibold rounded-lg shadow-sm"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl"
                >
                  {/* Real Garment Photo Thumbnail */}
                  <div className="relative w-16 h-20 rounded-lg overflow-hidden shrink-0 bg-black/10">
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div 
                      className="absolute bottom-1 right-1 w-3 h-3 rounded-full border border-white shadow-xs"
                      style={{ backgroundColor: item.selectedColor.hex }}
                      title={item.selectedColor.name}
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-display text-sm font-bold text-[#09090B] dark:text-[#F8FAFC] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#71717A] hover:text-red-500 p-1 shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] font-mono-numbers text-[#71717A] dark:text-[#94A3B8] mt-0.5 truncate">
                        <span>{item.selectedColor.name}</span>
                        <span> · </span>
                        <span>Size {item.selectedSize}</span>
                        <span> · </span>
                        <span>{item.product.fit}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E4E4E7] dark:border-[#242735]">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#E4E4E7] dark:border-[#22242F] rounded bg-white dark:bg-[#121318]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#09090B] dark:text-[#F8FAFC] hover:bg-[#F4F4F5] dark:hover:bg-[#181A22]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono-numbers font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#09090B] dark:text-[#F8FAFC] hover:bg-[#F4F4F5] dark:hover:bg-[#181A22]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span className="font-mono-numbers text-sm font-bold text-[#09090B] dark:text-[#F8FAFC]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer: Coupons & Totals */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#E4E4E7] dark:border-[#22242F] bg-[#FAFAFA] dark:bg-[#0E0F14] space-y-4">
              
              {/* Coupon Code Section */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-lg text-xs font-mono-numbers">
                    <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-300">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code <strong>{appliedCoupon.code}</strong> Applied</span>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Coupon code (e.g. VANAKKAM)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 px-3 py-2 bg-white dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-xs font-mono-numbers uppercase text-[#09090B] dark:text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-[#09090B] hover:bg-[#27272A] dark:bg-[#242735] text-white text-xs font-mono-numbers font-semibold rounded-lg transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-[11px] text-red-500 font-mono-numbers">
                        {couponError}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-[10px] text-[#71717A] dark:text-[#94A3B8] font-mono-numbers">
                      <span>Quick Codes:</span>
                      <button onClick={() => setCouponInput('VANAKKAM')} className="underline hover:text-[#2563EB]">VANAKKAM (₹300)</button>
                      <span>·</span>
                      <button onClick={() => setCouponInput('URBAN20')} className="underline hover:text-[#2563EB]">URBAN20 (20%)</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs font-mono-numbers text-[#71717A] dark:text-[#94A3B8]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#09090B] dark:text-[#F8FAFC] font-semibold">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-blue-600 dark:text-blue-400">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Tamil Nadu Delivery</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-600 dark:text-emerald-400">FREE</strong> : `₹${shippingFee}`}</span>
                </div>

                <div className="pt-2 border-t border-[#E4E4E7] dark:border-[#22242F] flex justify-between text-base font-bold text-[#09090B] dark:text-[#F8FAFC]">
                  <span>Total Amount</span>
                  <span className="text-[#09090B] dark:text-[#F8FAFC]">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono-numbers text-xs uppercase tracking-wider font-bold rounded-lg flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
