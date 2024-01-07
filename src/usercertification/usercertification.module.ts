import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeveloperModule } from 'src/developer/developer.module';
import { UserCertificationSchema } from './entities/usercertification.entity';
import { UsercertificationController } from './usercertification.controller';
import { UserCertificationService } from './usercertification.service';

@Module({
  imports: [
    DeveloperModule,
    MongooseModule.forFeature([
      { name: 'usercertificate', schema: UserCertificationSchema },
    ]),
  ],
  controllers: [UsercertificationController],
  providers: [UserCertificationService],
})
export class UsercertificationModule { }
