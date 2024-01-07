import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChallangeService } from './challange.service';
import { CreateChallangeDto } from './dto/create-challange.dto';
import { UpdateChallangeDto } from './dto/update-challange.dto';

@Controller('challange')
export class ChallangeController {
  constructor(private readonly challangeService: ChallangeService) {}

  @Post()
  create(@Body() createChallangeDto: CreateChallangeDto) {
    return this.challangeService.create(createChallangeDto);
  }

  @Get()
  findAll() {
    return this.challangeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.challangeService.findOne(id);
  }
  @Get('findBySlug/:slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.challangeService.findOneBySlug(slug);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChallangeDto: UpdateChallangeDto) {
    return this.challangeService.update(id, updateChallangeDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.challangeService.remove(id);
  }
}
