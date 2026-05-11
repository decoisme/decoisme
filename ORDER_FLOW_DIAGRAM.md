# 📊 Order Flow Diagram

## Complete User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                         HOMEPAGE                                 │
│                    (localhost:3000)                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ User scrolls down
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PRICING SECTION                               │
│  ┌──────────┐  ┌──────────────┐  ┌──────────┐                  │
│  │  Single  │  │  CAROUSEL ⭐ │  │  Custom  │                  │
│  │   Post   │  │   (Popular)  │  │  Package │                  │
│  │ Rp 30k   │  │   Rp 60k     │  │  Custom  │                  │
│  │          │  │              │  │          │                  │
│  │ [Order]  │  │[Order Carousel]│ │ [Order]  │                  │
│  └──────────┘  └──────┬───────┘  └──────────┘                  │
└─────────────────────────┼────────────────────────────────────────┘
                          │
                          │ Click "Order Carousel"
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ORDER PAGE (/order)                           │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  PROGRESS: [1]──[2]──[3]──[4]                          │    │
│  │           Package Modifiers Info Review                 │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ╔══════════════════════════════════════════════════════╗      │
│  ║              STEP 1: PACKAGE SELECTION               ║      │
│  ╠══════════════════════════════════════════════════════╣      │
│  ║  Base Package: Up to 3 slides = Rp 60.000           ║      │
│  ║                                                       ║      │
│  ║  Jumlah Slides:                                      ║      │
│  ║  ┌───┐     ┌─────┐     ┌───┐                        ║      │
│  ║  │ - │     │  3  │     │ + │                        ║      │
│  ║  └───┘     └─────┘     └───┘                        ║      │
│  ║                                                       ║      │
│  ║  Extra slides: +Rp 10k/slide                        ║      │
│  ║                                                       ║      │
│  ║                          [Lanjut →]                  ║      │
│  ╚══════════════════════════════════════════════════════╝      │
└─────────────────────────────────────────────────────────────────┘
                          │
                          │ Click "Lanjut"
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  ╔══════════════════════════════════════════════════════╗      │
│  ║              STEP 2: MODIFIERS                       ║      │
│  ╠══════════════════════════════════════════════════════╣      │
│  ║  📈 TAMBAHAN (Opsional):                            ║      │
│  ║  ☐ ⚡ Express <24 jam (+50%)                        ║      │
│  ║  ☐ 💡 Konsep dari nol (+Rp 25k)                    ║      │
│  ║                                                       ║      │
│  ║  📉 DISKON (Jika Tersedia):                         ║      │
│  ║  ☐ 🎨 Brand guidelines lengkap (-Rp 10k)           ║      │
│  ║  ☐ 🖼️ Assets ready (-Rp 5k)                        ║      │
│  ║  ☐ ✍️ Copywriting ready (-Rp 5k)                   ║      │
│  ║                                                       ║      │
│  ║  [← Kembali]              [Lanjut →]                ║      │
│  ╚══════════════════════════════════════════════════════╝      │
└─────────────────────────────────────────────────────────────────┘
                          │
                          │ Click "Lanjut"
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  ╔══════════════════════════════════════════════════════╗      │
│  ║              STEP 3: CLIENT INFO                     ║      │
│  ╠══════════════════════════════════════════════════════╣      │
│  ║  Nama Lengkap: *                                     ║      │
│  ║  [_____________________]                             ║      │
│  ║                                                       ║      │
│  ║  Email: *                                            ║      │
│  ║  [_____________________]                             ║      │
│  ║                                                       ║      │
│  ║  WhatsApp: *                                         ║      │
│  ║  [_____________________]                             ║      │
│  ║                                                       ║      │
│  ║  Deskripsi Project: *                                ║      │
│  ║  [_____________________]                             ║      │
│  ║  [_____________________]                             ║      │
│  ║  [_____________________]                             ║      │
│  ║                                                       ║      │
│  ║  [← Kembali]              [Lanjut →]                ║      │
│  ╚══════════════════════════════════════════════════════╝      │
└─────────────────────────────────────────────────────────────────┘
                          │
                          │ Click "Lanjut"
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  ╔══════════════════════════════════════════════════════╗      │
│  ║              STEP 4: REVIEW & SUBMIT                 ║      │
│  ╠══════════════════════════════════════════════════════╣      │
│  ║  Package Details:                                    ║      │
│  ║  • Carousel Post (5 slides)      Rp 60.000          ║      │
│  ║  • Extra 2 slides               +Rp 20.000          ║      │
│  ║  • Express Delivery             +Rp 30.000          ║      │
│  ║  • Konsep dari Nol              +Rp 25.000          ║      │
│  ║  • Brand Guidelines             -Rp 10.000          ║      │
│  ║  ─────────────────────────────────────────          ║      │
│  ║  ESTIMASI TOTAL:                Rp 125.000          ║      │
│  ║                                                       ║      │
│  ║  Contact Info:                                       ║      │
│  ║  • Nama: John Doe                                    ║      │
│  ║  • Email: john@example.com                           ║      │
│  ║  • WhatsApp: 08123456789                             ║      │
│  ║                                                       ║      │
│  ║  Project Description:                                ║      │
│  ║  Butuh design carousel untuk...                     ║      │
│  ║                                                       ║      │
│  ║  [← Kembali]    [💬 Kirim via WhatsApp]             ║      │
│  ╚══════════════════════════════════════════════════════╝      │
│                                                                  │
│  ┌────────────────────────────────────────────────────┐        │
│  │  💰 Estimasi: Rp 125.000  (Sticky Bottom)          │        │
│  └────────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────────┘
                          │
                          │ Click "Kirim via WhatsApp"
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      WHATSAPP                                    │
│  ┌────────────────────────────────────────────────────┐        │
│  │  To: +62 812-3456-7890                             │        │
│  │                                                     │        │
│  │  *Order Carousel Post Design*                      │        │
│  │                                                     │        │
│  │  *Detail Order:*                                   │        │
│  │  • Jumlah Slides: 5 slides                         │        │
│  │  • Express Delivery: Ya (<24 jam)                  │        │
│  │  • Konsep dari Nol: Ya                             │        │
│  │  • Brand Guidelines: Sudah ada                     │        │
│  │                                                     │        │
│  │  *Estimasi Harga: Rp 125.000*                      │        │
│  │                                                     │        │
│  │  *Info Client:*                                    │        │
│  │  • Nama: John Doe                                  │        │
│  │  • Email: john@example.com                         │        │
│  │  • Phone: 08123456789                              │        │
│  │                                                     │        │
│  │  *Deskripsi Project:*                              │        │
│  │  Butuh design carousel untuk promosi produk...    │        │
│  │                                                     │        │
│  │  [Send]                                            │        │
│  └────────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────────┘
                          │
                          │ Client sends message
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                   YOUR WHATSAPP                                  │
│  ┌────────────────────────────────────────────────────┐        │
│  │  From: John Doe (+62 812-3456-7890)                │        │
│  │                                                     │        │
│  │  *Order Carousel Post Design*                      │        │
│  │  [Full order details...]                           │        │
│  │                                                     │        │
│  │  ✅ You can now:                                   │        │
│  │  • Confirm order                                   │        │
│  │  • Discuss details                                 │        │
│  │  • Send payment info                               │        │
│  │  • Start working                                   │        │
│  └────────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Price Calculation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRICE CALCULATOR                              │
└─────────────────────────────────────────────────────────────────┘

BASE_PRICE = Rp 60.000 (up to 3 slides)
BASE_SLIDES = 3

┌─────────────────────────────────────────────────────────────────┐
│  STEP 1: Calculate Extra Slides                                 │
│  ─────────────────────────────────────────────────────────────  │
│  IF slideCount > 3:                                             │
│    extraSlides = slideCount - 3                                 │
│    extraSlidesPrice = extraSlides × 10.000                      │
│  ELSE:                                                           │
│    extraSlidesPrice = 0                                         │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 2: Calculate Positive Modifiers                           │
│  ─────────────────────────────────────────────────────────────  │
│  IF isExpress = true:                                           │
│    expressPrice = BASE_PRICE × 0.5                              │
│  ELSE:                                                           │
│    expressPrice = 0                                             │
│                                                                  │
│  IF needsConcept = true:                                        │
│    conceptPrice = 25.000                                        │
│  ELSE:                                                           │
│    conceptPrice = 0                                             │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 3: Calculate Negative Modifiers (Discounts)               │
│  ─────────────────────────────────────────────────────────────  │
│  IF hasBrandGuidelines = true:                                  │
│    brandGuidelinesDiscount = -10.000                            │
│  ELSE:                                                           │
│    brandGuidelinesDiscount = 0                                  │
│                                                                  │
│  IF hasAssets = true:                                           │
│    assetsDiscount = -5.000                                      │
│  ELSE:                                                           │
│    assetsDiscount = 0                                           │
│                                                                  │
│  IF hasCopywriting = true:                                      │
│    copywritingDiscount = -5.000                                 │
│  ELSE:                                                           │
│    copywritingDiscount = 0                                      │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 4: Calculate Total                                        │
│  ─────────────────────────────────────────────────────────────  │
│  totalPrice = BASE_PRICE                                        │
│             + extraSlidesPrice                                  │
│             + expressPrice                                      │
│             + conceptPrice                                      │
│             + brandGuidelinesDiscount                           │
│             + assetsDiscount                                    │
│             + copywritingDiscount                               │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  RESULT: Display formatted price                                │
│  ─────────────────────────────────────────────────────────────  │
│  formatPrice(totalPrice) → "Rp XXX.XXX"                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Example Scenarios

### Scenario A: Minimum Order
```
Base (3 slides)                = Rp  60.000
Brand guidelines ready         = -Rp 10.000
Assets ready                   = -Rp  5.000
Copywriting ready              = -Rp  5.000
────────────────────────────────────────────
TOTAL                          = Rp  40.000
```

### Scenario B: Standard Order
```
Base (3 slides)                = Rp  60.000
Extra 2 slides (5 total)       = +Rp 20.000
────────────────────────────────────────────
TOTAL                          = Rp  80.000
```

### Scenario C: Premium Rush Order
```
Base (3 slides)                = Rp  60.000
Extra 7 slides (10 total)      = +Rp 70.000
Express delivery (<24h)        = +Rp 30.000 (50%)
Konsep dari nol                = +Rp 25.000
────────────────────────────────────────────
TOTAL                          = Rp 185.000
```

### Scenario D: Balanced Order
```
Base (3 slides)                = Rp  60.000
Extra 2 slides (5 total)       = +Rp 20.000
Konsep dari nol                = +Rp 25.000
Brand guidelines ready         = -Rp 10.000
────────────────────────────────────────────
TOTAL                          = Rp  95.000
```

---

## State Management Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  INITIAL STATE                                                   │
│  ─────────────────────────────────────────────────────────────  │
│  step: 1                                                         │
│  formData: {                                                     │
│    packageType: 'carousel',                                      │
│    slideCount: 3,                                                │
│    isExpress: false,                                             │
│    needsConcept: false,                                          │
│    hasBrandGuidelines: false,                                    │
│    hasAssets: false,                                             │
│    hasCopywriting: false,                                        │
│    name: '',                                                     │
│    email: '',                                                    │
│    phone: '',                                                    │
│    projectDescription: ''                                        │
│  }                                                               │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  USER INTERACTIONS                                               │
│  ─────────────────────────────────────────────────────────────  │
│  • Click +/- buttons → Update slideCount                        │
│  • Check/uncheck modifiers → Update boolean flags               │
│  • Type in inputs → Update text fields                          │
│  • Click "Lanjut" → Increment step                              │
│  • Click "Kembali" → Decrement step                             │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  REACTIVE UPDATES                                                │
│  ─────────────────────────────────────────────────────────────  │
│  • Price recalculates on every formData change                  │
│  • Sticky price preview updates in real-time                    │
│  • Progress indicator reflects current step                     │
│  • Form validation checks required fields                       │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  SUBMIT                                                          │
│  ─────────────────────────────────────────────────────────────  │
│  • Generate WhatsApp message from formData                      │
│  • Encode message for URL                                       │
│  • Open WhatsApp with pre-filled message                        │
└─────────────────────────────────────────────────────────────────┘
```

---

**Visual Guide Version:** 1.0.0  
**Last Updated:** May 11, 2026  
**Status:** ✅ Complete
