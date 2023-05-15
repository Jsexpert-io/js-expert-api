import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SkillDocument } from './entities/skill.entity';
import { removeImages, s3 } from 'src/Utils/ImageService';

@Injectable()
export class SkillsService {
  updatedeveloper(skillId: string, userid: string) {
    return this.skillRepository.updateOne({ id:skillId }, { $push: { developers: userid } })
  }
  constructor(
    @InjectModel('skill')
    private skillRepository: Model<SkillDocument>,
  ) { }
  create(createSkillDto: CreateSkillDto) {
    return this.skillRepository.create({ ...createSkillDto })
  }

  findAll() {
    return this.skillRepository.find()

  }

  findOne(id: string) {
    return this.skillRepository.findOne({ id })
  }
  findOneBySlug(slug: string) {
    return this.skillRepository.findOne({ slug }).populate({
      path: 'developers',
      select: ['username', 'name', 'profilePicture']
    })

  }

  update(id: string, updateSkillDto: UpdateSkillDto) {
    return this.skillRepository.updateOne({ id }, { ...updateSkillDto })
  }

  async remove(id: string) {
    const skill = await this.findOne(id)
    await removeImages([skill.logo])

    return this.skillRepository.deleteOne({ id })
  }
}
