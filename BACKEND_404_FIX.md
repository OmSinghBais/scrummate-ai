# 🔧 Backend 404 Error Fix Guide

## Problem
The backend is returning **404 Not Found** for `/auth/login`:
```
url: 'https://scrummate-ai-21yl.onrender.com/auth/login'
status: 404
data: { message: 'Cannot POST /auth/login', error: 'Not Found', statusCode: 404 }
```

## Root Cause
The backend server is running, but the routes are not being registered. This usually means:
1. The backend wasn't built/deployed correctly
2. The backend is using an old version without the auth routes
3. The backend needs to be restarted/redeployed

## ✅ Solution Steps

### Step 1: Verify Backend is Deployed on Render

1. Go to Render Dashboard: https://dashboard.render.com
2. Find your backend service (`scrummate-ai-21yl` or similar)
3. Check if it's **Running** (green status)
4. Check the **Logs** tab for any errors

### Step 2: Check Backend Build

The backend needs to be built before deployment. Verify:

1. **In Render Dashboard:**
   - Go to your backend service
   - Check **Settings** → **Build Command**
   - Should be: `npm install && npm run build`
   - Check **Start Command**
   - Should be: `npm run start:prod` or `node dist/main.js`

2. **Verify Build Output:**
   - Check if `dist/` folder exists in your backend
   - The compiled JavaScript should be in `dist/`

### Step 3: Test Backend Endpoints Directly

Test if the backend is responding at all:

```bash
# Test root endpoint
curl https://scrummate-ai-21yl.onrender.com/

# Should return: "Hello World!" or similar
```

If this doesn't work, the backend isn't running.

### Step 4: Check Backend Logs in Render

1. Go to Render Dashboard → Your Backend Service
2. Click **Logs** tab
3. Look for:
   - Build errors
   - Runtime errors
   - "Nest application successfully started" message
   - Any route registration errors

### Step 5: Verify Routes are Registered

The backend should log routes on startup. Check logs for:
```
Mapped {/auth/login, POST} route
Mapped {/auth/register, POST} route
```

If you don't see these, the routes aren't being registered.

## 🔍 Common Issues & Fixes

### Issue 1: Backend Not Built
**Symptom:** No `dist/` folder or old build

**Fix:**
1. In Render, go to **Settings** → **Build Command**
2. Ensure it's: `npm install && npm run build`
3. **Redeploy** the service

### Issue 2: Wrong Start Command
**Symptom:** Backend starts but routes don't work

**Fix:**
1. In Render, go to **Settings** → **Start Command**
2. Should be: `npm run start:prod` or `node dist/main.js`
3. NOT: `npm run start:dev` (this is for development)

### Issue 3: Old Deployment
**Symptom:** Backend is running old code without auth routes

**Fix:**
1. **Redeploy** the backend service in Render
2. Or trigger a new deployment by pushing to your repo

### Issue 4: Module Not Imported
**Symptom:** Routes exist in code but aren't registered

**Fix:**
1. Check `backend/src/app.module.ts`
2. Verify `UserModule` is in the `imports` array
3. Verify `UserController` is in `UserModule` controllers

### Issue 5: Port Mismatch
**Symptom:** Backend starts on wrong port

**Fix:**
1. Check `backend/src/main.ts`
2. Should use: `process.env.PORT || 4000`
3. Render automatically sets `PORT` environment variable

## 🧪 Quick Test

Test the backend directly:

```bash
# Test registration
curl -X POST https://scrummate-ai-21yl.onrender.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "name": "Test User"
  }'

# Test login
curl -X POST https://scrummate-ai-21yl.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

If both return 404, the routes aren't registered.

## 📋 Render Deployment Checklist

- [ ] Backend service is **Running** (green status)
- [ ] **Build Command** is set: `npm install && npm run build`
- [ ] **Start Command** is set: `npm run start:prod`
- [ ] **Environment Variables** are set (DATABASE_URL, JWT_SECRET, etc.)
- [ ] **Auto-Deploy** is enabled (or manually redeploy after code changes)
- [ ] **Logs** show "Nest application successfully started"
- [ ] **Logs** show route mappings

## 🚀 Force Redeploy

If nothing else works:

1. **Manual Redeploy:**
   - Go to Render Dashboard → Your Backend Service
   - Click **Manual Deploy** → **Deploy latest commit**

2. **Or Push New Commit:**
   - Make a small change (add a comment)
   - Push to trigger auto-deploy

## 🔍 Verify After Fix

After redeploying, test again:

```bash
curl https://scrummate-ai-21yl.onrender.com/auth/login
```

Should return a validation error (not 404), which means the route exists!

---

**Most Common Fix:** Redeploy the backend service in Render! 🚀

