-- ============================================
-- UPDATE: Ganti dengan Placeholder Images
-- ============================================
-- Gunakan placeholder.com yang lebih reliable

UPDATE projects 
SET 
  image_url = CASE 
    WHEN title LIKE '%Commerce%' OR title LIKE '%Shopping%' OR title LIKE '%Mobile%' 
      THEN 'https://via.placeholder.com/800x600/FFD700/000000?text=E-Commerce+App'
    WHEN title LIKE '%Dashboard%' OR title LIKE '%SaaS%' OR title LIKE '%Analytics%'
      THEN 'https://via.placeholder.com/800x600/FFA500/000000?text=SaaS+Dashboard'
    WHEN title LIKE '%Brand%' OR title LIKE '%Identity%' OR title LIKE '%Logo%'
      THEN 'https://via.placeholder.com/800x600/FF8C00/000000?text=Brand+Identity'
    ELSE 'https://via.placeholder.com/800x600/FFD700/000000?text=Project'
  END,
  gallery_images = CASE 
    WHEN title LIKE '%Commerce%' OR title LIKE '%Shopping%' OR title LIKE '%Mobile%'
      THEN ARRAY[
        'https://via.placeholder.com/800x600/FFD700/000000?text=E-Commerce+1',
        'https://via.placeholder.com/800x600/FFD700/000000?text=E-Commerce+2',
        'https://via.placeholder.com/800x600/FFD700/000000?text=E-Commerce+3'
      ]
    WHEN title LIKE '%Dashboard%' OR title LIKE '%SaaS%' OR title LIKE '%Analytics%'
      THEN ARRAY[
        'https://via.placeholder.com/800x600/FFA500/000000?text=Dashboard+1',
        'https://via.placeholder.com/800x600/FFA500/000000?text=Dashboard+2',
        'https://via.placeholder.com/800x600/FFA500/000000?text=Dashboard+3'
      ]
    WHEN title LIKE '%Brand%' OR title LIKE '%Identity%' OR title LIKE '%Logo%'
      THEN ARRAY[
        'https://via.placeholder.com/800x600/FF8C00/000000?text=Branding+1',
        'https://via.placeholder.com/800x600/FF8C00/000000?text=Branding+2',
        'https://via.placeholder.com/800x600/FF8C00/000000?text=Branding+3'
      ]
    ELSE ARRAY[
      'https://via.placeholder.com/800x600/FFD700/000000?text=Project+1',
      'https://via.placeholder.com/800x600/FFD700/000000?text=Project+2',
      'https://via.placeholder.com/800x600/FFD700/000000?text=Project+3'
    ]
  END;

-- Verifikasi
SELECT title, image_url FROM projects ORDER BY order_index;
