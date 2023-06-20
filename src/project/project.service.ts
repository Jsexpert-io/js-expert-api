import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectDocument } from './entities/project.entity';
import { createInputHash } from 'src/Utils/EmailService';
import { v4 } from 'uuid';
@Injectable()
export class ProjectService {
  findByClientId(clientId: any) {
    return this.projectRepository.findOne({ clientId })
  }
  constructor(
    @InjectModel('project')
    private projectRepository: Model<ProjectDocument>,
  ) { }
  create(createprojectDto: CreateProjectDto, userId: string) {
    return this.projectRepository.create({
      ...createprojectDto, isActive: true, user: userId,
      clientSecret: createInputHash(createprojectDto.name + userId),
      clientId: v4()
    })
  }

  findAllByUser(userId: string) {

    return this.projectRepository.find({
      user: userId
    }).populate('user')

  }

  findOne(id: string) {
    return this.projectRepository.findOne({ id })
  }
  findOneBySlug(slug: string) {
    return this.projectRepository.findOne({ slug }).populate({
      path: 'developers',
      foreignField: 'id',
      select: ['username', 'name', 'profilePicture.url']
    })

  }

  update(id: string, updateprojectDto: UpdateProjectDto) {
    return this.projectRepository.updateOne({ id }, { ...updateprojectDto })
  }

  async remove(id: string) {


    return this.projectRepository.deleteOne({ id })
  }
}
