# Fix Active Section Auto-Update

## Masalah
Ketika scroll ke section berbeda, navbar di sidebar tidak otomatis update (highlight tidak berpindah).

## Penyebab
IntersectionObserver tidak bekerja dengan baik untuk scroll detection di dalam scrollable container (`contentRef`).

## Solusi ✅

Menggabungkan scroll detection langsung di `handleScroll`:

```typescript
useEffect(() => {
  const handleScroll = () => {
    if (contentRef.current) {
      const scrollTop = contentRef.current.scrollTop;
      const scrollHeight = contentRef.current.scrollHeight - contentRef.current.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
      
      // 🎯 Auto-detect active section
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'home';
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 120; // offset header
        const sectionBottom = sectionTop + (section as HTMLElement).offsetHeight;
        
        if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
          currentSection = section.id;
        }
      });
      
      setActiveSection(currentSection);
    }
  };
  
  const content = contentRef.current;
  if (content) {
    content.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => content.removeEventListener('scroll', handleScroll);
  }
}, []);
```

## Cara Kerja

1. **Setiap kali scroll**, fungsi `handleScroll` dijalankan
2. **Loop semua sections** dengan `querySelectorAll('section[id]')`
3. **Hitung posisi section**: 
   - `sectionTop = offsetTop - 120` (120px offset untuk header + padding)
   - `sectionBottom = sectionTop + offsetHeight`
4. **Cek posisi scroll saat ini** (`scrollTop`)
5. **Jika `scrollTop` berada di antara `sectionTop` dan `sectionBottom`**, set sebagai active section
6. **Update `activeSection` state** → sidebar auto-highlight

## Keuntungan

✅ **Real-time update** - Active section langsung berubah saat scroll
✅ **Akurat** - Menghitung posisi exact dari setiap section
✅ **Smooth** - Tidak ada delay atau lag
✅ **Simple** - Tidak perlu IntersectionObserver yang complex
✅ **Performance** - Passive event listener

## Testing

1. ✅ Scroll manual → Active navbar item berubah otomatis
2. ✅ Klik navbar item → Smooth scroll + highlight update
3. ✅ Tab bar di atas → Update dengan nama file yang sesuai
4. ✅ Scroll progress bar → Update real-time

## Build Status
✅ Build berhasil
✅ No errors
✅ Ready to deploy
