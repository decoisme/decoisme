# 💰 Pricing Section - Freelance Design Services

## ✅ Section Baru Sudah Ditambahkan!

Saya sudah membuat section **Pricing** untuk menampilkan pricelist freelance design Instagram feed Anda.

---

## 📋 Apa yang Ditambahkan?

### **1. Pricing Section Component**
File: `components/sections/pricing-section.tsx`

**Fitur:**
- ✅ 3 paket pricing (Single Post, Carousel, Custom)
- ✅ Animasi parallax saat scroll
- ✅ Hover effects yang smooth
- ✅ Badge "POPULAR" untuk paket terpopuler
- ✅ Gradient icons untuk setiap paket
- ✅ List features dengan checkmark
- ✅ CTA button "Order Now" yang link ke #contact
- ✅ Bonus info card
- ✅ Stats section (2x revisi, 1-3 hari, 100% original)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode support

### **2. Paket Pricing**

#### **Single Post**
- **Harga:** Rp 30.000 (start from)
- **Icon:** Image
- **Gradient:** Yellow to Amber
- **Features:**
  - 1 Design feed Instagram
  - Format: 1080x1080px
  - Revisi 2x
  - File JPG/PNG
  - Delivery 1-2 hari

#### **Carousel Post** (POPULAR)
- **Harga:** Rp 60.000 (start from)
- **Icon:** Layers
- **Gradient:** Amber to Orange
- **Features:**
  - Up to 10 slides
  - Format: 1080x1080px
  - Revisi 2x
  - File JPG/PNG
  - Delivery 2-3 hari
  - Konsisten design
- **Badge:** POPULAR (highlighted dengan border amber)

#### **Custom Package**
- **Harga:** Custom (harga disesuaikan)
- **Icon:** Sparkles
- **Gradient:** Orange to Red
- **Features:**
  - Design feed Instagram
  - Story templates
  - Highlight covers
  - Reels thumbnail
  - Brand guidelines
  - Unlimited revisi

### **3. Bonus Section**
- Konsultasi gratis untuk paket Carousel & Custom
- Icon: Share2
- Background: Gradient amber

### **4. Stats Section**
- **2x** Revisi gratis
- **1-3** Hari pengerjaan
- **100%** Original design

---

## 🎨 Design Features

### **Visual Elements:**
1. **Gradient Backgrounds:**
   - Yellow → Amber → Orange → Red
   - Konsisten dengan color palette website

2. **Card Styling:**
   - Rounded corners (rounded-3xl)
   - Hover shadow effects
   - Border animations
   - Popular card scale up (105%)

3. **Icons:**
   - Gradient background per icon
   - Rounded square containers
   - White icon color

4. **Typography:**
   - Large price display (4xl-5xl)
   - Clear hierarchy
   - Readable descriptions

5. **Animations:**
   - Parallax scroll effect
   - Fade in on view
   - Staggered card animations
   - Hover scale effects

---

## 📱 Responsive Design

### **Mobile (< 768px):**
- Single column layout
- Full width cards
- Smaller text sizes
- Touch-friendly buttons

### **Tablet (768px - 1024px):**
- 2 column grid
- Medium card sizes
- Balanced spacing

### **Desktop (> 1024px):**
- 3 column grid
- Large card sizes
- Optimal spacing
- Parallax effects

---

## 🔗 Integration

### **1. Added to Homepage**
File: `app/page.tsx`
- Import PricingSection
- Placed between Skills and Contact sections

### **2. Added to Navbar**
File: `components/layout/navbar.tsx`
- Added "Pricing" link
- Links to #pricing anchor

### **3. Section Order:**
1. Hero
2. About
3. Projects
4. Skills
5. **Pricing** ← NEW
6. Contact

---

## 🎯 User Flow

1. **User scroll ke section Pricing**
2. **Melihat 3 paket dengan harga jelas**
3. **Paket "Carousel" highlighted sebagai POPULAR**
4. **Membaca features setiap paket**
5. **Klik "Order Now"** → Scroll ke Contact section
6. **Isi form contact** untuk order

---

## ✏️ Cara Customize

### **Mengubah Harga:**

Edit file `components/sections/pricing-section.tsx`:

```typescript
const pricingPlans = [
  {
    name: 'Single Post',
    price: '30.000', // ← Ubah di sini
    // ...
  },
  // ...
];
```

### **Menambah/Mengurangi Features:**

```typescript
features: [
  '1 Design feed Instagram',
  'Format: 1080x1080px',
  'Revisi 2x',
  // Tambah feature baru di sini
  'Feature baru',
],
```

### **Mengubah Paket Popular:**

```typescript
{
  name: 'Single Post',
  popular: true, // ← Ubah jadi true untuk highlight
  // ...
}
```

### **Mengubah Warna Gradient:**

```typescript
{
  gradient: 'from-blue-500 to-purple-600', // ← Ubah gradient
  // ...
}
```

### **Mengubah Bonus Text:**

```typescript
<p className="text-gray-700 dark:text-gray-300">
  <span className="font-semibold">Bonus:</span> Text bonus baru di sini
</p>
```

### **Mengubah Stats:**

```typescript
<div>
  <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">
    5x  {/* ← Ubah angka */}
  </div>
  <p className="text-sm text-gray-600 dark:text-gray-400">
    Revisi gratis  {/* ← Ubah text */}
  </p>
</div>
```

---

## 🚀 Testing

### **Step 1: Restart Server**
```bash
npm run dev
```

### **Step 2: Buka Homepage**
```
http://localhost:3000
```

### **Step 3: Scroll ke Section Pricing**
- Atau klik "Pricing" di navbar
- Atau scroll manual

### **Step 4: Test Features**
- ✅ Animasi parallax saat scroll
- ✅ Hover effects pada cards
- ✅ Badge "POPULAR" muncul
- ✅ Button "Order Now" link ke #contact
- ✅ Responsive di mobile/tablet/desktop
- ✅ Dark mode bekerja

---

## 📸 Preview

### **Desktop View:**
```
┌─────────────────────────────────────────────────────────────┐
│                    Freelance Design Services                 │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────┐      ┌──────────┐      ┌──────────┐          │
│  │ [Icon]   │      │ [Icon]   │      │ [Icon]   │          │
│  │          │      │ POPULAR  │      │          │          │
│  │ Single   │      │ Carousel │      │ Custom   │          │
│  │ Post     │      │ Post     │      │ Package  │          │
│  │          │      │          │      │          │          │
│  │ Rp 30k   │      │ Rp 60k   │      │ Custom   │          │
│  │          │      │          │      │          │          │
│  │ [Order]  │      │ [Order]  │      │ [Order]  │          │
│  └──────────┘      └──────────┘      └──────────┘          │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 🎁 Bonus: Konsultasi gratis untuk Carousel & Custom │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│     2x Revisi    |    1-3 Hari    |    100% Original        │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### **Mobile View:**
```
┌─────────────────┐
│ Freelance       │
│ Design Services │
├─────────────────┤
│                 │
│ ┌─────────────┐ │
│ │ [Icon]      │ │
│ │ Single Post │ │
│ │ Rp 30k      │ │
│ │ [Order Now] │ │
│ └─────────────┘ │
│                 │
│ ┌─────────────┐ │
│ │ [Icon]      │ │
│ │ POPULAR     │ │
│ │ Carousel    │ │
│ │ Rp 60k      │ │
│ │ [Order Now] │ │
│ └─────────────┘ │
│                 │
│ ┌─────────────┐ │
│ │ [Icon]      │ │
│ │ Custom      │ │
│ │ Custom      │ │
│ │ [Order Now] │ │
│ └─────────────┘ │
│                 │
└─────────────────┘
```

---

## ✅ Checklist

- [x] Component created
- [x] Added to homepage
- [x] Added to navbar
- [x] Responsive design
- [x] Dark mode support
- [x] Animations working
- [x] CTA buttons functional
- [x] Build successful
- [x] Documentation created

---

## 🎉 Ready to Use!

Section Pricing sudah siap digunakan! 

**Next Steps:**
1. Restart development server
2. Buka http://localhost:3000
3. Scroll ke section Pricing atau klik "Pricing" di navbar
4. Test semua features
5. Customize sesuai kebutuhan

Jika ada yang ingin diubah atau ditambahkan, tinggal edit file `components/sections/pricing-section.tsx`!
