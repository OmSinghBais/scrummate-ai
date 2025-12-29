# 🍎 ScrumMate AI - macOS Quick Reference

Quick commands and tips for macOS users.

## 🚀 Getting Started

### Open Terminal
- Press `Cmd + Space` (Spotlight)
- Type "Terminal" and press Enter

### Navigate to Project
```bash
cd ~/Desktop/scrummate-ai
```

## 📝 Setup Commands

### 1. Install PostgreSQL (if needed)
```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install PostgreSQL
brew install postgresql@14

# Start PostgreSQL
brew services start postgresql@14

# Create database
createdb scrummate_ai
```

### 2. Setup Environment Variables
```bash
# Run interactive setup
./setup-real-data.sh

# Or manually
cd backend
cp env.template .env
nano .env  # Edit with your credentials
```

### 3. Start Services

**Terminal Tab 1 - ML Service:**
```bash
cd ~/Desktop/scrummate-ai/ml
source venv/bin/activate
uvicorn predict_api:app --reload --port 8000
```

**Terminal Tab 2 - Backend:**
```bash
cd ~/Desktop/scrummate-ai/backend
npm run start:dev
```

**Terminal Tab 3 - Frontend:**
```bash
cd ~/Desktop/scrummate-ai/frontend
npm run dev
```

**Open Dashboard:**
- Safari/Chrome: http://localhost:3000/dashboard

## 🛠️ Useful macOS Commands

### File Operations
```bash
# Open folder in Finder
open ~/Desktop/scrummate-ai

# Open file in default app
open backend/.env

# Open in VS Code (if installed)
code backend/.env

# Open in TextEdit
open -a TextEdit backend/.env
```

### Check Services
```bash
# Check PostgreSQL status
brew services list | grep postgresql

# Check if ports are in use
lsof -i :3001  # Backend
lsof -i :3000  # Frontend
lsof -i :8000  # ML Service
```

### Terminal Tips
```bash
# New tab: Cmd + T
# Close tab: Cmd + W
# Split pane (iTerm2): Cmd + D (vertical) or Cmd + Shift + D (horizontal)
```

## 🔍 Troubleshooting

### PostgreSQL Not Found
```bash
# Add to PATH
echo 'export PATH="/opt/homebrew/opt/postgresql@14/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### Permission Denied
```bash
# Fix file permissions
chmod 644 backend/.env
```

### Port Already in Use
```bash
# Find what's using the port
lsof -i :3001

# Kill the process (replace PID)
kill -9 PID
```

## 📚 Documentation

- **`MACOS_SETUP.md`** - Complete macOS setup guide ⭐
- **`START_HERE.md`** - Quick start guide
- **`REAL_DATA_SETUP.md`** - Detailed technical guide

## ✅ Quick Checklist

- [ ] PostgreSQL installed and running
- [ ] Database `scrummate_ai` created
- [ ] `backend/.env` configured with credentials
- [ ] All three services running (ML, Backend, Frontend)
- [ ] Dashboard opens at http://localhost:3000/dashboard

---

**Need help?** See `MACOS_SETUP.md` for detailed instructions!

