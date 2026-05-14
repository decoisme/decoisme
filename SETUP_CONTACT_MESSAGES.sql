-- ============================================
-- SETUP CONTACT MESSAGES TABLE
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Create contact_messages table (if not exists)
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable RLS on contact_messages table
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- 3. Drop old policies (if any)
DROP POLICY IF EXISTS "Public can insert messages" ON contact_messages;
DROP POLICY IF EXISTS "Anyone can view messages" ON contact_messages;
DROP POLICY IF EXISTS "Anyone can update messages" ON contact_messages;

-- 4. Create policies for contact_messages
-- Allow anyone to insert (for contact form)
CREATE POLICY "Public can insert messages"
ON contact_messages FOR INSERT
WITH CHECK (true);

-- Allow anyone to view (for admin dashboard)
CREATE POLICY "Anyone can view messages"
ON contact_messages FOR SELECT
USING (true);

-- Allow anyone to update (for marking as read)
CREATE POLICY "Anyone can update messages"
ON contact_messages FOR UPDATE
USING (true);

-- 5. Insert sample messages for testing
INSERT INTO contact_messages (name, email, message, read, created_at) VALUES
  ('John Doe', 'john@example.com', 'Hi! I would like to discuss a project with you. Can we schedule a call?', false, NOW() - INTERVAL '2 hours'),
  ('Jane Smith', 'jane@example.com', 'Your portfolio looks amazing! I am interested in hiring you for a UI/UX project.', false, NOW() - INTERVAL '1 day'),
  ('Mike Johnson', 'mike@example.com', 'Great work on your recent projects! Would love to collaborate.', true, NOW() - INTERVAL '3 days'),
  ('Sarah Williams', 'sarah@example.com', 'I saw your work on Behance. Can you help with our website redesign?', false, NOW() - INTERVAL '5 hours'),
  ('David Brown', 'david@example.com', 'Impressive portfolio! Are you available for freelance work?', true, NOW() - INTERVAL '1 week')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- VERIFICATION
-- ============================================

-- Check if table was created
DO $$
DECLARE
  table_exists BOOLEAN;
BEGIN
  SELECT EXISTS(
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'contact_messages'
  ) INTO table_exists;
  
  IF table_exists THEN
    RAISE NOTICE '✅ Table "contact_messages" created successfully';
  ELSE
    RAISE EXCEPTION '❌ Table "contact_messages" not found';
  END IF;
END $$;

-- Check policies
DO $$
DECLARE
  policy_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO policy_count 
  FROM pg_policies 
  WHERE tablename = 'contact_messages';
  
  IF policy_count >= 3 THEN
    RAISE NOTICE '✅ Policies created successfully (% policies)', policy_count;
  ELSE
    RAISE WARNING '⚠️ Found % policies (expected 3)', policy_count;
  END IF;
END $$;

-- Show sample messages
SELECT 
  '=== SAMPLE MESSAGES ===' as section,
  id,
  name,
  email,
  LEFT(message, 50) || '...' as message_preview,
  read,
  created_at
FROM contact_messages
ORDER BY created_at DESC
LIMIT 5;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '========================================';
  RAISE NOTICE '✅ CONTACT MESSAGES SETUP COMPLETE!';
  RAISE NOTICE '========================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Refresh admin dashboard';
  RAISE NOTICE '2. Click "Messages" tab';
  RAISE NOTICE '3. You should see 5 sample messages';
  RAISE NOTICE '';
  RAISE NOTICE '========================================';
END $$;

-- ============================================
-- NOTES
-- ============================================

-- 1. Table: contact_messages
-- 2. Columns: id, name, email, message, read, created_at
-- 3. RLS enabled with 3 policies
-- 4. Sample data inserted for testing
-- 5. Contact form on homepage will insert to this table

