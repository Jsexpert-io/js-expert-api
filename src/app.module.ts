import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleStrategy } from './auth/google.strategy';
import { AuthenticationModule } from './authentication/authentication.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { TypeOrmModule } from '@nestjs/typeorm';


import { DeveloperModule } from './developer/developer.module';
import { Developer } from './developer/entities/developer.entity';
import { MediaModule } from './media/media.module';
import { SkillsModule } from './skills/skills.module';
const mongoUrl =`mongodb+srv://doadmin:062vzJf58yO14dV7@smartml-serviceapp-d50808dc.mongo.ondigitalocean.com/jsDB?tls=true&authSource=admin`
@Module({
  imports: [

   
MongooseModule.forRoot(mongoUrl),
    AuthenticationModule,

    DeveloperModule,

    MediaModule,

    SkillsModule,
    ],
  controllers: [AppController],
  providers: [AppService,GoogleStrategy],
})
export class AppModule {}
