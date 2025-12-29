# Environment Variables Setup Guide

This guide will help you set up the environment variables for ScrumMate AI.

## 📋 Quick Setup

### 1. Backend Environment Variables

The backend `.env` file has been created at `backend/.env`. You need to update it with your actual values.

#### Required Variables:

**Database (Required):**
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/scrummate_ai
```
- Replace `postgres` with your PostgreSQL username
- Replace `password` with your PostgreSQL password
- Replace `scrummate_ai` with your database name (or create it first)

**ML Service (Required):**
```env
ML_API_URL=http://localhost:8000
```
- This should match where your ML service runs (default: port 8000)

#### Optional Variables (for real data):

**Jira Integration:**
1. Go to https://id.atlassian.com/manage-profile/security/api-tokens
2. Click "Create API token"
3. Copy the token
4. Update these in `backend/.env`:
```env
JIRA_BASE_URL=https://your-domain.atlassian.net
JIRA_EMAIL=your-email@example.com
JIRA_API_TOKEN=your-jira-api-token
```

**GitHub Integration:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Select the `repo` scope
4. Copy the token
5. Update these in `backend/.env`:
```env
GITHUB_TOKEN=your-github-personal-access-token
GITHUB_OWNER=your-organization
GITHUB_REPO=your-repository
```

**Note:** If you don't configure Jira/GitHub, the system will automatically use mock data for testing.

### 2. Frontend Environment Variables

The frontend `.env.local` file has been created at `frontend/.env.local`.

**Required:**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```
- This should match your backend URL and port
- Default backend port is 3001 (or 4000 if PORT is not set)

## 🗄️ Database Setup

### Option 1: Local PostgreSQL

1. **Install PostgreSQL** (if not already installed):
   - macOS: `brew install postgresql@14`
   - Linux: `sudo apt-get install postgresql`
   - Windows: Download from https://www.postgresql.org/download/

2. **Start PostgreSQL:**
   ```bash
   # macOS
   brew services start postgresql@14
   
   # Linux
   sudo systemctl start postgresql
   ```

3. **Create the database:**
   ```bash
   createdb scrummate_ai
   # Or using psql:
   psql -U postgres
   CREATE DATABASE scrummate_ai;
   \q
   ```

4. **Update DATABASE_URL** in `backend/.env` with your credentials

### Option 2: Cloud Database (e.g., Supabase, Neon, Railway)

1. Create a PostgreSQL database on your preferred platform
2. Copy the connection string
3. Update `DATABASE_URL` in `backend/.env`

## ✅ Verification

### Test Backend Configuration:

1. **Check if .env file exists:**
   ```bash
   cd backend
   ls -la .env
   ```

2. **Verify environment variables are loaded:**
   ```bash
   cd backend
   npm run start:dev
   ```
   - Look for log messages indicating if Jira/GitHub are configured
   - If you see warnings about missing credentials, that's normal if you're using mock data

### Test Frontend Configuration:

1. **Check if .env.local exists:**
   ```bash
   cd frontend
   ls -la .env.local
   ```

2. **Start the frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   - Open http://localhost:3000
   - Check browser console for any API connection errors

## 🔍 Troubleshooting

### Backend can't connect to database:
- Verify PostgreSQL is running: `pg_isready`
- Check DATABASE_URL format is correct
- Ensure database exists: `psql -l | grep scrummate_ai`

### Frontend can't connect to backend:
- Verify backend is running on the port specified in NEXT_PUBLIC_API_URL
- Check CORS settings in `backend/src/main.ts`
- Verify NEXT_PUBLIC_API_URL matches your backend URL

### Jira/GitHub not working:
- Verify credentials are correct
- Check API token permissions
- Look at backend logs for specific error messages
- Remember: Mock data will be used if credentials aren't set (this is normal!)

## 📝 Example .env Files

### backend/.env (Minimal - for testing with mock data):
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/scrummate_ai
ML_API_URL=http://localhost:8000
PORT=3001
```

### frontend/.env.local (Minimal):
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🚀 Next Steps

Once environment variables are set up:

1. **Start the ML service:**
   ```bash
   cd ml
   source venv/bin/activate
   uvicorn predict_api:app --reload --port 8000
   ```

2. **Start the backend:**
   ```bash
   cd backend
   npm run start:dev
   ```

3. **Start the frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

4. **Open the dashboard:**
   - Navigate to http://localhost:3000/dashboard
   - You should see the dashboard with data (mock or real, depending on your configuration)

---

**Need help?** Check the main README.md or open an issue on GitHub.

