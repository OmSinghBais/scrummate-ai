import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SprintSnapshot } from '../sprint/sprint.entity';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(SprintSnapshot)
    private sprintRepo: Repository<SprintSnapshot>,
  ) {}

  async getTeamPerformance(teamId?: number) {
    const where = teamId ? { teamId } : {};
    const sprints = await this.sprintRepo.find({
      where,
      order: { createdAt: 'DESC' },
      take: 20,
    });

    // Calculate velocity trend
    const velocities = sprints.map(s => s.healthScore);
    const avgVelocity = velocities.length > 0
      ? velocities.reduce((sum, v) => sum + v, 0) / velocities.length
      : 0;

    // Calculate improvement rate
    const improvementRate = sprints.length >= 2
      ? ((sprints[0].healthScore - sprints[sprints.length - 1].healthScore) / sprints[sprints.length - 1].healthScore) * 100
      : 0;

    // Calculate metrics averages
    const avgMetrics = {
      spilloverRate: sprints.reduce((sum, s) => sum + (s.metrics?.spilloverRate || 0), 0) / sprints.length || 0,
      prReviewDelay: sprints.reduce((sum, s) => sum + (s.metrics?.prReviewDelay || 0), 0) / sprints.length || 0,
      codeChurn: sprints.reduce((sum, s) => sum + (s.metrics?.codeChurn || 0), 0) / sprints.length || 0,
      bugReopenRate: sprints.reduce((sum, s) => sum + (s.metrics?.bugReopenRate || 0), 0) / sprints.length || 0,
    };

    return {
      totalSprints: sprints.length,
      avgVelocity: Math.round(avgVelocity),
      improvementRate: Math.round(improvementRate * 100) / 100,
      avgMetrics,
      velocityTrend: this.calculateTrend(velocities),
      recentPerformance: sprints.slice(0, 5).map(s => ({
        sprintName: s.sprintName,
        healthScore: s.healthScore,
        riskZone: s.riskZone,
        createdAt: s.createdAt,
      })),
    };
  }

  private calculateTrend(values: number[]): 'improving' | 'declining' | 'stable' {
    if (values.length < 2) return 'stable';
    
    const firstHalf = values.slice(0, Math.floor(values.length / 2));
    const secondHalf = values.slice(Math.floor(values.length / 2));
    
    const firstAvg = firstHalf.reduce((sum, v) => sum + v, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, v) => sum + v, 0) / secondHalf.length;
    
    const diff = secondAvg - firstAvg;
    if (Math.abs(diff) < 2) return 'stable';
    return diff > 0 ? 'improving' : 'declining';
  }
}

