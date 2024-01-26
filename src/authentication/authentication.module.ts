import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

import { DeveloperModule } from 'src/developer/developer.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DeveloperModule, UserModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule { }
