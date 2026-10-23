/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Product, CartItem, Order, Coupon, Category, StoreSettings, ProductColor, FulfillmentStatus, ProductReview, UserProfile } from './types';
import { INITIAL_PRODUCTS } from './data/mockProducts';
import { INITIAL_REVIEWS } from './data/mockReviews';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { LookbookSlider } from './components/LookbookSlider';
import { AdminDashboard } from './components/AdminDashboard';
import { SearchModal } from './components/SearchModal';
import { NewDropSection } from './components/NewDropSection';
import { CategoryTiles } from './components/CategoryTiles';
import { Footer } from './components/Footer';
import { CustomerAccountModal } from './components/CustomerAccountModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { WhatsAppChatButton } from './components/WhatsAppChatButton';
import { 
  Box, 
  Sparkles, 
  Filter, 
  ArrowUpDown, 
  Flame, 
  Truck, 
  ShieldCheck, 
  RotateCcw,
  SlidersHorizontal,
  ChevronRight,
  MapPin
} from 'lucide-react';

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('urban_street_theme');
    return saved ? saved === 'dark' : false; // default light per brand brief (#F4F1EA)
  });

  // Sync theme with HTML root class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('urban_street_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('urban_street_theme', 'light');
    }
  }, [isDarkMode]);

  // Products state (persisted to localStorage)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('urban_street_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Refresh if older version had Unsplash placeholders
        if (parsed?.[0]?.primaryImage?.includes('images.unsplash.com')) {
          return INITIAL_PRODUCTS;
        }
        return parsed;
      } catch {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('urban_street_products', JSON.stringify(products));
  }, [products]);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('urban_street_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    // Initial sample items (matching the 4 badge count from reference)
    return [
      {
        id: 'cart-init-1',
        productId: 'prod-01',
        product: INITIAL_PRODUCTS[0],
        selectedColor: INITIAL_PRODUCTS[0].colors[0],
        selectedSize: 'L',
        quantity: 2
      },
      {
        id: 'cart-init-2',
        productId: 'prod-02',
        product: INITIAL_PRODUCTS[1],
        selectedColor: INITIAL_PRODUCTS[1].colors[0],
        selectedSize: 'XL',
        quantity: 2
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('urban_street_cart', JSON.stringify(cart));
  }, [cart]);

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('urban_street_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    // Seed initial realistic order for demonstration
    return [
      {
        id: 'ord-init-101',
        orderNumber: 'UB-TN-84192',
        date: '21 Oct 2026',
        customer: {
          name: 'Dinesh Murugan',
          email: '2002dineshmurugan@gmail.com',
          phone: '+91 9840123456'
        },
        shippingAddress: {
          fullName: 'Dinesh Murugan',
          mobile: '+91 9840123456',
          addressLine: 'Plot 42, 4th Cross Street, Anna Nagar',
          landmark: 'Near Roundtana',
          city: 'Chennai',
          district: 'Chennai',
          state: 'Tamil Nadu',
          pinCode: '600040'
        },
        items: [
          {
            id: 'ord-item-1',
            productId: 'prod-01',
            product: INITIAL_PRODUCTS[0],
            selectedColor: INITIAL_PRODUCTS[0].colors[0],
            selectedSize: 'L',
            quantity: 1
          }
        ],
        subtotal: 2499,
        discount: 300,
        couponCode: 'VANAKKAM',
        shippingFee: 0,
        total: 2199,
        paymentMethod: 'upi',
        paymentStatus: 'completed',
        fulfillmentStatus: 'processing',
        trackingNumber: 'SR-TN84192X',
        courierName: 'Shiprocket Express (BlueDart Air)',
        estimatedDeliveryDate: 'Tomorrow by 4 PM (Chennai Express)',
        trackingTimeline: [
          {
            status: 'confirmed',
            title: 'Order Confirmed & UPI Verified',
            location: 'Urban Street Storefront',
            timestamp: 'Yesterday 10:15 AM',
            description: 'Payment verified via UPI (GPay). Order manifest generated.'
          },
          {
            status: 'processing',
            title: 'Tiruppur Atelier Inspection',
            location: 'Tiruppur Textile Corridor, TN',
            timestamp: 'Today 08:30 AM',
            description: 'Heavyweight French Terry seam audit and branded eco-packaging completed.'
          }
        ]
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('urban_street_orders', JSON.stringify(orders));
  }, [orders]);

  // Store Settings
  const [storeSettings, setStoreSettings] = useState<StoreSettings>({
    brandName: 'URBAN STREET',
    tagline: 'Own Your Style. Own the Street.',
    announcementText: 'EXPRESS SHIPPING: 24-48 Hours across Chennai, Coimbatore, Tiruppur & Madurai on all orders',
    freeShippingThreshold: 1499,
    standardShippingFee: 99,
    codFee: 50,
    isCodEnabled: true,
    isUpiEnabled: true,
    isCardEnabled: true,
    contactEmail: 'support@urbanstreet.in',
    contactPhone: '+91 9840123456',
    cityHub: 'Tiruppur & Chennai'
  });

  // UI Flow states
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [activeTab, setActiveTab] = useState<string>('shop');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenProduct = (product: Product | null) => {
    setSelectedProduct(product);
    if (product) {
      window.history.pushState({ productId: product.id }, '', `#product-${product.slug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (window.location.hash.startsWith('#product-')) {
        window.history.pushState(null, '', window.location.pathname);
      }
    }
  };

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#product-')) {
        const slug = hash.replace('#product-', '');
        const matched = products.find(p => p.slug === slug);
        if (matched) {
          setSelectedProduct(matched);
        } else {
          setSelectedProduct(null);
        }
      } else {
        setSelectedProduct(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState();
    return () => window.removeEventListener('popstate', handlePopState);
  }, [products]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [activeOrderForTracking, setActiveOrderForTracking] = useState<Order | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Wishlist state (persisted to localStorage)
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('urban_street_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return ['prod-01', 'prod-04'];
      }
    }
    return ['prod-01', 'prod-04'];
  });

  useEffect(() => {
    localStorage.setItem('urban_street_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleToggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // User Profile / Logged-in Customer State
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    isLoggedIn: true,
    name: 'Dinesh Murugan',
    email: '2002dineshmurugan@gmail.com',
    phone: '+91 9840123456',
    city: 'Chennai, TN',
    memberTier: 'Atelier Gold Streetwear Member'
  });

  // Reviews state (persisted to localStorage)
  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    const saved = localStorage.getItem('urban_street_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_REVIEWS;
      }
    }
    return INITIAL_REVIEWS;
  });

  useEffect(() => {
    localStorage.setItem('urban_street_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Compute live rating and count for any product
  const getProductRatingData = (productId: string, fallbackRating: number, fallbackCount: number) => {
    const prodReviews = reviews.filter(r => r.productId === productId);
    if (prodReviews.length === 0) {
      return { rating: fallbackRating, count: fallbackCount };
    }
    const avg = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
    return { rating: parseFloat(avg.toFixed(1)), count: prodReviews.length };
  };

  const handleAddReview = (newReviewData: Omit<ProductReview, 'id' | 'createdAt'>) => {
    const newReview: ProductReview = {
      ...newReviewData,
      id: `rev-${Date.now()}`,
      createdAt: 'Today'
    };

    setReviews(prev => [newReview, ...prev]);

    // Update products state with new average rating and review count
    setProducts(prevProducts => {
      return prevProducts.map(p => {
        if (p.id !== newReviewData.productId) return p;
        const allProductReviews = [...reviews.filter(r => r.productId === p.id), newReview];
        const avg = allProductReviews.reduce((sum, r) => sum + r.rating, 0) / allProductReviews.length;
        return {
          ...p,
          rating: parseFloat(avg.toFixed(1)),
          reviewsCount: allProductReviews.length
        };
      });
    });

    // Also update selectedProduct if open
    setSelectedProduct(prev => {
      if (!prev || prev.id !== newReviewData.productId) return prev;
      const allProductReviews = [...reviews.filter(r => r.productId === prev.id), newReview];
      const avg = allProductReviews.reduce((sum, r) => sum + r.rating, 0) / allProductReviews.length;
      return {
        ...prev,
        rating: parseFloat(avg.toFixed(1)),
        reviewsCount: allProductReviews.length
      };
    });
  };

  // Cart operations
  const handleAddToCart = (product: Product, color: ProductColor, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL', quantity: number) => {
    const itemId = `${product.id}-${color.name}-${size}`;
    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, {
          id: itemId,
          productId: product.id,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity
        }];
      }
    });
  };

  const handleBuyNow = (product: Product, color: ProductColor, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL', quantity: number) => {
    handleAddToCart(product, color, size, quantity);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const handleRemoveItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Order created callback
  const handleOrderCreated = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    setActiveOrderForTracking(order);
    setIsTrackingOpen(true);

    // Deduct stock from products
    setProducts(prev => {
      return prev.map(p => {
        const orderItemsForProduct = order.items.filter(it => it.productId === p.id);
        if (orderItemsForProduct.length === 0) return p;

        const updatedSizes = p.sizes.map(s => {
          const matchedItem = orderItemsForProduct.find(it => it.selectedSize === s.size);
          if (matchedItem) {
            return { ...s, stock: Math.max(0, s.stock - matchedItem.quantity) };
          }
          return s;
        });

        return { ...p, sizes: updatedSizes };
      });
    });

    // Clear cart after checkout
    setCart([]);
    setAppliedCoupon(null);
  };

  // Stock mutation (Admin)
  const handleUpdateStock = (productId: string, size: string, delta: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id !== productId) return p;
      return {
        ...p,
        sizes: p.sizes.map(s => {
          if (s.size !== size) return s;
          return { ...s, stock: Math.max(0, s.stock + delta) };
        })
      };
    }));
  };

  // Order status update (Admin or interactive tracker simulator)
  const handleUpdateOrderStatus = (orderId: string, status: FulfillmentStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      
      const newTimeline = [...o.trackingTimeline];
      const titles: Record<FulfillmentStatus, string> = {
        confirmed: 'Order Confirmed & Payment Verified',
        processing: 'Quality Inspected at Tiruppur Atelier',
        dispatched: `Dispatched with ${o.courierName}`,
        delivered: `Delivered to Customer in ${o.shippingAddress.city}`,
        cancelled: 'Order Cancelled'
      };

      newTimeline.push({
        status,
        title: titles[status],
        location: status === 'dispatched' ? 'Chennai Transit Hub' : status === 'delivered' ? o.shippingAddress.city : 'Tiruppur Hub',
        timestamp: 'Updated just now',
        description: `Shipment status automatically advanced to ${status.toUpperCase()} in courier network.`
      });

      return {
        ...o,
        fulfillmentStatus: status,
        trackingTimeline: newTimeline
      };
    }));

    // Sync active tracked order if same
    if (activeOrderForTracking && activeOrderForTracking.id === orderId) {
      setActiveOrderForTracking(prev => prev ? { ...prev, fulfillmentStatus: status } : null);
    }
  };

  // Filter & sort products
  const categories: Category[] = [
    'All',
    'Hoodies and sweatshirts',
    'Oversized T-shirts',
    'Graphic T-shirts',
    'Cargo pants',
    'Jeans and denim',
    'Shirts',
    'Caps and accessories'
  ];

  const filteredProducts = products.filter(p => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EA] dark:bg-[#0B0B0D] text-[#0B0B0D] dark:text-[#F5F2EA] transition-colors duration-200">
      
      {/* Admin Mode View Switcher */}
      {isAdminMode ? (
        <AdminDashboard
          products={products}
          orders={orders}
          onUpdateStock={handleUpdateStock}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onAddProduct={(newProd) => setProducts(prev => [newProd, ...prev])}
          storeSettings={storeSettings}
          onUpdateSettings={setStoreSettings}
          onCloseAdmin={() => setIsAdminMode(false)}
        />
      ) : (
        <>
          {/* Top Header conforming to Master Prompt & Reference Layout */}
          <Header
            cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
            wishlistCount={wishlist.length}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenWishlist={() => setIsWishlistOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenTracking={() => {
              if (orders.length > 0) {
                setActiveOrderForTracking(orders[0]);
                setIsTrackingOpen(true);
              } else {
                setIsAccountOpen(true);
              }
            }}
            onOpenAccount={() => setIsAccountOpen(true)}
            isAdmin={isAdminMode}
            onToggleAdmin={() => setIsAdminMode(!isAdminMode)}
            activeTab={activeTab}
            onSelectTab={(tab) => {
              handleOpenProduct(null);
              setActiveTab(tab);
              if (tab === 'drops') {
                setActiveCategory('Hoodies and sweatshirts');
                const el = document.getElementById('new-drop-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              } else if (tab === 'shop') {
                setActiveCategory('All');
                const el = document.getElementById('catalog-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              } else if (tab === 'lookbook') {
                const el = document.getElementById('lookbook-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              } else if (tab === 'story') {
                const el = document.getElementById('story-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          />

          {/* MAIN PAGE VIEW: Dedicated Full Page Product Detail View OR Complete Editorial Homepage */}
          {selectedProduct ? (
            <main className="flex-1">
              <ProductDetailPage
                product={selectedProduct}
                allProducts={products}
                isWishlisted={wishlist.includes(selectedProduct.id)}
                onToggleWishlist={handleToggleWishlist}
                reviews={reviews}
                currentUser={currentUser}
                onAddReview={handleAddReview}
                onBackToCatalog={() => handleOpenProduct(null)}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onSelectProduct={(p) => handleOpenProduct(p)}
              />
            </main>
          ) : (
            <>
              {/* Editorial Streetwear Hero Section (Pixel-identical to Reference Image) */}
              <Hero
                onShopClick={(categoryFilter) => {
                  if (categoryFilter) {
                    setActiveCategory(categoryFilter as Category);
                  }
                  const el = document.getElementById('new-drop-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                onExploreLookbook={() => {
                  const el = document.getElementById('lookbook-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              />

              {/* The New Drop Section (Pixel-identical to Reference Image) */}
              <div id="new-drop-section">
                <NewDropSection
                  products={products}
                  onSelectProduct={(p) => handleOpenProduct(p)}
                  onViewAll={() => {
                    setActiveCategory('All');
                    const el = document.getElementById('catalog-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                />
              </div>

              {/* Shop By Category Visual Silhouettes */}
              <CategoryTiles
                activeCategory={activeCategory}
                onSelectCategory={(cat) => {
                  setActiveCategory(cat);
                  const el = document.getElementById('catalog-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              />

              {/* Interactive Lookbook Horizontal Gliding Slider Section */}
              <div id="lookbook-section">
                <LookbookSlider
                  products={products}
                  onSelectProduct={(p) => handleOpenProduct(p)}
                />
              </div>

              {/* Main Product Catalog Section */}
              <main id="catalog-section" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 space-y-8">
                
                {/* Catalog Filter Header with Subtle Entrance Animation */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D9D6CE] dark:border-[#2A2C35] pb-6"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono-numbers text-[#7A7C82] dark:text-[#92949A] uppercase mb-1">
                      <span>Tamil Nadu Street Catalog</span>
                      <span>·</span>
                      <span className="font-semibold text-[#0B0B0D] dark:text-[#F5F2EA]">{filteredProducts.length} Heavyweight Pieces</span>
                    </div>
                    <h2 className="font-headline text-3xl sm:text-4xl font-black tracking-tight text-[#0B0B0D] dark:text-[#F5F2EA] uppercase">
                      THE STREETWEAR ARCHIVE
                    </h2>
                  </div>

                  {/* Sorting & Filter Affordances */}
                  <div className="flex items-center gap-3 text-xs font-mono-numbers">
                    <span className="text-[#7A7C82] dark:text-[#92949A]">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="px-3.5 py-2 bg-white dark:bg-[#16171D] border border-[#D9D6CE] dark:border-[#2A2C35] rounded-md text-[#0B0B0D] dark:text-[#F5F2EA] focus:outline-none focus:border-[#1765F5] shadow-xs cursor-pointer"
                    >
                      <option value="featured">Featured First</option>
                      <option value="newest">New Drops</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="rating">Top Customer Rated</option>
                    </select>
                  </div>
                </motion.div>

                {/* Category Filter Pills (Functional Buttons adhering to Design Constitution) */}
                <motion.div 
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
                >
                  {categories.map((cat) => {
                    const isSelected = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 text-xs font-mono-numbers rounded-md transition-colors whitespace-nowrap border ${
                          isSelected
                            ? 'bg-[#1765F5] text-white border-[#1765F5] font-bold shadow-xs'
                            : 'bg-white dark:bg-[#16171D] text-[#7A7C82] dark:text-[#92949A] border-[#D9D6CE] dark:border-[#2A2C35] hover:text-[#0B0B0D] dark:hover:text-[#F5F2EA] hover:border-[#1765F5]'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </motion.div>

                {/* 3-Column Product Grid (Responsive: 1 col mobile, 2 col tablet, 3-4 col desktop) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredProducts.map((product, index) => {
                    const { rating: avgRating, count: revCount } = getProductRatingData(
                      product.id,
                      product.rating,
                      product.reviewsCount
                    );
                    return (
                      <ProductCard
                        key={product.id}
                        index={index}
                        product={product}
                        isWishlisted={wishlist.includes(product.id)}
                        onToggleWishlist={handleToggleWishlist}
                        averageRating={avgRating}
                        reviewsCount={revCount}
                        onSelect={(p) => handleOpenProduct(p)}
                        onQuickAdd={(p, color, size) => handleAddToCart(p, color, size, 1)}
                      />
                    );
                  })}
                </div>

              </main>

              {/* Brand Heritage & Fabric Story Section with Staggered Entrance */}
              <motion.section 
                id="story-section"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full bg-[#EDE8DE] dark:bg-[#0E0F12] border-t border-[#D9D6CE] dark:border-[#262830] py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-200"
              >
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-6 space-y-4 text-left"
                  >
                    <span className="text-xs font-mono-numbers text-[#1765F5] font-bold uppercase tracking-wider block">
                      The Tiruppur & Chennai Synthesis
                    </span>
                    <h3 className="font-headline text-3xl sm:text-5xl font-black text-[#0B0B0D] dark:text-[#F5F2EA] leading-none uppercase">
                      WHY INDIAN STREETWEAR DEMANDS HEAVYWEIGHT COMBED COTTON
                    </h3>
                    <p className="text-sm text-[#7A7C82] dark:text-[#92949A] font-body leading-relaxed">
                      Fast fashion apparel collapses after two washes. At URBAN STREET, our yarns are spun in Tiruppur using long-staple Indian combed cotton. We knit dense 400 GSM heavyweight French terry that drapes with architectural rigidity while breathing effortlessly in Indian climates.
                    </p>
                    <div className="pt-2 flex items-center gap-6 text-xs font-mono-numbers">
                      <div>
                        <strong className="text-xl font-headline font-black text-[#0B0B0D] dark:text-[#F5F2EA] block">100%</strong>
                        <span className="text-[#7A7C82] dark:text-[#92949A]">Preshrunk Cotton</span>
                      </div>
                      <div>
                        <strong className="text-xl font-headline font-black text-[#0B0B0D] dark:text-[#F5F2EA] block">0%</strong>
                        <span className="text-[#7A7C82] dark:text-[#92949A]">Synthetic Polyester</span>
                      </div>
                      <div>
                        <strong className="text-xl font-headline font-black text-[#1765F5] block">24-48h</strong>
                        <span className="text-[#7A7C82] dark:text-[#92949A]">TN Dispatch</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-6 bg-white dark:bg-[#16171D] border border-[#D9D6CE] dark:border-[#2A2C35] rounded-xl p-8 space-y-4 shadow-sm"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono-numbers text-[#1765F5] font-bold">
                      <MapPin className="w-4 h-4" />
                      <span>TAMIL NADU SERVICE GUARANTEE</span>
                    </div>
                    <h4 className="font-headline text-2xl font-bold text-[#0B0B0D] dark:text-[#F5F2EA] uppercase">
                      LOCALIZED LOGISTICS & 7-DAY EXCHANGE
                    </h4>
                    <p className="text-xs text-[#7A7C82] dark:text-[#92949A] font-mono-numbers leading-relaxed">
                      Direct express routes connect our central Tiruppur warehouse with Chennai sorting hubs and Tier-2 city centers in under 24 hours. Doorstep cash on delivery, zero question exchanges, and local WhatsApp support.
                    </p>
                    <div className="pt-2 flex items-center gap-3">
                      <span className="text-xs font-mono-numbers text-[#0B0B0D] dark:text-[#F5F2EA] font-semibold">
                        Support: support@urbanstreet.in
                      </span>
                    </div>
                  </motion.div>

                </div>
              </motion.section>
            </>
          )}

          {/* Footer */}
          <Footer
            onSelectCategory={(cat) => {
              handleOpenProduct(null);
              setActiveCategory(cat as Category);
              const el = document.getElementById('catalog-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenTracking={() => {
              if (orders.length > 0) {
                setActiveOrderForTracking(orders[0]);
                setIsTrackingOpen(true);
              }
            }}
          />

          {/* ===================== DRAWERS & MODALS ===================== */}

          {/* Wishlist Drawer */}
          <WishlistDrawer
            isOpen={isWishlistOpen}
            onClose={() => setIsWishlistOpen(false)}
            wishlistProductIds={wishlist}
            products={products}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={(p) => {
              handleOpenProduct(p);
              setIsWishlistOpen(false);
            }}
            onAddToCart={handleAddToCart}
          />

          {/* Cart Drawer */}
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            appliedCoupon={appliedCoupon}
            onApplyCoupon={setAppliedCoupon}
            onCheckout={() => setIsCheckoutOpen(true)}
            freeShippingThreshold={storeSettings.freeShippingThreshold}
            standardShippingFee={storeSettings.standardShippingFee}
          />

          {/* Checkout Modal */}
          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            cart={cart}
            appliedCoupon={appliedCoupon}
            onOrderCreated={handleOrderCreated}
            freeShippingThreshold={storeSettings.freeShippingThreshold}
            standardShippingFee={storeSettings.standardShippingFee}
          />

          {/* Order Tracking Modal */}
          <OrderTrackingModal
            isOpen={isTrackingOpen}
            order={activeOrderForTracking}
            onClose={() => {
              setIsTrackingOpen(false);
              setActiveOrderForTracking(null);
            }}
            onAdvanceFulfillment={handleUpdateOrderStatus}
          />

          {/* Customer Account & Saved Addresses Modal */}
          <CustomerAccountModal
            isOpen={isAccountOpen}
            onClose={() => setIsAccountOpen(false)}
            orders={orders}
            onTrackOrder={(order) => {
              setActiveOrderForTracking(order);
              setIsTrackingOpen(true);
            }}
          />

          {/* Search Modal */}
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            products={products}
            onSelectProduct={(p) => {
              handleOpenProduct(p);
              setIsSearchOpen(false);
            }}
          />

          {/* Floating WhatsApp Concierge Button */}
          <WhatsAppChatButton
            storeSettings={storeSettings}
            activeOrder={orders[0] || null}
          />

        </>
      )}

    </div>
  );
}
