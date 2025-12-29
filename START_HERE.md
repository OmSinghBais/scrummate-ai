# 🚀 START HERE - Real Data Setup (macOS)

Welcome! This is your quick-start guide to connect ScrumMate AI to real Jira and GitHub data on macOS.

## ⚡ Quick Setup (Choose One)

### Option 1: Interactive Script (Recommended - 2 minutes)
```bash
# Open Terminal (Cmd+Space, type "Terminal")
cd ~/Desktop/scrummate-ai
./setup-real-data.sh
```
This will ask you questions and set everything up automatically.

### Option 2: Manual Setup (5 minutes)
Follow the step-by-step guide: **`MACOS_SETUP.md`** (macOS-specific) or **`STEP_BY_STEP_GUIDE.md`**

---

## 📋 What You Need

Before starting, gather:

### For Jira:
- [ ] Your Jira URL (e.g., `https://company.atlassian.net`)
- [ ] Your Jira email
- [ ] A Jira API token (we'll help you create this)

### For GitHub:
- [ ] A GitHub Personal Access Token (we'll help you create this)
- [ ] Your repository owner (username or org)
- [ ] Your repository name

---

## 🎯 Quick Steps

### 1️⃣ Get Jira Token
👉 **https://id.atlassian.com/manage-profile/security/api-tokens**
- Click "Create API token"
- Copy it (starts with `ATATT...`)

### 2️⃣ Get GitHub Token
👉 **https://github.com/settings/tokens**
- Click "Generate new token (classic)"
- Select `repo` scope
- Copy it (starts with `ghp_...`)

### 3️⃣ Run Setup Script
```bash
# In Terminal
cd ~/Desktop/scrummate-ai
./setup-real-data.sh
```
Or manually edit `backend/.env` (see `MACOS_SETUP.md`)

### 4️⃣ Restart Backend
```bash
# In Terminal
cd ~/Desktop/scrummate-ai/backend
npm run start:dev
```

### 5️⃣ Check Dashboard
Open Safari/Chrome and go to: **http://localhost:3000/dashboard**

---

## 📚 Detailed Guides

- **`MACOS_SETUP.md`** - Complete macOS-specific walkthrough ⭐ (Start here if on macOS!)
- **`STEP_BY_STEP_GUIDE.md`** - General step-by-step guide
- **`REAL_DATA_SETUP.md`** - Detailed technical guide
- **`QUICK_START.md`** - Quick reference

---

## ✅ Verification

After setup, check backend logs for:
- ✅ `Fetched Jira metrics: spillover=X%, bugReopen=Y%`
- ✅ `Fetched GitHub metrics: prDelay=Xh, churn=Y%`

If you see errors, check `REAL_DATA_SETUP.md` troubleshooting section.

---

## 🆘 Need Help?

1. **macOS users:** Check `MACOS_SETUP.md` for macOS-specific instructions
2. Check `STEP_BY_STEP_GUIDE.md` for detailed instructions
3. Check `REAL_DATA_SETUP.md` for troubleshooting
4. Look at backend logs for specific error messages

## 🍎 macOS-Specific Notes

- **Terminal:** Press `Cmd + Space`, type "Terminal"
- **PostgreSQL:** Install via `brew install postgresql@14` or use Postgres.app
- **Editor:** Use `nano .env` in Terminal, or `code .env` if you have VS Code
- **Multiple Terminals:** Press `Cmd + T` for new tabs

**Ready?** Open Terminal and run `./setup-real-data.sh` to get started! 🚀

