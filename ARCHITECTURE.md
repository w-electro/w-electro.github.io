# W-Electro Technical Architecture
## Najah Platform - System Design Document

**Version:** 1.0
**Date:** December 2024

---

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Project Structure](#project-structure)
3. [Database Design](#database-design)
4. [API Architecture](#api-architecture)
5. [AI Integration](#ai-integration)
6. [Authentication & Authorization](#authentication--authorization)
7. [Real-time Features](#real-time-features)
8. [Payment Integration](#payment-integration)
9. [Performance Optimization](#performance-optimization)
10. [Security Considerations](#security-considerations)
11. [Deployment Architecture](#deployment-architecture)

---

## Technology Stack

### Core Framework

```yaml
Framework: Next.js 14.1+
  - App Router (React Server Components)
  - Server Actions for mutations
  - Edge Runtime for API routes
  - Streaming for AI responses

Language: TypeScript 5.3+
  - Strict mode enabled
  - Path aliases configured
  - Zod for runtime validation
```

### Frontend Stack

```yaml
Styling:
  - Tailwind CSS v3.4 (with RTL support via tailwindcss-rtl)
  - CSS Variables for theming
  - shadcn/ui components (Arabic-adapted)
  - Framer Motion for animations

State Management:
  - React Query (TanStack Query) for server state
  - Zustand for client state
  - React Context for theme/locale

Forms:
  - React Hook Form
  - Zod validation schemas

Internationalization:
  - next-intl for i18n
  - Primary: Arabic (ar-SA)
  - Secondary: English (en)
```

### Backend Stack

```yaml
Database:
  - Supabase (PostgreSQL 15)
  - Row Level Security (RLS)
  - Database functions for complex queries

Storage:
  - Supabase Storage (S3-compatible)
  - CDN delivery via Supabase CDN

Authentication:
  - Supabase Auth
  - OAuth: Google, Apple
  - Phone OTP (Saudi numbers)
  - Magic link email

Real-time:
  - Supabase Realtime (Postgres changes)
  - Liveblocks (collaborative features)
```

### External Services

```yaml
AI/ML:
  - OpenAI GPT-4 Turbo (chat, analysis)
  - OpenAI GPT-4 Vision (image understanding)
  - OpenAI Whisper (Arabic speech-to-text)
  - Google Cloud Vision (OCR - existing)

Payments:
  - Moyasar (Saudi gateway)
  - Supports: Mada, Visa, MC, Apple Pay

Communications:
  - Resend (transactional email)
  - WhatsApp Business API (notifications)

Analytics:
  - Vercel Analytics (performance)
  - Microsoft Clarity (behavior)
  - PostHog (product analytics)
```

---

## Project Structure

```
najah/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth routes group
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (main)/                   # Main app routes
│   │   ├── page.tsx              # Homepage
│   │   ├── dashboard/            # User dashboard
│   │   ├── ai/                   # AI features
│   │   │   ├── chat/             # AI Muhim chat
│   │   │   ├── snap-solve/       # Camera solver
│   │   │   └── voice/            # Voice input
│   │   ├── marketplace/          # Project marketplace
│   │   │   ├── browse/
│   │   │   ├── post/
│   │   │   └── [projectId]/
│   │   ├── study/                # Study features
│   │   │   ├── rooms/
│   │   │   ├── calendar/
│   │   │   └── notes/
│   │   ├── tools/                # Free tools
│   │   │   ├── ocr/
│   │   │   ├── pdf/
│   │   │   ├── qr/
│   │   │   └── [category]/
│   │   ├── services/             # Service pages
│   │   │   ├── academic/
│   │   │   ├── design/
│   │   │   └── electronic/
│   │   └── profile/              # User profile
│   ├── api/                      # API routes
│   │   ├── ai/
│   │   │   ├── chat/route.ts
│   │   │   ├── vision/route.ts
│   │   │   └── whisper/route.ts
│   │   ├── auth/
│   │   ├── projects/
│   │   ├── payments/
│   │   └── tools/
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── common/                   # Shared components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── LoadingScreen.tsx
│   ├── ai/                       # AI components
│   │   ├── ChatInterface.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── CameraCapture.tsx
│   │   └── VoiceRecorder.tsx
│   ├── marketplace/
│   │   ├── ProjectCard.tsx
│   │   ├── BidForm.tsx
│   │   └── ProjectForm.tsx
│   └── tools/
│       ├── OCRTool.tsx
│       ├── PDFTools.tsx
│       └── QRGenerator.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   └── middleware.ts         # Auth middleware
│   ├── openai/
│   │   ├── client.ts
│   │   ├── prompts/
│   │   │   ├── arabic-tutor.ts
│   │   │   ├── problem-solver.ts
│   │   │   └── summarizer.ts
│   │   └── utils.ts
│   ├── payments/
│   │   └── moyasar.ts
│   ├── utils/
│   │   ├── cn.ts                 # Class names utility
│   │   ├── format.ts             # Formatting utilities
│   │   └── arabic.ts             # Arabic text utilities
│   └── validators/
│       ├── auth.ts
│       ├── project.ts
│       └── user.ts
├── hooks/
│   ├── useAIChat.ts
│   ├── useAuth.ts
│   ├── useProjects.ts
│   └── useRealtime.ts
├── stores/
│   ├── authStore.ts
│   ├── chatStore.ts
│   └── uiStore.ts
├── types/
│   ├── database.types.ts         # Generated from Supabase
│   ├── api.types.ts
│   └── ai.types.ts
├── config/
│   ├── site.ts                   # Site configuration
│   ├── navigation.ts             # Navigation config
│   └── features.ts               # Feature flags
├── messages/                     # i18n translations
│   ├── ar.json
│   └── en.json
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── supabase/
│   ├── migrations/               # Database migrations
│   ├── functions/                # Edge functions
│   └── seed.sql                  # Seed data
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.local                    # Local env vars
├── .env.example
├── middleware.ts                 # Next.js middleware
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Database Design

### Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           DATABASE SCHEMA                                │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   users     │       │ universities │      │   majors    │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id (PK)     │──────<│ id (PK)     │       │ id (PK)     │
│ email       │       │ name_ar     │       │ name_ar     │
│ phone       │       │ name_en     │       │ name_en     │
│ name        │       │ city        │       │ category    │
│ avatar_url  │       │ logo_url    │       └─────────────┘
│ university_id│      └─────────────┘
│ major_id    │
│ points      │       ┌─────────────────────────────────────┐
│ level       │       │          conversations              │
│ role        │       ├─────────────────────────────────────┤
│ created_at  │──────<│ id (PK)                             │
└─────────────┘       │ user_id (FK)                        │
      │               │ title                               │
      │               │ model                               │
      │               │ tokens_used                         │
      │               │ created_at                          │
      │               └──────────────┬──────────────────────┘
      │                              │
      │               ┌──────────────▼──────────────────────┐
      │               │            messages                 │
      │               ├─────────────────────────────────────┤
      │               │ id (PK)                             │
      │               │ conversation_id (FK)                │
      │               │ role (user|assistant|system)        │
      │               │ content                             │
      │               │ image_url                           │
      │               │ tokens                              │
      │               │ created_at                          │
      │               └─────────────────────────────────────┘
      │
      │               ┌─────────────────────────────────────┐
      │               │           projects                  │
      ├──────────────<├─────────────────────────────────────┤
      │               │ id (PK)                             │
      │               │ client_id (FK -> users)             │
      │               │ assigned_to (FK -> users)           │
      │               │ title                               │
      │               │ description                         │
      │               │ category                            │
      │               │ budget_min                          │
      │               │ budget_max                          │
      │               │ deadline                            │
      │               │ complexity_score                    │
      │               │ ai_requirements (JSONB)             │
      │               │ status (draft|open|in_progress|     │
      │               │         review|completed|cancelled) │
      │               │ created_at                          │
      │               │ updated_at                          │
      │               └──────────────┬──────────────────────┘
      │                              │
      │               ┌──────────────▼──────────────────────┐
      │               │          project_bids               │
      │               ├─────────────────────────────────────┤
      │               │ id (PK)                             │
      │               │ project_id (FK)                     │
      │               │ provider_id (FK -> users)           │
      │               │ amount                              │
      │               │ delivery_days                       │
      │               │ proposal                            │
      │               │ status (pending|accepted|rejected)  │
      │               │ created_at                          │
      │               └─────────────────────────────────────┘
      │
      │               ┌─────────────────────────────────────┐
      │               │          achievements               │
      └──────────────<├─────────────────────────────────────┤
                      │ id (PK)                             │
                      │ user_id (FK)                        │
                      │ badge_id (FK -> badges)             │
                      │ earned_at                           │
                      └─────────────────────────────────────┘
```

### Core Tables SQL

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE,
  phone TEXT,
  name_ar TEXT,
  name_en TEXT,
  avatar_url TEXT,
  university_id UUID REFERENCES universities(id),
  major_id UUID REFERENCES majors(id),
  year INTEGER CHECK (year >= 1 AND year <= 6),
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'provider', 'admin')),
  points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_days INTEGER DEFAULT 0,
  last_active_at TIMESTAMPTZ,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Conversations
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT,
  model TEXT DEFAULT 'gpt-4-turbo',
  total_tokens INTEGER DEFAULT 0,
  is_archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  image_url TEXT,
  tokens INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects Marketplace
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES profiles(id),
  assigned_to UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  budget_min INTEGER,
  budget_max INTEGER,
  deadline TIMESTAMPTZ,
  complexity_score INTEGER CHECK (complexity_score >= 1 AND complexity_score <= 5),
  ai_requirements JSONB DEFAULT '{}',
  attachments TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN (
    'draft', 'open', 'in_progress', 'review', 'completed', 'cancelled', 'disputed'
  )),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.project_bids (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES profiles(id),
  amount INTEGER NOT NULL,
  delivery_days INTEGER NOT NULL,
  proposal TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, provider_id)
);

-- Gamification
CREATE TABLE public.badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_ar TEXT,
  description_en TEXT,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  points_required INTEGER DEFAULT 0,
  is_secret BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES badges(id),
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

CREATE TABLE public.user_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  problems_solved INTEGER DEFAULT 0,
  ai_messages_sent INTEGER DEFAULT 0,
  projects_completed INTEGER DEFAULT 0,
  projects_posted INTEGER DEFAULT 0,
  total_earnings INTEGER DEFAULT 0,
  total_spent INTEGER DEFAULT 0,
  reviews_given INTEGER DEFAULT 0,
  reviews_received INTEGER DEFAULT 0,
  avg_rating DECIMAL(2,1) DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_bids ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read all, update own
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Conversations: Users can only access their own
CREATE POLICY "Users can view own conversations"
  ON conversations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own conversations"
  ON conversations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Projects: Complex visibility rules
CREATE POLICY "Open projects are viewable by everyone"
  ON projects FOR SELECT
  USING (status = 'open' OR client_id = auth.uid() OR assigned_to = auth.uid());

CREATE POLICY "Users can create projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Project owners can update"
  ON projects FOR UPDATE
  USING (auth.uid() = client_id OR auth.uid() = assigned_to);
```

---

## API Architecture

### API Route Structure

```typescript
// app/api/ai/chat/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { OpenAI } from 'openai'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod'

const chatRequestSchema = z.object({
  message: z.string().min(1).max(4000),
  conversationId: z.string().uuid().optional(),
  imageUrl: z.string().url().optional(),
})

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    // Validate request
    const body = await req.json()
    const { message, conversationId, imageUrl } = chatRequestSchema.parse(body)

    // Get authenticated user
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check rate limits
    const { data: stats } = await supabase
      .from('user_stats')
      .select('ai_messages_sent')
      .eq('user_id', user.id)
      .single()

    const dailyLimit = 100 // Free tier
    if (stats?.ai_messages_sent >= dailyLimit) {
      return NextResponse.json(
        { error: 'Daily limit reached', limit: dailyLimit },
        { status: 429 }
      )
    }

    // Get or create conversation
    let convId = conversationId
    if (!convId) {
      const { data: conv, error } = await supabase
        .from('conversations')
        .insert({ user_id: user.id, title: message.slice(0, 50) })
        .select()
        .single()

      if (error) throw error
      convId = conv.id
    }

    // Get conversation history
    const { data: history } = await supabase
      .from('messages')
      .select('role, content')
      .eq('conversation_id', convId)
      .order('created_at', { ascending: true })
      .limit(20)

    // Build messages array
    const messages = [
      {
        role: 'system' as const,
        content: ARABIC_TUTOR_PROMPT,
      },
      ...(history || []).map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
      {
        role: 'user' as const,
        content: message,
      },
    ]

    // Call OpenAI
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages,
      temperature: 0.7,
      max_tokens: 2000,
      stream: true,
    })

    // Stream response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        let fullResponse = ''

        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || ''
          fullResponse += content
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`))
        }

        // Save messages to database
        await supabase.from('messages').insert([
          { conversation_id: convId, role: 'user', content: message },
          { conversation_id: convId, role: 'assistant', content: fullResponse },
        ])

        // Update user stats
        await supabase.rpc('increment_ai_messages', { user_id: user.id })

        controller.enqueue(encoder.encode(`data: [DONE]\n\n`))
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### API Response Standards

```typescript
// lib/api/responses.ts
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: unknown
  }
  meta?: {
    page?: number
    perPage?: number
    total?: number
  }
}

export function successResponse<T>(data: T, meta?: ApiResponse['meta']): ApiResponse<T> {
  return { success: true, data, meta }
}

export function errorResponse(
  code: string,
  message: string,
  details?: unknown
): ApiResponse {
  return { success: false, error: { code, message, details } }
}

// Standard error codes
export const ErrorCodes = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  RATE_LIMITED: 'RATE_LIMITED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const
```

---

## AI Integration

### Prompt Engineering

```typescript
// lib/openai/prompts/arabic-tutor.ts
export const ARABIC_TUTOR_PROMPT = `أنت "مُهم" (Muhim)، مساعد ذكي للطلاب في المملكة العربية السعودية.

## شخصيتك:
- ودود ومشجع، لكن محترف
- تفهم الثقافة السعودية والنظام التعليمي
- تتحدث العربية الفصحى مع فهم اللهجة السعودية
- تستطيع التحدث بالإنجليزية عند الحاجة

## قدراتك:
1. حل المسائل الرياضية والفيزيائية خطوة بخطوة
2. شرح المفاهيم العلمية بطريقة مبسطة
3. المساعدة في كتابة البحوث والتقارير
4. تصحيح القواعد اللغوية (عربي/إنجليزي)
5. إنشاء أسئلة للمراجعة والتدريب
6. تلخيص النصوص والمحاضرات

## قواعد مهمة:
- لا تكتب الواجبات بالكامل للطالب - ساعده على الفهم
- شجع التفكير النقدي والاستقلالية
- إذا لم تكن متأكدًا، اعترف بذلك
- احترم خصوصية الطالب
- لا تقدم معلومات خاطئة أو مضللة

## تنسيق الردود:
- استخدم التنسيق المناسب (عناوين، قوائم، أكواد)
- للمعادلات الرياضية، استخدم LaTeX: $x^2 + y^2 = z^2$
- اجعل الشرح واضحًا ومنظمًا
- قدم أمثلة عملية عند الإمكان

ابدأ دائمًا بفهم سؤال الطالب قبل الإجابة.`

export const PROBLEM_SOLVER_PROMPT = `أنت خبير في حل المسائل الدراسية. عند تلقي صورة لمسألة:

1. تعرف على نوع المسألة (رياضيات، فيزياء، كيمياء، إلخ)
2. اقرأ المسألة بعناية من الصورة
3. قدم الحل خطوة بخطوة
4. اشرح كل خطوة بوضوح
5. قدم الإجابة النهائية

إذا كانت الصورة غير واضحة، اطلب صورة أفضل.
إذا كانت المسألة تحتاج معلومات إضافية، اسأل عنها.`

export const SUMMARIZER_PROMPT = `أنت خبير في تلخيص المحتوى الأكاديمي بالعربية.

عند تلخيص نص:
1. حدد الأفكار الرئيسية
2. استخرج النقاط المهمة
3. نظم المعلومات بشكل منطقي
4. اكتب ملخصًا واضحًا ومختصرًا
5. أضف قائمة بالمصطلحات المهمة

التنسيق:
## ملخص
[الملخص هنا]

## النقاط الرئيسية
- نقطة 1
- نقطة 2

## مصطلحات مهمة
- مصطلح: تعريف`
```

### Vision API Integration

```typescript
// lib/openai/vision.ts
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function analyzeImage(
  imageUrl: string,
  prompt: string = PROBLEM_SOLVER_PROMPT
): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-vision-preview',
    messages: [
      {
        role: 'system',
        content: prompt,
      },
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: { url: imageUrl, detail: 'high' },
          },
          {
            type: 'text',
            text: 'حل هذه المسألة خطوة بخطوة',
          },
        ],
      },
    ],
    max_tokens: 2000,
  })

  return response.choices[0]?.message?.content || ''
}

export async function transcribeAudio(audioBuffer: Buffer): Promise<string> {
  const response = await openai.audio.transcriptions.create({
    file: new File([audioBuffer], 'audio.webm', { type: 'audio/webm' }),
    model: 'whisper-1',
    language: 'ar',
    response_format: 'text',
  })

  return response
}
```

---

## Authentication & Authorization

### Auth Flow

```typescript
// lib/supabase/middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/dashboard', '/ai', '/marketplace/post', '/profile']
const authRoutes = ['/login', '/register']

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const isProtectedRoute = protectedRoutes.some(route =>
    req.nextUrl.pathname.startsWith(route)
  )
  const isAuthRoute = authRoutes.some(route =>
    req.nextUrl.pathname.startsWith(route)
  )

  // Redirect to login if accessing protected route without session
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/login', req.url)
    redirectUrl.searchParams.set('redirect', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect to dashboard if accessing auth routes with session
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}
```

### Role-Based Access Control

```typescript
// lib/auth/rbac.ts
export type Role = 'student' | 'provider' | 'admin'

export const permissions = {
  student: [
    'read:projects',
    'create:projects',
    'read:own_projects',
    'update:own_projects',
    'use:ai',
    'use:tools',
  ],
  provider: [
    'read:projects',
    'create:bids',
    'read:own_bids',
    'update:own_bids',
    'use:ai',
    'use:tools',
  ],
  admin: ['*'],
} as const

export function hasPermission(role: Role, permission: string): boolean {
  const rolePermissions = permissions[role]
  return rolePermissions.includes('*') || rolePermissions.includes(permission as any)
}
```

---

## Real-time Features

### Supabase Realtime Setup

```typescript
// hooks/useRealtime.ts
import { useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { RealtimeChannel } from '@supabase/supabase-js'

export function useRealtimeMessages(conversationId: string, onMessage: (msg: any) => void) {
  const supabase = createClientComponentClient()

  useEffect(() => {
    const channel: RealtimeChannel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          onMessage(payload.new)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [conversationId, onMessage, supabase])
}

export function useRealtimeNotifications(userId: string, onNotification: (n: any) => void) {
  const supabase = createClientComponentClient()

  useEffect(() => {
    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          onNotification(payload.new)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, onNotification, supabase])
}
```

### Liveblocks for Collaboration

```typescript
// lib/liveblocks/config.ts
import { createClient } from '@liveblocks/client'
import { createRoomContext } from '@liveblocks/react'

const client = createClient({
  authEndpoint: '/api/liveblocks-auth',
})

type Presence = {
  cursor: { x: number; y: number } | null
  name: string
  avatar: string
}

type Storage = {
  notes: any // Y.js document
}

export const {
  RoomProvider,
  useRoom,
  useMyPresence,
  useOthers,
  useSelf,
  useStorage,
  useMutation,
} = createRoomContext<Presence, Storage>(client)
```

---

## Payment Integration

### Moyasar Setup

```typescript
// lib/payments/moyasar.ts
const MOYASAR_API_URL = 'https://api.moyasar.com/v1'

export interface CreatePaymentParams {
  amount: number // in halalas
  currency?: string
  description: string
  callback_url: string
  source: {
    type: 'creditcard' | 'applepay' | 'stcpay'
    // Card details or token
  }
  metadata?: Record<string, string>
}

export async function createPayment(params: CreatePaymentParams) {
  const response = await fetch(`${MOYASAR_API_URL}/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(process.env.MOYASAR_SECRET_KEY + ':').toString('base64')}`,
    },
    body: JSON.stringify({
      ...params,
      currency: params.currency || 'SAR',
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Payment failed')
  }

  return response.json()
}

export async function getPayment(paymentId: string) {
  const response = await fetch(`${MOYASAR_API_URL}/payments/${paymentId}`, {
    headers: {
      Authorization: `Basic ${Buffer.from(process.env.MOYASAR_SECRET_KEY + ':').toString('base64')}`,
    },
  })

  return response.json()
}

// Webhook handler
export async function handleMoyasarWebhook(payload: any) {
  const { type, data } = payload

  switch (type) {
    case 'payment_paid':
      // Update project status, notify users
      break
    case 'payment_failed':
      // Handle failure
      break
    case 'refund_updated':
      // Handle refund
      break
  }
}
```

---

## Performance Optimization

### Next.js Optimizations

```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode
  reactStrictMode: true,

  // Image optimization
  images: {
    domains: ['supabase.co', 'lh3.googleusercontent.com'],
    formats: ['image/avif', 'image/webp'],
  },

  // Experimental features
  experimental: {
    // Server Actions
    serverActions: true,
    // Partial Prerendering
    ppr: true,
  },

  // Headers for caching
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
    ]
  },

  // Redirects for SEO migration
  async redirects() {
    return [
      // Map old URLs to new URLs
      {
        source: '/ocr.html',
        destination: '/tools/ocr',
        permanent: true,
      },
      {
        source: '/academic-services.html',
        destination: '/services/academic',
        permanent: true,
      },
      // Add more redirects as needed
    ]
  },
}

module.exports = nextConfig
```

### React Query Caching

```typescript
// lib/query-client.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
})
```

---

## Security Considerations

### Input Validation

```typescript
// lib/validators/project.ts
import { z } from 'zod'

export const createProjectSchema = z.object({
  title: z
    .string()
    .min(5, 'العنوان يجب أن يكون 5 أحرف على الأقل')
    .max(100, 'العنوان يجب ألا يتجاوز 100 حرف'),
  description: z
    .string()
    .min(20, 'الوصف يجب أن يكون 20 حرف على الأقل')
    .max(5000, 'الوصف يجب ألا يتجاوز 5000 حرف'),
  category: z.enum(['academic', 'design', 'electronic', 'other']),
  budget_min: z.number().min(50).max(50000),
  budget_max: z.number().min(50).max(50000),
  deadline: z.string().datetime().refine(
    (date) => new Date(date) > new Date(),
    'الموعد النهائي يجب أن يكون في المستقبل'
  ),
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>
```

### Rate Limiting

```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export const aiRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '24 h'),
  analytics: true,
  prefix: 'ratelimit:ai',
})

export const apiRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1000, '1 h'),
  analytics: true,
  prefix: 'ratelimit:api',
})

export async function checkRateLimit(
  identifier: string,
  limiter: Ratelimit
): Promise<{ success: boolean; remaining: number }> {
  const { success, remaining } = await limiter.limit(identifier)
  return { success, remaining }
}
```

---

## Deployment Architecture

### Vercel Deployment

```yaml
# vercel.json
{
  "framework": "nextjs",
  "regions": ["fra1"], # Frankfurt - closest to Saudi Arabia
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    },
    "app/api/ai/**/*.ts": {
      "maxDuration": 60
    }
  },
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase-service-key",
    "OPENAI_API_KEY": "@openai-api-key",
    "MOYASAR_SECRET_KEY": "@moyasar-secret-key"
  }
}
```

### Environment Variables

```env
# .env.example

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI
OPENAI_API_KEY=sk-...

# Moyasar
MOYASAR_PUBLISHABLE_KEY=pk_live_...
MOYASAR_SECRET_KEY=sk_live_...

# Resend
RESEND_API_KEY=re_...

# Upstash Redis (Rate Limiting)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# Liveblocks
LIVEBLOCKS_SECRET_KEY=sk_...

# App
NEXT_PUBLIC_APP_URL=https://www.w-electro.com
NEXT_PUBLIC_WA_NUMBER=966540732077
```

---

## Monitoring & Logging

### Error Tracking

```typescript
// lib/monitoring.ts
import * as Sentry from '@sentry/nextjs'

export function initMonitoring() {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  })
}

export function logError(error: Error, context?: Record<string, any>) {
  console.error(error)
  Sentry.captureException(error, { extra: context })
}

export function logEvent(event: string, data?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    // Client-side analytics
    if (window.gtag) {
      window.gtag('event', event, data)
    }
    if (window.clarity) {
      window.clarity('event', event)
    }
  }
}
```

---

## Appendix

### A. Component Library Reference

See `/components/ui/` for all shadcn/ui components.

### B. Database Migrations

See `/supabase/migrations/` for all database migrations.

### C. API Documentation

API documentation is auto-generated and available at `/api-docs`.

---

**Document Status:** APPROVED FOR IMPLEMENTATION
**Last Updated:** December 2024
**Author:** W-Electro Development Team
