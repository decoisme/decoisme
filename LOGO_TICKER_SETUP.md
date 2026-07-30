# Logo Ticker Section - Setup Guide

## ✅ FITUR BARU: Client Logos Marquee

### 🎯 Apa yang Sudah Dibuat

**Component**: `components/sections/logo-ticker-brutalist.tsx`

**Features**:
- ✅ Auto-scrolling horizontal infinite loop
- ✅ CSS filter otomatis untuk B&W (grayscale)
- ✅ Hover effect: Remove grayscale (show original colors)
- ✅ Gradient fade di kiri & kanan
- ✅ Stats display (Clients, Projects, Rating)
- ✅ Brutalist styling (monospace, uppercase labels)
- ✅ Sample logos (8 placeholder images)

---

## 📍 POSISI SECTION

```
Homepage Flow:
├─ Hero
├─ About
├─ Projects
├─ Testimonials
├─ LOGO TICKER ← NEW (setelah testimonials)
├─ Skills
├─ Pricing
└─ Contact
```

---

## 🎨 DESIGN LAYOUT

```
┌────────────────────────────────────────────────┐
│ // CLIENT_LOGOS.MARQUEE                        │
│                                                │
│          Trusted by Brands                     │
│                                                │
│ [FADE] [LOGO] [LOGO] [LOGO] [LOGO] [FADE]    │ ← Auto-scroll
│                                                │
│      50+        │      100+       │    4.9/5   │
│    CLIENTS      │    PROJECTS     │   RATING   │
└────────────────────────────────────────────────┘
```

---

## 🖼️ CSS FILTER OTOMATIS

### Cara Kerja:
Gambar logo **berwarna** otomatis jadi **B&W** pakai CSS:

```css
/* Default State: B&W */
filter: grayscale(100%) contrast(1.2);
opacity: 0.6;

/* Hover State: Full Color */
filter: grayscale(0%) contrast(1);
opacity: 1;
```

### Keuntungan:
1. ✅ **Upload logo berwarna** (tidak perlu edit manual jadi B&W)
2. ✅ **Otomatis convert** ke grayscale dengan CSS
3. ✅ **Hover menampilkan warna asli** untuk interaksi
4. ✅ **Lebih kontras** dengan contrast(1.2)

---

## 📦 SAMPLE LOGOS (Default)

Saat ini pakai **8 placeholder logos**:
```javascript
const logos = [
  { id: 1, name: 'COMPANY_A', url: 'https://via.placeholder.com/120x60/...' },
  { id: 2, name: 'COMPANY_B', url: 'https://via.placeholder.com/120x60/...' },
  // ... 8 total
];
```

**Ukuran**: 120x60px (landscape ratio)
**Format**: JPG, PNG, SVG (dengan background)

---

## 🔄 CARA GANTI DENGAN LOGO REAL

### Metode 1: Edit Array Langsung (Simple)

Edit file: `components/sections/logo-ticker-brutalist.tsx`

```javascript
const logos = [
  { id: 1, name: 'TOKOPEDIA', url: '/logos/tokopedia.png' },
  { id: 2, name: 'GOJEK', url: '/logos/gojek.png' },
  { id: 3, name: 'SHOPEE', url: '/logos/shopee.png' },
  { id: 4, name: 'BUKALAPAK', url: '/logos/bukalapak.png' },
  { id: 5, name: 'TRAVELOKA', url: '/logos/traveloka.png' },
  { id: 6, name: 'OVO', url: '/logos/ovo.png' },
  { id: 7, name: 'GRAB', url: '/logos/grab.png' },
  { id: 8, name: 'DANA', url: '/logos/dana.png' },
];
```

**Simpan logo di**: `public/logos/` folder

### Metode 2: Dari Supabase Storage (Advanced)

1. **Upload logos ke Supabase**:
   ```sql
   -- Create bucket untuk client logos
   -- Bucket name: client-logos
   -- Public: true
   ```

2. **Update component** untuk fetch dari Supabase:
   ```javascript
   const [logos, setLogos] = useState([]);
   
   useEffect(() => {
     fetchLogos();
   }, []);
   
   const fetchLogos = async () => {
     const supabase = getSupabase();
     const { data } = await supabase
       .from('client_logos')
       .select('*')
       .order('order_index');
     
     if (data) setLogos(data);
   };
   ```

3. **Create table**:
   ```sql
   CREATE TABLE client_logos (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     name TEXT NOT NULL,
     logo_url TEXT NOT NULL,
     order_index INTEGER DEFAULT 0,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

---

## 🎯 UKURAN LOGO RECOMMENDED

### Dimensi:
- **Width**: 120-150px
- **Height**: 60-80px
- **Ratio**: 2:1 atau 3:2 (landscape)

### Format:
- **PNG** (dengan transparent background) ← BEST
- **SVG** (vector, scalable)
- **JPG** (dengan white/colored background)

### File Size:
- **Max**: 100KB per logo
- **Optimized**: 20-50KB

### Background:
- **Transparent PNG**: Logo akan adapt dengan white bg
- **White BG**: Perfect untuk grayscale filter
- **Colored BG**: Will become gray with filter

---

## ⚙️ CUSTOMIZATION OPTIONS

### 1. Animation Speed
```javascript
transition={{
  x: {
    duration: 30, // ← Ganti angka ini (detik)
    // 20 = faster, 40 = slower
  }
}}
```

### 2. Logo Spacing
```javascript
<div className="flex gap-12"> // ← Ganti gap-12
  // gap-8 = tighter, gap-16 = wider
</div>
```

### 3. Logo Size
```javascript
<div className="w-[120px] h-[60px]"> // ← Ganti ukuran
  // Contoh: w-[150px] h-[75px]
</div>
```

### 4. Filter Strength
```javascript
style={{
  filter: 'grayscale(100%) contrast(1.2)', // ← Adjust
  // contrast(1.0) = normal
  // contrast(1.5) = more contrast
}}
```

### 5. Hover Effect

**Option A: Remove Grayscale** (Current):
```javascript
onMouseEnter={(e) => {
  e.currentTarget.style.filter = 'grayscale(0%)';
}}
```

**Option B: Invert Colors** (Brutalist):
```javascript
onMouseEnter={(e) => {
  e.currentTarget.style.filter = 'invert(1) grayscale(100%)';
}}
```

**Option C: Scale Up**:
```javascript
onMouseEnter={(e) => {
  e.currentTarget.style.transform = 'scale(1.1)';
  e.currentTarget.style.filter = 'grayscale(0%)';
}}
```

---

## 📊 STATS SECTION

Bisa diganti sesuai data real:

```javascript
<div className="text-3xl font-bold">50+</div>
<p>CLIENTS</p>

<div className="text-3xl font-bold">100+</div>
<p>PROJECTS</p>

<div className="text-3xl font-bold">4.9/5</div>
<p>RATING</p>
```

---

## 🚀 DEPLOYMENT CHECKLIST

### Before Deploy:
- [ ] Ganti placeholder logos dengan logo real
- [ ] Simpan logos di `/public/logos/` folder
- [ ] Update logo names di array
- [ ] Test hover effect
- [ ] Test animation speed
- [ ] Adjust logo sizes (jika perlu)
- [ ] Update stats numbers

### Folder Structure:
```
public/
└── logos/
    ├── client-1.png
    ├── client-2.png
    ├── client-3.png
    └── ...
```

---

## 🎨 DESIGN RULES FOLLOWED

### Brutalist Compliance:
- [x] Monospace technical labels
- [x] Uppercase tracking-widest text
- [x] 1px dividers (stats)
- [x] No shadows
- [x] No rounded corners
- [x] Instant transitions (duration-0)
- [x] Grayscale filter (B&W aesthetic)
- [x] Linear animation (no easing)

---

## 📝 TIPS & BEST PRACTICES

### 1. Logo Preparation
- Use **transparent PNG** untuk best results
- Remove excessive whitespace around logo
- Ensure logo is **horizontally oriented** (landscape)
- Keep aspect ratio consistent across all logos

### 2. Color to B&W
- CSS filter otomatis handle conversion
- Dark logos → remain visible (contrast boost)
- Light logos → might need brightness adjustment
- Test dengan berbagai logo colors

### 3. Performance
- Optimize images (compress before upload)
- Use WebP format untuk smaller file size
- Lazy load logos jika banyak (>20)
- Consider CDN untuk faster loading

### 4. Accessibility
- Add proper `alt` text untuk setiap logo
- Ensure logo masih recognizable dalam B&W
- Test contrast ratio (WCAG guidelines)

---

## 🔧 TROUBLESHOOTING

### Logo tidak terlihat:
- Check file path (`/logos/filename.png`)
- Verify file ada di `/public/logos/`
- Check console untuk 404 errors

### Animation terlalu cepat/lambat:
- Adjust `duration` value (line ~74)
- Lower = faster, Higher = slower

### Logo terlalu kecil/besar:
- Change `w-[120px] h-[60px]` values
- Maintain aspect ratio

### Filter tidak apply:
- Check browser compatibility (grayscale support)
- Try inline style vs className

---

## ✨ FUTURE ENHANCEMENTS

1. **Admin Panel Integration**:
   - CRUD logos dari dashboard
   - Upload langsung dari admin
   - Reorder drag & drop

2. **Database Storage**:
   - Store logos di Supabase
   - Dynamic loading
   - Order management

3. **Advanced Filters**:
   - Multiple filter presets
   - Custom filter per logo
   - Color overlay options

4. **Click Interactions**:
   - Link to client website
   - Modal with case study
   - Logo details popup

---

## 📦 FILES INVOLVED

### Created:
- `components/sections/logo-ticker-brutalist.tsx` (NEW)

### Modified:
- `app/page.tsx` (added import + section)

### To Create (When Using Real Logos):
- `public/logos/` folder
- Individual logo files

---

## 🎊 COMPLETION STATUS

✅ **Component Created**
✅ **Section Added to Homepage**
✅ **CSS Filter Working**
✅ **Animation Working**
✅ **Hover Effect Working**
✅ **Stats Display Working**
✅ **Build Successful**
✅ **Documentation Complete**

**READY TO USE!** 🚀

Tinggal ganti placeholder logos dengan logo real client kamu!
