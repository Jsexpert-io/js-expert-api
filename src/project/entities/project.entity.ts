import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Project {

    @Prop({
        type: String,
    })
    name: string;
    @Prop({
        type: String,
        unique: true,
    })
    id: string;

    @Prop({
        type: String,

    })
    description: string;


    @Prop({
        type: String,

    })
    clientId: string;

    @Prop({
        type: String,

    })
    clientSecret: string;

    @Prop({
        ref: 'user',
      })
      user: string;

    @Prop({
        type: Boolean,
    })
    isActive: boolean;

}

export type ProjectDocument = Project & Document;



export const ProjectSchema = SchemaFactory.createForClass(Project);