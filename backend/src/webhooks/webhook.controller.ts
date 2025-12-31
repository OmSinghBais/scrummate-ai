import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('webhooks')
@UseGuards(JwtAuthGuard)
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  create(@Body() body: { teamId: number; url: string; events: string[]; secret?: string }) {
    return this.webhookService.create(body.teamId, body.url, body.events, body.secret);
  }

  @Get('team/:teamId')
  findAll(@Param('teamId') teamId: string) {
    return this.webhookService.findAll(+teamId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Body() body: { teamId: number }) {
    return this.webhookService.delete(+id, body.teamId);
  }
}

