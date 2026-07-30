-- =====================================================
-- TESTIMONIALS TABLE SETUP FOR SUPABASE
-- Run this in Supabase SQL Editor
-- =====================================================

-- 1. Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    client_company TEXT NOT NULL,
    review TEXT NOT NULL,
    project_type TEXT NOT NULL,
    date TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Add RLS (Row Level Security) policies
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Allow public read access for published testimonials
CREATE POLICY "Enable read access for published testimonials" 
ON public.testimonials FOR SELECT 
USING (is_published = true);

-- Allow authenticated users (admin) full access
CREATE POLICY "Enable all access for authenticated users" 
ON public.testimonials FOR ALL 
USING (auth.role() = 'authenticated');

-- 3. Create indexes for better performance
CREATE INDEX idx_testimonials_order ON public.testimonials(order_index);
CREATE INDEX idx_testimonials_published ON public.testimonials(is_published);
CREATE INDEX idx_testimonials_date ON public.testimonials(date DESC);

-- 4. Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- 5. Insert sample testimonials
INSERT INTO public.testimonials (client_name, client_company, review, project_type, date, order_index) VALUES
('BUDI SANTOSO', 'UMKM.QRIS', 'Design carousel-nya clean banget, engagement Instagram naik 300% dalam 2 minggu. Respon cepat, revisi on-point.', 'Carousel Post', '2024.01', 1),
('SARAH WIJAYA', 'SKINCARE.BRAND', 'Professional, fast delivery, dan hasilnya exceed expectations. Brand guidelines langsung diterapkan dengan sempurna.', 'Brand Design', '2024.02', 2),
('MICHAEL CHEN', 'TECH.STARTUP', 'Minimal, modern, exactly what we needed. Express delivery benar-benar 24 jam. Highly recommended untuk startup yang butuh cepat.', 'UI Design', '2024.03', 3),
('DEWI KARTIKA', 'FOOD.BLOGGER', 'Dari concept sampe final design, semua dibimbing dengan detail. Hasil design bikin feed Instagram lebih cohesive dan aesthetic.', 'Social Media', '2024.03', 4),
('REZA FADILLAH', 'IDN.PRIORITY', 'Value for money banget. Kualitas setara agency mahal tapi harga freelance. Communication juga smooth via WhatsApp.', 'Carousel Post', '2024.04', 5),
('JESSICA TAN', 'E-COMMERCE.SG', 'Fast turnaround, clear communication, professional quality. Payment via PayPal was seamless. Will work again for future campaigns.', 'Campaign Design', '2024.04', 6);

-- 6. Verify data
SELECT * FROM public.testimonials ORDER BY order_index;

-- =====================================================
-- COMPONENT UPDATE INSTRUCTIONS
-- =====================================================
-- After running this SQL, update the component:
--
-- File: components/sections/testimonials-brutalist.tsx
--
-- 1. Replace static testimonials array with Supabase fetch:
--
-- import { getSupabase } from '@/lib/supabase';
--
-- const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
-- const [loading, setLoading] = useState(true);
--
-- useEffect(() => {
--   fetchTestimonials();
-- }, []);
--
-- const fetchTestimonials = async () => {
--   const supabase = getSupabase();
--   if (!supabase) return;
--   
--   try {
--     const { data, error } = await supabase
--       .from('testimonials')
--       .select('*')
--       .eq('is_published', true)
--       .order('order_index', { ascending: true });
--     
--     if (!error && data) {
--       setTestimonials(data);
--     }
--   } catch (error) {
--     console.error('Error fetching testimonials:', error);
--   } finally {
--     setLoading(false);
--   }
-- };
--
-- 2. Add loading state in render:
--
-- {loading && (
--   <div className="text-center py-24">
--     <p className="text-sm text-gray-400 font-mono uppercase tracking-widest">
--       Loading reviews...
--     </p>
--   </div>
-- )}
--
-- {!loading && testimonials.length === 0 && (
--   <div className="text-center py-24">
--     <p className="text-sm text-gray-400 font-mono uppercase tracking-widest">
--       No reviews yet
--     </p>
--   </div>
-- )}
-- =====================================================

-- =====================================================
-- ADMIN PANEL QUERIES (FOR FUTURE USE)
-- =====================================================

-- Get all testimonials (including unpublished)
-- SELECT * FROM testimonials ORDER BY order_index;

-- Get only published testimonials
-- SELECT * FROM testimonials WHERE is_published = true ORDER BY order_index;

-- Update testimonial
-- UPDATE testimonials 
-- SET client_name = 'NEW NAME', 
--     review = 'NEW REVIEW',
--     updated_at = NOW()
-- WHERE id = 'uuid-here';

-- Toggle publish status
-- UPDATE testimonials 
-- SET is_published = NOT is_published 
-- WHERE id = 'uuid-here';

-- Reorder testimonials
-- UPDATE testimonials SET order_index = 1 WHERE id = 'uuid-1';
-- UPDATE testimonials SET order_index = 2 WHERE id = 'uuid-2';

-- Delete testimonial
-- DELETE FROM testimonials WHERE id = 'uuid-here';

-- =====================================================
-- STORAGE SETUP (OPTIONAL - FOR CLIENT LOGOS)
-- =====================================================

-- If you want to add client logo images later:
-- 
-- 1. Create storage bucket in Supabase Dashboard:
--    - Bucket name: testimonial-logos
--    - Public: true
--    - File size limit: 1MB
--    - Allowed MIME types: image/png, image/jpeg, image/svg+xml
--
-- 2. Add logo_url column:
-- ALTER TABLE public.testimonials 
-- ADD COLUMN logo_url TEXT;
--
-- 3. Update RLS policies for storage bucket
-- =====================================================
