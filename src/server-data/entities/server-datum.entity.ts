import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class ServerData {

    @Prop({
      ref:'project'
    })
    project: string;

    @Prop({
        type: mongoose.Schema.Types.Mixed,
    })
    data: any;
    
}

export type ServerDataDocument = ServerData & Document;



export const ServerDataSchema = SchemaFactory.createForClass(ServerData);