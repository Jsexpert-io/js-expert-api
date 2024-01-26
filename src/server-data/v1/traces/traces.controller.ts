import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PorjectGuard } from 'src/auth/project.guard';
import { UpdateTraceDto } from './dto/update-trace.dto';
import { TracesService } from './traces.service';

@ApiTags('v1/traces')
@Controller('v1/traces')
@UseGuards(PorjectGuard)
export class TracesController {
  constructor(private readonly tracesService: TracesService) { }

  @Post()
  create(@Body() createTraceDto: any, @Req() req: any) {
    return this.tracesService.create(createTraceDto, req.project._id);
  }

  @Get()
  findAll() {
    return this.tracesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tracesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTraceDto: UpdateTraceDto) {
    return this.tracesService.update(+id, updateTraceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tracesService.remove(+id);
  }
}
