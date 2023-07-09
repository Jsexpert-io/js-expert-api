import { Injectable } from '@nestjs/common';
import { CreateConceptDto } from './dto/create-concept.dto';
import { UpdateConceptDto } from './dto/update-concept.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ConceptDocument } from './entities/concept.entity';
import mongoose, { Model ,ObjectId } from 'mongoose';
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
  findbySubcategory(subCategory: any) {
    return this.aibitsConceptRepository.find({ subcategory: subCategory })
    ;
  }
  findbyCategory(category: any) {
    return this.aibitsConceptRepository.find({ category: category });
  }
  findOne(id: string) {
    return this.aibitsConceptRepository.findOne({ _id:id }).populate('conceptCards');
  }



  update(id: string, updateConceptDto: UpdateConceptDto) {
    return this.aibitsConceptRepository.updateOne({ _id:id }, {
      title: updateConceptDto.title,
      description: updateConceptDto.description,
      image: updateConceptDto.image,
      links: updateConceptDto.links,
    });
  }


  updateConceptCards(id: any, conceptCardId: any) {
    console.log(id, conceptCardId)
    const objectId = mongoose.Types.ObjectId.createFromHexString(conceptCardId);

    return this.aibitsConceptRepository.updateOne({ _id:id }, {
      $push: { conceptCards: conceptCardId },
    });
  }
  removeConceptCards(id: string, conceptCardId: string) {
    return this.aibitsConceptRepository.updateOne({ _id:id }, {
      $pull: { conceptCards: conceptCardId },
    });
  }

  remove(id: any) {
    return this.aibitsConceptRepository.deleteOne({ _id: id });
  }
}
