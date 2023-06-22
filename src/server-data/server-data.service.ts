import { Injectable } from '@nestjs/common';
import { CreateServerDatumDto } from './dto/create-server-datum.dto';
import { UpdateServerDatumDto } from './dto/update-server-datum.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ServerDataDocument } from './entities/server-datum.entity';
import { Model, PaginateModel } from 'mongoose';

@Injectable()
export class ServerDataService {

  constructor(
    @InjectModel('serverdata')
    private serverdataRepository: PaginateModel<ServerDataDocument>,
  ) { }
  create(createServerDatumDto: CreateServerDatumDto,projectId:string) {
    return this.serverdataRepository.create({
      ...createServerDatumDto,project:projectId
    })
  }

  findAllByProject(_id: any,pagenumber:number,limit:number=10) {
    return this.serverdataRepository.paginate({project:_id},
      {
        page: pagenumber,
        limit,
        select: ['data','createdAt']
      })
  }
  
  remove(id: string) {
    return this.serverdataRepository.deleteOne({ id })
  }
}
