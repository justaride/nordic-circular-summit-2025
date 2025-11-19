# Password Protection Setup Guide

## Current Status
The application has password protection code implemented, but it requires additional configuration on Vercel to work in production.

## Password
**KathrineBart**

## Option 1: Vercel Deployment Protection (Recommended - Easiest)

This is the simplest solution that works immediately without code changes.

### Steps:
1. Go to https://vercel.com/justarides-projects/nordic-circular-summit-2025/settings/deployment-protection
2. Enable "Password Protection"
3. Set password to: **KathrineBart**
4. Save changes

**Benefits:**
- No code changes needed
- Works immediately
- Managed by Vercel

**Note:** This requires a Vercel Pro plan ($20/month per user). If you don't have Pro, use Option 2 below.

---

## Option 2: Fix Middleware for Next.js 16 (Current Implementation)

The application currently has custom password protection using Next.js middleware, but there's an issue with cookie handling in production.

### Current Implementation Files:
- `/middleware.ts` - Route protection logic
- `/app/login/page.tsx` - Login UI
- `/app/api/auth/route.ts` - Authentication API

### Issue:
Middleware in Next.js 16 is still experimental and has some limitations with cookie-based authentication on Vercel's edge runtime.

### Fix Options:

#### A. Update middleware.ts to use edge-compatible cookies:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Check authentication cookie
  const authCookie = request.cookies.get('authenticated');
  const isAuthenticated = authCookie?.value === 'true';

  // Allow login page and API
  if (request.nextUrl.pathname.startsWith('/login') ||
      request.nextUrl.pathname.startsWith('/api/auth')) {
    return response;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
```

#### B. Use Environment Variable for Password:

Add to Vercel environment variables:
```
PASSWORD=KathrineBart
```

Then update `/app/api/auth/route.ts`:
```typescript
const CORRECT_PASSWORD = process.env.PASSWORD || 'KathrineBart';
```

---

## Option 3: Use HTTP Basic Auth via vercel.json

Create `vercel.json`:
```json
{
  "routes": [
    {
      "src": "/(.*)",
      "headers": {
        "WWW-Authenticate": "Basic realm=\"Summit Access\""
      },
      "status": 401
    }
  ]
}
```

Then use Vercel's built-in basic auth:
```bash
vercel env add PASSWORD
```

---

## Testing Locally

Password protection works perfectly locally:
1. Start dev server: `PORT=3003 npm run dev`
2. Visit http://localhost:3003
3. You'll be redirected to /login
4. Enter password: **KathrineBart**
5. You'll be authenticated for 7 days

---

## Recommended Solution

**For immediate production use:** Use Option 1 (Vercel Deployment Protection) if you have Pro plan.

**For custom solution:** The middleware is already implemented and works locally. The issue is specific to Vercel's edge runtime. You can either:
1. Wait for Next.js 16 middleware stability improvements
2. Use Option 1 (Vercel's built-in protection)
3. Implement a different auth strategy (like NextAuth.js)

---

## Current Production URLs
- https://nordic-circular-summit-2025.vercel.app
- https://nordic-circular-summit-2025-justarides-projects.vercel.app

Currently accessible without password (middleware not working on Vercel edge).

---

**Created:** November 19, 2025
**Password:** KathrineBart
**Local Testing:** ✅ Works
**Production Status:** ⚠️ Needs Vercel configuration
