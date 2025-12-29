# 🔧 Production Environment Variables Setup

Quick reference for setting up environment variables in production.

## 🎯 Quick Setup

### Frontend (Vercel)

**URL:** https://vercel.com/omsinghbais-projects/scrummate-ai-2t6u/settings/environment-variables

**Add this variable:**
```
NEXT_PUBLIC_API_URL=https://scrummate-ai-21yl.onrender.com
```

**Steps:**
1. Go to Vercel dashboard → Your project → Settings → Environment Variables
2. Click "Add New"
3. Key: `NEXT_PUBLIC_API_URL`
4. Value: `https://scrummate-ai-21yl.onrender.com`
5. Select all environments (Production, Preview, Development)
6. Click "Save"
7. Go to Deployments → Redeploy

### Backend (Render)

**URL:** https://dashboard.render.com → Your backend service → Environment

**Required Variables:**
```env
DATABASE_URL=your-postgresql-connection-string
ML_API_URL=https://scrummate-ai-2.onrender.com
PORT=10000
```

**Optional (for real data):**
```env
JIRA_BASE_URL=https://your-domain.atlassian.net
JIRA_EMAIL=your-email@example.com
JIRA_API_TOKEN=your-token
GITHUB_TOKEN=your-github-token
GITHUB_OWNER=your-org
GITHUB_REPO=your-repo
```

**Steps:**
1. Go to Render dashboard → Your backend service
2. Click "Environment" tab
3. Click "Add Environment Variable"
4. Add each variable one by one
5. Click "Save Changes"
6. Service will automatically restart

### ML Service (Render)

**URL:** https://dashboard.render.com → Your ML service → Environment

**Usually no variables needed**, but if you have custom paths:
```env
MODEL_PATH=/path/to/model.pkl
```

## ✅ Verification

After setting variables:

1. **Frontend:** Check Vercel deployment logs
2. **Backend:** Check Render service logs
3. **Test:** Visit https://scrummate-ai-2t6u.vercel.app/dashboard

## 🔍 Common Issues

**Frontend shows "Failed to load dashboard data"**
- ✅ Check `NEXT_PUBLIC_API_URL` is set in Vercel
- ✅ Verify backend URL is correct
- ✅ Check backend is running

**Backend shows "ML service unavailable"**
- ✅ Check `ML_API_URL` is set in Render backend
- ✅ Verify ML service URL is correct
- ✅ Check ML service is running

**Database connection errors**
- ✅ Check `DATABASE_URL` format is correct
- ✅ Verify database is accessible from Render
- ✅ Check database credentials

---

**Need detailed instructions?** See `DEPLOYMENT.md`

