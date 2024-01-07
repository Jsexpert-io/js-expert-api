import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { DbDataModule } from './db-data/db-data.module';
import { ProjectModule } from './project/project.module';
import { ServerDataModule } from './server-data/server-data.module';
import { UserModule } from './user/user.module';

import { CategoryModule } from './aibits/category/category.module';
import { ConceptcardModule } from './aibits/conceptcard/conceptcard.module';
import { ConceptsModule } from './aibits/concepts/concepts.module';
import { SubcategoryModule } from './aibits/subcategory/subcategory.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ChallangeModule } from './challange/challange.module';
import { DeveloperModule } from './developer/developer.module';
import { MarketingUserModule } from './marketing-user/marketing-user.module';
import { MediaModule } from './media/media.module';
import { SkillsModule } from './skills/skills.module';
import { UserChallangeModule } from './user-challange/user-challange.module';
import { UserSkillsModule } from './user-skills/user-skills.module';
import { UsercertificationModule } from './usercertification/usercertification.module';

const mongoUrl = `mongodb+srv://admin:admin123@mongo-server.picscontest.com/jsexpert?authSource=admin&ssl=false`;
@Module({
  imports: [
    MongooseModule.forRoot(mongoUrl, {
      useNewUrlParser: true,
    }),

    UserModule,

    ProjectModule,

    ServerDataModule,

    DbDataModule,

    MarketingUserModule,

    CategoryModule,

    SubcategoryModule,

    ConceptsModule,

    ConceptcardModule,
    DeveloperModule,
    ChallangeModule,
    UserSkillsModule,
    SkillsModule,
    UsercertificationModule,
    UserChallangeModule,
    AuthenticationModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
