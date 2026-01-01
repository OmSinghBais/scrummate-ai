import { Injectable, Logger } from '@nestjs/common';
import { MetricsService } from '../metrics/metrics.service';
import { evaluateSprintRisk } from '../risk/risk.engine';
import axios from 'axios';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SprintSnapshot } from './sprint.entity';

@Injectable()
export class SprintService {
  private readonly logger = new Logger(SprintService.name);
  private readonly ML_API_URL = process.env.ML_API_URL;

  constructor(
    private readonly metricsService: MetricsService,
    @InjectRepository(SprintSnapshot)
    private readonly sprintRepo: Repository<SprintSnapshot>,
  ) {}

  async getSprintHealth(teamId?: number) {
    const metrics = await this.metricsService.getSprintMetrics();
    const risk = evaluateSprintRisk(metrics);

    let mlPrediction = 'ML prediction unavailable';
    let mlExplanation: any[] = [];

    if (!this.ML_API_URL) {
      this.logger.warn('ML_API_URL not set');
    } else {
      try {
        const mlRes = await axios.post(
          `${this.ML_API_URL}/predict`,
          metrics,
          { timeout: 5000 },
        );

        mlPrediction = `${mlRes.data.failure_probability}% chance of sprint failure`;
        mlExplanation = mlRes.data.explanation || [];
      } catch (err) {
        this.logger.error('ML service unavailable', err?.message);
      }
    }

    // ✅ Determine sprint number safely (per team if teamId provided)
    const where = teamId ? { teamId } : {};
    const sprintCount = await this.sprintRepo.count({ where });
    const sprintName = `Sprint ${sprintCount + 1}`;

    // ✅ Persist snapshot
    const snapshotData: Partial<SprintSnapshot> = {
      sprintName,
      healthScore: risk.score,
      riskZone: risk.zone,
      metrics,
      mlPrediction,
      mlExplanation,
    };
    
    if (teamId !== undefined) {
      snapshotData.teamId = teamId;
    }
    
    await this.sprintRepo.save(snapshotData);

    return {
      sprintName,
      healthScore: risk.score,
      riskZone: risk.zone,
      metrics,
      insights: risk.insights,
      mlPrediction,
      mlExplanation,
    };
  }

  // ✅ Sorted history (oldest → newest) - optionally filtered by team
  async getHistory(teamId?: number) {
    const where = teamId ? { teamId } : {};
    return this.sprintRepo.find({
      where,
      order: { createdAt: 'ASC' },
    });
  }

  // ✅ Compare multiple sprints
  async compareSprints(sprintIds: number[], teamId?: number) {
    const where: any = { id: In(sprintIds) };
    if (teamId) {
      where.teamId = teamId;
    }

    const sprints = await this.sprintRepo.find({ where });
    
    if (sprints.length === 0) {
      return { sprints: [], comparison: null };
    }

    // Calculate comparison metrics
    const avgHealthScore = sprints.reduce((sum, s) => sum + s.healthScore, 0) / sprints.length;
    const avgSpillover = sprints.reduce((sum, s) => sum + (s.metrics?.spilloverRate || 0), 0) / sprints.length;
    const avgPRDelay = sprints.reduce((sum, s) => sum + (s.metrics?.prReviewDelay || 0), 0) / sprints.length;
    const avgCodeChurn = sprints.reduce((sum, s) => sum + (s.metrics?.codeChurn || 0), 0) / sprints.length;
    const avgBugReopen = sprints.reduce((sum, s) => sum + (s.metrics?.bugReopenRate || 0), 0) / sprints.length;

    return {
      sprints: sprints.map(s => ({
        id: s.id,
        sprintName: s.sprintName,
        healthScore: s.healthScore,
        riskZone: s.riskZone,
        metrics: s.metrics,
        createdAt: s.createdAt,
      })),
      comparison: {
        avgHealthScore: Math.round(avgHealthScore),
        avgSpillover: Math.round(avgSpillover),
        avgPRDelay: Math.round(avgPRDelay),
        avgCodeChurn: Math.round(avgCodeChurn),
        avgBugReopen: Math.round(avgBugReopen),
        trend: sprints.length >= 2 
          ? (sprints[sprints.length - 1].healthScore > sprints[0].healthScore ? 'improving' : 'declining')
          : 'stable',
      },
    };
  }

  // ✅ Get sprint by ID
  async getSprintById(id: number, teamId?: number) {
    const where: any = { id };
    if (teamId) {
      where.teamId = teamId;
    }

    const sprint = await this.sprintRepo.findOne({ where });
    
    if (!sprint) {
      throw new Error('Sprint not found');
    }

    return sprint;
  }

  // ✅ Get sprint analytics (detailed metrics)
  async getSprintAnalytics(id: number, teamId?: number) {
    const sprint = await this.getSprintById(id, teamId);
    const allSprints = await this.getHistory(teamId);

    // Calculate velocity (average health score over last 5 sprints)
    const recentSprints = allSprints.slice(-5);
    const avgVelocity = recentSprints.length > 0
      ? recentSprints.reduce((sum, s) => sum + s.healthScore, 0) / recentSprints.length
      : sprint.healthScore;

    // Calculate trend
    const previousSprint = allSprints.find(s => s.id < id);
    const trend = previousSprint
      ? sprint.healthScore > previousSprint.healthScore ? 'improving' : 'declining'
      : 'stable';

    return {
      sprint,
      analytics: {
        velocity: Math.round(avgVelocity),
        trend,
        metrics: {
          spilloverRate: sprint.metrics?.spilloverRate || 0,
          prReviewDelay: sprint.metrics?.prReviewDelay || 0,
          codeChurn: sprint.metrics?.codeChurn || 0,
          bugReopenRate: sprint.metrics?.bugReopenRate || 0,
        },
        riskFactors: this.analyzeRiskFactors(sprint),
        recommendations: this.generateRecommendations(sprint),
      },
    };
  }

  private analyzeRiskFactors(sprint: any): string[] {
    const factors: string[] = [];
    const metrics = sprint.metrics || {};

    if (metrics.spilloverRate > 30) {
      factors.push('High story spillover rate');
    }
    if (metrics.prReviewDelay > 48) {
      factors.push('PR review delays exceeding 48 hours');
    }
    if (metrics.codeChurn > 50) {
      factors.push('High code churn indicating instability');
    }
    if (metrics.bugReopenRate > 20) {
      factors.push('Elevated bug reopen rate');
    }

    return factors;
  }

  private generateRecommendations(sprint: any): string[] {
    const recommendations: string[] = [];
    const metrics = sprint.metrics || {};

    if (metrics.spilloverRate > 30) {
      recommendations.push('Consider reducing sprint scope or extending sprint duration');
    }
    if (metrics.prReviewDelay > 48) {
      recommendations.push('Implement PR review SLAs and pair programming');
    }
    if (metrics.codeChurn > 50) {
      recommendations.push('Focus on code quality and reduce technical debt');
    }
    if (metrics.bugReopenRate > 20) {
      recommendations.push('Improve bug triage and testing processes');
    }

    if (recommendations.length === 0) {
      recommendations.push('Sprint is on track. Maintain current practices.');
    }

    return recommendations;
  }
}
