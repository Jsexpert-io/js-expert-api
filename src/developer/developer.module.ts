import { Module } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { DeveloperController } from './developer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Developer, DeveloperSchema } from './entities/developer.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillsModule } from 'src/skills/skills.module';

@Module({
  imports:[
    SkillsModule,
    MongooseModule.forFeature([{ name: 'developer', schema:DeveloperSchema }])
  ],
  controllers: [DeveloperController],
  providers: [DeveloperService],
  exports:[DeveloperService]
})
export class DeveloperModule {}
