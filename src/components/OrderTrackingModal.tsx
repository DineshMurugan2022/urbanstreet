import React, { useState, useEffect } from 'react';
import { Order, FulfillmentStatus } from '../types';
import { 
  X, 
  CheckCircle2, 
  Truck, 
  Package, 
  MapPin, 
  Clock, 
  Printer, 
  Share2, 
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Search
} from 'lucide-react';

interface OrderTrackingModalProps {
  isOpen?: boolean;
  order: Order | null;
  onClose: () => void;
  onAdvanceFulfillment?: (orderId: string, nextStatus: FulfillmentStatus) => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen = true,
  order,
  onClose,
  onAdvanceFulfillment
}) => {
  const [simulating, setSimulating] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen || !order) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, order, onClose]);

  if (!isOpen || !order) return null;

  // Status mapping
  const steps: { key: FulfillmentStatus; label: string; desc: string }[] = [
    { key: 'confirmed', label: 'Order Confirmed', desc: 'Payment verified & order queued at Tiruppur' },
    { key: 'processing', label: 'Crafting & Inspection', desc: 'Atelier fabric audit & seam quality check' },
    { key: 'dispatched', label: 'Dispatched via Express', desc: `In transit via ${order.courierName}` },
    { key: 'delivered', label: 'Out for Delivery / Delivered', desc: `Handover in ${order.shippingAddress.city}` }
  ];

  const currentStepIndex = steps.findIndex(s => s.key === order.fulfillmentStatus);
  const activeIndex = currentStepIndex >= 0 ? currentStepIndex : 0;

  const handleSimulateNextStep = () => {
    if (activeIndex >= steps.length - 1) return;
    setSimulating(true);
    const nextStatus = steps[activeIndex + 1].key;

    setTimeout(() => {
      onAdvanceFulfillment?.(order.id, nextStatus);
      setSimulating(false);
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/75 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Tracking for Order ${order.orderNumber}`}
    >
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-2xl shadow-2xl overflow-hidden my-6 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-[#E4E4E7] dark:border-[#22242F] flex items-center justify-between bg-[#FAFAFA] dark:bg-[#0E0F14]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
              <span className="text-xs font-mono-numbers text-[#2563EB] dark:text-[#3B82F6] font-bold uppercase tracking-wider">
                Live Shipment Tracking
              </span>
            </div>
            <h3 className="font-display text-xl font-bold text-[#09090B] dark:text-[#F8FAFC] tracking-wide mt-0.5">
              ORDER #{order.orderNumber}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-[#71717A] hover:text-[#09090B] dark:text-[#94A3B8] dark:hover:text-[#F8FAFC] rounded-lg hover:bg-[#F4F4F5] dark:hover:bg-[#181A22] transition-colors"
              title="Print Order Receipt"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#71717A] hover:text-[#09090B] dark:text-[#94A3B8] dark:hover:text-[#F8FAFC] rounded-full hover:bg-[#F4F4F5] dark:hover:bg-[#181A22] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[78vh] overflow-y-auto">
          
          {/* Quick Status Summary Strip */}
          <div className="p-4 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono-numbers text-[#71717A] dark:text-[#94A3B8] uppercase block">
                Estimated Delivery
              </span>
              <strong className="text-sm font-mono-numbers text-[#09090B] dark:text-[#F8FAFC] block mt-0.5">
                {order.estimatedDeliveryDate || 'Tomorrow by 4:00 PM (Tamil Nadu Express)'}
              </strong>
              <span className="text-[11px] font-mono-numbers text-[#2563EB] dark:text-[#3B82F6]">
                AWB Tracking: {order.trackingNumber} ({order.courierName})
              </span>
            </div>

            {/* Interactive Status Simulation Button */}
            {onAdvanceFulfillment && activeIndex < steps.length - 1 && (
              <button
                type="button"
                onClick={handleSimulateNextStep}
                disabled={simulating}
                className="px-3 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-mono-numbers font-semibold flex items-center gap-1.5 transition-all shadow-xs self-start sm:self-center"
                title="Simulate courier scanning package at next logistics checkpoint"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${simulating ? 'animate-spin' : ''}`} />
                <span>Simulate Next Step</span>
              </button>
            )}
          </div>

          {/* Stepper Progress Bar */}
          <div className="relative pt-2">
            <div className="grid grid-cols-4 gap-2 text-center">
              {steps.map((st, i) => {
                const isCompleted = i <= activeIndex;
                const isCurrent = i === activeIndex;

                return (
                  <div key={st.key} className="flex flex-col items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-[#2563EB] text-white ring-4 ring-[#2563EB]/25'
                          : isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#E4E4E7] dark:bg-[#22242F] text-[#71717A] dark:text-[#94A3B8]'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                    </div>
                    <span className={`text-[11px] font-mono-numbers mt-2 font-semibold ${
                      isCompleted ? 'text-[#09090B] dark:text-[#F8FAFC]' : 'text-[#71717A] dark:text-[#94A3B8]'
                    }`}>
                      {st.label}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {/* Connecting Line */}
            <div className="absolute top-6 left-[12%] right-[12%] h-0.5 bg-[#E4E4E7] dark:bg-[#22242F] -z-10">
              <div 
                className="h-full bg-emerald-600 transition-all duration-500"
                style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Timeline Milestones */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-[#09090B] dark:text-[#F8FAFC] tracking-wider uppercase">
              Carrier Manifest Timeline
            </h4>
            <div className="space-y-2 border-l-2 border-[#2563EB] ml-3 pl-4">
              {order.trackingTimeline.map((item, index) => (
                <div key={index} className="relative pb-3 last:pb-0">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#2563EB] ring-4 ring-white dark:ring-[#121318]" />
                  <div className="flex items-center justify-between gap-2 text-xs font-mono-numbers">
                    <strong className="text-[#09090B] dark:text-[#F8FAFC] font-semibold">{item.title}</strong>
                    <span className="text-[10px] text-[#71717A] dark:text-[#94A3B8]">{item.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-[#71717A] dark:text-[#94A3B8] font-mono-numbers mt-0.5">
                    {item.location} · {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Details & Delivery Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono-numbers">
            
            {/* Address */}
            <div className="p-3.5 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl space-y-1">
              <span className="text-[#71717A] dark:text-[#94A3B8] uppercase text-[10px] block">
                Shipping Destination
              </span>
              <strong className="text-[#09090B] dark:text-[#F8FAFC] block font-semibold">
                {order.shippingAddress.fullName}
              </strong>
              <p className="text-[#71717A] dark:text-[#94A3B8] text-[11px]">
                {order.shippingAddress.addressLine}, {order.shippingAddress.landmark && `${order.shippingAddress.landmark}, `}
                {order.shippingAddress.city}, TN - {order.shippingAddress.pinCode}
              </p>
              <p className="text-[#71717A] dark:text-[#94A3B8] text-[11px]">
                Phone: {order.shippingAddress.mobile}
              </p>
            </div>

            {/* Financial Summary */}
            <div className="p-3.5 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl space-y-1">
              <span className="text-[#71717A] dark:text-[#94A3B8] uppercase text-[10px] block">
                Payment Summary
              </span>
              <div className="flex justify-between text-[11px] text-[#71717A] dark:text-[#94A3B8]">
                <span>Payment Mode:</span>
                <span className="text-[#09090B] dark:text-[#F8FAFC] uppercase font-semibold">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-[11px] text-[#71717A] dark:text-[#94A3B8]">
                <span>Items:</span>
                <span className="text-[#09090B] dark:text-[#F8FAFC] font-semibold">{order.items.length} garments</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#09090B] dark:text-[#F8FAFC] pt-1 border-t border-[#E4E4E7] dark:border-[#22242F]">
                <span>Total Paid:</span>
                <span>₹{order.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

          </div>

          {/* Ordered Garments List */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono-numbers uppercase text-[#71717A] dark:text-[#94A3B8] tracking-wider block">
              Garments in Shipment
            </span>
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-2.5 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg"
              >
                <div className="w-10 h-12 rounded overflow-hidden bg-black/10 shrink-0">
                  <img
                    src={item.product.primaryImage}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 text-xs font-mono-numbers">
                  <h5 className="font-display text-sm font-bold text-[#09090B] dark:text-[#F8FAFC] truncate">
                    {item.product.name}
                  </h5>
                  <p className="text-[11px] text-[#71717A] dark:text-[#94A3B8]">
                    {item.selectedColor.name} · Size {item.selectedSize} · Qty: {item.quantity}
                  </p>
                </div>
                <span className="text-xs font-mono-numbers font-bold text-[#09090B] dark:text-[#F8FAFC]">
                  ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FAFAFA] dark:bg-[#0E0F14] border-t border-[#E4E4E7] dark:border-[#22242F] flex items-center justify-between">
          <span className="text-xs font-mono-numbers text-[#71717A] dark:text-[#94A3B8]">
            Direct delivery guarantee across all Tamil Nadu postal zones
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#09090B] hover:bg-[#27272A] dark:bg-[#F8FAFC] dark:hover:bg-white text-white dark:text-[#09090B] font-mono-numbers text-xs font-bold rounded-lg transition-colors"
          >
            Close Tracker
          </button>
        </div>

      </div>
    </div>
  );
};
