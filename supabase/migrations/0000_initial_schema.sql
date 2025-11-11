CREATE TABLE `profiles` (
  `id` text PRIMARY KEY NOT NULL,
  `email` text NOT NULL,
  `full_name` text,
  `display_name` text,
  `bio` text,
  `date_of_birth` text,
  `gender` text,
  `interested_in` text,
  `location` text,
  `city` text,
  `state` text,
  `country` text,
  `profile_photo_url` text,
  `cover_photo_url` text,
  `additional_photos` text,
  `interests` text,
  `badges` text,
  `looking_for` text,
  `membership_tier` text DEFAULT 'starter',
  `is_verified` integer DEFAULT 0,
  `is_active` integer DEFAULT 1,
  `last_active` integer DEFAULT (strftime('%s', 'now')),
  `created_at` integer DEFAULT (strftime('%s', 'now')),
  `updated_at` integer DEFAULT (strftime('%s', 'now')),
  `phone` text,
  `user_type` text DEFAULT 'user',
  `email_verified` integer DEFAULT 0,
  `terms_accepted` integer DEFAULT 0,
  `terms_accepted_at` integer,
  `verification_badge` text,
  `followers_count` integer DEFAULT 0,
  `following_count` integer DEFAULT 0,
  `subscription_tier` text DEFAULT 'free',
  `subscription_expires_at` integer,
  `gallery_access` integer DEFAULT 0,
  `is_public` integer DEFAULT 0
);

CREATE TABLE `chat_messages` (
  `id` text PRIMARY KEY NOT NULL,
  `sender_id` text NOT NULL,
  `receiver_id` text NOT NULL,
  `message` text NOT NULL,
  `read` integer DEFAULT 0,
  `created_at` integer DEFAULT (strftime('%s', 'now'))
);

CREATE TABLE `contact_submissions` (
  `id` text PRIMARY KEY NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `subject` text NOT NULL,
  `message` text NOT NULL,
  `created_at` integer DEFAULT (strftime('%s', 'now'))
);
