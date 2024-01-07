import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserSkillDto } from './dto/create-user-skill.dto';
import { UpdateUserSkillDto } from './dto/update-user-skill.dto';
import { UserSkillsService } from './user-skills.service';

@Controller('user-skills')
export class UserSkillsController {
  constructor(private readonly userSkillsService: UserSkillsService) { }

  @Post()
  create(@Body() createUserSkillDto: CreateUserSkillDto) {
    return this.userSkillsService.create(createUserSkillDto);
  }

  @Post('addUserSkill')
  addUserSkill(@Body() addDeveloperUserSkillDtos: CreateUserSkillDto[]) {
    return this.userSkillsService.addUserSkill(addDeveloperUserSkillDtos);
  }

  @Get('findByUser/:id')
  findByUser(@Param('id') id: string) {
    return this.userSkillsService.findByUser(id);
  }

  @Get('findBySkill/:id')
  findBySkill(@Param('id') id: string) {
    return this.userSkillsService.findBySkill(id);
  }

  @Get('findByUserOnly/:id')
  findByUserOnly(@Param('id') id: string) {
    return this.userSkillsService.findByUserOnly(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserSkillDto: UpdateUserSkillDto,
  ) {
    return this.userSkillsService.update(id, updateUserSkillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSkillsService.remove(id);
  }
}
