import { Module } from '@nestjs/common';
import { ServerDataService } from './server-data.service';
import { ServerDataController } from './server-data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ServerDataSchema } from './entities/server-datum.entity';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'serverdata', schema:ServerDataSchema }]),
    ProjectModule
  ],
  controllers: [ServerDataController],
  providers: [ServerDataService]
})
export class ServerDataModule {}
