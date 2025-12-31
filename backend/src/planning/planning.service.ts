import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SprintPlan } from './planning.entity';

@Injectable()
export class PlanningService {
  constructor(
    @InjectRepository(SprintPlan)
    private planningRepo: Repository<SprintPlan>,
  ) {}

  async create(teamId: number, sprintName: string, goal?: string) {
    const plan = this.planningRepo.create({
      teamId,
      sprintName,
      goal,
      stories: [],
      blockers: [],
    });

    return this.planningRepo.save(plan);
  }

  async findAll(teamId: number) {
    return this.planningRepo.find({
      where: { teamId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number, teamId: number) {
    const plan = await this.planningRepo.findOne({
      where: { id, teamId },
    });

    if (!plan) {
      throw new NotFoundException('Sprint plan not found');
    }

    return plan;
  }

  async update(id: number, teamId: number, updates: Partial<SprintPlan>) {
    const plan = await this.findOne(id, teamId);
    
    Object.assign(plan, updates);
    
    // Recalculate total points
    if (updates.stories) {
      plan.totalPoints = (updates.stories as any[]).reduce(
        (sum, story) => sum + (story.points || 0),
        0
      );
    }

    return this.planningRepo.save(plan);
  }

  async addStory(id: number, teamId: number, story: any) {
    const plan = await this.findOne(id, teamId);
    plan.stories = [...(plan.stories || []), story];
    plan.totalPoints = plan.stories.reduce((sum, s) => sum + (s.points || 0), 0);
    return this.planningRepo.save(plan);
  }

  async addBlocker(id: number, teamId: number, blocker: any) {
    const plan = await this.findOne(id, teamId);
    plan.blockers = [...(plan.blockers || []), blocker];
    return this.planningRepo.save(plan);
  }
}

