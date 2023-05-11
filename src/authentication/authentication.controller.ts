import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Redirect } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

import { AuthGuard } from '@nestjs/passport';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  @Redirect()
  async googleAuthRedirect(@Req() req) {
    return  this.authenticationService.googleLogin(req)
    
  }
}
