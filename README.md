# URBAN STREET — Own Your Style. Own the Street.

A high-converting, editorial e-commerce platform for **URBAN STREET**, a premium Indian streetwear clothing brand engineered in the Tiruppur textile corridor with brutalist aesthetics, warm ivory tones (`#F5F2EA`), and electric blue accents (`#1765F5`).

---

## ✨ Features

- **Editorial Brutalist Landing Page**:
  - Live announcement marquee with express Tamil Nadu logistics guarantee.
  - Warm Ivory (`#F5F2EA`) header with UB monogram badge, instant search pill, and live cart indicator.
  - Brutalist hero section featuring editorial photography, graffiti doodles, and bold typography (`BUILT FOR THE STREET_`).
  - **The New Drop (Drop 01)**: Horizontal split product cards with quick-add actions and pricing tags.
  - Visual category bento tiles and interactive catalog filter bar.

- **Dedicated Product Detail Pages (No Popups)**:
  - Deep-linkable URL hash routing (`#product-{slug}`) with browser history back/forward support.
  - Multi-angle high-resolution gallery with thumbnail switcher.
  - Technical fabric specs (400 GSM French Terry, Tiruppur combed cotton).
  - Dynamic size selector (`XS` to `XXL`) with live stock indicators and interactive **Size Guide modal**.
  - Quantity stepper, **Add to Bag**, and **Instant Checkout / Buy Now** triggers.
  - **Live Tamil Nadu Pincode Checker**: 24–48h express delivery verification across Chennai, Coimbatore, Madurai, and Tiruppur with doorstep COD & UPI.
  - Technical accordions for fabric details, silhouette & fit, garment care, and 7-day exchange policy.
  - Verified customer review system with star breakdowns and photo reviews.
  - Atelier pairing recommendations (*Complete the Look*).
  - Sticky mobile purchasing bar.

- **Complete E-Commerce Workflows**:
  - **Slide-over Cart Drawer**: Live free shipping threshold bar (`₹1,499`), quantity controls, and coupon code support (`VANAKKAM`).
  - **Multi-step Checkout Modal**: UPI (GPay, PhonePe, Paytm, QR code), Cash on Delivery (COD), and Card payments.
  - **Live Order Tracking**: Visual Shiprocket timeline with live order status progression.
  - **Customer Account Suite**: Saved addresses, order history, and re-order shortcuts.
  - **Store Management / Admin Dashboard**: Real-time sales metrics, product catalog CRUD, and order fulfillment status management.
  - **WhatsApp Concierge**: Floating customer care trigger pre-filled with order details.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4 + Custom Brand Design Tokens
- **Icons**: Lucide React
- **Typography**: Bebas Neue, Oswald, Inter, Permanent Marker, JetBrains Mono

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/DineshMurugan2022/urbanstreet.git
cd urbanstreet

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Build for Production

```bash
npm run build
```

The production-ready assets will be compiled into the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 🌐 Deploy to Production

### Deploying to Vercel (Recommended)

1. Push this repository to GitHub (`main` branch).
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import `DineshMurugan2022/urbanstreet`.
4. Framework preset: **Vite**.
5. Click **Deploy**.

### Deploying to Netlify

1. Go to [Netlify](https://www.netlify.com) and select **"Add new site"** -> **"Import an existing project"**.
2. Select GitHub and pick `DineshMurugan2022/urbanstreet`.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **Deploy Site**.

---

## 📄 License

MIT License. Designed & Developed for **URBAN STREET**.
