import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Attribute } from './TraceRowEntity';


@Schema({ timestamps: true })
export class Trace {
    @Prop({
        ref: 'project',
    })
    project: string;

    @Prop({})
    traceId: string;
    @Prop({})
    spanId: string;
    @Prop({})
    parentSpanId: string;
    @Prop({})
    name: string;
    kind: string;
    @Prop({})
    startTimeUnixNano: string;
    @Prop({})
    endTimeUnixNano: string;
    @Prop({
        type: mongoose.Schema.Types.Mixed,
        default: [],
    })
    attributes: Attribute[];
    @Prop({})
    droppedAttributesCount: string;
    @Prop({
        type: mongoose.Schema.Types.Mixed,
        default: [],
    })
    events: any[];
    @Prop({})
    droppedEventsCount: string;
    @Prop({
        type: mongoose.Schema.Types.Mixed,
        default: [],
    })
    links: any[];
    @Prop({})

    droppedLinksCount: string;
}

export type TraceDocument = Trace & Document;

export const TraceSchema = SchemaFactory.createForClass(Trace);
