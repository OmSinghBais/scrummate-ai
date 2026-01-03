# 🔧 NextAuth Configuration Error Fix

## Error: "There is a problem with the server configuration"

This error (`/api/auth/error?error=Configuration`) means NextAuth is missing required environment variables.

## Required Environment Variables

### In Vercel (Frontend):

1. **NEXTAUTH_SECRET** (Required)
   - A random secret string used to encrypt JWT tokens
   - Generate one: `openssl rand -base64 32`
   - Or use: https://generate-secret.vercel.app/32
   - Example: `e5vSG0oJxRHMwQ3IRrtR2z5b8dS22IebDeUgrE88OY0=`

2. **NEXTAUTH_URL** (Required for production)
   - Your frontend URL
   - For Vercel: `https://scrummate-ai-2t6u.vercel.app`
   - Or your custom domain if you have one

3. **NEXT_PUBLIC_API_URL** (Required)
   - Your backend API URL
   - Should be: `https://scrummate-ai-21yl.onrender.com`

## How to Fix

### Step 1: Generate NEXTAUTH_SECRET

Run this command in your terminal:
```bash
openssl rand -base64 32
```

Or visit: https://generate-secret.vercel.app/32

Copy the generated secret.

### Step 2: Set Environment Variables in Vercel

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Select your project: `scrummate-ai`
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

   **NEXTAUTH_SECRET**
   - Key: `NEXTAUTH_SECRET`
   - Value: (paste the secret you generated)
   - Environment: ✅ Production, ✅ Preview, ✅ Development

   **NEXTAUTH_URL**
   - Key: `NEXTAUTH_URL`
   - Value: `https://scrummate-ai-2t6u.vercel.app`
   - Environment: ✅ Production, ✅ Preview

   **NEXT_PUBLIC_API_URL**
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://scrummate-ai-21yl.onrender.com`
   - Environment: ✅ Production, ✅ Preview, ✅ Development

### Step 3: Redeploy

After adding environment variables:

1. Go to **Deployments** tab
2. Click the **three dots** (⋯) on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

## Verify Configuration

After redeploying, test the login:

1. Go to: `https://scrummate-ai-2t6u.vercel.app/login`
2. Try to log in
3. If you still see the error, check Vercel function logs:
   - Go to **Deployments** → Latest deployment → **Functions** tab
   - Look for `/api/auth/[...nextauth]` function
   - Check logs for any errors

## Common Issues

### Issue 1: NEXTAUTH_SECRET not set
**Error:** Configuration error  
**Fix:** Set `NEXTAUTH_SECRET` in Vercel environment variables

### Issue 2: NEXTAUTH_URL incorrect
**Error:** Configuration error or redirect issues  
**Fix:** Set `NEXTAUTH_URL` to your exact Vercel deployment URL

### Issue 3: Environment variables not applied
**Error:** Still seeing configuration error after setting vars  
**Fix:** 
- Make sure variables are enabled for **Production**
- Redeploy the application
- Wait for deployment to complete

## Quick Checklist

- [ ] `NEXTAUTH_SECRET` is set in Vercel
- [ ] `NEXTAUTH_URL` is set to your Vercel URL
- [ ] `NEXT_PUBLIC_API_URL` is set to your Render backend URL
- [ ] All variables are enabled for **Production**
- [ ] Application has been redeployed after setting variables

## Testing

After fixing, test:

1. **Registration:**
   ```
   https://scrummate-ai-2t6u.vercel.app/signup
   ```

2. **Login:**
   ```
   https://scrummate-ai-2t6u.vercel.app/login
   ```

3. **Check NextAuth endpoint:**
   ```
   https://scrummate-ai-2t6u.vercel.app/api/auth/providers
   ```
   Should return JSON with providers (not an error page)

## Still Having Issues?

1. **Check Vercel Function Logs:**
   - Deployments → Latest → Functions → `/api/auth/[...nextauth]` → Logs

2. **Check Browser Console:**
   - Open DevTools (F12)
   - Look for any errors

3. **Verify Environment Variables:**
   - Vercel → Settings → Environment Variables
   - Make sure all three are set correctly

4. **Test Backend Connection:**
   - Visit: `https://scrummate-ai-2t6u.vercel.app/api/test-backend`
   - Should show backend connection status

---

**Most Common Issue:** `NEXTAUTH_SECRET` is missing! Make sure it's set in Vercel environment variables.

