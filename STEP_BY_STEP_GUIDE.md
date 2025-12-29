# 📖 Step-by-Step Guide: Setting Up Real Data

Follow these steps in order to connect ScrumMate AI to your real Jira and GitHub data.

---

## 🎯 Quick Start (5 minutes)

### Option A: Interactive Script (Easiest)
```bash
./setup-real-data.sh
```
This will guide you through entering your credentials interactively.

### Option B: Manual Setup
Follow the steps below to set up manually.

---

## 📝 Step 1: Prepare Your Credentials

Before you start, you'll need:

### For Jira:
- ✅ Your Jira URL (e.g., `https://your-company.atlassian.net`)
- ✅ Your Jira email address
- ✅ A Jira API token (we'll create this)

### For GitHub:
- ✅ A GitHub Personal Access Token (we'll create this)
- ✅ Your repository owner (username or organization)
- ✅ Your repository name

---

## 🎫 Step 2: Get Jira API Token

### 2.1 Open Jira API Token Page
1. Go to: **https://id.atlassian.com/manage-profile/security/api-tokens**
2. Or navigate: Jira → Your Profile → Security → API tokens

### 2.2 Create Token
1. Click **"Create API token"** button
2. Enter a label: `ScrumMate AI` (or any name you prefer)
3. Click **"Create"**
4. **IMPORTANT:** Copy the token immediately - it looks like: `ATATT3xFfGF0...`
   - ⚠️ You won't be able to see it again!
   - 📋 Save it somewhere safe temporarily

### 2.3 Note Your Jira URL
- Look at your browser when logged into Jira
- It will be something like: `https://your-company.atlassian.net`
- Copy this URL

### 2.4 Note Your Email
- The email you use to log into Jira
- Example: `john.doe@company.com`

**✅ You now have:**
- Jira Base URL: `https://your-company.atlassian.net`
- Jira Email: `your.email@company.com`
- Jira API Token: `ATATT3xFfGF0...`

---

## 🐙 Step 3: Get GitHub Personal Access Token

### 3.1 Open GitHub Token Settings
1. Go to: **https://github.com/settings/tokens**
2. Or navigate: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)

### 3.2 Generate New Token
1. Click **"Generate new token"** → **"Generate new token (classic)"**
2. Enter a note: `ScrumMate AI`
3. Set expiration (recommend 90 days or custom)
4. **Select scopes:**
   - ✅ Check **`repo`** (Full control of private repositories)
     - This automatically includes: `repo:status`, `repo_deployment`, `public_repo`
5. Scroll down and click **"Generate token"**
6. **IMPORTANT:** Copy the token immediately - it starts with `ghp_`
   - ⚠️ You won't be able to see it again!
   - 📋 Save it somewhere safe temporarily

### 3.3 Get Repository Information
1. Go to your GitHub repository
2. Look at the URL: `https://github.com/OWNER/REPO`
   - Example: `https://github.com/facebook/react`
3. **Owner** = `facebook` (or your username/org)
4. **Repository** = `react` (just the repo name, not `facebook/react`)

**✅ You now have:**
- GitHub Token: `ghp_...`
- GitHub Owner: `your-org-or-username`
- GitHub Repo: `your-repo-name`

---

## ⚙️ Step 4: Update Backend .env File

### 4.1 Create/Edit the File
```bash
cd backend
# If .env doesn't exist, copy from template:
cp env.template .env
# Then edit it:
nano .env
# Or use your preferred editor (VS Code, vim, etc.)
```

### 4.2 Add Jira Credentials
Find or add these lines in `backend/.env`:

```env
JIRA_BASE_URL=https://your-company.atlassian.net
JIRA_EMAIL=your.email@company.com
JIRA_API_TOKEN=ATATT3xFfGF0...your-actual-token
```

**Replace with your actual values:**
- `https://your-company.atlassian.net` → Your actual Jira URL
- `your.email@company.com` → Your actual Jira email
- `ATATT3xFfGF0...` → Your actual API token

### 4.3 Add GitHub Credentials
Find or add these lines in `backend/.env`:

```env
GITHUB_TOKEN=ghp_your-actual-token-here
GITHUB_OWNER=your-org-or-username
GITHUB_REPO=your-repo-name
```

**Replace with your actual values:**
- `ghp_...` → Your actual GitHub token
- `your-org-or-username` → Just the owner (e.g., `facebook`)
- `your-repo-name` → Just the repo name (e.g., `react`)

### 4.4 Complete Example
Your `backend/.env` should look something like this:

```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/scrummate_ai

# ML Service
ML_API_URL=http://localhost:8000

# Jira Integration
JIRA_BASE_URL=https://acme-corp.atlassian.net
JIRA_EMAIL=john.doe@acme.com
JIRA_API_TOKEN=ATATT3xFfGF0aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890

# GitHub Integration
GITHUB_TOKEN=ghp_1234567890abcdefghijklmnopqrstuvwxyz
GITHUB_OWNER=acme-corp
GITHUB_REPO=main-product

# Server
PORT=3001
```

**Important:**
- ❌ No quotes around values
- ❌ No spaces around `=`
- ✅ One value per line
- ✅ No trailing spaces

---

## ✅ Step 5: Verify Setup

### 5.1 Test Jira Connection (Optional)
```bash
# Replace with your actual values
curl -u "your.email@company.com:YOUR_API_TOKEN" \
  "https://your-company.atlassian.net/rest/api/3/myself"
```

If successful, you'll see JSON with your user info.

### 5.2 Test GitHub Connection (Optional)
```bash
# Replace with your actual token
curl -H "Authorization: Bearer ghp_YOUR_TOKEN" \
  https://api.github.com/user
```

If successful, you'll see JSON with your user info.

### 5.3 Start Backend
```bash
cd backend
npm run start:dev
```

### 5.4 Check Backend Logs
Look for these messages in the console:

**✅ Success:**
```
[JiraService] Fetched Jira metrics: spillover=25%, bugReopen=15%
[GitHubService] Fetched GitHub metrics: prDelay=12h, churn=35%
```

**❌ Error (if credentials are wrong):**
```
[JiraService] Failed to fetch active sprint from Jira: 401 Unauthorized
[GitHubService] Failed to fetch pull requests from GitHub: Bad credentials
```

### 5.5 Check Dashboard
1. Make sure frontend is running: `cd frontend && npm run dev`
2. Open: http://localhost:3000/dashboard
3. Check the metrics - they should reflect real data from Jira/GitHub

---

## 🔍 Step 6: Troubleshooting

### Jira Not Working?

**"401 Unauthorized"**
- ✅ Double-check your email (must match Jira login)
- ✅ Verify API token is correct (copy-paste, no extra spaces)
- ✅ Try creating a new token

**"No active sprint found"**
- ✅ Make sure you have an active sprint in Jira
- ✅ Check you have access to the board/project
- ✅ Verify sprints are enabled on the board

### GitHub Not Working?

**"Bad credentials"**
- ✅ Check token starts with `ghp_`
- ✅ Verify token has `repo` scope
- ✅ Try creating a new token

**"Not found" or "404"**
- ✅ Check `GITHUB_OWNER` is correct (just username/org, not full path)
- ✅ Check `GITHUB_REPO` is correct (just repo name, not full path)
- ✅ Verify you have access to the repository

### Still Seeing Mock Data?

- ✅ Restart backend after changing `.env`
- ✅ Check backend logs for error messages
- ✅ Verify `.env` file is in `backend/` directory
- ✅ Check for typos in variable names (case-sensitive!)

---

## 📊 What to Expect

Once connected, you'll see:

### From Jira:
- **Spillover Rate**: Real percentage based on your active sprint
- **Bug Reopen Rate**: Real percentage from your sprint bugs

### From GitHub:
- **PR Review Delay**: Real average hours from your recent PRs
- **Code Churn**: Real percentage from your recent PRs

The dashboard will update automatically every 30 seconds, or refresh manually to see latest data.

---

## 🎉 Success!

If you see real metrics in the dashboard and no errors in backend logs, you're all set!

**Next steps:**
- Monitor your sprint health in real-time
- Use ML predictions based on your actual data
- Track trends over time

---

**Need help?** See `REAL_DATA_SETUP.md` for detailed troubleshooting.

