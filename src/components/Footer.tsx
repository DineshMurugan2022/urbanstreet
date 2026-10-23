import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ShieldCheck, Truck, RefreshCw, Mail, ArrowUp, ArrowRight, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenTracking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenTracking
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const trustItems = [
    {
      icon: <Truck className="w-4 h-4 text-[#1765F5]" />,
      title: 'Tamil Nadu Express',
      desc: '24-48 hr courier dispatch across Chennai, Coimbatore, Tiruppur & Madurai.'
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-[#1765F5]" />,
      title: '400 GSM Combed Cotton',
      desc: 'Heavyweight French Terry spun in Tiruppur textile mills with zero polyester.'
    },
    {
      icon: <RefreshCw className="w-4 h-4 text-[#1765F5]" />,
      title: '7-Day Free Exchange',
      desc: 'Hassle-free doorstep sizing replacement with zero paperwork.'
    },
    {
      icon: <MapPin className="w-4 h-4 text-[#1765F5]" />,
      title: 'Doorstep COD & UPI',
      desc: 'Pay cash on delivery or scan UPI QR directly upon arrival.'
    }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0B0B0D] text-[#F5F2EA] border-t border-[#2A2C35] pt-16 pb-12 transition-colors duration-200">
      
      {/* Brand Trust Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#2A2C35]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-mono-numbers">
          {trustItems.map((item, i) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="flex items-start gap-3.5"
            >
              <div className="p-2.5 rounded-lg bg-[#191A1D] border border-[#2A2C35] shrink-0">
                {item.icon}
              </div>
              <div>
                <strong className="text-sm font-bold text-white block">{item.title}</strong>
                <p className="text-[#92949A] text-[11px] mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand & Statement Column */}
          <div className="md:col-span-4 space-y-4 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#F5F2EA] text-[#0B0B0D] flex items-center justify-center font-headline font-black text-lg">
                UB
              </div>
              <span className="font-headline text-3xl font-extrabold tracking-tight text-white">
                URBAN STREET
              </span>
            </div>

            <p className="text-base text-white font-headline tracking-wide uppercase">
              Everyday essentials. Unapologetic streetwear.
            </p>

            <p className="text-xs text-[#92949A] leading-relaxed font-body max-w-sm">
              Constructed from long-staple Indian combed cotton and dense French Terry. Tailored for unrestricted movement and contemporary subcontinental street culture.
            </p>

            <div className="pt-2 text-xs font-mono-numbers text-[#92949A] space-y-1">
              <p>Chennai Flagship: Anna Nagar, Chennai — 600040</p>
              <p>Tiruppur Atelier: Textile Corridor, Tiruppur — 641601</p>
              <p className="text-[#1765F5]">support@urbanstreet.in · +91 9840123456</p>
            </div>
          </div>

          {/* Shopping Links */}
          <div className="md:col-span-2 space-y-3 text-xs font-mono-numbers">
            <span className="text-[11px] uppercase tracking-wider text-[#92949A] font-bold block">
              Shopping
            </span>
            <ul className="space-y-2 text-[#C8C6BF]">
              <li>
                <button type="button" onClick={() => onSelectCategory('All')} className="hover:text-white transition-colors">
                  Shop All
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onSelectCategory('Hoodies and sweatshirts')} className="hover:text-white transition-colors">
                  Hoodies & Sweats
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onSelectCategory('Oversized T-shirts')} className="hover:text-white transition-colors">
                  Oversized Tees
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onSelectCategory('Cargo pants')} className="hover:text-white transition-colors">
                  Tactical Cargos
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onSelectCategory('Graphic T-shirts')} className="hover:text-white transition-colors">
                  New Arrivals
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="md:col-span-2 space-y-3 text-xs font-mono-numbers">
            <span className="text-[11px] uppercase tracking-wider text-[#92949A] font-bold block">
              Customer Care
            </span>
            <ul className="space-y-2 text-[#C8C6BF]">
              <li>
                <button type="button" onClick={onOpenTracking} className="text-[#1765F5] hover:underline font-bold">
                  Track Order
                </button>
              </li>
              <li>
                <a href="#story-section" className="hover:text-white transition-colors block">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#story-section" className="hover:text-white transition-colors block">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#story-section" className="hover:text-white transition-colors block">
                  Size Guide & Care
                </a>
              </li>
              <li>
                <a href="mailto:support@urbanstreet.in" className="hover:text-white transition-colors block">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Newsletter Signup */}
          <div className="md:col-span-4 space-y-3 text-xs font-mono-numbers">
            <span className="text-[11px] uppercase tracking-wider text-[#92949A] font-bold block">
              Connect with Atelier
            </span>
            <p className="text-[11px] text-[#92949A] font-body leading-relaxed">
              Get secret access to private drops, early lookbook releases, and exclusive member discounts.
            </p>

            <form onSubmit={handleSubscribe} className="pt-1 flex gap-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-3.5 py-2.5 bg-[#191A1D] border border-[#2A2C35] rounded-md text-xs font-mono-numbers text-white placeholder-[#7A7C82] focus:outline-none focus:border-[#1765F5]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#1765F5] hover:bg-[#0E53D6] text-white font-mono-numbers text-xs uppercase font-bold rounded-md flex items-center justify-center shrink-0 transition-colors"
              >
                {subscribed ? <CheckCircle2 className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
            {subscribed && (
              <p className="text-[10px] text-emerald-400 font-mono-numbers">
                ✓ Welcome to the Urban Street Atelier family. Code VANAKKAM sent!
              </p>
            )}

            <div className="pt-2 flex items-center gap-4 text-[#92949A]">
              <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
              <span>·</span>
              <span className="hover:text-white cursor-pointer transition-colors">WhatsApp Community</span>
              <span>·</span>
              <span className="hover:text-white cursor-pointer transition-colors">Spotify Playlist</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Sub-Footer with Payment Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#2A2C35] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-numbers text-[#7A7C82]">
        <p>© 2026 URBAN STREET. All Rights Reserved. Made for Indian Streets.</p>
        
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-white/60">UPI (GPay / PhonePe)</span>
          <span>·</span>
          <span className="text-white/60">Visa / Mastercard</span>
          <span>·</span>
          <span className="text-white/60">NetBanking</span>
          <span>·</span>
          <span className="text-white/60">Doorstep COD</span>
          
          <button 
            type="button"
            onClick={scrollToTop} 
            className="p-2 rounded bg-[#191A1D] hover:bg-[#2A2C35] text-white transition-colors ml-2"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

    </footer>
  );
};
