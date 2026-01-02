# 📚 ScrumMate AI - Complete Project Documentation

## 🎯 Project Overview

**ScrumMate AI** is an AI-powered sprint health monitoring and risk prediction platform designed for modern engineering teams. It helps teams identify sprint risks early, predict failures, and make data-driven decisions to improve sprint success rates.

### What Problem Does It Solve?

Traditional sprint management relies on manual tracking and reactive problem-solving. ScrumMate AI provides:
- **Proactive Risk Detection**: Identifies sprint risks before they become critical
- **ML-Powered Predictions**: Uses machine learning to predict sprint failure probability
- **Real-Time Monitoring**: Tracks sprint health metrics continuously
- **Actionable Insights**: Provides specific recommendations to improve sprint outcomes

---

## 🏢 Software Domain Coverage

ScrumMate AI operates in the **Agile/Scrum Project Management** domain, specifically covering:

### 1. **Sprint Management**
- Sprint health monitoring
- Sprint risk assessment
- Sprint comparison and analysis
- Sprint planning and capacity management

### 2. **Team Performance Analytics**
- Team velocity tracking
- Individual contributor metrics
- Performance trends and comparisons
- Team productivity insights

### 3. **Code Quality & Development Metrics**
- Pull Request (PR) review delays
- Code churn analysis
- Bug reopen rates
- Development workflow efficiency

### 4. **Risk Management**
- Predictive risk analysis
- Failure probability estimation
- Risk factor identification
- Mitigation recommendations

### 5. **Integration & Automation**
- Jira integration for sprint data
- GitHub integration for code metrics
- Webhook support for automation
- Real-time notifications

---

## 🚀 Complete Feature List

### **Core Features**

#### 1. **Sprint Health Dashboard** 📊
**Location:** `/dashboard`

**What it does:**
- Displays real-time sprint health score (0-100)
- Shows risk zone classification (GREEN/YELLOW/ORANGE/RED)
- Tracks 4 key metrics:
  - **Spillover Rate**: Percentage of incomplete stories
  - **PR Review Delay**: Average hours for PR reviews
  - **Code Churn**: Percentage of deletions vs additions
  - **Bug Reopen Rate**: Percentage of bugs reopened
- ML-powered failure probability prediction
- Historical trend visualization
- Actionable insights and recommendations

**How to use:**
1. Navigate to Dashboard after logging in
2. View current sprint health score (large display)
3. Check risk zone badge (color-coded)
4. Review 4 metric cards for detailed breakdown
5. Scroll down to see trend chart (last 10 sprints)
6. Read insights panel for recommendations
7. Auto-refreshes every 30 seconds

**Key Metrics Explained:**
- **Spillover Rate < 20%**: Healthy (GREEN)
- **Spillover Rate 20-40%**: At Risk (YELLOW)
- **Spillover Rate > 40%**: High Risk (ORANGE/RED)
- **PR Review Delay < 24h**: Good
- **PR Review Delay > 48h**: Needs attention
- **Code Churn < 30%**: Stable
- **Code Churn > 50%**: High volatility
- **Bug Reopen Rate < 10%**: Good quality
- **Bug Reopen Rate > 20%**: Quality issues

---

#### 2. **Multi-Team Support** 👥
**Location:** Available on all pages via Team Switcher

**What it does:**
- Support for multiple teams in one account
- Team-specific dashboards and data
- Team switching without logging out
- Team member management

**How to use:**
1. Click **Team Switcher** dropdown (top right)
2. Select a team from the list
3. All data (sprints, metrics, analytics) filters to selected team
4. Create new team: Go to Settings → Teams → Create Team
5. Add members: Settings → Teams → Add Members

**Use Cases:**
- Engineering teams working on different products
- Multiple projects with separate sprint cycles
- Department-level tracking (Frontend, Backend, Mobile)
- Client-specific teams

---

#### 3. **Sprint Comparison View** 📈
**Location:** `/sprints/compare`

**What it does:**
- Compare multiple sprints side-by-side
- Identify trends and patterns
- See what improved or declined
- Visual comparison charts

**How to use:**
1. Navigate to "Compare Sprints" from dashboard or menu
2. Select 2-4 sprints to compare
3. View side-by-side comparison:
   - Health scores
   - All 4 metrics
   - Risk zones
   - Timeline visualization
4. Analyze trends (improving/declining/stable)
5. Export comparison report (CSV)

**When to use:**
- Sprint retrospective meetings
- Identifying patterns across sprints
- Understanding velocity changes
- Reporting to stakeholders

---

#### 4. **Detailed Sprint Analytics** 🔍
**Location:** `/sprints/[id]`

**What it does:**
- Deep dive into individual sprint
- Detailed metrics breakdown
- Velocity tracking
- Risk factor analysis
- Recommendations specific to that sprint

**How to use:**
1. Click on any sprint from dashboard "Recent Sprints" section
2. View comprehensive analytics:
   - Sprint health score over time
   - All metrics with historical context
   - Risk factors identified
   - ML prediction details
   - Feature importance scores
3. Review recommendations
4. Export sprint report

**Key Information:**
- Sprint name and duration
- Health score trend
- Metric breakdowns
- ML confidence level
- Top risk factors

---

#### 5. **Sprint Planning Tools** 📋
**Location:** `/planning`

**What it does:**
- Create sprint plans with goals
- Set capacity and story points
- Track dependencies
- Manage sprint backlog

**How to use:**
1. Navigate to Planning page
2. Select a team
3. Create new sprint plan:
   - Enter sprint name
   - Set sprint goal
   - Define capacity (story points)
4. Add user stories:
   - Story title
   - Story points
   - Dependencies (if any)
5. Save plan
6. View all plans for the team
7. Edit or delete plans as needed

**Features:**
- Story point estimation
- Dependency tracking
- Capacity planning
- Sprint goal setting
- Backlog management

---

#### 6. **Team Performance Dashboard** 📊
**Location:** `/performance`

**What it does:**
- Team-level performance metrics
- Individual contributor analytics
- Velocity trends
- Team comparisons

**How to use:**
1. Navigate to Performance page
2. Select a team
3. View performance metrics:
   - Team velocity chart
   - Average health scores
   - Sprint completion rates
   - Team member contributions
4. Compare team performance over time
5. Identify top performers
6. Track improvement trends

**Metrics Tracked:**
- Sprint completion rate
- Average health scores
- Velocity (story points per sprint)
- Team member activity
- Code contribution metrics

---

#### 7. **Notifications System** 🔔
**Location:** Available via notification icon (top right)

**What it does:**
- Real-time sprint risk alerts
- Sprint health change notifications
- Team activity updates
- Customizable notification preferences

**How to use:**
1. Click notification bell icon (top right)
2. View unread notifications
3. Mark as read individually or "Mark all as read"
4. Configure preferences: Settings → Notifications
5. Set notification thresholds:
   - Alert when health score drops below X
   - Alert when risk zone changes
   - Alert on sprint completion

**Notification Types:**
- Sprint health score dropped
- Risk zone changed (GREEN → YELLOW)
- Sprint completed
- High spillover detected
- PR review delays

---

#### 8. **Export Functionality** 📄
**Location:** Dashboard → "Export CSV" button

**What it does:**
- Export sprint data to CSV
- Generate sprint reports
- Export comparison data
- Download analytics

**How to use:**
1. From Dashboard: Click "Export CSV" button
2. CSV file downloads with:
   - All sprint snapshots
   - Health scores
   - All metrics
   - Timestamps
3. From Sprint Detail: Click "Export Report"
4. From Compare: Click "Export Comparison"

**Export Formats:**
- CSV (comma-separated values)
- Includes all sprint data
- Filtered by selected team (if team selected)

---

#### 9. **Settings & Configuration** ⚙️
**Location:** `/settings`

**What it does:**
- User preferences
- Team management
- Integration settings
- Risk threshold configuration
- Notification preferences

**How to use:**

**General Tab:**
- Update profile information
- Change password
- Manage account settings

**Integrations Tab:**
- Configure Jira connection:
  - Jira Base URL
  - Email/API Token
- Configure GitHub connection:
  - GitHub Token
  - Repository owner/repo name
- Test connections

**Notifications Tab:**
- Enable/disable notification types
- Set notification thresholds
- Configure email notifications (if enabled)

**Risk Thresholds Tab:**
- Customize risk zone boundaries:
  - GREEN zone threshold
  - YELLOW zone threshold
  - ORANGE zone threshold
  - RED zone threshold
- Set metric-specific thresholds

---

#### 10. **Webhooks & Integrations** 🔌
**Location:** `/settings/webhooks`

**What it does:**
- Configure webhooks for automation
- Integrate with external tools
- Real-time event notifications
- Custom integrations

**How to use:**
1. Navigate to Settings → Webhooks
2. Create new webhook:
   - Webhook URL
   - Events to subscribe to:
     - Sprint health changed
     - Risk zone changed
     - Sprint completed
     - High risk detected
3. Test webhook
4. View webhook delivery logs
5. Edit or delete webhooks

**Use Cases:**
- Slack notifications
- Microsoft Teams alerts
- Custom dashboards
- Automation workflows
- Third-party integrations

---

#### 11. **Authentication & User Management** 🔐
**Location:** `/login`, `/signup`

**What it does:**
- Secure user authentication
- Multi-user support
- Session management
- Team-based access control

**How to use:**

**Sign Up:**
1. Go to `/signup`
2. Enter:
   - Full Name
   - Email
   - Password (min 6 characters)
   - Confirm Password
3. Click "Sign Up"
4. Auto-redirected to login

**Sign In:**
1. Go to `/login`
2. Enter email and password
3. Click "Sign In"
4. Redirected to dashboard

**Session Management:**
- Sessions persist for 7 days
- Auto-logout on token expiry
- Secure JWT-based authentication

---

#### 12. **Machine Learning Predictions** 🤖
**Location:** Integrated in Dashboard and Sprint Analytics

**What it does:**
- Predicts sprint failure probability
- Provides confidence levels
- Explains feature importance
- Identifies risk factors

**How to use:**
1. View ML prediction on dashboard (top section)
2. See failure probability percentage
3. Check confidence level (0-100%)
4. Review feature importance:
   - Which metrics contribute most to risk
   - Percentage contribution of each metric
5. Use insights to prioritize improvements

**ML Model Details:**
- **Algorithm**: XGBoost Classifier
- **Features**: 
  - Spillover Rate
  - PR Review Delay
  - Code Churn
  - Bug Reopen Rate
  - Interaction terms
  - Composite risk score
- **Output**: Failure probability (0-100%)
- **Confidence**: Based on model certainty

---

## 📖 User Workflows

### **Workflow 1: Daily Sprint Monitoring**

1. **Morning Check:**
   - Log in to ScrumMate AI
   - View dashboard for current sprint health
   - Check risk zone (GREEN = good, YELLOW+ = attention needed)
   - Review 4 key metrics for any anomalies

2. **During Sprint:**
   - Monitor dashboard (auto-refreshes every 30s)
   - Check notifications for alerts
   - Review insights for actionable items
   - Track trend chart for health score direction

3. **End of Day:**
   - Review sprint health score
   - Check if any metrics worsened
   - Read recommendations
   - Plan next day's focus areas

---

### **Workflow 2: Sprint Planning**

1. **Before Sprint Starts:**
   - Go to Planning page
   - Create new sprint plan
   - Set sprint goal
   - Define capacity (story points)
   - Add user stories with points
   - Identify dependencies

2. **During Sprint:**
   - Monitor actual vs planned
   - Adjust capacity if needed
   - Track story completion
   - Update dependencies

3. **Sprint Review:**
   - Compare planned vs actual
   - Review sprint analytics
   - Export sprint report
   - Use insights for next sprint

---

### **Workflow 3: Sprint Retrospective**

1. **Prepare for Retro:**
   - Go to Sprint Comparison page
   - Select last 3-5 sprints
   - Review trends and patterns
   - Export comparison data

2. **During Retro:**
   - Show sprint analytics
   - Discuss risk factors identified
   - Review ML predictions vs actual
   - Use insights for action items

3. **After Retro:**
   - Update risk thresholds if needed
   - Configure notifications for new alerts
   - Plan improvements for next sprint

---

### **Workflow 4: Team Performance Review**

1. **Monthly Review:**
   - Go to Performance page
   - Select team
   - View velocity trends
   - Compare with previous months
   - Identify improvement areas

2. **Individual Reviews:**
   - View team member contributions
   - Track individual metrics
   - Identify top performers
   - Plan skill development

3. **Reporting:**
   - Export performance data
   - Create reports for stakeholders
   - Share insights with team

---

## 🎯 Target Users

### **Primary Users:**
1. **Scrum Masters**
   - Monitor sprint health
   - Identify blockers early
   - Facilitate sprint planning
   - Run retrospectives with data

2. **Engineering Managers**
   - Track team performance
   - Identify improvement areas
   - Make data-driven decisions
   - Report to stakeholders

3. **Team Leads**
   - Monitor sprint progress
   - Identify risks early
   - Coordinate team efforts
   - Improve sprint outcomes

### **Secondary Users:**
- **Product Managers**: Understand development velocity
- **Executives**: High-level sprint health overview
- **Developers**: Personal performance tracking

---

## 🔧 Technical Architecture

### **Frontend:**
- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **State Management**: React Hooks
- **Charts**: Recharts
- **Animations**: Framer Motion

### **Backend:**
- **Framework**: NestJS
- **Database**: PostgreSQL (TypeORM)
- **Authentication**: JWT
- **API**: RESTful
- **Integrations**: Jira, GitHub APIs

### **ML Service:**
- **Framework**: FastAPI (Python)
- **Model**: XGBoost Classifier
- **Features**: 7 engineered features
- **Output**: Failure probability + confidence

---

## 📊 Key Metrics & KPIs

### **Sprint Health Score (0-100)**
- **90-100**: Excellent (GREEN)
- **70-89**: Good (GREEN)
- **50-69**: At Risk (YELLOW)
- **30-49**: High Risk (ORANGE)
- **0-29**: Critical (RED)

### **Risk Zones:**
- **GREEN**: Sprint on track
- **YELLOW**: Monitor closely
- **ORANGE**: Take action
- **RED**: Critical intervention needed

### **ML Prediction:**
- **0-30%**: Low failure risk
- **31-60%**: Moderate risk
- **61-80%**: High risk
- **81-100%**: Very high risk

---

## 🚀 Getting Started

### **For New Users:**

1. **Sign Up:**
   - Go to signup page
   - Create account
   - Verify email (if required)

2. **First Login:**
   - Log in with credentials
   - You'll see empty dashboard
   - Connect integrations (Jira/GitHub)

3. **Set Up Team:**
   - Go to Settings → Teams
   - Create your first team
   - Add team members

4. **Connect Integrations:**
   - Settings → Integrations
   - Configure Jira (if using)
   - Configure GitHub (if using)
   - Test connections

5. **Start Monitoring:**
   - Dashboard will show sprint health
   - Metrics update automatically
   - Review insights and recommendations

---

## 💡 Best Practices

### **Daily Usage:**
- Check dashboard every morning
- Review notifications regularly
- Act on insights promptly
- Monitor trend charts

### **Sprint Planning:**
- Use historical data for capacity planning
- Review previous sprint analytics
- Set realistic goals based on velocity
- Account for dependencies

### **Risk Management:**
- Act on YELLOW zone warnings early
- Don't wait for RED zone
- Use ML predictions to prioritize
- Focus on high-impact metrics

### **Team Management:**
- Review performance monthly
- Share insights with team
- Use data for retrospectives
- Celebrate improvements

---

## 🔗 Integrations

### **Jira Integration:**
- Fetches active sprint data
- Calculates spillover rate
- Tracks bug reopen rate
- Requires: Jira Base URL, Email, API Token

### **GitHub Integration:**
- Tracks PR review delays
- Calculates code churn
- Monitors code quality
- Requires: GitHub Token, Owner, Repository

### **Webhooks:**
- Real-time event notifications
- Custom integrations
- Automation workflows
- Requires: Webhook URL, Event subscriptions

---

## 📈 Success Metrics

### **What to Track:**
- Sprint completion rate
- Average health scores
- Time to identify risks
- Action items completed
- Team velocity trends

### **Improvement Indicators:**
- Increasing health scores
- Decreasing failure rates
- Faster risk detection
- Better sprint outcomes
- Higher team satisfaction

---

## 🆘 Support & Troubleshooting

### **Common Issues:**

1. **No Data Showing:**
   - Check integrations are connected
   - Verify Jira/GitHub credentials
   - Ensure active sprint exists

2. **ML Predictions Unavailable:**
   - Check ML_API_URL is set
   - Verify ML service is running
   - Check backend logs

3. **Notifications Not Working:**
   - Check notification preferences
   - Verify thresholds are set
   - Check browser permissions

### **Getting Help:**
- Check documentation files in project
- Review troubleshooting guides
- Check backend/frontend logs
- Verify environment variables

---

## 🎓 Learning Resources

### **Understanding Metrics:**
- **Spillover Rate**: Stories not completed in sprint
- **PR Review Delay**: Time from PR creation to first review
- **Code Churn**: Deletions vs additions (indicates refactoring/instability)
- **Bug Reopen Rate**: Bugs that were fixed then reopened

### **Interpreting Results:**
- **High Health Score**: Sprint is on track
- **Low Health Score**: Multiple issues detected
- **ML High Confidence**: Prediction is reliable
- **ML Low Confidence**: More data needed

---

## 🔮 Future Enhancements

See `ROADMAP.md` for planned features:
- Real-time WebSocket updates
- Advanced filtering & search
- PDF report generation
- Slack/Teams integration
- Custom dashboards
- AI-powered insights
- Mobile app

---

**Last Updated**: 2025-01-02  
**Version**: 1.0.0  
**Status**: Production Ready

