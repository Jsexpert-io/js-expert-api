import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { removeImages } from 'src/Utils/ImageService';
import { DeveloperService } from 'src/developer/developer.service';
import { v4 as uuid } from 'uuid';
import { CreateUserCertificationDto } from './dto/create-usercertification.dto';
import { UpdateUserCertificationDto } from './dto/update-usercertification.dto';
import { UserCertificationDocument } from './entities/usercertification.entity';

const populateQuery = [
  {
    path: 'developer',
    foreignField: 'id',

    select: ['name', 'username', 'profilePicture.url'],
  },
];
@Injectable()
export class UserCertificationService {
  constructor(
    @InjectModel('usercertificate')
    private usercertificateRepository: Model<UserCertificationDocument>,
    private developerService: DeveloperService,
  ) { }
  async create(createUserCertificationDto: CreateUserCertificationDto) {
    const ucertificate = await this.usercertificateRepository.create({
      ...createUserCertificationDto,
      id: uuid(),
    });
    await this.developerService.updateUserCertificate(
      ucertificate.developer,
      ucertificate.id,
    );
    return ucertificate;
  }

  findByUser(id: string) {
    return this.usercertificateRepository
      .find({ developer: id })
      .select(['certificate.url', 'id', 'name', 'description', 'issuer']);
  }

  findBySkill(id: string) {
    return this.usercertificateRepository
      .find({ skill: id })
      .populate(populateQuery);
  }

  update(id: string, updateUserCertificationDto: UpdateUserCertificationDto) {
    return this.usercertificateRepository.updateOne(
      { id },
      { ...updateUserCertificationDto },
    );
  }

  async remove(id: string) {
    const skill = await this.usercertificateRepository.findOne({ id });
    await removeImages([skill.certificate]);

    return this.usercertificateRepository.deleteOne({ id });
  }
}
