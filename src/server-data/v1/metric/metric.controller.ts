import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PorjectGuard } from 'src/auth/project.guard';
import { UpdateMetricDto } from './dto/update-metric.dto';
import { MetricService } from './metric.service';

@ApiTags('v1/metric')
@Controller('v1/metric')
@UseGuards(PorjectGuard)
export class MetricController {
  constructor(private readonly metricService: MetricService) { }

  @Post()
  create(@Body() createMetricDto: any, @Req() req: any) {
    return this.metricService.create(createMetricDto, req.project.id);
  }

  @Get()
  findAll() {
    return this.metricService.findAll();
  }
  @Get('findbyProject/:id')
  findbyProject(@Param('id') id: string) {
    return this.metricService.findByProjectId(id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.metricService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMetricDto: UpdateMetricDto) {
    return this.metricService.update(+id, updateMetricDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.metricService.remove(+id);
  }
}
