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
    console.log(pagenumber,limit);
    
   return this.serverdataRepository.aggregate([
    {
      $group: {
        _id: '$data.requestObject.path',
        count: { $sum: 1 },
        avgDuration: { $avg: '$data.durationInMilliseconds' },
        
        avgReqSize: { $avg: '$data.requestObject.reqSize' },
        avgResSize: { $avg: '$data.responseObject.resSize' },
        maxDuration: { $max: '$data.durationInMilliseconds' },
        minDuration: { $min: '$data.durationInMilliseconds' },
        latestRequestDate: { $max: '$createdAt' },
        avgMemoryUsage: { $avg: '$data.memoryUsage' },
        successfulRequests: {
          $sum: {
            $cond: [
              { $in:  ['$data.responseObject.status', [200, 201, 202, 203, 204, 205, 206, 207, 208, 226]]
              },
              1,
              0
            ]
          }
        },
        failedRequests: {
          $sum: {
            $cond: [
              { $in:  ['$data.responseObject.status', 
              [400, 401, 402, 403, 
                404, 405, 406, 407, 408, 409,500,501,502,503,504,505,506,507,508,510,511]]
              },
              1,
              0
            ]
          }
        }
      }
    },
    {
      $sort: {
        count: -1 // Sort by the number of requests in descending order
      }
    },
    {
      $facet: {
        metadata: [{ $count: 'total' }],
        paginatedData: [{ $skip: (pagenumber - 1) * Number(limit) }, { $limit: Number(limit) }]
      }
    }
  ])
  .then((result) => {
    const metadata = result[0].metadata[0];
    const paginatedData = result[0].paginatedData;
    const total = metadata ? metadata.total : 0;
    return {
      total,
      paginatedData
    }
    console.log('Total documents:', total);
    console.log('Paginated data:', paginatedData);
  })
    // return this.serverdataRepository.aggregate([
    //   // {
    //   //   $match: { project: _id }
    //   // },
     
    // ])
    // return this.serverdataRepository.paginate({project:_id},
    //   {
    //     page: pagenumber,
    //     limit,
    //     select: ['data','createdAt']
    //   })
  }
  
  remove(id: string) {
    return this.serverdataRepository.deleteOne({ id })
  }
}
