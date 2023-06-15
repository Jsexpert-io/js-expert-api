import { Injectable } from '@nestjs/common';
import { CreateServerDatumDto } from './dto/create-server-datum.dto';
import { UpdateServerDatumDto } from './dto/update-server-datum.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ServerDataDocument } from './entities/server-datum.entity';
import { Model } from 'mongoose';

@Injectable()
export class ServerDataService {

  constructor(
    @InjectModel('serverdata')
    private serverdataRepository: Model<ServerDataDocument>,
  ) { }
  create(createServerDatumDto: CreateServerDatumDto,projectId:string) {
    return this.serverdataRepository.create({
      ...createServerDatumDto,project:projectId
    })
  }

  findAllByProject(_id: any) {
    return this.serverdataRepository.find({project:_id})
  }
  
  remove(id: string) {
    return this.serverdataRepository.deleteOne({ id })
  }
}
