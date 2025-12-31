# 🚨 Quick Fix: Dashboard Not Showing After Refresh

## The Problem

The dashboard is trying to connect to `http://localhost:3001` instead of your production backend URL `https://scrummate-ai-21yl.onrender.com`.

## ✅ Solution (2 minutes)

### Step 1: Set Environment Variable in Vercel

1. **Go to Vercel:**
   - https://vercel.com/omsinghbais-projects/scrummate-ai-2t6u/settings/environment-variables

2. **Add New Variable:**
   - Click **"Add New"**
   - **Key:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://scrummate-ai-21yl.onrender.com`
   - **Environments:** Check all (Production, Preview, Development)
   - Click **"Save"**

3. **Redeploy:**
   - Go to **"Deployments"** tab
   - Click **"..."** on the latest deployment
   - Click **"Redeploy"**
   - Wait for deployment to complete

### Step 2: Test
https://scrummate-ai-2t6u.vercel.app/dashboard
1. Open: 
2. Refresh the page
3. Dashboard should now load!

## 🔍 Verify It's Working

**Check Browser Console:**
1. Press `F12` (or `Cmd + Option + I` on Mac)
2. Go to "Console" tab
3. You should see: `Fetching from API: https://scrummate-ai-21yl.onrender.com`
4. No red errors

**If you see errors:**
- Check the error message
- Verify backend is running: `curl https://scrummate-ai-21yl.onrender.com/sprint/health`

## ⚡ Alternative: Quick Code Fix

I've also updated the code to auto-detect Vercel and use the production URL. But you still need to:

1. **Commit and push the updated code:**
   ```bash
   git add frontend/src/app/dashboard/page.tsx
   git commit -m "Fix API URL for production"
   git push
   ```

2. **Vercel will auto-deploy** with the fix

3. **Still set the environment variable** (recommended) for proper configuration

## 🆘 Still Not Working?

1. **Check browser console** - What errors do you see?
2. **Check Vercel logs** - Any build/runtime errors?
3. **Test backend directly:**
   ```bash
   curl https://scrummate-ai-21yl.onrender.com/sprint/health
   ```

See `TROUBLESHOOTING.md` for more detailed help.

---

**Most likely fix:** Set `NEXT_PUBLIC_API_URL` in Vercel and redeploy! ✅

