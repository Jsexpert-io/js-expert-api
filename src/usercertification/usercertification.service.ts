import { Injectable } from '@nestjs/common';

import { removeImages, s3 } from 'src/Utils/ImageService';
import { v4 as uuid } from 'uuid';
import { UserCertificationDocument } from './entities/usercertification.entity';
import { Model } from 'mongoose';
import { CreateUserCertificationDto } from './dto/create-usercertification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserCertificationDto } from './dto/update-usercertification.dto';
import { DeveloperService } from 'src/developer/developer.service';

const populateQuery = [{
  path: 'skill',
  select: ['name', 'slug', 'logo']
}, {
  path: 'developer',
  select: ['name', 'username', 'profilePicture.url']
}]
@Injectable()
export class UserCertificationService {

  constructor(
    @InjectModel('usercertificate')
    private usercertificateRepository: Model<UserCertificationDocument>,
    private developerService: DeveloperService
  ) { }
  async create(createUserCertificationDto: CreateUserCertificationDto) {
    const ucertificate = await this.usercertificateRepository.create({ ...createUserCertificationDto, id: uuid() })
    await this.developerService.updateUserCertificate(ucertificate.developer, ucertificate.id)
    return ucertificate

  }

  findByUser(id: string) {
    return this.usercertificateRepository.findOne({ developer: id }).populate(populateQuery)
  }

  findBySkill(id: string) {
    return this.usercertificateRepository.findOne({ skill: id }).populate(populateQuery)
  }

  update(id: string, updateUserCertificationDto: UpdateUserCertificationDto) {
    return this.usercertificateRepository.updateOne({ id }, { ...updateUserCertificationDto })
  }

  async remove(id: string) {
    const skill = await this.usercertificateRepository.findOne({ id })
    await removeImages([skill.certificate])


    return this.usercertificateRepository.deleteOne({ id })
  }
}
