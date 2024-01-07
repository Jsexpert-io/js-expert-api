import { Injectable } from '@nestjs/common';
import { CreateChallangeDto } from './dto/create-challange.dto';
import { UpdateChallangeDto } from './dto/update-challange.dto';
import { Model } from 'mongoose';
import { ChallangeDocument } from './entities/challange.entity';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
const populateQuery = [{
  path: 'skills',
  foreignField: 'id',
  select:['name','slug','logo']
},{
  path: 'createdBy',
  foreignField: 'id',
  select:['name','username','profilePicture.url']
}]
@Injectable()
export class ChallangeService {
  constructor(
    @InjectModel('challange')
    private challangeRepository: Model<ChallangeDocument>,
  ) { }
  create(createChallangeDto: CreateChallangeDto) {
    return this.challangeRepository.create({ ...createChallangeDto ,
      id:uuid(),
      status:'active',
      slug:createChallangeDto.name.toLowerCase().replace(/ /g, '-')},)
  }

  findAll() {
    return this.challangeRepository.find()
  }

  findOne(id: string) {
    return this.challangeRepository.findOne({ id })
  }
  findOneBySlug(slug: string) {
    return this.challangeRepository.findOne({ slug }).populate(populateQuery)

  }

  update(id: string, updateChallangeDto: UpdateChallangeDto) {
    
    return this.challangeRepository.updateOne({ id }, { ...updateChallangeDto })

  }

  remove(id: string) {
    return this.challangeRepository.deleteOne({ id })
  }
}
