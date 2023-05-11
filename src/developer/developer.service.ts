import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Developer, DeveloperDocument } from './entities/developer.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class DeveloperService {
  constructor(
    @InjectModel('developer')
    private developerRepository: Model<DeveloperDocument>,
  ) { }
  create(createDeveloperInput: CreateDeveloperDto) {
    return this.developerRepository.create({ ...createDeveloperInput, id: v4() })
  }

  findAll() {
    return this.developerRepository.find()

  }

  findOne(id: string) {
    return this.developerRepository.findById(id)

  }
  findByEmail(email: string) {
    return this.developerRepository.find({ email })

  }

  findOneBy(filter: FindOptionsWhere<Developer> | FindOptionsWhere<Developer>[]) {
    return this.developerRepository.findOne({ ...filter }, {

    }).select(['-password', '-_id', '-__v'])

  }
  checkUserByEmail(email: string) {
    return this.developerRepository.exists({ email })

  }
  update(id: string, updateDeveloperInput: UpdateDeveloperDto) {
    return this.developerRepository.updateOne({ id }, updateDeveloperInput)
  }

  remove(id: string) {
    return this.developerRepository.deleteOne({ id })

  }
}
