# 🚨 Quick Fix: Backend 404 Error

## Problem
Backend is returning 404 for all routes:
```bash
curl https://scrummate-ai-21yl.onrender.com/auth/register
# Returns: {"message":"Cannot POST /auth/register","error":"Not Found","statusCode":404}
```

## ✅ Solution: Redeploy Backend on Render

### Step 1: Go to Render Dashboard
1. Visit: https://dashboard.render.com
2. Log in to your account
3. Find your backend service (likely named `scrummate-ai-21yl` or similar)

### Step 2: Check Service Status
1. Click on your backend service
2. Check if status is **"Live"** (green)
3. If it's **"Stopped"** or **"Error"**, click **"Manual Deploy"** → **"Deploy latest commit"**

### Step 3: Verify Build Settings
1. Go to **Settings** tab
2. Check **Build Command**: Should be `npm install && npm run build`
3. Check **Start Command**: Should be `npm run start:prod` or `node dist/main.js`
4. If wrong, update and save

### Step 4: Manual Redeploy
1. Go to **Manual Deploy** section
2. Click **"Deploy latest commit"**
3. Wait for build to complete (usually 2-5 minutes)

### Step 5: Verify It's Working
After deployment completes, test:

```bash
# Test root endpoint
curl https://scrummate-ai-21yl.onrender.com/
# Should return: "Hello World!" or similar

# Test register endpoint (should return validation error, not 404)
curl -X POST https://scrummate-ai-21yl.onrender.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test"}'
# Should return: validation error or "User already exists" (NOT 404)
```

If you get a validation error instead of 404, the routes are working! ✅

## 🔄 Alternative: Use Frontend Signup

While waiting for backend redeploy, you can:

1. **Go to your frontend signup page:**
   ```
   https://your-vercel-url.vercel.app/signup
   ```

2. **Create account:**
   - Email: `demo@scrummate.ai`
   - Password: `Demo123!@#`
   - Name: `Demo User`

3. **If signup works**, you'll be redirected to login
4. **Then log in** with the same credentials

## 📋 Render Deployment Checklist

Before redeploying, verify:

- [ ] Backend service exists in Render dashboard
- [ ] Service status is "Live" or can be started
- [ ] Build Command: `npm install && npm run build`
- [ ] Start Command: `npm run start:prod`
- [ ] Environment variables are set (DATABASE_URL, JWT_SECRET, etc.)
- [ ] Repository is connected and up to date

## 🐛 Still Getting 404 After Redeploy?

1. **Check Build Logs:**
   - Go to Render → Your Service → Logs
   - Look for build errors
   - Check if `dist/` folder was created

2. **Check Runtime Logs:**
   - Look for "Nest application successfully started"
   - Check for route registration messages
   - Look for any errors

3. **Verify Code is Latest:**
   - Make sure your latest code is pushed to GitHub
   - Render should auto-deploy, or manually trigger deploy

4. **Check Port:**
   - Render sets `PORT` environment variable automatically
   - Your `main.ts` should use: `process.env.PORT || 4000`

## 🎯 Expected Result

After successful redeploy:

✅ `curl https://scrummate-ai-21yl.onrender.com/` → Returns "Hello World!"  
✅ `curl -X POST .../auth/register` → Returns validation error (not 404)  
✅ `curl -X POST .../auth/login` → Returns validation error (not 404)  

**404 = Routes not registered**  
**Validation error = Routes working!** ✅

---

**Most Important:** Redeploy the backend service in Render! 🚀

