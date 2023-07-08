import { Injectable } from '@nestjs/common';
import { CreateConceptDto } from './dto/create-concept.dto';
import { UpdateConceptDto } from './dto/update-concept.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ConceptDocument } from './entities/concept.entity';
import { Model } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
@ApiTags('Concepts')
export class ConceptService {
  constructor(
    @InjectModel('aibitsConcept')
    private aibitsConceptRepository: Model<ConceptDocument>,
  ) { }
  create(createConceptDto: CreateConceptDto) {
    return this.aibitsConceptRepository.create({
      ...createConceptDto, slug: createConceptDto.
      title.toLowerCase().replace(/ /g, '-')
      // remove () [] {} and spaces
      .replace(/[(){}[\] ]/g, '')

    })
  }

  findAll() {
    return this.aibitsConceptRepository.find();
  }
  findbySubcategory(subCategory:any) {
    return this.aibitsConceptRepository.find({ subcategory:subCategory});
  }

  findOne(slug: string) {
    return this.aibitsConceptRepository.findOne({ slug });
  }



  update(id: string, updateConceptDto: UpdateConceptDto) {
    return this.aibitsConceptRepository.updateOne({ id }, {
      title: updateConceptDto.title,
      description: updateConceptDto.description,
      image: updateConceptDto.image,
    });
  }

  remove(id: any) {
    return this.aibitsConceptRepository.deleteOne({_id:id});
  }
}
