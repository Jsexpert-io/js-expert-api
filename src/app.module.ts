import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MediaModule } from './media/media.module';
import { TracesModule } from './server-data/v1/traces/traces.module';

import { AuthenticationModule } from './authentication/authentication.module';
import { DeveloperModule } from './developer/developer.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { MetricModule } from './server-data/v1/metric/metric.module';

@Module({
  imports: [
    UserModule,
    ProjectModule,
    AuthenticationModule,
    MediaModule,
    TracesModule,
    DeveloperModule,
    MetricModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
