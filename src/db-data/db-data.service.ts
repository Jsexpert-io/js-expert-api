import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { DbDataDocument } from './entities/db-datum.entity';

import { CreateDbDatumDto } from './dto/create-db-datum.dto';

@Injectable()
export class DbDataService {

  constructor(
    @InjectModel('dbdata')
    private dbDataRepository: Model<DbDataDocument>,
  ) { }
  create(createServerDatumDto: CreateDbDatumDto,projectId:string) {
    return this.dbDataRepository.create({
      ...createServerDatumDto,project:projectId
    })
  }

  findAllByProject(_id: any) {
    return this.dbDataRepository.find({project:_id})
  }
  
  remove(id: string) {
    return this.dbDataRepository.deleteOne({ id })
  }
}
