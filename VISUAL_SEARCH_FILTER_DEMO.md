# Visual Demo: Blog Search & Filter System

## 🎨 Interactive UI Components

Demonstrasi visual dari semua fitur search & filter.

---

## 📍 LAYOUT OVERVIEW

```
┌─────────────────────────────────────────────────────────────┐
│ ⚡ LATEST.INSIGHTS ⚡ DESIGN.CODE.CREATIVITY (Ticker)       │
├─────────────────────────────────────────────────────────────┤
│ [← BACK]                                                    │
│                                                             │
│ BLOG                                                        │
│ ────── 12 ARTICLES • UPDATED DAILY                         │
│                                                             │
│ [12 Posts] [3 Categories] [⚡ Live] [24/7 Access]          │
├─────────────────────────────────────────────────────────────┤
│ FILTER // [ALL] [DESIGN] [CODE] [TUTORIAL]                │
├─────────────────────────────────────────────────────────────┤
│ 🔍 [SEARCH POSTS...                                    [X]] │
│ [ 🔧 FILTERS ]                                              │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ DATE RANGE //          TAGS // (2)                      ││
│ │ [ALL TIME] [LAST WEEK] #nextjs  #design  #tutorial      ││
│ │ [LAST MONTH] [LAST YEAR] #react  #css  #javascript     ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ [12 RESULTS]  [✕ CLEAR ALL]                               │
│ Search: "nextjs"  #design [X]  #tutorial [X]              │
├─────────────────────────────────────────────────────────────┤
│ 01                                                          │
│ [DESIGN] [★ FEATURED]                                      │
│ BUILDING MODERN WEB APPS                                   │
│ Learn how to build...                                      │
│ Jan 15, 2024 • 5 min read • #nextjs #react                │
│                                            [READ MORE >>]  │
├─────────────────────────────────────────────────────────────┤
│ 02                                                          │
│ [CODE]                                                      │
│ TYPESCRIPT BEST PRACTICES                                  │
│ Essential tips for...                                      │
│ Jan 10, 2024 • 8 min read • #typescript #tutorial         │
│                                            [READ MORE >>]  │
├─────────────────────────────────────────────────────────────┤
│ 🔧 DEVELOPER.DESIGNER.CREATOR (Ticker)                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔍 COMPONENT 1: SEARCH BAR

### Default State
```
┌──────────────────────────────────────────────────────────┐
│ 🔍  SEARCH POSTS...                                      │
└──────────────────────────────────────────────────────────┘
```

### Active State (Typing)
```
┌──────────────────────────────────────────────────────────┐
│ 🔍  nextjs|                                          [X] │
└──────────────────────────────────────────────────────────┘
     ^^^^^^ User input                                 ^^^
                                              Clear button
```

### With Results
```
Search: "nextjs"     ← Active filter pill
```

---

## 🔧 COMPONENT 2: FILTERS BUTTON

### Default (Collapsed)
```
┌──────────────┐
│ 🔧 FILTERS   │  ← White background
└──────────────┘
```

### Active (Expanded)
```
┌──────────────┐
│ 🔧 FILTERS   │  ← Black background, white text
└──────────────┘
```

---

## 📅 COMPONENT 3: DATE RANGE FILTER

### Layout
```
┌─────────────────────────────────────────────┐
│ DATE RANGE //                               │
│                                             │
│ ┌───────────┐ ┌───────────┐               │
│ │ ALL TIME  │ │ LAST WEEK │               │
│ └───────────┘ └───────────┘               │
│                                             │
│ ┌─────────────┐ ┌───────────┐             │
│ │ LAST MONTH  │ │ LAST YEAR │             │
│ └─────────────┘ └───────────┘             │
└─────────────────────────────────────────────┘
```

### Selection States
```
ALL TIME:  [░░░░░░░░░░]  ← White bg (default)
LAST WEEK: [██████████]  ← Black bg (selected)
```

---

## 🏷️ COMPONENT 4: TAG CLOUD

### Layout
```
┌─────────────────────────────────────────────┐
│ TAGS // (3)                                 │
│                                             │
│ ┌────────┐ ┌────────┐ ┌─────────┐         │
│ │#nextjs │ │#design │ │#tutorial│         │
│ └────────┘ └────────┘ └─────────┘         │
│                                             │
│ ┌───────┐ ┌──────┐ ┌────────────┐         │
│ │#react │ │#css  │ │#javascript │         │
│ └───────┘ └──────┘ └────────────┘         │
└─────────────────────────────────────────────┘
```

### Tag States
```
Unselected: [#nextjs]   ← White bg, 2px border
Selected:   [#design]   ← Black bg, white text
```

### Scrollable (Many Tags)
```
┌────────────────────────────────────────┐
│ #nextjs #design #tutorial #react #css  │ ← Scroll →
│ ═══════════════════════════════════════│
└────────────────────────────────────────┘
```

---

## 📊 COMPONENT 5: RESULTS COUNTER

### Default
```
┌─────────────┐
│ 12 RESULTS  │  ← Black bg, white text
└─────────────┘
```

### With Clear Button
```
┌─────────────┐  ┌──────────────┐
│ 12 RESULTS  │  │ ✕ CLEAR ALL │
└─────────────┘  └──────────────┘
```

### Dynamic Count
```
No filters:    [12 RESULTS]
With search:   [8 RESULTS]
With filters:  [3 RESULTS]
No results:    [0 RESULTS]
```

---

## 🎯 COMPONENT 6: ACTIVE FILTERS PILLS

### Single Filter
```
Search: "nextjs"
```

### Multiple Tags
```
#design [X]  #tutorial [X]  #ui [X]
  ↑     ↑
  Tag   Remove
```

### Combined
```
Search: "nextjs"  #design [X]  #tutorial [X]
     └─ Yellow bg    └─ Black bg with X button
```

### Hover State (Remove Button)
```
#design [X]  →  #design [X]
                       ↑
                  Yellow on hover
```

---

## 🚫 COMPONENT 7: NO RESULTS STATE

### Full Layout
```
┌─────────────────────────────────────────┐
│                                         │
│              404                        │
│                                         │
│        NO POSTS FOUND                   │
│                                         │
│   Try adjusting your filters            │
│   or search query.                      │
│                                         │
│   ┌──────────────────────┐              │
│   │ CLEAR ALL FILTERS    │              │
│   └──────────────────────┘              │
│                                         │
└─────────────────────────────────────────┘
```

### Styling
- Border: 4px black
- Background: White
- Text: Black, uppercase
- 404: 8xl font, 10% opacity
- CTA Button: Black bg, white text

---

## 📝 COMPONENT 8: BLOG POST CARD

### Default State
```
┌──────────────────────────────────────────────────────┐
│ 01                                                   │
│ [DESIGN] [★ FEATURED]                               │
│                                                      │
│ BUILDING MODERN                                     │
│ WEB APPS                                            │
│                                                      │
│ Learn how to build stunning...                      │
│                                                      │
│ Jan 15, 2024 • 5 min read • #nextjs #react         │
│                                    [READ MORE >>]   │
└──────────────────────────────────────────────────────┘
```

### Hover State
```
┌──────────────────────────────────────────────────────┐
│ 01                   ← Black background             │
│ [DESIGN] [★ FEATURED]  ← White text                │
│                                                      │
│ BUILDING MODERN                                     │
│ WEB APPS                                            │
│                                                      │
│ Learn how to build stunning...  ← Gray-300 text    │
│                                                      │
│ Jan 15, 2024 • 5 min read • #nextjs #react         │
│                                [READ MORE >>]       │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ← Animated line   │
└──────────────────────────────────────────────────────┘
```

---

## 🎬 INTERACTION FLOWS

### Flow 1: Simple Search
```
Step 1: Focus search box
┌────────────────────┐
│ 🔍 SEARCH POSTS...|│
└────────────────────┘

Step 2: Type keyword
┌────────────────────┐
│ 🔍 nextjs|     [X]│
└────────────────────┘

Step 3: Results update instantly
[8 RESULTS]
Search: "nextjs"

Step 4: Clear search
[X] ← Click
↓
[12 RESULTS]  ← Back to all
```

### Flow 2: Advanced Filter
```
Step 1: Click FILTERS
[ 🔧 FILTERS ] ← Click
↓
[■ 🔧 FILTERS ] ← Black bg

Step 2: Panel slides open
┌──────────────────────┐
│ DATE RANGE //        │
│ TAGS //              │
└──────────────────────┘

Step 3: Select filters
[LAST WEEK]  ← Click
#design      ← Click
#tutorial    ← Click

Step 4: Results update
[3 RESULTS]
#design [X]  #tutorial [X]

Step 5: Clear all
[✕ CLEAR ALL] ← Click
↓
[12 RESULTS]  ← Reset
```

### Flow 3: Remove Individual Filter
```
Active filters:
#design [X]  #tutorial [X]  #ui [X]

Click X on #tutorial:
#design [X]  #ui [X]

Results update:
[5 RESULTS] → [7 RESULTS]
```

---

## 🎨 COLOR STATES

### Search Input
```
Normal:     White bg, Black border (4px)
Focus:      White bg, Black ring (4px), offset 2px
Hover:      White bg (no change)
```

### Buttons
```
Default:    White bg, Black border (2px)
Hover:      Black bg, White text
Active:     Black bg, White text
Disabled:   Gray bg, Gray text
```

### Filter Pills (Active)
```
Search:     Yellow-100 bg, Black border (2px)
Tags:       Black bg, White text
```

### Results Counter
```
Always:     Black bg, White text, Mono font
```

---

## 📐 SPACING & SIZING

### Search Bar
```
Height:     48px (py-4)
Border:     4px
Font:       text-sm, uppercase, tracking-wider
Icon:       20px (h-5 w-5)
```

### Filter Button
```
Height:     48px (py-4)
Padding:    24px horizontal (px-6)
Border:     4px
Font:       text-sm, uppercase, tracking-wider
```

### Tag Buttons
```
Height:     auto (py-1)
Padding:    12px horizontal (px-3)
Border:     2px
Font:       text-xs, uppercase
```

### Results Counter
```
Height:     auto (py-2)
Padding:    16px horizontal (px-4)
Font:       text-xs, uppercase, tracking-wider
```

---

## 🎯 RESPONSIVE BEHAVIOR

### Desktop (> 768px)
```
Search:     [────────────────────────────] [ FILTERS ]
Tags:       Wrap with horizontal scroll
Filter:     2 columns grid
Results:    Side by side display
```

### Tablet (768px)
```
Search:     [──────────────────] [ FILTERS ]
Tags:       Wrap with scroll
Filter:     2 columns grid
Results:    Stack pills
```

### Mobile (< 640px)
```
Search:     [──────────────]
            [ FILTERS ]
Tags:       Horizontal scroll
Filter:     1 column grid
Results:    Stack vertically
```

---

## ⚡ ANIMATION TIMINGS

### Search Input
```
Type:       Instant (0ms)
Clear:      Instant (0ms)
```

### Filter Panel
```
Open:       200ms slide down
Close:      200ms slide up
Easing:     ease-out
```

### Results Update
```
Fade in:    50ms per item
Stagger:    50ms delay
```

### Hover Effects
```
Button:     duration-0 (instant)
Card:       duration-200 (smooth)
Line:       duration-300 (animated)
```

---

## 🎪 SPECIAL EFFECTS

### Hover Line (Blog Cards)
```
Default: width: 0%
Hover:   width: 100%
Speed:   300ms
Color:   currentColor
```

### Filter Panel Collapse
```
Closed: height: 0, opacity: 0
Open:   height: auto, opacity: 1
Speed:  200ms
```

### Search Clear Button
```
Hidden: searchQuery === ''
Visible: searchQuery.length > 0
Fade:   Instant
```

---

## 🔥 PRO TIPS

### Visual Hierarchy
```
1. MEGA TITLE       ← 18rem font
2. Search Bar       ← 4px border, prominent
3. Results Counter  ← Black bg, stands out
4. Blog Cards       ← Large, bold titles
```

### Contrast
```
Black on White:  Default
White on Black:  Hover/Active
Yellow:          Search pill (highlight)
Gray:            Inactive/Meta
```

### Typography Scale
```
Title:       text-7xl → text-8xl
Subtitle:    text-lg
Body:        text-base
Meta:        text-xs
Mono:        Everywhere
```

---

**Visual Demo Complete! 🎨**

