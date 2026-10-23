import React, { useState, useEffect } from 'react';
import { Order, ShippingAddress } from '../types';
import { 
  X, 
  User, 
  MapPin, 
  Package, 
  RotateCcw, 
  Plus, 
  Check, 
  Trash2, 
  ExternalLink,
  ShieldCheck,
  Phone,
  Mail,
  Truck
} from 'lucide-react';

interface CustomerAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onTrackOrder: (order: Order) => void;
}

export const CustomerAccountModal: React.FC<CustomerAccountModalProps> = ({
  isOpen,
  onClose,
  orders,
  onTrackOrder
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'returns'>('orders');
  
  // Profile state
  const [profile, setProfile] = useState({
    name: 'Dinesh Murugan',
    email: '2002dineshmurugan@gmail.com',
    phone: '+91 9840123456',
    memberTier: 'Atelier Gold Streetwear Member'
  });

  // Saved Tamil Nadu Addresses
  const [savedAddresses, setSavedAddresses] = useState<ShippingAddress[]>([
    {
      fullName: 'Dinesh Murugan',
      mobile: '+91 9840123456',
      addressLine: 'Plot 42, 4th Cross Street, Anna Nagar',
      landmark: 'Near Roundtana',
      city: 'Chennai',
      district: 'Chennai',
      state: 'Tamil Nadu',
      pinCode: '600040'
    },
    {
      fullName: 'Dinesh Murugan (Work / Tech Park)',
      mobile: '+91 9840123456',
      addressLine: 'Block 3, OMR IT Corridor, Perungudi',
      landmark: 'Opposite Toll Plaza',
      city: 'Chennai',
      district: 'Chennai',
      state: 'Tamil Nadu',
      pinCode: '600096'
    },
    {
      fullName: 'Dinesh Murugan (Family)',
      mobile: '+91 9840123456',
      addressLine: '14/B, Avinashi Road, Peelamedu',
      landmark: 'Near PSG College',
      city: 'Coimbatore',
      district: 'Coimbatore',
      state: 'Tamil Nadu',
      pinCode: '641004'
    }
  ]);

  const [newAddressForm, setNewAddressForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formMobile, setFormMobile] = useState('');
  const [formLine, setFormLine] = useState('');
  const [formCity, setFormCity] = useState('Chennai');
  const [formPin, setFormPin] = useState('600028');

  // Return request state
  const [returnSelectedOrder, setReturnSelectedOrder] = useState<string>('');
  const [returnReason, setReturnReason] = useState('Need a larger size for true boxy streetwear drape');
  const [returnSubmitted, setReturnSubmitted] = useState(false);

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

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formLine || !formPin) return;

    setSavedAddresses(prev => [
      ...prev,
      {
        fullName: formName || profile.name,
        mobile: formMobile || profile.phone,
        addressLine: formLine,
        landmark: '',
        city: formCity,
        district: formCity,
        state: 'Tamil Nadu',
        pinCode: formPin
      }
    ]);

    setNewAddressForm(false);
    setFormLine('');
    setFormPin('');
  };

  const handleDeleteAddress = (index: number) => {
    setSavedAddresses(prev => prev.filter((_, i) => i !== index));
  };

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReturnSubmitted(true);
    setTimeout(() => {
      setReturnSubmitted(false);
      setReturnSelectedOrder('');
    }, 3000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/75 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Customer Account Dashboard"
    >
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-2xl shadow-2xl overflow-hidden my-6 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-[#E4E4E7] dark:border-[#22242F] bg-[#FAFAFA] dark:bg-[#0E0F14] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-display font-bold text-base shadow-xs">
              DM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-bold text-[#09090B] dark:text-[#F8FAFC]">
                  {profile.name}
                </h3>
                <span className="px-2 py-0.5 text-[9px] font-mono-numbers bg-[#2563EB] text-white rounded font-bold uppercase">
                  TAMIL NADU VIP
                </span>
              </div>
              <p className="text-[11px] font-mono-numbers text-[#71717A] dark:text-[#94A3B8]">
                {profile.email} · {profile.phone}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#71717A] hover:text-[#09090B] dark:text-[#94A3B8] dark:hover:text-[#F8FAFC] rounded-full hover:bg-[#F4F4F5] dark:hover:bg-[#181A22] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="px-6 pt-3 pb-1 border-b border-[#E4E4E7] dark:border-[#22242F] flex items-center gap-2 text-xs font-mono-numbers overflow-x-auto bg-[#FAFAFA] dark:bg-[#0E0F14]">
          {[
            { id: 'orders', label: 'Order History', count: orders.length, icon: Package },
            { id: 'addresses', label: 'Saved Addresses', count: savedAddresses.length, icon: MapPin },
            { id: 'returns', label: '7-Day Exchange', icon: RotateCcw },
            { id: 'profile', label: 'Account Profile', icon: User }
          ].map((t) => {
            const Icon = t.icon;
            const isSelected = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`px-3.5 py-2 rounded-lg font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'text-[#71717A] dark:text-[#94A3B8] hover:text-[#09090B] dark:hover:text-[#F8FAFC] hover:bg-[#F4F4F5] dark:hover:bg-[#181A22]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
                {t.count !== undefined && (
                  <span className="text-[10px] opacity-80">({t.count})</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          
          {/* TAB: Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-8 text-[#71717A] dark:text-[#94A3B8] text-xs font-mono-numbers">
                  No orders placed yet. Add items to your bag to experience 24-48h express delivery.
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E4E4E7] dark:border-[#242735] pb-2 text-xs font-mono-numbers">
                      <div>
                        <strong className="text-sm font-bold text-[#09090B] dark:text-[#F8FAFC] block">
                          ORDER #{order.orderNumber}
                        </strong>
                        <span className="text-[11px] text-[#71717A] dark:text-[#94A3B8]">
                          Placed on {order.date} · {order.items.length} items
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                          {order.fulfillmentStatus}
                        </span>
                        <button
                          onClick={() => {
                            onTrackOrder(order);
                            onClose();
                          }}
                          className="px-3 py-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[11px] font-mono-numbers font-semibold rounded-lg flex items-center gap-1 transition-colors shadow-xs"
                        >
                          <Truck className="w-3 h-3" />
                          <span>Track</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-xs font-mono-numbers">
                          <span className="text-[#09090B] dark:text-[#F8FAFC]">
                            {item.product.name} ({item.selectedColor.name}, Size {item.selectedSize}) x {item.quantity}
                          </span>
                          <span className="font-semibold text-[#09090B] dark:text-[#F8FAFC]">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#E4E4E7] dark:border-[#242735] flex items-center justify-between text-xs font-mono-numbers">
                      <span className="text-[#71717A] dark:text-[#94A3B8]">
                        Delivering to: {order.shippingAddress.city}, TN ({order.shippingAddress.pinCode})
                      </span>
                      <strong className="text-sm text-[#09090B] dark:text-[#F8FAFC]">
                        Total: ₹{order.total.toLocaleString('en-IN')}
                      </strong>
                    </div>

                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB: Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-numbers text-[#71717A] dark:text-[#94A3B8]">
                  Saved Delivery Destinations across Tamil Nadu
                </span>
                <button
                  onClick={() => setNewAddressForm(!newAddressForm)}
                  className="px-3 py-1.5 bg-[#2563EB] text-white text-xs font-mono-numbers font-semibold rounded-lg flex items-center gap-1 hover:bg-[#1D4ED8] transition-colors shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Address</span>
                </button>
              </div>

              {newAddressForm && (
                <form onSubmit={handleAddAddress} className="p-4 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl space-y-3 text-xs font-mono-numbers">
                  <h4 className="font-bold text-[#09090B] dark:text-[#F8FAFC]">Add Tamil Nadu Address</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Receiver Name"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="p-2 bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-[#09090B] dark:text-[#F8FAFC]"
                    />
                    <input
                      type="text"
                      placeholder="Mobile (+91)"
                      value={formMobile}
                      onChange={(e) => setFormMobile(e.target.value)}
                      className="p-2 bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-[#09090B] dark:text-[#F8FAFC]"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="House/Plot, Street & Landmark"
                    value={formLine}
                    onChange={(e) => setFormLine(e.target.value)}
                    className="w-full p-2 bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-[#09090B] dark:text-[#F8FAFC]"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="City (e.g. Chennai)"
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                      className="p-2 bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-[#09090B] dark:text-[#F8FAFC]"
                    />
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="PIN Code"
                      value={formPin}
                      onChange={(e) => setFormPin(e.target.value)}
                      className="p-2 bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-[#09090B] dark:text-[#F8FAFC]"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setNewAddressForm(false)}
                      className="px-3 py-1.5 text-xs text-[#71717A]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#2563EB] text-white text-xs font-semibold rounded-lg hover:bg-[#1D4ED8]"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savedAddresses.map((addr, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl flex flex-col justify-between text-xs font-mono-numbers relative group"
                  >
                    <div>
                      <strong className="text-sm font-bold text-[#09090B] dark:text-[#F8FAFC] block mb-1">
                        {addr.fullName}
                      </strong>
                      <p className="text-[#71717A] dark:text-[#94A3B8] leading-relaxed">
                        {addr.addressLine}, {addr.landmark && `${addr.landmark}, `}{addr.city}, TN - {addr.pinCode}
                      </p>
                      <p className="text-[#71717A] dark:text-[#94A3B8] mt-1">
                        Mobile: {addr.mobile}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E4E4E7] dark:border-[#242735] mt-3 flex items-center justify-between">
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Verified PIN Code</span>
                      </span>
                      {savedAddresses.length > 1 && (
                        <button
                          onClick={() => handleDeleteAddress(idx)}
                          className="text-[#71717A] hover:text-red-500 p-1"
                          title="Delete address"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: 7-Day Exchange */}
          {activeTab === 'returns' && (
            <div className="space-y-4 text-xs font-mono-numbers">
              <div className="p-4 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                  <RotateCcw className="w-4 h-4" />
                  <span>Zero-Hassle Doorstep Sizing Replacement</span>
                </div>
                <p className="text-[#71717A] dark:text-[#94A3B8] leading-relaxed">
                  Ordered a size that feels too tailored or want extra boxy volume? We provide complimentary doorstep replacement within 7 days of delivery across all Tamil Nadu hubs.
                </p>
              </div>

              {returnSubmitted ? (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-center space-y-1">
                  <Check className="w-6 h-6 text-emerald-600 mx-auto" />
                  <strong className="text-emerald-800 dark:text-emerald-300 block font-bold">
                    Exchange Request Confirmed!
                  </strong>
                  <p className="text-xs text-[#71717A] dark:text-[#94A3B8]">
                    Our Tiruppur concierge will WhatsApp you the doorstep swap schedule within 2 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReturnSubmit} className="space-y-3">
                  <div>
                    <label className="block uppercase text-[#71717A] dark:text-[#94A3B8] mb-1">
                      Select Order for Exchange
                    </label>
                    <select
                      value={returnSelectedOrder}
                      onChange={(e) => setReturnSelectedOrder(e.target.value)}
                      className="w-full p-2 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-[#09090B] dark:text-[#F8FAFC]"
                    >
                      <option value="">Choose an order...</option>
                      {orders.map((o) => (
                        <option key={o.id} value={o.orderNumber}>
                          {o.orderNumber} ({o.date} - ₹{o.total})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block uppercase text-[#71717A] dark:text-[#94A3B8] mb-1">
                      Reason for Exchange
                    </label>
                    <textarea
                      rows={2}
                      value={returnReason}
                      onChange={(e) => setReturnReason(e.target.value)}
                      className="w-full p-2 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-[#09090B] dark:text-[#F8FAFC]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-lg transition-colors shadow-xs"
                  >
                    Request Doorstep Sizing Swap
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB: Profile */}
          {activeTab === 'profile' && (
            <div className="space-y-4 text-xs font-mono-numbers">
              <div className="p-4 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#71717A] dark:text-[#94A3B8]">Customer Full Name</span>
                  <span className="text-[#09090B] dark:text-[#F8FAFC] font-bold">{profile.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#71717A] dark:text-[#94A3B8]">Email</span>
                  <span className="text-[#09090B] dark:text-[#F8FAFC] font-bold">{profile.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#71717A] dark:text-[#94A3B8]">Verified Phone</span>
                  <span className="text-[#09090B] dark:text-[#F8FAFC] font-bold">{profile.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#71717A] dark:text-[#94A3B8]">Membership</span>
                  <span className="text-[#2563EB] dark:text-[#3B82F6] font-bold">{profile.memberTier}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FAFAFA] dark:bg-[#0E0F14] border-t border-[#E4E4E7] dark:border-[#22242F] flex items-center justify-between">
          <span className="text-xs font-mono-numbers text-[#71717A] dark:text-[#94A3B8]">
            Customer Support: support@urbanstreet.in (9:00 AM - 9:00 PM IST)
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#09090B] hover:bg-[#27272A] dark:bg-[#F8FAFC] dark:hover:bg-white text-white dark:text-[#09090B] font-mono-numbers text-xs font-bold rounded-lg transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
