-- Create users table (managed by Supabase Auth)
-- Note: Supabase automatically creates a public.users table that is linked to auth.users.
-- We will add additional columns to this table.

-- User profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  bio TEXT,
  age INTEGER,
  gender TEXT, -- 'male', 'female', 'non-binary'
  looking_for TEXT, -- 'male', 'female', 'both'
  location_city TEXT,
  location_state TEXT,
  location_country TEXT,
  latitude REAL,
  longitude REAL,
  interested_in JSONB, -- JSON array of interests
  ethnicity TEXT,
  body_type TEXT,
  height TEXT,
  relationship_status TEXT, -- 'single', 'divorced', 'widowed'
  have_children BOOLEAN,
  want_children TEXT, -- 'yes', 'no', 'undecided'
  education TEXT,
  occupation TEXT,
  income_range TEXT,
  dating_preferences JSONB, -- JSON object of preferences
  profile_completion_percent INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profile photos table
CREATE TABLE IF NOT EXISTS profile_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  thumbnail_url TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Model portfolio table
CREATE TABLE IF NOT EXISTS model_portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  portfolio_type TEXT, -- 'commercial', 'fashion', 'fitness', 'glamour', 'parts', 'other'
  height TEXT,
  weight TEXT,
  dress_size TEXT,
  shoe_size TEXT,
  hair_color TEXT,
  eye_color TEXT,
  measurements JSONB, -- JSON object
  availability TEXT,
  rate_per_hour DECIMAL,
  representation TEXT,
  agency_name TEXT,
  portfolio_url TEXT,
  verified_model BOOLEAN DEFAULT FALSE,
  experience_level TEXT, -- 'beginner', 'intermediate', 'professional'
  certifications JSONB, -- JSON array
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Matches table
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id_1 UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_id_2 UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending', -- 'pending', 'matched', 'rejected', 'blocked'
  matched_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id_1, user_id_2)
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Likes/favorites table
CREATE TABLE IF NOT EXISTS likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  liker_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  liked_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(liker_id, liked_user_id)
);

-- Blocks table
CREATE TABLE IF NOT EXISTS blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blocker_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  blocked_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(blocker_id, blocked_user_id)
);

-- Subscriptions/Payments table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  tier TEXT NOT NULL, -- 'premium', 'vip', 'agency'
  status TEXT DEFAULT 'active', -- 'active', 'cancelled', 'expired'
  price_per_month DECIMAL,
  started_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Verification requests table
CREATE TABLE IF NOT EXISTS verification_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  verification_type TEXT, -- 'selfie', 'document', 'video'
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  submission_url TEXT,
  rejection_reason TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reports/Moderation table
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reported_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'resolved', 'dismissed'
  resolved_by UUID REFERENCES auth.users(id),
  action_taken TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- Bookings table for model gig requests
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  model_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_date TIMESTAMPTZ NOT NULL,
  event_type TEXT, -- 'photoshoot', 'runway', 'commercial', 'custom'
  details TEXT,
  budget DECIMAL,
  status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'rejected', 'completed'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'like', 'match', 'message', 'booking', 'review'
  actor_id UUID REFERENCES auth.users(id),
  related_id UUID,
  content TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reviewed_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rating DECIMAL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  booking_id UUID REFERENCES bookings(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profile_photos_user_id ON profile_photos(user_id);
CREATE INDEX IF NOT EXISTS idx_matches_user_1 ON matches(user_id_1);
CREATE INDEX IF NOT EXISTS idx_matches_user_2 ON matches(user_id_2);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_likes_liker ON likes(liker_id);
CREATE INDEX IF NOT EXISTS idx_blocks_blocker ON blocks(blocker_id);
CREATE INDEX IF NOT EXISTS idx_bookings_requester ON bookings(requester_id);
CREATE INDEX IF NOT EXISTS idx_bookings_model ON bookings(model_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewed_user ON reviews(reviewed_user_id);
