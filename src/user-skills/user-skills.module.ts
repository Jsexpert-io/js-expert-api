import { Module } from '@nestjs/common';
import { UserSkillsService } from './user-skills.service';
import { UserSkillsController } from './user-skills.controller';
import { UserSkillSchema } from './entities/user-skill.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { DeveloperModule } from 'src/developer/developer.module';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'userskill', schema:UserSkillSchema }]),
    DeveloperModule
  ],
  controllers: [UserSkillsController],
  providers: [UserSkillsService]
})
export class UserSkillsModule {}
