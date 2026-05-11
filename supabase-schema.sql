-- Supabase Database Schema for Decoisme Portfolio
-- Updated version with new project structure

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROJECTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  platform TEXT[] NOT NULL DEFAULT '{}',
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  github_url TEXT,
  live_url TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- CONTACT MESSAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- SKILLS TABLE (Optional - for future expansion)
-- ============================================
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_messages_read ON contact_messages(read);
CREATE INDEX IF NOT EXISTS idx_messages_created ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_order ON skills(order_index);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES - PROJECTS
-- ============================================

-- Public can view all projects
CREATE POLICY "Public can view projects" ON projects
  FOR SELECT USING (true);

-- Authenticated users can insert projects
CREATE POLICY "Authenticated users can insert projects" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Authenticated users can update projects
CREATE POLICY "Authenticated users can update projects" ON projects
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Authenticated users can delete projects
CREATE POLICY "Authenticated users can delete projects" ON projects
  FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- RLS POLICIES - CONTACT MESSAGES
-- ============================================

-- Anyone can insert contact messages
CREATE POLICY "Anyone can insert contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Authenticated users can view contact messages
CREATE POLICY "Authenticated users can view contact messages" ON contact_messages
  FOR SELECT USING (auth.role() = 'authenticated');

-- Authenticated users can update contact messages (mark as read)
CREATE POLICY "Authenticated users can update contact messages" ON contact_messages
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Authenticated users can delete contact messages
CREATE POLICY "Authenticated users can delete contact messages" ON contact_messages
  FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- RLS POLICIES - SKILLS
-- ============================================

-- Public can view skills
CREATE POLICY "Public can view skills" ON skills
  FOR SELECT USING (true);

-- Authenticated users can manage skills
CREATE POLICY "Authenticated users can insert skills" ON skills
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update skills" ON skills
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete skills" ON skills
  FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- SAMPLE DATA - PROJECTS
-- ============================================
INSERT INTO projects (
  title, 
  short_description, 
  description, 
  image_url, 
  gallery_images,
  category, 
  date, 
  platform, 
  tech_stack, 
  github_url, 
  live_url, 
  featured, 
  order_index
) VALUES
  (
    'E-Commerce Mobile App',
    'Modern shopping experience with intuitive UI and smooth animations',
    'A comprehensive e-commerce mobile application featuring a clean, modern interface with smooth animations and intuitive navigation. Designed with user experience in mind, incorporating best practices in mobile UI/UX design. The app includes features like product browsing, cart management, secure checkout, and order tracking.',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    ARRAY[
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800'
    ],
    'UI/UX Design',
    'January 2024',
    ARRAY['Figma', 'Mobile Design', 'Prototyping', 'User Research'],
    ARRAY['React Native', 'TypeScript', 'Tailwind CSS', 'Redux'],
    'https://github.com',
    'https://example.com',
    true,
    1
  ),
  (
    'SaaS Dashboard',
    'Analytics dashboard with data visualization and real-time updates',
    'A powerful SaaS dashboard featuring comprehensive data visualization, real-time analytics, and an intuitive interface. Built with modern design principles and optimized for performance. Includes customizable widgets, advanced filtering, and export capabilities.',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    ARRAY[
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800'
    ],
    'Web Design',
    'December 2023',
    ARRAY['Figma', 'Web Design', 'Design System', 'Data Visualization'],
    ARRAY['Next.js', 'Supabase', 'Chart.js', 'Tailwind CSS'],
    'https://github.com',
    'https://example.com',
    true,
    2
  ),
  (
    'Brand Identity Design',
    'Complete brand identity including logo, colors, and guidelines',
    'A comprehensive brand identity project including logo design, color palette, typography system, and brand guidelines. Created to establish a strong, memorable brand presence across all touchpoints. Includes business cards, letterheads, and social media templates.',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    ARRAY[
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800',
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800'
    ],
    'Branding',
    'November 2023',
    ARRAY['Adobe Illustrator', 'Figma', 'Brand Design', 'Typography'],
    ARRAY['Design System', 'Style Guide', 'Brand Guidelines'],
    'https://github.com',
    'https://example.com',
    true,
    3
  );

-- ============================================
-- SAMPLE DATA - SKILLS
-- ============================================
INSERT INTO skills (name, category, order_index) VALUES
  -- UI/UX Design
  ('Figma', 'UI/UX Design', 1),
  ('Wireframing', 'UI/UX Design', 2),
  ('Prototyping', 'UI/UX Design', 3),
  ('User Flow Design', 'UI/UX Design', 4),
  ('Design System', 'UI/UX Design', 5),
  ('Mobile UI Design', 'UI/UX Design', 6),
  ('Web Interface Design', 'UI/UX Design', 7),
  ('Interaction Design', 'UI/UX Design', 8),
  ('Visual Hierarchy', 'UI/UX Design', 9),
  ('UX Research', 'UI/UX Design', 10),
  
  -- Frontend Development
  ('Next.js', 'Frontend Development', 11),
  ('React.js', 'Frontend Development', 12),
  ('TypeScript', 'Frontend Development', 13),
  ('Tailwind CSS', 'Frontend Development', 14),
  ('Responsive Web Design', 'Frontend Development', 15),
  ('Framer Motion', 'Frontend Development', 16),
  ('REST API Integration', 'Frontend Development', 17),
  ('UI Animation', 'Frontend Development', 18),
  
  -- Backend Development
  ('Node.js', 'Backend Development', 19),
  ('Supabase', 'Backend Development', 20),
  ('PostgreSQL', 'Backend Development', 21),
  ('Authentication System', 'Backend Development', 22),
  ('CRUD System', 'Backend Development', 23),
  ('API Development', 'Backend Development', 24),
  ('Database Design', 'Backend Development', 25),
  ('Server Deployment', 'Backend Development', 26),
  
  -- Social Media Design
  ('Content Planning', 'Social Media Design', 27),
  ('Instagram Feed Design', 'Social Media Design', 28),
  ('Short Form Content', 'Social Media Design', 29),
  ('Adobe Photoshop', 'Social Media Design', 30),
  ('Canva Creative Design', 'Social Media Design', 31);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- NOTES
-- ============================================
-- 1. Replace sample image URLs with your actual project images
-- 2. Update sample data with your real projects
-- 3. For production, implement proper authentication using Supabase Auth
-- 4. Consider adding more fields as needed (e.g., client_name, project_duration)
-- 5. Gallery images should be uploaded to Supabase Storage for better performance

-- ============================================
-- SUPABASE STORAGE SETUP (Optional)
-- ============================================
-- To use Supabase Storage for images:
-- 1. Go to Storage in Supabase Dashboard
-- 2. Create a new bucket called 'project-images'
-- 3. Set it to public
-- 4. Upload your images
-- 5. Use the public URL in your database

-- Example storage policy:
-- CREATE POLICY "Public Access"
-- ON storage.objects FOR SELECT
-- USING ( bucket_id = 'project-images' );

-- CREATE POLICY "Authenticated users can upload"
-- ON storage.objects FOR INSERT
-- WITH CHECK ( bucket_id = 'project-images' AND auth.role() = 'authenticated' );
