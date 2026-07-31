# 🌍 I18N QUICK REFERENCE GUIDE

## ✅ STATUS: COMPLETE - ALL 9 SECTIONS BILINGUAL

Website sudah fully bilingual! Ini quick reference untuk maintenance. 📚

---

## 🎯 CARA KERJA

### **User Experience:**
```
1. User open website → Default: Indonesian (ID)
2. Click [EN] di navbar → Semua text jadi English
3. Click [ID] di navbar → Semua text jadi Indonesian
4. Refresh page → Language preference tersimpan
```

### **Technical Flow:**
```
localStorage → Check saved language → Apply to all sections
```

---

## 📝 CARA EDIT TRANSLATIONS

### **File Location:**
```
c:\Users\WIN10\Downloads\Decoisme\decoisme\lib\i18n.tsx
```

### **Structure:**
```typescript
const translations = {
  id: {
    // Indonesian translations
    'hero.title.line1': 'UI/UX &',
    'hero.description': 'Design yang bikin...',
  },
  en: {
    // English translations
    'hero.title.line1': 'UI/UX &',
    'hero.description': 'Design that makes...',
  },
};
```

### **Cara Edit:**
1. Open `lib/i18n.tsx`
2. Find translation key yang mau diubah (e.g., `'hero.title.line1'`)
3. Edit value di Indonesian (line 17-130)
4. Edit value di English (line 132-260)
5. Save → Auto reload di dev mode

---

## 🔑 TRANSLATION KEY REFERENCE

### **✅ Sections Covered (9/9):**

#### **1. Hero Section**
```typescript
'hero.title.line1': 'UI/UX &'
'hero.title.line2': 'Presentation'
'hero.title.line3': 'Designer'
'hero.subtitle': 'Instagram Content • PowerPoint • Web Design'
'hero.description': 'Design yang bikin brand...'
'hero.cta.projects': 'View Projects'
'hero.cta.contact': 'Get in Touch'
```

#### **2. Features Section**
```typescript
'features.label': 'Why Choose Me'
'features.title.line1': 'What Makes'
'features.title.line2': 'Me Different'
'features.description': 'Fast, affordable...'
'features.item1.title': 'Creative Design'
'features.item1.desc': 'Design yang eye-catching...'
// ... item2-6 same pattern
```

#### **3. About Section**
```typescript
'about.description': 'Hi! I\'m a creative designer...'
'about.location.label': 'Location'
'about.location.value': 'Jakarta Selatan, Indonesia'
```

#### **4. Projects Section**
```typescript
'projects.label': 'Portfolio'
'projects.title.line1': 'Featured'
'projects.title.line2': 'Projects'
'projects.description': 'A collection of...'
'projects.filter.all': 'All'
'projects.empty': 'No projects found...'
```

#### **5. Skills Section**
```typescript
'skills.label': 'Expertise'
'skills.title.line1': 'Skills &'
'skills.title.line2': 'Capabilities'
'skills.description': 'Design-focused skillset...'
'skills.additional': 'Additional Skills'
'skills.focus': 'Primary Focus'
'skills.focusValue': 'UI/UX Design & Creative Direction'
```

#### **6. Logo Ticker**
```typescript
'logoTicker.label': '// CLIENT_LOGOS.MARQUEE'
'logoTicker.title': 'Trusted by Brands'
'logoTicker.loading': 'LOADING.LOGOS...'
'logoTicker.empty': 'NO.LOGOS.YET'
'logoTicker.stats.clients': 'CLIENTS'
'logoTicker.stats.projects': 'PROJECTS'
'logoTicker.stats.rating': 'RATING'
```

#### **7. Testimonials**
```typescript
'testimonials.label': '// CLIENT_FEEDBACK.TXT'
'testimonials.title.line1': 'Verified'
'testimonials.title.line2': 'Reviews'
'testimonials.description': 'Real feedback from...'
'testimonials.loading': 'LOADING.REVIEWS...'
'testimonials.empty': 'NO.REVIEWS.YET'
```

#### **8. FAQ Section**
```typescript
'faq.label': '// FAQ.TXT'
'faq.title.line1': 'Frequently'
'faq.title.line2': 'Asked'
'faq.title.line3': 'Questions'
'faq.description': 'Pertanyaan yang sering...'
'faq.cta.title': 'Masih ada pertanyaan?'
'faq.cta.description': 'Jangan ragu untuk chat...'
'faq.cta.button': 'CHAT VIA WHATSAPP →'
```

#### **9. Contact Section**
```typescript
'contact.label': 'Let\'s Talk'
'contact.title.line1': 'Ready to Start'
'contact.title.line2': 'Your Project?'
'contact.description': 'Ada project di pikiran?...'
'contact.form.name': 'Name'
'contact.form.email': 'Email'
'contact.form.message': 'Message'
'contact.form.submit': 'Send Message'
'contact.form.sending': 'Sending...'
'contact.info.email': 'Email'
'contact.info.phone': 'Phone'
'contact.info.location': 'Location'
```

---

## 🛠️ CARA TAMBAH SECTION BARU

### **Step 1: Add Translation Keys**
Open `lib/i18n.tsx`, add ke Indonesian & English:

```typescript
// Indonesian section (line ~130)
'newSection.title': 'Judul Baru',
'newSection.description': 'Deskripsi dalam Indo/English mix',

// English section (line ~260)
'newSection.title': 'New Title',
'newSection.description': 'Description in English',
```

### **Step 2: Use in Component**
Open your section component:

```tsx
'use client';

import { useI18n } from '@/lib/i18n';

export function NewSection() {
  const { t } = useI18n();
  
  return (
    <section>
      <h2>{t('newSection.title')}</h2>
      <p>{t('newSection.description')}</p>
    </section>
  );
}
```

### **Step 3: Test**
```bash
npm run dev
# Visit http://localhost:3000
# Toggle [ID]/[EN] → Check text changes
```

---

## 🎨 COPYWRITING GUIDELINES

### **Indonesian:**
- ✅ Natural Indo/English mix (conversational)
- ✅ Use: "kamu", "gue", "kok", "Let's"
- ✅ Tech terms in English: "design", "brand", "project"
- ✅ Casual & friendly tone

**Example:**
> "Design yang bikin brand kamu stand out. Dari Instagram posts yang engaging..."

### **English:**
- ✅ Professional but approachable
- ✅ Clear & direct communication
- ✅ International-friendly
- ✅ No slang or overly casual terms

**Example:**
> "Design that makes your brand stand out. From engaging Instagram posts..."

### **Both Languages:**
- ✅ Keep brutalist aesthetic (no fluff)
- ✅ Benefit-focused ("bikin brand stand out", "kualitas agency")
- ✅ Action-oriented ("Let's discuss", "Order Now")
- ✅ Transparent ("tanpa biaya tersembunyi", "no hidden fees")

---

## 🧪 TESTING CHECKLIST

### **After Edit, Always Test:**
```
1. npm run build → Check TypeScript errors
2. npm run dev → Test in browser
3. Click [ID] → Check Indonesian text correct
4. Click [EN] → Check English text correct
5. Refresh page → Verify language persists
6. Check mobile responsive
```

---

## 🚨 COMMON ISSUES & FIXES

### **Issue 1: Text Not Changing**
**Problem:** Edit translation tapi text tidak berubah

**Solution:**
1. Check translation key benar (typo?)
2. Restart dev server: `Ctrl+C` → `npm run dev`
3. Clear browser cache: `Ctrl+Shift+R`

---

### **Issue 2: TypeScript Error**
**Problem:** Build error setelah edit

**Solution:**
1. Check syntax di `lib/i18n.tsx`
2. Pastikan pakai single quote untuk string: `'hero.title'`
3. Escape apostrophe dalam text: `\'` → `Let\'s`
4. Run: `npm run build` untuk check error

---

### **Issue 3: Missing Translation**
**Problem:** Some text still in hardcoded language

**Solution:**
1. Find component file
2. Add translation key to `lib/i18n.tsx`
3. Replace hardcoded text with `{t('key.name')}`
4. Test both languages

---

## 📊 FILES TO KNOW

### **Core i18n Files:**
```
lib/i18n.tsx
  └─ Translation system (95+ keys)
  └─ Edit translations here

components/ui/language-toggle.tsx
  └─ [ID][EN] toggle button
  └─ Already complete, no need edit
```

### **All Sections Using i18n:**
```
✅ components/sections/hero-section.tsx
✅ components/sections/features-showcase.tsx
✅ components/sections/about-bento.tsx
✅ components/sections/projects-modern.tsx
✅ components/sections/skills-modern.tsx
✅ components/sections/logo-ticker-brutalist.tsx
✅ components/sections/testimonials-brutalist.tsx
✅ components/sections/faq-brutalist.tsx
✅ components/sections/contact-modern.tsx
```

---

## 💡 PRO TIPS

### **1. Keep Keys Organized**
Use dot notation: `section.element.type`
```typescript
'hero.title.line1'  // Good
'heroTitle1'        // Bad
```

### **2. Consistent Naming**
```typescript
'section.label'       // Section tag
'section.title.lineX' // Title (multi-line)
'section.description' // Paragraph text
'section.cta.button'  // Button text
```

### **3. Escape Special Characters**
```typescript
✅ 'Let\'s collaborate'
❌ 'Let's collaborate'  // Will break build

✅ 'Questions?'
✅ 'Ready to start?'
```

### **4. Test Both Languages**
Always check:
- Indonesian reads natural (not too formal)
- English sounds professional
- Both maintain same message/benefit
- Length roughly similar (UI won't break)

---

## 🎯 QUICK COMMANDS

### **Development:**
```bash
npm run dev          # Start dev server
npm run build        # Test production build
npm run start        # Run production locally
```

### **Check Status:**
```bash
npm run build        # 0 errors = good to deploy
```

---

## 📞 NEED HELP?

### **Documentation:**
- 📄 `I18N_FINAL_SUMMARY.md` - Complete overview
- 📄 `I18N_COMPLETE_ALL_SECTIONS.md` - Detailed phase 2 doc
- 📄 `I18N_IMPLEMENTATION_GUIDE.md` - Developer guide
- 📄 `I18N_QUICK_REFERENCE.md` - This file

### **Check Code:**
- Open `lib/i18n.tsx` - All translations
- Open any section file - See usage examples

---

## ✅ SUMMARY

**Current Status:**
- 🌍 9/9 sections bilingual (100%)
- 🔑 95+ translation keys
- ⚡ Instant language switching
- 💾 localStorage persistence
- 🎨 Brutalist design maintained
- ✅ Production ready

**To Edit Translations:**
1. Open `lib/i18n.tsx`
2. Find key & edit value (both ID & EN)
3. Save → Test → Deploy

**That's it!** 🎉

---

**Last Updated:** 2024-07-30
**Version:** 3.0.0
**Status:** ✅ Complete & Production Ready

