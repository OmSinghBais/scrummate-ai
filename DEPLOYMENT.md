# 🚀 Production Deployment Guide

Your ScrumMate AI application is deployed to production! Here are the deployment details and configuration.

## 🌐 Production URLs

- **Frontend (Vercel):** https://scrummate-ai-2t6u.vercel.app
- **Backend (Render):** https://scrummate-ai-21yl.onrender.com
- **ML Service (Render):** https://scrummate-ai-2.onrender.com

## ⚙️ Environment Variables Configuration

### Frontend (Vercel)

Set these environment variables in your Vercel project settings:

1. Go to: https://vercel.com/omsinghbais-projects/scrummate-ai-2t6u/settings/environment-variables
2. Add the following:

```
NEXT_PUBLIC_API_URL=https://scrummate-ai-21yl.onrender.com
```

**How to add:**
1. Click "Add New"
2. Key: `NEXT_PUBLIC_API_URL`
3. Value: `https://scrummate-ai-21yl.onrender.com`
4. Environment: Production, Preview, Development (select all)
5. Click "Save"
6. Redeploy your application

### Backend (Render)

Set these environment variables in your Render dashboard:

1. Go to your Render dashboard: https://dashboard.render.com
2. Select your backend service: `scrummate-ai-21yl`
3. Go to "Environment" tab
4. Add the following variables:

```env
# Database
DATABASE_URL=your-production-database-url

# ML Service
ML_API_URL=https://scrummate-ai-2.onrender.com

# Jira Integration (Optional)
JIRA_BASE_URL=https://your-domain.atlassian.net
JIRA_EMAIL=your-email@example.com
JIRA_API_TOKEN=your-jira-api-token

# GitHub Integration (Optional)
GITHUB_TOKEN=your-github-token
GITHUB_OWNER=your-organization
GITHUB_REPO=your-repository

# Server
PORT=10000
```

**Note:** Render typically uses port 10000, but check your Render service settings.

### ML Service (Render)

Set these environment variables in your Render dashboard:

1. Go to your Render dashboard
2. Select your ML service: `scrummate-ai-2`
3. Go to "Environment" tab
4. Add if needed:

```env
# Usually no environment variables needed for ML service
# But if you have model file paths, add them here
```

## 🔧 CORS Configuration

The backend CORS is already configured to allow your Vercel frontend. The backend `main.ts` includes:

```typescript
app.enableCors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://scrummate-ai-2t6u.vercel.app',
    /\.vercel\.app$/,
  ],
  methods: 'GET,POST',
});
```

If you add a custom domain, update the CORS settings in `backend/src/main.ts`.

## 📊 Database Setup (Production)

### Option 1: Render PostgreSQL (Recommended)

1. In Render dashboard, create a new PostgreSQL database
2. Copy the Internal Database URL
3. Add it to your backend service environment variables as `DATABASE_URL`

### Option 2: External Database

Use any PostgreSQL provider (Supabase, Neon, AWS RDS, etc.) and add the connection string to `DATABASE_URL`.

## 🔄 Deployment Workflow

### Frontend (Vercel)

Vercel automatically deploys on git push:

```bash
# Make changes
git add .
git commit -m "Update frontend"
git push origin main

# Vercel will automatically deploy
```

**Manual Deploy:**
1. Go to Vercel dashboard
2. Select your project
3. Click "Deployments" → "Redeploy"

### Backend (Render)

Render can auto-deploy from Git or manual:

**Auto-deploy from Git:**
- Connect your GitHub repo in Render
- Render will deploy on push to main branch

**Manual Deploy:**
1. Go to Render dashboard
2. Select your service
3. Click "Manual Deploy" → "Deploy latest commit"

### ML Service (Render)

Same as backend - auto-deploy from Git or manual deploy.

## ✅ Verification Checklist

After deployment, verify:

- [ ] Frontend loads at https://scrummate-ai-2t6u.vercel.app
- [ ] Frontend environment variable `NEXT_PUBLIC_API_URL` is set
- [ ] Backend is accessible at https://scrummate-ai-21yl.onrender.com
- [ ] Backend environment variables are set (especially `ML_API_URL` and `DATABASE_URL`)
- [ ] ML service is accessible at https://scrummate-ai-2.onrender.com
- [ ] Backend CORS allows Vercel domain
- [ ] Database is connected and accessible
- [ ] Dashboard loads and shows data (or mock data if integrations not configured)

## 🧪 Testing Production

### Test Frontend
```bash
curl https://scrummate-ai-2t6u.vercel.app
```

### Test Backend
```bash
curl https://scrummate-ai-21yl.onrender.com/sprint/health
```

### Test ML Service
```bash
curl -X POST https://scrummate-ai-2.onrender.com/predict \
  -H "Content-Type: application/json" \
  -d '{"spilloverRate": 30, "prReviewDelay": 50, "codeChurn": 40, "bugReopenRate": 20}'
```

## 🔍 Troubleshooting

### Frontend can't connect to backend

**Check:**
1. `NEXT_PUBLIC_API_URL` is set correctly in Vercel
2. Backend URL is correct (no trailing slash)
3. Backend is running and accessible
4. CORS is configured correctly

**Fix:**
- Update `NEXT_PUBLIC_API_URL` in Vercel
- Redeploy frontend

### Backend can't connect to ML service

**Check:**
1. `ML_API_URL` is set in Render backend environment
2. ML service URL is correct
3. ML service is running

**Fix:**
- Update `ML_API_URL` in Render backend environment
- Restart backend service

### Database connection errors

**Check:**
1. `DATABASE_URL` is set correctly
2. Database is accessible from Render
3. Database credentials are correct

**Fix:**
- Verify `DATABASE_URL` format
- Check database firewall/network settings
- Ensure database allows connections from Render IPs

### CORS errors

**Check:**
1. Backend CORS includes your frontend domain
2. No trailing slashes in URLs

**Fix:**
- Update `backend/src/main.ts` CORS settings
- Redeploy backend

## 📝 Environment Variables Reference

### Frontend (Vercel)
| Variable | Value | Required |
|----------|-------|----------|
| `NEXT_PUBLIC_API_URL` | `https://scrummate-ai-21yl.onrender.com` | ✅ Yes |

### Backend (Render)
| Variable | Value | Required |
|----------|-------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ Yes |
| `ML_API_URL` | `https://scrummate-ai-2.onrender.com` | ✅ Yes |
| `PORT` | `10000` (or Render default) | ✅ Yes |
| `JIRA_BASE_URL` | Your Jira URL | ❌ Optional |
| `JIRA_EMAIL` | Your Jira email | ❌ Optional |
| `JIRA_API_TOKEN` | Your Jira token | ❌ Optional |
| `GITHUB_TOKEN` | Your GitHub token | ❌ Optional |
| `GITHUB_OWNER` | Your GitHub org/username | ❌ Optional |
| `GITHUB_REPO` | Your repository name | ❌ Optional |

### ML Service (Render)
| Variable | Value | Required |
|----------|-------|----------|
| (Usually none needed) | - | - |

## 🔐 Security Notes

1. **Never commit `.env` files** - They're in `.gitignore`
2. **Use environment variables** - Don't hardcode secrets
3. **Rotate tokens regularly** - Especially API tokens
4. **Use Render/Vercel secrets** - They're encrypted
5. **Limit CORS origins** - Only allow your domains

## 📚 Additional Resources

- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **NestJS Deployment:** https://docs.nestjs.com/deployment

## 🎉 Success!

Your application is now live in production! 

- **Frontend:** https://scrummate-ai-2t6u.vercel.app
- **Dashboard:** https://scrummate-ai-2t6u.vercel.app/dashboard

Monitor your deployments and logs in:
- Vercel: https://vercel.com/omsinghbais-projects/scrummate-ai-2t6u
- Render: https://dashboard.render.com

---

**Need help?** Check the logs in Vercel and Render dashboards for specific errors.

