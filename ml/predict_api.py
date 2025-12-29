from fastapi import FastAPI
import joblib
import numpy as np

app = FastAPI()

# Load trained model
model = joblib.load("sprint_risk_model.pkl")

FEATURE_NAMES = [
    "spilloverRate",
    "prReviewDelay",
    "codeChurn",
    "bugReopenRate"
]

@app.post("/predict")
def predict_risk(data: dict):
    features = np.array([[
        data["spilloverRate"],
        data["prReviewDelay"],
        data["codeChurn"],
        data["bugReopenRate"]
    ]])

    # Prediction
    probability = model.predict_proba(features)[0][1]

    # ✅ Correct feature importance (GAIN-based)
    # XGBoost uses internal feature names (f0, f1, f2, f3) instead of actual names
    booster = model.get_booster()
    score = booster.get_score(importance_type="gain")

    explanation = []
    for i, feature_name in enumerate(FEATURE_NAMES):
        # Try both XGBoost internal name (f0, f1, etc.) and actual feature name
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
        # If no importance data, distribute equally (fallback)
        for x in explanation:
            x["importance"] = round(100.0 / len(explanation), 2)

    return {
        "failure_probability": round(float(probability) * 100, 2),
        "explanation": explanation
    }
