import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConceptcardService } from './conceptcard.service';
import { CreateConceptcardDto } from './dto/create-conceptcard.dto';
import { UpdateConceptcardDto } from './dto/update-conceptcard.dto';

@Controller('conceptcard')
export class ConceptcardController {
  constructor(private readonly conceptcardService: ConceptcardService) {}

  @Post()
  create(@Body() createConceptcardDto: CreateConceptcardDto) {
    return this.conceptcardService.create(createConceptcardDto);
  }

  @Get()
  findAll() {
    return this.conceptcardService.findAll();
  }
  @Get('findByConcept/:id')
  findByConcept(@Param('id') id: string) {
    return this.conceptcardService.findByConcept(id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conceptcardService.findOne(id);
  }
  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConceptcardDto: UpdateConceptcardDto) {
    return this.conceptcardService.update(id, updateConceptcardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conceptcardService.remove(id);
  }
}
