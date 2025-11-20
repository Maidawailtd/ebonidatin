# Production Setup Guide for Eboni Dating

## Prerequisites

1. **Supabase Project Setup**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Note down your Project URL and API keys
   - Run the database migration scripts in `/scripts/`

## Environment Variables Setup

### Automated Setup
Run the setup script:
\`\`\`bash
node scripts/setup-env.js
\`\`\`

### Manual Setup
Create `.env.local` with these variables:

#### Required Variables
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your-32-character-secret
NEXT_PUBLIC_SITE_URL=https://your-app.replit.app
\`\`\`

#### Optional Variables
\`\`\`env
# Email
SENDGRID_API_KEY=your-sendgrid-key
SENDGRID_FROM_EMAIL=noreply@your-domain.com

# Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

# OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
\`\`\`

## Deployment

### 1. Vercel Deployment (Recommended)
The recommended way to deploy is using Vercel:

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Environment Variables**: 
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add all variables from `.env.example`
   - Set `NEXT_PUBLIC_SITE_URL` to your Vercel domain
3. **Deploy**: Vercel will automatically deploy on push to main branch
4. **Domain Setup**: Configure your custom domain in Vercel settings

### 2. Replit Deployment
Alternative deployment using Replit's built-in deployment:

1. Click the "Deploy" button in the header
2. Select "Reserved VM" or "Autoscale" deployment
3. Configure your domain and environment variables
4. Click "Deploy"

## Supabase Configuration

### 1. Database Setup
Run these SQL files in your Supabase SQL editor:
1. `scripts/init-db.sql`
2. `scripts/add-bookings-table.sql`
3. `scripts/002_add_location_fields.sql`

### 2. Authentication Settings
In Supabase Dashboard → Authentication → Settings:

**Site URL**: `https://ebonidating.com`

**Redirect URLs** (add these):
- `https://ebonidating.com/auth/callback`
- `https://ebonidating.com/auth/confirm`
- `http://localhost:5000/auth/callback` (for development)

### 3. Storage Setup
Create a storage bucket for user uploads:
\`\`\`sql
INSERT INTO storage.buckets (id, name, public) VALUES ('user-uploads', 'user-uploads', true);
\`\`\`

### 4. Row Level Security (RLS)
Enable RLS on all tables and create appropriate policies for user data access.

## Production Deployment on Replit

### 1. Environment Variables
Set these in your Replit Secrets:
- All variables from your `.env.local`
- `NODE_ENV=production`

### 2. Build Configuration
The app is configured to build and run with:
\`\`\`bash
pnpm install && pnpm build && pnpm start
\`\`\`

### 3. Domain Setup
- Connect your custom domain in Replit
- Ensure HTTPS is enabled
- Update CORS settings in Supabase to allow your domain

## Security Checklist

- [ ] All environment variables are set and secure
- [ ] RLS policies are configured in Supabase
- [ ] CORS is properly configured
- [ ] Security headers are enabled in Next.js config
- [ ] Rate limiting is implemented
- [ ] File upload restrictions are in place
- [ ] Error handling doesn't expose sensitive data

## Performance Optimizations

- [ ] Image optimization is configured
- [ ] Bundle splitting is set up
- [ ] Caching headers are configured
- [ ] Database queries are optimized
- [ ] CDN is configured for static assets

## Monitoring & Analytics

- [ ] Error tracking (Sentry) is configured
- [ ] Performance monitoring is set up
- [ ] User analytics are implemented
- [ ] Database monitoring is active

## Testing Production Setup

1. **Authentication Flow**
   - Sign up with email
   - Verify email confirmation works
   - Test login/logout
   - Test OAuth providers (if configured)

2. **Core Features**
   - Profile creation and editing
   - Photo uploads
   - Messaging system
   - Discovery/matching features
   - Payment processing (if configured)

3. **Security**
   - Test unauthorized access protection
   - Verify data isolation between users
   - Check rate limiting

## Post-Deployment Tasks

1. **DNS & SSL**
   - Verify domain resolution
   - Confirm SSL certificate is active
   - Test from multiple locations

2. **Monitoring Setup**
   - Configure uptime monitoring
   - Set up error alerts
   - Monitor performance metrics

3. **User Testing**
   - Test on different devices
   - Verify mobile responsiveness
   - Check accessibility features

## Troubleshooting

### Common Issues

1. **Supabase Connection Errors**
   - Verify URL and keys are correct
   - Check network connectivity
   - Ensure Supabase project is not paused

2. **Authentication Issues**
   - Verify redirect URLs in Supabase
   - Check CORS configuration
   - Ensure JWT secret is consistent

3. **Email Issues**
   - Verify SendGrid API key
   - Check email templates
   - Ensure from email is verified

## Backup & Recovery

1. **Database Backups**
   - Supabase provides automatic backups
   - Consider additional backup strategies for critical data

2. **Code Repository**
   - Ensure all code is committed to git
   - Tag releases for easy rollback

3. **Environment Configuration**
   - Document all environment variables
   - Store backup configuration securely

## Support & Maintenance

- Regularly update dependencies
- Monitor security advisories
- Review and update environment variables
- Perform regular security audits
