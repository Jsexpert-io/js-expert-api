import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDto } from './dto/create-user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() createUserDto: AuthDto) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  login(@Body() createUserDto: AuthDto) {
    return this.userService.login(createUserDto);
  }
  @Get('verify/:id-:uniqueKey')
  verify(@Param('id') id: string, @Param('uniqueKey') uniqueKey: string) {
    return this.userService.verify(id, uniqueKey);
  }
}
