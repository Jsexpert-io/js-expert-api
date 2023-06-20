import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarketingUserService } from './marketing-user.service';
import { CreateMarketingUserDto } from './dto/create-marketing-user.dto';
import { UpdateMarketingUserDto } from './dto/update-marketing-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('marketing-user')
@ApiTags('marketing-user')

export class MarketingUserController {
  constructor(private readonly marketingUserService: MarketingUserService) {}

  @Post()
  create(@Body() createMarketingUserDto: CreateMarketingUserDto) {
    return this.marketingUserService.create(createMarketingUserDto);
  }

  @Get()
  findAll() {
    return this.marketingUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marketingUserService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarketingUserDto: UpdateMarketingUserDto) {
    return this.marketingUserService.update(id, updateMarketingUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketingUserService.remove(id);
  }
}
