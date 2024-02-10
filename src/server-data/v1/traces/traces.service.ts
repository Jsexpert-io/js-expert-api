import { Injectable } from '@nestjs/common';
import { prisma } from 'src/Utils/DbService';
import { CreateSpans } from './traceUtility';

@Injectable()
export class TracesService {

  async create(createTraceDto: {
    resourceSpans: any[]
  }, projectId: string) {
    return CreateSpans(createTraceDto, projectId)
  }

  findByProjectId(projectId: string) {
    return prisma.traceSpan.findMany({
      where: {
        projectId: projectId
      },
      select: {
        name: true,
        createdAt: true,

      }
    })
  }

  deleteByProjectId(projectId: string) {
    return prisma.traceSpan.deleteMany({
      where: {
        projectId: projectId
      }
    })
  }
  findOne(id: string) {
    return prisma.traceSpan.findUnique({
      where: {
        id
      }

    })
  }


  remove(id: string) {
    return `This action removes a #${id} trace`;
  }
}
