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
        ref: 'aibitsSubcategory',
    })
    subcategory: string;

    @Prop({
    })
    slug: string;

    @Prop({
    })
    image: string;

   

}

export type ConceptDocument = Concept & Document;



export const ConceptSchema = SchemaFactory.createForClass(Concept);
