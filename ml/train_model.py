import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, classification_report
from sklearn.preprocessing import StandardScaler
import joblib
import numpy as np
import warnings
warnings.filterwarnings('ignore')

print("🚀 Loading training data...")
df = pd.read_csv("sprint_data.csv")

# Feature engineering
print("🔧 Engineering features...")
# Add interaction features
df['spillover_pr_delay'] = df['spilloverRate'] * df['prReviewDelay']
df['churn_bug_ratio'] = df['codeChurn'] / (df['bugReopenRate'] + 1)  # +1 to avoid division by zero
df['risk_score'] = (df['spilloverRate'] * 0.3 + 
                    df['prReviewDelay'] * 0.2 + 
                    df['codeChurn'] * 0.3 + 
                    df['bugReopenRate'] * 0.2)

# Prepare features
feature_cols = ['spilloverRate', 'prReviewDelay', 'codeChurn', 'bugReopenRate',
                'spillover_pr_delay', 'churn_bug_ratio', 'risk_score']
X = df[feature_cols]
y = df["failed"]

print(f"📊 Dataset: {len(df)} samples, {len(feature_cols)} features")
print(f"📈 Class distribution: {y.value_counts().to_dict()}")

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print("\n🎯 Training enhanced XGBoost model...")

# Enhanced model with better hyperparameters
model = xgb.XGBClassifier(
    n_estimators=300,  # Increased from 50
    max_depth=6,  # Increased from 3 for more complexity
    learning_rate=0.05,  # Lower learning rate for better convergence
    min_child_weight=3,
    subsample=0.8,
    colsample_bytree=0.8,
    gamma=0.1,
    reg_alpha=0.1,
    reg_lambda=1.0,
    eval_metric="logloss",
    use_label_encoder=False,
    random_state=42,
    n_jobs=-1
)

# Train with early stopping
print("⏳ Training model (this may take a few minutes)...")
model.fit(
    X_train, y_train,
    eval_set=[(X_test, y_test)],
    early_stopping_rounds=20,
    verbose=False
)

# Predictions
print("\n📊 Evaluating model...")
y_pred = model.predict(X_test)
y_pred_proba = model.predict_proba(X_test)[:, 1]

# Metrics
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, zero_division=0)
recall = recall_score(y_test, y_pred, zero_division=0)
f1 = f1_score(y_test, y_pred, zero_division=0)
roc_auc = roc_auc_score(y_test, y_pred_proba)

print(f"\n✅ Model Performance:")
print(f"   Accuracy:  {accuracy:.4f} ({accuracy*100:.2f}%)")
print(f"   Precision: {precision:.4f} ({precision*100:.2f}%)")
print(f"   Recall:    {recall:.4f} ({recall*100:.2f}%)")
print(f"   F1 Score:  {f1:.4f} ({f1*100:.2f}%)")
print(f"   ROC AUC:   {roc_auc:.4f} ({roc_auc*100:.2f}%)")

# Cross-validation
print("\n🔄 Running cross-validation...")
cv_scores = cross_val_score(model, X_train, y_train, cv=5, scoring='roc_auc')
print(f"   CV ROC AUC: {cv_scores.mean():.4f} (+/- {cv_scores.std() * 2:.4f})")

# Feature importance
print("\n📈 Feature Importance:")
feature_importance = pd.DataFrame({
    'feature': feature_cols,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)

for _, row in feature_importance.iterrows():
    print(f"   {row['feature']:25s}: {row['importance']:.4f}")

# Classification report
print("\n📋 Detailed Classification Report:")
print(classification_report(y_test, y_pred, target_names=['Success', 'Failure']))

# Save model
joblib.dump(model, "sprint_risk_model.pkl")
print("\n💾 Model saved as sprint_risk_model.pkl")

# Save feature names for API
import json
with open("feature_names.json", "w") as f:
    json.dump(feature_cols, f)
print("💾 Feature names saved as feature_names.json")

print("\n🎉 Training complete!")
