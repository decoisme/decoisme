# 🎬 Visual Animation Guide - Decoisme Portfolio

## Hero Section - Split Reveal
```
BEFORE SCROLL:
┌─────────────────────────────────────────────┐
│  [HIDDEN]                     [HIDDEN]      │
│  ← - - - -                     - - - - →    │
│  Left Content                 Hero Image    │
└─────────────────────────────────────────────┘

AFTER SCROLL (0.6s):
┌─────────────────────────────────────────────┐
│  [VISIBLE] ←─────→           ←─────→ [VIS]  │
│  Portfolio                           Photo   │
│  Developer & Designer                        │
│  [View Projects] [Contact]                   │
│  [Social Icons]                              │
└─────────────────────────────────────────────┘

Direction: Horizontal split (left from left, right from right)
Distance: 30px
Duration: 0.6s
Easing: Ease-out-expo [0.22, 1, 0.36, 1]
```

---

## About Bento Grid - Zig-Zag Pattern
```
GRID LAYOUT (7 cards in bento grid):

Row 1:
┌───────────────────┬─────────┐
│  1. About Me      │  2. Loc │  ← from LEFT    → from RIGHT
│  (2 cols)         │  (1 col)│     -30px           30px
└───────────────────┴─────────┘

Row 2:
┌─────────┬─────────┬─────────┐
│ 3. Tools│ 4. Coff │ 5. Hobb │  ← LEFT   ↗ SCALE  → RIGHT
│  (1 col)│  (1 col)│  (1 col)│   -30px    0.9→1    30px
└─────────┴─────────┴─────────┘

Row 3:
┌───────────────────────────────┐
│  6. Get in Touch (3 cols)     │  ↑ from BOTTOM
│                               │     30px
└───────────────────────────────┘

Bottom:
          [7. Download CV]         ↗ SCALE
              (centered)            0.95→1

ANIMATION SEQUENCE:
1. About Me    → slides LEFT   (delay: 0s)
2. Location    → slides RIGHT  (delay: 0.1s)
3. Tools       → slides LEFT   (delay: 0.15s)
4. Coffee      → zooms IN      (delay: 0.2s)
5. Hobbies     → slides RIGHT  (delay: 0.25s)
6. Get in Touch → slides UP    (delay: 0.3s)
7. Download CV  → zooms IN     (delay: 0.35s)

Visual Effect: Creates dynamic zig-zag wave across grid
```

---

## Testimonials - Alternating Horizontal
```
TESTIMONIAL CARDS PATTERN:

Card 1 (even): ← - - - - [TESTIMONIAL] - - - →
               (slides from LEFT, x: -30)

Card 2 (odd):  ← - - - - [TESTIMONIAL] - - - →
               (slides from RIGHT, x: 30)

Card 3 (even): ← - - - - [TESTIMONIAL] - - - →
               (slides from LEFT, x: -30)

Card 4 (odd):  ← - - - - [TESTIMONIAL] - - - →
               (slides from RIGHT, x: 30)

Card 5 (even): ← - - - - [TESTIMONIAL] - - - →
               (slides from LEFT, x: -30)

Card 6 (odd):  ← - - - - [TESTIMONIAL] - - - →
               (slides from RIGHT, x: 30)

TIMING:
- Card 1: delay 0s
- Card 2: delay 0.05s
- Card 3: delay 0.10s
- Card 4: delay 0.15s
- Card 5: delay 0.20s
- Card 6: delay 0.25s

Visual Effect: Creates wave-like alternating motion
Duration: 0.5s per card
Easing: Ease-out-expo
```

---

## Contact Section - Split Reveal (Mirror of Hero)
```
BEFORE SCROLL:
┌─────────────────────────────────────────────┐
│  [HIDDEN]                     [HIDDEN]      │
│  ← - - - -                     - - - - →    │
│  Contact Form               Contact Info    │
└─────────────────────────────────────────────┘

AFTER SCROLL (0.6s):
┌─────────────────────────────────────────────┐
│  [VISIBLE] ←─────→           ←─────→ [VIS]  │
│  Name: _____                 📧 Email        │
│  Email: ____                 📱 Phone        │
│  Message:___                 📍 Location     │
│  [Send Message]              [Social Links]  │
└─────────────────────────────────────────────┘

Direction: Horizontal split (same as Hero)
Form: x: -30 → 0 (left)
Info: x: 30 → 0 (right)
Duration: 0.6s
```

---

## Features & Skills - Staggered Fade-Up
```
FEATURES LIST:
     ↑
     | 12px
     |
[Feature 1] ─── appears (delay: 0s)
     ↑
     | 12px
     |
[Feature 2] ─── appears (delay: 0.05s)
     ↑
     | 12px
     |
[Feature 3] ─── appears (delay: 0.1s)
     ↑
     | 12px
     |
[Feature 4] ─── appears (delay: 0.15s)

Visual Effect: Smooth cascade from bottom to top
Duration: 0.3s per item
Direction: Only vertical (y: 12 → 0)
No horizontal untuk maintain reading flow
```

---

## Animation Types Summary

### 1. Horizontal Slide (X-axis)
```
LEFT:  ← - - - - [ELEMENT]
       x: -30 → 0

RIGHT: [ELEMENT] - - - - →
       x: 30 → 0
```

### 2. Vertical Slide (Y-axis)
```
UP:    [ELEMENT]
          ↑
          |
       y: 12 → 0
```

### 3. Scale (Zoom)
```
ZOOM:  [·] → [ELEMENT]
       scale: 0.9 → 1
```

### 4. Alternating Pattern
```
Row 1: ← LEFT
Row 2:        RIGHT →
Row 3: ← LEFT
Row 4:        RIGHT →
```

---

## Timing & Delays

### Page Load Animations (Hero):
- Left content appears first (0s)
- Children stagger (0.2s, 0.3s, 0.4s...)
- Right image follows (0.2s)

### Scroll Animations (About, Testimonials, Contact):
- Triggered when element enters viewport
- `viewport={{ once: true }}` - Only animate once
- Stagger delays create wave effect

### Stagger Patterns:
- **Small items** (features, skills): 0.05s increment
- **Large items** (bento grid): 0.05s increment
- **Section spacing**: 0.1-0.2s between major sections

---

## Performance Notes

✅ **GPU Accelerated Properties Used:**
- `transform: translateX()` - Horizontal
- `transform: translateY()` - Vertical
- `transform: scale()` - Zoom
- `opacity` - Fade

❌ **NOT Used (slow properties):**
- `left`, `right`, `top`, `bottom`
- `width`, `height`
- `margin`, `padding`

---

## Mobile Behavior

All animations remain active on mobile but:
- Distances same (30px, 12px)
- Durations same (0.3s-0.6s)
- Grid collapses to 1 column but animations still horizontal
- Performance excellent on modern mobile devices

---

## Accessibility

✅ **Respects `prefers-reduced-motion`:**
```css
@media (prefers-reduced-motion: reduce) {
  /* Framer Motion automatically disables animations */
}
```

User can disable animations in:
- Windows: Settings > Ease of Access > Display > Show animations
- macOS: System Preferences > Accessibility > Display > Reduce motion
- Android: Settings > Accessibility > Remove animations
- iOS: Settings > Accessibility > Motion > Reduce Motion

---

## Visual Flow Chart

```
USER SCROLLS DOWN PAGE:

1. HERO (load)
   └─→ Left text slides in ←
   └─→ Right image slides in →

2. ABOUT BENTO (scroll)
   └─→ Grid items appear in zig-zag pattern
       (left, right, left, scale, right, up, scale)

3. FEATURES (scroll)
   └─→ Items fade up sequentially ↑

4. SKILLS (scroll)
   └─→ Categories fade up ↑

5. PROJECTS (scroll)
   └─→ Simple fade-in (no horizontal)

6. TESTIMONIALS (scroll)
   └─→ Cards alternate left/right ← →

7. CONTACT (scroll)
   └─→ Form slides in ←
   └─→ Info slides in →

8. FOOTER (scroll)
   └─→ Fades up ↑
```

---

**Kesimpulan**: Portfolio kamu sekarang punya **dynamic, premium animations** dengan horizontal movement yang creative tanpa error React Hooks! 🎉
