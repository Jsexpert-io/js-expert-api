import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Developer } from './entities/developer.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';


@Injectable()
export class DeveloperService {
  constructor(@InjectRepository(Developer) private developerRepository: Repository<Developer>) {

  }
  create(createDeveloperInput: CreateDeveloperDto) {
    return this.developerRepository.save({ ...createDeveloperInput, id: v4() })
  }

  findAll() {
    return this.developerRepository.find()

  }

  findOne(id: string) {
    return this.developerRepository.findBy({ id })

  }
  findByEmail(email: string) {
    return this.developerRepository.findOneBy({ email })

  }
  update(id: string, updateDeveloperInput: UpdateDeveloperDto) {
    return this.developerRepository.update({ id }, updateDeveloperInput)
  }

  remove(id: string) {
    return this.developerRepository.delete({ id })

  }
}
