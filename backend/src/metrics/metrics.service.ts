import { Injectable, Logger } from '@nestjs/common';
import { JiraService } from '../integrations/jira.service';
import { GitHubService } from '../integrations/github.service';

@Injectable()
export class MetricsService {
  private readonly logger = new Logger(MetricsService.name);

  constructor(
    private readonly jiraService: JiraService,
    private readonly githubService: GitHubService,
  ) {}

  async getSprintMetrics(): Promise<{
    spilloverRate: number;
    prReviewDelay: number;
    codeChurn: number;
    bugReopenRate: number;
  }> {
    let spilloverRate = 35;
    let bugReopenRate = 45;
    let prReviewDelay = 75;
    let codeChurn = 80;

    // Try to fetch real data from Jira
    if (this.jiraService.isConfigured()) {
      try {
        const activeSprint = await this.jiraService.getActiveSprint();
        if (activeSprint) {
          spilloverRate = await this.jiraService.calculateSpilloverRate(activeSprint.id);
          bugReopenRate = await this.jiraService.calculateBugReopenRate(activeSprint.id);
          this.logger.log(`Fetched Jira metrics: spillover=${spilloverRate}%, bugReopen=${bugReopenRate}%`);
        }
      } catch (error) {
        this.logger.warn('Failed to fetch Jira metrics, using fallback', error?.message);
      }
    } else {
      this.logger.log('Jira not configured, using mock data');
    }

    // Try to fetch real data from GitHub
    if (this.githubService.isConfigured()) {
      try {
        prReviewDelay = await this.githubService.calculatePRReviewDelay();
        codeChurn = await this.githubService.calculateCodeChurn();
        this.logger.log(`Fetched GitHub metrics: prDelay=${prReviewDelay}h, churn=${codeChurn}%`);
      } catch (error) {
        this.logger.warn('Failed to fetch GitHub metrics, using fallback', error?.message);
      }
    } else {
      this.logger.log('GitHub not configured, using mock data');
    }

    return {
      spilloverRate,
      prReviewDelay,
      codeChurn,
      bugReopenRate,
    };
  }
}
