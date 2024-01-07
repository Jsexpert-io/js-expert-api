import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { removeImages } from 'src/Utils/ImageService';
import { v4 as uuid } from 'uuid';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { SkillDocument } from './entities/skill.entity';
@Injectable()
export class SkillsService {
  async updatedeveloper(skillId: string, userid: string) {
    const skill = await this.findOne(skillId);
    if (skill.developers.includes(userid)) {
      return skill;
    }
    return this.skillRepository.updateOne(
      { id: skillId },
      { $push: { developers: userid } },
    );
  }
  constructor(
    @InjectModel('skill')
    private skillRepository: Model<SkillDocument>,
  ) { }
  create(createSkillDto: CreateSkillDto) {
    return this.skillRepository.create({
      ...createSkillDto,
      id: uuid(),
      slug: createSkillDto.name.toLowerCase().replace(/ /g, '-'),
    });
  }

  findAll() {
    return this.skillRepository.find();
  }

  findOne(id: string) {
    return this.skillRepository.findOne({ id });
  }
  findOneBySlug(slug: string) {
    return this.skillRepository.findOne({ slug }).populate({
      path: 'developers',
      foreignField: 'id',
      select: ['username', 'name', 'profilePicture.url'],
    });
  }

  update(id: string, updateSkillDto: UpdateSkillDto) {
    return this.skillRepository.updateOne({ id }, { ...updateSkillDto });
  }

  async remove(id: string) {
    const skill = await this.findOne(id);
    await removeImages([skill.logo]);

    return this.skillRepository.deleteOne({ id });
  }
}
