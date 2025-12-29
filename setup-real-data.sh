#!/bin/bash

# Interactive setup script for real data sources (Jira & GitHub)

echo "🔗 ScrumMate AI - Real Data Setup"
echo "=================================="
echo ""
echo "This script will help you configure Jira and GitHub integrations."
echo ""

# Check if .env exists
if [ ! -f "backend/.env" ]; then
    echo "📝 Creating backend/.env from template..."
    cp backend/env.template backend/.env
    echo "✅ Created backend/.env"
    echo ""
fi

echo "Let's set up your integrations step by step."
echo ""

# Jira Setup
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎫 JIRA SETUP"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
read -p "Do you want to set up Jira integration? (y/n): " setup_jira

if [ "$setup_jira" = "y" ] || [ "$setup_jira" = "Y" ]; then
    echo ""
    echo "Step 1: Get your Jira API token"
    echo "  1. Go to: https://id.atlassian.com/manage-profile/security/api-tokens"
    echo "  2. Click 'Create API token'"
    echo "  3. Copy the token (starts with ATATT...)"
    echo ""
    read -p "Enter your Jira Base URL (e.g., https://your-company.atlassian.net): " jira_url
    read -p "Enter your Jira email: " jira_email
    read -p "Enter your Jira API token: " jira_token
    
    # Update .env file
    if grep -q "JIRA_BASE_URL=" backend/.env; then
        sed -i '' "s|JIRA_BASE_URL=.*|JIRA_BASE_URL=$jira_url|" backend/.env
    else
        echo "JIRA_BASE_URL=$jira_url" >> backend/.env
    fi
    
    if grep -q "JIRA_EMAIL=" backend/.env; then
        sed -i '' "s|JIRA_EMAIL=.*|JIRA_EMAIL=$jira_email|" backend/.env
    else
        echo "JIRA_EMAIL=$jira_email" >> backend/.env
    fi
    
    if grep -q "JIRA_API_TOKEN=" backend/.env; then
        sed -i '' "s|JIRA_API_TOKEN=.*|JIRA_API_TOKEN=$jira_token|" backend/.env
    else
        echo "JIRA_API_TOKEN=$jira_token" >> backend/.env
    fi
    
    echo "✅ Jira credentials added to backend/.env"
    echo ""
else
    echo "⏭️  Skipping Jira setup"
    echo ""
fi

# GitHub Setup
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🐙 GITHUB SETUP"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
read -p "Do you want to set up GitHub integration? (y/n): " setup_github

if [ "$setup_github" = "y" ] || [ "$setup_github" = "Y" ]; then
    echo ""
    echo "Step 1: Get your GitHub Personal Access Token"
    echo "  1. Go to: https://github.com/settings/tokens"
    echo "  2. Click 'Generate new token (classic)'"
    echo "  3. Select 'repo' scope"
    echo "  4. Copy the token (starts with ghp_...)"
    echo ""
    read -p "Enter your GitHub Personal Access Token: " github_token
    read -p "Enter GitHub owner (username or org): " github_owner
    read -p "Enter GitHub repository name: " github_repo
    
    # Update .env file
    if grep -q "GITHUB_TOKEN=" backend/.env; then
        sed -i '' "s|GITHUB_TOKEN=.*|GITHUB_TOKEN=$github_token|" backend/.env
    else
        echo "GITHUB_TOKEN=$github_token" >> backend/.env
    fi
    
    if grep -q "GITHUB_OWNER=" backend/.env; then
        sed -i '' "s|GITHUB_OWNER=.*|GITHUB_OWNER=$github_owner|" backend/.env
    else
        echo "GITHUB_OWNER=$github_owner" >> backend/.env
    fi
    
    if grep -q "GITHUB_REPO=" backend/.env; then
        sed -i '' "s|GITHUB_REPO=.*|GITHUB_REPO=$github_repo|" backend/.env
    else
        echo "GITHUB_REPO=$github_repo" >> backend/.env
    fi
    
    echo "✅ GitHub credentials added to backend/.env"
    echo ""
else
    echo "⏭️  Skipping GitHub setup"
    echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ SETUP COMPLETE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Your credentials have been saved to backend/.env"
echo ""
echo "Next steps (macOS):"
echo "1. Review backend/.env: open backend/.env (or: nano backend/.env)"
echo "2. Make sure PostgreSQL is running: brew services list | grep postgresql"
echo "3. Create database if needed: createdb scrummate_ai"
echo "4. Restart your backend: cd backend && npm run start:dev"
echo "5. Check backend logs for connection status"
echo "6. Open Safari/Chrome: http://localhost:3000/dashboard"
echo ""
echo "📚 For detailed macOS instructions, see MACOS_SETUP.md"
echo "🔧 For troubleshooting, see REAL_DATA_SETUP.md"
echo ""

