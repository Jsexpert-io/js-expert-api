import { Injectable } from '@nestjs/common';
import { prisma } from 'src/Utils/DbService';
import { CreateMetricDto } from './dto/create-metric.dto';
import { UpdateMetricDto } from './dto/update-metric.dto';

@Injectable()
export class MetricService {
  create(createMetricDto: CreateMetricDto, projectId: string) {
    return prisma.metric.create({
      data: {
        content: createMetricDto,
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
