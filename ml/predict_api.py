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
    booster = model.get_booster()
    score = booster.get_score(importance_type="gain")

    explanation = []
    for feature in FEATURE_NAMES:
        explanation.append({
            "feature": feature,
            "importance": float(score.get(feature, 0))
        })

    # Normalize to percentage
    total = sum(x["importance"] for x in explanation) or 1
    for x in explanation:
        x["importance"] = round((x["importance"] / total) * 100, 2)

    return {
        "failure_probability": round(float(probability) * 100, 2),
        "explanation": explanation
    }
