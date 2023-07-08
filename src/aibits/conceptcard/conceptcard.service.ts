import { Injectable } from '@nestjs/common';
import { CreateConceptcardDto } from './dto/create-conceptcard.dto';
import { UpdateConceptcardDto } from './dto/update-conceptcard.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ConceptCardDocument } from './entities/conceptcard.entity';
import { Model } from 'mongoose';

@Injectable()
export class ConceptcardService {
  constructor(
    @InjectModel('aibitsConceptCard')
    private aibitsConceptCardRepository: Model<ConceptCardDocument>,
  ) { }
  create(createConceptcardDto: CreateConceptcardDto) {
    return this.aibitsConceptCardRepository.create({
      ...createConceptcardDto, slug: createConceptcardDto.
        title.toLowerCase().replace(/ /g, '-')
    })
  }

  findAll() {
    return this.aibitsConceptCardRepository.find();
  }

  findOne(id: string) {
    return this.aibitsConceptCardRepository.findOne({ _id: id });
  }

  findByConcept(id: string) {
    return this.aibitsConceptCardRepository.findOne({ concept: id });
  }

  update(id: string, updateConceptcardDto: UpdateConceptcardDto) {
      return this.aibitsConceptCardRepository.updateOne({ _id: id }, updateConceptcardDto)
  }

  remove(id: string) {
    return this.aibitsConceptCardRepository.deleteOne({ _id: id });
  }
}
