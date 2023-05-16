import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Developer } from 'src/developer/entities/developer.entity';
@Schema({ timestamps: true })
export class UserSkill {

    @Prop({
        type: String,
        unique: true,
    })
    id: string;

    @Prop({
        type: Number,
    })
    proficiency: number;

    
    @Prop({
        ref: 'developer',
        type: String,
    })
    developer: string;

    @Prop({
        ref: 'skill',
        type: String,
    })
    skill: string;
 



}


export type UserSkillDocument = UserSkill & Document;



export const UserSkillSchema = SchemaFactory.createForClass(UserSkill);