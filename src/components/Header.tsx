import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Truck, 
  Menu, 
  X,
  User, 
  Heart,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Sun,
  Moon
} from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenTracking: () => void;
  onOpenAccount: () => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenTracking,
  onOpenAccount,
  isAdmin,
  onToggleAdmin,
  activeTab,
  onSelectTab,
  isDarkMode,
  onToggleDarkMode
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'shop', label: 'Shop', hasDropdown: true },
    { id: 'drops', label: 'New Drops' },
    { id: 'lookbook', label: 'Lookbook' },
    { id: 'story', label: 'Atelier Heritage' },
    { id: 'tracking', label: 'Track Order', action: onOpenTracking }
  ];

  const handleLinkClick = (link: typeof navLinks[0]) => {
    if (link.action) {
      link.action();
    } else {
      onSelectTab(link.id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-colors duration-200">
      {/* 1. Top Announcement Bar */}
      <div className="w-full bg-[#0B0B0D] text-[#F5F2EA] text-[11px] font-mono-numbers py-2 px-4 border-b border-black/40">
        <div className="max-w-7xl mx-auto flex items-center justify-center text-center gap-3 md:gap-6 flex-wrap tracking-wide">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#1765F5] shrink-0" />
            <span className="font-bold text-white tracking-wider">TAMIL NADU EXPRESS:</span>
            <span className="text-[#C8C6BF]">24-48h Delivery to Chennai, Coimbatore, Tiruppur & Madurai</span>
          </div>

          <span className="hidden md:inline text-neutral-600 font-light">|</span>

          <div className="hidden sm:flex items-center gap-1">
            <span className="text-[#C8C6BF]">Welcome Offer:</span>
            <span className="text-[#1765F5] font-bold">Flat 10% OFF</span>
            <span className="text-[#C8C6BF]">on your first order</span>
          </div>

          <span className="hidden md:inline text-neutral-600 font-light">|</span>

          <div className="hidden lg:inline text-[#C8C6BF] font-medium tracking-wider">
            Premium Indian Streetwear
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar (Warm Ivory) */}
      <div className="w-full bg-[#F5F2EA] dark:bg-[#0E0F12] border-b border-[#D9D6CE] dark:border-[#262830] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Left: Brand Monogram & Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              type="button"
              onClick={() => onSelectTab('shop')} 
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-8 h-8 rounded bg-[#0B0B0D] dark:bg-[#F5F2EA] flex items-center justify-center text-white dark:text-[#0B0B0D] font-headline font-black text-lg tracking-tighter shadow-sm">
                UB
              </div>
              <span className="font-headline text-3xl font-extrabold tracking-tight text-[#0B0B0D] dark:text-[#F5F2EA] transition-colors group-hover:text-[#1765F5]">
                URBAN STREET
              </span>
            </button>
          </div>

          {/* Center: Clean Streetwear Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-body font-semibold text-[#0B0B0D]/80 dark:text-[#F5F2EA]/85">
            {navLinks.map((link) => (
              <div key={link.id} className="relative group">
                <button
                  type="button"
                  onClick={() => handleLinkClick(link)}
                  className={`inline-flex items-center gap-1 py-2 hover:text-[#1765F5] transition-colors ${
                    activeTab === link.id ? 'text-[#1765F5] font-bold' : ''
                  }`}
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />}
                </button>
              </div>
            ))}
          </nav>

          {/* Right: Search, Account, Bag, Admin Toggle */}
          <div className="flex items-center gap-3.5 sm:gap-4 shrink-0">
            
            {/* Search Pill */}
            <div 
              onClick={onOpenSearch}
              className="hidden sm:flex items-center bg-[#E8E4DA] dark:bg-[#1A1B22] border border-[#D9D6CE] dark:border-[#2D303C] rounded-full px-3.5 py-2 w-56 md:w-64 cursor-pointer hover:border-[#1765F5] transition-colors group"
            >
              <Search className="w-4 h-4 text-[#7A7C82] group-hover:text-[#1765F5] mr-2.5 shrink-0" />
              <span className="text-xs text-[#7A7C82] dark:text-[#92949A] font-body truncate">
                Search for hoodies, tees, cargos...
              </span>
            </div>

            {/* Mobile Search Icon */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="sm:hidden p-2 text-[#0B0B0D] dark:text-[#F5F2EA] hover:text-[#1765F5]"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Vertical Divider */}
            <div className="hidden sm:block h-6 w-px bg-[#D9D6CE] dark:bg-[#2D303C]" />

            {/* Wishlist Icon */}
            <button
              type="button"
              onClick={onOpenWishlist}
              className="relative p-2 text-[#0B0B0D] dark:text-[#F5F2EA] hover:text-[#1765F5] transition-colors"
              aria-label="Wishlist"
              title="Saved items"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'text-[#FF4800] fill-current' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#FF4800] text-white text-[9px] font-mono-numbers font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Account Icon */}
            <button
              type="button"
              onClick={onOpenAccount}
              className="p-2 text-[#0B0B0D] dark:text-[#F5F2EA] hover:text-[#1765F5] transition-colors"
              aria-label="Customer Account"
              title="Account & Orders"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Shopping Bag Icon with Blue Counter Badge */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative p-2 text-[#0B0B0D] dark:text-[#F5F2EA] hover:text-[#1765F5] transition-colors"
              aria-label="Shopping Bag"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-[#1765F5] text-white text-[10px] font-mono-numbers font-bold flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            </button>

            {/* Admin Switcher */}
            <button
              type="button"
              onClick={onToggleAdmin}
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono-numbers rounded-md transition-colors border ${
                isAdmin 
                  ? 'bg-[#1765F5] text-white border-[#1765F5]' 
                  : 'bg-[#E8E4DA] dark:bg-[#1A1B22] text-[#0B0B0D] dark:text-[#F5F2EA] border-[#D9D6CE] dark:border-[#2D303C] hover:border-[#1765F5]'
              }`}
              title="Toggle Admin Inventory"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>{isAdmin ? 'Admin View' : 'Admin'}</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="p-2 text-[#7A7C82] hover:text-[#0B0B0D] dark:text-[#92949A] dark:hover:text-[#F5F2EA]"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#0B0B0D]" />}
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#0B0B0D] dark:text-[#F5F2EA]"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F5F2EA] dark:bg-[#0E0F12] border-b border-[#D9D6CE] dark:border-[#262830] px-4 py-4 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleLinkClick(link)}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-[#0B0B0D] dark:text-[#F5F2EA] hover:bg-[#E8E4DA] dark:hover:bg-[#1A1B22] flex items-center justify-between"
            >
              <span>{link.label}</span>
              <ChevronRight className="w-4 h-4 text-[#7A7C82]" />
            </button>
          ))}
          <div className="pt-2 border-t border-[#D9D6CE] dark:border-[#262830]">
            <button
              type="button"
              onClick={() => {
                onToggleAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 text-left text-xs font-mono-numbers text-[#1765F5] flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isAdmin ? 'Exit Admin Dashboard' : 'Open Admin Panel'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
