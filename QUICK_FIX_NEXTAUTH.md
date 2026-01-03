# ⚡ Quick Fix: NextAuth Configuration Error

## You're seeing: "Server error - There is a problem with the server configuration"

This means `NEXTAUTH_SECRET` is **missing** in Vercel.

## 🚀 3-Step Fix (Takes 2 minutes)

### Step 1: Generate Secret (30 seconds)

Open your terminal and run:
```bash
openssl rand -base64 32
```

**OR** visit: https://generate-secret.vercel.app/32

**Copy the output** (looks like: `xK8mP2qR5vT9wY3zA6bC1dE4fG7hJ0kL3nO6pQ8sT1uV4wX7yZ0aB2cD5eF8gH1=`)

### Step 2: Add to Vercel (1 minute)

1. **Go to:** https://vercel.com/dashboard
2. **Click** your project: `scrummate-ai`
3. **Click:** Settings → Environment Variables
4. **Add these 3 variables:**

   **Variable 1:**
   - Key: `NEXTAUTH_SECRET`
   - Value: (paste the secret from Step 1)
   - ✅ Production, ✅ Preview, ✅ Development

   **Variable 2:**
   - Key: `NEXTAUTH_URL`
   - Value: `https://scrummate-ai-2t6u.vercel.app`
   - ✅ Production, ✅ Preview

   **Variable 3:**
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://scrummate-ai-21yl.onrender.com`
   - ✅ Production, ✅ Preview, ✅ Development

5. **Click "Save"** for each variable

### Step 3: Redeploy (30 seconds)

1. **Go to:** Deployments tab
2. **Click** the **three dots** (⋯) on the latest deployment
3. **Click:** "Redeploy"
4. **Wait** 1-2 minutes for deployment

## ✅ Test

After redeployment completes:

1. Visit: `https://scrummate-ai-2t6u.vercel.app/login`
2. The error should be gone!

## 🔍 Still Not Working?

### Check 1: Verify Variables Are Set
- Vercel → Settings → Environment Variables
- You should see all 3 variables listed
- Make sure they're enabled for **Production**

### Check 2: Check Deployment Logs
- Vercel → Deployments → Latest → Logs
- Look for any errors about `NEXTAUTH_SECRET`

### Check 3: Test NextAuth Endpoint
Visit: `https://scrummate-ai-2t6u.vercel.app/api/auth/providers`

**Should return:** JSON with providers (not an error page)

**If error:** `NEXTAUTH_SECRET` is still not set correctly

## 📋 Copy-Paste Checklist

- [ ] Generated `NEXTAUTH_SECRET` using `openssl rand -base64 32`
- [ ] Added `NEXTAUTH_SECRET` to Vercel (Production, Preview, Development)
- [ ] Added `NEXTAUTH_URL` to Vercel (Production, Preview)
- [ ] Added `NEXT_PUBLIC_API_URL` to Vercel (Production, Preview, Development)
- [ ] Redeployed the application
- [ ] Tested `/api/auth/providers` endpoint
- [ ] Tested login page

## 🆘 Need Help?

If you've done all steps and still see the error:

1. **Check Vercel Function Logs:**
   - Deployments → Latest → Functions → `/api/auth/[...nextauth]` → Logs
   - Look for "NEXTAUTH_SECRET" errors

2. **Verify Secret Format:**
   - Should be 32+ characters
   - Should be base64 encoded
   - No spaces or special characters (except `=`, `+`, `/`)

3. **Try a New Secret:**
   - Generate a new one
   - Update in Vercel
   - Redeploy

---

**Most Important:** Make sure `NEXTAUTH_SECRET` is set and you've **redeployed** after setting it!

