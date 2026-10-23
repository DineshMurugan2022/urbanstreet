import React, { useState } from 'react';
import { MessageCircle, X, Send, Ruler, Package, HelpCircle, ArrowRight } from 'lucide-react';
import { StoreSettings, Order } from '../types';

interface WhatsAppChatButtonProps {
  storeSettings: StoreSettings;
  activeOrder?: Order | null;
}

export const WhatsAppChatButton: React.FC<WhatsAppChatButtonProps> = ({
  storeSettings,
  activeOrder
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<'sizing' | 'order' | 'custom'>('sizing');
  const [customMessage, setCustomMessage] = useState('');

  // Clean phone number for WhatsApp wa.me API (digits only)
  const rawPhone = storeSettings.contactPhone || '+91 9840123456';
  const cleanPhone = rawPhone.replace(/\D/g, '');

  // Pre-filled template messages
  const defaultMessages = {
    sizing: "Vanakkam URBAN STREET! I need sizing advice for your boxy oversized streetwear collection. My chest size is ... inches. Which size do you recommend for a true relaxed drape?",
    order: activeOrder 
      ? `Vanakkam! Checking the real-time fulfillment status for my Order #${activeOrder.orderNumber} placed for ${activeOrder.shippingAddress.city}, Tamil Nadu.`
      : "Vanakkam! I'd like to check the tracking status of my recent URBAN STREET order. My mobile number is ...",
    custom: customMessage || "Vanakkam URBAN STREET team! I have a question regarding your heavyweight cotton apparel."
  };

  const currentMessage = selectedTopic === 'custom' 
    ? (customMessage || defaultMessages.custom) 
    : defaultMessages[selectedTopic];

  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(currentMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end select-none">
      
      {/* Expanded Concierge Popover */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-3rem)] sm:w-88 bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-[#09090B] dark:bg-[#0E0F14] text-white flex items-center justify-between border-b border-black/20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-xs">
                <MessageCircle className="w-4 h-4 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-display text-sm font-bold tracking-wide">
                    URBAN STREET ATELIER
                  </h4>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                </div>
                <p className="text-[10px] font-mono-numbers text-slate-400">
                  Direct WhatsApp Support · Tamil & English
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close chat concierge"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 text-xs font-mono-numbers">
            
            <span className="text-[10px] uppercase text-[#71717A] dark:text-[#94A3B8] tracking-wider block">
              What can we help you with?
            </span>

            {/* Quick Topic Chips */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedTopic('sizing')}
                className={`p-2 rounded-lg border text-left flex items-center gap-2 transition-colors ${
                  selectedTopic === 'sizing'
                    ? 'bg-[#2563EB] text-white border-[#2563EB]'
                    : 'bg-[#F4F4F5] dark:bg-[#181A22] text-[#09090B] dark:text-[#F8FAFC] border-[#E4E4E7] dark:border-[#22242F]'
                }`}
              >
                <Ruler className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Sizing Advice</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTopic('order')}
                className={`p-2 rounded-lg border text-left flex items-center gap-2 transition-colors ${
                  selectedTopic === 'order'
                    ? 'bg-[#2563EB] text-white border-[#2563EB]'
                    : 'bg-[#F4F4F5] dark:bg-[#181A22] text-[#09090B] dark:text-[#F8FAFC] border-[#E4E4E7] dark:border-[#22242F]'
                }`}
              >
                <Package className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Order Status</span>
              </button>
            </div>

            {/* Pre-filled Message Preview / Custom Input */}
            <div>
              <label className="block text-[10px] uppercase text-[#71717A] dark:text-[#94A3B8] mb-1">
                Message Preview
              </label>
              {selectedTopic === 'custom' ? (
                <textarea
                  rows={3}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Type your question..."
                  className="w-full p-2.5 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-xs font-mono-numbers text-[#09090B] dark:text-[#F8FAFC] focus:outline-none focus:border-[#25D366]"
                />
              ) : (
                <div className="p-2.5 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-[11px] text-[#09090B] dark:text-[#F8FAFC] leading-relaxed relative">
                  <p>{currentMessage}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomMessage(currentMessage);
                      setSelectedTopic('custom');
                    }}
                    className="text-[10px] text-[#2563EB] dark:text-[#3B82F6] underline mt-1.5 block hover:opacity-80 font-semibold"
                  >
                    Edit message text
                  </button>
                </div>
              )}
            </div>

            {/* Send Link Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-mono-numbers text-xs tracking-wider uppercase font-bold rounded-lg flex items-center justify-center gap-2 shadow-md transition-transform active:scale-[0.98]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Open in WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-70" />
            </a>

            <div className="text-[10px] text-[#71717A] dark:text-[#94A3B8] text-center pt-1">
              Store Support: <span className="font-semibold">{rawPhone}</span> (Tiruppur Hub)
            </div>

          </div>

        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 bg-[#09090B] hover:bg-[#27272A] dark:bg-[#181A22] dark:hover:bg-[#22242F] text-white border border-[#E4E4E7] dark:border-[#22242F] rounded-full shadow-2xl transition-all duration-200 hover:scale-105 group"
        aria-label="Chat on WhatsApp with Urban Street"
        title="Chat on WhatsApp for sizing or order help"
      >
        <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 group-hover:rotate-12 transition-transform">
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
        </div>
        
        <span className="font-mono-numbers text-xs font-bold tracking-wider uppercase">
          WhatsApp Concierge
        </span>

        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
      </button>

    </div>
  );
};
