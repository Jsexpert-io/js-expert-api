import { Injectable } from '@nestjs/common';
import { prisma } from 'src/Utils/DbService';

@Injectable()
export class TracesService {

  create(createTraceDto: {
    resourceSpans: {
      scopeSpans: {
        spans: any[]
      }[]
    }[]
  }, projectId: string) {

    const spans = createTraceDto.resourceSpans[0].scopeSpans.map(span => {
      const scopeSpans = span.spans.filter(span => {
        if (span.attributes.length > 0) {
          return true;
          const keys = span.attributes.map(attribute => attribute.key)
          return keys.includes('http.route') || keys.includes('http.status_code')
        }
      }).map(span => {
        const attributes = span.attributes.map(attribute => {
          const valueKey = Object.keys(attribute.value)[0]
          if (attribute.key === 'http.request.body' || attribute.key === 'http.request.headers') {
            return {
              [attribute.key]: JSON.parse(attribute.value[valueKey]),
            }
          }
          return {
            [attribute.key]: attribute.value[valueKey],
          }
        })
        return {
          ...span,
          attributes: Object.assign({}, ...attributes),
          project: projectId,
        }
      })
      return {
        ...span,
        spans: scopeSpans
      }
    }).map(a => a.spans).flat()

    return prisma.trace.createMany({
      data: spans
    })
  }

  findByProjectId(projectId: string) {
    return prisma.trace.findMany({
      where: {
        projectId: projectId
      },
      select: {
        name: true,
        createdAt: true,
        startTimeUnixNano: true,
        endTimeUnixNano: true,
        kind: true,
      }
    })
  }

  deleteByProjectId(projectId: string) {
    return prisma.trace.deleteMany({
      where: {
        projectId: projectId
      }
    })
  }
  findOne(id: string) {
    return prisma.trace.findUnique({
      where: {
        id
      }

    })
  }


  remove(id: number) {
    return `This action removes a #${id} trace`;
  }
}
