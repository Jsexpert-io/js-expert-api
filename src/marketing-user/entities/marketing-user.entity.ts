import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class MarketingUser {

    @Prop({
        type: String,
    })
    email: string;


}

export type MarketingUserDocument = MarketingUser & Document;



export const MarketingUserSchema = SchemaFactory.createForClass(MarketingUser);