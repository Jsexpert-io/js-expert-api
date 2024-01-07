import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeveloperModule } from 'src/developer/developer.module';
import { UserChallangeSchema } from './entities/user-challange.entity';
import { UserChallangeController } from './user-challange.controller';
import { UserChallangesService } from './user-challange.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'userchallange', schema: UserChallangeSchema },
    ]),
    DeveloperModule,
  ],
  controllers: [UserChallangeController],
  providers: [UserChallangesService],
})
export class UserChallangeModule { }
