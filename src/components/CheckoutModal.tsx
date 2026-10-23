import React, { useState, useEffect } from 'react';
import { CartItem, Coupon, Order, PaymentMethod } from '../types';
import { checkPincodeServiceability, PincodeInfo } from '../utils/tnPincodes';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building, 
  Banknote, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  ArrowLeft,
  Truck,
  AlertCircle,
  QrCode
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  appliedCoupon: Coupon | null;
  onOrderCreated: (order: Order) => void;
  freeShippingThreshold: number;
  standardShippingFee: number;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  appliedCoupon,
  onOrderCreated,
  freeShippingThreshold = 1499,
  standardShippingFee = 99
}) => {
  // --- All hooks must be declared before any early return ---
  const [step, setStep] = useState<1 | 2>(1); // 1 = Address, 2 = Payment

  // Step 1: Address Form
  const [fullName, setFullName] = useState('Dinesh Murugan');
  const [email, setEmail] = useState('2002dineshmurugan@gmail.com');
  const [phone, setPhone] = useState('9840123456');
  const [addressLine, setAddressLine] = useState('Plot 42, 4th Cross Street, Anna Nagar');
  const [landmark, setLandmark] = useState('Near Roundtana');
  const [pinCode, setPinCode] = useState('600040');
  const [city, setCity] = useState('Chennai');
  const [district, setDistrict] = useState('Chennai');
  const [pinInfo, setPinInfo] = useState<PincodeInfo | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Step 2: Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('dinesh@okhdfcbank');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('gpay');
  const [cardNumber, setCardNumber] = useState('4532 8920 1123 9081');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('742');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Auto-detect city from PIN code
  useEffect(() => {
    if (!isOpen) return;
    if (pinCode.length === 6) {
      const res = checkPincodeServiceability(pinCode);
      if (res) {
        setPinInfo(res);
        setCity(res.city);
        setDistrict(res.district);
        setFormErrors(prev => ({ ...prev, pinCode: '' }));
      } else {
        setPinInfo(null);
      }
    }
  }, [pinCode, isOpen]);

  // Early return AFTER all hooks
  if (!isOpen) return null;

  // Financial calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= freeShippingThreshold || appliedCoupon?.code === 'FREESHIP';
  const shippingFee = isFreeShipping ? 0 : standardShippingFee;

  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountPercent) {
      discount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountAmount) {
      discount = appliedCoupon.discountAmount;
    }
  }

  const codSurcharge = paymentMethod === 'cod' && subtotal < 2000 ? 50 : 0;
  const totalAmount = Math.max(0, subtotal - discount + shippingFee + codSurcharge);

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!email.trim() || !email.includes('@')) errors.email = 'Please enter a valid email address';
    if (!phone.trim() || phone.replace(/\D/g, '').length !== 10) errors.phone = 'Enter valid 10-digit Indian mobile number';
    if (!addressLine.trim()) errors.addressLine = 'Street address is required';
    if (!pinCode.trim() || pinCode.length !== 6) errors.pinCode = 'Valid 6-digit PIN code required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToPayment = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleConfirmOrder = () => {
    setIsProcessing(true);
    setProcessingStatus('Securing session with Indian Payment Gateway...');

    setTimeout(() => {
      setProcessingStatus(paymentMethod === 'upi' 
        ? 'Verifying UPI intent with bank VPA...' 
        : paymentMethod === 'card' 
        ? 'Simulating 3D Secure 2.0 OTP verification...' 
        : paymentMethod === 'netbanking' 
        ? 'Connecting to Netbanking gateway...' 
        : 'Verifying Cash on Delivery order for Tamil Nadu...'
      );
    }, 800);

    setTimeout(() => {
      setProcessingStatus('Generating order manifest & Tiruppur dispatch slip...');
    }, 1600);

    setTimeout(() => {
      const randomId = Math.floor(10000 + Math.random() * 90000);
      const orderNumber = `UB-TN-${randomId}`;
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });

      const order: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: orderNumber,
        date: dateStr,
        customer: {
          name: fullName,
          email: email,
          phone: `+91 ${phone}`
        },
        shippingAddress: {
          fullName: fullName,
          mobile: `+91 ${phone}`,
          addressLine: addressLine,
          landmark: landmark,
          city: city,
          district: district,
          state: 'Tamil Nadu',
          pinCode: pinCode
        },
        items: [...cart],
        subtotal: subtotal,
        discount: discount,
        couponCode: appliedCoupon?.code,
        shippingFee: shippingFee,
        total: totalAmount,
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'completed',
        fulfillmentStatus: 'confirmed',
        trackingNumber: `SR-TN${randomId}X`,
        courierName: 'Shiprocket Express (BlueDart Air)',
        estimatedDeliveryDate: pinInfo?.deliveryDays ? `${pinInfo.deliveryDays} (Tamil Nadu Express)` : '24-48 Hours',
        trackingTimeline: [
          {
            status: 'confirmed',
            title: 'Order Confirmed & Manifest Created',
            location: 'Urban Street Storefront',
            timestamp: 'Just now',
            description: paymentMethod === 'cod' 
              ? 'Cash on delivery order verified with customer phone number.' 
              : 'Payment verified successfully via secure payment gateway.'
          },
          {
            status: 'processing',
            title: 'Queued for Tiruppur Atelier Inspection',
            location: 'Tiruppur Textile Corridor, TN',
            timestamp: 'Today',
            description: 'Fabric seam audit and heavyweight garment inspection initialized.'
          }
        ]
      };

      setIsProcessing(false);
      onOrderCreated(order);
      onClose();
    }, 2400);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/75 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Checkout Dialog"
    >
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-2xl shadow-2xl overflow-hidden my-6 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="p-5 border-b border-[#E4E4E7] dark:border-[#22242F] flex items-center justify-between bg-[#FAFAFA] dark:bg-[#0E0F14]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-display font-bold text-sm">
              UB
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-[#09090B] dark:text-[#F8FAFC]">
                {step === 1 ? 'STEP 1: DELIVERY ADDRESS' : 'STEP 2: SECURE PAYMENT'}
              </h3>
              <p className="text-[11px] font-mono-numbers text-[#71717A] dark:text-[#94A3B8]">
                Order Total: <strong className="text-[#09090B] dark:text-[#F8FAFC]">₹{totalAmount.toLocaleString('en-IN')}</strong> · 256-bit Encrypted
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

        {/* Modal Body */}
        <div className="p-6">
          
          {/* STEP 1: Address Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-numbers uppercase text-[#71717A] dark:text-[#94A3B8] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-xs font-mono-numbers text-[#09090B] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2563EB]"
                  />
                  {formErrors.fullName && <p className="text-[10px] text-red-500 mt-1">{formErrors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono-numbers uppercase text-[#71717A] dark:text-[#94A3B8] mb-1">
                    Email Address (For Invoices) *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-xs font-mono-numbers text-[#09090B] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2563EB]"
                  />
                  {formErrors.email && <p className="text-[10px] text-red-500 mt-1">{formErrors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-numbers uppercase text-[#71717A] dark:text-[#94A3B8] mb-1">
                  Indian Mobile Number (For Courier SMS & Updates) *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-xs font-mono-numbers bg-[#E4E4E7] dark:bg-[#22242F] text-[#09090B] dark:text-[#F8FAFC] rounded-l-lg border border-r-0 border-[#E4E4E7] dark:border-[#22242F]">
                    +91
                  </span>
                  <input
                    type="text"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3 py-2 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-r-lg text-xs font-mono-numbers text-[#09090B] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                {formErrors.phone && <p className="text-[10px] text-red-500 mt-1">{formErrors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono-numbers uppercase text-[#71717A] dark:text-[#94A3B8] mb-1">
                  Street Address & House / Flat No. *
                </label>
                <input
                  type="text"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-xs font-mono-numbers text-[#09090B] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2563EB]"
                />
                {formErrors.addressLine && <p className="text-[10px] text-red-500 mt-1">{formErrors.addressLine}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono-numbers uppercase text-[#71717A] dark:text-[#94A3B8] mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3 py-2 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-xs font-mono-numbers text-[#09090B] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2563EB]"
                  />
                  {formErrors.pinCode && <p className="text-[10px] text-red-500 mt-1">{formErrors.pinCode}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono-numbers uppercase text-[#71717A] dark:text-[#94A3B8] mb-1">
                    City / Town
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-xs font-mono-numbers text-[#09090B] dark:text-[#F8FAFC]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-numbers uppercase text-[#71717A] dark:text-[#94A3B8] mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    disabled
                    value="Tamil Nadu"
                    className="w-full px-3 py-2 bg-[#E4E4E7]/60 dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-xs font-mono-numbers text-[#71717A] dark:text-[#94A3B8]"
                  />
                </div>
              </div>

              {/* Delivery ETA Badge */}
              <div className="p-3 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg flex items-center justify-between text-xs font-mono-numbers">
                <span className="flex items-center gap-1.5 text-[#09090B] dark:text-[#F8FAFC]">
                  <Truck className="w-4 h-4 text-[#2563EB]" />
                  <span>Estimated Express Delivery: <strong>{pinInfo?.deliveryDays || '24-48 Hours'}</strong></span>
                </span>
                <span className="text-[#2563EB] font-semibold">Tiruppur Hub Dispatch</span>
              </div>

              <div className="pt-3">
                <button
                  onClick={handleProceedToPayment}
                  className="w-full py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono-numbers text-xs uppercase tracking-wider font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <span>Continue to Payment (₹{totalAmount.toLocaleString('en-IN')})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Payment Simulator */}
          {step === 2 && (
            <div className="space-y-4">
              
              {/* Back to Address Button */}
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1 text-xs font-mono-numbers text-[#71717A] hover:text-[#09090B] dark:hover:text-[#F8FAFC]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Edit Shipping Address</span>
              </button>

              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono-numbers">
                {[
                  { id: 'upi', label: 'UPI (GPay/PhonePe)', icon: Smartphone },
                  { id: 'card', label: 'Cards (Debit/Credit)', icon: CreditCard },
                  { id: 'netbanking', label: 'Netbanking', icon: Building },
                  { id: 'cod', label: 'Cash on Delivery', icon: Banknote },
                ].map((m) => {
                  const Icon = m.icon;
                  const isSelected = paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as PaymentMethod)}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md font-bold'
                          : 'bg-[#F4F4F5] dark:bg-[#181A22] text-[#09090B] dark:text-[#F8FAFC] border-[#E4E4E7] dark:border-[#22242F] hover:border-[#2563EB]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[11px] text-center leading-tight">{m.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* UPI Options */}
              {paymentMethod === 'upi' && (
                <div className="p-4 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl space-y-3">
                  <div className="flex items-center gap-2">
                    {['gpay', 'phonepe', 'paytm', 'qr'].map((app) => (
                      <button
                        key={app}
                        onClick={() => setSelectedUpiApp(app as any)}
                        className={`flex-1 py-1.5 px-2 rounded-lg border text-xs font-mono-numbers uppercase font-semibold transition-colors ${
                          selectedUpiApp === app
                            ? 'bg-[#09090B] dark:bg-white text-white dark:text-[#09090B] border-[#09090B]'
                            : 'bg-white dark:bg-[#121318] text-[#71717A] dark:text-[#94A3B8] border-[#E4E4E7] dark:border-[#22242F]'
                        }`}
                      >
                        {app === 'qr' ? 'Dynamic QR' : app}
                      </button>
                    ))}
                  </div>

                  {selectedUpiApp === 'qr' ? (
                    <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-[#121318] rounded-lg border border-[#E4E4E7] dark:border-[#22242F] text-center">
                      <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm mb-2">
                        <QrCode className="w-24 h-24 text-[#09090B]" />
                      </div>
                      <span className="text-xs font-mono-numbers font-bold text-[#09090B] dark:text-[#F8FAFC]">
                        Scan with any UPI App (GPay, PhonePe, Paytm, CRED)
                      </span>
                      <span className="text-[11px] font-mono-numbers text-[#71717A] mt-0.5">
                        Amount: ₹{totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-mono-numbers uppercase text-[#71717A] dark:text-[#94A3B8] mb-1">
                        Enter UPI ID / VPA
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                        className="w-full px-3 py-2 bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-xs font-mono-numbers text-[#09090B] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Card Options */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl space-y-3">
                  <div>
                    <label className="block text-xs font-mono-numbers uppercase text-[#71717A] dark:text-[#94A3B8] mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-xs font-mono-numbers text-[#09090B] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono-numbers uppercase text-[#71717A] dark:text-[#94A3B8] mb-1">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-xs font-mono-numbers text-[#09090B] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono-numbers uppercase text-[#71717A] dark:text-[#94A3B8] mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        maxLength={3}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-xs font-mono-numbers text-[#09090B] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Netbanking */}
              {paymentMethod === 'netbanking' && (
                <div className="p-4 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl space-y-2">
                  <label className="block text-xs font-mono-numbers uppercase text-[#71717A] dark:text-[#94A3B8] mb-1">
                    Select Your Bank
                  </label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-[#121318] border border-[#E4E4E7] dark:border-[#22242F] rounded-lg text-xs font-mono-numbers text-[#09090B] dark:text-[#F8FAFC]"
                  >
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="State Bank of India">State Bank of India (SBI)</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Indian Overseas Bank">Indian Overseas Bank (IOB)</option>
                    <option value="City Union Bank">City Union Bank (CUB)</option>
                  </select>
                </div>
              )}

              {/* Cash on Delivery */}
              {paymentMethod === 'cod' && (
                <div className="p-4 bg-[#F4F4F5] dark:bg-[#181A22] border border-[#E4E4E7] dark:border-[#22242F] rounded-xl space-y-2 text-xs font-mono-numbers">
                  <p className="text-[#09090B] dark:text-[#F8FAFC] font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Doorstep Cash on Delivery Available</span>
                  </p>
                  <p className="text-[#71717A] dark:text-[#94A3B8] text-[11px] leading-relaxed">
                    Pay securely in cash or via UPI QR scanner when the courier executive arrives at your doorstep in {city}.
                  </p>
                </div>
              )}

              {/* Processing Overlay */}
              {isProcessing && (
                <div className="p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin shrink-0" />
                  <span className="text-xs font-mono-numbers text-blue-700 dark:text-blue-300 font-semibold">
                    {processingStatus}
                  </span>
                </div>
              )}

              {/* Order Confirmation CTA */}
              <div className="pt-2">
                <button
                  disabled={isProcessing}
                  onClick={handleConfirmOrder}
                  className="w-full py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-[#2563EB]/50 text-white font-mono-numbers text-xs uppercase tracking-wider font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.99]"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isProcessing ? 'Processing Transaction...' : `Pay ₹${totalAmount.toLocaleString('en-IN')} & Place Order`}
                  </span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
