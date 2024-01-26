import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateTraceDto } from './dto/update-trace.dto';
import { TraceDocument } from './entities/trace.entity';

@Injectable()
export class TracesService {
  constructor(
    @InjectModel('trace')
    private dbDataRepository: Model<TraceDocument>,
  ) { }
  create(createTraceDto: {
    resourceSpans: {
      scopeSpans: {
        spans: {
          attributes: {
            key: string,
            value: {
              stringValue: string
            },
            name: string
          }[]
        }[]
      }[]
    }[]
  }, projectId: string) {

    const spans = createTraceDto.resourceSpans[0].scopeSpans.map(span => {
      const scopeSpans = span.spans.filter(span => {
        if (span.attributes.length > 0) {
          const keys = span.attributes.map(attribute => attribute.key)
          return keys.includes('http.method') && keys.includes('http.route')
        }
      }).map(span => {
        const attributes = span.attributes.map(attribute => {
          const valueKey = Object.keys(attribute.value)[0]
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
    console.log(spans.length)

    return this.dbDataRepository.insertMany(spans)
  }

  findAll() {
    return `This action returns all traces`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trace`;
  }

  update(id: number, updateTraceDto: UpdateTraceDto) {
    return `This action updates a #${id} trace`;
  }

  remove(id: number) {
    return `This action removes a #${id} trace`;
  }
}
