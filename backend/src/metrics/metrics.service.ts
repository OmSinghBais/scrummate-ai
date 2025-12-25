import { Injectable } from '@nestjs/common';

@Injectable()
export class MetricsService {
  getSprintMetrics() {
    // Mock data (later replace with Jira/GitHub)
    return {
      spilloverRate: 35,
      prReviewDelay: 75,
      codeChurn: 80,
      bugReopenRate: 45,
    };
  }
}
