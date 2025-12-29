# ✅ Environment Setup - Next Steps

Your environment files have been set up! Here's what you need to do next:

## 📋 Current Status

✅ Template files created:
- `backend/env.template` - Template for backend environment variables
- `frontend/env.template` - Template for frontend environment variables

✅ Setup script created:
- `setup-env.sh` - Automated setup script

✅ Documentation created:
- `SETUP_ENV.md` - Detailed setup guide
- `QUICK_START.md` - Quick reference guide

## 🔧 What You Need to Do

### 1. Create/Update Backend .env File

**If the file doesn't exist yet, run:**
```bash
cd backend
cp env.template .env
```

**Then edit `backend/.env` and update:**

#### Required Settings:
```env
# Update with your PostgreSQL credentials
DATABASE_URL=postgresql://postgres:password@localhost:5432/scrummate_ai

# Usually stays as is (unless ML service runs on different port)
ML_API_URL=http://localhost:8000

# Backend port
PORT=3001
```

#### Optional Settings (for Real Data):

**Jira Integration:**
```env
JIRA_BASE_URL=https://your-domain.atlassian.net
JIRA_EMAIL=your-email@example.com
JIRA_API_TOKEN=your-jira-api-token
```
👉 Get token from: https://id.atlassian.com/manage-profile/security/api-tokens

**GitHub Integration:**
```env
GITHUB_TOKEN=your-github-personal-access-token
GITHUB_OWNER=your-organization
GITHUB_REPO=your-repository
```
👉 Get token from: https://github.com/settings/tokens (needs `repo` scope)

**Note:** If you don't set Jira/GitHub credentials, the system will automatically use mock data (which is fine for testing!).

### 2. Create/Update Frontend .env.local File

**If the file doesn't exist yet, run:**
```bash
cd frontend
cp env.template .env.local
```

**Then edit `frontend/.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```
👉 Update if your backend runs on a different port

## 🗄️ Database Setup

### Create PostgreSQL Database

**Option 1: Using createdb command**
```bash
createdb scrummate_ai
```

**Option 2: Using psql**
```bash
psql -U postgres
CREATE DATABASE scrummate_ai;
\q
```

**Option 3: Using a cloud database**
- Use Supabase, Neon, Railway, or any PostgreSQL provider
- Copy the connection string
- Update `DATABASE_URL` in `backend/.env`

## ✅ Verification Checklist

- [ ] `backend/.env` file exists and has DATABASE_URL set
- [ ] `frontend/.env.local` file exists and has NEXT_PUBLIC_API_URL set
- [ ] PostgreSQL database `scrummate_ai` is created
- [ ] PostgreSQL is running
- [ ] (Optional) Jira credentials added if you want real Jira data
- [ ] (Optional) GitHub credentials added if you want real GitHub data

## 🚀 Test Your Setup

1. **Start ML Service:**
   ```bash
   cd ml
   source venv/bin/activate
   uvicorn predict_api:app --reload --port 8000
   ```

2. **Start Backend:**
   ```bash
   cd backend
   npm run start:dev
   ```
   Look for log messages:
   - ✅ "Jira configured" or ⚠️ "Jira not configured, using mock data"
   - ✅ "GitHub configured" or ⚠️ "GitHub not configured, using mock data"

3. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

4. **Open Dashboard:**
   - Go to http://localhost:3000/dashboard
   - You should see the dashboard with data!

## 🆘 Common Issues

### "Cannot connect to database"
- ✅ Check PostgreSQL is running: `pg_isready`
- ✅ Verify DATABASE_URL format is correct
- ✅ Ensure database exists: `psql -l | grep scrummate_ai`

### "Frontend can't reach backend"
- ✅ Check backend is running on port 3001
- ✅ Verify NEXT_PUBLIC_API_URL in frontend/.env.local
- ✅ Check browser console for errors

### "Using mock data" warnings
- ✅ This is **normal** if Jira/GitHub aren't configured
- ✅ The system works perfectly with mock data for testing
- ✅ Add credentials when you're ready to use real data

## 📚 More Help

- **Quick Reference:** See `QUICK_START.md`
- **Detailed Guide:** See `SETUP_ENV.md`
- **Main README:** See `README.md`

---

**You're all set!** 🎉 Start the services and open the dashboard to see ScrumMate AI in action!

