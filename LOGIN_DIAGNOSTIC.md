# 🔍 Login "Invalid email or password" - Diagnostic Guide

## Current Status
✅ NextAuth is configured correctly (no configuration error)  
❌ Login failing with "Invalid email or password"

This means the backend **cannot verify your credentials**, most likely because:
1. **Backend database is not connected** (most common)
2. User doesn't exist in database
3. Backend API is not responding correctly

## Quick Diagnostic Steps

### Step 1: Test Backend Connection

Visit this URL in your browser:
```
https://scrummate-ai-2t6u.vercel.app/api/test-backend
```

**Expected Response:**
```json
{
  "success": true,
  "backend": {
    "reachable": true,
    "status": 200
  },
  "loginEndpoint": {
    "exists": true,
    "status": 401  // 401 is OK - means endpoint exists but needs credentials
  }
}
```

**If you see:**
- `"reachable": false` → Backend is down or unreachable
- `"status": 404` → Backend route doesn't exist
- `"status": 500` → Backend database error (most likely)

### Step 2: Check Backend Logs on Render

1. Go to: https://dashboard.render.com
2. Select your backend service
3. Click **"Logs"** tab
4. Look for:
   - `ERROR [TypeOrmModule] Unable to connect to the database` → **Database not connected**
   - `POST /auth/login` → Backend is receiving requests
   - Any database connection errors

### Step 3: Verify Database is Connected

**If you see database connection errors:**

1. Go to Render Dashboard → Your Backend Service
2. Go to **Environment** tab
3. Check if `DATABASE_URL` is set
4. If missing, see `DATABASE_SETUP.md` for instructions

### Step 4: Test Login Endpoint Directly

Test the backend login endpoint directly:

```bash
curl -X POST https://scrummate-ai-21yl.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "baisos@rknec.edu",
    "password": "your-password"
  }'
```

**Expected Response (Success):**
```json
{
  "access_token": "eyJhbGc...",
  "user": {
    "id": 1,
    "email": "baisos@rknec.edu",
    "name": "Your Name",
    "teams": []
  }
}
```

**If you get:**
- `401 Unauthorized` → Wrong password OR user doesn't exist
- `500 Internal Server Error` → Database connection issue
- `404 Not Found` → Backend route doesn't exist

## Most Likely Issue: Database Not Connected

Based on earlier logs, your backend showed:
```
ERROR [TypeOrmModule] Unable to connect to the database
```

### Fix: Set DATABASE_URL in Render

1. **Create PostgreSQL Database (if not exists):**
   - Go to Render Dashboard
   - Click **"New +"** → **"PostgreSQL"**
   - Configure and create database
   - Wait 1-2 minutes

2. **Get Connection String:**
   - Go to your PostgreSQL service
   - **Info** tab → Copy **"Internal Database URL"**

3. **Set in Backend:**
   - Go to your Backend Service
   - **Environment** tab
   - Add: `DATABASE_URL` = (paste connection string)
   - Save

4. **Redeploy Backend:**
   - Backend should auto-redeploy
   - Or click **"Manual Deploy"** → **"Deploy latest commit"**

5. **Verify Connection:**
   - Check logs for: `✅ [TypeOrmModule] TypeORM successfully connected`

## Alternative: User Doesn't Exist

If database is connected but login still fails:

### Option 1: Create New Account
1. Go to: `https://scrummate-ai-2t6u.vercel.app/signup`
2. Create a new account
3. Try logging in with new credentials

### Option 2: Check if User Exists
If you registered before database was connected, the user might not have been saved.

**Solution:** Register again with the same email (or use a different email)

## Quick Checklist

- [ ] Backend is reachable (test `/api/test-backend`)
- [ ] `DATABASE_URL` is set in Render backend
- [ ] Backend logs show successful database connection
- [ ] User exists in database (or register new account)
- [ ] Backend login endpoint returns 401 (not 500)

## Still Not Working?

1. **Check Vercel Function Logs:**
   - Vercel → Deployments → Latest → Functions → `/api/auth/[...nextauth]` → Logs
   - Look for backend connection errors

2. **Check Browser Console:**
   - Open DevTools (F12)
   - Console tab
   - Look for any errors when logging in

3. **Verify Environment Variables:**
   - Vercel: `NEXT_PUBLIC_API_URL` = `https://scrummate-ai-21yl.onrender.com`
   - Render: `DATABASE_URL` is set

---

**Most Common Fix:** Set `DATABASE_URL` in Render backend and redeploy!

