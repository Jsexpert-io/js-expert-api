import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PorjectGuard } from 'src/auth/project.guard';
import { TracesService } from './traces.service';
// je1Q_lKI7Iku0
@ApiTags('v1/traces')
@Controller('v1/traces')
@UseGuards(PorjectGuard)
export class TracesController {
  constructor(private readonly tracesService: TracesService) { }

  @Post()
  create(@Body() createTraceDto: any, @Req() req: any) {
    return this.tracesService.create(createTraceDto, req.project.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tracesService.findOne(id);
  }
  @Get()
  findbyProjectTraces(
    @Req() req: any
  ) {
    return this.tracesService.findByProjectId(req.project.id);
  }

  @Get('findbyProject/:id')
  findbyProject(@Param('id') id: string) {
    return this.tracesService.findByProjectId(id);
  }
  @Delete('deleteByProjectId/:id')
  deleteByProjectId(@Param('id') id: string) {
    return this.tracesService.deleteByProjectId(id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tracesService.remove(id);
  }

}
