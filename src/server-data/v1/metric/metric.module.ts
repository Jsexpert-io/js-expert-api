import { Module } from '@nestjs/common';
import { ProjectModule } from 'src/project/project.module';
import { MetricController } from './metric.controller';
import { MetricService } from './metric.service';

@Module({
  imports: [
    ProjectModule
  ],
  controllers: [MetricController],
  providers: [MetricService]
})
export class MetricModule { }
