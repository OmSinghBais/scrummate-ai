import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SprintSnapshot } from '../sprint/sprint.entity';

@Injectable()
export class ExportService {
  constructor(
    @InjectRepository(SprintSnapshot)
    private sprintRepo: Repository<SprintSnapshot>,
  ) {}

  async exportToCSV(teamId?: number): Promise<string> {
    const where = teamId ? { teamId } : {};
    const sprints = await this.sprintRepo.find({ where, order: { createdAt: 'ASC' } });

    const headers = ['Sprint Name', 'Health Score', 'Risk Zone', 'Spillover Rate', 'PR Review Delay', 'Code Churn', 'Bug Reopen Rate', 'ML Prediction', 'Created At'];
    const rows = sprints.map(sprint => [
      sprint.sprintName || '',
      sprint.healthScore.toString(),
      sprint.riskZone,
      (sprint.metrics?.spilloverRate || 0).toString(),
      (sprint.metrics?.prReviewDelay || 0).toString(),
      (sprint.metrics?.codeChurn || 0).toString(),
      (sprint.metrics?.bugReopenRate || 0).toString(),
      sprint.mlPrediction || '',
      sprint.createdAt.toISOString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    return csvContent;
  }

  async getSprintReportData(sprintId: number, teamId?: number): Promise<any> {
    const where: any = { id: sprintId };
    if (teamId) {
      where.teamId = teamId;
    }

    const sprint = await this.sprintRepo.findOne({ where });
    if (!sprint) {
      throw new Error('Sprint not found');
    }

    return {
      sprintName: sprint.sprintName,
      healthScore: sprint.healthScore,
      riskZone: sprint.riskZone,
      metrics: sprint.metrics,
      mlPrediction: sprint.mlPrediction,
      createdAt: sprint.createdAt,
      insights: this.generateReportInsights(sprint),
    };
  }

  private generateReportInsights(sprint: any): string[] {
    const insights: string[] = [];
    const metrics = sprint.metrics || {};

    if (sprint.healthScore >= 70) {
      insights.push('Sprint is in excellent health with strong performance metrics');
    } else if (sprint.healthScore >= 50) {
      insights.push('Sprint shows moderate health with room for improvement');
    } else {
      insights.push('Sprint requires immediate attention to address risk factors');
    }

    if (metrics.spilloverRate > 30) {
      insights.push(`High spillover rate of ${metrics.spilloverRate}% indicates scope management issues`);
    }

    if (metrics.prReviewDelay > 48) {
      insights.push(`PR review delays averaging ${metrics.prReviewDelay} hours suggest bottleneck in code review process`);
    }

    return insights;
  }
}

