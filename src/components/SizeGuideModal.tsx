import React, { useState, useEffect } from 'react';
import { X, Ruler, CheckCircle2, Info, ArrowRight, UserCheck, Sparkles } from 'lucide-react';
import { Category } from '../types';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: Category;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  defaultCategory
}) => {
  // Determine initial tab based on product category
  const getInitialTab = (): 'tops' | 'bottoms' | 'accessories' => {
    if (defaultCategory === 'Cargo pants' || defaultCategory === 'Jeans and denim') return 'bottoms';
    if (defaultCategory === 'Caps and accessories') return 'accessories';
    return 'tops';
  };

  const [activeTab, setActiveTab] = useState<'tops' | 'bottoms' | 'accessories'>(getInitialTab());
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

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

  // Measurement Tables
  const topsData = [
    { size: 'XS', chestIn: '40"', chestCm: '101 cm', lengthIn: '26.5"', lengthCm: '67 cm', shoulderIn: '20.5"', shoulderCm: '52 cm', sleeveIn: '23.0"', sleeveCm: '58 cm' },
    { size: 'S', chestIn: '42"', chestCm: '106 cm', lengthIn: '27.5"', lengthCm: '70 cm', shoulderIn: '21.5"', shoulderCm: '54 cm', sleeveIn: '23.5"', sleeveCm: '60 cm' },
    { size: 'M', chestIn: '45"', chestCm: '114 cm', lengthIn: '28.5"', lengthCm: '72 cm', shoulderIn: '22.5"', shoulderCm: '57 cm', sleeveIn: '24.0"', sleeveCm: '61 cm' },
    { size: 'L', chestIn: '48"', chestCm: '122 cm', lengthIn: '29.5"', lengthCm: '75 cm', shoulderIn: '23.5"', shoulderCm: '60 cm', sleeveIn: '24.5"', sleeveCm: '62 cm' },
    { size: 'XL', chestIn: '51"', chestCm: '130 cm', lengthIn: '30.5"', lengthCm: '77 cm', shoulderIn: '24.5"', shoulderCm: '62 cm', sleeveIn: '25.0"', sleeveCm: '63 cm' },
    { size: 'XXL', chestIn: '54"', chestCm: '137 cm', lengthIn: '31.5"', lengthCm: '80 cm', shoulderIn: '25.5"', shoulderCm: '65 cm', sleeveIn: '25.5"', sleeveCm: '65 cm' }
  ];

  const bottomsData = [
    { size: 'S (30)', waistIn: '30" - 31"', waistCm: '76 - 79 cm', hipIn: '42"', hipCm: '106 cm', inseamIn: '30.0"', inseamCm: '76 cm', outseamIn: '40.5"', outseamCm: '103 cm', legOpeningIn: '16.0"', legOpeningCm: '40 cm' },
    { size: 'M (32)', waistIn: '32" - 33"', waistCm: '81 - 84 cm', hipIn: '44"', hipCm: '112 cm', inseamIn: '30.5"', inseamCm: '77 cm', outseamIn: '41.5"', outseamCm: '105 cm', legOpeningIn: '16.5"', legOpeningCm: '42 cm' },
    { size: 'L (34)', waistIn: '34" - 35"', waistCm: '86 - 89 cm', hipIn: '46"', hipCm: '117 cm', inseamIn: '31.0"', inseamCm: '79 cm', outseamIn: '42.0"', outseamCm: '107 cm', legOpeningIn: '17.0"', legOpeningCm: '43 cm' },
    { size: 'XL (36)', waistIn: '36" - 37"', waistCm: '91 - 94 cm', hipIn: '48"', hipCm: '122 cm', inseamIn: '31.5"', inseamCm: '80 cm', outseamIn: '42.5"', outseamCm: '108 cm', legOpeningIn: '17.5"', legOpeningCm: '44 cm' },
    { size: 'XXL (38)', waistIn: '38" - 40"', waistCm: '96 - 101 cm', hipIn: '50"', hipCm: '127 cm', inseamIn: '32.0"', inseamCm: '81 cm', outseamIn: '43.0"', outseamCm: '109 cm', legOpeningIn: '18.0"', legOpeningCm: '46 cm' }
  ];

  const accessoriesData = [
    { item: '6-Panel Dad Cap', size: 'One Size (Adjustable)', metricIn: 'Circumference: 21.5" - 24.0" · Crown: 4.5" · Visor: 2.8"', metricCm: 'Circumference: 55 - 61 cm · Crown: 11.5 cm · Visor: 7 cm' },
    { item: 'Utility Crossbody Bag', size: 'Standard (Vol 4.2L)', metricIn: 'Width: 8.5" · Height: 6.5" · Depth: 2.5" · Strap: 32" - 54"', metricCm: 'Width: 21.5 cm · Height: 16.5 cm · Depth: 6.5 cm · Strap: 81 - 137 cm' },
    { item: 'Heavy Webbing Street Belt', size: 'Adjustable Length', metricIn: 'Length: 50" (Trim-to-fit) · Width: 1.5"', metricCm: 'Length: 127 cm (Trim-to-fit) · Width: 3.8 cm' }
  ];

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Size Guide Matrix"
    >
      {/* Modal Surface */}
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-2xl shadow-2xl overflow-hidden my-6 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-5 border-b border-[#E4E4E7] dark:border-[#22242F] bg-[#FAFAFA] dark:bg-[#0E0F14] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#2563EB] text-white rounded-lg shadow-xs">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-bold tracking-tight text-[#09090B] dark:text-[#F8FAFC]">
                  URBAN STREET ATELIER SIZE MATRIX
                </h3>
                <span className="px-2 py-0.5 text-[9px] font-mono-numbers bg-[#2563EB] text-white rounded font-bold uppercase">
                  ACCURATE FIT
                </span>
              </div>
              <p className="text-[11px] font-mono-numbers text-[#71717A] dark:text-[#94A3B8]">
                Custom engineered garment specifications tailored for Indian measurements
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#71717A] hover:text-[#09090B] dark:text-[#94A3B8] dark:hover:text-[#F8FAFC] rounded-full hover:bg-[#F4F4F5] dark:hover:bg-[#181A22] transition-colors"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs & Unit Switcher */}
        <div className="px-6 pt-4 pb-2 border-b border-[#E4E4E7] dark:border-[#22242F] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F4F4F5] dark:bg-[#181A22] rounded-lg border border-[#E4E4E7] dark:border-[#22242F] text-xs font-mono-numbers">
            {(['tops', 'bottoms', 'accessories'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-md font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === tab
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'text-[#71717A] dark:text-[#94A3B8] hover:text-[#09090B] dark:hover:text-[#F8FAFC]'
                }`}
              >
                {tab === 'tops' ? 'Tops & Hoodies' : tab === 'bottoms' ? 'Pants & Denims' : 'Accessories'}
              </button>
            ))}
          </div>

          {/* Unit Toggle: INCHES vs CM */}
          <div className="flex items-center gap-2 text-xs font-mono-numbers">
            <span className="text-[#71717A] dark:text-[#94A3B8] uppercase text-[10px]">Unit:</span>
            <div className="flex items-center p-0.5 bg-[#F4F4F5] dark:bg-[#181A22] rounded-lg border border-[#E4E4E7] dark:border-[#22242F]">
              <button
                onClick={() => setUnit('in')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                  unit === 'in'
                    ? 'bg-[#09090B] text-white dark:bg-white dark:text-[#09090B]'
                    : 'text-[#71717A] dark:text-[#94A3B8]'
                }`}
              >
                INCHES (")
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                  unit === 'cm'
                    ? 'bg-[#09090B] text-white dark:bg-white dark:text-[#09090B]'
                    : 'text-[#71717A] dark:text-[#94A3B8]'
                }`}
              >
                CM
              </button>
            </div>
          </div>

        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* TAB 1: TOPS & HOODIES */}
          {activeTab === 'tops' && (
            <div className="space-y-4">
              <div className="overflow-x-auto border border-[#E4E4E7] dark:border-[#22242F] rounded-xl bg-[#F4F4F5] dark:bg-[#181A22]">
                <table className="w-full text-left text-xs font-mono-numbers">
                  <thead className="bg-[#E4E4E7]/60 dark:bg-[#22242F] text-[#71717A] dark:text-[#94A3B8] uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Size Tag</th>
                      <th className="p-3">Chest (Pit-to-Pit x 2)</th>
                      <th className="p-3">Body Length</th>
                      <th className="p-3">Drop Shoulder Width</th>
                      <th className="p-3">Sleeve Length</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4E4E7] dark:divide-[#22242F] text-[#09090B] dark:text-[#F8FAFC]">
                    {topsData.map((row) => (
                      <tr key={row.size} className="hover:bg-white dark:hover:bg-[#121318] transition-colors">
                        <td className="p-3 font-bold text-sm text-[#2563EB] dark:text-[#3B82F6]">{row.size}</td>
                        <td className="p-3 font-semibold">{unit === 'in' ? row.chestIn : row.chestCm}</td>
                        <td className="p-3">{unit === 'in' ? row.lengthIn : row.lengthCm}</td>
                        <td className="p-3">{unit === 'in' ? row.shoulderIn : row.shoulderCm}</td>
                        <td className="p-3">{unit === 'in' ? row.sleeveIn : row.sleeveCm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Fit Note for Tops */}
              <div className="p-3.5 bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl text-xs font-mono-numbers text-[#71717A] dark:text-[#94A3B8] space-y-1">
                <div className="flex items-center gap-1.5 text-[#09090B] dark:text-[#F8FAFC] font-bold">
                  <UserCheck className="w-4 h-4 text-[#2563EB]" />
                  <span>Atelier Fit Advice (French Terry Hoodies & Boxy Tees)</span>
                </div>
                <p className="leading-relaxed">
                  Our silhouettes feature an intentional dropped shoulder and generous chest circumference. 
                  Take your <strong>true regular size</strong> for the signature boxy streetwear drape, or <strong>size down one tag</strong> for a standard tailored fit.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: BOTTOMS & PANTS */}
          {activeTab === 'bottoms' && (
            <div className="space-y-4">
              <div className="overflow-x-auto border border-[#E4E4E7] dark:border-[#22242F] rounded-xl bg-[#F4F4F5] dark:bg-[#181A22]">
                <table className="w-full text-left text-xs font-mono-numbers">
                  <thead className="bg-[#E4E4E7]/60 dark:bg-[#22242F] text-[#71717A] dark:text-[#94A3B8] uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Size (Waist)</th>
                      <th className="p-3">Waist Stretched</th>
                      <th className="p-3">Hip Circumference</th>
                      <th className="p-3">Inseam</th>
                      <th className="p-3">Outseam Total</th>
                      <th className="p-3">Leg Opening</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4E4E7] dark:divide-[#22242F] text-[#09090B] dark:text-[#F8FAFC]">
                    {bottomsData.map((row) => (
                      <tr key={row.size} className="hover:bg-white dark:hover:bg-[#121318] transition-colors">
                        <td className="p-3 font-bold text-sm text-[#2563EB] dark:text-[#3B82F6]">{row.size}</td>
                        <td className="p-3 font-semibold">{unit === 'in' ? row.waistIn : row.waistCm}</td>
                        <td className="p-3">{unit === 'in' ? row.hipIn : row.hipCm}</td>
                        <td className="p-3">{unit === 'in' ? row.inseamIn : row.inseamCm}</td>
                        <td className="p-3">{unit === 'in' ? row.outseamIn : row.outseamCm}</td>
                        <td className="p-3">{unit === 'in' ? row.legOpeningIn : row.legOpeningCm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Fit Note for Bottoms */}
              <div className="p-3.5 bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl text-xs font-mono-numbers text-[#71717A] dark:text-[#94A3B8] space-y-1">
                <div className="flex items-center gap-1.5 text-[#09090B] dark:text-[#F8FAFC] font-bold">
                  <UserCheck className="w-4 h-4 text-[#2563EB]" />
                  <span>Cargo & Denim Sizing Guidance</span>
                </div>
                <p className="leading-relaxed">
                  Cargos include an interior elastic drawcord waist. Carpenter denims sit mid-waist with a relaxed wide leg that breaks cleanly over high-top sneakers.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: ACCESSORIES */}
          {activeTab === 'accessories' && (
            <div className="space-y-4">
              <div className="overflow-x-auto border border-[#E4E4E7] dark:border-[#22242F] rounded-xl bg-[#F4F4F5] dark:bg-[#181A22]">
                <table className="w-full text-left text-xs font-mono-numbers">
                  <thead className="bg-[#E4E4E7]/60 dark:bg-[#22242F] text-[#71717A] dark:text-[#94A3B8] uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Accessory</th>
                      <th className="p-3">Sizing Type</th>
                      <th className="p-3">Detailed Dimensions ({unit.toUpperCase()})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4E4E7] dark:divide-[#22242F] text-[#09090B] dark:text-[#F8FAFC]">
                    {accessoriesData.map((row) => (
                      <tr key={row.item} className="hover:bg-white dark:hover:bg-[#121318] transition-colors">
                        <td className="p-3 font-bold text-sm text-[#2563EB] dark:text-[#3B82F6]">{row.item}</td>
                        <td className="p-3 font-medium">{row.size}</td>
                        <td className="p-3 text-[11px]">{unit === 'in' ? row.metricIn : row.metricCm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* How to Measure Section */}
          <div className="p-4 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl space-y-3 font-mono-numbers text-xs">
            <h4 className="font-display text-sm font-bold text-[#09090B] dark:text-[#F8FAFC] flex items-center gap-1.5 uppercase">
              <Info className="w-4 h-4 text-[#2563EB]" />
              <span>How to Measure Your Best-Fitting Garment</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-[#71717A] dark:text-[#94A3B8]">
              <div className="p-2.5 bg-white dark:bg-[#121318] rounded-lg border border-[#E4E4E7] dark:border-[#22242F]">
                <strong className="text-[#09090B] dark:text-[#F8FAFC] block mb-1">1. Chest (Pit-to-Pit)</strong>
                <span>Lay your favorite tee flat. Measure from underarm seam to underarm seam, then double the number.</span>
              </div>
              <div className="p-2.5 bg-white dark:bg-[#121318] rounded-lg border border-[#E4E4E7] dark:border-[#22242F]">
                <strong className="text-[#09090B] dark:text-[#F8FAFC] block mb-1">2. Body Length</strong>
                <span>Measure from the collar base / highest shoulder seam straight down to the bottom hemline.</span>
              </div>
              <div className="p-2.5 bg-white dark:bg-[#121318] rounded-lg border border-[#E4E4E7] dark:border-[#22242F]">
                <strong className="text-[#09090B] dark:text-[#F8FAFC] block mb-1">3. Waist & Outseam</strong>
                <span>For bottoms, measure across the waistband relaxed, and down outer side seam to the leg cuff.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FAFAFA] dark:bg-[#0E0F14] border-t border-[#E4E4E7] dark:border-[#22242F] flex items-center justify-between">
          <p className="text-[11px] font-mono-numbers text-[#71717A] dark:text-[#94A3B8]">
            Need immediate advice? Ask our Tiruppur atelier stylists on WhatsApp.
          </p>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono-numbers text-xs font-bold rounded-lg transition-colors shrink-0 shadow-xs"
          >
            Got It
          </button>
        </div>

      </div>

    </div>
  );
};
