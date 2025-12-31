from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
import json

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model
try:
    model = joblib.load("sprint_risk_model.pkl")
    print("✅ Model loaded successfully")
except FileNotFoundError:
    print("❌ Model file not found. Please train the model first.")
    model = None

# Load feature names
try:
    with open("feature_names.json", "r") as f:
        FEATURE_NAMES = json.load(f)
    print(f"✅ Loaded {len(FEATURE_NAMES)} feature names")
except FileNotFoundError:
    # Fallback to original feature names
    FEATURE_NAMES = [
        "spilloverRate",
        "prReviewDelay",
        "codeChurn",
        "bugReopenRate"
    ]
    print("⚠️ Using default feature names")

@app.get("/")
def health():
    return {"status": "ok", "model_loaded": model is not None}

@app.post("/predict")
def predict_risk(data: dict):
    if model is None:
        return {
            "error": "Model not loaded. Please train the model first.",
            "failure_probability": 50.0,
            "explanation": []
        }
    
    try:
        # Extract base features
        spillover_rate = float(data.get("spilloverRate", 0))
        pr_review_delay = float(data.get("prReviewDelay", 0))
        code_churn = float(data.get("codeChurn", 0))
        bug_reopen_rate = float(data.get("bugReopenRate", 0))
        
        # Calculate engineered features
        spillover_pr_delay = spillover_rate * pr_review_delay
        churn_bug_ratio = code_churn / (bug_reopen_rate + 1)
        risk_score = (spillover_rate * 0.3 + 
                     pr_review_delay * 0.2 + 
                     code_churn * 0.3 + 
                     bug_reopen_rate * 0.2)
        
        # Prepare feature array in correct order
        if len(FEATURE_NAMES) == 7:
            features = np.array([[
                spillover_rate,
                pr_review_delay,
                code_churn,
                bug_reopen_rate,
                spillover_pr_delay,
                churn_bug_ratio,
                risk_score
            ]])
        else:
            # Fallback to original 4 features
            features = np.array([[
                spillover_rate,
                pr_review_delay,
                code_churn,
                bug_reopen_rate
            ]])
        
        # Prediction
        probability = model.predict_proba(features)[0][1]
        failure_probability = round(float(probability) * 100, 2)
        
        # Feature importance explanation
        booster = model.get_booster()
        score = booster.get_score(importance_type="gain")
        
        explanation = []
        for i, feature_name in enumerate(FEATURE_NAMES):
            xgb_name = f"f{i}"
            importance = float(score.get(xgb_name, score.get(feature_name, 0)))
            explanation.append({
                "feature": feature_name,
                "importance": importance
            })
        
        # Normalize to percentage
        total = sum(x["importance"] for x in explanation) or 1
        if total > 0:
            for x in explanation:
                x["importance"] = round((x["importance"] / total) * 100, 2)
        else:
            # Fallback: distribute equally
            for x in explanation:
                x["importance"] = round(100.0 / len(explanation), 2)
        
        # Sort by importance
        explanation.sort(key=lambda x: x["importance"], reverse=True)
        
        return {
            "failure_probability": failure_probability,
            "explanation": explanation,
            "confidence": "high" if failure_probability > 70 or failure_probability < 30 else "medium"
        }
        
    except Exception as e:
        return {
            "error": str(e),
            "failure_probability": 50.0,
            "explanation": []
        }

@app.get("/model/info")
def model_info():
    if model is None:
        return {"error": "Model not loaded"}
    
    return {
        "n_estimators": model.n_estimators,
        "max_depth": model.max_depth,
        "learning_rate": model.learning_rate,
        "features": FEATURE_NAMES,
        "feature_count": len(FEATURE_NAMES)
    }
