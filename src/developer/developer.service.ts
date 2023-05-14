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
  verifyUserName(username: string) {
    return this.developerRepository.exists({ username })
  }
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
  checkUserName(username: string) {
    return this.developerRepository.exists({ username })

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
 async update(id: string, updateDeveloperInput: UpdateDeveloperDto) {
  if(updateDeveloperInput.username){
    const existingUserName = await  this.developerRepository.exists({
      username: updateDeveloperInput.username,
      email:{
        $ne:updateDeveloperInput.email
      }
    })
    console.log('====================================');
    console.log(existingUserName);
    console.log('====================================');
    if(existingUserName){
      throw new Error('Username already exists')
    }
  }
  
    return this.developerRepository.updateOne({ id }, updateDeveloperInput)
  }

  remove(id: string) {
    return this.developerRepository.deleteOne({ id })

  }
}
