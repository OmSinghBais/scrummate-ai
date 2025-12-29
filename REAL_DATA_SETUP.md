# 🔗 Real Data Setup Guide - Jira & GitHub

This guide will walk you through setting up real data connections for ScrumMate AI.

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ Access to a Jira instance (cloud or server)
- ✅ A GitHub repository you want to monitor
- ✅ Admin/read permissions for both services

---

## 🎫 Part 1: Jira Setup

### Step 1: Get Your Jira API Token

1. **Go to Atlassian Account Settings:**
   - Visit: https://id.atlassian.com/manage-profile/security/api-tokens
   - Or: Jira → Profile → Security → API tokens

2. **Create API Token:**
   - Click **"Create API token"**
   - Give it a label (e.g., "ScrumMate AI")
   - Click **"Create"**
   - **Copy the token immediately** (you won't see it again!)
   - Example: `ATATT3xFfGF0...` (starts with ATATT)

3. **Get Your Jira Base URL:**
   - Your Jira URL format: `https://your-domain.atlassian.net`
   - Or: `https://your-company.atlassian.com`
   - Check your browser URL when logged into Jira

4. **Get Your Email:**
   - The email you use to log into Jira
   - Example: `your.name@company.com`

### Step 2: Test Jira Connection

You can test your credentials before adding them:

```bash
# Test Jira API access (replace with your values)
curl -u "your-email@company.com:YOUR_API_TOKEN" \
  "https://your-domain.atlassian.net/rest/api/3/myself"
```

If successful, you'll see your user info. If not, check your credentials.

### Step 3: Add to Backend .env

Edit `backend/.env` and add:

```env
JIRA_BASE_URL=https://your-domain.atlassian.net
JIRA_EMAIL=your-email@company.com
JIRA_API_TOKEN=ATATT3xFfGF0...your-token-here
```

**Important:**
- No quotes around values
- No spaces around `=`
- Keep the token secret (never commit to git!)

---

## 🐙 Part 2: GitHub Setup

### Step 1: Create GitHub Personal Access Token

1. **Go to GitHub Settings:**
   - Visit: https://github.com/settings/tokens
   - Or: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Generate New Token:**
   - Click **"Generate new token"** → **"Generate new token (classic)"**
   - Give it a name: `ScrumMate AI`
   - Set expiration (recommend 90 days or custom)
   - **Select scopes:**
     - ✅ `repo` (Full control of private repositories)
       - This includes: `repo:status`, `repo_deployment`, `public_repo`
   - Click **"Generate token"**
   - **Copy the token immediately** (starts with `ghp_`)

3. **Get Repository Information:**
   - **Owner:** Your username or organization name
     - Example: `facebook` or `your-username`
   - **Repository:** The repo name
     - Example: `react` or `my-project`
   - Full format: `owner/repo` (e.g., `facebook/react`)

### Step 2: Test GitHub Connection

Test your token:

```bash
# Test GitHub API access (replace with your token)
curl -H "Authorization: Bearer ghp_YOUR_TOKEN_HERE" \
  https://api.github.com/user
```

If successful, you'll see your user info.

### Step 3: Add to Backend .env

Edit `backend/.env` and add:

```env
GITHUB_TOKEN=ghp_your-token-here
GITHUB_OWNER=your-organization-or-username
GITHUB_REPO=your-repository-name
```

**Important:**
- `GITHUB_OWNER` is just the owner (not `owner/repo`)
- `GITHUB_REPO` is just the repo name (not `owner/repo`)
- Example:
  - For `https://github.com/facebook/react`:
    - `GITHUB_OWNER=facebook`
    - `GITHUB_REPO=react`

---

## ✅ Part 3: Complete Setup

### Step 1: Verify Your .env File

Your `backend/.env` should look like this:

```env
# Database (Required)
DATABASE_URL=postgresql://postgres:password@localhost:5432/scrummate_ai

# ML Service (Required)
ML_API_URL=http://localhost:8000

# Jira Integration
JIRA_BASE_URL=https://your-domain.atlassian.net
JIRA_EMAIL=your-email@company.com
JIRA_API_TOKEN=ATATT3xFfGF0...your-actual-token

# GitHub Integration
GITHUB_TOKEN=ghp_your-actual-token
GITHUB_OWNER=your-org
GITHUB_REPO=your-repo

# Server
PORT=3001
```

### Step 2: Restart Backend

After updating `.env`, restart your backend:

```bash
# Stop the backend (Ctrl+C)
# Then restart:
cd backend
npm run start:dev
```

### Step 3: Check Backend Logs

Look for these messages in your backend console:

✅ **Success messages:**
```
[JiraService] Fetched Jira metrics: spillover=25%, bugReopen=15%
[GitHubService] Fetched GitHub metrics: prDelay=12h, churn=35%
```

⚠️ **Warning messages (if credentials are wrong):**
```
[JiraService] Failed to fetch active sprint from Jira: 401 Unauthorized
[GitHubService] Failed to fetch pull requests from GitHub: Bad credentials
```

### Step 4: Verify in Dashboard

1. Open http://localhost:3000/dashboard
2. Check the metrics:
   - **Spillover Rate** - Should reflect real Jira sprint data
   - **PR Review Delay** - Should reflect real GitHub PR data
   - **Code Churn** - Should reflect real GitHub PR data
   - **Bug Reopen Rate** - Should reflect real Jira bug data

---

## 🔍 Troubleshooting

### Jira Issues

**"401 Unauthorized"**
- ✅ Check your email is correct
- ✅ Verify API token is correct (no extra spaces)
- ✅ Make sure token hasn't expired
- ✅ Try regenerating the token

**"No active sprint found"**
- ✅ Make sure you have an active sprint in Jira
- ✅ Check you have access to the board
- ✅ Verify the board has sprints enabled

**"Cannot fetch issues"**
- ✅ Check you have read permissions for the project
- ✅ Verify the sprint ID is correct

### GitHub Issues

**"Bad credentials"**
- ✅ Check token starts with `ghp_`
- ✅ Verify token has `repo` scope
- ✅ Make sure token hasn't expired
- ✅ Try regenerating the token

**"Not found" or "404"**
- ✅ Check `GITHUB_OWNER` is correct (username or org name)
- ✅ Check `GITHUB_REPO` is correct (just the repo name)
- ✅ Verify you have access to the repository
- ✅ For private repos, ensure token has access

**"No pull requests found"**
- ✅ Check there are PRs in the last 14 days
- ✅ Verify the repository has activity
- ✅ Check you're looking at the right repo

### General Issues

**"Still seeing mock data"**
- ✅ Restart backend after changing `.env`
- ✅ Check backend logs for error messages
- ✅ Verify `.env` file is in `backend/` directory
- ✅ Check for typos in environment variable names

**"Backend won't start"**
- ✅ Check `.env` file syntax (no quotes, no spaces around `=`)
- ✅ Verify all required variables are set
- ✅ Check for special characters in tokens (may need escaping)

---

## 🧪 Testing Your Setup

### Test Jira Connection

```bash
# Replace with your actual values
curl -u "your-email@company.com:YOUR_API_TOKEN" \
  "https://your-domain.atlassian.net/rest/api/3/myself"
```

### Test GitHub Connection

```bash
# Replace with your actual token
curl -H "Authorization: Bearer ghp_YOUR_TOKEN" \
  https://api.github.com/user
```

### Test Backend Endpoint

```bash
# After starting backend
curl http://localhost:3001/sprint/health
```

Check the response - metrics should reflect real data if connections work.

---

## 📊 What Data Gets Fetched

### From Jira:
- **Active Sprint**: Current sprint information
- **Spillover Rate**: % of stories not completed in sprint
- **Bug Reopen Rate**: % of bugs that were reopened

### From GitHub:
- **PR Review Delay**: Average hours for first PR review
- **Code Churn**: % of code deleted/changed in recent PRs

---

## 🔒 Security Best Practices

1. **Never commit `.env` files to git** (already in `.gitignore`)
2. **Rotate tokens regularly** (every 90 days recommended)
3. **Use least privilege** (only grant necessary scopes)
4. **Store tokens securely** (consider using secret management in production)
5. **Monitor token usage** in GitHub/Jira settings

---

## ✅ Success Checklist

- [ ] Jira API token created and copied
- [ ] Jira credentials added to `backend/.env`
- [ ] GitHub personal access token created with `repo` scope
- [ ] GitHub credentials added to `backend/.env`
- [ ] Backend restarted after updating `.env`
- [ ] Backend logs show successful data fetching
- [ ] Dashboard displays real metrics (not mock data)
- [ ] Metrics update when you refresh the dashboard

---

**Need more help?** Check the main `README.md` or open an issue!

