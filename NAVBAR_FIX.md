# Fix Navbar Freeze & Line Numbers

## Masalah Yang Diperbaiki

### 1. ❌ Navbar Freeze Saat Diklik
**Penyebab:**
- `scrollIntoView` dengan `behavior: 'smooth'` menyebabkan conflict dengan IntersectionObserver
- Scroll event terus-menerus trigger observer, menyebabkan infinite loop

**Solusi:** ✅
```typescript
// SEBELUM (menyebabkan freeze):
element.scrollIntoView({ behavior: 'smooth', block: 'start' });

// SESUDAH (smooth tanpa freeze):
const offsetTop = element.offsetTop - 80;
contentRef.current.scrollTo({
  top: offsetTop,
  behavior: 'smooth'
});
```

### 2. ❌ Line Numbers Tidak Sesuai Akhir Section
**Penyebab:**
- Menghitung berdasarkan `scrollHeight` yang include space kosong
- Tidak memperhitungkan posisi section terakhir

**Solusi:** ✅
```typescript
// SEBELUM:
const contentHeight = contentRef.current.scrollHeight;
const calculatedLines = Math.ceil(contentHeight / 24);

// SESUDAH (hitung dari section terakhir):
const sections = contentRef.current.querySelectorAll('section');
const lastSection = sections[sections.length - 1];
const lastSectionBottom = lastSection.offsetTop + lastSection.offsetHeight;
const calculatedLines = Math.ceil(lastSectionBottom / 24);
```

## Perubahan Detail

### 1. handleNavClick (Scroll Behavior)
```typescript
const handleNavClick = (id: string) => {
  const element = document.getElementById(id);
  if (element && contentRef.current) {
    const offsetTop = element.offsetTop - 80; // 80px offset untuk header
    contentRef.current.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
    setActiveSection(id);
  }
  setSidebarOpen(false);
};
```

**Keuntungan:**
- ✅ Tidak freeze
- ✅ Smooth scroll tetap berfungsi
- ✅ Active section langsung update
- ✅ Tidak conflict dengan IntersectionObserver

### 2. Line Count Calculation
```typescript
useEffect(() => {
  const updateLineCount = () => {
    if (contentRef.current) {
      const sections = contentRef.current.querySelectorAll('section');
      if (sections.length > 0) {
        const lastSection = sections[sections.length - 1];
        const lastSectionBottom = lastSection.offsetTop + lastSection.offsetHeight;
        const calculatedLines = Math.ceil(lastSectionBottom / 24);
        setLineCount(Math.max(calculatedLines, 50));
      }
    }
  };
  
  updateLineCount();
  window.addEventListener('resize', updateLineCount);
  
  const observer = new MutationObserver(updateLineCount);
  if (contentRef.current) {
    observer.observe(contentRef.current, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
  }
  
  // Update after delay for images/dynamic content
  const timeout = setTimeout(updateLineCount, 1000);
  
  return () => { 
    window.removeEventListener('resize', updateLineCount); 
    observer.disconnect();
    clearTimeout(timeout);
  };
}, [children]);
```

**Keuntungan:**
- ✅ Line numbers akurat sesuai akhir section
- ✅ Auto-update saat konten berubah
- ✅ Support untuk dynamic content (images, etc)
- ✅ Update saat resize window

### 3. IntersectionObserver Fix
```typescript
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          const id = entry.target.id;
          if (id) {
            setActiveSection(id);
          }
        }
      });
    },
    { 
      threshold: [0, 0.3, 0.5, 0.7, 1], 
      rootMargin: '-80px 0px -50% 0px',
      root: contentRef.current // ← PENTING: gunakan contentRef
    }
  );
  
  // Wait for content ready
  const timeoutId = setTimeout(() => {
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));
  }, 100);
  
  return () => {
    clearTimeout(timeoutId);
    observer.disconnect();
  };
}, []);
```

**Keuntungan:**
- ✅ Observer bound ke scroll container yang benar
- ✅ Tidak conflict dengan smooth scroll
- ✅ Auto-detect section saat scroll manual

### 4. Scroll Progress Fix
```typescript
useEffect(() => {
  const handleScroll = () => {
    if (contentRef.current) {
      const scrollTop = contentRef.current.scrollTop;
      const scrollHeight = contentRef.current.scrollHeight - contentRef.current.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    }
  };
  
  const content = contentRef.current;
  if (content) {
    content.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    return () => content.removeEventListener('scroll', handleScroll);
  }
}, []);
```

**Keuntungan:**
- ✅ Passive event listener (better performance)
- ✅ Initial calculation saat mount
- ✅ Clamping 0-100% (no negative/overflow)

## Testing

### Test Navigation:
1. ✅ Klik sidebar item → smooth scroll tanpa freeze
2. ✅ Active indicator update instantly
3. ✅ Scroll manual → active indicator follow section
4. ✅ Mobile menu → close setelah click

### Test Line Numbers:
1. ✅ Line numbers sesuai dengan akhir section terakhir
2. ✅ Auto-update saat resize window
3. ✅ Auto-update saat content berubah
4. ✅ Minimum 50 lines

### Test Performance:
1. ✅ No freeze saat navigation
2. ✅ Smooth 60fps scroll
3. ✅ No memory leak (observer cleanup)
4. ✅ Passive scroll listener

## Build Status
✅ Build berhasil tanpa error
✅ TypeScript compilation passed
✅ All routes generated successfully

## Cara Test
```bash
npm run dev
```

Kemudian:
1. Klik item di sidebar → harus smooth scroll tanpa freeze
2. Scroll manual → active indicator harus berubah
3. Check line numbers → harus sesuai akhir section terakhir
4. Resize window → line numbers auto-update
