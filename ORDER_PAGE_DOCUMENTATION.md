# 📋 Order Page Documentation

## Overview
Halaman order carousel post dengan multi-step form yang interaktif dan user-friendly. Menggantikan floating calculator dengan pengalaman yang lebih lengkap dan profesional.

---

## ✨ Features

### 1. **Multi-Step Form (4 Steps)**
- **Step 1: Package Selection** - Pilih jumlah slides
- **Step 2: Modifiers** - Tambahan & diskon
- **Step 3: Client Info** - Data kontak client
- **Step 4: Review & Submit** - Review order sebelum kirim

### 2. **Price Calculator**
#### Base Price
- **Carousel Post**: Rp 60.000 (up to 3 slides)

#### Positive Modifiers (Menambah Harga)
- Extra slides: **+Rp 10.000/slide** (di atas 3 slides)
- Express delivery (<24 jam): **+50%** dari base price
- Konsep dari nol: **+Rp 25.000**

#### Negative Modifiers (Diskon)
- Brand guidelines lengkap: **-Rp 10.000**
- Semua asset ready: **-Rp 5.000**
- Copywriting sudah disiapin: **-Rp 5.000**

### 3. **Real-time Price Preview**
- Sticky price indicator di bottom screen
- Update otomatis setiap ada perubahan
- Format currency Indonesia (Rp)

### 4. **WhatsApp Integration**
- Auto-generate message dengan detail order
- Include estimasi harga
- Include info client & deskripsi project
- Direct link ke WhatsApp

### 5. **UI/UX Features**
- Smooth animations dengan Framer Motion
- Progress indicator dengan visual feedback
- Responsive design (mobile-first)
- Dark mode support
- Form validation
- Disabled state untuk incomplete forms

---

## 🎨 Design Elements

### Color Scheme
- Primary: Yellow-Amber gradient (`from-yellow-600 to-amber-600`)
- Success: Green gradient (`from-green-600 to-emerald-600`)
- Accent: Amber-600
- Background: Gradient from yellow-50 to amber-50 (light mode)

### Icons (Lucide React)
- `Layers` - Package indicator
- `Clock` - Express delivery
- `Lightbulb` - Konsep dari nol
- `Palette` - Brand guidelines
- `Image` - Assets
- `FileText` - Copywriting
- `MessageCircle` - WhatsApp submit
- `Calculator` - Modifiers section
- `Check` - Completed steps & features

### Animations
- Page transitions: Slide in/out
- Progress steps: Color transitions
- Price preview: Slide up from bottom
- Hover effects: Scale & color changes

---

## 🔗 Integration Points

### 1. **Pricing Section**
File: `decoisme/components/sections/pricing-section.tsx`

**Changes Made:**
- Updated Carousel Post description: "up to 3 slides" (was 5)
- Changed button text for Carousel: "Order Carousel" (was "Order Now")
- Button links to `/order` page for Carousel Post
- Other packages still link to `#contact`

### 2. **Homepage**
File: `decoisme/app/page.tsx`

**Changes Made:**
- Removed `<PriceCalculator />` floating component
- Removed import for PriceCalculator
- Cleaner homepage without floating widget

### 3. **Order Page Route**
File: `decoisme/app/order/page.tsx`

**New File Created:**
- Full multi-step form implementation
- Client-side component with state management
- WhatsApp integration
- Responsive design

---

## 📱 User Flow

```
Homepage → Pricing Section → Click "Order Carousel" 
  ↓
Order Page (Step 1: Package)
  ↓
Step 2: Modifiers (Tambahan & Diskon)
  ↓
Step 3: Client Info (Nama, Email, Phone, Deskripsi)
  ↓
Step 4: Review Order
  ↓
Click "Kirim via WhatsApp" → Opens WhatsApp with pre-filled message
```

---

## 🔧 Technical Details

### State Management
```typescript
const [step, setStep] = useState(1);
const [formData, setFormData] = useState({
  packageType: 'carousel',
  slideCount: 3,
  isExpress: false,
  needsConcept: false,
  hasBrandGuidelines: false,
  hasAssets: false,
  hasCopywriting: false,
  name: '',
  email: '',
  phone: '',
  projectDescription: '',
});
```

### Price Calculation Logic
```typescript
const BASE_PRICE = 60000;
const BASE_SLIDES = 3;

const extraSlides = Math.max(0, formData.slideCount - BASE_SLIDES);
const extraSlidesPrice = extraSlides * 10000;
const expressPrice = formData.isExpress ? BASE_PRICE * 0.5 : 0;
const conceptPrice = formData.needsConcept ? 25000 : 0;
const brandGuidelinesDiscount = formData.hasBrandGuidelines ? -10000 : 0;
const assetsDiscount = formData.hasAssets ? -5000 : 0;
const copywritingDiscount = formData.hasCopywriting ? -5000 : 0;

const totalPrice = BASE_PRICE + extraSlidesPrice + expressPrice + conceptPrice + 
                   brandGuidelinesDiscount + assetsDiscount + copywritingDiscount;
```

### WhatsApp Message Format
```
*Order Carousel Post Design*

*Detail Order:*
• Jumlah Slides: X slides
• Express Delivery: Ya (<24 jam) [if selected]
• Konsep dari Nol: Ya [if selected]
• Brand Guidelines: Sudah ada [if selected]
• Assets: Sudah ready [if selected]
• Copywriting: Sudah disiapin [if selected]

*Estimasi Harga: Rp XX.XXX*

*Info Client:*
• Nama: [name]
• Email: [email]
• Phone: [phone]

*Deskripsi Project:*
[description]
```

---

## ⚙️ Configuration

### WhatsApp Number
**Current:** `6281234567890` (placeholder)

**To Update:**
1. Open `decoisme/app/order/page.tsx`
2. Find line: `const whatsappUrl = \`https://wa.me/6281234567890?text=...`
3. Replace with your actual WhatsApp number (format: 62XXXXXXXXXX)

Example:
```typescript
const whatsappUrl = `https://wa.me/628123456789?text=${encodeURIComponent(message)}`;
```

---

## 🧪 Testing Checklist

- [x] Build successful (no TypeScript errors)
- [x] Pricing section updated to "up to 3 slides"
- [x] Carousel button links to `/order` page
- [x] Floating calculator removed from homepage
- [ ] Test order page in browser
- [ ] Test all 4 steps navigation
- [ ] Test price calculation with different modifiers
- [ ] Test form validation
- [ ] Test WhatsApp integration with real number
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test dark mode
- [ ] Test animations

---

## 🚀 Next Steps

1. **Update WhatsApp Number**
   - Replace placeholder number with actual business number

2. **Test in Browser**
   - Run `npm run dev` in decoisme folder
   - Navigate to http://localhost:3000
   - Click "Order Carousel" button in Pricing section
   - Test complete flow

3. **Optional Enhancements**
   - Add email notification system
   - Add order tracking
   - Add payment gateway integration
   - Add order history for logged-in users
   - Add testimonials section
   - Add FAQ section

4. **Deploy**
   - Test on staging environment
   - Update environment variables if needed
   - Deploy to production (Vercel recommended)

---

## 📝 Notes

- Order page is fully client-side (no database integration yet)
- All data is sent via WhatsApp message
- No payment processing (manual payment arrangement)
- Form validation is basic (required fields only)
- Price is "estimasi" - final price confirmed via WhatsApp chat

---

## 🐛 Known Issues

None currently. Build successful ✅

---

## 📞 Support

For questions or issues:
1. Check this documentation
2. Review code comments in `decoisme/app/order/page.tsx`
3. Test in development mode first
4. Check browser console for errors

---

**Last Updated:** May 11, 2026
**Version:** 1.0.0
**Status:** ✅ Ready for Testing
