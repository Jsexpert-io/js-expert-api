import { Injectable } from '@nestjs/common';

import { removeImages, s3 } from 'src/Utils/ImageService';
import { v4 as uuid } from 'uuid';
import { UserChallangeDocument } from './entities/user-challange.entity';
import { Model } from 'mongoose';
import {  CreateUserChallangeDto } from './dto/create-user-challange.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserChallangeDto } from './dto/update-user-challange.dto';
import { DeveloperService } from 'src/developer/developer.service';

const populateQuery = [{
  path: 'challange',
  foreignField: 'id',
  populate:[{
    path: 'createdBy',
    foreignField: 'id',
    select:['name','username','profilePicture.url']
  },
  {
    path: 'skills',
    foreignField: 'id',
    select:['name','logo.url','createdBy','skills']
  }],
  select:['name','image','logo']
},{
  path: 'developer',
  foreignField: 'id',
  select:['name','username','profilePicture.url']
}]
@Injectable()
export class UserChallangesService {
 async addUserChallange(addDeveloperUserChallangeDtos: CreateUserChallangeDto) {
   await  this.userChallangeRepository.deleteMany({developer:addDeveloperUserChallangeDtos.developer})
   const userChallange = await this.userChallangeRepository.
   create({ ...addDeveloperUserChallangeDtos,id:uuid(),
    status:'submitted', rank:0
    })
    return {
      message:'User Challanges Added'
    }
  }

  constructor(
    @InjectModel('userchallange')
    private userChallangeRepository: Model<UserChallangeDocument>,
    private developerService:DeveloperService

  ) { }
  async create(createUserChallangeDto: CreateUserChallangeDto) {

    const userChallange = await this.userChallangeRepository.create({ ...createUserChallangeDto,id:uuid(),
    status:'submitted', rank:0
    })
    this.developerService.updateUserChallanges(userChallange.developer,userChallange.id)
    return userChallange
  }

  findByUser(id: string) {
   
    return this.userChallangeRepository.find({ developer: id }).populate(populateQuery)
  }
  findByUserOnly(id: string) {
   
    return this.userChallangeRepository.find({ developer: id }).select(['challange','developer','id','proficiency'])
  }

  findByChallange(id: string) {
    return this.userChallangeRepository.findOne({ challange: id }).populate(populateQuery)
  }

  update(id: string, updateUserChallangeDto: UpdateUserChallangeDto) {
    return this.userChallangeRepository.updateOne({ id }, { ...updateUserChallangeDto })
  }

  async remove(id: string) {
   

    return this.userChallangeRepository.deleteOne({ id })
  }
}
