import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Redirect, Query } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthGuard } from 'src/auth/auth.guard';



@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  async login(@Body() body) {
    return this.authenticationService.login(body);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@Req() req) {
    return req.user
  }

  @Post('register')
  async register(@Body() body) {
    return this.authenticationService.register(body);
  }
  @Redirect()
  @Get('verifyEmail')
  async verifyEmail(@Query('token') token) {
    return this.authenticationService.verifyEmail(token);
  }

}
