import { Controller, Get } from '@nestjs/common';
import { SprintService } from './sprint.service';

@Controller('sprint')
export class SprintController {
  constructor(private readonly sprintService: SprintService) {}

  @Get('health')
  getHealth() {
    return this.sprintService.getSprintHealth();
  }

  @Get('history')
  getHistory() {
    return this.sprintService.getHistory();
  }
}
