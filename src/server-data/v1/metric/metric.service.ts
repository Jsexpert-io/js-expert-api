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
    const metrices = createMetricDto.resourceMetrics.map(metric => metric.scopeMetrics?.map(a => a.metrics)?.flat()).flat();
    if (metrices.length === 0)
      return null;

    console.log('createMetricDto', metrices)
    return prisma.metric.createMany({
      data: metrices.map(metric => {
        const { name, description, unit, ...content } = metric;
        const dataPoints = content?.sum?.dataPoints || content?.gauge?.dataPoints || content?.histogram?.dataPoints ||
          content?.summary?.dataPoints;
        return {
          name,
          description,
          unit,
          content,
          projectId
        }
      })
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
