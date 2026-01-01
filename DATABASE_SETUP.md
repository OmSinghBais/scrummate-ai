# 🗄️ Database Setup Guide for Render

## Problem
Backend is failing to connect to PostgreSQL:
```
ERROR [TypeOrmModule] Unable to connect to the database. Retrying...
ECONNREFUSED 127.0.0.1:5432
```

This means `DATABASE_URL` environment variable is **not set** in Render.

## ✅ Solution: Set DATABASE_URL in Render

### Step 1: Create PostgreSQL Database (if not exists)

1. Go to Render Dashboard: https://dashboard.render.com
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name:** `scrummate-db` (or any name)
   - **Database:** `scrummate` (or any name)
   - **User:** (auto-generated)
   - **Region:** Choose closest to your backend
   - **PostgreSQL Version:** 15 or 16
   - **Plan:** Free tier is fine for development
4. Click **"Create Database"**
5. Wait for database to be created (1-2 minutes)

### Step 2: Get Database Connection String

1. Go to your PostgreSQL service in Render
2. Go to **"Info"** tab
3. Find **"Internal Database URL"** or **"Connection Pooling"**
4. Copy the connection string (looks like):
   ```
   postgresql://user:password@hostname:5432/database?sslmode=require
   ```

### Step 3: Set DATABASE_URL in Backend Service

1. Go to your **Backend Service** (not the database)
2. Go to **Settings** → **Environment Variables**
3. Click **"Add Environment Variable"**
4. Add:
   - **Key:** `DATABASE_URL`
   - **Value:** Paste the connection string from Step 2
   - **Environment:** Production, Preview, Development (check all)
5. Click **"Save Changes"**

### Step 4: Redeploy Backend

After adding the environment variable:

1. Go to **Manual Deploy** section
2. Click **"Deploy latest commit"**
3. Wait for deployment to complete

The backend should now connect to the database successfully!

## 🔍 Verify Database Connection

After deployment, check the logs. You should see:
```
✅ [TypeOrmModule] TypeORM successfully connected to the database
```

Instead of:
```
❌ [TypeOrmModule] Unable to connect to the database
```

## 📋 Required Environment Variables

Make sure these are set in your Render backend service:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET` | Secret for JWT tokens | `your-secret-key-here` |
| `NEXTAUTH_SECRET` | NextAuth secret (if using) | `your-nextauth-secret` |
| `ML_API_URL` | ML service URL (optional) | `http://localhost:8000` |

## 🧪 Test Database Connection

After setting `DATABASE_URL` and redeploying:

```bash
# Test if backend is running
curl https://scrummate-ai-21yl.onrender.com/
# Should return: "Hello World!"

# Test registration (should work now)
curl -X POST https://scrummate-ai-21yl.onrender.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@scrummate.ai",
    "password": "Demo123!@#",
    "name": "Demo User"
  }'
# Should return: user object with access_token (not 404, not database error)
```

## 🐛 Troubleshooting

### Still Getting Connection Errors?

1. **Check DATABASE_URL Format:**
   - Should start with `postgresql://` or `postgres://`
   - Should include username, password, host, port, database
   - Should include `?sslmode=require` for Render

2. **Check Database Status:**
   - Go to Render → Your Database Service
   - Verify status is **"Available"** (green)
   - Check if database is paused (free tier pauses after inactivity)

3. **Check Environment Variable:**
   - Go to Backend Service → Settings → Environment Variables
   - Verify `DATABASE_URL` exists and is correct
   - Make sure it's enabled for **Production** environment

4. **Check Backend Logs:**
   - Look for connection attempts
   - Check for SSL errors
   - Verify the connection string format

### Database Paused (Free Tier)

If using Render's free tier, the database pauses after 90 days of inactivity.

**To wake it up:**
1. Go to Render → Your Database Service
2. Click **"Resume"** or **"Wake"**
3. Wait 1-2 minutes for it to start
4. Backend should automatically reconnect

### SSL Connection Issues

If you see SSL errors, make sure your `DATABASE_URL` includes:
```
?sslmode=require
```

Or update `app.module.ts` to handle SSL:
```typescript
ssl: {
  rejectUnauthorized: false,
}
```

## 🎯 Quick Checklist

- [ ] PostgreSQL database created in Render
- [ ] `DATABASE_URL` environment variable set in backend service
- [ ] Database status is "Available"
- [ ] Backend service redeployed after setting DATABASE_URL
- [ ] Logs show successful database connection

---

**Most Common Issue:** `DATABASE_URL` not set in Render backend service! 🚀

