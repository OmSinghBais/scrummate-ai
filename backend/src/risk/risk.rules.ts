export function calculateRiskScore(metrics: any): number {
  const {
    spilloverRate,
    prReviewDelay,
    codeChurn,
    bugReopenRate,
  } = metrics;

  return (
    spilloverRate * 0.3 +
    prReviewDelay * 0.25 +
    codeChurn * 0.25 +
    bugReopenRate * 0.2
  );
}

export function getRiskZone(score: number): string {
  if (score < 30) return 'GREEN';
  if (score < 50) return 'YELLOW';
  if (score < 70) return 'ORANGE';
  return 'RED';
}
