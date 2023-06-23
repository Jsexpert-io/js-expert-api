import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ServerDataService } from './server-data.service';
import { CreateServerDatumDto } from './dto/create-server-datum.dto';
import { UpdateServerDatumDto } from './dto/update-server-datum.dto';
import { PorjectGuard } from 'src/auth/project.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('server-data')
@ApiTags('server-data')

@UseGuards(PorjectGuard)
export class ServerDataController {
  constructor(private readonly serverDataService: ServerDataService) {}

  @Post()
  create(@Req() req:any, @Body() createServerDatumDto: CreateServerDatumDto) {
    return this.serverDataService.create(createServerDatumDto,req.project._id);
  }

  @Get(':pagenumber/:limit')
  findAll(@Req() req:any,@Param('pagenumber') pagenumber: number,@Param('limit') limit: number) {
    return this.serverDataService.findAllByProject(req?.project?._id ,pagenumber,limit);
  }

 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serverDataService.remove(id);
  }
}
