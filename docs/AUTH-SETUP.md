# Authentication Setup Guide

## Overview
TravelBuddy uses NextAuth.js v5 (Auth.js) for authentication with support for:
- Email/Password authentication
- Google OAuth
- Session management
- Protected routes

## Installation

Dependencies are already installed:
```bash
npm install next-auth@beta @auth/core
```

## Google OAuth Setup

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure OAuth consent screen:
   - Application name: TravelBuddy
   - User support email: your-email@example.com
   - Developer contact: your-email@example.com
6. Create OAuth 2.0 Client ID:
   - Application type: Web application
   - Name: TravelBuddy Web Client
   - Authorized JavaScript origins:
     - `http://localhost:3000` (development)
     - `https://yourdomain.com` (production)
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://yourdomain.com/api/auth/callback/google` (production)

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy from .env.example
cp .env.example .env.local
```

Update `.env.local` with your credentials:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-this-with-openssl-rand-base64-32

GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

Generate a secure secret:
```bash
openssl rand -base64 32
```

## File Structure

```
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts          # Auth API routes
│   └── auth/
│       ├── signin/
│       │   └── page.tsx              # Sign in page
│       └── signup/
│           └── page.tsx              # Sign up page
├── components/
│   ├── SignInPage.tsx                # Sign in component
│   └── SignUpPage.tsx                # Sign up component
├── lib/
│   └── auth.ts                       # Auth configuration
└── .env.local                        # Environment variables
```

## Features Implemented

### Sign In Page (`/auth/signin`)
- ✅ Email/password authentication
- ✅ Google OAuth button
- ✅ Remember me checkbox
- ✅ Forgot password link
- ✅ Demo credentials display
- ✅ Dark mode support
- ✅ Toast notifications
- ✅ Form validation
- ✅ Loading states

### Sign Up Page (`/auth/signup`)
- ✅ Full name field
- ✅ Email field
- ✅ Password with strength indicator
- ✅ Confirm password
- ✅ Terms agreement checkbox
- ✅ Google OAuth button
- ✅ Password requirements display
- ✅ Dark mode support
- ✅ Toast notifications
- ✅ Form validation

### Demo Credentials
For testing without Google OAuth:
- Email: `demo@travelbuddy.com`
- Password: `demo123`

## Usage

### Accessing Auth Pages

```tsx
// Sign In
<Link href="/auth/signin">Sign In</Link>

// Sign Up
<Link href="/auth/signup">Sign Up</Link>
```

### Protecting Routes (Future Implementation)

```tsx
// In your page component
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function ProtectedPage() {
  const session = await auth()
  
  if (!session) {
    redirect("/auth/signin")
  }
  
  return <div>Protected content</div>
}
```

### Using Session in Client Components

```tsx
"use client"
import { useSession } from "next-auth/react"

export default function ClientComponent() {
  const { data: session, status } = useSession()
  
  if (status === "loading") return <div>Loading...</div>
  if (status === "unauthenticated") return <div>Not signed in</div>
  
  return <div>Welcome {session?.user?.name}</div>
}
```

## Next Steps

### 1. Database Integration
Currently using mock authentication. To implement real authentication:

```typescript
// lib/auth.ts - Update Credentials provider
authorize: async (credentials) => {
  // Replace with actual database lookup
  const user = await db.user.findUnique({
    where: { email: credentials.email }
  })
  
  if (!user) return null
  
  const isValid = await bcrypt.compare(
    credentials.password,
    user.password
  )
  
  if (!isValid) return null
  
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
  }
}
```

### 2. User Registration API
Create an API route for user registration:

```typescript
// app/api/auth/register/route.ts
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  const { name, email, password } = await request.json()
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)
  
  // Save to database
  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    }
  })
  
  return NextResponse.json({ success: true })
}
```

### 3. Session Provider
Wrap your app with SessionProvider:

```tsx
// app/layout.tsx
import { SessionProvider } from "next-auth/react"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
```

### 4. Protected Routes Middleware
Create middleware for route protection:

```typescript
// middleware.ts
export { auth as middleware } from "@/lib/auth"

export const config = {
  matcher: ["/profile/:path*", "/my-plans/:path*", "/checkout/:path*"]
}
```

## Testing

### Test Sign In
1. Navigate to `http://localhost:3000/auth/signin`
2. Use demo credentials:
   - Email: demo@travelbuddy.com
   - Password: demo123
3. Click "Sign In"
4. Should redirect to home page with success toast

### Test Sign Up
1. Navigate to `http://localhost:3000/auth/signup`
2. Fill in all fields
3. Ensure password meets requirements
4. Check terms agreement
5. Click "Create Account"
6. Should redirect to sign in page

### Test Google OAuth
1. Configure Google OAuth credentials
2. Add credentials to `.env.local`
3. Click "Continue with Google" button
4. Complete Google sign-in flow
5. Should redirect to home page

## Security Best Practices

1. **Never commit `.env.local`** - Already in `.gitignore`
2. **Use strong secrets** - Generate with `openssl rand -base64 32`
3. **HTTPS in production** - Required for OAuth
4. **Validate all inputs** - Client and server-side
5. **Hash passwords** - Use bcrypt with salt rounds ≥ 10
6. **Rate limiting** - Implement on auth endpoints
7. **CSRF protection** - Built into NextAuth
8. **Secure cookies** - Configured automatically

## Troubleshooting

### Google OAuth Not Working
- Check redirect URIs match exactly
- Ensure Google+ API is enabled
- Verify credentials in `.env.local`
- Check browser console for errors

### Session Not Persisting
- Verify `NEXTAUTH_SECRET` is set
- Check cookie settings in browser
- Ensure `NEXTAUTH_URL` matches your domain

### Build Errors
- Run `npm install` to ensure all dependencies
- Check TypeScript errors with `npm run build`
- Verify all imports are correct

## Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)
- [Auth.js v5 Migration Guide](https://authjs.dev/getting-started/migrating-to-v5)

---

**Status:** ✅ Basic setup complete
**Next:** Configure Google OAuth credentials
**Last Updated:** 2026-02-08
