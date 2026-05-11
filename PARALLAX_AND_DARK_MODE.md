# Parallax Effects & Smooth Dark Mode Transition

## Overview
Berhasil menambahkan efek parallax dinamis saat scroll dan transisi smooth untuk dark mode dengan warna yang disesuaikan dengan palette kuning-emas.

## ✅ Fitur yang Ditambahkan

### 1. **Parallax Scroll Effects**
Setiap section memiliki efek parallax yang berbeda untuk menciptakan depth dan dinamika:

#### Hero Section
- **Text Content**: Bergerak lebih cepat ke bawah (50% transform)
- **Profile Image**: Bergerak lebih lambat (30% transform) + scale effect
- **Opacity Fade**: Menghilang saat scroll ke bawah
- Menciptakan efek depth yang dramatis

#### About Section
- **Highlights Grid**: Parallax ke bawah (20% transform)
- **Experience Timeline**: Parallax ke atas (-20% transform)
- Efek berlawanan arah untuk visual interest

#### Projects Section
- **Project Cards Grid**: Parallax ke bawah (15% transform)
- Smooth movement saat scroll

#### Skills Section
- **Skill Categories**: Parallax ke bawah (10% transform)
- **Additional Skills**: Parallax ke atas (-10% transform)
- Subtle movement untuk tidak mengganggu readability

#### Contact Section
- **Contact Form**: Parallax ke bawah (15% transform)
- **Contact Info**: Parallax ke atas (-15% transform)
- Efek berlawanan untuk balance visual

### 2. **Smooth Dark Mode Transition**

#### Global Transitions (globals.css)
```css
/* Smooth Dark Mode Transition */
html {
  transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1),
              color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

body {
  transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1),
              color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

* {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.3s;
}
```

#### Animated Theme Toggle Button
- **Icon Rotation**: 180° rotation saat toggle
- **Icon Transition**: Slide up/down dengan fade
- **Hover Effect**: Scale 1.1 + background glow
- **Tap Effect**: Scale 0.9 untuk feedback
- **Background Glow**: Gradient kuning-amber saat hover

### 3. **Dark Mode Color Adjustments**

#### Scrollbar Colors
- **Light Mode**: Amber (rgba(245, 158, 11, 0.3))
- **Dark Mode**: Lighter Amber (rgba(251, 191, 36, 0.3))
- **Hover**: Opacity meningkat ke 0.5

#### Selection Colors
- **Light Mode**: Amber selection (rgba(245, 158, 11, 0.3))
- **Dark Mode**: Lighter Amber (rgba(251, 191, 36, 0.3))

#### Focus Outline
- **Light Mode**: Amber outline (rgba(245, 158, 11, 0.5))
- **Dark Mode**: Lighter Amber (rgba(251, 191, 36, 0.5))

### 4. **Custom Hooks**

#### `use-parallax.ts`
Hook untuk parallax effect dengan options:
- `speed`: Kecepatan parallax (default: 0.5)
- `direction`: Arah movement ('up', 'down', 'left', 'right')
- `enableOnMobile`: Enable di mobile (default: false)

```typescript
const offset = useParallax(ref, {
  speed: 0.5,
  direction: 'up',
  enableOnMobile: false,
});
```

#### `useScrollProgress()`
Hook untuk tracking scroll progress (0-100%)

## Technical Implementation

### Hydration Fix
Untuk menghindari hydration mismatch dengan Framer Motion's `useScroll`, semua parallax styles hanya diaplikasikan setelah component mounted:

```typescript
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

// Apply parallax only after mount
<motion.div style={mounted ? { y } : {}}>
```

### Framer Motion Integration
Menggunakan `useScroll` dan `useTransform` dari Framer Motion:

```typescript
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ['start end', 'end start'],
});

const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
```

### Dual Ref Pattern
Menggabungkan ref untuk parallax dan intersection observer:

```typescript
const containerRef = useRef<HTMLElement>(null);
const { ref: inViewRef, isInView } = useScrollAnimation();

// Wrapper div untuk inView detection
<section ref={containerRef}>
  <div ref={inViewRef}>
    {/* Content */}
  </div>
</section>
```

## Performance Considerations

### Optimizations
✅ Parallax disabled di mobile (< 768px) untuk performa
✅ Passive event listeners untuk smooth scrolling
✅ Transform-based animations (GPU accelerated)
✅ Intersection Observer untuk lazy animations
✅ Cubic-bezier easing untuk smooth transitions

### Browser Support
- Modern browsers dengan CSS transforms
- Framer Motion untuk cross-browser compatibility
- Graceful degradation untuk older browsers

## Visual Effects Summary

### Scroll Behavior
- **Hero**: Fade out + parallax (dramatic exit)
- **About**: Bidirectional parallax (depth)
- **Projects**: Smooth downward parallax
- **Skills**: Subtle bidirectional parallax
- **Contact**: Bidirectional parallax (balance)

### Dark Mode Behavior
- **Transition Duration**: 0.3-0.5s
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **Properties**: background, color, border, fill, stroke
- **Icon Animation**: Rotate + slide + fade

## Color Palette (Dark Mode Adjusted)

### Amber/Yellow Accents
```css
/* Light Mode */
--amber-500: #f59e0b
--yellow-500: #eab308

/* Dark Mode */
--amber-400: #fbbf24
--yellow-400: #facc15
```

### Usage
- Scrollbar thumb
- Selection highlight
- Focus outline
- Theme toggle icon
- Hover effects

## Files Modified

### Core Files
1. `app/globals.css` - Global transitions & colors
2. `app/layout.tsx` - Theme provider config
3. `components/layout/navbar.tsx` - Animated theme toggle

### Section Files (Parallax)
4. `components/sections/hero-section.tsx`
5. `components/sections/about-section.tsx`
6. `components/sections/projects-section-new.tsx`
7. `components/sections/skills-section-new.tsx`
8. `components/sections/contact-section.tsx`

### New Files
9. `lib/hooks/use-parallax.ts` - Custom parallax hook

## Build Status
✅ **Build Successful** - No errors
✅ All TypeScript checks passed
✅ All animations working
✅ Dark mode transition smooth
✅ Parallax effects optimized

## User Experience Improvements

### Before
- ❌ Static scroll (no depth)
- ❌ Instant dark mode switch (jarring)
- ❌ Generic blue accents
- ❌ No visual feedback on theme toggle

### After
- ✅ Dynamic parallax (immersive)
- ✅ Smooth dark mode transition (polished)
- ✅ Warm amber/yellow accents (brand consistent)
- ✅ Animated theme toggle (delightful)

## Next Steps (Optional Enhancements)

### Potential Additions
- [ ] Scroll-triggered animations untuk individual elements
- [ ] Mouse parallax effect (cursor-based)
- [ ] Smooth scroll dengan Lenis (sudah ada provider)
- [ ] Loading screen dengan theme-aware colors
- [ ] Page transition animations
- [ ] Scroll progress indicator

## Notes
- Parallax effects subtle untuk tidak mengganggu UX
- Dark mode transition menggunakan native CSS untuk performa
- Semua warna disesuaikan dengan palette kuning-emas
- Mobile-friendly dengan parallax disabled di small screens
