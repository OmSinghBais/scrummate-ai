import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

interface PullRequest {
  number: number;
  created_at: string;
  merged_at: string | null;
  reviews: any[];
  commits: number;
  additions: number;
  deletions: number;
}

@Injectable()
export class GitHubService {
  private readonly logger = new Logger(GitHubService.name);

  private readonly token: string;
  private readonly owner: string;
  private readonly repo: string;

  private readonly client: AxiosInstance | null;

  constructor() {
    this.token = process.env.GITHUB_TOKEN || '';
    this.owner = process.env.GITHUB_OWNER || '';
    this.repo = process.env.GITHUB_REPO || '';

    if (this.token && this.owner && this.repo) {
      this.client = axios.create({
        baseURL: 'https://api.github.com',
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
    } else {
      this.logger.warn(
        'GitHub credentials not configured. GitHub metrics will be skipped.',
      );
      this.client = null;
    }
  }

  /**
   * Fetch recent pull requests with reviews & commits
   */
  async getRecentPullRequests(days: number = 14): Promise<PullRequest[]> {
    if (!this.client) return [];

    const client = this.client; // ✅ TS-safe non-null reference

    try {
      const since = new Date();
      since.setDate(since.getDate() - days);

      const response = await client.get(
        `/repos/${this.owner}/${this.repo}/pulls`,
        {
          params: {
            state: 'all',
            sort: 'updated',
            direction: 'desc',
            per_page: 100,
          },
        },
      );

      const prs = response.data.filter(
        (pr: any) => new Date(pr.created_at) >= since,
      );

      const prsWithDetails = await Promise.all(
        prs.map(async (pr: any) => {
          const [reviewsRes, commitsRes] = await Promise.all([
            client.get(
              `/repos/${this.owner}/${this.repo}/pulls/${pr.number}/reviews`,
            ),
            client.get(
              `/repos/${this.owner}/${this.repo}/pulls/${pr.number}/commits`,
            ),
          ]);

          return {
            number: pr.number,
            created_at: pr.created_at,
            merged_at: pr.merged_at,
            reviews: reviewsRes.data || [],
            commits: commitsRes.data?.length || 0,
            additions: pr.additions || 0,
            deletions: pr.deletions || 0,
          };
        }),
      );

      return prsWithDetails;
    } catch (error: any) {
      // Handle 401 (Unauthorized) as a warning, not an error
      if (error.response?.status === 401) {
        this.logger.warn(
          'GitHub authentication failed (401). Token may be invalid or expired. Check GITHUB_TOKEN.',
        );
      } else if (error.response?.status === 404) {
        this.logger.warn(
          'GitHub repository not found (404). Check GITHUB_OWNER and GITHUB_REPO.',
        );
      } else {
        this.logger.error(
          'Failed to fetch pull requests from GitHub',
          error?.message || error,
        );
      }
      return [];
    }
  }

  /**
   * Average PR review delay (hours)
   */
  async calculatePRReviewDelay(): Promise<number> {
    if (!this.client) return 0;

    try {
      const prs = await this.getRecentPullRequests(14);
      if (prs.length === 0) return 0;

      const delays: number[] = [];

      for (const pr of prs) {
        if (pr.reviews.length > 0) {
          const firstReview = pr.reviews[0];
          if (!firstReview?.submitted_at) continue;

          const prCreated = new Date(pr.created_at);
          const reviewDate = new Date(firstReview.submitted_at);

          const delayHours =
            (reviewDate.getTime() - prCreated.getTime()) /
            (1000 * 60 * 60);

          if (delayHours >= 0) delays.push(delayHours);
        }
      }

      if (delays.length === 0) return 0;

      const avgDelay =
        delays.reduce((sum, val) => sum + val, 0) / delays.length;

      return Math.round(avgDelay);
    } catch (error: any) {
      // Don't log as error if it's an auth issue (already logged in getRecentPullRequests)
      if (error.response?.status !== 401 && error.response?.status !== 404) {
        this.logger.error(
          'Failed to calculate PR review delay',
          error?.message,
        );
      }
      return 0;
    }
  }

  /**
   * Code churn percentage (deletions vs total changes)
   */
  async calculateCodeChurn(): Promise<number> {
    if (!this.client) return 0;

    try {
      const prs = await this.getRecentPullRequests(14);
      if (prs.length === 0) return 0;

      let additions = 0;
      let deletions = 0;

      for (const pr of prs) {
        additions += pr.additions;
        deletions += pr.deletions;
      }

      const totalChanges = additions + deletions;
      if (totalChanges === 0) return 0;

      const churnRate = (deletions / totalChanges) * 100;
      return Math.round(churnRate);
    } catch (error: any) {
      // Don't log as error if it's an auth issue (already logged in getRecentPullRequests)
      if (error.response?.status !== 401 && error.response?.status !== 404) {
        this.logger.error(
          'Failed to calculate code churn',
          error?.message,
        );
      }
      return 0;
    }
  }

  /**
   * Whether GitHub integration is enabled
   */
  isConfigured(): boolean {
    return Boolean(this.token && this.owner && this.repo);
  }
}
