import { Module } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { DeveloperController } from './developer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Developer, DeveloperSchema } from './entities/developer.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'developer', schema:DeveloperSchema }])
  ],
  controllers: [DeveloperController],
  providers: [DeveloperService],
  exports:[DeveloperService]
})
export class DeveloperModule {}
