-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  email_verification_token TEXT,
  email_verification_token_expires_at DATETIME,
  account_type TEXT NOT NULL DEFAULT 'dater', -- 'dater', 'model', 'agency'
  subscription_tier TEXT DEFAULT 'free', -- 'free', 'premium', 'vip', 'agency'
  subscription_expires_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME
);

-- User profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id TEXT PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
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
  interested_in TEXT, -- JSON array of interests
  ethnicity TEXT,
  body_type TEXT,
  height TEXT,
  relationship_status TEXT, -- 'single', 'divorced', 'widowed'
  have_children BOOLEAN,
  want_children TEXT, -- 'yes', 'no', 'undecided'
  education TEXT,
  occupation TEXT,
  income_range TEXT,
  dating_preferences TEXT, -- JSON object of preferences
  profile_completion_percent INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Profile photos table
CREATE TABLE IF NOT EXISTS profile_photos (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  thumbnail_url TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Model portfolio table
CREATE TABLE IF NOT EXISTS model_portfolios (
  id TEXT PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  portfolio_type TEXT, -- 'commercial', 'fashion', 'fitness', 'glamour', 'parts', 'other'
  height TEXT,
  weight TEXT,
  dress_size TEXT,
  shoe_size TEXT,
  hair_color TEXT,
  eye_color TEXT,
  measurements TEXT, -- JSON object
  availability TEXT,
  rate_per_hour DECIMAL,
  representation TEXT,
  agency_name TEXT,
  portfolio_url TEXT,
  verified_model BOOLEAN DEFAULT FALSE,
  experience_level TEXT, -- 'beginner', 'intermediate', 'professional'
  certifications TEXT, -- JSON array
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Matches table
CREATE TABLE IF NOT EXISTS matches (
  id TEXT PRIMARY KEY,
  user_id_1 TEXT NOT NULL,
  user_id_2 TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'matched', 'rejected', 'blocked'
  matched_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id_1) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id_2) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id_1, user_id_2)
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  sender_id TEXT NOT NULL,
  recipient_id TEXT NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  read_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Likes/favorites table
CREATE TABLE IF NOT EXISTS likes (
  id TEXT PRIMARY KEY,
  liker_id TEXT NOT NULL,
  liked_user_id TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (liker_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (liked_user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(liker_id, liked_user_id)
);

-- Blocks table
CREATE TABLE IF NOT EXISTS blocks (
  id TEXT PRIMARY KEY,
  blocker_id TEXT NOT NULL,
  blocked_user_id TEXT NOT NULL,
  reason TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (blocker_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (blocked_user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(blocker_id, blocked_user_id)
);

-- Subscriptions/Payments table
CREATE TABLE IF NOT EXISTS subscriptions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  tier TEXT NOT NULL, -- 'premium', 'vip', 'agency'
  status TEXT DEFAULT 'active', -- 'active', 'cancelled', 'expired'
  price_per_month DECIMAL,
  started_at DATETIME,
  expires_at DATETIME,
  cancelled_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Verification requests table
CREATE TABLE IF NOT EXISTS verification_requests (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  verification_type TEXT, -- 'selfie', 'document', 'video'
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  submission_url TEXT,
  rejection_reason TEXT,
  reviewed_by TEXT,
  reviewed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (reviewed_by) REFERENCES users(id)
);

-- Reports/Moderation table
CREATE TABLE IF NOT EXISTS reports (
  id TEXT PRIMARY KEY,
  reporter_id TEXT NOT NULL,
  reported_user_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'resolved', 'dismissed'
  resolved_by TEXT,
  action_taken TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  resolved_at DATETIME,
  FOREIGN KEY (reporter_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (reported_user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (resolved_by) REFERENCES users(id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_profile_photos_user_id ON profile_photos(user_id);
CREATE INDEX IF NOT EXISTS idx_matches_user_1 ON matches(user_id_1);
CREATE INDEX IF NOT EXISTS idx_matches_user_2 ON matches(user_id_2);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_likes_liker ON likes(liker_id);
CREATE INDEX IF NOT EXISTS idx_blocks_blocker ON blocks(blocker_id);
