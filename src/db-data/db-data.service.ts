import { Injectable } from '@nestjs/common';
import { CreateDbDatumDto } from './dto/create-db-datum.dto';
import { UpdateDbDatumDto } from './dto/update-db-datum.dto';
import { InjectModel } from '@nestjs/mongoose';
import { DbDataDocument } from './entities/db-datum.entity';
import { Model, PaginateModel } from 'mongoose';

@Injectable()
export class DbDataService {

  findByEndpoint(_id: any, endpoint: string) {
    return this.dbDataRepository.find({
      project: _id,
      'data.collectionName': endpoint
    }).select(['data', 'createdAt'])

  }

  findByOperation(_id: any, endpoint: string) {
    return this.dbDataRepository.find({
      project: _id,
      'data.operationType': endpoint
    }).select(['data', 'createdAt'])

  }


  getRequestDistribution(_id: any) {
    return this.dbDataRepository.aggregate([
      {
        $group: {
          _id: null,
          durations: { $push: '$data.durationInMilliseconds' },
          successfulRequests: {
            $sum: {
              $cond: [
                {
                  $in: ['$data.responseObject.status', [200, 201, 202, 203, 204, 205, 206, 207, 208, 226]]
                },
                1,
                0
              ]
            }
          },
          failedRequests: {
            $sum: {
              $cond: [
                {
                  $in: ['$data.responseObject.status',
                    [400, 401, 402, 403,
                      404, 405, 406, 407, 408, 409, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511]]
                },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          durations: 1
        }
      }
    ])
  }

  getRequestDurationDistribution(_id: any) {
    console.log('getRequestDurationDistribution');
    return this.dbDataRepository.aggregate([
      {
        $group: {
          _id: '$data.requestObject.method',
          count: { $sum: 1 },
          successfulRequests: {
            $sum: {
              $cond: [
                {
                  $in: ['$data.responseObject.status', [200, 201, 202, 203, 204, 205, 206, 207, 208, 226]]
                },
                1,
                0
              ]
            }
          },
          failedRequests: {
            $sum: {
              $cond: [
                {
                  $in: ['$data.responseObject.status',
                    [400, 401, 402, 403,
                      404, 405, 406, 407, 408, 409, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511]]
                },
                1,
                0
              ]
            }
          }
        }
      },
        // {
        //   $project: {
        //     _id: 0,
        //     method: '$_id',
        //     count: 1
        //   }
        // }
    ])
  }
  getMemoryUsageTrend(_id: any, startDate: Date, endDate: Date) {
    return this.dbDataRepository.aggregate([
      
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          avgMemoryUsage: { $avg: '$data.memoryUsage' }
        }
      },
      {
        $sort: { _id: 1 }
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          avgMemoryUsage: 1
        }
      }
    ])
  }
  errorStatusCodeDitribution(_id: any) {
    return this.dbDataRepository.aggregate([
      {
        $group: {
          _id: '$data.responseObject.status',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          statusCode: '$_id',
          count: 1
        }
      }
    ])
  }

  constructor(
    @InjectModel('dbdata')
    private dbDataRepository: PaginateModel<DbDataDocument>,
  ) { }
  create(createServerDatumDto: CreateDbDatumDto, projectId: string) {
    return this.dbDataRepository.create({
      ...createServerDatumDto, project: projectId
    })
  }

  findAllByProject(projectId: string, page: number, limit: number, sortBy: string, orderBy: string, search: string) {

    const matchQuery = {
      project: String(projectId),
    }
    if (search) {
      matchQuery['data.collectionName'] = { $regex: search, $options: 'i' }
    }
    console.log(JSON.stringify(matchQuery));

    return this.dbDataRepository.aggregate([
      {
        $match: matchQuery
      },
      {
        $group: {
          _id: {
            endpoint: '$data.collectionName',
            method: '$data.operationType'
          },
          count: { $sum: 1 },
          avgDuration: { $avg: '$data.durationInMilliseconds' },

          latestRequestDate: { $max: '$createdAt' },
    
          
        }
      },
      {
        $sort: {
          [sortBy || "createdAt"]: orderBy === 'asc' ? 1 : -1
        }
      },
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          paginatedData: [{ $skip: (page - 1) * Number(limit) }, { $limit: Number(limit) }]
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
    // return this.dbDataRepository.aggregate([
    //   // {
    //   //   $match: { project: _id }
    //   // },

    // ])
    // return this.dbDataRepository.paginate({project:_id},
    //   {
    //     page: pagenumber,
    //     limit,
    //     select: ['data','createdAt']
    //   })
  }

  remove(id: string) {
    return this.dbDataRepository.deleteOne({ id })
  }
}
