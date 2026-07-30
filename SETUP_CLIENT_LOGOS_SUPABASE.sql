-- =====================================================
-- CLIENT LOGOS SETUP FOR SUPABASE
-- Run this in Supabase SQL Editor
-- =====================================================

-- 1. Create client_logos table
CREATE TABLE IF NOT EXISTS public.client_logos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    logo_url TEXT NOT NULL,
    website_url TEXT,
    order_index INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Add RLS (Row Level Security) policies
ALTER TABLE public.client_logos ENABLE ROW LEVEL SECURITY;

-- Allow public read access for published logos
CREATE POLICY "Enable read access for published logos" 
ON public.client_logos FOR SELECT 
USING (is_published = true);

-- Allow authenticated users (admin) full access
CREATE POLICY "Enable all access for authenticated users" 
ON public.client_logos FOR ALL 
USING (auth.role() = 'authenticated');

-- 3. Create indexes for better performance
CREATE INDEX idx_client_logos_order ON public.client_logos(order_index);
CREATE INDEX idx_client_logos_published ON public.client_logos(is_published);

-- 4. Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.client_logos
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- 5. Insert sample client logos (placeholder - ganti dengan logo real nanti)
INSERT INTO public.client_logos (name, logo_url, website_url, order_index) VALUES
('TOKOPEDIA', 'https://via.placeholder.com/120x60/22B14C/FFFFFF?text=TOKOPEDIA', 'https://tokopedia.com', 1),
('GOJEK', 'https://via.placeholder.com/120x60/00AA13/FFFFFF?text=GOJEK', 'https://gojek.com', 2),
('SHOPEE', 'https://via.placeholder.com/120x60/EE4D2D/FFFFFF?text=SHOPEE', 'https://shopee.co.id', 3),
('BUKALAPAK', 'https://via.placeholder.com/120x60/E31E52/FFFFFF?text=BUKALAPAK', 'https://bukalapak.com', 4),
('TRAVELOKA', 'https://via.placeholder.com/120x60/2F80ED/FFFFFF?text=TRAVELOKA', 'https://traveloka.com', 5),
('OVO', 'https://via.placeholder.com/120x60/4C3494/FFFFFF?text=OVO', 'https://ovo.id', 6),
('GRAB', 'https://via.placeholder.com/120x60/00B14F/FFFFFF?text=GRAB', 'https://grab.com', 7),
('DANA', 'https://via.placeholder.com/120x60/118EEA/FFFFFF?text=DANA', 'https://dana.id', 8);

-- 6. Verify data
SELECT * FROM public.client_logos ORDER BY order_index;

-- =====================================================
-- SUPABASE STORAGE SETUP (Run di Dashboard UI)
-- =====================================================
-- 
-- 1. Buka Supabase Dashboard → Storage
-- 2. Create New Bucket:
--    - Name: "client-logos"
--    - Public: TRUE (checkmark)
--    - File size limit: 2MB
--    - Allowed MIME types: image/png, image/jpeg, image/svg+xml
-- 
-- 3. Upload Policy (Optional - jika ingin upload dari client):
--    CREATE POLICY "Allow authenticated users to upload logos"
--    ON storage.objects FOR INSERT
--    TO authenticated
--    WITH CHECK (bucket_id = 'client-logos');
-- 
-- 4. Folder Structure (dalam bucket):
--    client-logos/
--    ├── tokopedia.png
--    ├── gojek.png
--    ├── shopee.png
--    └── ...
-- 
-- =====================================================

-- =====================================================
-- CARA UPLOAD LOGO KE SUPABASE STORAGE
-- =====================================================
-- 
-- OPTION 1: Via Supabase Dashboard (UI)
-- 1. Buka Storage → client-logos bucket
-- 2. Click "Upload File"
-- 3. Select logo files dari computer
-- 4. Upload
-- 5. Copy public URL dari setiap file
-- 6. Update table dengan URL tersebut
-- 
-- OPTION 2: Via Code (Programmatic)
-- See component example below in comments
-- 
-- =====================================================

-- =====================================================
-- UPDATE LOGO URL SETELAH UPLOAD
-- =====================================================
-- 
-- Setelah upload logo ke Storage, update URL di table:
-- 
-- UPDATE client_logos 
-- SET logo_url = 'https://dralqqfeqmhgrkjuebhd.supabase.co/storage/v1/object/public/client-logos/tokopedia.png'
-- WHERE name = 'TOKOPEDIA';
-- 
-- UPDATE client_logos 
-- SET logo_url = 'https://dralqqfeqmhgrkjuebhd.supabase.co/storage/v1/object/public/client-logos/gojek.png'
-- WHERE name = 'GOJEK';
-- 
-- ... dst untuk semua logo
-- 
-- =====================================================

-- =====================================================
-- ADMIN PANEL QUERIES (FOR FUTURE USE)
-- =====================================================

-- Get all logos (including unpublished)
-- SELECT * FROM client_logos ORDER BY order_index;

-- Get only published logos
-- SELECT * FROM client_logos WHERE is_published = true ORDER BY order_index;

-- Add new logo
-- INSERT INTO client_logos (name, logo_url, website_url, order_index)
-- VALUES ('NEW_CLIENT', 'https://...', 'https://...', 9);

-- Update logo
-- UPDATE client_logos 
-- SET name = 'UPDATED_NAME', 
--     logo_url = 'https://new-url.png',
--     website_url = 'https://new-site.com',
--     updated_at = NOW()
-- WHERE id = 'uuid-here';

-- Toggle publish status
-- UPDATE client_logos 
-- SET is_published = NOT is_published 
-- WHERE id = 'uuid-here';

-- Reorder logos
-- UPDATE client_logos SET order_index = 1 WHERE id = 'uuid-1';
-- UPDATE client_logos SET order_index = 2 WHERE id = 'uuid-2';

-- Delete logo
-- DELETE FROM client_logos WHERE id = 'uuid-here';

-- Count total logos
-- SELECT COUNT(*) as total_logos FROM client_logos;

-- Count published logos
-- SELECT COUNT(*) as published_logos FROM client_logos WHERE is_published = true;

-- =====================================================
-- COMPONENT INTEGRATION INSTRUCTIONS
-- =====================================================
-- 
-- After running this SQL, update the component:
-- 
-- File: components/sections/logo-ticker-brutalist.tsx
-- 
-- 1. Import Supabase client:
-- 
-- import { getSupabase } from '@/lib/supabase';
-- 
-- 2. Replace static logos array with dynamic fetch:
-- 
-- const [logos, setLogos] = useState([]);
-- const [loading, setLoading] = useState(true);
-- 
-- useEffect(() => {
--   fetchLogos();
-- }, []);
-- 
-- const fetchLogos = async () => {
--   const supabase = getSupabase();
--   if (!supabase) return;
--   
--   try {
--     const { data, error } = await supabase
--       .from('client_logos')
--       .select('*')
--       .eq('is_published', true)
--       .order('order_index', { ascending: true });
--     
--     if (!error && data) {
--       setLogos(data);
--     }
--   } catch (error) {
--     console.error('Error fetching logos:', error);
--   } finally {
--     setLoading(false);
--   }
-- };
-- 
-- 3. Add loading state in render:
-- 
-- {loading && (
--   <div className="text-center py-12">
--     <p className="text-xs font-mono uppercase tracking-widest text-gray-400">
--       LOADING.LOGOS...
--     </p>
--   </div>
-- )}
-- 
-- {!loading && logos.length === 0 && (
--   <div className="text-center py-12">
--     <p className="text-xs font-mono uppercase tracking-widest text-gray-400">
--       NO.LOGOS.YET
--     </p>
--   </div>
-- )}
-- 
-- =====================================================

-- =====================================================
-- UPLOAD HELPER FUNCTION (OPTIONAL)
-- =====================================================
-- 
-- Add this to your admin dashboard for easy logo upload:
-- 
-- const uploadLogo = async (file: File, clientName: string) => {
--   const supabase = getSupabase();
--   if (!supabase) return null;
-- 
--   try {
--     // Generate filename
--     const fileExt = file.name.split('.').pop();
--     const fileName = `${clientName.toLowerCase()}.${fileExt}`;
--     const filePath = fileName;
-- 
--     // Upload to Supabase Storage
--     const { data, error } = await supabase.storage
--       .from('client-logos')
--       .upload(filePath, file, {
--         cacheControl: '3600',
--         upsert: true, // Overwrite if exists
--       });
-- 
--     if (error) throw error;
-- 
--     // Get public URL
--     const { data: urlData } = supabase.storage
--       .from('client-logos')
--       .getPublicUrl(filePath);
-- 
--     return urlData.publicUrl;
--   } catch (error) {
--     console.error('Upload error:', error);
--     return null;
--   }
-- };
-- 
-- =====================================================

-- =====================================================
-- TIPS FOR LOGO PREPARATION
-- =====================================================
-- 
-- 1. Format: PNG with transparent background (BEST)
-- 2. Size: 120-150px width, 60-80px height
-- 3. Ratio: 2:1 or 3:2 (landscape)
-- 4. File size: Max 2MB, recommended 50-200KB
-- 5. Resolution: @2x for retina displays (240x120px)
-- 6. Background: Transparent or white
-- 7. Color: Any color (CSS will auto-convert to B&W)
-- 8. Compression: Use TinyPNG or similar before upload
-- 
-- =====================================================

-- =====================================================
-- TROUBLESHOOTING
-- =====================================================
-- 
-- Issue: "Cannot read properties of null"
-- Fix: Ensure Supabase client is initialized in .env.local
-- 
-- Issue: "Permission denied"
-- Fix: Check RLS policies, ensure is_published = true
-- 
-- Issue: "Logo not showing"
-- Fix: Verify logo_url is correct public URL from Storage
-- 
-- Issue: "CORS error"
-- Fix: Ensure bucket is set to PUBLIC in Storage settings
-- 
-- =====================================================

-- Done! 🎉
-- Now you can:
-- 1. Create "client-logos" bucket in Supabase Storage (UI)
-- 2. Upload logo files to the bucket
-- 3. Copy public URLs
-- 4. Update table with real URLs (replace placeholder URLs)
-- 5. Update component to fetch from database
