import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserCertificationDto } from './dto/create-usercertification.dto';
import { UpdateUserCertificationDto } from './dto/update-usercertification.dto';
import { UserCertificationService } from './usercertification.service';

@Controller('usercertificate')
export class UsercertificationController {
  constructor(
    private readonly usercertificationService: UserCertificationService,
  ) { }

  @Post()
  create(@Body() createUsercertificationDto: CreateUserCertificationDto) {
    return this.usercertificationService.create(createUsercertificationDto);
  }

  @Get('findByUser/:id')
  findByUser(@Param('id') id: string) {
    return this.usercertificationService.findByUser(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsercertificationDto: UpdateUserCertificationDto,
  ) {
    return this.usercertificationService.update(id, updateUsercertificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usercertificationService.remove(id);
  }
}
