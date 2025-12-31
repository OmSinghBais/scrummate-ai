# ML Model Training Guide

## Enhanced ML Model for Sprint Risk Prediction

This directory contains the enhanced ML training pipeline for predicting sprint failures.

## Features

- **Advanced XGBoost Model**: 300 estimators, depth 6, optimized hyperparameters
- **Feature Engineering**: Interaction features, risk scores
- **Comprehensive Evaluation**: Accuracy, Precision, Recall, F1, ROC AUC
- **Cross-Validation**: 5-fold CV for robust performance metrics
- **Early Stopping**: Prevents overfitting
- **Feature Importance**: Detailed analysis of contributing factors

## Setup

1. **Create virtual environment** (recommended):
```bash
cd ml
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install dependencies**:
```bash
pip install -r requirements.txt
```

## Training the Model

### Option 1: Generate New Training Data

```bash
python3 generate_training_data.py
```

This generates 2000 realistic sprint samples with correlated features.

### Option 2: Use Existing Data

If you have `sprint_data.csv` already, skip the generation step.

### Train the Model

```bash
python3 train_model.py
```

This will:
- Load and engineer features
- Train the enhanced XGBoost model
- Evaluate performance with multiple metrics
- Run cross-validation
- Save the trained model (`sprint_risk_model.pkl`)
- Save feature names (`feature_names.json`)

## Running the Prediction API

```bash
uvicorn predict_api:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

### Endpoints

- `GET /` - Health check
- `POST /predict` - Predict sprint failure probability
- `GET /model/info` - Get model information

### Example Prediction Request

```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "spilloverRate": 35,
    "prReviewDelay": 48,
    "codeChurn": 45,
    "bugReopenRate": 25
  }'
```

### Example Response

```json
{
  "failure_probability": 72.5,
  "confidence": "high",
  "explanation": [
    {"feature": "spilloverRate", "importance": 35.2},
    {"feature": "codeChurn", "importance": 28.5},
    {"feature": "prReviewDelay", "importance": 22.1},
    {"feature": "bugReopenRate", "importance": 14.2}
  ]
}
```

## Model Improvements

### Previous Model
- 50 estimators
- Max depth 3
- Learning rate 0.1
- Basic features only

### Enhanced Model
- **300 estimators** (6x more)
- **Max depth 6** (2x deeper)
- **Learning rate 0.05** (better convergence)
- **Feature engineering** (7 features vs 4)
- **Early stopping** (prevents overfitting)
- **Cross-validation** (robust evaluation)
- **Comprehensive metrics** (5 evaluation metrics)

## Expected Performance

With the enhanced model, you should see:
- **Accuracy**: >85%
- **ROC AUC**: >0.90
- **F1 Score**: >0.80
- **Better generalization** on unseen data

## Troubleshooting

### Model file not found
Run `train_model.py` first to generate the model.

### Dependencies missing
Install with: `pip install -r requirements.txt`

### Low accuracy
- Generate more training data: `python3 generate_training_data.py`
- Adjust hyperparameters in `train_model.py`
- Check data quality in `sprint_data.csv`

