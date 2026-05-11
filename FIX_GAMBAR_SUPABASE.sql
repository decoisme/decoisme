-- ============================================
-- FIX: Update Projects dengan Gambar
-- ============================================
-- Jalankan SQL ini di Supabase SQL Editor untuk menambahkan gambar ke projects yang sudah ada

-- Opsi 1: Update project yang sudah ada (jika sudah ada data)
-- Ganti 'E-Commerce Mobile App' dengan title project Anda

UPDATE projects 
SET 
  image_url = 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
  gallery_images = ARRAY[
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=600&fit=crop'
  ]
WHERE title = 'E-Commerce Mobile App';

-- Jika ada project SaaS Dashboard
UPDATE projects 
SET 
  image_url = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  gallery_images = ARRAY[
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop'
  ]
WHERE title = 'SaaS Dashboard';

-- Jika ada project Brand Identity
UPDATE projects 
SET 
  image_url = 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
  gallery_images = ARRAY[
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop'
  ]
WHERE title = 'Brand Identity Design';

-- ============================================
-- Opsi 2: Hapus semua dan insert ulang dengan gambar
-- ============================================
-- HATI-HATI: Ini akan menghapus semua project yang ada!

-- Hapus semua projects
-- DELETE FROM projects;

-- Insert projects baru dengan gambar
-- INSERT INTO projects (
--   title,
--   short_description,
--   description,
--   image_url,
--   gallery_images,
--   category,
--   date,
--   platform,
--   tech_stack,
--   live_url,
--   featured,
--   order_index
-- ) VALUES
-- (
--   'E-Commerce Mobile App',
--   'Modern shopping experience with intuitive UI and smooth animations',
--   'A comprehensive e-commerce mobile application featuring a clean, modern interface with smooth animations and intuitive navigation. Designed with user experience in mind, incorporating best practices in mobile UI/UX design.',
--   'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
--   ARRAY[
--     'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
--     'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800&h=600&fit=crop',
--     'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=600&fit=crop'
--   ],
--   'UI/UX Design',
--   'January 2024',
--   ARRAY['Figma', 'Mobile Design', 'Prototyping'],
--   ARRAY['React Native', 'TypeScript', 'Tailwind'],
--   'https://example.com',
--   true,
--   1
-- ),
-- (
--   'SaaS Dashboard',
--   'Analytics dashboard with data visualization and real-time updates',
--   'A powerful SaaS dashboard featuring comprehensive data visualization, real-time analytics, and an intuitive interface. Built with modern design principles and optimized for performance.',
--   'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
--   ARRAY[
--     'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
--     'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
--     'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop'
--   ],
--   'Web Design',
--   'December 2023',
--   ARRAY['Figma', 'Web Design', 'Design System'],
--   ARRAY['Next.js', 'Supabase', 'Chart.js'],
--   'https://example.com',
--   true,
--   2
-- ),
-- (
--   'Brand Identity Design',
--   'Complete brand identity including logo, colors, and guidelines',
--   'A comprehensive brand identity project including logo design, color palette, typography system, and brand guidelines. Created to establish a strong, memorable brand presence.',
--   'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
--   ARRAY[
--     'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
--     'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop',
--     'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop'
--   ],
--   'Branding',
--   'November 2023',
--   ARRAY['Adobe Illustrator', 'Figma', 'Brand Design'],
--   ARRAY['Design System', 'Style Guide'],
--   'https://example.com',
--   true,
--   3
-- );

-- ============================================
-- Verifikasi: Cek data projects
-- ============================================
SELECT 
  id,
  title,
  image_url,
  array_length(gallery_images, 1) as gallery_count
FROM projects
ORDER BY order_index;
