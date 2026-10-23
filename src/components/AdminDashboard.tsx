import React, { useState } from 'react';
import { Product, Order, FulfillmentStatus, StoreSettings } from '../types';
import { 
  ShieldCheck, 
  Package, 
  TrendingUp, 
  ShoppingBag, 
  AlertTriangle, 
  Plus, 
  Minus, 
  Search, 
  CheckCircle, 
  Clock, 
  Truck, 
  Settings, 
  RefreshCw,
  Sliders,
  DollarSign,
  ArrowUpRight,
  MapPin,
  ExternalLink,
  X
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  onUpdateStock: (productId: string, size: string, delta: number) => void;
  onUpdateOrderStatus: (orderId: string, status: FulfillmentStatus) => void;
  onAddProduct: (product: Product) => void;
  storeSettings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
  onCloseAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  orders,
  onUpdateStock,
  onUpdateOrderStatus,
  onAddProduct,
  storeSettings,
  onUpdateSettings,
  onCloseAdmin
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'analytics' | 'settings'>('inventory');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [settingsForm, setSettingsForm] = useState<StoreSettings>(storeSettings);
  const [savedSettingsFeedback, setSavedSettingsFeedback] = useState(false);

  // New product modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdSku, setNewProdSku] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<any>('Oversized T-shirts');
  const [newProdPrice, setNewProdPrice] = useState(1299);
  const [newProdFabric, setNewProdFabric] = useState('100% Combed Indian Cotton');
  const [newProdFit, setNewProdFit] = useState('Boxy Drop Shoulder');
  const [newProdColor, setNewProdColor] = useState('Obsidian Void');
  const [newProdHex, setNewProdHex] = useState('#09090B');

  // Financial calculations
  const totalGrossSales = orders.reduce((acc, o) => acc + o.total, 0);
  const totalOrdersCount = orders.length;
  const averageOrderValue = totalOrdersCount > 0 ? Math.round(totalGrossSales / totalOrdersCount) : 0;
  
  // Inventory low-stock scan
  const lowStockProducts = products.filter(p => 
    p.sizes.some(s => s.stock > 0 && s.stock <= 5)
  );

  // Filtered products for inventory tab
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtered orders
  const filteredOrders = orders.filter(o => {
    if (orderFilter !== 'all' && o.fulfillmentStatus !== orderFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return o.orderNumber.toLowerCase().includes(q) ||
             o.customer.name.toLowerCase().includes(q) ||
             o.shippingAddress.city.toLowerCase().includes(q);
    }
    return true;
  });

  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdSku.trim()) return;

    const defaultImage = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80';
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      sku: newProdSku.toUpperCase(),
      name: newProdName,
      slug: newProdName.toLowerCase().replace(/\s+/g, '-'),
      category: newProdCategory,
      collection: 'Winter 2026 Atelier',
      price: newProdPrice,
      compareAtPrice: Math.round(newProdPrice * 1.25),
      description: 'Heavyweight boxy streetwear piece crafted from combed Indian cotton.',
      fabric: newProdFabric,
      fit: newProdFit,
      weightGrams: 420,
      careInstructions: [
        'Machine wash cold with like dark tones',
        'Dry in shade to preserve deep pigment'
      ],
      colors: [
        { name: newProdColor, hex: newProdHex }
      ],
      sizes: [
        { size: 'S', stock: 10 },
        { size: 'M', stock: 15 },
        { size: 'L', stock: 15 },
        { size: 'XL', stock: 10 }
      ],
      primaryImage: defaultImage,
      images: [defaultImage],
      rating: 5.0,
      reviewsCount: 1,
      isFeatured: false,
      isNewArrival: true,
      visualStyle: {
        baseColor: newProdHex,
        accentColor: '#2563EB',
        pattern: 'minimal'
      }
    };

    onAddProduct(newProd);
    setShowAddModal(false);
    setNewProdName('');
    setNewProdSku('');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(settingsForm);
    setSavedSettingsFeedback(true);
    setTimeout(() => setSavedSettingsFeedback(false), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0C] text-[#09090B] dark:text-[#F8FAFC] transition-colors duration-200">
      
      {/* Admin Top Command Header */}
      <div className="border-b border-[#E4E4E7] dark:border-[#22242F] bg-white dark:bg-[#121318] px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#2563EB] text-white rounded-lg shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl font-bold tracking-tight">
                  URBAN STREET ATELIER COMMAND
                </h1>
                <span className="px-2 py-0.5 text-[9px] font-mono-numbers bg-[#2563EB] text-white rounded font-bold uppercase">
                  LIVE TELEMETRY
                </span>
              </div>
              <p className="text-xs font-mono-numbers text-[#71717A] dark:text-[#94A3B8]">
                Tiruppur Hub & Tamil Nadu Storefront Admin Suite
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onCloseAdmin}
              className="px-4 py-2 bg-[#09090B] hover:bg-[#27272A] dark:bg-[#F8FAFC] dark:hover:bg-white text-white dark:text-[#09090B] text-xs font-mono-numbers font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Back to Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        
        {/* KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between text-xs font-mono-numbers text-[#71717A] dark:text-[#94A3B8]">
              <span>Gross Sales (INR)</span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="mt-2">
              <span className="font-display text-2xl font-bold">
                ₹{totalGrossSales.toLocaleString('en-IN')}
              </span>
              <p className="text-[11px] font-mono-numbers text-emerald-600 dark:text-emerald-400 mt-0.5">
                +24.8% vs last week
              </p>
            </div>
          </div>

          <div className="p-5 bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between text-xs font-mono-numbers text-[#71717A] dark:text-[#94A3B8]">
              <span>Total Orders</span>
              <ShoppingBag className="w-4 h-4 text-[#2563EB]" />
            </div>
            <div className="mt-2">
              <span className="font-display text-2xl font-bold">
                {totalOrdersCount}
              </span>
              <p className="text-[11px] font-mono-numbers text-[#71717A] dark:text-[#94A3B8] mt-0.5">
                Tamil Nadu fulfillment
              </p>
            </div>
          </div>

          <div className="p-5 bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between text-xs font-mono-numbers text-[#71717A] dark:text-[#94A3B8]">
              <span>Avg Order Value (AOV)</span>
              <DollarSign className="w-4 h-4 text-[#2563EB]" />
            </div>
            <div className="mt-2">
              <span className="font-display text-2xl font-bold">
                ₹{averageOrderValue.toLocaleString('en-IN')}
              </span>
              <p className="text-[11px] font-mono-numbers text-[#71717A] dark:text-[#94A3B8] mt-0.5">
                Heavyweight piece focus
              </p>
            </div>
          </div>

          <div className="p-5 bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between text-xs font-mono-numbers text-[#71717A] dark:text-[#94A3B8]">
              <span>Low Stock Alerts</span>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>
            <div className="mt-2">
              <span className="font-display text-2xl font-bold text-amber-500">
                {lowStockProducts.length} Items
              </span>
              <p className="text-[11px] font-mono-numbers text-[#71717A] dark:text-[#94A3B8] mt-0.5">
                Restock suggested
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E4E4E7] dark:border-[#22242F] pb-2 text-xs font-mono-numbers">
          {[
            { id: 'inventory', label: 'Real-Time Inventory', count: products.length },
            { id: 'orders', label: 'Order Dispatch Queue', count: orders.length },
            { id: 'analytics', label: 'Tamil Nadu Insights' },
            { id: 'settings', label: 'Storefront Config' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                activeTab === t.id
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'text-[#71717A] dark:text-[#94A3B8] hover:text-[#09090B] dark:hover:text-[#F8FAFC] hover:bg-[#F4F4F5] dark:hover:bg-[#181A22]'
              }`}
            >
              <span>{t.label}</span>
              {t.count !== undefined && (
                <span className="px-1.5 py-0.2 rounded bg-black/20 text-[10px]">
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ======================= TAB 1: INVENTORY ======================= */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            
            {/* Search and Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#71717A]" />
                  <input
                    type="text"
                    placeholder="Filter by SKU or Product name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-xs font-mono-numbers text-[#09090B] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-3.5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono-numbers text-xs tracking-wider uppercase font-bold rounded-lg flex items-center gap-1.5 shrink-0 transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Garment SKU</span>
                </button>
              </div>

              <div className="text-xs font-mono-numbers text-[#71717A] dark:text-[#94A3B8]">
                Inline stock changes update the customer storefront instantly.
              </div>
            </div>

            {/* Inventory Table */}
            <div className="overflow-x-auto border border-[#E4E4E7] dark:border-[#22242F] rounded-xl bg-white dark:bg-[#121318]">
              <table className="w-full text-left text-xs font-mono-numbers">
                <thead className="bg-[#F4F4F5] dark:bg-[#0E0F14] text-[#71717A] dark:text-[#94A3B8] uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">SKU & Item</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Fabric / Silhouette</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Size Variants (Live Stock Controller)</th>
                    <th className="p-3.5 text-right">Total Units</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4E4E7] dark:divide-[#22242F]">
                  {filteredProducts.map((p) => {
                    const totalUnits = p.sizes.reduce((a, b) => a + b.stock, 0);
                    return (
                      <tr key={p.id} className="hover:bg-[#F4F4F5]/50 dark:hover:bg-[#181A22]/50 transition-colors">
                        <td className="p-3.5">
                          <strong className="text-sm font-display text-[#09090B] dark:text-[#F8FAFC] block">
                            {p.name}
                          </strong>
                          <span className="text-[#71717A] dark:text-[#94A3B8] text-[11px]">
                            {p.sku} · {p.collection}
                          </span>
                        </td>

                        <td className="p-3.5 text-[#71717A] dark:text-[#94A3B8]">
                          {p.category}
                        </td>

                        <td className="p-3.5">
                          <span className="font-semibold text-[#09090B] dark:text-[#F8FAFC]">{p.fabric}</span>
                          <span className="block text-[11px] text-[#71717A] dark:text-[#94A3B8]">{p.fit}</span>
                        </td>

                        <td className="p-3.5 font-bold">
                          ₹{p.price.toLocaleString('en-IN')}
                        </td>

                        {/* Interactive Stock Steppers for Sizes */}
                        <td className="p-3.5">
                          <div className="flex flex-wrap gap-2">
                            {p.sizes.map((s) => (
                              <div
                                key={s.size}
                                className={`flex items-center border rounded px-1.5 py-0.5 text-[11px] ${
                                  s.stock === 0
                                    ? 'bg-red-500/10 border-red-500 text-red-500'
                                    : s.stock <= 4
                                    ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400'
                                    : 'bg-[#F4F4F5] dark:bg-[#181A22] border-[#E4E4E7] dark:border-[#22242F]'
                                }`}
                              >
                                <span className="font-bold mr-1.5">{s.size}:</span>
                                <span className="mr-1.5 font-bold">{s.stock}</span>
                                
                                <div className="flex items-center gap-0.5 ml-1">
                                  <button
                                    onClick={() => onUpdateStock(p.id, s.size, -1)}
                                    disabled={s.stock <= 0}
                                    className="p-0.5 hover:bg-black/10 dark:hover:bg-white/10 rounded disabled:opacity-20"
                                    title="Decrease stock"
                                  >
                                    <Minus className="w-2.5 h-2.5" />
                                  </button>
                                  <button
                                    onClick={() => onUpdateStock(p.id, s.size, 1)}
                                    className="p-0.5 hover:bg-black/10 dark:hover:bg-white/10 rounded"
                                    title="Increase stock"
                                  >
                                    <Plus className="w-2.5 h-2.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>

                        <td className="p-3.5 text-right font-bold text-sm">
                          {totalUnits}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ======================= TAB 2: ORDERS ======================= */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            
            {/* Status Filter buttons */}
            <div className="flex items-center gap-2 text-xs font-mono-numbers">
              {['all', 'confirmed', 'processing', 'dispatched', 'delivered'].map((st) => (
                <button
                  key={st}
                  onClick={() => setOrderFilter(st)}
                  className={`px-3 py-1.5 rounded-lg uppercase tracking-wider transition-colors ${
                    orderFilter === st
                      ? 'bg-[#2563EB] text-white shadow-xs font-bold'
                      : 'bg-white dark:bg-[#181A22] text-[#71717A] dark:text-[#94A3B8] border border-[#E4E4E7] dark:border-[#22242F]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto border border-[#E4E4E7] dark:border-[#22242F] rounded-xl bg-white dark:bg-[#121318]">
              <table className="w-full text-left text-xs font-mono-numbers">
                <thead className="bg-[#F4F4F5] dark:bg-[#0E0F14] text-[#71717A] dark:text-[#94A3B8] uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Order ID</th>
                    <th className="p-3.5">Customer & City</th>
                    <th className="p-3.5">Items</th>
                    <th className="p-3.5">Payment</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Fulfillment Status</th>
                    <th className="p-3.5 text-right">Advance Stage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4E4E7] dark:divide-[#22242F]">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-[#71717A] dark:text-[#94A3B8]">
                        No orders match the current filter.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((o) => (
                      <tr key={o.id} className="hover:bg-[#F4F4F5]/50 dark:hover:bg-[#181A22]/50 transition-colors">
                        <td className="p-3.5">
                          <strong className="font-bold text-[#09090B] dark:text-[#F8FAFC] block">
                            {o.orderNumber}
                          </strong>
                          <span className="text-[#71717A] dark:text-[#94A3B8] text-[10px]">
                            {o.date}
                          </span>
                        </td>

                        <td className="p-3.5">
                          <span className="font-semibold block">{o.customer.name}</span>
                          <span className="text-[11px] text-[#71717A] dark:text-[#94A3B8]">
                            {o.shippingAddress.city}, PIN {o.shippingAddress.pinCode}
                          </span>
                        </td>

                        <td className="p-3.5">
                          {o.items.map((it, i) => (
                            <div key={i} className="text-[11px] truncate max-w-[200px]">
                              {it.quantity}x {it.product.name} ({it.selectedSize})
                            </div>
                          ))}
                        </td>

                        <td className="p-3.5 uppercase font-semibold">
                          <span className="px-2 py-0.5 bg-[#F4F4F5] dark:bg-[#22242F] rounded text-[10px] border border-[#E4E4E7] dark:border-white/10">
                            {o.paymentMethod}
                          </span>
                        </td>

                        <td className="p-3.5 font-bold">
                          ₹{o.total.toLocaleString('en-IN')}
                        </td>

                        <td className="p-3.5">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            o.fulfillmentStatus === 'delivered'
                              ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                              : o.fulfillmentStatus === 'dispatched'
                              ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                              : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                          }`}>
                            {o.fulfillmentStatus}
                          </span>
                        </td>

                        {/* Interactive Status Switcher */}
                        <td className="p-3.5 text-right">
                          <select
                            value={o.fulfillmentStatus}
                            onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as FulfillmentStatus)}
                            className="px-2 py-1 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded text-xs font-mono-numbers text-[#09090B] dark:text-[#F8FAFC]"
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ======================= TAB 3: ANALYTICS ======================= */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Tamil Nadu City Share */}
            <div className="p-6 bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl space-y-4 shadow-xs">
              <h3 className="font-display text-lg font-bold text-[#09090B] dark:text-[#F8FAFC]">
                TAMIL NADU GEOGRAPHIC VELOCITY
              </h3>
              
              <div className="space-y-3 font-mono-numbers text-xs">
                {[
                  { city: 'Chennai Hub', share: '44%', orders: '62 orders', color: '#2563EB' },
                  { city: 'Coimbatore & Tiruppur', share: '28%', orders: '39 orders', color: '#0284C7' },
                  { city: 'Madurai Region', share: '16%', orders: '22 orders', color: '#6366F1' },
                  { city: 'Salem & Trichy', share: '12%', orders: '17 orders', color: '#F97316' }
                ].map((c) => (
                  <div key={c.city} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="font-semibold">{c.city}</span>
                      <span>{c.share} ({c.orders})</span>
                    </div>
                    <div className="w-full h-2 bg-[#E4E4E7] dark:bg-[#22242F] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: c.share, backgroundColor: c.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Silhouette Category Breakdown */}
            <div className="p-6 bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl space-y-4 shadow-xs">
              <h3 className="font-display text-lg font-bold text-[#09090B] dark:text-[#F8FAFC]">
                SILHOUETTE POPULARITY
              </h3>

              <div className="space-y-3 font-mono-numbers text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>French Terry Heavy Hoodies</span>
                    <strong className="text-[#2563EB]">54% Volume</strong>
                  </div>
                  <div className="w-full h-2 bg-[#E4E4E7] dark:bg-[#22242F] rounded-full overflow-hidden">
                    <div className="h-full bg-[#2563EB]" style={{ width: '54%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Heavy Single-Jersey Boxy Tees</span>
                    <strong>31% Volume</strong>
                  </div>
                  <div className="w-full h-2 bg-[#E4E4E7] dark:bg-[#22242F] rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500" style={{ width: '31%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Tactical 8-Pocket Cargos</span>
                    <strong>15% Volume</strong>
                  </div>
                  <div className="w-full h-2 bg-[#E4E4E7] dark:bg-[#22242F] rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: '15%' }} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ======================= TAB 4: STORE SETTINGS ======================= */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="max-w-2xl bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl p-6 space-y-4 font-mono-numbers text-xs shadow-xs">
            <h3 className="font-display text-lg font-bold text-[#09090B] dark:text-[#F8FAFC]">
              STOREFRONT CONFIGURATION
            </h3>

            <div>
              <label className="block uppercase text-[#71717A] dark:text-[#94A3B8] mb-1">
                Announcement Bar Banner
              </label>
              <input
                type="text"
                value={settingsForm.announcementText}
                onChange={(e) => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                className="w-full px-3 py-2 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-[#09090B] dark:text-[#F8FAFC]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block uppercase text-[#71717A] dark:text-[#94A3B8] mb-1">
                  Free Shipping Threshold (INR)
                </label>
                <input
                  type="number"
                  value={settingsForm.freeShippingThreshold}
                  onChange={(e) => setSettingsForm({ ...settingsForm, freeShippingThreshold: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-[#09090B] dark:text-[#F8FAFC]"
                />
              </div>

              <div>
                <label className="block uppercase text-[#71717A] dark:text-[#94A3B8] mb-1">
                  Standard Shipping Fee (INR)
                </label>
                <input
                  type="number"
                  value={settingsForm.standardShippingFee}
                  onChange={(e) => setSettingsForm({ ...settingsForm, standardShippingFee: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-[#09090B] dark:text-[#F8FAFC]"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settingsForm.isCodEnabled}
                  onChange={(e) => setSettingsForm({ ...settingsForm, isCodEnabled: e.target.checked })}
                  className="w-4 h-4 accent-[#2563EB]"
                />
                <span>Cash on Delivery (COD) Enabled</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settingsForm.isUpiEnabled}
                  onChange={(e) => setSettingsForm({ ...settingsForm, isUpiEnabled: e.target.checked })}
                  className="w-4 h-4 accent-[#2563EB]"
                />
                <span>Instant UPI Gateway Active</span>
              </label>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#2563EB] text-white font-mono-numbers text-xs uppercase tracking-wider font-bold rounded-lg hover:bg-[#1D4ED8] transition-colors shadow-xs"
              >
                Save Configuration
              </button>
              {savedSettingsFeedback && (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>Configuration saved and applied live!</span>
                </span>
              )}
            </div>
          </form>
        )}

      </div>

      {/* Add Product Modal Overlay */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-2xl shadow-2xl overflow-hidden">
            
            <div className="p-4 bg-[#FAFAFA] dark:bg-[#0E0F14] border-b border-[#E4E4E7] dark:border-[#22242F] flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-bold text-[#09090B] dark:text-[#F8FAFC]">
                  CREATE NEW STREETWEAR PIECE
                </h3>
                <p className="text-[10px] font-mono-numbers text-[#71717A] dark:text-[#94A3B8]">
                  Add SKU to Tiruppur catalog & customer storefront
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-[#71717A] hover:text-[#09090B] dark:text-[#94A3B8] dark:hover:text-[#F8FAFC]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProductSubmit} className="p-5 space-y-3 font-mono-numbers text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase text-[#71717A] dark:text-[#94A3B8] text-[10px] mb-1">
                    Garment Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acid Vintage Heavy Tee"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    className="w-full p-2 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-[#09090B] dark:text-[#F8FAFC]"
                  />
                </div>

                <div>
                  <label className="block uppercase text-[#71717A] dark:text-[#94A3B8] text-[10px] mb-1">
                    SKU Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="UB-TS-015"
                    value={newProdSku}
                    onChange={(e) => setNewProdSku(e.target.value)}
                    className="w-full p-2 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-[#09090B] dark:text-[#F8FAFC]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase text-[#71717A] dark:text-[#94A3B8] text-[10px] mb-1">
                    Category
                  </label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full p-2 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-[#09090B] dark:text-[#F8FAFC]"
                  >
                    <option value="Oversized T-shirts">Oversized T-shirts</option>
                    <option value="Graphic T-shirts">Graphic T-shirts</option>
                    <option value="Hoodies and sweatshirts">Hoodies and sweatshirts</option>
                    <option value="Cargo pants">Cargo pants</option>
                    <option value="Jeans and denim">Jeans and denim</option>
                    <option value="Shirts">Shirts</option>
                    <option value="Caps and accessories">Caps and accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase text-[#71717A] dark:text-[#94A3B8] text-[10px] mb-1">
                    Price in INR (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(parseInt(e.target.value) || 0)}
                    className="w-full p-2 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-[#09090B] dark:text-[#F8FAFC]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase text-[#71717A] dark:text-[#94A3B8] text-[10px] mb-1">
                    Silhouette
                  </label>
                  <input
                    type="text"
                    value={newProdFit}
                    onChange={(e) => setNewProdFit(e.target.value)}
                    className="w-full p-2 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-[#09090B] dark:text-[#F8FAFC]"
                  />
                </div>

                <div>
                  <label className="block uppercase text-[#71717A] dark:text-[#94A3B8] text-[10px] mb-1">
                    Fabric Composition
                  </label>
                  <input
                    type="text"
                    value={newProdFabric}
                    onChange={(e) => setNewProdFabric(e.target.value)}
                    className="w-full p-2 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-[#09090B] dark:text-[#F8FAFC]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase text-[#71717A] dark:text-[#94A3B8] text-[10px] mb-1">
                    Colorway Name
                  </label>
                  <input
                    type="text"
                    value={newProdColor}
                    onChange={(e) => setNewProdColor(e.target.value)}
                    className="w-full p-2 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-[#09090B] dark:text-[#F8FAFC]"
                  />
                </div>

                <div>
                  <label className="block uppercase text-[#71717A] dark:text-[#94A3B8] text-[10px] mb-1">
                    Color Hex
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={newProdHex}
                      onChange={(e) => setNewProdHex(e.target.value)}
                      className="w-8 h-8 rounded border border-black/20 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={newProdHex}
                      onChange={(e) => setNewProdHex(e.target.value)}
                      className="flex-1 p-2 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-[#09090B] dark:text-[#F8FAFC]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-[#E4E4E7] dark:border-[#22242F]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs text-[#71717A]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono-numbers text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-xs"
                >
                  Publish to Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
