import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from 'src/project/project.module';
import { TracesController } from './traces.controller';
import { TracesService } from './traces.service';
import { TraceSchema } from './entities/trace.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'trace', schema: TraceSchema }]),
    ProjectModule,
  ],
  controllers: [TracesController],
  providers: [TracesService],
})
export class TracesModule { }
