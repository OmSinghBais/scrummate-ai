import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class JiraService {
  private readonly logger = new Logger(JiraService.name);
  private readonly baseUrl: string;
  private readonly email: string;
  private readonly apiToken: string;
  private readonly client: AxiosInstance | null;

  constructor() {
    this.baseUrl = process.env.JIRA_BASE_URL || '';
    this.email = process.env.JIRA_EMAIL || '';
    this.apiToken = process.env.JIRA_API_TOKEN || '';

    if (this.baseUrl && this.email && this.apiToken) {
      const auth = Buffer.from(`${this.email}:${this.apiToken}`).toString('base64');
      this.client = axios.create({
        baseURL: this.baseUrl,
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: 'application/json',
        },
      });
    } else {
      this.logger.warn('Jira credentials not configured. Using mock data.');
      this.client = null;
    }
  }

  async getActiveSprint(): Promise<any> {
    if (!this.client) return null;

    try {
      // Get active sprint board
      const boardsRes = await this.client.get('/rest/agile/1.0/board');
      const boards = boardsRes.data.values;
      if (boards.length === 0) return null;

      const boardId = boards[0].id;

      // Get active sprint
      const sprintsRes = await this.client.get(
        `/rest/agile/1.0/board/${boardId}/sprint`,
        { params: { state: 'active' } },
      );
      const activeSprints = sprintsRes.data.values;
      if (activeSprints.length === 0) return null;

      return activeSprints[0];
    } catch (error) {
      this.logger.error('Failed to fetch active sprint from Jira', error?.message);
      return null;
    }
  }

  async getSprintIssues(sprintId: number): Promise<any[]> {
    if (!this.client || !sprintId) return [];

    try {
      const response = await this.client.get(
        `/rest/agile/1.0/sprint/${sprintId}/issue`,
        {
          params: {
            fields: 'status,summary,issuetype,created,resolutiondate',
            maxResults: 1000,
          },
        },
      );
      return response.data.issues || [];
    } catch (error) {
      this.logger.error('Failed to fetch sprint issues from Jira', error?.message);
      return [];
    }
  }

  async calculateSpilloverRate(sprintId: number): Promise<number> {
    if (!sprintId) return 0;

    try {
      const issues = await this.getSprintIssues(sprintId);
      if (issues.length === 0) return 0;

      const totalStories = issues.filter(
        (issue) => issue.fields.issuetype.name === 'Story' || issue.fields.issuetype.name === 'Task',
      ).length;

      if (totalStories === 0) return 0;

      const incompleteStories = issues.filter(
        (issue) =>
          (issue.fields.issuetype.name === 'Story' || issue.fields.issuetype.name === 'Task') &&
          issue.fields.status.name !== 'Done' &&
          issue.fields.status.name !== 'Closed',
      ).length;

      return Math.round((incompleteStories / totalStories) * 100);
    } catch (error) {
      this.logger.error('Failed to calculate spillover rate', error?.message);
      return 0;
    }
  }

  async calculateBugReopenRate(sprintId: number): Promise<number> {
    if (!sprintId) return 0;

    try {
      const issues = await this.getSprintIssues(sprintId);
      const bugs = issues.filter((issue) => issue.fields.issuetype.name === 'Bug');

      if (bugs.length === 0) return 0;

      // Count bugs that were resolved and then reopened
      // This is a simplified calculation - in reality, you'd check the issue history
      const reopenedBugs = bugs.filter(
        (issue) =>
          issue.fields.status.name === 'Reopened' ||
          (issue.fields.resolutiondate && issue.fields.status.name !== 'Done'),
      ).length;

      return Math.round((reopenedBugs / bugs.length) * 100);
    } catch (error) {
      this.logger.error('Failed to calculate bug reopen rate', error?.message);
      return 0;
    }
  }

  isConfigured(): boolean {
    return !!(this.baseUrl && this.email && this.apiToken);
  }
}

