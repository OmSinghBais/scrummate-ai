"""
Generate enhanced training data for sprint risk prediction model.
This script creates synthetic but realistic sprint data for training.
"""
import pandas as pd
import numpy as np
import random

np.random.seed(42)
random.seed(42)

def generate_sprint_data(n_samples=1000):
    """Generate realistic sprint metrics data"""
    data = []
    
    for i in range(n_samples):
        # Generate correlated features
        # High spillover often correlates with high PR delay
        base_risk = np.random.uniform(0, 1)
        
        # Spillover rate (0-100%)
        spillover_rate = np.random.beta(2, 5) * 100
        if base_risk > 0.6:
            spillover_rate = min(100, spillover_rate + np.random.uniform(10, 40))
        
        # PR Review Delay (hours)
        pr_review_delay = np.random.gamma(2, 12)
        if spillover_rate > 50:
            pr_review_delay += np.random.uniform(10, 30)
        
        # Code Churn (0-100%)
        code_churn = np.random.beta(2, 4) * 100
        if base_risk > 0.5:
            code_churn = min(100, code_churn + np.random.uniform(5, 25))
        
        # Bug Reopen Rate (0-100%)
        bug_reopen_rate = np.random.beta(2, 6) * 100
        if code_churn > 40:
            bug_reopen_rate = min(100, bug_reopen_rate + np.random.uniform(5, 20))
        
        # Determine failure based on thresholds
        # Sprint fails if multiple risk factors are high
        risk_factors = [
            spillover_rate > 40,
            pr_review_delay > 48,
            code_churn > 50,
            bug_reopen_rate > 30
        ]
        
        # More risk factors = higher chance of failure
        risk_count = sum(risk_factors)
        if risk_count >= 3:
            failed = 1
        elif risk_count == 2:
            failed = 1 if np.random.random() > 0.3 else 0
        elif risk_count == 1:
            failed = 1 if np.random.random() > 0.7 else 0
        else:
            failed = 1 if np.random.random() > 0.95 else 0
        
        data.append({
            'spilloverRate': round(spillover_rate, 2),
            'prReviewDelay': round(pr_review_delay, 2),
            'codeChurn': round(code_churn, 2),
            'bugReopenRate': round(bug_reopen_rate, 2),
            'failed': failed
        })
    
    return pd.DataFrame(data)

if __name__ == "__main__":
    print("🔄 Generating enhanced training data...")
    
    # Generate larger dataset
    df = generate_sprint_data(n_samples=2000)
    
    # Save to CSV
    df.to_csv("sprint_data.csv", index=False)
    
    print(f"✅ Generated {len(df)} samples")
    print(f"📊 Class distribution:")
    print(df['failed'].value_counts())
    print(f"\n📈 Statistics:")
    print(df.describe())
    print("\n💾 Saved to sprint_data.csv")

