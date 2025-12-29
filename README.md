# 🚀 ScrumMate AI

> AI-Powered Sprint Risk Analysis & Prediction Platform

ScrumMate AI is an intelligent sprint health monitoring system that combines rule-based risk assessment with machine learning to predict sprint failures and provide actionable insights for agile teams.

![ScrumMate AI Dashboard](https://via.placeholder.com/800x400/1e293b/ffffff?text=ScrumMate+AI+Dashboard)

## 🌐 Live Production

- **Frontend:** https://scrummate-ai-2t6u.vercel.app
- **Dashboard:** https://scrummate-ai-2t6u.vercel.app/dashboard
- **Backend API:** https://scrummate-ai-21yl.onrender.com
- **ML Service:** https://scrummate-ai-2.onrender.com

## ✨ Features

- **🤖 ML-Powered Predictions**: XGBoost model predicts sprint failure probability with feature importance analysis
- **📊 Real-Time Metrics**: Track spillover rate, PR review delays, code churn, and bug reopen rates
- **🎯 Risk Assessment**: Multi-zone risk evaluation (GREEN/YELLOW/ORANGE/RED) with actionable insights
- **📈 Trend Analysis**: Historical sprint health tracking with interactive charts
- **🔌 API Integrations**: Connect to Jira and GitHub for real-time data
- **💾 Data Persistence**: PostgreSQL database stores sprint snapshots for historical analysis
- **🎨 Modern UI**: Beautiful, responsive dashboard built with Next.js and Tailwind CSS

## 🏗️ Architecture

```
scrummate-ai/
├── frontend/          # Next.js 14 + React + TypeScript (Deployed on Vercel)
├── backend/           # NestJS + TypeORM + PostgreSQL (Deployed on Render)
└── ml/                # FastAPI + XGBoost + Python (Deployed on Render)
```

### Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Recharts

**Backend:**
- NestJS 11
- TypeORM
- PostgreSQL
- Axios

**ML Service:**
- FastAPI
- XGBoost
- scikit-learn
- NumPy

## 🚀 Quick Start (Local Development)

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- PostgreSQL 12+
- Jira API credentials (optional)
- GitHub Personal Access Token (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd scrummate-ai
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   
   # Configure environment variables
   cp env.template .env
   # Edit .env with your database and API credentials
   ```

3. **Set up the Frontend**
   ```bash
   cd ../frontend
   npm install
   
   # Configure environment variables
   cp env.template .env.local
   # Set NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Set up the ML Service**
   ```bash
   cd ../ml
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   
   # Train the model (if not already trained)
   python train_model.py
   ```

5. **Set up the Database**
   ```bash
   # Create PostgreSQL database
   createdb scrummate_ai
   
   # Run migrations (TypeORM will auto-sync in dev mode)
   cd backend
   npm run start:dev
   ```

### Running the Application

1. **Start the ML Service**
   ```bash
   cd ml
   source venv/bin/activate
   uvicorn predict_api:app --reload --port 8000
   ```

2. **Start the Backend**
   ```bash
   cd backend
   npm run start:dev
   # Runs on http://localhost:3001
   ```

3. **Start the Frontend**
   ```bash
   cd frontend
   npm run dev
   # Runs on http://localhost:3000
   ```

4. **Open your browser**
   - Dashboard: http://localhost:3000/dashboard
   - API Health: http://localhost:3001/sprint/health

## ⚙️ Configuration

### Environment Variables

**Backend (.env)**
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=scrummate_ai

# ML Service
ML_API_URL=http://localhost:8000

# Jira Integration
JIRA_BASE_URL=https://your-domain.atlassian.net
JIRA_EMAIL=your-email@example.com
JIRA_API_TOKEN=your-api-token

# GitHub Integration
GITHUB_TOKEN=your-github-token
GITHUB_OWNER=your-org
GITHUB_REPO=your-repo
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📊 Metrics Explained

- **Spillover Rate**: Percentage of stories that didn't complete in the sprint
- **PR Review Delay**: Average time (in hours) for pull requests to be reviewed
- **Code Churn**: Percentage of code changed after initial commit
- **Bug Reopen Rate**: Percentage of bugs that were reopened after being closed

## 🤖 Machine Learning Model

The ML model uses XGBoost to predict sprint failure probability based on:
- Historical sprint data
- Feature importance analysis
- Real-time metric inputs

Train a new model:
```bash
cd ml
python train_model.py
```

## 🔌 API Endpoints

### Sprint Health
```http
GET /sprint/health
```
Returns current sprint health score, risk zone, metrics, insights, and ML prediction.

### Sprint History
```http
GET /sprint/history
```
Returns historical sprint snapshots with health scores and metrics.

## 🔗 Data Source Integration

### Jira Integration
The backend automatically connects to Jira to fetch:
- **Active Sprint**: Current sprint information
- **Spillover Rate**: Percentage of incomplete stories
- **Bug Reopen Rate**: Percentage of bugs that were reopened

**Setup:**
1. Generate a Jira API token: https://id.atlassian.com/manage-profile/security/api-tokens
2. Set environment variables in `backend/.env`:
   ```env
   JIRA_BASE_URL=https://your-domain.atlassian.net
   JIRA_EMAIL=your-email@example.com
   JIRA_API_TOKEN=your-api-token
   ```

**Note:** If Jira credentials are not configured, the system will use mock data.

### GitHub Integration
The backend automatically connects to GitHub to fetch:
- **PR Review Delay**: Average time for pull requests to be reviewed
- **Code Churn**: Percentage of code changed/deleted in recent PRs

**Setup:**
1. Generate a GitHub Personal Access Token with `repo` scope
2. Set environment variables in `backend/.env`:
   ```env
   GITHUB_TOKEN=your-github-token
   GITHUB_OWNER=your-organization
   GITHUB_REPO=your-repository
   ```

**Note:** If GitHub credentials are not configured, the system will use mock data.

## 🚀 Production Deployment

See `DEPLOYMENT.md` for complete production deployment guide.

**Quick Setup:**
1. **Frontend (Vercel):** Set `NEXT_PUBLIC_API_URL=https://scrummate-ai-21yl.onrender.com`
2. **Backend (Render):** Set `ML_API_URL=https://scrummate-ai-2.onrender.com` and `DATABASE_URL`
3. **ML Service (Render):** Usually no configuration needed

## 🎨 UI Components

- **Dashboard**: Main overview with health score and risk badge
- **Metric Cards**: Visual representation of key metrics
- **Risk Trend Chart**: Historical sprint health visualization
- **Insights Panel**: Actionable risk insights and recommendations

## 🧪 Development

### Running Tests
```bash
# Backend tests
cd backend
npm run test

# E2E tests
npm run test:e2e
```

### Building for Production
```bash
# Backend
cd backend
npm run build
npm run start:prod

# Frontend
cd frontend
npm run build
npm run start
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for agile teams**

**Live at:** https://scrummate-ai-2t6u.vercel.app
