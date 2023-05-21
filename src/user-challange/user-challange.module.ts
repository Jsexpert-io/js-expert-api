import { Module } from '@nestjs/common';
import { UserChallangesService } from './user-challange.service';
import { UserChallangeController } from './user-challange.controller';
import { DeveloperModule } from 'src/developer/developer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserChallangeSchema } from './entities/user-challange.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'userchallange', schema:UserChallangeSchema }]),
    DeveloperModule
  ],
  controllers: [UserChallangeController],
  providers: [UserChallangesService]
})
export class UserChallangeModule {}
