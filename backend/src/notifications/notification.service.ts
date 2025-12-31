import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepo: Repository<Notification>,
  ) {}

  async create(userId: number, type: string, title: string, message: string, metadata?: any) {
    const notification = this.notificationRepo.create({
      userId,
      type,
      title,
      message,
      metadata,
    });

    return this.notificationRepo.save(notification);
  }

  async findAll(userId: number, unreadOnly = false) {
    const where: any = { userId };
    if (unreadOnly) {
      where.read = false;
    }

    return this.notificationRepo.find({
      where,
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }

  async markAsRead(id: number, userId: number) {
    const notification = await this.notificationRepo.findOne({
      where: { id, userId },
    });

    if (notification) {
      notification.read = true;
      return this.notificationRepo.save(notification);
    }
    return null;
  }

  async markAllAsRead(userId: number) {
    await this.notificationRepo.update(
      { userId, read: false },
      { read: true },
    );
  }

  async getUnreadCount(userId: number) {
    return this.notificationRepo.count({
      where: { userId, read: false },
    });
  }
}

