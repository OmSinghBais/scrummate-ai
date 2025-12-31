import { Controller, Get, Post, Param, Body, UseGuards, Request } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  findAll(@Request() req, @Body() body?: { unreadOnly?: boolean }) {
    return this.notificationService.findAll(req.user.userId, body?.unreadOnly);
  }

  @Get('unread/count')
  getUnreadCount(@Request() req) {
    return this.notificationService.getUnreadCount(req.user.userId);
  }

  @Post(':id/read')
  markAsRead(@Param('id') id: string, @Request() req) {
    return this.notificationService.markAsRead(+id, req.user.userId);
  }

  @Post('read-all')
  markAllAsRead(@Request() req) {
    return this.notificationService.markAllAsRead(req.user.userId);
  }
}

