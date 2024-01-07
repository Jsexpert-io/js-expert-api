import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type ChallangeLevelType = "Beginner" | "Intermediate" | "Advanced";
@Schema({ timestamps: true })
export class Challange {

    @Prop({
        type: String,
        unique: true,
    })
    id: string;

    @Prop()
    name: string;

    @Prop()
    start_date: string;

    @Prop()
    end_date: string;

    @Prop()
    slug: string;

    @Prop({ type: mongoose.Schema.Types.Mixed })
    image: any;

    @Prop()
    description: string;

    @Prop()
    status: string;

    @Prop()
    prize: string;

    @Prop()
    points: number;

    @Prop()
    level: ChallangeLevelType; // beginner, intermediate, advanced

    @Prop({
        ref: 'skill',
        type: [String],
    })
    skills: string[];
    @Prop({
        ref: 'developer',
        type: String,
    })
    createdBy: string;






}


export type ChallangeDocument = Challange & Document;



export const ChallangeSchema = SchemaFactory.createForClass(Challange);