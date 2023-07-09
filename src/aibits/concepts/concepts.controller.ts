import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConceptService } from './concepts.service';
import { CreateConceptDto } from './dto/create-concept.dto';
import { UpdateConceptDto } from './dto/update-concept.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('concepts')
@ApiTags('concepts')

export class ConceptsController {
  constructor(private readonly conceptsService: ConceptService) {}

  @Post()
  create(@Body() createConceptDto: CreateConceptDto) {
    return this.conceptsService.create(createConceptDto);
  }

  @Get()
  findAll() {
    return this.conceptsService.findAll();
  }
  @Get('findbySubcategory/:id')
  findbySubcategory(
    @Param('id') id: string,
  ) {
    return this.conceptsService.findbySubcategory(id);
  }

  @Get('findbyCategory/:category')
  findbyCategory(
    @Param('category') category: string,
  ) {
    return this.conceptsService.findbyCategory(category);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conceptsService.findOne(id);
  }

  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConceptDto: UpdateConceptDto) {
    return this.conceptsService.update(id, updateConceptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conceptsService.remove(id);
  }
}
