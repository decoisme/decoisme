# Setup Supabase untuk Decoisme Portfolio

## 📋 Daftar Isi
1. [Persiapan](#persiapan)
2. [Membuat Project Supabase](#membuat-project-supabase)
3. [Setup Database](#setup-database)
4. [Konfigurasi Environment Variables](#konfigurasi-environment-variables)
5. [Testing](#testing)
6. [Troubleshooting](#troubleshooting)

---

## Persiapan

### Yang Dibutuhkan
- ✅ Akun Supabase (gratis) - [Daftar di sini](https://supabase.com)
- ✅ Project Next.js sudah running
- ✅ Text editor (VS Code recommended)

### Estimasi Waktu
⏱️ **15-20 menit** untuk setup lengkap

---

## Membuat Project Supabase

### Step 1: Buat Akun & Project

1. **Buka** [https://supabase.com](https://supabase.com)
2. **Klik** "Start your project" atau "Sign In"
3. **Login** dengan GitHub/Google/Email
4. **Klik** "New Project"
5. **Isi form:**
   - **Name**: `decoisme-portfolio` (atau nama lain)
   - **Database Password**: Buat password yang kuat (SIMPAN INI!)
   - **Region**: Pilih yang terdekat (e.g., `Southeast Asia (Singapore)`)
   - **Pricing Plan**: Free (cukup untuk portfolio)
6. **Klik** "Create new project"
7. **Tunggu** ~2 menit sampai project selesai dibuat

### Step 2: Dapatkan API Keys

1. Di dashboard Supabase, **klik** ⚙️ **Settings** (sidebar kiri bawah)
2. **Klik** **API** di menu settings
3. **Copy** dua nilai ini:
   - ✅ **Project URL** (contoh: `https://xxxxx.supabase.co`)
   - ✅ **anon public** key (key yang panjang)

**⚠️ PENTING:** Simpan kedua nilai ini, akan digunakan di step berikutnya!

---

## Setup Database

### Step 1: Buka SQL Editor

1. Di dashboard Supabase, **klik** 🗄️ **SQL Editor** (sidebar kiri)
2. **Klik** "+ New query"

### Step 2: Jalankan Schema SQL

**Copy semua SQL di bawah ini** dan paste ke SQL Editor, lalu **klik "Run"**:

```sql
-- ============================================
-- DECOISME PORTFOLIO DATABASE SCHEMA
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. PROJECTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  short_description TEXT,
  description TEXT NOT NULL,
  image_url TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  category TEXT NOT NULL DEFAULT 'Web Design',
  date TEXT NOT NULL,
  platform TEXT[] DEFAULT '{}',
  tech_stack TEXT[] DEFAULT '{}',
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. CONTACT MESSAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. SKILLS TABLE (Optional - for dynamic skills)
-- ============================================
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  proficiency INTEGER CHECK (proficiency >= 0 AND proficiency <= 100),
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_contact_read ON contact_messages(read);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_order ON skills(order_index);

-- ============================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Projects: Public can read, authenticated can write
CREATE POLICY "Public can view projects"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  USING (auth.role() = 'authenticated');

-- Contact Messages: Anyone can insert, authenticated can read
CREATE POLICY "Anyone can submit contact form"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view messages"
  ON contact_messages FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update messages"
  ON contact_messages FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Skills: Public can read, authenticated can write
CREATE POLICY "Public can view skills"
  ON skills FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage skills"
  ON skills FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================
-- 6. FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for projects table
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 7. SAMPLE DATA
-- ============================================

-- Insert sample projects
INSERT INTO projects (
  title, 
  short_description, 
  description, 
  category, 
  date, 
  platform, 
  tech_stack, 
  featured, 
  order_index,
  gallery_images
) VALUES
(
  'E-Commerce Mobile App',
  'Modern shopping experience with intuitive UI',
  'A comprehensive e-commerce mobile application featuring a clean, modern interface with smooth animations and intuitive navigation. Designed with user experience in mind, incorporating best practices in mobile UI/UX design.',
  'UI/UX Design',
  'January 2024',
  ARRAY['Figma', 'Mobile Design', 'Prototyping'],
  ARRAY['React Native', 'TypeScript', 'Tailwind CSS'],
  true,
  1,
  ARRAY[]::TEXT[]
),
(
  'SaaS Dashboard',
  'Analytics dashboard with data visualization',
  'A powerful SaaS dashboard featuring comprehensive data visualization, real-time analytics, and an intuitive interface. Built with modern design principles and optimized for performance.',
  'Web Design',
  'December 2023',
  ARRAY['Figma', 'Web Design', 'Design System'],
  ARRAY['Next.js', 'Supabase', 'Chart.js'],
  true,
  2,
  ARRAY[]::TEXT[]
),
(
  'Brand Identity Design',
  'Complete brand identity including logo and guidelines',
  'A comprehensive brand identity project including logo design, color palette, typography system, and brand guidelines. Created to establish a strong, memorable brand presence.',
  'Branding',
  'November 2023',
  ARRAY['Adobe Illustrator', 'Figma', 'Brand Design'],
  ARRAY['Design System', 'Style Guide'],
  true,
  3,
  ARRAY[]::TEXT[]
);

-- Insert sample skills
INSERT INTO skills (name, category, proficiency, order_index) VALUES
-- UI/UX Design
('Figma', 'UI/UX Design', 95, 1),
('Wireframing', 'UI/UX Design', 90, 2),
('Prototyping', 'UI/UX Design', 90, 3),
('User Flow Design', 'UI/UX Design', 85, 4),
('Design System', 'UI/UX Design', 85, 5),

-- Frontend
('Next.js', 'Frontend Development', 90, 10),
('React.js', 'Frontend Development', 90, 11),
('TypeScript', 'Frontend Development', 85, 12),
('Tailwind CSS', 'Frontend Development', 95, 13),

-- Backend
('Node.js', 'Backend Development', 80, 20),
('Supabase', 'Backend Development', 85, 21),
('PostgreSQL', 'Backend Development', 75, 22),

-- Social Media
('Content Planning', 'Social Media Design', 90, 30),
('Instagram Feed Design', 'Social Media Design', 95, 31),
('Adobe Photoshop', 'Social Media Design', 85, 32);
```

### Step 3: Verifikasi

Setelah SQL berhasil dijalankan, **verifikasi** dengan:

1. **Klik** 🗄️ **Table Editor** (sidebar kiri)
2. **Cek** apakah ada 3 tables:
   - ✅ `projects` (dengan 3 sample data)
   - ✅ `contact_messages` (kosong)
   - ✅ `skills` (dengan sample data)

**✅ Jika semua table muncul, database setup BERHASIL!**

---

## Konfigurasi Environment Variables

### Step 1: Buat File .env.local

Di root folder project (`decoisme/`), buat file `.env.local`:

```bash
# Di terminal/command prompt
cd decoisme
touch .env.local  # Mac/Linux
# atau
type nul > .env.local  # Windows
```

### Step 2: Isi Environment Variables

Buka `.env.local` dan isi dengan:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Replace dengan nilai dari Step 2 di atas!
```

**⚠️ PENTING:**
- Ganti `https://xxxxx.supabase.co` dengan **Project URL** kamu
- Ganti `eyJhbGciOi...` dengan **anon public key** kamu
- **JANGAN** commit file ini ke Git (sudah ada di `.gitignore`)

### Step 3: Restart Development Server

```bash
# Stop server (Ctrl+C)
# Start ulang
npm run dev
```

---

## Testing

### Test 1: Cek Projects Loading

1. **Buka** browser: `http://localhost:3000`
2. **Scroll** ke section "Featured Projects"
3. **Cek** apakah muncul 3 sample projects:
   - E-Commerce Mobile App
   - SaaS Dashboard
   - Brand Identity Design

**✅ Jika muncul = Supabase connection BERHASIL!**

### Test 2: Cek Contact Form

1. **Scroll** ke section "Contact"
2. **Isi** form:
   - Name: Test User
   - Email: test@example.com
   - Message: Testing contact form
3. **Klik** "Send Message"
4. **Cek** apakah muncul toast "Message sent successfully!"

**Verifikasi di Supabase:**
1. Buka Supabase dashboard
2. Klik **Table Editor** → `contact_messages`
3. Cek apakah ada data baru

**✅ Jika data masuk = Contact form BERHASIL!**

---

## Troubleshooting

### ❌ Error: "Invalid supabaseUrl"

**Solusi:**
```bash
# 1. Cek file .env.local ada
# 2. Cek isi file
# 3. Restart server: npm run dev
```

### ❌ Projects tidak muncul

**Solusi:**
```sql
-- Jalankan di SQL Editor
SELECT * FROM projects;
```

---

## Checklist Setup

- [ ] ✅ Akun Supabase dibuat
- [ ] ✅ Project Supabase dibuat
- [ ] ✅ SQL schema dijalankan
- [ ] ✅ 3 tables dibuat
- [ ] ✅ Sample data ter-insert
- [ ] ✅ API keys di-copy
- [ ] ✅ File `.env.local` dibuat
- [ ] ✅ Environment variables diisi
- [ ] ✅ Server di-restart
- [ ] ✅ Projects muncul di homepage
- [ ] ✅ Contact form berfungsi

---

Selamat! Portfolio kamu sekarang sudah connected dengan Supabase! 🎉
