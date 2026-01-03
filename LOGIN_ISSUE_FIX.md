# 🔧 Login Issue After Registration - Quick Fix Guide

## Problem
You successfully registered but get "Invalid email or password" when trying to log in.

## Most Common Causes

### 1. **Backend Database Not Connected** (Most Likely)
The backend needs `DATABASE_URL` environment variable set in Render.

**Check:**
- Go to Render Dashboard → Your Backend Service → Environment Variables
- Verify `DATABASE_URL` is set
- If missing, see `DATABASE_SETUP.md` for instructions

**Test:**
```bash
curl https://scrummate-ai-21yl.onrender.com/auth/login
# Should return an error, not a connection refused
```

### 2. **Frontend API URL Not Set**
The frontend needs `NEXT_PUBLIC_API_URL` in Vercel.

**Check:**
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Verify `NEXT_PUBLIC_API_URL` = `https://scrummate-ai-21yl.onrender.com`
- Make sure it's enabled for **Production**

**Redeploy after setting:**
- Vercel → Deployments → Redeploy

### 3. **Backend Not Running**
The backend service might be paused or crashed.

**Check:**
- Go to Render Dashboard → Your Backend Service
- Status should be **"Live"** (green)
- If paused, click **"Resume"**

### 4. **User Not Actually Created**
Registration might have succeeded but user wasn't saved to database.

**Test:**
```bash
# Try registering again with same email
curl -X POST https://scrummate-ai-21yl.onrender.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-email@example.com",
    "password": "your-password",
    "name": "Your Name"
  }'
```

If you get "User already exists", the user was created. If you get a database error, the database isn't connected.

## Quick Diagnostic Steps

### Step 1: Check Backend Logs
1. Go to Render Dashboard → Your Backend Service
2. Click **"Logs"** tab
3. Look for:
   - `ERROR [TypeOrmModule] Unable to connect to the database` → Database not connected
   - `POST /auth/login` → Backend is receiving requests
   - Any 404 errors → Route not found

### Step 2: Test Backend Directly
```bash
# Test login endpoint
curl -X POST https://scrummate-ai-21yl.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-email@example.com",
    "password": "your-password"
  }'
```

**Expected Response:**
```json
{
  "access_token": "eyJhbGc...",
  "user": {
    "id": 1,
    "email": "your-email@example.com",
    "name": "Your Name",
    "teams": []
  }
}
```

**If you get:**
- `404 Not Found` → Backend route doesn't exist (redeploy backend)
- `500 Internal Server Error` → Database connection issue
- `401 Unauthorized` → Wrong credentials (user doesn't exist or wrong password)

### Step 3: Check Vercel Function Logs
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click latest deployment
3. Go to **Functions** tab
4. Find `/api/auth/[...nextauth]`
5. Check logs for:
   - "Login attempt:" with API URL
   - Any axios errors
   - Network errors

### Step 4: Verify Environment Variables

**Vercel (Frontend):**
- `NEXT_PUBLIC_API_URL` = `https://scrummate-ai-21yl.onrender.com`
- `NEXTAUTH_SECRET` = (any random string)
- `NEXTAUTH_URL` = `https://scrummate-ai-2t6u.vercel.app`

**Render (Backend):**
- `DATABASE_URL` = `postgresql://user:pass@host:5432/db?sslmode=require`
- `JWT_SECRET` = (any random string)

## Solution Checklist

- [ ] Backend `DATABASE_URL` is set in Render
- [ ] Backend service is "Live" (not paused)
- [ ] Frontend `NEXT_PUBLIC_API_URL` is set in Vercel
- [ ] Both services have been redeployed after setting env vars
- [ ] Backend logs show successful database connection
- [ ] Direct API test (curl) works

## Still Not Working?

1. **Create a new account** with a different email
2. **Check browser console** (F12) for detailed errors
3. **Check Vercel function logs** for NextAuth errors
4. **Check Render backend logs** for database/auth errors

## Need More Help?

See:
- `DATABASE_SETUP.md` - Database connection guide
- `LOGIN_TROUBLESHOOTING.md` - Detailed troubleshooting
- `SIGNUP_FIX.md` - Signup-specific issues

