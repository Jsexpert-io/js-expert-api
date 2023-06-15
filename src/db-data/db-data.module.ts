import { Module } from '@nestjs/common';
import { DbDataService } from './db-data.service';
import { DbDataController } from './db-data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DbDataSchema } from './entities/db-datum.entity';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'dbdata', schema:DbDataSchema }]),
    ProjectModule
  ],
  controllers: [DbDataController],
  providers: [DbDataService]
})
export class DbDataModule {}
