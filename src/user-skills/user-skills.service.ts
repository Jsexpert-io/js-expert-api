import { Injectable } from '@nestjs/common';

import { removeImages, s3 } from 'src/Utils/ImageService';
import { v4 as uuid } from 'uuid';
import { UserSkillDocument } from './entities/user-skill.entity';
import { Model } from 'mongoose';
import { CreateUserSkillDto } from './dto/create-user-skill.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserSkillDto } from './dto/update-user-skill.dto';

const populateQuery = [{
  path: 'skill',
  select:['name','slug','logo']
},{
  path: 'developer',
  select:['name','username','profilePicture.url']
}]
@Injectable()
export class UserSkillsService {

  constructor(
    @InjectModel('userskill')
    private userSkillRepository: Model<UserSkillDocument>,
  ) { }
  create(createUserSkillDto: CreateUserSkillDto) {
    return this.userSkillRepository.create({ ...createUserSkillDto,id:uuid()})
  }

  findByUser(id: string) {
    return this.userSkillRepository.findOne({ developer: id }).populate(populateQuery)
  }

  findBySkill(id: string) {
    return this.userSkillRepository.findOne({ skill: id }).populate(populateQuery)
  }

  update(id: string, updateUserSkillDto: UpdateUserSkillDto) {
    return this.userSkillRepository.updateOne({ id }, { ...updateUserSkillDto })
  }

  async remove(id: string) {
   

    return this.userSkillRepository.deleteOne({ id })
  }
}
