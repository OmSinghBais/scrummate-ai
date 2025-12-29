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
      this.logger.warn('GitHub credentials not configured. Using mock data.');
      this.client = null;
    }
  }

  async getRecentPullRequests(days: number = 14): Promise<PullRequest[]> {
    if (!this.client) return [];

    try {
      const since = new Date();
      since.setDate(since.getDate() - days);
      const sinceISO = since.toISOString();

      const response = await this.client.get(
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

      // Fetch additional details for each PR
      const prsWithDetails = await Promise.all(
        prs.map(async (pr: any) => {
          const [reviewsRes, commitsRes] = await Promise.all([
            this.client.get(`/repos/${this.owner}/${this.repo}/pulls/${pr.number}/reviews`),
            this.client.get(`/repos/${this.owner}/${this.repo}/pulls/${pr.number}/commits`),
          ]);

          return {
            number: pr.number,
            created_at: pr.created_at,
            merged_at: pr.merged_at,
            reviews: reviewsRes.data,
            commits: commitsRes.data.length,
            additions: pr.additions || 0,
            deletions: pr.deletions || 0,
          };
        }),
      );

      return prsWithDetails;
    } catch (error) {
      this.logger.error('Failed to fetch pull requests from GitHub', error?.message);
      return [];
    }
  }

  async calculatePRReviewDelay(): Promise<number> {
    if (!this.client) return 0;

    try {
      const prs = await this.getRecentPullRequests(14);
      if (prs.length === 0) return 0;

      const delays: number[] = [];

      for (const pr of prs) {
        if (pr.reviews.length > 0) {
          const firstReview = pr.reviews[0];
          const prCreated = new Date(pr.created_at);
          const firstReviewDate = new Date(firstReview.submitted_at);
          const delayHours = (firstReviewDate.getTime() - prCreated.getTime()) / (1000 * 60 * 60);
          delays.push(delayHours);
        }
      }

      if (delays.length === 0) return 0;

      const avgDelay = delays.reduce((a, b) => a + b, 0) / delays.length;
      return Math.round(avgDelay);
    } catch (error) {
      this.logger.error('Failed to calculate PR review delay', error?.message);
      return 0;
    }
  }

  async calculateCodeChurn(): Promise<number> {
    if (!this.client) return 0;

    try {
      const prs = await this.getRecentPullRequests(14);
      if (prs.length === 0) return 0;

      let totalAdditions = 0;
      let totalDeletions = 0;

      for (const pr of prs) {
        totalAdditions += pr.additions;
        totalDeletions += pr.deletions;
      }

      const totalChanged = totalAdditions + totalDeletions;
      if (totalChanged === 0) return 0;

      // Code churn = (deletions / total changed) * 100
      // High churn means lots of code being rewritten/deleted
      const churnRate = (totalDeletions / totalChanged) * 100;
      return Math.round(churnRate);
    } catch (error) {
      this.logger.error('Failed to calculate code churn', error?.message);
      return 0;
    }
  }

  isConfigured(): boolean {
    return !!(this.token && this.owner && this.repo);
  }
}

