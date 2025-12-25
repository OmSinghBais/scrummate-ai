import { calculateRiskScore, getRiskZone } from './risk.rules';

export function evaluateSprintRisk(metrics: any) {
  const score = Math.round(calculateRiskScore(metrics));
  const zone = getRiskZone(score);

  return {
    score,
    zone,
    insights: generateInsights(metrics),
  };
}

function generateInsights(metrics: any): string[] {
  const insights: string[] = []; // ✅ FIX IS HERE

  if (metrics.prReviewDelay > 60)
    insights.push('PR review delays are unusually high');

  if (metrics.codeChurn > 70)
    insights.push('High code churn detected in sprint');

  if (metrics.bugReopenRate > 40)
    insights.push('Bug reopen rate is above safe threshold');

  if (metrics.spilloverRate > 30)
    insights.push('High story spillover risk');

  return insights;
}
