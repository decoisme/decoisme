# 🌍 I18N (INTERNATIONALIZATION) - IMPLEMENTATION GUIDE

## 🎯 STATUS: READY TO IMPLEMENT

Language toggle infrastructure telah **selesai dibuat**. Sekarang tinggal apply `useI18n()` hook ke semua sections.

---

## 📦 WHAT WAS CREATED

### **1. I18n Context & Provider** ✅
**File:** `lib/i18n.tsx`

**Features:**
- ✅ Context for language state management
- ✅ `useI18n()` hook untuk access language & translations
- ✅ `t()` function untuk translate keys
- ✅ localStorage persistence (save user preference)
- ✅ Complete translations (ID & EN)

**Usage:**
```tsx
import { useI18n } from '@/lib/i18n';

const { language, setLanguage, t } = useI18n();

// Get translation
const title = t('hero.title.line1'); // "UI/UX &"
```

---

### **2. Language Toggle Component** ✅
**File:** `components/ui/language-toggle.tsx`

**Features:**
- ✅ ID/EN toggle button
- ✅ Globe icon
- ✅ Instant black/white inversion (brutalist style)
- ✅ Glitch animation on language change
- ✅ Monospace uppercase font

**Design:**
```
[🌐] [ID] [EN]
     ^^^^^ active (black bg)
```

---

### **3. App Layout Updated** ✅
**File:** `app/layout.tsx`

**Changes:**
- ✅ Wrapped with `<I18nProvider>`
- ✅ All children now have access to i18n

---

### **4. Navbar Updated** ✅
**File:** `components/layout/navbar.tsx`

**Changes:**
- ✅ Added `<LanguageToggle />` to desktop nav
- ✅ Positioned after nav items

---

## 🔑 TRANSLATION KEYS

### **Hero Section**
```
hero.title.line1      → "UI/UX &"
hero.title.line2      → "Presentation"
hero.title.line3      → "Designer"
hero.subtitle         → "Instagram Content • PowerPoint • Web Design"
hero.description      → "Design yang bikin brand kamu stand out..."
hero.cta.projects     → "View Projects"
hero.cta.contact      → "Get in Touch"
```

### **Features Section**
```
features.label        → "Why Choose Me"
features.title.line1  → "What Makes"
features.title.line2  → "Me Different"
features.description  → "Fast, affordable, dan hasil..."
features.item1.title  → "Creative Design"
features.item1.desc   → "Design yang eye-catching..."
... (6 items total)
```

### **About Section**
```
about.description     → "Hi! I'm a creative designer..."
about.location.label  → "Location"
about.location.value  → "Jakarta Selatan, Indonesia" (ID)
                      → "South Jakarta, Indonesia" (EN)
```

### **Pricing Section**
```
pricing.label         → "Pricing"
pricing.title.line1   → "Simple,"
pricing.title.line2   → "Transparent"
pricing.title.line3   → "Pricing"
pricing.description   → "Harga design yang affordable..."
```

### **FAQ Section**
```
faq.label            → "// FAQ.TXT"
faq.title.line1      → "Frequently"
faq.title.line2      → "Asked"
faq.title.line3      → "Questions"
faq.description      → "Pertanyaan yang sering ditanyakan..."
faq.cta.title        → "Masih ada pertanyaan?"
faq.cta.description  → "Jangan ragu untuk chat..."
faq.cta.button       → "CHAT VIA WHATSAPP →"
```

### **Contact Section**
```
contact.label         → "Let's Talk"
contact.title.line1   → "Ready to Start"
contact.title.line2   → "Your Project?"
contact.description   → "Ada project di pikiran?..."
contact.form.name     → "Name"
contact.form.email    → "Email"
contact.form.message  → "Message"
contact.form.submit   → "Send Message"
contact.form.sending  → "Sending..."
contact.info.email    → "Email"
contact.info.phone    → "Phone"
contact.info.location → "Location"
```

---

## 🔧 HOW TO IMPLEMENT

### **Step 1: Import Hook**
```tsx
import { useI18n } from '@/lib/i18n';
```

### **Step 2: Use Hook**
```tsx
export function YourComponent() {
  const { t } = useI18n();
  
  // ...
}
```

### **Step 3: Replace Text with `t()`**
```tsx
// Before
<h2>Ready to Start Your Project?</h2>

// After
<h2>{t('contact.title.line1')}</h2>
```

---

## 📝 EXAMPLE: Hero Section

### **Before:**
```tsx
<motion.h1>
  <GlitchText>UI/UX &</GlitchText>
  <br />
  <GlitchText>Presentation</GlitchText>
  <br />
  <GlitchText>Designer</GlitchText>
</motion.h1>

<motion.p>
  Instagram Content • PowerPoint • Web Design
</motion.p>

<motion.p>
  Design yang bikin brand kamu stand out...
</motion.p>
```

### **After:**
```tsx
import { useI18n } from '@/lib/i18n';

export function HeroSection() {
  const { t } = useI18n();
  
  return (
    <>
      <motion.h1>
        <GlitchText>{t('hero.title.line1')}</GlitchText>
        <br />
        <GlitchText>{t('hero.title.line2')}</GlitchText>
        <br />
        <GlitchText>{t('hero.title.line3')}</GlitchText>
      </motion.h1>

      <motion.p>
        {t('hero.subtitle')}
      </motion.p>

      <motion.p>
        {t('hero.description')}
      </motion.p>
    </>
  );
}
```

---

## 📂 FILES TO UPDATE

### **Priority 1 (Main Sections):**
- [ ] `components/sections/hero-section.tsx`
- [ ] `components/sections/features-showcase.tsx`
- [ ] `components/sections/about-bento.tsx`
- [ ] `components/sections/contact-modern.tsx`
- [ ] `components/sections/faq-brutalist.tsx`

### **Priority 2 (Supporting):**
- [ ] `components/sections/pricing-modern.tsx` (already has ID/EN toggle, just integrate)
- [ ] `components/sections/testimonials-brutalist.tsx`
- [ ] `components/layout/footer.tsx`

### **Optional:**
- [ ] `app/order/page.tsx` (order form labels)
- [ ] `app/admin/*` (admin panel - can stay English only)

---

## 🎨 DESIGN: Language Toggle Location

### **Desktop:**
```
┌─────────────────────────────────────────────┐
│ Decoisme  Home About ... FAQ Contact [🌐][ID][EN] │
└─────────────────────────────────────────────┘
```

### **Mobile:**
Will be added to mobile menu later (optional)

---

## 🚀 IMPLEMENTATION PRIORITY

### **Phase 1: Core Sections (30 min)**
1. Hero Section
2. Features Section
3. About Section
4. Contact Section
5. FAQ Section

### **Phase 2: Testing (10 min)**
1. Toggle ID/EN → verify all text changes
2. Test localStorage (refresh page → language persists)
3. Test responsive (mobile/desktop)

### **Phase 3: Polish (20 min)**
1. Add mobile language toggle (if needed)
2. Add transition animations (optional)
3. Test all edge cases

---

## 💡 BEST PRACTICES

### **DO:**
- ✅ Use `t()` for all user-facing text
- ✅ Keep translation keys organized by section
- ✅ Test both languages after implementation
- ✅ Keep special characters in translations (•, →, etc.)

### **DON'T:**
- ❌ Hardcode text strings
- ❌ Mix translation keys with regular strings
- ❌ Forget to test mobile view
- ❌ Change brutalist design (keep instant transitions)

---

## 🐛 TROUBLESHOOTING

### **Language toggle not working?**
1. Check if `<I18nProvider>` wraps app in `layout.tsx`
2. Verify `useI18n()` is called inside component (not outside)
3. Check browser console for errors

### **Text not translating?**
1. Verify translation key exists in `lib/i18n.tsx`
2. Check spelling of key (case-sensitive)
3. Make sure component is wrapped by provider

### **Language not persisting?**
1. Check localStorage in DevTools
2. Verify `useEffect` in `I18nProvider` is running
3. Clear cache and test again

---

## ✅ COMPLETION CHECKLIST

- [x] Create i18n context & provider
- [x] Create language toggle component
- [x] Add to app layout
- [x] Add to navbar
- [ ] Update hero section
- [ ] Update features section
- [ ] Update about section
- [ ] Update contact section
- [ ] Update FAQ section
- [ ] Test ID/EN toggle
- [ ] Test localStorage
- [ ] Test mobile view
- [ ] Verify no TypeScript errors
- [ ] Build successful

---

## 🎯 ESTIMATED TIME

**Total:** 1-1.5 hours

**Breakdown:**
- Infrastructure (done): ✅
- Update 5 main sections: 30 min
- Testing & bug fixes: 20 min
- Polish & documentation: 10 min

---

## 📖 NEXT STEPS

### **Option A: Full Implementation (Recommended)**
Apply `useI18n()` to all 5 main sections for complete bilingual site.

### **Option B: Partial Implementation**
Apply only to hero + contact sections for MVP, expand later.

### **Option C: Manual Update**
I provide the guide, you update sections yourself at your own pace.

---

**Which option do you prefer?** 🤔

I can implement all sections now (~30 min) atau kamu mau coba implement sendiri using this guide?
