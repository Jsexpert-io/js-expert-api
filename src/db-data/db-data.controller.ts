import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { DbDataService } from './db-data.service';
import { CreateDbDatumDto } from './dto/create-db-datum.dto';
import { UpdateDbDatumDto } from './dto/update-db-datum.dto';
import { PorjectGuard } from 'src/auth/project.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('server-data')
@ApiTags('server-data')

@UseGuards(PorjectGuard)
export class DbDataController {
  constructor(private readonly serverDataService: DbDataService) { }

  @Post()
  create(@Req() req: any, @Body() createServerDatumDto: CreateDbDatumDto) {
    return this.serverDataService.create(createServerDatumDto, req.project._id);
  }

  // https://api.jsexpert.io/server-data?sortBy=&orderBy=&page=1&limit=10&search=
  @Get()
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

  
  @Get('findByEndpoint')
  findByEndpoint(@Req() req: any,
    @Query('endpoint') endpoint: string,
  ) {
    return this.serverDataService.findByEndpoint(
      req?.project?._id,
      endpoint
    );
  }

  @Get('getRequestDistribution')
  getRequestDistribution(@Req() req: any
  ) {
    return this.serverDataService.getRequestDistribution(
      req?.project?._id
    );
  }

  @Get('getRequestDurationDistribution')
  getRequestDurationDistribution(@Req() req: any
  ) {
    return this.serverDataService.getRequestDurationDistribution(
      req?.project?._id
    );
  }
  @Get('getMemoryUsageTrend')
  getMemoryUsageTrend(@Req() req: any,
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date = new Date(),

  ) {
    if(!startDate) startDate = new Date(new Date().setDate(new Date().getDate() - 30))

    console.log(startDate,endDate)
    return this.serverDataService.getMemoryUsageTrend(
      req?.project?._id,startDate,endDate
    );
  }
  @Get('errorStatusCodeDitribution')
  errorStatusCodeDitribution(@Req() req: any
  ) {
    return this.serverDataService.errorStatusCodeDitribution(
      req?.project?._id
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serverDataService.remove(id);
  }
}
