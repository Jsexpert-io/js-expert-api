import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { DbDataService } from './db-data.service';
import { CreateDbDatumDto } from './dto/create-db-datum.dto';
import { UpdateDbDatumDto } from './dto/update-db-datum.dto';
import { PorjectGuard } from 'src/auth/project.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('db-data')
@ApiTags('db-data')

@UseGuards(PorjectGuard)

export class DbDataController {
  constructor(private readonly dbDataService: DbDataService) {}

  @Post()
  create(@Req() req:any, @Body() createServerDatumDto: CreateDbDatumDto) {
    return this.dbDataService.create(createServerDatumDto,req.project._id);
  }

  @Get()
  findAll(@Req() req:any) {
    return this.dbDataService.findAllByProject(req.project._id);
  }

 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dbDataService.remove(id);
  }
}
