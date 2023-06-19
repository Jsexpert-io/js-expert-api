import { Module } from '@nestjs/common';
import { MarketingUserService } from './marketing-user.service';
import { MarketingUserController } from './marketing-user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketingUserSchema } from './entities/marketing-user.entity';

@Module({
imports: [
  MongooseModule.forFeature([{ name: 'marketinguser', schema:MarketingUserSchema }]),
],

  controllers: [MarketingUserController],
  providers: [MarketingUserService]
})
export class MarketingUserModule {}
