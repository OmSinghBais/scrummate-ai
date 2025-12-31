import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { PlanningService } from './planning.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('planning')
@UseGuards(JwtAuthGuard)
export class PlanningController {
  constructor(private readonly planningService: PlanningService) {}

  @Post()
  create(@Body() body: { teamId: number; sprintName: string; goal?: string }) {
    return this.planningService.create(body.teamId, body.sprintName, body.goal);
  }

  @Get('team/:teamId')
  findAll(@Param('teamId') teamId: string) {
    return this.planningService.findAll(+teamId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Body() body: { teamId: number }) {
    return this.planningService.findOne(+id, body.teamId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { teamId: number; updates: any }) {
    return this.planningService.update(+id, body.teamId, body.updates);
  }

  @Post(':id/stories')
  addStory(@Param('id') id: string, @Body() body: { teamId: number; story: any }) {
    return this.planningService.addStory(+id, body.teamId, body.story);
  }

  @Post(':id/blockers')
  addBlocker(@Param('id') id: string, @Body() body: { teamId: number; blocker: any }) {
    return this.planningService.addBlocker(+id, body.teamId, body.blocker);
  }
}

