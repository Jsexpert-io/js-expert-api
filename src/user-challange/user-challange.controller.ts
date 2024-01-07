import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserChallangesService } from './user-challange.service';
import { CreateUserChallangeDto } from './dto/create-user-challange.dto';
import { UpdateUserChallangeDto } from './dto/update-user-challange.dto';

@Controller('user-challange')
export class UserChallangeController {
  constructor(private readonly userChallangeService: UserChallangesService) {}

  @Post()
  create(@Body() createUserChallangeDto: CreateUserChallangeDto) {

    return this.userChallangeService.create(createUserChallangeDto);
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserChallangeDto: UpdateUserChallangeDto) {
    return this.userChallangeService.update(id, updateUserChallangeDto);
  }

  @Post('addUserChallange')
  addUserChallange(@Body() addDeveloperUserSkillDtos: CreateUserChallangeDto) {
    return this.userChallangeService.addUserChallange(addDeveloperUserSkillDtos);
  }


  @Get('findByUser/:id')
  findByUser(@Param('id') id: string) {
    return this.userChallangeService.findByUser(id);
  }

  @Get('findByChallange/:id')
  findByChallange(@Param('id') id: string) {
    return this.userChallangeService.findByChallange(id);
  }


  @Get('findByUserOnly/:id')
  findByUserOnly(@Param('id') id: string) {
    return this.userChallangeService.findByUserOnly(id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userChallangeService.remove(id);
  }
}
