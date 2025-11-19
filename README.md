# Eboni Dating - Modern Dating Platform

A full-featured dating and modeling platform built with Next.js 15, Supabase, and TypeScript.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database & Auth**: Supabase (PostgreSQL + Auth)
- **Styling**: Tailwind CSS + shadcn/ui
- **Language**: TypeScript
- **Payments**: Stripe
- **Email**: SendGrid

## 🛠️ Development

### Setup Environment
Run the automated setup:
```bash
node scripts/setup-env.js
```

### Install Dependencies
```bash
pnpm install
```

### Run Development Server
```bash
pnpm dev
```

### Build for Production
```bash
pnpm build
pnpm start
```

## 🧪 Testing

Type checking:
```bash
npx tsc --noEmit
```

## 📁 Project Structure

```
eboni-dating/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── discover/          # Match discovery
│   ├── messages/          # Messaging system
│   └── admin/             # Admin panel
├── components/            # React components
├── lib/                   # Utilities and helpers
├── public/                # Static assets
└── utils/                # Database utilities
```

## 🔐 Environment Variables

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_JWT_SECRET`

Optional:
- `STRIPE_SECRET_KEY`
- `SENDGRID_API_KEY`
- `GOOGLE_CLIENT_ID`

## ✨ Features

- User authentication with email verification
- Profile management with photo uploads
- Discovery feed with filters
- Real-time messaging system
- Model portfolio and booking system
- Admin dashboard with moderation tools
- Subscription management with Stripe
- User verification and reporting system

## 📖 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)