# Najah Platform - Full Development Brief for Claude Opus 4.5

## 🎯 Mission
Transform the Najah Platform into a comprehensive, AI-powered student services platform for Saudi students. Build a complete Next.js application with all tools, services, and features integrated.

## 📊 Current Status

### ✅ What's Completed
1. **Deployment Infrastructure**
   - Live at: https://najah.w-electro.com (Vercel)
   - Main site preserved at: https://www.w-electro.com
   - Environment: Supabase + OpenAI configured
   - DNS: CNAME configured (najah.w-electro.com)

2. **Working Features**
   - Homepage (`/`) - Landing page with hero section
   - AI Assistant (`/ai`) - OpenAI-powered chatbot with Arabic support
   - Tools listing (`/tools`) - Overview page
   - Next.js 14 App Router architecture
   - TypeScript strict mode enabled
   - Tailwind CSS + Radix UI components
   - Arabic RTL support
   - Dark mode support (next-themes)

3. **Tech Stack**
   - **Framework**: Next.js 14.0.4 (App Router)
   - **Language**: TypeScript 5.3.3
   - **Styling**: Tailwind CSS 3.4.0 + tailwindcss-rtl
   - **UI Components**: Radix UI + custom components
   - **Database**: Supabase (configured, auth enabled)
   - **AI**: OpenAI API (GPT-4 Turbo)
   - **Animations**: Framer Motion
   - **Forms**: React Hook Form + Zod validation
   - **Markdown**: ReactMarkdown + remark plugins
   - **Deployment**: Vercel (auto-deploy on push)

4. **Environment Variables Configured**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://udjmhcamragjpufolzvw.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[configured]
   SUPABASE_SERVICE_ROLE_KEY=[configured]
   OPENAI_API_KEY=[configured]
   NEXT_PUBLIC_APP_URL=https://najah.w-electro.com
   NEXT_PUBLIC_WA_NUMBER=966540732077
   NEXT_PUBLIC_GA_ID=G-TJE91T4442
   NEXT_PUBLIC_CLARITY_ID=nrq4k5h8jb
   ```

5. **Fixed TypeScript Issues**
   - MessageBubble.tsx: SyntaxHighlighter type errors
   - Header.tsx: Icon property type guards

### ❌ What Needs to Be Built

#### **Priority 1: Core Student Tools (CRITICAL)**
Create fully functional tool pages under `/tools/`:

1. **OCR Tool** (`/tools/ocr`)
   - Upload images/PDFs
   - Extract Arabic and English text using Tesseract.js or OCR API
   - Copy/download extracted text
   - Support for handwriting recognition
   - Handle multiple file formats (JPG, PNG, PDF)

2. **PDF Tools** (`/tools/pdf`)
   - Merge PDFs
   - Split PDFs
   - Compress PDFs
   - PDF to images
   - Images to PDF
   - Add page numbers
   - Extract pages

3. **QR Code Generator** (`/tools/qr`)
   - Generate QR codes for URLs, text, WhatsApp, WiFi
   - Customize colors and size
   - Add logo to QR code
   - Download as PNG/SVG
   - Bulk QR generation

4. **Image Tools** (`/tools/image`)
   - Resize images
   - Compress images
   - Convert formats (PNG, JPG, WebP)
   - Remove background
   - Crop and rotate

5. **Calculator Tools** (`/tools/calculator`)
   - GPA Calculator (Saudi system)
   - Grade calculator
   - Percentage calculator
   - Scientific calculator
   - Unit converter

6. **Text Tools** (`/tools/text`)
   - Word counter (Arabic + English)
   - Character counter
   - Text case converter
   - Arabic diacritics remover
   - Text summarizer (using OpenAI)

7. **Converter Tools** (`/tools/converter`)
   - File format converters
   - Unit converters (length, weight, temperature)
   - Currency converter (SAR focus)
   - Date converter (Hijri ↔ Gregorian)

8. **Barcode Generator** (`/tools/barcode`)
   - Generate barcodes (EAN, UPC, Code128)
   - Download as PNG/SVG

#### **Priority 2: Services Pages**
Create service offering pages under `/services/`:

1. **Academic Services** (`/services/academic`)
   - Research paper writing
   - Thesis assistance
   - Assignment help
   - Proofreading
   - Translation services
   - Presentation design
   - **Lead capture form** (save to Supabase)
   - **Pricing calculator**

2. **Design Services** (`/services/design`)
   - Logo design
   - Brand identity
   - Social media graphics
   - Infographics
   - **Portfolio showcase**
   - **Request quote form**

3. **Electronic Services** (`/services/electronic`)
   - Arduino projects
   - PCB design
   - Circuit simulation
   - Electronic repairs
   - **Project inquiry form**

4. **General Services** (`/services/general`)
   - Consultation
   - Training
   - Custom solutions
   - **Contact form**

#### **Priority 3: User Features**

1. **Authentication** (`/login`, `/signup`)
   - Email/password with Supabase Auth
   - Google OAuth
   - Phone authentication (Saudi numbers)
   - Password reset flow
   - Email verification

2. **User Dashboard** (`/dashboard`)
   - Profile management
   - Saved tools results
   - Service requests history
   - AI chat history
   - Favorites/bookmarks

3. **Project Submission** (`/projects/new`)
   - Project type selection
   - File uploads (Supabase Storage)
   - Requirements form
   - Budget selection
   - Timeline estimation
   - Save as draft

4. **Project Tracking** (`/projects/[id]`)
   - Status tracking
   - File sharing
   - Messages with service provider
   - Payment status
   - Review/rating system

#### **Priority 4: Enhanced AI Features**

1. **AI Tutor Improvements** (`/ai`)
   - Image upload for math problems
   - Voice input (Arabic)
   - Export chat as PDF
   - Share chat link
   - Categorized chat history
   - Suggested prompts for students

2. **AI Writing Assistant** (`/ai/writer`)
   - Essay outliner
   - Paraphrasing tool
   - Citation generator (APA, MLA, IEEE)
   - Plagiarism checker integration
   - Grammar checker

3. **AI Study Buddy** (`/ai/study`)
   - Flashcard generator from notes
   - Quiz generator
   - Study plan creator
   - Spaced repetition reminders

#### **Priority 5: Marketing & SEO**

1. **Blog** (`/blog`)
   - Study tips
   - Tool tutorials
   - Success stories
   - MDX support
   - SEO optimized

2. **Pricing Page** (`/pricing`)
   - Service packages
   - Tool pricing (if premium features)
   - Student discounts
   - Comparison table

3. **About & Legal**
   - `/about` - About Najah
   - `/privacy` - Privacy policy
   - `/terms` - Terms of service
   - `/contact` - Contact form

## 🎨 Design System

### Brand Identity - Najah
- **Logo**: Najah.webp (to be added to `/public/`)
- **Primary Colors**:
  - Cyan: `#0891b2` (تركواز - represents knowledge)
  - Orange: `#f97316` (برتقالي - represents energy)
- **Font**: Cairo (Google Fonts) - excellent for Arabic
- **Direction**: RTL by default (Arabic-first)
- **Tone**: Professional, friendly, encouraging for students

### UI Patterns
- **Cards**: Rounded corners, subtle shadows, hover effects
- **Buttons**: Gradient backgrounds for primary actions
- **Forms**: Clear labels, inline validation, helpful error messages
- **Loading States**: Skeleton screens, progress indicators
- **Empty States**: Friendly illustrations and CTA
- **Toasts**: Sonner library for notifications

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- High contrast mode
- Arabic screen reader compatibility

## 🏗️ Architecture Guidelines

### File Structure
```
app/
├── (main)/              # Main layout group
│   ├── ai/
│   ├── tools/
│   │   ├── ocr/
│   │   ├── pdf/
│   │   ├── qr/
│   │   └── ...
│   ├── services/
│   ├── dashboard/
│   └── projects/
├── (auth)/              # Auth layout group
│   ├── login/
│   └── signup/
├── api/                 # API routes
│   ├── ai/
│   ├── tools/
│   └── webhooks/
├── layout.tsx
└── page.tsx

components/
├── ai/                  # AI-specific components
├── tools/               # Tool-specific components
├── common/              # Shared components
├── ui/                  # Base UI components (Radix)
└── providers/           # Context providers

lib/
├── supabase/           # Supabase client & helpers
├── openai/             # OpenAI helpers
├── utils/              # Utility functions
└── validations/        # Zod schemas

types/
└── database.types.ts   # Supabase types
```

### Database Schema (Supabase)
Create these tables:

```sql
-- Users (extends Supabase auth.users)
create table profiles (
  id uuid references auth.users primary key,
  full_name text,
  phone text,
  university text,
  major text,
  student_id text,
  avatar_url text,
  created_at timestamp with time zone default now()
);

-- Projects
create table projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  title text not null,
  description text,
  category text not null, -- 'academic', 'design', 'electronic'
  status text default 'pending', -- 'pending', 'in_progress', 'completed', 'cancelled'
  budget_min integer,
  budget_max integer,
  deadline date,
  attachments jsonb[], -- array of file URLs
  created_at timestamp with time zone default now()
);

-- Service Requests
create table service_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  service_type text not null,
  details jsonb not null,
  status text default 'new',
  created_at timestamp with time zone default now()
);

-- AI Chat History
create table chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  title text,
  messages jsonb[] not null,
  created_at timestamp with time zone default now()
);

-- Tool Usage Analytics
create table tool_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) null,
  tool_name text not null,
  metadata jsonb,
  created_at timestamp with time zone default now()
);
```

### API Routes Best Practices
- Use Edge Runtime where possible (`export const runtime = "edge"`)
- Rate limiting with Upstash Redis (optional)
- Error handling with proper HTTP status codes
- Input validation with Zod
- Authentication checks with Supabase
- CORS configuration for API routes

### State Management
- Server state: Supabase + React Query (@tanstack/react-query)
- Client state: Zustand (already configured)
- Form state: React Hook Form
- URL state: Next.js searchParams

### Performance Optimization
- Image optimization with Next.js Image component
- Code splitting by route
- Lazy loading for heavy components
- Client-side caching with React Query
- CDN caching via Vercel
- Bundle size monitoring

## 📱 Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly tap targets (min 44×44px)
- Optimized for both portrait and landscape
- PWA-ready (manifest.json exists)

## 🔒 Security Considerations
- NEVER commit secrets (`.env.local` is gitignored ✅)
- Use Supabase RLS (Row Level Security)
- Sanitize user inputs
- Rate limiting on API routes
- CSRF protection
- Content Security Policy headers
- Secure file upload validation

## 🧪 Testing Strategy
- Unit tests: Vitest (to be set up)
- E2E tests: Playwright (to be set up)
- Manual testing checklist for each feature
- Test on multiple devices and browsers
- Arabic language testing

## 📊 Analytics & Monitoring
- Google Analytics 4 (configured)
- Microsoft Clarity (configured)
- Vercel Analytics (automatic)
- Error tracking: Sentry (optional)
- User feedback: Tally forms or similar

## 🚀 Deployment Workflow
1. Code changes pushed to `main` branch
2. Vercel auto-deploys (2-3 minutes)
3. TypeScript type checking must pass
4. ESLint must pass
5. Automatic preview deployments for PRs

## 💰 Monetization Features (Future)
- Premium tool features
- Service packages
- Subscription plans with Stripe/Moyasar
- Affiliate links for resources
- Sponsored content in blog

## 🎓 Target Audience
- **Primary**: Saudi university students (ages 18-25)
- **Secondary**: High school students preparing for university
- **Language**: Arabic first, English support
- **Device**: 70% mobile, 30% desktop
- **Tech Savvy**: Moderate to high

## 🌟 Unique Value Propositions
1. **AI-First**: Best AI tutor for Arabic-speaking students
2. **All-in-One**: Tools + Services + AI in one platform
3. **Student-Focused**: Designed specifically for Saudi curriculum
4. **Fast & Free**: Core tools are free and lightning-fast
5. **Quality Services**: Professional services at student-friendly prices

## 📋 Development Priorities

### Week 1: Foundation
- [ ] Set up all `/tools/*` page structures
- [ ] Create OCR tool (fully functional)
- [ ] Create QR generator (fully functional)
- [ ] Create PDF tools (basic merge/split)
- [ ] Add Najah.webp logo throughout site

### Week 2: Services & Auth
- [ ] Build all `/services/*` pages with forms
- [ ] Implement authentication (Supabase)
- [ ] Create user dashboard
- [ ] Set up Supabase database tables
- [ ] File upload to Supabase Storage

### Week 3: Enhanced Features
- [ ] Complete all remaining tools
- [ ] Project submission flow
- [ ] AI improvements (image upload, voice)
- [ ] Payment integration (Moyasar)
- [ ] Email notifications (Resend)

### Week 4: Polish & Launch
- [ ] Blog setup with first 5 posts
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Mobile testing and fixes
- [ ] Launch marketing campaign

## 🎯 Success Metrics
- **User Acquisition**: 1,000 students in first month
- **Engagement**: 30% of visitors use AI chat
- **Tool Usage**: 5,000 tool uses per month
- **Service Requests**: 50 inquiries per month
- **Performance**: PageSpeed score > 90
- **SEO**: Rank top 5 for "أدوات طلابية السعودية"

## 🤝 How to Proceed

As Claude Opus 4.5, you should:

1. **Review Current Code**: Read existing files in `app/`, `components/`, and `lib/`
2. **Plan Implementation**: Break down each priority into subtasks
3. **Build Incrementally**: Complete one feature at a time, commit often
4. **Test Thoroughly**: Test each feature before moving to the next
5. **Maintain Quality**: Follow TypeScript best practices, write clean code
6. **Ask When Needed**: If requirements are unclear, ask for clarification
7. **Document**: Add JSDoc comments for complex functions

## 🔧 Immediate Next Steps

**START WITH:**
1. Add Najah.webp logo to `/public/` and update all references
2. Create `/tools/ocr/page.tsx` with full OCR functionality
3. Create `/tools/qr/page.tsx` with QR generator
4. Update navigation to include all tool links
5. Create reusable components: `ToolLayout`, `ToolCard`, `UploadZone`

## 📚 Reference Files
- Current working files: Check `app/`, `components/`, `lib/`
- Design system: `tailwind.config.js`, `app/globals.css`
- Configuration: `next.config.js`, `tsconfig.json`
- Types: `types/database.types.ts` (to be generated)

## ✨ Final Note
Build a platform that Saudi students will love and rely on for their academic journey. Focus on speed, simplicity, and exceptional UX. Every feature should solve a real student problem. Make it beautiful, make it fast, make it valuable.

---

**Ready to build the future of student services in Saudi Arabia? Let's create Najah! 🚀**
