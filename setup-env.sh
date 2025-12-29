#!/bin/bash

# Setup script for ScrumMate AI environment variables

echo "🚀 Setting up ScrumMate AI environment variables..."
echo ""

# Backend .env
if [ ! -f "backend/.env" ]; then
    echo "📝 Creating backend/.env from template..."
    cp backend/env.template backend/.env
    echo "✅ Created backend/.env"
    echo "⚠️  Please edit backend/.env and update with your actual values:"
    echo "   - DATABASE_URL (required)"
    echo "   - ML_API_URL (required)"
    echo "   - Jira credentials (optional)"
    echo "   - GitHub credentials (optional)"
else
    echo "ℹ️  backend/.env already exists, skipping..."
fi

# Frontend .env.local
if [ ! -f "frontend/.env.local" ]; then
    echo "📝 Creating frontend/.env.local from template..."
    cp frontend/env.template frontend/.env.local
    echo "✅ Created frontend/.env.local"
    echo "⚠️  Please edit frontend/.env.local and update NEXT_PUBLIC_API_URL if needed"
else
    echo "ℹ️  frontend/.env.local already exists, skipping..."
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env with your database and API credentials"
echo "2. Edit frontend/.env.local if your backend runs on a different port"
echo "3. See SETUP_ENV.md for detailed instructions"
echo ""

