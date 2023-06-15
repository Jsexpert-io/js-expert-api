import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DbDataService } from './db-data.service';
import { CreateDbDatumDto } from './dto/create-db-datum.dto';
import { UpdateDbDatumDto } from './dto/update-db-datum.dto';

@Controller('db-data')
export class DbDataController {
  constructor(private readonly dbDataService: DbDataService) {}

  @Post()
  create(@Body() createDbDatumDto: CreateDbDatumDto) {
    return this.dbDataService.create(createDbDatumDto);
  }

  @Get()
  findAll() {
    return this.dbDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dbDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDbDatumDto: UpdateDbDatumDto) {
    return this.dbDataService.update(+id, updateDbDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dbDataService.remove(+id);
  }
}
