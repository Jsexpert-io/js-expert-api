import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';

import { MediaModule } from './media/media.module';
import { TracesModule } from './server-data/v1/traces/traces.module';

import { AuthenticationModule } from './authentication/authentication.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { DeveloperModule } from './developer/developer.module';

const mongoUrl = `mongodb://root:123456@64.227.137.36:27017/?appName=jsexpert&directConnection=true`;
@Module({
  imports: [
    MongooseModule.forRoot(mongoUrl, {
      dbName: 'jsexpert',
    }),
    UserModule,
    ProjectModule,
    AuthenticationModule,
    MediaModule,
    TracesModule,
    DeveloperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
