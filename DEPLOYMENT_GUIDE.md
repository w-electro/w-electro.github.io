# Deployment Guide
## Najah Platform - Step-by-Step Deployment Instructions

---

## Prerequisites

Before deploying, ensure you have:

1. **Node.js 18.17+** installed
2. **Git** installed and configured
3. **Accounts** on:
   - [Vercel](https://vercel.com) (for hosting)
   - [Supabase](https://supabase.com) (for database & auth)
   - [OpenAI](https://platform.openai.com) (for AI features)

---

## Step 1: Environment Setup

### 1.1 Clone the Repository

```bash
git clone https://github.com/w-electro/w-electro.github.io.git
cd w-electro.github.io
```

### 1.2 Install Dependencies

```bash
npm install
```

### 1.3 Create Environment File

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# OpenAI (Required for AI features)
OPENAI_API_KEY=sk-...

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# WhatsApp (for contact)
NEXT_PUBLIC_WA_NUMBER=966540732077
```

---

## Step 2: Supabase Setup

### 2.1 Create Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Enter project name: `najah-platform`
4. Choose a region close to Saudi Arabia (e.g., Frankfurt)
5. Generate a secure database password

### 2.2 Run Database Migrations

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Login to Supabase:
```bash
supabase login
```

3. Link your project:
```bash
supabase link --project-ref your-project-id
```

4. Run migrations:
```bash
supabase db push
```

### 2.3 Enable Authentication

In Supabase Dashboard:

1. Go to **Authentication** > **Providers**
2. Enable:
   - Email (with magic link)
   - Phone (for Saudi numbers)
   - Google OAuth
3. Configure redirect URLs:
   - `http://localhost:3000/**` (development)
   - `https://www.w-electro.com/**` (production)

### 2.4 Set Up Storage Buckets

1. Go to **Storage** in Supabase
2. Create buckets:
   - `avatars` (public)
   - `attachments` (private)
   - `projects` (private)

---

## Step 3: OpenAI Setup

### 3.1 Get API Key

1. Go to [OpenAI Platform](https://platform.openai.com)
2. Navigate to **API Keys**
3. Create a new secret key
4. Copy and save it securely

### 3.2 Set Usage Limits

To avoid unexpected charges:

1. Go to **Usage Limits**
2. Set a monthly budget limit (e.g., $50)
3. Enable email notifications

---

## Step 4: Local Development

### 4.1 Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4.2 Test Features

1. **Homepage**: Verify hero section and navigation
2. **AI Chat**: Test with a simple question
3. **Tools**: Try OCR or QR generator
4. **Authentication**: Sign up with email

---

## Step 5: Deploy to Vercel

### 5.1 Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Select the `main` branch

### 5.2 Configure Build Settings

```yaml
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### 5.3 Add Environment Variables

In Vercel Project Settings > Environment Variables:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service key |
| `OPENAI_API_KEY` | Your OpenAI key |
| `NEXT_PUBLIC_APP_URL` | https://www.w-electro.com |
| `NEXT_PUBLIC_WA_NUMBER` | 966540732077 |

### 5.4 Configure Domain

1. Go to **Settings** > **Domains**
2. Add `www.w-electro.com`
3. Add DNS records as shown
4. Enable HTTPS (automatic)

### 5.5 Deploy

Click "Deploy" and wait for the build to complete.

---

## Step 6: Post-Deployment

### 6.1 Verify Deployment

1. Visit your domain
2. Test all features
3. Check mobile responsiveness
4. Verify Arabic RTL layout

### 6.2 Set Up Analytics

Add to Environment Variables:

```env
NEXT_PUBLIC_GA_ID=G-TJE91T4442
NEXT_PUBLIC_CLARITY_ID=nrq4k5h8jb
```

### 6.3 Configure Webhooks (Optional)

For real-time features:

1. In Supabase, set up webhooks for:
   - New project submissions
   - Payment completions
   - User registrations

### 6.4 Enable Edge Functions

For improved performance:

1. Vercel will automatically deploy Edge functions
2. Check function logs in Vercel Dashboard

---

## Troubleshooting

### Build Failures

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Database Connection Issues

1. Check Supabase project status
2. Verify environment variables
3. Check Row Level Security policies

### AI Not Responding

1. Verify OpenAI API key is valid
2. Check API usage limits
3. Review Edge function logs

### Authentication Issues

1. Verify redirect URLs in Supabase
2. Check OAuth provider configuration
3. Test in incognito mode

---

## Monitoring & Maintenance

### Regular Tasks

- **Weekly**: Review analytics and user feedback
- **Monthly**: Update dependencies (`npm update`)
- **Quarterly**: Review and optimize database queries

### Health Checks

Monitor these endpoints:

- `GET /api/health` - API health
- `GET /` - Homepage load time

### Backup Strategy

1. Supabase automatically backs up database
2. Store environment variables securely
3. Keep code in version control

---

## Security Checklist

- [ ] All API keys are in environment variables (not in code)
- [ ] HTTPS is enabled
- [ ] Row Level Security is enabled in Supabase
- [ ] Rate limiting is configured
- [ ] Input validation is implemented
- [ ] CSP headers are set
- [ ] Sensitive data is encrypted

---

## Support

If you encounter issues:

1. Check the [Vercel Docs](https://vercel.com/docs)
2. Check the [Supabase Docs](https://supabase.com/docs)
3. Open an issue on GitHub
4. Contact support via WhatsApp: +966 54 073 2077

---

**Document Version**: 1.0
**Last Updated**: December 2024
