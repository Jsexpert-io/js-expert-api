import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class UserChallange {

    @Prop({
        type: String,
        unique: true,
    })
    id: string;

    @Prop({
        type: Number,
    })
    rank: number;

    @Prop({
        type: String,
    })
    status: string;
    @Prop({
        type: String,
    })
    code: string;

    
    
    @Prop({
        ref: 'developer',
        type: String,
    })
    developer: string;

    @Prop({
        ref: 'challange',
        type: String,
    })
    challange: string;
 



}


export type UserChallangeDocument = UserChallange & Document;



export const UserChallangeSchema = SchemaFactory.createForClass(UserChallange);