import { Module } from '@nestjs/common';
import { ChallangeService } from './challange.service';
import { ChallangeController } from './challange.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallangeSchema } from './entities/challange.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'challange', schema:ChallangeSchema }])
  ],
  controllers: [ChallangeController],
  providers: [ChallangeService]
})
export class ChallangeModule {}
