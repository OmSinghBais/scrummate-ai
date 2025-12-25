import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SprintService } from './sprint.service';
import { SprintController } from './sprint.controller';
import { SprintSnapshot } from './sprint.entity';

import { MetricsModule } from '../metrics/metrics.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SprintSnapshot]),
    MetricsModule,
  ],
  controllers: [SprintController],
  providers: [SprintService],
})
export class SprintModule {}
