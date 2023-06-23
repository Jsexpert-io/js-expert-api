import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { ServerDataService } from './server-data.service';
import { CreateServerDatumDto } from './dto/create-server-datum.dto';
import { UpdateServerDatumDto } from './dto/update-server-datum.dto';
import { PorjectGuard } from 'src/auth/project.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('server-data')
@ApiTags('server-data')

@UseGuards(PorjectGuard)
export class ServerDataController {
  constructor(private readonly serverDataService: ServerDataService) { }

  @Post()
  create(@Req() req: any, @Body() createServerDatumDto: CreateServerDatumDto) {
    return this.serverDataService.create(createServerDatumDto, req.project._id);
  }

  // https://api.jsexpert.io/server-data?sortBy=&orderBy=&page=1&limit=10&search=
  @Get('')
  findAll(@Req() req: any,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: string = 'createdAt',
    @Query('orderBy') orderBy: string = 'desc',
    @Query('search') search: string = '',
  ) {
    return this.serverDataService.findAllByProject(req?.project?._id,
      page, limit, sortBy, orderBy, search
    );
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serverDataService.remove(id);
  }
}
