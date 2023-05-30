import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Redirect, Query, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request, Response } from 'express';



@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  async login(@Body() body,
  @Req() req:Request,
  @Res() res:Response) {

    const {token,user} = await this.authenticationService.login(body);

    res.cookie('token',token,{
      httpOnly:false,
      domain:'jsexpert.io',

    })
    return res.send({user,token})
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
