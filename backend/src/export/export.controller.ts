import { Controller, Get, Param, Query, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExportService } from './export.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('export')
@UseGuards(JwtAuthGuard)
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('csv')
  async exportCSV(@Query('teamId') teamId?: string, @Res() res?: Response) {
    const teamIdNum = teamId ? parseInt(teamId, 10) : undefined;
    const csv = await this.exportService.exportToCSV(teamIdNum);

    res?.setHeader('Content-Type', 'text/csv');
    res?.setHeader('Content-Disposition', 'attachment; filename=sprints.csv');
    res?.send(csv);
  }

  @Get('sprint/:id/report')
  async getSprintReport(@Param('id') id: string, @Query('teamId') teamId?: string) {
    const teamIdNum = teamId ? parseInt(teamId, 10) : undefined;
    return this.exportService.getSprintReportData(+id, teamIdNum);
  }
}

