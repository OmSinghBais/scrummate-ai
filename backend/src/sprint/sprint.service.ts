import { Injectable, Logger } from '@nestjs/common';
import { MetricsService } from '../metrics/metrics.service';
import { evaluateSprintRisk } from '../risk/risk.engine';
import axios from 'axios';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async getSprintHealth() {
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

    // ✅ Persist snapshot to DB
    await this.sprintRepo.save({
      healthScore: risk.score,
      riskZone: risk.zone,
      metrics,
      mlPrediction,
      mlExplanation,
    });

    return {
      sprint: 'Current Sprint',
      healthScore: risk.score,
      riskZone: risk.zone,
      metrics,
      insights: risk.insights,
      mlPrediction,
      mlExplanation,
    };
  }

  // ✅ History purely from DB
  async getHistory() {
    return this.sprintRepo.find({
      order: { createdAt: 'ASC' },
    });
  }
}
