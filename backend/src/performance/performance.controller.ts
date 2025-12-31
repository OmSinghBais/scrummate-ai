import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('performance')
@UseGuards(JwtAuthGuard)
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @Get('team')
  getTeamPerformance(@Query('teamId') teamId?: string) {
    const teamIdNum = teamId ? parseInt(teamId, 10) : undefined;
    return this.performanceService.getTeamPerformance(teamIdNum);
  }
}

