import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeveloperService } from 'src/developer/developer.service';
import { v4 as uuid } from 'uuid';
import { CreateUserSkillDto } from './dto/create-user-skill.dto';
import { UpdateUserSkillDto } from './dto/update-user-skill.dto';
import { UserSkillDocument } from './entities/user-skill.entity';

const populateQuery = [
  {
    path: 'skill',
    foreignField: 'id',
    select: ['name', 'slug', 'logo'],
  },
  {
    path: 'developer',
    foreignField: 'id',
    select: ['name', 'username', 'profilePicture.url'],
  },
];
@Injectable()
export class UserSkillsService {
  async addUserSkill(addDeveloperUserSkillDtos: CreateUserSkillDto[]) {
    await this.userSkillRepository.deleteMany({
      developer: addDeveloperUserSkillDtos[0].developer,
    });
    await this.userSkillRepository.insertMany(
      addDeveloperUserSkillDtos.map((addDeveloperUserSkillDto) => ({
        ...addDeveloperUserSkillDto,
        id: uuid(),
      })),
    );
    return {
      message: 'User Skills Added',
    };
  }

  constructor(
    @InjectModel('userskill')
    private userSkillRepository: Model<UserSkillDocument>,
    private developerService: DeveloperService,
  ) { }
  async create(createUserSkillDto: CreateUserSkillDto) {
    const userSkill = await this.userSkillRepository.create({
      ...createUserSkillDto,
      id: uuid(),
    });
    this.developerService.updateUserSkills(userSkill.developer, userSkill.id);
    return userSkill;
  }

  findByUser(id: string) {
    return this.userSkillRepository
      .find({ developer: id })
      .populate(populateQuery);
  }
  findByUserOnly(id: string) {
    return this.userSkillRepository
      .find({ developer: id })
      .select(['skill', 'developer', 'id', 'proficiency']);
  }

  findBySkill(id: string) {
    return this.userSkillRepository
      .findOne({ skill: id })
      .populate(populateQuery);
  }

  update(id: string, updateUserSkillDto: UpdateUserSkillDto) {
    return this.userSkillRepository.updateOne(
      { id },
      { ...updateUserSkillDto },
    );
  }

  async remove(id: string) {
    return this.userSkillRepository.deleteOne({ id });
  }
}
