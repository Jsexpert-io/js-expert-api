import { Injectable } from '@nestjs/common';
import { CreateServerDatumDto } from './dto/create-server-datum.dto';
import { UpdateServerDatumDto } from './dto/update-server-datum.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ServerDataDocument } from './entities/server-datum.entity';
import { Model, PaginateModel } from 'mongoose';

@Injectable()
export class ServerDataService {

  findByEndpoint(_id: any, endpoint: string) {
    return this.serverdataRepository.find({
      project: _id,
      'data.requestObject.path': endpoint
    }).select(['data', 'createdAt'])

  }


  getRequestDistribution(_id: any) {
    return this.serverdataRepository.aggregate([
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
    return this.serverdataRepository.aggregate([
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
  getMemoryUsageTrend(_id: any) {
    return this.serverdataRepository.aggregate([
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
    return this.serverdataRepository.aggregate([
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
    @InjectModel('serverdata')
    private serverdataRepository: PaginateModel<ServerDataDocument>,
  ) { }
  create(createServerDatumDto: CreateServerDatumDto, projectId: string) {
    return this.serverdataRepository.create({
      ...createServerDatumDto, project: projectId
    })
  }

  findAllByProject(projectId: string, page: number, limit: number, sortBy: string, orderBy: string, search: string) {

    const matchQuery = {
      project: String(projectId),
    }
    if (search) {
      matchQuery['data.requestObject.path'] = { $regex: search, $options: 'i' }
    }
    console.log(JSON.stringify(matchQuery));

    return this.serverdataRepository.aggregate([
      {
        $match: matchQuery
      },
      {
        $group: {
          _id: {
            endpoint: '$data.requestObject.path',
            method: '$data.requestObject.method'
          },
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
