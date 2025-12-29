# 🚀 Quick Start - Environment Setup

## Option 1: Automated Setup (Recommended)

Run the setup script:

```bash
./setup-env.sh
```

This will create `backend/.env` and `frontend/.env.local` from templates.

## Option 2: Manual Setup

### Step 1: Create Backend .env File

```bash
cd backend
cp env.template .env
```

Then edit `.env` and update these values:

**Required:**
- `DATABASE_URL` - Your PostgreSQL connection string
- `ML_API_URL` - Usually `http://localhost:8000`

**Optional (for real data):**
- `JIRA_BASE_URL`, `JIRA_EMAIL`, `JIRA_API_TOKEN` - For Jira integration
- `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO` - For GitHub integration

### Step 2: Create Frontend .env.local File

```bash
cd frontend
cp env.template .env.local
```

Then edit `.env.local` and update:
- `NEXT_PUBLIC_API_URL` - Usually `http://localhost:3001`

## 📝 Minimal Configuration (Mock Data)

If you just want to test with mock data, your `backend/.env` only needs:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/scrummate_ai
ML_API_URL=http://localhost:8000
PORT=3001
```

And `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🔗 Setting Up Real Data Sources

### Jira Setup

1. **Get API Token:**
   - Go to: https://id.atlassian.com/manage-profile/security/api-tokens
   - Click "Create API token"
   - Copy the token

2. **Update backend/.env:**
   ```env
   JIRA_BASE_URL=https://your-company.atlassian.net
   JIRA_EMAIL=your.email@company.com
   JIRA_API_TOKEN=your-token-here
   ```

### GitHub Setup

1. **Get Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select `repo` scope
   - Copy the token

2. **Update backend/.env:**
   ```env
   GITHUB_TOKEN=ghp_your-token-here
   GITHUB_OWNER=your-org-or-username
   GITHUB_REPO=your-repo-name
   ```

## ✅ Verify Setup

1. **Check files exist:**
   ```bash
   ls -la backend/.env
   ls -la frontend/.env.local
   ```

2. **Start services:**
   ```bash
   # Terminal 1: ML Service
   cd ml && source venv/bin/activate && uvicorn predict_api:app --reload --port 8000
   
   # Terminal 2: Backend
   cd backend && npm run start:dev
   
   # Terminal 3: Frontend
   cd frontend && npm run dev
   ```

3. **Open dashboard:**
   - Go to http://localhost:3000/dashboard
   - You should see data (mock or real depending on your config)

## 🆘 Troubleshooting

**"Cannot connect to database"**
- Make sure PostgreSQL is running
- Check DATABASE_URL format
- Create database: `createdb scrummate_ai`

**"Frontend can't reach backend"**
- Verify backend is running on port 3001
- Check NEXT_PUBLIC_API_URL matches backend URL
- Check browser console for CORS errors

**"Using mock data"**
- This is normal if Jira/GitHub aren't configured
- Check backend logs for configuration status

For more details, see `SETUP_ENV.md`.

