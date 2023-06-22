import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class DbData {

    @Prop({
      ref:'project'
    })
    project: string;

    @Prop({
        type: mongoose.Schema.Types.Mixed,
    })
    data: any;

    @Prop({
        type: String
    })
    dbType: any;
    
}

export type DbDataDocument = DbData & Document;



export const DbDataSchema = SchemaFactory.createForClass(DbData);
