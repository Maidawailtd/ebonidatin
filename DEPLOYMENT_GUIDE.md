# Eboni Dating - Deployment Guide

## Prerequisites
- Cloudflare account
- Stripe account
- SendGrid account
- GitHub repository

## Step 1: Database Setup
1. Create a D1 database in Cloudflare
2. Run the SQL schema from `scripts/init-db.sql`
3. Add additional tables from `scripts/add-bookings-table.sql`

## Step 2: Environment Variables
Add these to your Cloudflare project settings:

- `DATABASE_URL` - Your D1 database URL
- `STRIPE_SECRET_KEY` - From Stripe dashboard
- `STRIPE_PUBLISHABLE_KEY` - From Stripe dashboard
- `STRIPE_WEBHOOK_SECRET` - Generate from Stripe webhooks
- `SENDGRID_API_KEY` - From SendGrid API keys
- `JWT_SECRET` - Generate a strong random string
- `NEXT_PUBLIC_JWT_SECRET` - Same as JWT_SECRET
- `NEXT_PUBLIC_APP_URL` - Your production URL

## Step 3: Stripe Setup
1. Create checkout session products for Premium, VIP, and Agency tiers
2. Set up webhook endpoint: `https://yourdomain.com/api/subscriptions/webhook`
3. Copy Stripe keys to environment variables

## Step 4: SendGrid Setup
1. Create SendGrid account and API key
2. Verify sender email address
3. Add to environment variables

## Step 5: Deploy to Cloudflare Pages
1. Push code to GitHub
2. Connect repository to Cloudflare Pages
3. Set build command: `npm run build`
4. Set output directory: `.next`
5. Add all environment variables
6. Deploy

## Step 6: Post-Deployment
1. Test email verification flow
2. Test subscription/payment flow
3. Verify admin dashboard access
4. Set up monitoring and logs

## Features Implemented
- ✓ User authentication with email verification
- ✓ Profile management with photos
- ✓ Discovery and search system
- ✓ Likes and matches system
- ✓ Messaging between matched users
- ✓ Modeling portfolio system
- ✓ Booking system for models
- ✓ Admin dashboard and moderation
- ✓ Subscription tiers and payments
- ✓ User verification system
- ✓ Reporting and blocking system
- ✓ Notifications

## API Endpoints
All endpoints require JWT authentication in headers: `Authorization: Bearer <token>`

### Auth
- POST `/api/auth/signup` - Create account
- POST `/api/auth/login` - Sign in
- POST `/api/auth/verify-email` - Verify email

### Profiles
- GET `/api/profiles/me` - Get own profile
- PUT `/api/profiles/me` - Update profile
- GET `/api/profiles/[userId]` - Get user profile

### Discovery
- GET `/api/discover` - Get profiles to swipe on
- GET `/api/search` - Search profiles

### Matches & Likes
- GET `/api/matches` - Get matches
- POST/GET `/api/likes` - Like users

### Messaging
- GET/POST `/api/messages` - Send messages
- GET `/api/notifications` - Get notifications

### Models
- GET `/api/models/directory` - Browse models
- POST/PUT `/api/models/portfolio` - Manage portfolio
- POST/GET `/api/bookings` - Handle bookings

### Admin
- GET `/api/admin/reports` - Get reports
- GET `/api/admin/verification` - Get verification requests
- GET `/api/admin/statistics` - Platform statistics

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL in environment variables
- Check D1 database is active in Cloudflare
- Ensure all tables are created

### Email Not Sending
- Verify SendGrid API key is correct
- Check sender email is verified in SendGrid
- Review SendGrid logs for errors

### Payment Issues
- Test with Stripe test cards
- Verify webhook endpoint is accessible
- Check STRIPE_SECRET_KEY is correct

## Security Recommendations
1. Use HTTPS only
2. Implement rate limiting
3. Enable bot protection
4. Regular security audits
5. Keep dependencies updated
6. Use strong JWT secrets
7. Implement CORS restrictions
