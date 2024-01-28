import { Module } from '@nestjs/common';
import { ProjectModule } from 'src/project/project.module';
import { TracesController } from './traces.controller';
import { TracesService } from './traces.service';


@Module({
  imports: [

    ProjectModule,
  ],
  controllers: [TracesController],
  providers: [TracesService],
})
export class TracesModule { }
