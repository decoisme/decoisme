# 📱 CARA GANTI NOMOR WHATSAPP

## 🎯 Quick Guide

Floating WhatsApp button sudah ditambahkan di kanan bawah website. Kamu perlu **ganti nomor WhatsApp** ke nomor kamu sendiri.

---

## 📂 FILE YANG PERLU DIEDIT

Ada **2 file** yang perlu diupdate:

### **1. WhatsApp Floating Button**
**File:** `components/ui/whatsapp-button.tsx`

**Line 10:**
```tsx
const whatsappNumber = '6281234567890'; // ← GANTI INI
```

### **2. FAQ Section (CTA Button)**
**File:** `components/sections/faq-brutalist.tsx`

**Line 154:**
```tsx
href="https://wa.me/6281234567890?text=..." // ← GANTI INI
```

---

## 🔧 CARA GANTI NOMOR

### **Format Nomor:**
```
Format: 62 + nomor tanpa 0 di depan

Contoh:
- Nomor HP: 0812-3456-7890
- Format WhatsApp: 6281234567890

Contoh lain:
- Nomor HP: 0857-9999-8888
- Format WhatsApp: 62857999988888
```

### **Rules:**
- ✅ Awali dengan `62` (kode Indonesia)
- ✅ Tanpa angka `0` di depan
- ✅ Tanpa spasi, dash, atau simbol
- ✅ Hanya angka saja

---

## 📝 STEP-BY-STEP

### **Step 1: Edit WhatsApp Button**

1. Buka file: `components/ui/whatsapp-button.tsx`
2. Cari line 10:
   ```tsx
   const whatsappNumber = '6281234567890';
   ```
3. Ganti dengan nomor kamu:
   ```tsx
   const whatsappNumber = '6285799998888'; // Ganti dengan nomor kamu
   ```
4. Save file

### **Step 2: Edit FAQ CTA Button**

1. Buka file: `components/sections/faq-brutalist.tsx`
2. Cari line 154 (di bagian bawah, section "Masih ada pertanyaan?"):
   ```tsx
   href="https://wa.me/6281234567890?text=..."
   ```
3. Ganti dengan nomor kamu:
   ```tsx
   href="https://wa.me/6285799998888?text=..."
   ```
4. Save file

### **Step 3: Test**

1. Restart dev server: `npm run dev`
2. Buka website: `http://localhost:3000`
3. Klik WhatsApp button di kanan bawah
4. Verify nomor yang muncul di WhatsApp sudah benar
5. Test juga button "CHAT VIA WHATSAPP" di FAQ section

---

## ✏️ CUSTOMIZE PESAN DEFAULT (OPTIONAL)

### **WhatsApp Button Default Message:**

**File:** `components/ui/whatsapp-button.tsx`

**Line 11:**
```tsx
const defaultMessage = 'Hi! Saya tertarik dengan jasa design. Bisa info lebih lanjut?';
```

**Ganti dengan pesan custom:**
```tsx
const defaultMessage = 'Hi! Saya mau tanya tentang jasa design...';
```

### **FAQ Button Default Message:**

**File:** `components/sections/faq-brutalist.tsx`

**Line 154:**
```tsx
href="https://wa.me/6285799998888?text=Hi!%20Saya%20ada%20pertanyaan%20tentang%20jasa%20design"
```

**Format:** Ganti text setelah `text=` (gunakan `%20` untuk spasi)

**Contoh:**
```tsx
href="https://wa.me/6285799998888?text=Halo!%20Mau%20order%20design%20Instagram"
```

---

## 🎨 CUSTOMIZE BUTTON STYLE (OPTIONAL)

### **Change Button Position:**

**File:** `components/ui/whatsapp-button.tsx`

**Line 23:**
```tsx
className="fixed bottom-8 right-8 z-50 ..."
```

**Options:**
- `bottom-8 right-8` → Kanan bawah (default)
- `bottom-8 left-8` → Kiri bawah
- `top-8 right-8` → Kanan atas
- `top-8 left-8` → Kiri atas

### **Change Button Size:**

**Line 23:**
```tsx
className="... px-4 py-3 ..."
```

**Options:**
- `px-4 py-3` → Medium (default)
- `px-6 py-4` → Large
- `px-3 py-2` → Small

---

## 🐛 TROUBLESHOOTING

### **Problem: Button tidak muncul**
**Solution:**
1. Check apakah `<WhatsAppButton />` sudah ditambahkan di `app/page.tsx`
2. Restart dev server: `npm run dev`
3. Hard refresh browser: `Ctrl + Shift + R`

### **Problem: Nomor WhatsApp salah**
**Solution:**
1. Verify format nomor: `62` + nomor tanpa `0` di depan
2. No spaces, no dashes, angka saja
3. Example: `6281234567890` ✅ NOT `62-0812-3456-7890` ❌

### **Problem: Klik button tapi tidak buka WhatsApp**
**Solution:**
1. Check apakah WhatsApp installed di device
2. Verify nomor format benar
3. Test di browser lain
4. Check console browser untuk error: `F12` → Console tab

---

## 📱 TEST CHECKLIST

Sebelum deploy, test semua:
- [ ] Klik floating WhatsApp button (kanan bawah)
- [ ] Verify nomor yang muncul benar
- [ ] Check default message muncul
- [ ] Test di mobile (responsive)
- [ ] Test di desktop
- [ ] Klik button "CHAT VIA WHATSAPP" di FAQ section
- [ ] Verify nomor sama di kedua button

---

## 📊 ANALYTICS (OPTIONAL)

Kalau mau track berapa banyak yang klik WhatsApp button, bisa add Google Analytics event:

```tsx
onClick={() => {
  // Track event
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'whatsapp_click', {
      event_category: 'engagement',
      event_label: 'floating_button',
    });
  }
}}
```

---

## ✅ QUICK CHECKLIST

- [ ] Ganti nomor di `whatsapp-button.tsx`
- [ ] Ganti nomor di `faq-brutalist.tsx`
- [ ] Verify format nomor benar (`62` + tanpa `0`)
- [ ] Test floating button (kanan bawah)
- [ ] Test FAQ button
- [ ] Verify default message muncul
- [ ] Test di mobile & desktop

---

**DONE!** 🎉

WhatsApp button sekarang siap pakai dengan nomor kamu!
