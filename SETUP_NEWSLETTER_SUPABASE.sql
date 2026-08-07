-- ============================================
-- NEWSLETTER SUBSCRIPTION TABLE
-- ============================================
-- Run this in your Supabase SQL Editor

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  source TEXT DEFAULT 'website',
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed_at ON newsletter_subscribers(subscribed_at DESC);

-- Enable Row Level Security
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can subscribe (insert)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow anonymous to check if email exists (for duplicate prevention)
CREATE POLICY "Anyone can check email existence"
  ON newsletter_subscribers
  FOR SELECT
  TO anon
  USING (true);

-- Policy: Only authenticated users (admin) can view all subscribers
CREATE POLICY "Authenticated users can view all subscribers"
  ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users (admin) can update
CREATE POLICY "Authenticated users can update subscribers"
  ON newsletter_subscribers
  FOR UPDATE
  TO authenticated
  USING (true);

-- Policy: Only authenticated users (admin) can delete
CREATE POLICY "Authenticated users can delete subscribers"
  ON newsletter_subscribers
  FOR DELETE
  TO authenticated
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_newsletter_subscribers_updated_at
  BEFORE UPDATE ON newsletter_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample subscriber (optional, for testing)
-- INSERT INTO newsletter_subscribers (email, source) 
-- VALUES ('test@example.com', 'website');

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check if table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_name = 'newsletter_subscribers'
);

-- Count subscribers
SELECT COUNT(*) as total_subscribers FROM newsletter_subscribers;

-- View all subscribers
SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC;

-- ============================================
-- DONE!
-- ============================================
-- Newsletter table is ready to use!
