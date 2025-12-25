import { Injectable } from '@nestjs/common';
import { MetricsService } from '../metrics/metrics.service';
import { evaluateSprintRisk } from '../risk/risk.engine';
import axios from 'axios';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SprintSnapshot } from './sprint.entity';

@Injectable()
export class SprintService {
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

    try {
      const mlRes = await axios.post(
        'http://localhost:8000/predict',
        metrics,
      );

      mlPrediction = `${mlRes.data.failure_probability}% chance of sprint failure`;
      mlExplanation = mlRes.data.explanation || [];
    } catch (err) {
      console.error('ML service unavailable');
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

  // ✅ ONLY DB DATA (NO MOCKS)
  async getHistory() {
    return this.sprintRepo.find({
      order: { createdAt: 'ASC' },
    });
  }
}
