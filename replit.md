# Eboni Dating - Modern Dating Platform

## Overview
Eboni is a full-featured dating and modeling platform built with Next.js 15, Supabase, and TypeScript. The platform connects users looking for relationships while also providing a specialized modeling portfolio and booking system.

**Live Domain**: https://ebonidating.com

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Database & Auth**: Supabase (PostgreSQL + Auth)
- **Styling**: Tailwind CSS + shadcn/ui
- **Language**: TypeScript
- **Payments**: Stripe
- **Email**: SendGrid

## Project Architecture

### Database Schema
The application uses Supabase PostgreSQL with the following main tables:
- `users` - User accounts and authentication
- `user_profiles` - Detailed profile information
- `profile_photos` - User photos with ordering
- `model_portfolios` - Model-specific information
- `matches` - User matching system
- `messages` - Real-time messaging
- `likes` - Swipe/like functionality
- `blocks` - User blocking
- `subscriptions` - Stripe subscription management
- `bookings` - Model booking system
- `notifications` - In-app notifications
- `reports` - Content moderation
- `verification_requests` - User verification
- `reviews` - User reviews and ratings

### Authentication Flow
1. User signs up with email/password via Supabase Auth
2. Email verification link sent automatically
3. User clicks link → `/auth/confirm` route verifies token
4. Session managed via secure HTTP-only cookies
5. Middleware refreshes sessions automatically

### User Types
- **Dater**: Regular dating platform users
- **Model**: Users with portfolio and booking features
- **Agency**: Manage multiple models (future feature)
- **Admin**: Platform moderation and management

### Subscription Tiers
- **Free**: 5 likes/day, basic messaging, view matches
- **Premium** ($9.99/mo): Unlimited likes, priority messaging, advanced filters
- **VIP** ($19.99/mo): All Premium + verified badge, profile boost, ad-free
- **Agency** ($49.99/mo): Multi-model management, analytics, booking system

## Key Features

### ✅ Implemented
- User authentication with email verification (Supabase)
- Profile management with photo uploads
- Discovery feed with filters
- Swipe/like functionality
- Match system (mutual likes)
- Real-time messaging
- Model portfolio system
- Booking system for models
- Admin dashboard
- Subscription management (Stripe)
- User verification system
- Reporting and blocking
- Notifications

### 🚧 In Progress
- Image upload to Supabase Storage
- Real-time messaging with Supabase Realtime
- Push notifications
- Advanced search filters
- Video profiles

## Environment Variables

### Required for Production
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=postgres://...
NEXT_PUBLIC_APP_URL=https://ebonidating.com
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
SENDGRID_API_KEY=SG...
JWT_SECRET=your-strong-secret
\`\`\`

### Development
See `.env.local` for development configuration. Never commit this file to git.

## File Structure
\`\`\`
├── app/
│   ├── api/              # API routes
│   │   ├── auth/        # Authentication endpoints
│   │   ├── profiles/    # Profile management
│   │   ├── discover/    # Discovery feed
│   │   ├── matches/     # Match management
│   │   ├── messages/    # Messaging system
│   │   ├── models/      # Model portfolio
│   │   ├── bookings/    # Booking system
│   │   ├── admin/       # Admin dashboard
│   │   └── subscriptions/ # Stripe integration
│   ├── auth/            # Auth pages (login, signup)
│   ├── dashboard/       # User dashboard
│   ├── discover/        # Discovery page
│   ├── messages/        # Messages page
│   ├── profile/         # Profile page
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Homepage
├── components/
│   └── ui/              # shadcn/ui components
├── lib/
│   ├── auth.ts          # Auth utilities
│   ├── db.ts            # Database utilities
│   ├── email.tsx        # Email templates
│   └── stripe.ts        # Stripe configuration
├── utils/
│   └── supabase/        # Supabase client utilities
├── middleware.ts        # Session refresh & route protection
├── scripts/
│   ├── init-db.sql      # Initial database schema
│   └── add-bookings-table.sql  # Additional tables
└── .env.local           # Local environment variables (DO NOT COMMIT)
\`\`\`

## Development Workflow

### Running Locally
\`\`\`bash
pnpm install
pnpm dev
\`\`\`
Access at http://localhost:5000

### Database Changes
1. Update schema in Supabase dashboard or SQL files
2. Test migrations
3. Apply to production via Supabase dashboard

### Deployment
The app is configured for deployment on:
- Replit (current)
- Vercel (recommended for production)
- Cloudflare Pages (alternative)

## API Routes

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Sign in  
- `POST /api/auth/verify-email` - Verify email
- `GET /auth/confirm` - Supabase email confirmation

### Profiles
- `GET /api/profiles/me` - Get current user profile
- `PUT /api/profiles/me` - Update profile
- `GET /api/profiles/[userId]` - Get user profile

### Discovery & Matching
- `GET /api/discover` - Get profiles to browse
- `GET /api/search` - Search profiles
- `GET /api/matches` - Get matches
- `POST /api/likes` - Like a user

### Messaging
- `GET /api/messages` - Get conversations
- `POST /api/messages` - Send message
- `GET /api/messages/[conversationId]` - Get conversation messages

### Models & Bookings
- `GET /api/models/directory` - Browse models
- `GET/POST/PUT /api/models/portfolio` - Manage portfolio
- `GET/POST /api/bookings` - Handle bookings

### Admin
- `GET /api/admin/reports` - View reports
- `GET /api/admin/verification` - Verification requests
- `GET /api/admin/statistics` - Platform stats

## User Preferences

### Code Style
- Use TypeScript for all new code
- Follow Next.js 15 App Router conventions
- Use Server Components by default, Client Components when needed
- Prefer Tailwind CSS for styling
- Use shadcn/ui components for UI elements

### Accessibility
- All interactive elements have proper ARIA labels
- Keyboard navigation supported throughout
- Focus management for modals and overlays
- Semantic HTML structure
- Color contrast meets WCAG AA standards

## Recent Changes

### 2025-11-18: Supabase Integration
- Migrated from standalone PostgreSQL to Supabase
- Integrated Supabase Auth with email verification
- Created middleware for automatic session refresh
- Added responsive mobile menu with hamburger toggle
- Updated environment configuration
- Domain configured for ebonidating.com

### Next Steps
1. Complete Supabase Auth integration for all API routes
2. Set up Supabase Storage for image uploads
3. Implement Supabase Realtime for live messaging
4. Add comprehensive error handling
5. Optimize performance and SEO
6. Complete accessibility audit

## Support & Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Stripe Docs](https://stripe.com/docs)
