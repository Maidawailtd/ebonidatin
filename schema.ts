import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const profiles = sqliteTable('profiles', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  fullName: text('full_name'),
  displayName: text('display_name'),
  bio: text('bio'),
  dateOfBirth: text('date_of_birth'),
  gender: text('gender'),
  interestedIn: text('interested_in'), // Stored as a JSON string
  location: text('location'),
  city: text('city'),
  state: text('state'),
  country: text('country'),
  profilePhotoUrl: text('profile_photo_url'),
  coverPhotoUrl: text('cover_photo_url'),
  additionalPhotos: text('additional_photos'), // Stored as a JSON string
  interests: text('interests'), // Stored as a JSON string
  badges: text('badges'), // Stored as a JSON string
  lookingFor: text('looking_for'),
  membershipTier: text('membership_tier').default('starter'),
  isVerified: integer('is_verified', { mode: 'boolean' }).default(false),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  lastActive: integer('last_active', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
  phone: text('phone'),
  userType: text('user_type').default('user'),
  emailVerified: integer('email_verified', { mode: 'boolean' }).default(false),
  termsAccepted: integer('terms_accepted', { mode: 'boolean' }).default(false),
  termsAcceptedAt: integer('terms_accepted_at', { mode: 'timestamp' }),
  verificationBadge: text('verification_badge'),
  followersCount: integer('followers_count').default(0),
  followingCount: integer('following_count').default(0),
  subscriptionTier: text('subscription_tier').default('free'),
  subscriptionExpiresAt: integer('subscription_expires_at', { mode: 'timestamp' }),
  galleryAccess: integer('gallery_access', { mode: 'boolean' }).default(false),
  isPublic: integer('is_public', { mode: 'boolean' }).default(false),
});

export const chat_messages = sqliteTable('chat_messages', {
  id: text('id').primaryKey(),
  sender_id: text('sender_id').notNull(),
  receiver_id: text('receiver_id').notNull(),
  message: text('message').notNull(),
  read: integer('read', { mode: 'boolean' }).default(false),
  created_at: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

export const contact_submissions = sqliteTable('contact_submissions', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  created_at: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});
