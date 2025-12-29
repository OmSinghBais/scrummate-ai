# 🍎 macOS Setup Guide - Real Data Configuration

Complete guide for setting up ScrumMate AI with real Jira and GitHub data on macOS.

---

## 🚀 Quick Start (macOS)

### Option 1: Interactive Script (Easiest)
```bash
# Open Terminal (Cmd+Space, type "Terminal")
cd ~/Desktop/scrummate-ai
./setup-real-data.sh
```

### Option 2: Manual Setup
Follow the steps below.

---

## 📋 Prerequisites for macOS

### 1. Install PostgreSQL (if not already installed)

**Using Homebrew (Recommended):**
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install PostgreSQL
brew install postgresql@14

# Start PostgreSQL service
brew services start postgresql@14
```

**Or download from:**
- https://postgresapp.com/ (GUI app, easier for beginners)
- https://www.postgresql.org/download/macosx/

### 2. Create Database

**Using Terminal:**
```bash
# Create database
createdb scrummate_ai

# Or if you need to specify user:
createdb -U postgres scrummate_ai
```

**Using Postgres.app:**
1. Open Postgres.app
2. Click "Initialize" if first time
3. Open Terminal from Postgres.app menu
4. Run: `createdb scrummate_ai`

---

## 🎫 Step 1: Get Jira API Token (macOS)

### 1.1 Open Safari/Chrome
1. Press `Cmd + Space` to open Spotlight
2. Type "Safari" or "Chrome" and press Enter

### 1.2 Navigate to Jira Token Page
1. Go to: **https://id.atlassian.com/manage-profile/security/api-tokens**
2. Or: Jira → Your Profile (top right) → Security → API tokens

### 1.3 Create Token
1. Click **"Create API token"**
2. Label: `ScrumMate AI`
3. Click **"Create"**
4. **Copy token immediately** (starts with `ATATT...`)
   - `Cmd + C` to copy
   - Save it in Notes app temporarily

### 1.4 Get Your Jira URL
- Look at your browser URL when logged into Jira
- Example: `https://your-company.atlassian.net`

### 1.5 Get Your Email
- The email you use to log into Jira

**✅ You now have:**
- Jira URL: `https://your-company.atlassian.net`
- Email: `your.email@company.com`
- Token: `ATATT3xFfGF0...`

---

## 🐙 Step 2: Get GitHub Token (macOS)

### 2.1 Open GitHub in Browser
1. Go to: **https://github.com/settings/tokens**
2. Or: GitHub → Your Profile (top right) → Settings → Developer settings → Personal access tokens → Tokens (classic)

### 2.2 Generate Token
1. Click **"Generate new token"** → **"Generate new token (classic)"**
2. Note: `ScrumMate AI`
3. Expiration: 90 days (or custom)
4. **Select scope:**
   - ✅ Check **`repo`** (Full control of private repositories)
5. Scroll down, click **"Generate token"**
6. **Copy token immediately** (starts with `ghp_...`)
   - `Cmd + C` to copy
   - Save it in Notes app temporarily

### 2.3 Get Repository Info
1. Go to your GitHub repository
2. Look at URL: `https://github.com/OWNER/REPO`
3. Example: `https://github.com/facebook/react`
   - Owner: `facebook`
   - Repo: `react`

**✅ You now have:**
- Token: `ghp_...`
- Owner: `your-org-or-username`
- Repo: `your-repo-name`

---

## ⚙️ Step 3: Update Backend .env (macOS)

### 3.1 Open Terminal
1. Press `Cmd + Space`
2. Type "Terminal" and press Enter

### 3.2 Navigate to Project
```bash
cd ~/Desktop/scrummate-ai/backend
```

### 3.3 Create/Edit .env File

**Option A: Using nano (Terminal editor)**
```bash
# Create from template if doesn't exist
cp env.template .env

# Edit the file
nano .env
```

**In nano:**
- Use arrow keys to navigate
- Edit the values directly
- Press `Ctrl + O` to save, then Enter
- Press `Ctrl + X` to exit

**Option B: Using VS Code (if installed)**
```bash
code .env
```

**Option C: Using TextEdit (macOS default)**
```bash
open -a TextEdit .env
```

### 3.4 Add Your Credentials

Edit `backend/.env` and update:

```env
# Database (update with your PostgreSQL password)
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/scrummate_ai

# ML Service (usually stays as is)
ML_API_URL=http://localhost:8000

# Jira Integration
JIRA_BASE_URL=https://your-company.atlassian.net
JIRA_EMAIL=your.email@company.com
JIRA_API_TOKEN=ATATT3xFfGF0...your-actual-token

# GitHub Integration
GITHUB_TOKEN=ghp_your-actual-token-here
GITHUB_OWNER=your-org-or-username
GITHUB_REPO=your-repo-name

# Server
PORT=3001
```

**Important for macOS:**
- No quotes around values
- No spaces around `=`
- Use actual values (replace placeholders)

### 3.5 Save and Close
- **nano:** `Ctrl + O`, Enter, `Ctrl + X`
- **VS Code:** `Cmd + S`
- **TextEdit:** `Cmd + S`, then close

---

## ✅ Step 4: Test Connections (macOS)

### 4.1 Test Jira (Optional)

Open Terminal and run:
```bash
# Replace with your actual values
curl -u "your.email@company.com:YOUR_API_TOKEN" \
  "https://your-company.atlassian.net/rest/api/3/myself"
```

**Success:** You'll see JSON with your user info.

### 4.2 Test GitHub (Optional)

```bash
# Replace with your actual token
curl -H "Authorization: Bearer ghp_YOUR_TOKEN" \
  https://api.github.com/user
```

**Success:** You'll see JSON with your user info.

---

## 🚀 Step 5: Start Services (macOS)

### 5.1 Open Multiple Terminal Windows

**Option A: Use Terminal Tabs**
- Press `Cmd + T` to open new tab in Terminal

**Option B: Use iTerm2 (if installed)**
- Better terminal with split panes
- Download: https://iterm2.com/

### 5.2 Terminal 1: ML Service
```bash
cd ~/Desktop/scrummate-ai/ml
source venv/bin/activate
uvicorn predict_api:app --reload --port 8000
```

### 5.3 Terminal 2: Backend
```bash
cd ~/Desktop/scrummate-ai/backend
npm run start:dev
```

**Look for these messages:**
```
✅ [JiraService] Fetched Jira metrics: spillover=25%, bugReopen=15%
✅ [GitHubService] Fetched GitHub metrics: prDelay=12h, churn=35%
```

**Or if using mock data:**
```
⚠️ [JiraService] Jira not configured, using mock data
⚠️ [GitHubService] GitHub not configured, using mock data
```

### 5.4 Terminal 3: Frontend
```bash
cd ~/Desktop/scrummate-ai/frontend
npm run dev
```

### 5.5 Open Dashboard
1. Open Safari/Chrome
2. Go to: **http://localhost:3000/dashboard**
3. You should see real data!

---

## 🔍 macOS-Specific Troubleshooting

### PostgreSQL Issues

**"command not found: createdb"**
```bash
# Add PostgreSQL to PATH
echo 'export PATH="/opt/homebrew/opt/postgresql@14/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Or if using bash:
echo 'export PATH="/opt/homebrew/opt/postgresql@14/bin:$PATH"' >> ~/.bash_profile
source ~/.bash_profile
```

**"PostgreSQL not running"**
```bash
# Check status
brew services list

# Start PostgreSQL
brew services start postgresql@14

# Or if using Postgres.app, just open the app
```

**"Connection refused"**
```bash
# Check if PostgreSQL is listening
lsof -i :5432

# If nothing, start PostgreSQL
brew services start postgresql@14
```

### File Editing Issues

**"Permission denied" when editing .env**
```bash
# Check file permissions
ls -la backend/.env

# Fix permissions if needed
chmod 644 backend/.env
```

**"nano not found"**
- nano comes with macOS by default
- If missing, install via Homebrew: `brew install nano`

### Terminal Issues

**"Command not found: npm"**
```bash
# Install Node.js via Homebrew
brew install node

# Or download from: https://nodejs.org/
```

**"Python venv not found"**
```bash
# Install Python if needed
brew install python3

# Create venv
cd ml
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Network/Connection Issues

**"Cannot connect to localhost:3001"**
```bash
# Check if backend is running
lsof -i :3001

# Check backend logs for errors
```

**"CORS errors in browser"**
- Make sure backend CORS includes `http://localhost:3000`
- Check `backend/src/main.ts` for CORS settings

---

## 🎯 macOS Quick Commands Reference

### Open Files/Folders
```bash
# Open folder in Finder
open ~/Desktop/scrummate-ai

# Open file in default app
open backend/.env

# Open in VS Code
code backend/.env
```

### Check Services
```bash
# Check PostgreSQL
brew services list | grep postgresql

# Check if port is in use
lsof -i :3001  # Backend
lsof -i :3000  # Frontend
lsof -i :8000  # ML Service
```

### Environment Variables
```bash
# Check if .env exists
ls -la backend/.env

# View .env (be careful with sensitive data)
cat backend/.env

# Edit .env
nano backend/.env
```

---

## ✅ Verification Checklist (macOS)

- [ ] PostgreSQL installed and running
- [ ] Database `scrummate_ai` created
- [ ] Jira API token created and copied
- [ ] GitHub token created with `repo` scope
- [ ] `backend/.env` file updated with credentials
- [ ] Backend starts without errors
- [ ] Backend logs show "Fetched Jira metrics" or "using mock data"
- [ ] Backend logs show "Fetched GitHub metrics" or "using mock data"
- [ ] Frontend opens at http://localhost:3000/dashboard
- [ ] Dashboard shows metrics (real or mock)

---

## 🆘 Need Help?

1. **Check backend logs** - Look for error messages
2. **Check browser console** - Press `Cmd + Option + I` in Chrome/Safari
3. **Verify .env file** - Make sure credentials are correct
4. **Test connections** - Use curl commands above
5. **Check PostgreSQL** - `brew services list`

---

## 📚 Additional Resources

- **Homebrew:** https://brew.sh/
- **Postgres.app:** https://postgresapp.com/
- **VS Code:** https://code.visualstudio.com/
- **iTerm2:** https://iterm2.com/ (better terminal)

---

**Ready to start?** Run `./setup-real-data.sh` in Terminal! 🚀

