import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Concept {

 
    @Prop()
    title: string;
    @Prop()
    description: string;

    @Prop({
        ref: 'aibitsCategory',
    })
    category: string;

    @Prop({
        ref: 'aibitsSubcategory',
    })
    subcategory: string;

    @Prop({
    })
    slug: string;

    @Prop({
    })
    image: string;

    @Prop({
        type:mongoose.Schema.Types.Mixed,
        default: {
            youtube: '',
            wikipedia: '',
            blog: '',
            other: '',
            medium: '',
        },
    })
    links: {
        youtube: string,
        wikipedia: string,
        blog: string,
        other: string,
        medium: string,
    };

    // one concept has many concept cards
    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'aibitsConceptCard' }],
    })
    conceptCards: string[];

   

}

export type ConceptDocument = Concept & Document;



export const ConceptSchema = SchemaFactory.createForClass(Concept);
