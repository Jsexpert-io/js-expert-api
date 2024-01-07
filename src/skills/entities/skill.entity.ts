import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Developer } from 'src/developer/entities/developer.entity';
@Schema({ timestamps: true })
export class Skill {

    @Prop({
        type: String,
        unique: true,
    })
    id: string;

    @Prop()
    name: string;

    @Prop()
    value: string;

    @Prop()
    slug: string;

    @Prop({ type: mongoose.Schema.Types.Mixed })
    logo: any;

    // set many to many relationship with developer on key id not _id
    @Prop({
        ref: 'developer',
        type: [String],
    })
    developers: string[];
 



}


export type SkillDocument = Skill & Document;



export const SkillSchema = SchemaFactory.createForClass(Skill);