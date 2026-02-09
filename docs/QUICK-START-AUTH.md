# Quick Start - Authentication

## 🚀 Test the Auth Pages Now

### 1. Start Development Server
```bash
npm run dev
# or
pnpm dev
```

### 2. Access Auth Pages

**Sign In Page:**
```
http://localhost:3000/auth/signin
```

**Sign Up Page:**
```
http://localhost:3000/auth/signup
```

### 3. Test with Demo Credentials

**Sign In:**
- Email: `demo@travelbuddy.com`
- Password: `demo123`
- Click "Sign In"
- ✅ Should show success toast and redirect

**Sign Up:**
- Fill in any name and email
- Password: `Test1234` (meets all requirements)
- Confirm password: `Test1234`
- Check "I agree to terms"
- Click "Create Account"
- ✅ Should show success toast and redirect to sign in

## 🔧 Enable Google OAuth (Optional)

### Quick Setup (5 minutes)

1. **Get Google Credentials:**
   - Go to https://console.cloud.google.com/
   - Create project → Enable Google+ API
   - Create OAuth 2.0 Client ID
   - Add redirect URI: `http://localhost:3000/api/auth/callback/google`

2. **Create `.env.local`:**
```bash
cp .env.example .env.local
```

3. **Add Your Credentials:**
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=run-openssl-rand-base64-32
GOOGLE_CLIENT_ID=paste-your-client-id
GOOGLE_CLIENT_SECRET=paste-your-client-secret
```

4. **Generate Secret:**
```bash
openssl rand -base64 32
```

5. **Restart Server:**
```bash
npm run dev
```

6. **Test Google Sign In:**
   - Go to `/auth/signin`
   - Click "Continue with Google"
   - ✅ Should redirect to Google OAuth

## 📝 What's Working Now

✅ **Sign In Page** - Full UI with validation
✅ **Sign Up Page** - Full UI with password strength
✅ **Dark Mode** - Toggle in header
✅ **Toast Notifications** - Success/error feedback
✅ **Form Validation** - Client-side checks
✅ **Demo Login** - Test without database
✅ **Responsive Design** - Works on all devices
✅ **Google OAuth Button** - Ready for credentials

## 🎯 Quick Links

- Sign In: http://localhost:3000/auth/signin
- Sign Up: http://localhost:3000/auth/signup
- Home: http://localhost:3000
- Docs: `docs/AUTH-SETUP.md`

## 💡 Tips

- Use demo credentials for quick testing
- Check browser console for any errors
- Toast notifications show in top-right
- Dark mode toggle in header
- All forms have validation
- Password must meet 4 requirements

## 🐛 Troubleshooting

**Page not found?**
```bash
# Restart dev server
npm run dev
```

**Google OAuth not working?**
- Check `.env.local` exists
- Verify credentials are correct
- Ensure redirect URI matches exactly
- Restart server after adding credentials

**Toast not showing?**
- Check if Toaster is in layout
- Look for console errors
- Try refreshing page

## 📚 Full Documentation

See `docs/AUTH-SETUP.md` for complete setup guide.

---

**Ready to test!** 🎉
Just run `npm run dev` and visit `/auth/signin`
