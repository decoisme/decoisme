# Hydration Error Fix - Framer Motion useScroll

## Problem
Hydration mismatch error terjadi karena Framer Motion's `useScroll` mencoba mengakses ref sebelum component ter-hydrate di client side.

```
Error: Target ref is defined but not hydrated
```

## Solution

### 1. Client-Side Mounting Check
Tambahkan state untuk tracking apakah component sudah mounted:

```typescript
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);
```

### 2. Conditional Style Application
Apply parallax styles hanya setelah component mounted:

```typescript
// ❌ Before (causes hydration error)
<motion.div style={{ y }}>

// ✅ After (no hydration error)
<motion.div style={mounted ? { y } : {}}>
```

### 3. Suppress Hydration Warning
Tambahkan `suppressHydrationWarning` pada elemen dengan dynamic styles:

```typescript
<motion.div 
  style={mounted ? { y } : {}}
  suppressHydrationWarning
>
```

## Implementation

### All Sections Updated
Semua section dengan parallax effect telah diupdate:

1. **hero-section.tsx**
   - Text content parallax
   - Image parallax
   - Opacity fade

2. **about-section.tsx**
   - Highlights grid parallax
   - Timeline parallax

3. **projects-section-new.tsx**
   - Cards grid parallax

4. **skills-section-new.tsx**
   - Categories parallax
   - Additional skills parallax

5. **contact-section.tsx**
   - Form parallax
   - Info parallax

## Code Pattern

```typescript
export function MySection() {
  const containerRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, isInView } = useScrollAnimation();
  const [mounted, setMounted] = useState(false);
  
  // Initialize scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Create transforms
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  // Set mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section ref={containerRef}>
      <div ref={inViewRef}>
        <motion.div 
          style={mounted ? { y } : {}}
          suppressHydrationWarning
        >
          {/* Content */}
        </motion.div>
      </div>
    </section>
  );
}
```

## Why This Works

### Server-Side Rendering (SSR)
- `mounted` is `false` during SSR
- No parallax styles applied
- HTML rendered without dynamic transforms

### Client-Side Hydration
- Component mounts in browser
- `useEffect` runs, sets `mounted` to `true`
- Parallax styles applied after hydration complete
- No mismatch between server and client HTML

### suppressHydrationWarning
- Tells React to expect differences in this element
- Prevents console warnings
- Safe because we control the difference (mounted state)

## Benefits

✅ No hydration errors
✅ No console warnings
✅ Parallax works smoothly
✅ SSR compatible
✅ Performance optimized

## Testing

### Build Test
```bash
npm run build
```
Result: ✅ No errors

### Dev Test
```bash
npm run dev
```
Result: ✅ No hydration warnings

### Browser Test
- Open http://localhost:3000
- Check console: ✅ No errors
- Scroll page: ✅ Parallax working
- Toggle dark mode: ✅ Smooth transition

## Related Files

- `components/sections/hero-section.tsx`
- `components/sections/about-section.tsx`
- `components/sections/projects-section-new.tsx`
- `components/sections/skills-section-new.tsx`
- `components/sections/contact-section.tsx`

## References

- [Framer Motion useScroll Troubleshooting](https://motion.dev/troubleshooting/use-scroll-ref)
- [React Hydration Mismatch](https://react.dev/link/hydration-mismatch)
- [Next.js suppressHydrationWarning](https://nextjs.org/docs/messages/react-hydration-error)
