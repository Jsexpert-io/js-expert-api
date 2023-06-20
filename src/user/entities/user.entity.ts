import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { jsexpertProfiler } from 'src/Jsprofiler';

@Schema({ timestamps: true })
export class User {

    @Prop({
        type: String,
        unique: true,
    })
    email: string;

    @Prop({
        type: String,

    })
    uniqueKey: string;

    @Prop({
        type: String,
    })
    password: string;


    @Prop({
        type: Boolean,
    })
    isEmailVerified: boolean;

    @Prop({
        type: Boolean,
    })
    isActive: boolean;
    
}

export type UserDocument = User & Document;



export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(jsexpertProfiler.JsDbPerformanceMiddeleware)
