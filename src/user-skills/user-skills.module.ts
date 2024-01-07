import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeveloperModule } from 'src/developer/developer.module';
import { UserSkillSchema } from './entities/user-skill.entity';
import { UserSkillsController } from './user-skills.controller';
import { UserSkillsService } from './user-skills.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'userskill', schema: UserSkillSchema }]),
    DeveloperModule,
  ],
  controllers: [UserSkillsController],
  providers: [UserSkillsService],
})
export class UserSkillsModule { }
