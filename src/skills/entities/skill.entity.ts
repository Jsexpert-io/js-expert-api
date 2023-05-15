import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Developer } from 'src/developer/entities/developer.entity';
@Schema({ timestamps: true })
export class Skill {

    @Prop()
    id: string;

    @Prop()
    name: string;

    @Prop()
    value: string;

    @Prop()
    slug: string;

    @Prop({ type: mongoose.Schema.Types.Mixed })
    logo: any;

    @Prop({
        ref: 'developer',
        type: [mongoose.Schema.Types.ObjectId],
    })
    users: Developer[];



}


export type SkillDocument = Skill & Document;



export const SkillSchema = SchemaFactory.createForClass(Skill);