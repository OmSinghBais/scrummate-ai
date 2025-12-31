import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SprintSnapshot } from '../sprint/sprint.entity';
import { ExportService } from './export.service';
import { ExportController } from './export.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SprintSnapshot])],
  controllers: [ExportController],
  providers: [ExportService],
  exports: [ExportService],
})
export class ExportModule {}

