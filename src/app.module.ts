import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { ServerDataModule } from './server-data/server-data.module';
import { DbDataModule } from './db-data/db-data.module';

import { MarketingUserModule } from './marketing-user/marketing-user.module';
import { CategoryModule } from './aibits/category/category.module';
import { SubcategoryModule } from './aibits/subcategory/subcategory.module';
import { ConceptsModule } from './aibits/concepts/concepts.module';




const mongoUrl = `mongodb+srv://doadmin:062vzJf58yO14dV7@smartml-serviceapp-d50808dc.mongo.ondigitalocean.com/NewjsDB?tls=true&authSource=admin`
@Module({
  imports: [


    MongooseModule.forRoot(mongoUrl, {

    }),


    UserModule,


    ProjectModule,


    ServerDataModule,


    DbDataModule,





    MarketingUserModule,





    CategoryModule,





    SubcategoryModule,





    ConceptsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule { }
