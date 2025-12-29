import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { IntegrationsModule } from '../integrations/integrations.module';

@Module({
  imports: [IntegrationsModule],
  providers: [MetricsService],
  exports: [MetricsService],
})
export class MetricsModule {}
