import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/create-user.dto';
import { UserService } from './user.service';


@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  register(@Body() createUserDto: AuthDto) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  login(@Body() createUserDto: AuthDto) {
    return this.userService.login(createUserDto);
  }
  @Get('verify/:id_uniqueKey')
  verify(@Param('id_uniqueKey') id_uniqueKey: string) {
    const [id, uniqueKey] = id_uniqueKey.split('_');
    return this.userService.verify(id, uniqueKey);
  }
}
