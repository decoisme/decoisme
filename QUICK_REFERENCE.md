# 🚀 Quick Reference - Order Page

## ⚡ Quick Start

```bash
cd decoisme
npm run dev
# Open http://localhost:3000
# Scroll to Pricing → Click "Order Carousel"
```

---

## 📋 Checklist

### Before Testing:
- [ ] Update WhatsApp number in `app/order/page.tsx` (line ~90)
- [ ] Run `npm run dev`
- [ ] Open browser to localhost:3000

### Testing:
- [ ] Navigate to Pricing section
- [ ] Click "Order Carousel" button
- [ ] Complete all 4 steps
- [ ] Verify price calculation
- [ ] Test WhatsApp integration
- [ ] Test on mobile
- [ ] Test dark mode

### Before Deploy:
- [ ] WhatsApp number updated
- [ ] All tests passed
- [ ] Build successful (`npm run build`)
- [ ] Environment variables set

---

## 💰 Price Formula

```
TOTAL = 60.000 (base)
      + (slides - 3) × 10.000 (extra slides)
      + 30.000 (if express)
      + 25.000 (if concept)
      - 10.000 (if brand guidelines)
      - 5.000 (if assets)
      - 5.000 (if copywriting)
```

---

## 🔧 Quick Fixes

### Update WhatsApp Number:
```typescript
// File: app/order/page.tsx (line ~90)
const whatsappUrl = `https://wa.me/628XXXXXXXXXX?text=${encodeURIComponent(message)}`;
//                                 ↑ Change this
```

### Test Build:
```bash
npm run build
# Should show: Exit Code: 0
```

### Clear Cache (if needed):
```bash
rm -rf .next
npm run build
```

---

## 📂 Key Files

| File | Purpose |
|------|---------|
| `app/order/page.tsx` | Order page component |
| `components/sections/pricing-section.tsx` | Pricing section (updated) |
| `app/page.tsx` | Homepage (calculator removed) |
| `ORDER_PAGE_DOCUMENTATION.md` | Full technical docs |
| `CARA_ORDER_CAROUSEL.md` | Quick guide (ID) |
| `ORDER_FLOW_DIAGRAM.md` | Visual diagrams |

---

## 🎯 User Flow

```
Homepage → Pricing → Order Carousel
  ↓
Step 1: Slides (3-10+)
  ↓
Step 2: Modifiers
  ↓
Step 3: Client Info
  ↓
Step 4: Review
  ↓
WhatsApp
```

---

## 💡 Quick Tips

1. **Price always visible** - Sticky bottom indicator
2. **Can go back** - Navigation buttons in each step
3. **Form validation** - Required fields marked with *
4. **Real-time updates** - Price updates instantly
5. **Mobile-friendly** - Works on all devices

---

## 🐛 Troubleshooting

### Build fails?
```bash
rm -rf .next node_modules
npm install
npm run build
```

### WhatsApp not opening?
- Check number format: `628XXXXXXXXXX`
- No spaces, dashes, or +
- Must start with 62

### Price not updating?
- Check browser console for errors
- Try hard refresh (Ctrl+Shift+R)
- Clear browser cache

### Page not found?
- Ensure `app/order/page.tsx` exists
- Run `npm run dev` again
- Check for build errors

---

## 📞 Quick Contact

**WhatsApp Format:**
- Your number: 0812-3456-7890
- Format for code: 6281234567890
- No spaces, no dashes, no +

---

## ✅ Status

- Build: ✅ Success
- TypeScript: ✅ No errors
- Responsive: ✅ Mobile-first
- Dark mode: ✅ Supported
- Ready: ✅ For testing

---

## 🎨 Quick Design Reference

**Colors:**
- Primary: `from-yellow-600 to-amber-600`
- Success: `from-green-600 to-emerald-600`
- Accent: `amber-600`

**Animations:**
- Duration: 0.3-0.8s
- Easing: cubic-bezier
- Type: slide, fade, scale

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

**Version:** 1.0.0  
**Last Updated:** May 11, 2026  
**Status:** ✅ Ready
