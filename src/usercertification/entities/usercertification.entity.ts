import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Developer } from 'src/developer/entities/developer.entity';
@Schema({ timestamps: true })
export class UserCertification {

    @Prop({
        type: String,
        unique: true,
    })
    id: string;

    @Prop({
        ref: 'developer',
        type: String,
    })
    developer: string;

    @Prop({ type: mongoose.Schema.Types.Mixed })
    certificate: any;

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    issuer: string;
    
}


export type UserCertificationDocument = UserCertification & Document;



export const UserCertificationSchema = SchemaFactory.createForClass(UserCertification);