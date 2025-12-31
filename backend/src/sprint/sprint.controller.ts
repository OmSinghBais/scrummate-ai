import { Controller, Get, Post, Body, Query, UseGuards, Request } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('sprint')
@UseGuards(JwtAuthGuard)
export class SprintController {
  constructor(private readonly sprintService: SprintService) {}

  @Get('health')
  getHealth(@Query('teamId') teamId?: string, @Request() req?: any) {
    const teamIdNum = teamId ? parseInt(teamId, 10) : undefined;
    return this.sprintService.getSprintHealth(teamIdNum);
  }

  @Get('history')
  getHistory(@Query('teamId') teamId?: string) {
    const teamIdNum = teamId ? parseInt(teamId, 10) : undefined;
    return this.sprintService.getHistory(teamIdNum);
  }

  @Post('compare')
  compareSprints(@Body() body: { sprintIds: number[]; teamId?: number }) {
    return this.sprintService.compareSprints(body.sprintIds, body.teamId);
  }
}
