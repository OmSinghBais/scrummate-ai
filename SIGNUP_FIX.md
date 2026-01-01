# 🔧 Signup Registration Fix Guide

## Problem
The signup page shows error: **"Cannot POST /auth/register"**

This means the frontend is trying to make a request to a **relative URL** instead of the full backend URL.

## Root Cause
The `NEXT_PUBLIC_API_URL` environment variable is **not set in Vercel**, so the frontend doesn't know where to send the registration request.

## ✅ Solution (3 Steps)

### Step 1: Get Your Backend URL
Your backend should be deployed on Render. Find your backend URL:
- Go to your Render dashboard
- Find your backend service
- Copy the URL (e.g., `https://scrummate-ai-21yl.onrender.com`)

### Step 2: Set Environment Variable in Vercel

1. **Go to Vercel Dashboard**
   - Navigate to: https://vercel.com/dashboard
   - Select your project: `scrummate-ai-2t6u`

2. **Open Settings**
   - Click on your project
   - Go to **Settings** → **Environment Variables**

3. **Add the Variable**
   - **Key:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://scrummate-ai-21yl.onrender.com` (or your actual backend URL)
   - **Environment:** Select **Production**, **Preview**, and **Development**
   - Click **Save**

### Step 3: Redeploy

After adding the environment variable, you need to redeploy:

1. **Option A: Automatic Redeploy**
   - Push a new commit to trigger redeploy
   - Or go to **Deployments** tab and click **Redeploy** on the latest deployment

2. **Option B: Manual Redeploy**
   - Go to **Deployments** tab
   - Click the **⋯** menu on the latest deployment
   - Select **Redeploy**

## 🔍 Verify It's Working

After redeploying:

1. **Open Browser Console** (F12 → Console tab)
2. **Try to sign up** with test credentials
3. **Check the console logs** - you should see:
   ```
   Registration attempt: {
     apiUrl: "https://scrummate-ai-21yl.onrender.com",
     registerUrl: "https://scrummate-ai-21yl.onrender.com/auth/register",
     hasEnvVar: true,
     envVarValue: "https://scrummate-ai-21yl.onrender.com",
     ...
   }
   ```

4. **If you see the URL in logs**, the fix is working!

## 🐛 Troubleshooting

### Still seeing "Cannot POST /auth/register"?

1. **Check Environment Variable**
   - Go to Vercel → Settings → Environment Variables
   - Verify `NEXT_PUBLIC_API_URL` exists and has the correct value
   - Make sure it's enabled for **Production** environment

2. **Check Backend is Running**
   - Visit your backend URL directly: `https://scrummate-ai-21yl.onrender.com`
   - You should see a response (even if it's an error, it means the server is up)

3. **Check CORS Settings**
   - Your backend should allow requests from Vercel domains
   - Check `backend/src/main.ts` - CORS should include `/.vercel.app$/`

4. **Check Browser Console**
   - Open DevTools (F12)
   - Look for the "Registration attempt" log
   - Check what URL is being used
   - If it's still relative (`/auth/register`), the env var isn't being read

### Environment Variable Not Working?

**Important:** In Next.js, `NEXT_PUBLIC_*` variables are embedded at **build time**, not runtime.

If you added the variable but it's still not working:
1. **Redeploy** (don't just refresh the page)
2. Make sure the variable is set for the **correct environment** (Production/Preview)
3. Check the build logs in Vercel to see if the variable was available during build

## 📝 Quick Test

After setting the environment variable, you can test if it's working:

1. Open your deployed site
2. Open browser console (F12)
3. Type: `console.log(process.env.NEXT_PUBLIC_API_URL)`
4. You should see your backend URL (not `undefined`)

## 🎯 Expected Behavior After Fix

✅ **Before:** Error "Cannot POST /auth/register"  
✅ **After:** Request goes to `https://scrummate-ai-21yl.onrender.com/auth/register`

✅ **Before:** Console shows relative URL  
✅ **After:** Console shows full backend URL

✅ **Before:** Registration fails immediately  
✅ **After:** Registration attempts to connect to backend (may show different error if backend has issues)

---

**Most Common Issue:** Forgetting to redeploy after adding the environment variable!  
**Solution:** Always redeploy after changing environment variables in Vercel.

