import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import * as crypto from 'crypto';
import { Webhook } from './webhook.entity';

@Injectable()
export class WebhookService {
  constructor(
    @InjectRepository(Webhook)
    private webhookRepo: Repository<Webhook>,
  ) {}

  async create(teamId: number, url: string, events: string[], secret?: string) {
    const webhook = this.webhookRepo.create({
      teamId,
      url,
      events,
      secret: secret || this.generateSecret(),
      active: true,
    });

    return this.webhookRepo.save(webhook);
  }

  async findAll(teamId: number) {
    return this.webhookRepo.find({
      where: { teamId },
      order: { createdAt: 'DESC' },
    });
  }

  async delete(id: number, teamId: number) {
    return this.webhookRepo.delete({ id, teamId });
  }

  async trigger(event: string, teamId: number, data: any) {
    const webhooks = await this.webhookRepo.find({
      where: { teamId, active: true },
    });

    const relevantWebhooks = webhooks.filter(w => w.events.includes(event));

    await Promise.allSettled(
      relevantWebhooks.map(webhook => this.sendWebhook(webhook, event, data))
    );
  }

  private async sendWebhook(webhook: Webhook, event: string, data: any) {
    try {
      const payload = {
        event,
        timestamp: new Date().toISOString(),
        data,
      };

      const signature = this.generateSignature(JSON.stringify(payload), webhook.secret);

      await axios.post(webhook.url, payload, {
        headers: {
          'X-Webhook-Signature': signature,
          'X-Webhook-Event': event,
        },
        timeout: 5000,
      });
    } catch (error) {
      console.error(`Failed to send webhook ${webhook.id}:`, error.message);
    }
  }

  private generateSecret(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  private generateSignature(payload: string, secret: string): string {
    return crypto.createHmac('sha256', secret).update(payload).digest('hex');
  }
}

