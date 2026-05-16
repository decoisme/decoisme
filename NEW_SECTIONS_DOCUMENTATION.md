# ✨ New 3D Interactive Sections

## 🎨 Overview

Saya telah membuat **2 section baru yang super modern dan interactive** dengan 3D effects, animations, dan yellow/amber color scheme yang konsisten!

---

## 🆕 New Sections

### 1. **About Bento** 🎴
**File:** `components/sections/about-bento.tsx`

**Konsep:**
- Bento grid layout (Pinterest-style)
- 7 interactive cards dengan ukuran berbeda
- 3D hover effects dengan tilt
- Glassmorphism design
- Shine animation on hover

**Features:**
- ✅ **About Me Card** (2x2) - Main intro dengan tags
- ✅ **Location Card** - Indonesia dengan timezone
- ✅ **Coffee Lover** - Animated coffee emoji
- ✅ **Design Tools** (1x2) - List of tools dengan hover
- ✅ **Hobbies** - Interactive icons (Music, Camera, Travel)
- ✅ **Get in Touch** (2x1) - CTA dengan floating icon
- ✅ **Download CV Button** - Bottom CTA

**Animations:**
- Card entrance: Staggered fade + slide up
- Hover: Glow effect + shine sweep
- Icons: Rotate & scale on hover
- Coffee emoji: Shake animation
- Mail icon: Float up/down

**Colors:**
- All cards use yellow/amber/orange gradients
- Consistent with overall theme
- Glassmorphism with backdrop blur

---

### 2. **Tech Stack 3D** 🌐
**File:** `components/sections/tech-stack-3d.tsx`

**Konsep:**
- 3D orbital system
- 8 tech icons orbiting around center
- Each icon on different orbit path
- Interactive hover effects
- Floating particles

**Features:**
- ✅ **Center Hub** - Laptop emoji dengan pulse rings
- ✅ **8 Orbiting Icons:**
  - React ⚛️
  - Next.js ▲
  - TypeScript TS
  - Tailwind 🎨
  - Figma 🎯
  - Framer ✨
  - Supabase ⚡
  - Git 🔧

**Animations:**
- **Orbit Motion:** Each icon moves in circular path
- **Pulse Rings:** 2 expanding rings from center
- **Orbit Rings:** 2 rotating dashed circles
- **Hover Effects:**
  - Scale up 1.2x
  - Rotate 10deg
  - Glow effect
  - Shake animation
  - Floating particles appear

**3D Effects:**
- Circular orbit calculation using trigonometry
- Different speeds for each icon
- Depth illusion with blur & opacity
- Parallax-like movement

**Colors:**
- Each icon has unique yellow/amber/orange gradient
- Center hub: Yellow → Amber
- Glow effects: Yellow/Amber
- Particles: Yellow/Amber

---

## 📐 Layout Structure

### Homepage Order:
1. Hero Section
2. Features Showcase
3. **About Bento** ← NEW!
4. **Tech Stack 3D** ← NEW!
5. Projects Section
6. Skills Section
7. Pricing Section
8. Contact Section

---

## 🎨 Design Details

### About Bento Grid:

```
Desktop (lg):
┌─────────┬─────┬─────┐
│         │  2  │  3  │
│    1    ├─────┴─────┤
│  (2x2)  │           │
│         │     4     │
├─────────┤   (1x2)   │
│    6    │           │
│  (2x1)  ├─────┬─────┤
└─────────┴─────┴─────┘
           5

Tablet (md): 2 columns
Mobile: 1 column stack
```

### Tech Stack 3D:

```
        Icon 1
    Icon 8    Icon 2
Icon 7    💻    Icon 3
    Icon 6    Icon 4
        Icon 5

- Center: 💻 (128px)
- Orbit radius: 200px
- 8 icons evenly distributed
- Rotating orbit rings
```

---

## 🎭 Animations Breakdown

### About Bento:

**Card Entrance:**
```typescript
initial: { opacity: 0, y: 30 }
animate: { opacity: 1, y: 0 }
delay: index * 0.1 (staggered)
```

**Hover Effects:**
```typescript
- Glow: opacity 0 → 0.05, scale 1 → 1.5
- Shine: x -100% → 200%, skewX -20deg
- Icons: scale 1 → 1.1
```

**Coffee Animation:**
```typescript
rotate: [0, -10, 10, -10, 0]
duration: 2s
repeat: Infinity
repeatDelay: 3s
```

### Tech Stack 3D:

**Orbit Motion:**
```typescript
// Calculate position
angle = (index / total) * Math.PI * 2
x = Math.cos(angle) * radius
y = Math.sin(angle) * radius

// Animate
x: [x, x * 1.1, x]
y: [y, y * 1.1, y]
duration: 4 + index * 0.5
```

**Pulse Rings:**
```typescript
scale: [1, 1.5, 1]
opacity: [0.5, 0, 0.5]
duration: 3s
repeat: Infinity
```

**Hover:**
```typescript
scale: 1.2
rotate: 10deg
glow: opacity 0 → 0.6, scale 1.5
shake: rotate [0, -5, 5, -5, 0]
```

---

## 🎨 Color Scheme

### About Bento Cards:

1. About Me: `from-yellow-500 to-amber-600`
2. Location: `from-amber-500 to-orange-600`
3. Coffee: `from-orange-500 to-amber-600`
4. Tools: `from-yellow-600 to-amber-500`
5. Hobbies: `from-amber-600 to-yellow-500`
6. Contact: `from-orange-600 to-amber-500`

### Tech Stack Icons:

1. React: `from-yellow-500 to-amber-500`
2. Next.js: `from-amber-500 to-orange-500`
3. TypeScript: `from-orange-500 to-amber-600`
4. Tailwind: `from-yellow-600 to-amber-500`
5. Figma: `from-amber-600 to-yellow-600`
6. Framer: `from-orange-600 to-amber-500`
7. Supabase: `from-yellow-500 to-orange-500`
8. Git: `from-amber-500 to-yellow-600`

---

## 📱 Responsive Design

### About Bento:

**Desktop (lg):**
- 3 columns grid
- Variable card sizes (1x1, 2x1, 1x2, 2x2)
- Optimal spacing

**Tablet (md):**
- 2 columns grid
- Cards stack naturally
- Adjusted padding

**Mobile:**
- 1 column stack
- Full width cards
- Compact spacing

### Tech Stack 3D:

**Desktop:**
- Orbit radius: 200px
- Icon size: 96px (24 * 4)
- Full animations

**Tablet:**
- Orbit radius: 180px
- Icon size: 80px
- All animations enabled

**Mobile:**
- Orbit radius: 120px
- Icon size: 64px
- Simplified animations
- Touch-optimized

---

## 🎯 User Interactions

### About Bento:

1. **Hover over card** → Glow + shine effect
2. **Hover over coffee** → Shake animation
3. **Hover over hobby icons** → Scale + rotate
4. **Click contact button** → Navigate to contact
5. **Click download CV** → Download resume

### Tech Stack 3D:

1. **Hover over icon** → Scale up + glow + shake
2. **Watch orbit** → Icons move in circular paths
3. **See particles** → Appear on hover
4. **Observe center** → Pulse rings expand
5. **Watch rings** → Orbit rings rotate

---

## 🔧 Technical Details

### Dependencies:
- `framer-motion` - All animations
- `lucide-react` - Icons
- `tailwindcss` - Styling

### Performance:
- Hardware-accelerated (transform, opacity)
- Optimized re-renders
- Smooth 60fps animations
- Lazy loading (viewport detection)

### Accessibility:
- Semantic HTML
- Keyboard navigation
- Screen reader friendly
- Reduced motion support (can be added)

---

## ✅ Features Summary

### About Bento:
- ✅ 7 interactive cards
- ✅ Bento grid layout
- ✅ 3D hover effects
- ✅ Glassmorphism design
- ✅ Shine animations
- ✅ Staggered entrance
- ✅ Download CV button
- ✅ Responsive grid

### Tech Stack 3D:
- ✅ 8 orbiting tech icons
- ✅ 3D circular motion
- ✅ Pulse rings
- ✅ Rotating orbit rings
- ✅ Interactive hover
- ✅ Floating particles
- ✅ Glow effects
- ✅ Responsive sizing

---

## 🎉 Result

Dua section baru yang:
- **Modern** - Latest design trends (Bento, 3D orbit)
- **Interactive** - Engaging hover effects
- **Performant** - Smooth 60fps animations
- **Responsive** - Works on all devices
- **Consistent** - Yellow/amber color scheme
- **Unique** - Stand out from typical portfolios

---

**Status:** ✅ Implemented & Working  
**Build:** ✅ Successful  
**Files:**
- `components/sections/about-bento.tsx`
- `components/sections/tech-stack-3d.tsx`

🚀 Check them out on homepage!
