import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Developer, DeveloperDocument } from './entities/developer.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { removeImages } from 'src/Utils/ImageService';
import { SkillsService } from 'src/skills/skills.service';


@Injectable()
export class DeveloperService {
  getusername() {
    return this.developerRepository.find({
      username: {
        $ne: null
      }
    }).select(['username'])
  }
  verifyUserName(username: string) {
    return this.developerRepository.exists({ username })
  }
  constructor(
    @InjectModel('developer')
    private developerRepository: Model<DeveloperDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection,
    private skillService: SkillsService
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
  getProfile(username: string) {
    return this.developerRepository.findOne({ username }).select(
      ['id', 'username',
        'name', 'bio', 'links',
        'profilePicture.url', 'coverPicture.url',
        'bio', 'email', 'name', 'skills', 'socials', 'createdAt', 'updatedAt']
    )

  }
  checkUserByEmail(email: string) {
    return this.developerRepository.exists({ email })

  }
 async  updateUserSkills(id: string, userSkill: string) {
   const developer =  await this.developerRepository.findOne({
      id
    })
    if(developer.userskills.includes(userSkill)){
      throw new Error('Skill already added')
    }

    return this.developerRepository.findOneAndUpdate({ id }, {
      $push: {
        userSkill
      }
    })
  }
  async  updateUserCertificate(id: string, userCertificateId: string) {
    const developer =  await this.developerRepository.findOne({
       id
     })
     if(developer.usercertificates.includes(userCertificateId)){
       throw new Error('User Certificate already added')
     }
 
     return this.developerRepository.findOneAndUpdate({ id }, {
       $push: {
         usercertificates:userCertificateId
       }
     })
   }
  async update(id: string, updateDeveloperInput: UpdateDeveloperDto) {

    if (updateDeveloperInput.username) {
      const existingUserName = await this.developerRepository.exists({
        username: updateDeveloperInput.username,
        email: {
          $ne: updateDeveloperInput.email
        }
      })

      if (existingUserName) {
        throw new Error('Username already exists')
      }
    }



    return this.developerRepository.findOneAndUpdate({ id }, { ...updateDeveloperInput })

  }

  async remove(id: string) {
    const developer = await this.findOne(id)
    await removeImages([developer.profilePicture, developer.coverPicture])
    return this.developerRepository.deleteOne({ id })

  }
}
