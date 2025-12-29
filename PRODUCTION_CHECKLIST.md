# ✅ Production Setup Checklist

Use this checklist to verify your production deployment is configured correctly.

## 🌐 Production URLs

- [x] **Frontend:** https://scrummate-ai-2t6u.vercel.app
- [x] **Backend:** https://scrummate-ai-21yl.onrender.com
- [x] **ML Service:** https://scrummate-ai-2.onrender.com

## ⚙️ Frontend (Vercel) Configuration

### Environment Variables
- [ ] Go to: https://vercel.com/omsinghbais-projects/scrummate-ai-2t6u/settings/environment-variables
- [ ] Add: `NEXT_PUBLIC_API_URL` = `https://scrummate-ai-21yl.onrender.com`
- [ ] Select all environments (Production, Preview, Development)
- [ ] Save and redeploy

### Verification
- [ ] Visit https://scrummate-ai-2t6u.vercel.app
- [ ] Visit https://scrummate-ai-2t6u.vercel.app/dashboard
- [ ] Dashboard loads without errors
- [ ] No CORS errors in browser console

## ⚙️ Backend (Render) Configuration

### Environment Variables
- [ ] Go to: https://dashboard.render.com → Your backend service → Environment
- [ ] Add: `DATABASE_URL` = Your PostgreSQL connection string
- [ ] Add: `ML_API_URL` = `https://scrummate-ai-2.onrender.com`
- [ ] Add: `PORT` = `10000` (or Render default)
- [ ] (Optional) Add Jira credentials if using real data
- [ ] (Optional) Add GitHub credentials if using real data
- [ ] Save changes (service will restart)

### Verification
- [ ] Service is running (green status)
- [ ] Test endpoint: `curl https://scrummate-ai-21yl.onrender.com/sprint/health`
- [ ] Returns JSON response with health data
- [ ] Check logs for connection status

## ⚙️ ML Service (Render) Configuration

### Environment Variables
- [ ] Usually no variables needed
- [ ] Service is running (green status)

### Verification
- [ ] Test endpoint: 
  ```bash
  curl -X POST https://scrummate-ai-2.onrender.com/predict \
    -H "Content-Type: application/json" \
    -d '{"spilloverRate": 30, "prReviewDelay": 50, "codeChurn": 40, "bugReopenRate": 20}'
  ```
- [ ] Returns prediction JSON

## 🗄️ Database Configuration

### Setup
- [ ] PostgreSQL database created (Render, Supabase, Neon, etc.)
- [ ] Connection string copied
- [ ] `DATABASE_URL` added to backend environment variables
- [ ] Database allows connections from Render IPs

### Verification
- [ ] Backend logs show successful database connection
- [ ] No database connection errors in logs
- [ ] Can query database (if accessible)

## 🔗 Integration Testing

### Frontend → Backend
- [ ] Frontend can reach backend API
- [ ] No CORS errors
- [ ] Health endpoint returns data

### Backend → ML Service
- [ ] Backend can reach ML service
- [ ] ML predictions work
- [ ] No connection timeouts

### Backend → Database
- [ ] Database connection successful
- [ ] Can save sprint snapshots
- [ ] Can retrieve sprint history

## 🧪 End-to-End Testing

### Dashboard Flow
- [ ] Open https://scrummate-ai-2t6u.vercel.app/dashboard
- [ ] Dashboard loads
- [ ] Health score displays
- [ ] Metrics cards show data
- [ ] Risk badge displays correctly
- [ ] ML prediction shows
- [ ] Chart displays (if history exists)
- [ ] Insights panel shows (if any)

### Data Flow
- [ ] Backend fetches metrics (real or mock)
- [ ] Backend calls ML service
- [ ] ML service returns prediction
- [ ] Backend saves to database
- [ ] Frontend displays all data

## 🔍 Troubleshooting Checklist

If something doesn't work:

### Frontend Issues
- [ ] Check Vercel deployment logs
- [ ] Verify `NEXT_PUBLIC_API_URL` is set
- [ ] Check browser console for errors
- [ ] Verify backend is accessible

### Backend Issues
- [ ] Check Render service logs
- [ ] Verify all environment variables are set
- [ ] Check database connection
- [ ] Verify ML service is accessible
- [ ] Check CORS configuration

### ML Service Issues
- [ ] Check Render service logs
- [ ] Verify model file is accessible
- [ ] Test endpoint directly

### Database Issues
- [ ] Verify `DATABASE_URL` is correct
- [ ] Check database is running
- [ ] Verify network access from Render
- [ ] Check database credentials

## 📊 Monitoring

### Set Up Monitoring
- [ ] Vercel analytics enabled (optional)
- [ ] Render logs accessible
- [ ] Error tracking set up (optional)

### Regular Checks
- [ ] Services are running
- [ ] No error spikes in logs
- [ ] Dashboard loads correctly
- [ ] Data is updating

## 🎉 Success Criteria

Your production deployment is successful when:

- ✅ Frontend loads at https://scrummate-ai-2t6u.vercel.app/dashboard
- ✅ Dashboard displays data (real or mock)
- ✅ All services are running
- ✅ No errors in logs
- ✅ API endpoints respond correctly
- ✅ Database connection works
- ✅ ML predictions work

## 📚 Documentation

- **Full Deployment Guide:** See `DEPLOYMENT.md`
- **Environment Variables:** See `PRODUCTION_ENV.md`
- **Troubleshooting:** See `DEPLOYMENT.md` troubleshooting section

---

**Need help?** Check the logs in Vercel and Render dashboards for specific errors.

