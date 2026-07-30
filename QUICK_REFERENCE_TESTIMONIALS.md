# ⚡ QUICK REFERENCE: EDIT TESTIMONIALS

## 🎯 TL;DR
Testimonials sekarang pakai **Supabase**. Edit langsung di dashboard, refresh browser, done!

---

## 🚀 FASTEST WAY TO EDIT

### **1. Login Supabase**
```
https://supabase.com
→ Login
→ Select project: decoisme
```

### **2. Open Table**
```
Sidebar → Table Editor
→ Select: testimonials
```

### **3. Edit Data**
```
Click cell → Edit → Enter
atau
Click row → Edit icon → Save
```

### **4. See Changes**
```
Refresh website: Ctrl + Shift + R
```

**DONE!** ✅

---

## ➕ ADD NEW TESTIMONIAL (GUI)

```
1. Click "+ Insert row"
2. Fill fields:
   - client_name: "JOHN DOE" (UPPERCASE)
   - client_company: "COMPANY.NAME" (DOTS)
   - review: "Review text here..."
   - project_type: "Brand Design"
   - date: "2024.05" (YYYY.MM)
   - order_index: 7 (next number)
   - is_published: ✓ (checked)
3. Click "Save"
4. Refresh browser
```

---

## ➕ ADD NEW TESTIMONIAL (SQL)

```sql
INSERT INTO testimonials (
  client_name, 
  client_company, 
  review, 
  project_type, 
  date, 
  order_index
) VALUES (
  'JOHN DOE',
  'STARTUP.ID',
  'Amazing work! Highly recommend.',
  'Brand Design',
  '2024.05',
  7
);
```

---

## ✏️ EDIT EXISTING

```sql
UPDATE testimonials 
SET review = 'New review text'
WHERE client_name = 'BUDI SANTOSO';
```

---

## 🗑️ DELETE (HIDE)

**Recommended:** Hide instead of delete
```sql
UPDATE testimonials 
SET is_published = false
WHERE id = 'uuid-here';
```

**Permanent Delete:**
```sql
DELETE FROM testimonials WHERE id = 'uuid-here';
```

---

## 🔢 REORDER

Change `order_index`:
- `1` = First (top)
- `2` = Second
- `3` = Third
- etc.

```sql
UPDATE testimonials 
SET order_index = 1
WHERE id = 'uuid-here';
```

---

## 📋 FORMAT RULES

| Field | Format | Example |
|-------|--------|---------|
| **client_name** | UPPERCASE | `BUDI SANTOSO` |
| **client_company** | UPPERCASE + DOTS | `UMKM.QRIS` |
| **project_type** | Title Case | `Brand Design` |
| **date** | YYYY.MM | `2024.05` |
| **order_index** | Number | `1`, `2`, `3` |
| **is_published** | Boolean | `true` / `false` |

---

## 🐛 TROUBLESHOOTING

### Not showing on website?
```
✅ Check: is_published = true
✅ Hard refresh: Ctrl + Shift + R
✅ Check console: F12 → Console tab
```

### Wrong order?
```
✅ Fix order_index (1, 2, 3...)
```

### Can't save?
```
✅ Fill all required fields:
   - client_name
   - client_company
   - review
   - project_type
   - date
```

---

## 📄 FULL DOCS

- 📖 **User Guide:** `CARA_EDIT_TESTIMONIALS.md`
- 🔧 **Tech Docs:** `TESTIMONIALS_SUPABASE_COMPLETE.md`
- 📊 **Summary:** `UPDATE_SUMMARY.md`

---

## ✅ QUICK CHECKLIST

Before publishing:
- [ ] client_name is UPPERCASE
- [ ] client_company uses DOTS format
- [ ] date format: YYYY.MM
- [ ] is_published = true
- [ ] order_index is correct
- [ ] No typos in review
- [ ] Tested on website

---

**Need help?** Read full guide: `CARA_EDIT_TESTIMONIALS.md`
