# 👨‍💻 ScrumMate AI - Guide for Software Development Engineers (SDEs)

## 🎯 Why ScrumMate AI is Valuable for SDEs

As a Software Development Engineer, ScrumMate AI helps you:

### **1. Understand Your Team's Health at a Glance** 📊
- **No more guessing**: See real data about sprint health instead of relying on gut feelings
- **Early warning system**: Know when your sprint is at risk before it's too late
- **Objective metrics**: Remove bias from sprint retrospectives with hard numbers

### **2. Identify Bottlenecks Before They Block You** 🚧
- **PR Review Delays**: See if code reviews are slowing down the team
- **Code Churn**: Understand if you're doing too much rework
- **Spillover**: Know if sprint planning is realistic

### **3. Make Data-Driven Decisions** 📈
- **Sprint Planning**: Use historical data to plan better sprints
- **Process Improvement**: Identify what's working and what's not
- **Team Performance**: Track improvements over time

### **4. Improve Your Development Workflow** ⚡
- **Focus on High-Impact Work**: Use insights to prioritize what matters
- **Reduce Context Switching**: Understand team velocity to plan better
- **Better Code Quality**: Track bug reopen rates and code churn

### **5. Communicate with Stakeholders** 💬
- **Show Progress**: Use dashboards to demonstrate team velocity
- **Explain Delays**: Use data to explain why sprints might be at risk
- **Request Resources**: Use metrics to justify additional team members or tools

---

## 🚀 Step-by-Step Guide: How to Use ScrumMate AI as an SDE

### **Step 1: Sign Up and Log In** 🔐

1. **Go to the Signup Page**
   - Navigate to: `https://scrummate-ai-2t6u.vercel.app/signup`
   - Or click "Sign Up" from the homepage

2. **Create Your Account**
   - Enter your **Full Name** (e.g., "John Doe")
   - Enter your **Email** (e.g., "john.doe@company.com")
   - Create a **Password** (minimum 6 characters)
   - Confirm your password
   - Click **"Sign Up"**

3. **Log In**
   - After signup, you'll be redirected to login
   - Enter your email and password
   - Click **"Sign In"**
   - You'll be taken to the Dashboard

**Time Required**: 2 minutes

---

### **Step 2: Set Up Your Team** 👥

1. **Create Your Team**
   - Click on **Settings** (gear icon) in the top navigation
   - Go to **Teams** tab
   - Click **"Create Team"**
   - Enter team name (e.g., "Frontend Team", "Backend Team", "Mobile Team")
   - Click **"Save"**

2. **Add Team Members** (Optional)
   - In the Teams tab, click on your team
   - Click **"Add Members"**
   - Enter team member emails
   - They'll receive invitations to join

3. **Select Your Team**
   - Click the **Team Switcher** dropdown (top right)
   - Select your team
   - All data will now be filtered to your team

**Time Required**: 5 minutes

---

### **Step 3: Connect Integrations** 🔌

To get real data, connect your team's tools:

#### **A. Connect Jira (For Sprint Data)**

1. **Get Jira API Token**
   - Go to: https://id.atlassian.com/manage-profile/security/api-tokens
   - Click **"Create API token"**
   - Give it a name (e.g., "ScrumMate AI")
   - Copy the token (you'll only see it once!)

2. **Configure in ScrumMate AI**
   - Go to **Settings** → **Integrations** tab
   - Find **Jira Integration** section
   - Enter:
     - **Jira Base URL**: `https://your-company.atlassian.net`
     - **Email**: Your Jira email address
     - **API Token**: Paste the token you copied
   - Click **"Test Connection"**
   - If successful, click **"Save"**

**What This Gives You:**
- Active sprint detection
- Spillover rate (stories not completed)
- Bug reopen rate

#### **B. Connect GitHub (For Code Metrics)**

1. **Get GitHub Personal Access Token**
   - Go to: https://github.com/settings/tokens
   - Click **"Generate new token"** → **"Generate new token (classic)"**
   - Give it a name (e.g., "ScrumMate AI")
   - Select scopes: `repo` (full control of private repositories)
   - Click **"Generate token"**
   - Copy the token (you'll only see it once!)

2. **Configure in ScrumMate AI**
   - Go to **Settings** → **Integrations** tab
   - Find **GitHub Integration** section
   - Enter:
     - **GitHub Token**: Paste your token
     - **Owner**: Your GitHub organization or username
     - **Repository**: Your repository name (e.g., "my-app")
   - Click **"Test Connection"**
   - If successful, click **"Save"**

**What This Gives You:**
- PR review delay tracking
- Code churn analysis
- Development workflow metrics

**Time Required**: 10 minutes

**Note**: If you don't have access to create API tokens, ask your team lead or DevOps team to set this up.

---

### **Step 4: View Your Team's Current Sprint Health** 📊

1. **Navigate to Dashboard**
   - After logging in, you'll be on the Dashboard automatically
   - Or click **"Dashboard"** in the navigation

2. **Understand the Health Score**
   - Look at the **large number** at the top (0-100)
   - **90-100**: Excellent! Sprint is on track ✅
   - **70-89**: Good, but monitor closely 🟢
   - **50-69**: At Risk - take action 🟡
   - **30-49**: High Risk - urgent action needed 🟠
   - **0-29**: Critical - sprint likely to fail 🔴

3. **Check the Risk Zone Badge**
   - Color-coded badge next to health score:
     - **GREEN**: Sprint is healthy
     - **YELLOW**: Monitor closely
     - **ORANGE**: Take action
     - **RED**: Critical intervention needed

4. **Review ML Prediction**
   - See **"Failure Probability"** percentage
   - **0-30%**: Low risk
   - **31-60%**: Moderate risk
   - **61-80%**: High risk
   - **81-100%**: Very high risk

**Time Required**: 1 minute (auto-refreshes every 30 seconds)

---

### **Step 5: Analyze the 4 Key Metrics** 📈

The dashboard shows 4 critical metrics. Here's what each means for you as an SDE:

#### **1. Spillover Rate** 📦
**What it is**: Percentage of stories that didn't complete in the sprint

**How to interpret:**
- **< 20%**: Healthy - most work is completing on time ✅
- **20-40%**: Warning - some stories are spilling over ⚠️
- **> 40%**: Problem - sprint planning might be unrealistic ❌

**What to do:**
- If high: Review sprint planning process
- Check if stories are too large
- Consider breaking down stories
- Review if dependencies are blocking work

#### **2. PR Review Delay** ⏱️
**What it is**: Average time (in hours) for pull requests to be reviewed

**How to interpret:**
- **< 24 hours**: Good - reviews are happening quickly ✅
- **24-48 hours**: Acceptable but could improve 🟡
- **> 48 hours**: Problem - reviews are blocking development ❌

**What to do:**
- If high: Set up PR review SLAs
- Use pair programming for complex changes
- Rotate reviewers to distribute load
- Consider automated code review tools

#### **3. Code Churn** 🔄
**What it is**: Percentage of code deleted vs added (indicates refactoring or instability)

**How to interpret:**
- **< 30%**: Stable - code is being written, not rewritten ✅
- **30-50%**: Moderate churn - some refactoring happening 🟡
- **> 50%**: High churn - lots of rework, possible quality issues ❌

**What to do:**
- If high: Review if requirements are changing mid-sprint
- Check if code quality is low (leading to rewrites)
- Consider more upfront design/planning
- Review if technical debt is causing rework

#### **4. Bug Reopen Rate** 🐛
**What it is**: Percentage of bugs that were fixed then reopened

**How to interpret:**
- **< 10%**: Good - bugs are being fixed properly ✅
- **10-20%**: Moderate - some bugs need more attention 🟡
- **> 20%**: Problem - bugs aren't being fixed correctly ❌

**What to do:**
- If high: Improve bug triage process
- Ensure bugs are fully understood before fixing
- Add more testing before closing bugs
- Review if root cause analysis is happening

**Time Required**: 5 minutes to review all metrics

---

### **Step 6: Review Historical Trends** 📉📈

1. **View the Trend Chart**
   - Scroll down on the Dashboard
   - See the **"Sprint Health Trend"** chart
   - Shows last 10 sprints with health scores

2. **Identify Patterns**
   - **Upward trend** 📈: Team is improving!
   - **Downward trend** 📉: Team performance is declining
   - **Flat line** ➡️: Consistent performance
   - **Volatile** 📊: Inconsistent sprints

3. **Ask Questions**
   - What changed when the trend shifted?
   - Are there seasonal patterns?
   - Did team changes affect performance?
   - What sprints had the best outcomes?

**Time Required**: 2 minutes

---

### **Step 7: Read Actionable Insights** 💡

1. **Scroll to Insights Panel**
   - Below the metrics, find **"Insights"** section
   - Lists specific recommendations based on your data

2. **Act on Insights**
   - Each insight is actionable
   - Examples:
     - "High spillover detected - consider reducing sprint scope"
     - "PR reviews taking >48h - implement review SLAs"
     - "Code churn >50% - review requirements stability"

3. **Prioritize Actions**
   - Focus on insights related to RED/ORANGE risk zones
   - Address root causes, not symptoms
   - Share insights with your team

**Time Required**: 3 minutes

---

### **Step 8: Compare Sprints** 🔍

1. **Navigate to Sprint Comparison**
   - Click **"Compare Sprints"** from dashboard or menu
   - Or go to: `/sprints/compare`

2. **Select Sprints to Compare**
   - Choose 2-4 sprints from the list
   - Select sprints from different time periods
   - Click **"Compare"**

3. **Analyze the Comparison**
   - See side-by-side metrics
   - Identify what improved or declined
   - Look for patterns across sprints

4. **Use for Retrospectives**
   - Export comparison data
   - Share with team during retro
   - Discuss what changed and why

**When to Use:**
- Sprint retrospectives
- Monthly team reviews
- Identifying improvement opportunities
- Reporting to management

**Time Required**: 5 minutes

---

### **Step 9: Deep Dive into Individual Sprint** 🔬

1. **Click on a Sprint**
   - From Dashboard, scroll to **"Recent Sprints"**
   - Click on any sprint name
   - Or go to `/sprints/[id]`

2. **View Detailed Analytics**
   - **Sprint Health Score**: Over time during the sprint
   - **All Metrics**: Detailed breakdown
   - **Risk Factors**: What contributed to risk
   - **ML Prediction**: Detailed explanation
   - **Recommendations**: Sprint-specific actions

3. **Review Feature Importance**
   - See which metrics contributed most to risk
   - Understand what to focus on next sprint
   - Use for sprint planning

**Time Required**: 5 minutes per sprint

---

### **Step 10: Track Team Performance Over Time** 📊

1. **Navigate to Performance Page**
   - Click **"Performance"** in navigation
   - Or go to: `/performance`

2. **Select Your Team**
   - Use team switcher if needed
   - View team-level metrics

3. **Review Performance Metrics**
   - **Team Velocity**: Story points per sprint
   - **Average Health Scores**: Trend over time
   - **Sprint Completion Rate**: % of sprints completed successfully
   - **Team Member Contributions**: Individual activity

4. **Identify Improvement Areas**
   - Compare with previous months
   - Set team goals
   - Track progress

**Time Required**: 5 minutes

---

### **Step 11: Set Up Notifications** 🔔

1. **Configure Notification Preferences**
   - Go to **Settings** → **Notifications** tab
   - Enable notification types:
     - Sprint health score dropped
     - Risk zone changed
     - High spillover detected
     - PR review delays

2. **Set Thresholds**
   - Alert when health score drops below: **70**
   - Alert when risk zone changes: **Yes**
   - Alert on sprint completion: **Yes**

3. **Receive Real-Time Alerts**
   - Click notification bell (top right)
   - View unread notifications
   - Act on alerts promptly

**Time Required**: 3 minutes

---

### **Step 12: Export Data for Reporting** 📄

1. **Export Sprint Data**
   - From Dashboard, click **"Export CSV"**
   - CSV downloads with all sprint data
   - Includes: health scores, metrics, timestamps

2. **Export Sprint Report**
   - From Sprint Detail page, click **"Export Report"**
   - Get detailed sprint analysis

3. **Use for Presentations**
   - Share with stakeholders
   - Use in team meetings
   - Track improvements over time

**Time Required**: 1 minute

---

## 📅 Daily Workflow for SDEs

### **Morning Routine (5 minutes)**
1. Log in to ScrumMate AI
2. Check current sprint health score
3. Review risk zone (GREEN = good, YELLOW+ = attention needed)
4. Check notifications for overnight alerts
5. Review any new insights

### **During Sprint (as needed)**
1. Monitor dashboard (auto-refreshes every 30s)
2. Check if metrics are improving or worsening
3. Review insights for actionable items
4. Share important findings with team

### **End of Day (2 minutes)**
1. Quick check of sprint health
2. Review if any metrics worsened
3. Note any patterns for tomorrow

### **Sprint Planning (15 minutes)**
1. Review previous sprint analytics
2. Check team velocity trends
3. Use historical data to plan capacity
4. Set realistic sprint goals

### **Sprint Retrospective (10 minutes)**
1. Export sprint comparison data
2. Review sprint analytics
3. Discuss insights with team
4. Create action items based on data

---

## 🎯 Key Questions SDEs Should Ask

### **About Sprint Health:**
- Is our sprint on track? (Check health score)
- What's our biggest risk? (Check risk zone and insights)
- Are we improving? (Check trend chart)

### **About Metrics:**
- Are PR reviews blocking us? (Check PR review delay)
- Are we doing too much rework? (Check code churn)
- Are bugs being fixed properly? (Check bug reopen rate)
- Is our sprint planning realistic? (Check spillover rate)

### **About Team Performance:**
- Is our velocity improving? (Check performance dashboard)
- What's our sprint completion rate? (Check performance metrics)
- Are we getting better over time? (Compare sprints)

---

## 💡 Pro Tips for SDEs

### **1. Use Data to Justify Process Changes**
- If PR review delay is high, use data to request review SLAs
- If code churn is high, use data to request more upfront planning
- If spillover is high, use data to request better sprint planning

### **2. Share Insights with Your Team**
- Bring dashboard to sprint planning
- Share trends in retrospectives
- Use data to drive discussions

### **3. Track Improvements**
- Compare sprints monthly
- Celebrate when metrics improve
- Use data to show impact of process changes

### **4. Don't Obsess Over Numbers**
- Metrics are indicators, not absolutes
- Focus on trends, not individual data points
- Use insights to improve, not to blame

### **5. Combine with Your Experience**
- Data + intuition = best decisions
- Use metrics to validate your gut feelings
- Don't ignore red flags in the data

---

## 🚨 Red Flags to Watch For

### **Immediate Action Needed:**
- Health score drops below 50
- Risk zone changes to ORANGE or RED
- ML prediction shows >60% failure probability
- Any metric shows sudden worsening

### **Monitor Closely:**
- Health score between 50-70
- Risk zone is YELLOW
- ML prediction 40-60%
- Metrics trending downward

### **Investigate:**
- Consistent high spillover (>40%)
- PR reviews consistently >48h
- Code churn consistently >50%
- Bug reopen rate consistently >20%

---

## 📊 Example: Identifying Team Performance Issues

### **Scenario: Your team's sprint health is declining**

**Step 1: Check Current Status**
- Health Score: 65 (down from 85 last sprint)
- Risk Zone: YELLOW (was GREEN)
- ML Prediction: 45% failure probability

**Step 2: Review Metrics**
- Spillover Rate: 35% (was 15%) ⚠️
- PR Review Delay: 52 hours (was 24h) ⚠️
- Code Churn: 45% (was 30%) ⚠️
- Bug Reopen Rate: 12% (was 8%) ✅

**Step 3: Analyze Trends**
- Check trend chart: Downward trend over last 3 sprints
- Compare with previous sprints: All metrics worsening

**Step 4: Read Insights**
- "High spillover detected - consider reducing sprint scope"
- "PR reviews taking >48h - implement review SLAs"
- "Code churn >40% - review requirements stability"

**Step 5: Take Action**
- Discuss with team in daily standup
- Review sprint scope - too ambitious?
- Set up PR review rotation
- Check if requirements are changing mid-sprint

**Step 6: Monitor Progress**
- Check dashboard daily
- See if actions are improving metrics
- Adjust as needed

---

## 🎓 Learning Resources

### **Understanding Metrics:**
- **Spillover Rate**: Stories not completed in sprint
- **PR Review Delay**: Time from PR creation to first review
- **Code Churn**: Deletions vs additions (indicates rework)
- **Bug Reopen Rate**: Bugs fixed then reopened

### **Interpreting Results:**
- **High Health Score**: Sprint is on track
- **Low Health Score**: Multiple issues detected
- **ML High Confidence**: Prediction is reliable
- **ML Low Confidence**: More data needed

---

## 🔗 Quick Links

- **Dashboard**: `/dashboard`
- **Sprint Comparison**: `/sprints/compare`
- **Team Performance**: `/performance`
- **Settings**: `/settings`
- **Sprint Planning**: `/planning`

---

## ✅ Checklist: Getting Started as an SDE

- [ ] Sign up and log in
- [ ] Create or join a team
- [ ] Connect Jira integration (if available)
- [ ] Connect GitHub integration (if available)
- [ ] View current sprint health
- [ ] Review all 4 metrics
- [ ] Check historical trends
- [ ] Read actionable insights
- [ ] Set up notifications
- [ ] Export data for first report

**Total Time**: ~45 minutes to fully set up

---

**Remember**: ScrumMate AI is a tool to help you make better decisions, not to replace your judgment. Use the data to inform your decisions, but always combine it with your experience and team knowledge.

**Happy Sprinting! 🚀**

