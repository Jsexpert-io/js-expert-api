import { Injectable } from '@nestjs/common';
import { prisma } from 'src/Utils/DbService';
import { UpdateMetricDto } from './dto/update-metric.dto';

@Injectable()
export class MetricService {
  create(createMetricDto: {

    resourceMetrics: {
      scopeMetrics: any[]
    }[]

  }, projectId: string) {
    const metrices = createMetricDto.resourceMetrics.map(metric => metric.scopeMetrics).flat();
    if (metrices.length === 0)
      return null;
    return prisma.metric.create({
      data: {
        content: { metrices },
        project: {
          connect: {
            id: projectId
          }
        }
      }
    })
  }

  findAll() {
    return `This action returns all metric`;
  }
  findByProjectId(projectId: string) {
    return prisma.metric.findMany({
      where: {
        projectId: projectId
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} metric`;
  }

  update(id: number, updateMetricDto: UpdateMetricDto) {
    return `This action updates a #${id} metric`;
  }

  remove(id: number) {
    return `This action removes a #${id} metric`;
  }
}
