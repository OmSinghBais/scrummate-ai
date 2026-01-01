import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SprintModule } from './sprint/sprint.module';
import { MetricsModule } from './metrics/metrics.module';
import { UserModule } from './user/user.module';
import { TeamModule } from './team/team.module';
import { ExportModule } from './export/export.module';
import { NotificationModule } from './notifications/notification.module';
import { PlanningModule } from './planning/planning.module';
import { PerformanceModule } from './performance/performance.module';
import { WebhookModule } from './webhooks/webhook.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production', // Only sync in dev
      ssl: process.env.DATABASE_URL?.includes('sslmode=require') || process.env.DATABASE_URL?.includes('render.com')
        ? { rejectUnauthorized: false }
        : false,
      retryAttempts: 5,
      retryDelay: 3000,
    }),
    MetricsModule,
    SprintModule,
    UserModule,
    TeamModule,
    ExportModule,
    NotificationModule,
    PlanningModule,
    PerformanceModule,
    WebhookModule,
  ],
})
export class AppModule {}
