# 🌐 Production Environment Variables Setup

Since your project is **already deployed**, you need to set environment variables in your hosting platforms (Vercel for frontend, Render for backend).

---

## 🎯 Frontend (Vercel) - Production Environment Variables

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Select your project: `scrummate-ai-2t6u`
3. Go to **Settings** → **Environment Variables**

### Step 2: Add These Variables

**For Production:**
```
NEXTAUTH_URL = https://scrummate-ai-2t6u.vercel.app
NEXTAUTH_SECRET = e5vSG0oJxRHMwQ3IRrtR2z5b8dS22IebDeUgrE88OY0=
NEXT_PUBLIC_API_URL = https://scrummate-ai-21yl.onrender.com
```

**Important:**
- ✅ Select **Production** environment
- ✅ Select **Preview** environment (for PR previews)
- ✅ Select **Development** environment (optional, for local dev)

### Step 3: Redeploy
After adding variables, Vercel will automatically trigger a new deployment, OR:
- Go to **Deployments** tab
- Click **Redeploy** on the latest deployment

---

## 🎯 Backend (Render) - Production Environment Variables

### Step 1: Go to Render Dashboard
1. Visit: https://dashboard.render.com
2. Select your backend service: `scrummate-ai-21yl`
3. Go to **Environment** tab

### Step 2: Add/Update These Variables

**Add or Update:**
```
JWT_SECRET = BtfN+OuZ1Xr67nAoL9YQyqBc/YYBWDUynkjIiuzANxc=
```

**Verify these are set:**
```
DATABASE_URL = (your PostgreSQL connection string)
ML_API_URL = https://scrummate-ai-2.onrender.com
JIRA_BASE_URL = (if using Jira)
JIRA_EMAIL = (if using Jira)
JIRA_API_TOKEN = (if using Jira)
GITHUB_TOKEN = (if using GitHub)
GITHUB_OWNER = (if using GitHub)
GITHUB_REPO = (if using GitHub)
PORT = 3001
```

### Step 3: Restart Service
After adding/updating variables:
- Click **Manual Deploy** → **Deploy latest commit**
- OR wait for auto-deploy on next push

---

## 📋 Environment Variables Summary

### Frontend (Vercel) - Production
```env
NEXTAUTH_URL=https://scrummate-ai-2t6u.vercel.app
NEXTAUTH_SECRET=e5vSG0oJxRHMwQ3IRrtR2z5b8dS22IebDeUgrE88OY0=
NEXT_PUBLIC_API_URL=https://scrummate-ai-21yl.onrender.com
```

### Backend (Render) - Production
```env
JWT_SECRET=BtfN+OuZ1Xr67nAoL9YQyqBc/YYBWDUynkjIiuzANxc=
DATABASE_URL=postgresql://... (your production database)
ML_API_URL=https://scrummate-ai-2.onrender.com
PORT=3001
```

---

## 🏠 Local Development (Optional)

If you want to run locally for development, create these files:

### `frontend/.env.local` (for local dev only)
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=e5vSG0oJxRHMwQ3IRrtR2z5b8dS22IebDeUgrE88OY0=
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### `backend/.env` (for local dev only)
```env
JWT_SECRET=BtfN+OuZ1Xr67nAoL9YQyqBc/YYBWDUynkjIiuzANxc=
DATABASE_URL=postgresql://postgres:password@localhost:5432/scrummate_ai
ML_API_URL=http://localhost:8000
PORT=3001
```

**Note:** These local files are for development only. Production uses the values set in Vercel/Render dashboards.

---

## ✅ Verification Checklist

### Frontend (Vercel)
- [ ] `NEXTAUTH_URL` = Your Vercel app URL (https://scrummate-ai-2t6u.vercel.app)
- [ ] `NEXTAUTH_SECRET` = Generated secret (32+ characters)
- [ ] `NEXT_PUBLIC_API_URL` = Your Render backend URL (https://scrummate-ai-21yl.onrender.com)
- [ ] All variables set for **Production** environment
- [ ] Redeployed after adding variables

### Backend (Render)
- [ ] `JWT_SECRET` = Generated secret (32+ characters)
- [ ] `DATABASE_URL` = Production PostgreSQL connection string
- [ ] `ML_API_URL` = Your ML service URL (https://scrummate-ai-2.onrender.com)
- [ ] Service restarted after adding variables

---

## 🔍 How to Check if Variables Are Set

### Vercel
1. Go to your project → Settings → Environment Variables
2. You should see all 3 variables listed
3. Check that they're enabled for "Production"

### Render
1. Go to your service → Environment tab
2. You should see `JWT_SECRET` in the list
3. Verify the value is correct

---

## 🚨 Common Issues

### Issue: "NEXTAUTH_SECRET is missing" in production
**Solution:**
- Make sure you added it in Vercel dashboard (not just locally)
- Verify it's set for "Production" environment
- Redeploy your Vercel app

### Issue: Authentication not working in production
**Solution:**
- Check `NEXTAUTH_URL` matches your actual Vercel domain
- Verify `NEXT_PUBLIC_API_URL` points to your Render backend
- Make sure backend `JWT_SECRET` matches what's in the code

### Issue: CORS errors
**Solution:**
- Verify `NEXT_PUBLIC_API_URL` in Vercel matches your Render backend URL
- Check that Render backend allows requests from your Vercel domain

---

## 📝 Quick Reference

**Your Production URLs:**
- Frontend: `https://scrummate-ai-2t6u.vercel.app`
- Backend: `https://scrummate-ai-21yl.onrender.com`
- ML Service: `https://scrummate-ai-2.onrender.com`

**Secrets to Use:**
- NextAuth Secret: `e5vSG0oJxRHMwQ3IRrtR2z5b8dS22IebDeUgrE88OY0=`
- JWT Secret: `BtfN+OuZ1Xr67nAoL9YQyqBc/YYBWDUynkjIiuzANxc=`

---

**Last Updated:** 2025-01-XX

