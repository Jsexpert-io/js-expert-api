import { Module } from '@nestjs/common';
import { UserCertificationService } from './usercertification.service';
import { UsercertificationController } from './usercertification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCertificationSchema } from './entities/usercertification.entity';
import { DeveloperModule } from 'src/developer/developer.module';

@Module({
  imports:[
    DeveloperModule,
    MongooseModule.forFeature([{ name: 'usercertificate', schema:UserCertificationSchema }])

  ],
  controllers: [UsercertificationController],
  providers: [UserCertificationService]
})
export class UsercertificationModule {}
