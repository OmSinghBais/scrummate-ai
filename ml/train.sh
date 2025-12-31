#!/bin/bash

# ML Model Training Script
# This script sets up the environment and trains the enhanced ML model

set -e

echo "🚀 Starting ML Model Training Setup..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Generate training data if needed
if [ ! -f "sprint_data.csv" ] || [ "$1" == "--regenerate" ]; then
    echo "🔄 Generating training data..."
    python3 generate_training_data.py
else
    echo "✅ Using existing sprint_data.csv"
fi

# Train the model
echo "🎯 Training enhanced ML model..."
python3 train_model.py

echo ""
echo "✅ Training complete!"
echo "📊 Model saved as: sprint_risk_model.pkl"
echo "🚀 To start the API: uvicorn predict_api:app --reload --port 8000"

