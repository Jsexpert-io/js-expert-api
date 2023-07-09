import { Injectable } from '@nestjs/common';
import { CreateConceptcardDto } from './dto/create-conceptcard.dto';
import { UpdateConceptcardDto } from './dto/update-conceptcard.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ConceptCardDocument } from './entities/conceptcard.entity';
import { Model } from 'mongoose';
import { ConceptService } from '../concepts/concepts.service';

@Injectable()
export class ConceptcardService {
  constructor(
    @InjectModel('aibitsConceptCard')
    private aibitsConceptCardRepository: Model<ConceptCardDocument>,
    private conceptService: ConceptService
  ) { }
  async create(createConceptcardDto: CreateConceptcardDto) {
    const doc = await this.aibitsConceptCardRepository.create({
      ...createConceptcardDto, slug: createConceptcardDto.
        title.toLowerCase().replace(/ /g, '-')
    })
    console.log(doc._id, createConceptcardDto.concept)
    await this.conceptService.updateConceptCards(createConceptcardDto.concept, doc._id.toString())
    return doc
  }

  findAll() {
    return this.aibitsConceptCardRepository.find();
  }

  findOne(id: string) {
    return this.aibitsConceptCardRepository.findOne({ _id: id });
  }

  findByConcept(id: string) {
    return this.aibitsConceptCardRepository.find({ concept: id });
  }

  update(id: string, updateConceptcardDto: UpdateConceptcardDto) {
    return this.aibitsConceptCardRepository.updateOne({ _id: id }, updateConceptcardDto)
  }

  async remove(id: string) {
    const doc = await this.aibitsConceptCardRepository.findOne({ _id: id })
    await this.conceptService.removeConceptCards(doc.concept, doc._id)
    return this.aibitsConceptCardRepository.deleteOne({ _id: id });
  }
}
