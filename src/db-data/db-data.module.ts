import { Module } from '@nestjs/common';
import { DbDataService } from './db-data.service';
import { DbDataController } from './db-data.controller';

@Module({
  controllers: [DbDataController],
  providers: [DbDataService]
})
export class DbDataModule {}
